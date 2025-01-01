import { NextRequest, NextResponse } from "next/server";
import chromium from "@sparticuz/chromium-min";
import puppeteer from "puppeteer-core";
import { getInvoiceTemplate } from "@/lib/helpers";
import { CHROMIUM_EXECUTABLE_PATH, ENV, TAILWIND_CDN } from "@/lib/variables";
import { InvoiceType } from "@/types";

/**
 * Initialize browser instance with appropriate configuration
 * @returns {Promise<Browser>} Configured browser instance
 */
async function getBrowser() {
  const config = {
    args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],

    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(
      ENV === "production"
        ? CHROMIUM_EXECUTABLE_PATH
        : `https://github.com/Sparticuz/chromium/releases/download/v129.0.0/chromium-v129.0.0-pack.tar`
    ),
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  };

  return puppeteer.launch(config);
}

/**
 * Generate a PDF document of an invoice based on the provided data using Puppeteer.
 *
 * @async
 * @param {NextRequest} req - The Next.js request object.
 * @throws {Error} If there is an error during the PDF generation process.
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object containing the generated PDF.
 */
export async function generatePdfService(req: NextRequest) {
  const body: InvoiceType = await req.json();
  let browser;

  try {
    const ReactDOMServer = (await import("react-dom/server")).default;

    // Get the selected invoice template
    const templateId = body.details.pdfTemplate;
    const InvoiceTemplate = await getInvoiceTemplate(templateId);

    // Read the HTML template from a React component
    const htmlTemplate = ReactDOMServer.renderToStaticMarkup(
      InvoiceTemplate(body)
    );

    // Launch browser
    browser = await getBrowser();
    if (!browser) {
      throw new Error("Failed to launch browser");
    }

    // Create new page
    const page = await browser.newPage();
    console.log("Page opened");

    // Set content and wait for network idle
    await page.setContent(htmlTemplate, {
      waitUntil: "networkidle0",
    });
    console.log("Page content set");

    // Add Tailwind CSS
    await page.addStyleTag({
      url: TAILWIND_CDN,
    });
    console.log("Style tag added");

    // Generate PDF with margins
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "1cm",
        right: "1cm",
        bottom: "1cm",
        left: "1cm",
      },
    });
    console.log("PDF generated");

    // Close browser
    await browser.close();
    console.log("Browser closed");

    // Create response with PDF
    const response = new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=invoice.pdf",
      },
      status: 200,
    });

    return response;
  } catch (error) {
    console.error("Error generating PDF:", error);

    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return new NextResponse(
      JSON.stringify({
        error: "Failed to generate PDF",
        details: errorMessage,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } finally {
    if (browser) {
      await browser.close().catch(console.error);
    }
  }
}
