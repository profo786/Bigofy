"use client";
import { CURRENCIES_API } from "@/lib/variables";
// Components
import {
  CurrencySelector,
  DatePickerFormField,
  FormInput,
  Subheading,
  FormFile,
  TemplateSelector,
} from "@/app/components";

import { useState, useEffect } from "react";

// Contexts
import { useTranslationContext } from "@/contexts/TranslationContext";

const InvoiceDetails = () => {
  const { _t } = useTranslationContext();

  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("");
  const [conversionRate, setConversionRate] = useState("");

  useEffect(() => {
    const fetchConversionRate = async () => {
      if (currency1 && currency2) {
        try {
          const response = await fetch(
            `https://api.exchangerate-api.com/v4/latest/${currency1}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch conversion rate");
          }

          const data = await response.json();
          const rate = data.rates?.[currency2];
          
          if (rate) {
            setConversionRate(rate.toFixed(3)); 
          } else {
            setConversionRate("404");
          }
        } catch (error) {
          console.error("Error fetching conversion rate:", error);
          setConversionRate("asdasdasd");
        }
      }
    };

    fetchConversionRate();

  }, [currency1, currency2]);
  

  return (
    <section className="flex flex-col flex-wrap gap-5">
      <Subheading>{_t("form.steps.invoiceDetails.heading")}:</Subheading>

      <div className="flex flex-row flex-wrap gap-5">
        <div className="flex flex-col gap-2">
          <FormFile
            name="details.invoiceLogo"
            label={_t("form.steps.invoiceDetails.invoiceLogo.label")}
            placeholder={_t(
              "form.steps.invoiceDetails.invoiceLogo.placeholder"
            )}
          />

          <FormInput
            name="details.invoiceNumber"
            label={_t("form.steps.invoiceDetails.invoiceNumber")}
            placeholder="Invoice number"
          />

          <DatePickerFormField
            name="details.invoiceDate"
            label={_t("form.steps.invoiceDetails.issuedDate")}
          />

          <DatePickerFormField
            name="details.dueDate"
            label={_t("form.steps.invoiceDetails.dueDate")}
          />

          <CurrencySelector
            name="details.currency"
            label={_t("form.steps.invoiceDetails.currency")}
            placeholder="Select Currency"
            onChange={(value) => setCurrency1(value)}
          />
          
          <br></br>

          <Subheading>{"Conversion rate :"}</Subheading>

          <CurrencySelector
            name="details.currency2"
            label={_t("To Check conversion rate :")}
            placeholder="Select Currency"
            onChange={(value) => setCurrency2(value)}
          />
          <FormInput
            name="details.conversion"
            label={_t("conversion Rate")}
            value={conversionRate}
            readOnly
          />
        </div>
      </div>
    </section>
  );
};

export default InvoiceDetails;
