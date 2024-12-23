"use client";

// Next
import Link from "next/link";

// RHF
import { useFormContext } from "react-hook-form";

// Component
import { BaseButton } from "@/app/components";

// Variables
import { FORM_FILL_VALUES } from "@/lib/variables";

type DevDebugProps = {};

const DevDebug = ({}: DevDebugProps) => {
    const { reset, formState } = useFormContext();

    const handleFormSelect = (formKey: keyof typeof FORM_FILL_VALUES) => {
        reset(FORM_FILL_VALUES[formKey]);
    };

    return (
        <div className="flex  items-center h-10 w-28   rounded-lg border bg-card text-card-foreground  dark:border-gray-600">
            <div className="flex flex-col ">
          
                <select
                   className=" bg-transparent"
                    onChange={(e) => handleFormSelect(Number(e.target.value) as keyof typeof FORM_FILL_VALUES)}
                >
                    <option className="bg-card" value="">Select Form</option>
                    {Object.keys(FORM_FILL_VALUES).map(( key) => (
                        <option 
                        key={key} value={key}>
                            Form {key}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default DevDebug;
