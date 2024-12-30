"use client";

// RHF
import { useFormContext } from "react-hook-form";

// ShadCn
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Hooks
import useCurrencies from "@/hooks/useCurrencies";

// Types
import { CurrencyType, NameType } from "@/types";

type CurrencySelectorProps = {
    name: NameType;
    label?: string;
    placeholder?: string;
    onChange?: (value: string) => void; 
};

const CurrencySelector = ({
    name,
    label,
    placeholder,
    onChange,
}: CurrencySelectorProps) => {
    const { control } = useFormContext(); 
    const { currencies, currenciesLoading } = useCurrencies();

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <div className="flex justify-between gap-5 items-center text-sm">
                        <FormLabel>{label}</FormLabel>
                        <Select
                            value={field.value} 
                            onValueChange={(value) => {
                                field.onChange(value);
                                if (onChange) onChange(value); 
                            }}
                        >
                            <FormControl>
                                <SelectTrigger className="w-[13rem]">
                                    <SelectValue placeholder={placeholder} />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent
                                style={{
                                    overflowY: "hidden",
                                    height: "200px",
                                }}
                            >
                                <SelectGroup>
                                    <SelectLabel>Currencies</SelectLabel>
                                    {!currenciesLoading &&
                                        currencies.map((currency: CurrencyType) => (
                                            <SelectItem
                                                key={currency.code}
                                                value={currency.code}
                                            >
                                                {currency.name} ({currency.code})
                                            </SelectItem>
                                        ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </div>
                </FormItem>
            )}
        />
    );
};

export default CurrencySelector;
