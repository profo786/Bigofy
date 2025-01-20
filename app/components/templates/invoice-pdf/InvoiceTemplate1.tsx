import React from "react";
import { InvoiceLayout } from "@/app/components";
import { formatNumberWithCommas, isDataUrl } from "@/lib/helpers";
import { DATE_OPTIONS } from "@/lib/variables";
import { InvoiceType } from "@/types";

const InvoiceTemplate = (data: InvoiceType) => {
  const { sender, receiver, details } = data;

  return (
    <InvoiceLayout data={data}>
      <div className="flex justify-between">
        <div className="text-left">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            INVOICE
          </h2>
          <span className="mt-1 block text-gray-500">
            {details.invoiceNumber}
          </span>
          <address className="mt-4 not-italic text-gray-800">
            {sender.address}
            <br />
            {sender.city} , {sender.zipCode}
            <br />
            {sender.country}
          </address>
        </div>

        <div className="text-right flex flex-col items-end">
          {details.invoiceLogo && (
            <div className="w-32 h-16 relative mb-4">
              <img
                className="absolute top-0 right-0 max-w-full max-h-full object-contain"
                src={details.invoiceLogo}
                alt={`Logo of ${sender.name}`}
              />
            </div>
          )}
          <h1 className="text-lg md:text-xl font-semibold text-blue-600">
            {sender.name}
          </h1>
          {details.paymentInformation?.Gstin && (
            <div className="mt-1">
              <p className="text-sm">
                <span className="font-semibold">GST IN : </span>
                <span className="text-gray-600">
                  {details.paymentInformation.Gstin}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 gap-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Bill to:</h3>
          <h3 className="text-lg font-semibold text-gray-800">
            {receiver.name}
          </h3>
          <address className="mt-2 not-italic text-gray-500">
            {receiver.address}, {receiver.zipCode}
            <br />
            {receiver.city}, {receiver.country}
          </address>
        </div>
        <div className="sm:text-right space-y-2">
          <dl className="grid sm:grid-cols-6 gap-x-3">
            <dt className="col-span-3 font-semibold text-gray-800">
              Invoice date:
            </dt>
            <dd className="col-span-3 text-gray-500">
              {new Date(details.invoiceDate).toLocaleDateString(
                "en-US",
                DATE_OPTIONS
              )}
            </dd>
          </dl>
          <dl className="grid sm:grid-cols-6 gap-x-3">
            <dt className="col-span-3 font-semibold text-gray-800">
              Due date:
            </dt>
            <dd className="col-span-3 text-gray-500">
              {new Date(details.dueDate).toLocaleDateString(
                "en-US",
                DATE_OPTIONS
              )}
            </dd>
          </dl>
        </div>
      </div>

      <div className="mt-6">
        <div className="border border-gray-200 p-4 rounded-lg">
          <div className="grid grid-cols-4 gap-4 mb-4 text-sm font-medium text-gray-500 uppercase">
            <div className="col-span-1">Item</div>
            <div className="text-center">Qty</div>
            <div className="text-center">Rate</div>
            <div className="text-right">Amount</div>
          </div>
          {details.items.map((item, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 py-3 border-t border-gray-200">
              <div className="col-span-1">
                <p className="font-medium text-gray-800">{item.name}</p>
                {item.description && (
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                )}
              </div>
              <div className="text-center text-gray-800 self-start pt-1">{item.quantity}</div>
              <div className="text-center text-gray-800 self-start pt-1">
                {item.unitPrice} {details.currency}
              </div>
              <div className="text-right text-gray-800 self-start pt-1">
                {item.total} {details.currency}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <div className="w-64 space-y-3">
          <dl className="grid grid-cols-2 gap-x-3">
            <dt className="font-semibold text-gray-800">Subtotal:</dt>
            <dd className="text-right text-gray-500">
              {formatNumberWithCommas(Number(details.subTotal))} {details.currency}
            </dd>
          </dl>
          
          {details.cgsttaxDetails?.amount && (
            <dl className="grid grid-cols-2 gap-x-3">
              <dt className="font-semibold text-gray-800">CGST:</dt>
              <dd className="text-right text-gray-500">
                + {details.cgsttaxDetails.amount}%
              </dd>
            </dl>
          )}
          
          {details.sgsttaxDetails?.amount && (
            <dl className="grid grid-cols-2 gap-x-3">
              <dt className="font-semibold text-gray-800">SGST:</dt>
              <dd className="text-right text-gray-500">
                + {details.sgsttaxDetails.amount}%
              </dd>
            </dl>
          )}

          <dl className="grid grid-cols-2 gap-x-3 pt-3 border-t border-gray-200">
            <dt className="font-semibold text-gray-800">Total:</dt>
            <dd className="text-right text-gray-800 font-semibold">
              {formatNumberWithCommas(Number(details.totalAmount))} {details.currency}
            </dd>
          </dl>
          
          {details.totalAmountInWords && (
            <p className="text-sm text-gray-500 italic">
              {details.totalAmountInWords}
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 space-y-6">
        {details.additionalNotes && (
          <div>
            <h4 className="font-semibold text-blue-600">Additional notes:</h4>
            <p className="mt-1 text-gray-800">{details.additionalNotes}</p>
          </div>
        )}

        {details.paymentTerms && (
          <div>
            <h4 className="font-semibold text-blue-600">Payment terms:</h4>
            <p className="mt-1 text-gray-800">{details.paymentTerms}</p>
          </div>
        )}

        <div>
          <h4 className="font-semibold text-gray-800">Please send the payment to this address</h4>
          <div className="mt-2 space-y-1 text-sm">
            <p>Bank: {details.paymentInformation?.bankName}</p>
            <p>Account name: {details.paymentInformation?.accountName}</p>
            <p>Account no: {details.paymentInformation?.accountNumber}</p>
            <p>IFSC Code: {details.paymentInformation?.IFSCcode}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between items-end">
        <div>
          <p className="text-gray-500 text-sm">contact information:</p>
          <p className="text-gray-800">{sender.email}</p>
          <p className="text-gray-800">{sender.phone}</p>
        </div>

        {details.signature?.data && (
          <div className="text-right">
            <p className="font-semibold text-gray-800 mb-2">Signature:</p>
            {isDataUrl(details.signature.data) ? (
              <img
                src={details.signature.data}
                className="max-w-[100px] max-h-[60px] object-contain ml-auto"
                alt="Signature"
              />
            ) : (
              <p style={{
                fontFamily: `${details.signature.fontFamily}, cursive`,
                fontSize: "30px",
                color: "black"
              }}>
                {details.signature.data}
              </p>
            )}
          </div>
        )}
      </div>
    </InvoiceLayout>
  );
};

export default InvoiceTemplate;