import { NextRequest, NextResponse } from "next/server";
import chromium from "@sparticuz/chromium";
import { getInvoiceTemplate } from "@/lib/helpers";
import { CHROMIUM_EXECUTABLE_PATH, ENV, TAILWIND_CDN } from "@/lib/variables";
import { InvoiceType } from "@/types";
import { chromium as playwrightChromium, Page } from "playwright";

// Configuration constants
const BROWSER_LAUNCH_TIMEOUT = 30000;
const PAGE_OPERATION_TIMEOUT = 20000;

export async function generatePdfService(req: NextRequest) {
  const body: InvoiceType = await req.json();
  let browser = null;
  let context = null;
  let page = null;

  try {
    // Initialize ReactDOMServer
    const ReactDOMServer = (await import("react-dom/server")).default;

    // Get and render template
    console.log("Getting template...");
    const templateId = body.details.pdfTemplate;
    const InvoiceTemplate = await getInvoiceTemplate(templateId);
    const htmlTemplate = ReactDOMServer.renderToStaticMarkup(
      InvoiceTemplate(body)
    );
    console.log("Template rendered successfully");

    // Configure browser launch options
    const browserConfig =
      ENV === "production"
        ? {
            args: [
              ...chromium.args,
              "--no-sandbox",
              "--disable-setuid-sandbox",
              "--disable-dev-shm-usage",
              "--disable-accelerated-2d-canvas",
              "--no-first-run",
              "--no-zygote",
              "--disable-gpu",
              "--single-process",
              "--use-gl=swiftshader",
            ],
            executablePath: await chromium.executablePath(
              CHROMIUM_EXECUTABLE_PATH
            ),
            headless: true,
            env: {
              GOOGLE_CHROME_PATH: process.env.GOOGLE_CHROME_PATH || "",
              NODE_ENV: process.env.NODE_ENV as
                | "development"
                | "production"
                | "test",
              ...(process.env.TZ && { TZ: process.env.TZ }),
            },
          }
        : {
            headless: true,
            timeout: BROWSER_LAUNCH_TIMEOUT,
          };
    // Launch browser with error handling
    console.log("Launching browser...");
    browser = await playwrightChromium.launch(browserConfig).catch((error) => {
      console.error("Browser launch failed:", error);
      throw new Error(`Failed to launch browser: ${error.message}`);
    });

    if (!browser) {
      throw new Error("Browser initialization failed");
    }
    console.log("Browser launched successfully");

    // Create context with specific viewport
    context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      baseURL: process.env.NEXT_PUBLIC_APP_URL,
    });

    // Create new page
    page = await context.newPage();
    console.log("Page created successfully");

    // Set content with proper error handling
    console.log("Setting page content...");
    await page
      .setContent(htmlTemplate, {
        timeout: PAGE_OPERATION_TIMEOUT,
        waitUntil: "domcontentloaded",
      })
      .catch((error) => {
        throw new Error(`Failed to set page content: ${error.message}`);
      });

    // Add Tailwind CSS
    console.log("Adding Tailwind CSS...");
    await page
      .addStyleTag({
        url: TAILWIND_CDN,
      })
      .catch((error) => {
        throw new Error(`Failed to add Tailwind CSS: ${error.message}`);
      });

    // Wait for styles to be applied
    await page.waitForTimeout(2000);

    // Generate PDF with timeout handling
    const generatePdfWithTimeout = async (
      page: Page,
      timeout: number
    ): Promise<Buffer> => {
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("PDF generation timed out")), timeout)
      );

      const pdfPromise = page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
          top: "20px",
          right: "20px",
          bottom: "20px",
          left: "20px",
        },
        preferCSSPageSize: true,
      });

      const result = await Promise.race([pdfPromise, timeoutPromise]);
      return Buffer.from(result);
    };

    // Generate PDF with proper error handling
    console.log("Generating PDF...");
    const pdfBuffer = await generatePdfWithTimeout(
      page,
      PAGE_OPERATION_TIMEOUT
    ).catch((error) => {
      throw new Error(`Failed to generate PDF: ${error.message}`);
    });

    // Convert Buffer to Uint8Array for NextResponse
    const pdfUint8Array = new Uint8Array(pdfBuffer);

    // Create and return response with proper typing
    return new NextResponse(pdfUint8Array, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=invoice.pdf",
      },
      status: 200,
    });
  } catch (error) {
    console.error("PDF Generation Error:", {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });

    return new NextResponse(
      JSON.stringify({
        error: "PDF Generation failed",
        details: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } finally {
    // Cleanup resources in reverse order
    try {
      if (page) await page.close();
      if (context) await context.close();
      if (browser) await browser.close();
      console.log("Resources cleaned up successfully");
    } catch (error) {
      console.error("Error during cleanup:", error);
    }
  }
}
