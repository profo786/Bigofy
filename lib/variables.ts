// Types
import { SignatureColor, SignatureFont } from "@/types";

/**
 * Environment
 */
export const ENV = process.env.NODE_ENV;

/**
 * Websites
 */
export const BASE_URL = "https://invoify.vercel.app";
export const AUTHOR_WEBSITE = "https://aliabb.vercel.app";
export const AUTHOR_GITHUB = "https://github.com/al1abb";

/**
 * API endpoints
 */
export const GENERATE_PDF_API = "/api/invoice/generate";
export const SEND_PDF_API = "/api/invoice/send";
export const EXPORT_INVOICE_API = "/api/invoice/export";

/**
 * External API endpoints
 */
export const CURRENCIES_API =
    "https://openexchangerates.org/api/currencies.json";

/**
 * Chromium for Puppeteer
 */
export const CHROMIUM_EXECUTABLE_PATH =
    "https://github.com/Sparticuz/chromium/releases/download/v122.0.0/chromium-v122.0.0-pack.tar";

/**
 * Tailwind
 */
export const TAILWIND_CDN =
    "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css";

/**
 * Google
 */
export const GOOGLE_SC_VERIFICATION = process.env.GOOGLE_SC_VERIFICATION;

/**
 * Nodemailer
 */
export const NODEMAILER_EMAIL = process.env.NODEMAILER_EMAIL;
export const NODEMAILER_PW = process.env.NODEMAILER_PW;

/**
 * I18N
 */
export const LOCALES = [
  { code: "en", name: "English" },
  { code: "de", name: "Deutsch" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "ar", name: "العربية" },]
export const DEFAULT_LOCALE = LOCALES[0].code;

/**
 * Signature variables
 */
export const SIGNATURE_COLORS: SignatureColor[] = [
    { name: "black", label: "Black", color: "rgb(0, 0, 0)" },
    { name: "dark blue", label: "Dark Blue", color: "rgb(0, 0, 128)" },
    {
        name: "crimson",
        label: "Crimson",
        color: "#DC143C",
    },
];

export const SIGNATURE_FONTS: SignatureFont[] = [
    {
        name: "Dancing Script",
        variable: "var(--font-dancing-script)",
    },
    { name: "Parisienne", variable: "var(--font-parisienne)" },
    {
        name: "Great Vibes",
        variable: "var(--font-great-vibes)",
    },
    {
        name: "Alex Brush",
        variable: "var(--font-alex-brush)",
    },
];

/**
 * Form date options
 */
export const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
};

export const SHORT_DATE_OPTIONS: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
};

/**
 * Form defaults
 */
export const FORM_DEFAULT_VALUES = {
    sender: {
        name: "Tirth Gajjar",
        address: "A-401,Orbit Mall,Kudasan",
        zipCode: "382421",
        city: "Gandhinagar",
        country: "India",
        email: "contact@tirth.dev",
        phone: "8511455160",
        customInputs: [],
    },
    receiver: {
        name: "",
        address: "",
        zipCode: "",
        city: "",
        country: "",
        email: "",
        phone: "",
        customInputs: [],
    },
    details: {
        invoiceLogo: "data:image/jpeg;base64,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",
        invoiceNumber: "001INVOICE",
        invoiceDate: "",
        dueDate: "",
        items: [
            {
                name: "Product 1",
                description: "Description of Product 1",
                quantity: 4,
                unitPrice: 50,
                total: 200,
            },
            {
                name: "Product 2",
                description: "Description of Product 2",
                quantity: 5,
                unitPrice: 50,
                total: 250,
            },
            {
                name: "Product 3",
                description: "Description of Product 3",
                quantity: 5,
                unitPrice: 80,
                total: 400,
            },
        ],
        currency: "USD",
        language: "English",
        taxDetails: {
            amount: 5,
            amountType: "amount",
            taxID: "987654321",
        },
        discountDetails: {
            amount: 5,
            amountType: "amount",
        },
        shippingDetails: {
            cost: 5,
            costType: "amount",
        },
        paymentInformation: {
            bankName: "Mahindra Bank",
            accountName: " tirthgajjar@okhdfc",
            accountNumber: "989898982356",
            IFSCcode: "445678678991",
        },
        additionalNotes: "Thank you for doing Business with us",
        paymentTerms: "NET 30",
        totalAmountInWords: "",
        pdfTemplate: 1,
    },
};

/**
 * ? DEV Only
 * Form auto fill values for testing
 */
