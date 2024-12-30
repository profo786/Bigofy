"use client";

import React, {
    SetStateAction,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

// RHF
import { useFormContext, useWatch } from "react-hook-form";

// Helpers
import { formatPriceToString } from "@/lib/helpers";

// Types
import { InvoiceType, ItemType } from "@/types";

const defaultChargesContext = {
    discountSwitch: false,
    setDiscountSwitch: (newValue: boolean) => {},
    taxSwitch: false,
    setTaxSwitch: (newValue: boolean) => {},
    cgsttaxSwitch: false,
    setcgstTaxSwitch: (newValue: boolean) => {},
    sgsttaxSwitch: false,
    setsgstTaxSwitch: (newValue: boolean) => {},
    shippingSwitch: false,
    setShippingSwitch: (newValue: boolean) => {},
    discountType: "amount",
    setDiscountType: (newValue: SetStateAction<string>) => {},
    taxType: "amount",
    setTaxType: (newValue: SetStateAction<string>) => {},
    cgsttaxType: "amount",
    setcgstTaxType: (newValue: SetStateAction<string>) => {},
    sgsttaxType: "amount",
    setsgstTaxType: (newValue: SetStateAction<string>) => {},
    shippingType: "amount",
    setShippingType: (newValue: SetStateAction<string>) => {},
    totalInWordsSwitch: true,
    setTotalInWordsSwitch: (newValue: boolean) => {},
    currency: "USD",
    subTotal: 0,
    totalAmount: 0,
    calculateTotal: () => {},
};

export const ChargesContext = createContext(defaultChargesContext);

export const useChargesContext = () => {
    return useContext(ChargesContext);
};

type ChargesContextProps = {
    children: React.ReactNode;
};

export const ChargesContextProvider = ({ children }: ChargesContextProps) => {
    const { control, setValue } = useFormContext<InvoiceType>();

    // Form Fields
    const itemsArray = useWatch({
        name: `details.items`,
        control,
    });

    const currency = useWatch({
        name: `details.currency`,
        control,
    });

    // Charges
    const charges = {
        discount: useWatch({ name: `details.discountDetails`, control }) || {
            amount: 0,
            amountType: "amount",
        },
        tax: useWatch({ name: `details.taxDetails`, control }) || {
            amount: 0,
            amountType: "amount",
        },

        cgsttax: useWatch({ name: `details.cgsttaxDetails`, control }) || {
            amount: 0,
            amountType: "amount",
        },

        sgsttax: useWatch({ name: `details.sgsttaxDetails`, control }) || {
            amount: 0,
            amountType: "amount",
        },
        shipping: useWatch({ name: `details.shippingDetails`, control }) || {
            cost: 0,
            costType: "amount",
        },
    };

    const { discount, cgsttax,sgsttax, tax, shipping } = charges;

    // Switch states. On/Off
    const [discountSwitch, setDiscountSwitch] = useState<boolean>(
        discount?.amount ? true : false
    );
    const [taxSwitch, setTaxSwitch] = useState<boolean>(
        tax?.amount ? true : false
    );
    const [cgsttaxSwitch, setcgstTaxSwitch] = useState<boolean>(
        cgsttax?.amount ? true : false
    );
    const [sgsttaxSwitch, setsgstTaxSwitch] = useState<boolean>(
        sgsttax?.amount ? true : false
    );
    const [shippingSwitch, setShippingSwitch] = useState<boolean>(
        shipping?.cost ? true : false
    );

    // ? Old approach of using totalInWords variable
    // totalInWords ? true : false
    const [totalInWordsSwitch, setTotalInWordsSwitch] = useState<boolean>(true);

    // Initial subtotal and total
    const [subTotal, setSubTotal] = useState<number>(0);
    const [totalAmount, setTotalAmount] = useState<number>(0);

    // Types for discount, tax, and shipping. Amount | Percentage
    const [discountType, setDiscountType] = useState("amount");
    const [taxType, setTaxType] = useState("amount");
    const [cgsttaxType, setcgstTaxType] = useState("amount");

    const [sgsttaxType, setsgstTaxType] = useState("amount");

    const [shippingType, setShippingType] = useState("amount");

    // When loading invoice, if received values, turn on the switches
    useEffect(() => {
        if (discount?.amount) {
            setDiscountSwitch(true);
        }

        if (tax?.amount) {
            setTaxSwitch(true);
        }
        if (cgsttax?.amount) {
            setcgstTaxSwitch(true);
        }
        if (sgsttax?.amount) {
            setsgstTaxSwitch(true);
        }

        if (shipping?.cost) {
            setShippingSwitch(true);
        }

        if (discount?.amountType == "amount") {
            setDiscountType("amount");
        } else {
            setDiscountType("percentage");
        }

        if (tax?.amountType == "amount") {
            setTaxType("percentage");
        } else {
            setTaxType("percentage");
        }
        if (cgsttax?.amountType == "amount") {
            setcgstTaxType("amount");
        } else {
            setcgstTaxType("percentage");
        }
        if (sgsttax?.amountType == "amount") {
            setsgstTaxType("percentage");
        } else {
            setsgstTaxType("percentage");
        }

        if (shipping?.costType == "amount") {
            setShippingType("percentage");
        } else {
            setShippingType("percentage");
        }
    }, [discount?.amount, tax?.amount,sgsttax?.amount,cgsttax?.amount, shipping?.cost]);

    // Check switches, if off set values to zero
    useEffect(() => {
        if (!discountSwitch) {
            setValue("details.discountDetails.amount", 0);
        }

        if (!taxSwitch) {
            setValue("details.taxDetails.amount", 0);
        }
        if (!cgsttaxSwitch) {
            setValue("details.cgsttaxDetails.amount", 0);
        }
        if (!sgsttaxSwitch) {
            setValue("details.sgsttaxDetails.amount", 0);
        }

        if (!shippingSwitch) {
            setValue("details.shippingDetails.cost", 0);
        }
    }, [discountSwitch, taxSwitch, cgsttaxSwitch,sgsttaxSwitch, shippingSwitch]);

    // Calculate total when values change
    useEffect(() => {
        calculateTotal();
    }, [
        itemsArray,
        totalInWordsSwitch,
        discountType,
        discount?.amount,
        taxType,
        tax?.amount,
        cgsttaxType,
        cgsttax?.amount,
        sgsttaxType,
        sgsttax?.amount,
        shippingType,
        shipping?.cost,
    ]);

    /**
     * Calculates the subtotal, total, and the total amount in words on the invoice.
     */
    const calculateTotal = () => {
        // Here Number(item.total) fixes a bug where an extra zero appears
        // at the beginning of subTotal caused by toFixed(2) in item.total in single item
        // Reason: toFixed(2) returns string, not a number instance
        const totalSum: number = itemsArray.reduce(
            (sum: number, item: ItemType) => sum + Number(item.total),
            0
        );

        setValue("details.subTotal", totalSum);
        setSubTotal(totalSum);

        let discountAmount: number =
            parseFloat(discount!.amount.toString()) ?? 0;
        let taxAmount: number = parseFloat(tax!.amount.toString()) ?? 0;
        let cgsttaxAmount: number = parseFloat(cgsttax!.amount.toString()) ?? 0;
        let sgsttaxAmount: number = parseFloat(sgsttax!.amount.toString()) ?? 0;

        let shippingCost: number = parseFloat(shipping!.cost.toString()) ?? 0;

        let discountAmountType: string = "amount";
        let cgsttaxAmountType: string = "amount";
        let sgsttaxAmountType: string = "amount";
        let taxAmountType: string = "amount";
        
        let shippingCostType: string = "amount";

        let total: number = totalSum;

        if (!isNaN(discountAmount)) {
            if (discountType == "amount") {
                total -= discountAmount;
                discountAmountType = "amount";
            } else {
                total -= total * (discountAmount / 100);
                discountAmountType = "percentage";
            }
            setValue("details.discountDetails.amount", discountAmount);
        }

        if (!isNaN(taxAmount)) {
            if (taxType == "amount") {
                total += taxAmount;
                taxAmountType = "amount";
            } else {
                total += total * (taxAmount / 100);
                taxAmountType = "percentage";
            }
            setValue("details.taxDetails.amount", taxAmount);
        }
        if (!isNaN(cgsttaxAmount)) {
            if (taxType == "amount") {
                total += cgsttaxAmount;
                cgsttaxAmountType = "amount";
            } else {
                total += total * (cgsttaxAmount / 100);
                cgsttaxAmountType = "percentage";
            }
            setValue("details.cgsttaxDetails.amount", cgsttaxAmount);
        }
        if (!isNaN(sgsttaxAmount)) {
            if (taxType == "amount") {
                total += sgsttaxAmount;
                sgsttaxAmountType = "amount";
            } else {
                total += total * (sgsttaxAmount / 100);
                sgsttaxAmountType = "percentage";
            }
            setValue("details.sgsttaxDetails.amount", sgsttaxAmount);
        }

        if (!isNaN(shippingCost)) {
            if (shippingType == "amount") {
                total += shippingCost;
                shippingCostType = "amount";
            } else {
                total += total * (shippingCost / 100);
                shippingCostType = "percentage";
            }
            setValue("details.shippingDetails.cost", shippingCost);
        }

        setTotalAmount(total);

        setValue("details.discountDetails.amountType", discountAmountType);
        setValue("details.taxDetails.amountType", taxAmountType);
        setValue("details.cgsttaxDetails.amountType", cgsttaxAmountType);
        setValue("details.sgsttaxDetails.amountType", sgsttaxAmountType);

        setValue("details.shippingDetails.costType", shippingCostType);

        setValue("details.totalAmount", total);

        if (totalInWordsSwitch) {
            setValue("details.totalAmountInWords", formatPriceToString(total));
        } else {
            setValue("details.totalAmountInWords", "");
        }
    };

    return (
        <ChargesContext.Provider
            value={{
                discountSwitch,
                setDiscountSwitch,
                taxSwitch,
                setTaxSwitch,
                cgsttaxSwitch,
                setcgstTaxSwitch,
                sgsttaxSwitch,
                setsgstTaxSwitch,
                shippingSwitch,
                setShippingSwitch,
                discountType,
                setDiscountType,
                taxType,
                setTaxType,
                cgsttaxType,
                setcgstTaxType,
                sgsttaxType,
                setsgstTaxType,
                shippingType,
                setShippingType,
                totalInWordsSwitch,
                setTotalInWordsSwitch,
                currency,
                subTotal,
                totalAmount,
                calculateTotal,
            }}
        >
            {children}
        </ChargesContext.Provider>
    );
};
