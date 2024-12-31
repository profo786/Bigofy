import { NextRequest, NextResponse } from "next/server";
import chromium from "@sparticuz/chromium";
import { getInvoiceTemplate } from "@/lib/helpers";
import { CHROMIUM_EXECUTABLE_PATH, ENV, TAILWIND_CDN } from "@/lib/variables";
import { InvoiceType } from "@/types";
import { chromium as playwrightChromium } from "playwright";

/**
 * Generate a PDF document of an invoice based on the provided data using Playwright.
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

        // Launch the browser based on environment
        if (ENV === "production") {
            browser = await playwrightChromium.launch({
                args: chromium.args,
                executablePath: await chromium.executablePath(
                    CHROMIUM_EXECUTABLE_PATH
                ),
                headless: true,
            });
        } else {
            browser = await playwrightChromium.launch({
                headless: true,
            });
        }

        if (!browser) {
            throw new Error("Failed to launch browser");
        }

        // Create a new context and page
        const context = await browser.newContext();
        const page = await context.newPage();
        console.log("Page opened");

        // Set the HTML content of the page
        await page.setContent(htmlTemplate, {
            waitUntil: 'networkidle'
        });
        console.log("Page content set");

        // Add Tailwind CSS
        await page.addStyleTag({
            url: TAILWIND_CDN
        });
        console.log("Style tag added");

        // Generate PDF
        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true
        });
        console.log("PDF generated");

        // Close context and browser
        await context.close();
        await browser.close();
        console.log("Browser closed");

        // Create response with PDF
        const pdfBlob = new Blob([pdf], { type: "application/pdf" });
        const response = new NextResponse(pdfBlob, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": "inline; filename=invoice.pdf",
            },
            status: 200,
        });

        return response;
    } catch (error) {
        console.error(error);
        return new NextResponse(`Error generating PDF: \n${error}`, {
            status: 500,
        });
    } finally {
        if (browser) {
            await browser.close().catch(console.error);
        }
    }
}