export const FORM_FILL_VALUES = {
    1 : {
    sender: {
        name: "Tirth Gajjar",
        address: "A-401,Orbit Mall,Kudasan",
        zipCode: "382421",
        city: "Gandhinagar",
        country: "India",
        email: "contact@tirth.dev",
        phone: "8511455160",
    },
    receiver: {
        name: "",
        address: "",
        zipCode: "",
        city: "",
        country: "",
        email: "",
        phone: "",
    },
    details: {
        invoiceLogo:"data:image/jpeg;base64,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",    
        invoiceNumber: "INV0001",
        invoiceDate: new Date(),
        dueDate: new Date(),
        items: [
            {
                name: "Product 1",
                description: "Description of Product 1",
                quantity: 4,
                unitPrice: 50,
                total: 200,
            },
            {
                name: "Product 2",
                description: "Description of Product 2",
                quantity: 5,
                unitPrice: 50,
                total: 250,
            },
            {
                name: "Product 3",
                description: "Description of Product 3",
                quantity: 5,
                unitPrice: 80,
                total: 400,
            },
        ],
        currency: "INR",
        language: "English",
        taxDetails: {
            amount: 15,
            amountType: "percentage",
            taxID: "987654321",
        },
        discountDetails: {
            amount: 5,
            amountType: "percentage",
        },
        shippingDetails: {
            cost: 5,
            costType: "percentage",
        },
        paymentInformation: {
            bankName: "Bank Inc.",
            accountName: "Tirth Gajjar",
            accountNumber: "445566998877",
            IFSCcode: "9898989898",
        },
        additionalNotes: "Thank you for your business",
        paymentTerms: "Net 30",
        signature: {
            data: "",
        },
        subTotal: "850",
        totalAmount: "850",
        totalAmountInWords: "Eight Hundred Fifty",
        pdfTemplate: 1,
    },
} , 
2 : {
    sender: {
        name: "Rahul chauhan",
        address: "123 Main St",
        zipCode: "12345",
        city: "Anytown",
        country: "USA",
        email: "johndoe@example.com",
        phone: "123-456-7890",
    },
    receiver: {
        name: "kuru",
        address: "456 Elm St",
        zipCode: "54321",
        city: "Other Town",
        country: "Canada",
        email: "janesmith@example.com",
        phone: "987-654-3210",
    },
    details: {
        invoiceLogo: "data:image/jpeg;base64,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",
        invoiceNumber: "INV0001",
        invoiceDate: new Date(),
        dueDate: new Date(),
        items: [
            {
                name: "Product 1",
                description: "Description of Product 1",
                quantity: 4,
                unitPrice: 50,
                total: 200,
            },
            {
                name: "Product 2",
                description: "Description of Product 2",
                quantity: 5,
                unitPrice: 50,
                total: 250,
            },
            {
                name: "Product 3",
                description: "Description of Product 3",
                quantity: 5,
                unitPrice: 80,
                total: 400,
            },
        ],
        currency: "INR",
        language: "English",
        taxDetails: {
            amount: 15,
            amountType: "percentage",
            taxID: "987654321",
        },
        discountDetails: {
            amount: 5,
            amountType: "percentage",
        },
        shippingDetails: {
            cost: 5,
            costType: "percentage",
        },
        paymentInformation: {
            bankName: "Bank Inc.",
            accountName: "John Doe",
            accountNumber: "445566998877",
            IFSCcode : "9898108464"
        },
        additionalNotes: "Thank you for your business",
        paymentTerms: "Net 30",
        signature: {
            data: "",
        },
        subTotal: "850",
        totalAmount: "850",
        totalAmountInWords: "Eight Hundred Fifty",
        pdfTemplate: 1,
    },
} ,  3 : {
    sender: {
        name: "ganesh",
        address: "123 Main St",
        zipCode: "12345",
        city: "Anytown",
        country: "USA",
        email: "johndoe@example.com",
        phone: "123-456-7890",
    },
    receiver: {
        name: "nirmal",
        address: "456 Elm St",
        zipCode: "54321",
        city: "Other Town",
        country: "Canada",
        email: "janesmith@example.com",
        phone: "987-654-3210",
    },
    details: {
        invoiceLogo: "data:image/jpeg;base64,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",
        invoiceNumber: "INV0001",
        invoiceDate: new Date(),
        dueDate: new Date(),
        items: [
            {
                name: "Product 1",
                description: "Description of Product 1",
                quantity: 4,
                unitPrice: 50,
                total: 200,
            }
        ],
        currency: "USD",
        language: "English",
        taxDetails: {
            amount: 15,
            amountType: "percentage",
            taxID: "987654321",
        },
        discountDetails: {
            amount: 5,
            amountType: "percentage",
        },
        shippingDetails: {
            cost: 5,
            costType: "percentage",
        },
        paymentInformation: {
            bankName: "Bank Inc.",
            accountName: "John Doe",
            accountNumber: "445566998877",
        },
        additionalNotes: "Thank you for your business",
        paymentTerms: "Net 30",
        signature: {
            data: "",
        },
        subTotal: "850",
        totalAmount: "850",
        totalAmountInWords: "Eight Hundred Fifty",
        pdfTemplate: 1,
    },
} , 
4 : {
    sender: {
        name: "abhishek",
        address: "123 Main St",
        zipCode: "12345",
        city: "Anytown",
        country: "USA",
        email: "johndoe@example.com",
        phone: "123-456-7890",
    },
    receiver: {
        name: "ganesh",
        address: "456 Elm St",
        zipCode: "54321",
        city: "Other Town",
        country: "Canada",
        email: "janesmith@example.com",
        phone: "987-654-3210",
    },
    details: {
        invoiceLogo: "data:image/jpeg;base64,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",
        invoiceNumber: "INV0001",
        invoiceDate: new Date(),
        dueDate: new Date(),
        items: [
            {
                name: "Product 1",
                description: "Description of Product 1",
                quantity: 4,
                unitPrice: 50,
                total: 200,
            },
            {
                name: "Product 2",
                description: "Description of Product 2",
                quantity: 5,
                unitPrice: 50,
                total: 250,
            },
            {
                name: "Product 3",
                description: "Description of Product 3",
                quantity: 5,
                unitPrice: 80,
                total: 400,
            },
        ],
        currency: "USD",
        language: "English",
        taxDetails: {
            amount: 15,
            amountType: "percentage",
            taxID: "987654321",
        },
        discountDetails: {
            amount: 5,
            amountType: "percentage",
        },
        shippingDetails: {
            cost: 5,
            costType: "percentage",
        },
        paymentInformation: {
            bankName: "Bank Inc.",
            accountName: "John Doe",
            accountNumber: "445566998877",
        },
        additionalNotes: "Thank you for your business",
        paymentTerms: "Net 30",
        signature: {
            data: "",
        },
        subTotal: "850",
        totalAmount: "850",
        totalAmountInWords: "Eight Hundred Fifty",
        pdfTemplate: 1,
    },
} , 

};
