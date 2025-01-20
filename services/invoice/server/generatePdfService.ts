import { NextRequest, NextResponse } from "next/server";
import jsPDF from "jspdf";
import { InvoiceType } from "@/types";
import { formatNumberWithCommas, isDataUrl } from "@/lib/helpers";

export async function generatePdfService(req: NextRequest) {
  try {
    const data: InvoiceType = await req.json();
    const { sender, receiver, details } = data;

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    // Add a cursive font for signatures
    doc.addFont("https://fonts.googleapis.com/css2?family=${details?.signature?.fontFamily}&display=swap", "DancingScript", "normal");

    const PAGE_HEIGHT = doc.internal.pageSize.height;
    const MARGIN_BOTTOM = 20;

    const checkAndAddNewPage = () => {
      if (yPosition > PAGE_HEIGHT - MARGIN_BOTTOM) {
        doc.addPage();
        yPosition = 20; // Reset Y position on new page
        return true;
      }
      return false;
    };

    doc.setFont("helvetica");

    const addWrappedText = (
      text: string | undefined,
      x: number,
      y: number,
      maxWidth: number,
      align: "left" | "center" | "right" = "left"
    ) => {
      if (!text) return 0;
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, x, y, { align });
      return lines.length * 5;
    };

    let yPosition = 15;

    // INVOICE header
    doc.setFontSize(26);
    doc.setFont("helvetica", "bold");
    doc.text("INVOICE", 20, yPosition);

    // Invoice number below INVOICE header
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(details.invoiceNumber || "", 20, yPosition + 9);
    doc.setTextColor(0);

    // Logo positioning (top right) - Maintain aspect ratio
    if (details.invoiceLogo && isDataUrl(details.invoiceLogo)) {
      try {
        const maxWidth = 30;
        const maxHeight = 30;

        let logoWidth = maxWidth;
        let logoHeight = maxHeight;

        doc.addImage(
          details.invoiceLogo,
          "JPEG",
          doc.internal.pageSize.width - logoWidth - 15, // Right align with margin
          yPosition - 10,
          logoWidth,
          logoHeight
        );

        yPosition += 25; // Add extra spacing below the logo
      } catch (e) {
        console.error("Error adding logo:", e);
      }
    }

    // Sender address
    yPosition += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    addWrappedText(
      `${sender.address}\n${sender.city}, ${sender.zipCode}\n${sender.country}`,
      20,
      yPosition,
      80
    );

    // Company name and GST
    doc.setFont("helvetica", "bold");
    doc.setFontSize(17);
    doc.setTextColor(0, 0, 255);
    doc.text(sender.name || "", 190, yPosition, { align: "right" });
    doc.setTextColor(0);

    if (details.paymentInformation?.Gstin) {
      yPosition += 9;
      doc.setFontSize(12);
      doc.text("GST IN:", 140, yPosition);
      doc.setFont("helvetica", "normal");
      doc.text(details.paymentInformation.Gstin, 190, yPosition, { align: "right" });
    }

    // Bill to section
    yPosition += 18;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Bill to:", 20, yPosition);
    doc.text(receiver.name || "", 20, yPosition + 8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    addWrappedText(
      `${receiver.address}, ${receiver.zipCode}\n${receiver.city}, ${receiver.country}`,
      20,
      yPosition + 14,
      80
    );

    // Dates section
    doc.setFont("helvetica", "bold");
    doc.text("Invoice date:", 140, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(new Date(details.invoiceDate).toLocaleDateString(), 190, yPosition, { align: "right" });

    doc.setFont("helvetica", "bold");
    doc.text("Due date:", 140, yPosition + 8);
    doc.setFont("helvetica", "normal");
    doc.text(new Date(details.dueDate).toLocaleDateString(), 190, yPosition + 8, { align: "right" });

   // Items table setup
   yPosition += 30;
   const tableStartX = 20;
   const tableWidth = 170;
   const columns = {
     item: { x: tableStartX + 5, width: 80 },
     quantity: { x: tableStartX + 90, width: 20 },
     unitPrice: { x: tableStartX + 115, width: 30 },
     total: { x: tableStartX + tableWidth - 5, width: 30 }
   };

   // Table Headers with top border
   doc.setDrawColor(200, 200, 200); // Light gray for borders
   doc.setLineWidth(0.5);
   doc.line(tableStartX, yPosition, tableStartX + tableWidth, yPosition);

   yPosition += 8;
   doc.setFont("helvetica", "bold");
   doc.setFontSize(11);
   doc.text("Item", columns.item.x, yPosition);
   doc.text("Quantity", columns.quantity.x, yPosition);
   doc.text("Unit Price", columns.unitPrice.x, yPosition);
   doc.text("Total", columns.total.x, yPosition, { align: "right" });

   // Header bottom border
   yPosition += 2;
   doc.line(tableStartX, yPosition, tableStartX + tableWidth, yPosition);

   // Table content
   doc.setFont("helvetica", "normal");
   details.items?.forEach((item, index) => {
     yPosition += 8;
     
     // Item details
     doc.text(item.name || "", columns.item.x, yPosition);
     doc.text(item.quantity?.toString() || "0", columns.quantity.x, yPosition);
     doc.text(`${item.unitPrice} ${details.currency}`, columns.unitPrice.x, yPosition);
     doc.text(`${item.total} ${details.currency}`, columns.total.x, yPosition, { align: "right" });
     
     // Row border
     yPosition += 2;
     doc.line(tableStartX, yPosition, tableStartX + tableWidth, yPosition);
   });

      // Totals section
      yPosition += 10;
      const totalsWidth = 80;
      const totalsStartX = tableStartX + tableWidth - totalsWidth;
  
      const addTotalRow = (label: string, value: string, isBold: boolean = false, addBorder: boolean = false) => {
        if (isBold) {
          doc.setFont("helvetica", "bold");
        } else {
          doc.setFont("helvetica", "normal");
        }
        
        doc.text(label, totalsStartX, yPosition);
        doc.text(value, columns.total.x, yPosition, { align: "right" });
        
        if (addBorder) {
          yPosition += 2;
          doc.line(totalsStartX, yPosition, tableStartX + tableWidth, yPosition);
        }
        
        yPosition += 8;
      };
  
      // Calculate subtotal
      const subtotal = Number(details.subTotal);
      addTotalRow("Subtotal", `${formatNumberWithCommas(subtotal)} ${details.currency}`, false, true);
  
      // Calculate tax amounts
      let totalTaxAmount = 0;
      let cgstAmount = 0;
      let sgstAmount = 0;
  
      // CGST calculation
      if (details.cgsttaxDetails?.amount) {
        cgstAmount = (subtotal * Number(details.cgsttaxDetails.amount)) / 100;
        totalTaxAmount += cgstAmount;
        addTotalRow(
          `CGST (${details.cgsttaxDetails.amount}%)`,
          `+ ${formatNumberWithCommas(cgstAmount)} ${details.currency}`,
          false,
          false
        );
      }
  
      // SGST calculation
      if (details.sgsttaxDetails?.amount) {
        sgstAmount = (subtotal * Number(details.sgsttaxDetails.amount)) / 100;
        totalTaxAmount += sgstAmount;
        addTotalRow(
          `SGST (${details.sgsttaxDetails.amount}%)`,
          `+ ${formatNumberWithCommas(sgstAmount)} ${details.currency}`,
          false,
          false
        );
      }
  
      // Calculate final total with taxes
      const finalTotal = subtotal + totalTaxAmount;
  
      // Add extra spacing before final total
      yPosition += 2;
      addTotalRow("Total", `${formatNumberWithCommas(finalTotal)} ${details.currency}`, true, true);
  
      // Total in words - Right-aligned
      if (details.totalAmountInWords) {
        yPosition += 5;
        doc.setFont("helvetica", "italic");
        doc.setFontSize(10);
        // Use the new calculated total for the amount in words
        const amountInWords = `Amount in words: ${details.totalAmountInWords}`;
        const lines = doc.splitTextToSize(amountInWords, totalsWidth);
        lines.forEach((line: string, index: number) => {
          doc.text(line, columns.total.x, yPosition + (index * 5), { align: "right" });
        });
        yPosition += (lines.length * 5) + 5;
      }

    // Additional Notes
    yPosition += 3;
    if (details.additionalNotes) {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 255);
      doc.setFontSize(12);
      doc.text("Additional notes:", 20, yPosition);
      doc.setTextColor(0);
      doc.setFont("helvetica", "normal");
      yPosition += 8;
      addWrappedText(details.additionalNotes, 20, yPosition, 170);
    }


    checkAndAddNewPage();
    yPosition += 14;
    doc.setFont("helvetica", "bold");
    doc.text("Please send the payment to this address :", 20, yPosition);
    doc.setFont("helvetica", "normal");
    yPosition += 10;

    const paymentInfo = details.paymentInformation;
    if (paymentInfo) {
      checkAndAddNewPage();
      doc.setFontSize(12);
      doc.text(`Bank: ${paymentInfo.bankName}`, 20, yPosition);
      yPosition += 8;
      
      checkAndAddNewPage();
      doc.text(`Account name: ${paymentInfo.accountName}`, 20, yPosition);
      yPosition += 8;
      
      checkAndAddNewPage();
      doc.text(`Account no: ${paymentInfo.accountNumber}`, 20, yPosition);
      yPosition += 8;
      
      checkAndAddNewPage();
      doc.text(`IFSC Code: ${paymentInfo.IFSCcode}`, 20, yPosition);
    }

    // Contact Information
    checkAndAddNewPage();
    yPosition += 12;
    doc.setFontSize(11);
    doc.text("Contact information:", 20, yPosition);
    yPosition += 8;
    doc.setFontSize(12);
    doc.text(sender.email || "", 20, yPosition);
    yPosition += 8;
    doc.text(sender.phone || "", 20, yPosition);

    // Signature - Enhanced with proper font handling
    if (details.signature?.data) {
      const signatureY = yPosition - 20;
      doc.setFont("helvetica", "bold");
      doc.text("Signature:", 160, signatureY);

      if (isDataUrl(details.signature.data)) {
        try {
          const signatureWidth = 45;
          const signatureHeight = 30;
          doc.addImage(
            details.signature.data,
            "JPEG",
            160,
            signatureY + 3,
            signatureWidth,
            signatureHeight
          );
        } catch (e) {
          console.error("Error adding signature:", e);
          // Fallback to text signature with cursive font
          doc.setFont("DancingScript", "normal");
          doc.setFontSize(20);
          doc.text(details.signature.data, 160, signatureY + 15);
        }
      } else {
        // Use cursive font for text signatures
        doc.setFont("DancingScript", "normal");
        doc.setFontSize(20);
        doc.text(details.signature.data, 160, signatureY + 15);
      }
    }

    // Generate PDF Buffer
    const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=invoice.pdf",
      },
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      `Error generating PDF: ${error instanceof Error ? error.message : String(error)}`,
      {
        status: 500,
      }
    );
  }
}