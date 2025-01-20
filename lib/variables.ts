// Types
import { SignatureColor, SignatureFont } from "@/types";
import { PercentDiamond } from "lucide-react";

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
  { code: "ar", name: "العربية" },
];
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

export const FORM_BIGCIRCLE = {
  sender: {
    name: "Big Circle",
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
    invoiceLogo:
      "data:image/jpeg;base64,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",
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
    ],
    currency: "USD",
    language: "English",
    taxDetails: {
      amount: 0,
      amountType: "percentage",
    },
    cgsttaxDetails: {
      amount: 12.5,
      type: "percentage",
    },
    sgsttaxDetails: {
      amount: 12.5,
      type: "percentage",
    },
    discountDetails: {
      amount: 0,
      amountType: "percentage",
    },
    shippingDetails: {
      cost: 0,
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
};

export const FORM_PILOT = {
  sender: {
    name: "Pilot Sprint",
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
    invoiceLogo:
      "data:image/jpeg;base64,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",
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
      amount: 0,
      amountType: "percentage",
    },
    cgsttaxDetails: {
      amount: 12.5,
      type: "percentage",
    },
    sgsttaxDetails: {
      amount: 12.5,
      type: "percentage",
    },
    discountDetails: {
      amount: 0,
      amountType: "percentage",
    },
    shippingDetails: {
      cost: 0,
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
};

/**
 * Form defaults
 */
export const FORM_DEFAULT_VALUES = {
  sender: {
    name: "",
    address: "",
    zipCode: "",
    city: "",
    country: "",
    email: "",
    phone: "",
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
    invoiceLogo: "",
    invoiceNumber: "",
    invoiceDate: "",
    dueDate: "",
    items: [
      {
        name: "",
        description: "",
        quantity: 0,
        unitPrice: 0,
        total: 0,
      },
    ],
    currency: "USD",
    language: "English",
    taxDetails: {
      amount: 0,
      amountType: "amount",
    },
    discountDetails: {
      amount: 0,
      amountType: "amount",
    },
    cgsttaxDetails: {
      amount: 12.5,
      type: "percentage",
    },
    sgsttaxDetails: {
      amount: 12.5,
      type: "percentage",
    },
    shippingDetails: {
      cost: 0,
      costType: "amount",
    },
    paymentInformation: {
      bankName: "",
      accountName: "",
      accountNumber: "",
      IFSCcode: "",
    },
    additionalNotes: "",
    paymentTerms: "",
    totalAmountInWords: "",
    pdfTemplate: 1,
  },
};

/**
 * ? DEV Only
 * Form auto fill values for testing
 */
export const FORM_FILL_VALUES = {
  1: {
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
      invoiceLogo:
        "data:image/jpeg;base64,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",
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
  },
  2: {
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
      invoiceLogo:
        "data:image/jpeg;base64,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",
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
        IFSCcode: "9898108464",
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
  },
  3: {
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
      invoiceLogo:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEBUOEREWEBUXGBUVGBYVGBgQEhoRGBUXFxUXFxkdHSggGB4lIBYVIjEhJysrLi4vFx8zODMsNygtLjcBCgoKDg0OGhAPGi0dHR4tMi0vLS03LSstLTcrKy4rKy0rKy03Ky0zKysrKzctNy0tKysrLSs3KzcrKysrKystLv/AABEIAMgAyAMBIgACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAAABQYHCAECBAP/xABQEAABAwICBgMHDgsHBQAAAAABAAIDBBEFEgYHEyExUUFhcRQiNXSBkbMIFRgjMkJUcpOUobHR4xdSVWJjc4KSorLSMzRTZMHT4RY2Q8Pw/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAIDBAUBBv/EACMRAQACAQMEAgMAAAAAAAAAAAABAhEDBEESFCExYWITIkL/2gAMAwEAAhEDEQA/AJxXJWVrY93E8kYhVbNt+k8PtSAMz3WG8lSrXKda8y6J8Rkd05RyG5cT3k8TdLlLhTW7398f4f8Ald7Ymjg0DsFlKLRV7a/EGg5y8nOT2yDkEZByCtruIjhRaszyYpK1KfmQch5ljIOQ8ytje4/lRO2meTEQn5kHIIyDkFLvvqj2vyYaE/Mg5BGQcgnffU7X5MNCfmQcgjIOQTvvqdr8mGhPzIOQRkHIJ331O1+TDC9GhPfIOQWcg5BRneZ4Trt+nkzWhejU7so5BGUclRbWzw01/U1QF6MJHDcnNlHJYdE08QCqZnK+utEcESCukb03HXvSpSVbZOo8l41OHNO9ven6P+EmEFp5EKGcLYrTVjx4k40LloqnaN6xxQpMloms4kiYrUZpDyHej/VKWC01mbQ8XcPipvSSXJKeEDbNaOQA+haNWvTWIRi+fD0QhCzvQhCEAhCEAhCEAhCEAhCEAhCEAhCEAhCEAhCEGFwYpBduccR9SUFpK24I6ivJSpbptEkWglyvHI7kLnabG6FGJw26uj1zkkkp8x8B2BMeyfEfAdi6G84cfb2zlshaSSBoLnENABJJNgAOJJ6AuD1/ovhcHyrPtWJpKSEm+v8ARfC4PlWfaj1/ovhcHyrPtQKSFyUuJ08ptHPHIeTHtefoK60AhCEAhaSPDQXEgAC5J3AAcSeS4PX+i+FwfKs+1ApIXFT4tTSuyRzxSOPvWSNe7zArtQCEIQCELgxPGKWlGaoqIoB0bR7Y79lzvQd6EzptaGCNNjXs8jZHjzhtl24dp5hNQcsVdCSeAc/ZOJ6g+xKByIWoIIuN4WyAWr+BWy1fwKEezcQhCqdiHA1ieTOA7E1GtTrbwC3bi2cPndtyR9NvBlb4rU+heqbK5Om3gyt8VqfQvVNlmaghOfV5ou3FK0UTpTCCx78wbnPei9rXClP2P0Pw9/yTf60EDtcQbjcVIWguteuoHtjne6rp9wLHnNI1vON537vxTu7OK9dYmqiXC4O7I5xUwgta+7dk9mY2abXIcL2F928jco2QXWwnEoqqBlTA8SRyNDmuHSOvkRvBHQQu1Qp6m/F3ujqaFxu1hZKzqzXbIPoYfKVNaBJ0t8H1fi8/onKmSubpb4Pq/F5/ROVMkEhaiPDcPxJvRlWhVXtRHhuH4k3oyrQoBeNVUMiY6WRwjY0FznOOVoaN5JK9lXTXhp26qndhkD7QQutIQf7ScHeDzaw7rcwTyQdWn2uiaVzqfDCYY94M5Htr+eQH+zHX7rsUR1VTJK8ySvdI87y55L3E9ZO8rxTx0J1c12K+2RNEUN7GaS4YbcQwcXns3dYQM5Cn6l1A0wb7bWyvdzYxkY8xzfWkjH9Qs7Gl9HVNm/Ryt2TvI8EgntAQR/onp1iGGOBp5iYxxheS+Ejp733va2xVjdAdPqXF4/a/ap2i8kLjdw/OafftuePZeyqvimGzUsrqeojdDI3cWuFj29Y6xxT11O6L1tXXR1UD3U8cDgXzW484mj3xcNxHAA7+gELRLV/ArZav4FCPZuIQhVOxDRoTnbwCbbE5G8FovOZfPbfkjabeDK3xWp9C9U2VydNvBlb4rU+heqbKDSfWpvFqejxRs9TK2GMRyDM7hcjcFP34ScG+Hw+c/YqjoQTxrh1k0FRQPw+kk7ofKWZnNBDGMa9r+JHfEloG7rUDoXtTFmdu0Diy4zBpAfkvvyk7gbXQTl6m7CHNjqa5ws15ZEw88t3SHrHfM8xU1ptaAYph9RQx+t9mwsAZs+D43cS14/G6b773vcpyoEnS3wfV+Lz+icqZK5ulvg+r8Xn9E5UyQSFqI8Nw/Em9GVaFVe1EeG4fiTejKtCgQdOcZNDh1TVg2cyM5D+ld3kf8TmqnjnEm5Nyd5J43Vm9fchGCvA99LCD2Zs31gKsSB2atNFfXTEGUzr7JoMkpG47JtgQOtxLW+UnoVsaWmZExsUbQxjQGta0WaGjcAB0KEvU0QNvXSe+Ap2jsO1J+oeZTmgELzqHWY4jiAT5gqwfhkxv4Qz5GL+lBO2nmgdLi7GCW8cjHDLKwDabO/fs38QRfsO/mCv4RhcNJCymp2CKNgs1o+knmTvJPSq1fhkxv4Qz5GL+lH4ZMb+EM+Ri/pQWjWr+BXDgVQ6WlgmebufFE9x4d85gJ3dG8rufwQg3EIQqXXDE428E2mFOVvBabx5cDb8kfTbwZW+K1PoXqmyuTpt4MrfFan0L1TZQaDz1T6P0+IYk2lqWl8ZZI6zXFhu0bt43qbfwMYL/AIMnyr/tUR6iZmsxhjnuDBspd7iGj3PWrKeudP8A48f77ftQRpj+o/D5IXCkdJTygHKXPMkZd0B4O+3WOHXwVeKymfFI+GQZXsc5jhye05XDzgq3+PaX0FFE6eapjAAJDWua+Rx/FY0G5KqRjeIGpqZqojKZZZJSORe8ut9KB1an9I30OKRDN7VO5sEjejvzZjv2XEG/Iu5q1aprodSumxCliZvLp4R5M4JPkFz5FcpAk6W+D6vxef0TlTJXN0t8H1fi8/onKmSCQtRHhuH4k3oyrQqr2ojw3D8Sb0ZVoUDK1x4cZ8FqQ0XcwNlHZG9rn/whyqirv1ELZGOjeA5rgWuB4FpFiCqg6daMyYZXSUjwcoOaJx9/CScjuvkesFA8/U+Y62nxCSlecoqWANP6aMksHlDpPLZWPVIYJXMc2Rji1zSHNcDZwcN4IPQQrCavtcdNURtp8QeKecADandDJ1k/+N3O+7r6EErTtu1zRxII84VbfwG4vzp/lHf0Kx9LVxStzxSNkbzY4PHnCTMb0qoKJpdU1UcVvelwdIexg753kCCpulGj8+HVLqOoymRoaTkOZtnC432HQUkJ06yNIo8SxGWsha5rHZGtze6IY0NzEdF7cE1kFz9Fv7jS/qIPRNSk/gk3Rb+40v6iD0TUpP4IQbqwslCzuu8GOTpbwTQa9O9nALfr1xMPnttyR9NvBlb4rU+heqbK6uNUHdNNNS5sm1ikizWzZc7C3Na4va/BQ97Hxv5SPzf71UNSC0KdPY+N/KR+b/eo9j438pH5v96ggtCneH1P0YPf4i5w5NgDD59oU89FtVeF0DhKIzUSjeJJyH2PNrQA0dtr9aBn6jtX0kDhi1WwscWkQRuFnBrhZ0rh0XBIA5EnkppQhAk6W+D6vxef0TlTJXXxaj29PLT5sm0jkjzWzWztLb26bXUOex8b+Uj83+9QM3UR4bh+JN6Mq0KjDQXVEMLrWV3du3yte3JsdnfM0t91tDwvyUnoBNPWHoTDi9PsnHZzMuYpbXLXHi082ndceXoTsQgpjpFo/U4fOaaqjMbxwPFjm9DmO4OCSldHHMCpa6IwVULZmdAcN4PC7XDe09YKinHdQkLiXUdW6L8yZu1b5HixA8hQQLdYUqS6iMVB72alcOeeQf8ArXZh+oOtcfb6uCIfow+Y+Yhg+lBD6kXVrqvqMSc2onDoKQG+Y7nyge9j6vzuHK6lvRjU/hdGRJI11ZIN95rGMHqjG797MpBa0AWG4IPOmgbGxsbBla1oa0cmgWA+pej+C2Wr+CEG6hCFmh1yW1yezOA7ExAU+4+A7AuvvIxh87teWyEJt6ZaaUeFRCSpeS518kTO+lf2DoHWdywtZyIUB1uv6oLvaaKNrf0j3Pd9GUBOHRPXhS1D2w1kXchO4SB20hv+duBYOveOZCCW0LRjgQCDcHeCN4I6lFmEa3zPijcL7iDQZnQ7TbX9yXDNl2fVwv0oJWQtJHWBPIEqDvZBu/Jo+cfdIJ0QoOg9UF3wz4dZvSWz3PkBj3qVNEtKqXFIO6aZxIBs5ju9kY78Vw/14FAuoQoy011x0dDI6ngYayVps7K7JC13SC+xzEcgPKgk1CgCLX9VZruooi3kHva797ePoUnaC6xKLFhkjJimAu6F9s1ulzDwePpHSAgeKE3dPNJThdC+uEW2yFgyZtnfM4N91Y8+STNWenRxmOaQ0/c+yc1tg/a3zAm/uW24IHqhC4Mcr+5qWeqy59lFJLlvlzZGF9r9F7cUHehQX7IN35NHzj7pHsg3fk0fOPukE6LV/BNLVtpocYppKkwdz5JDHlz7W/eNde+UW91w6k7X8EIN1CChZodcip+R8B2BMNPyPgOwLsb7+Xzm05aVEzY2OkcbNaC4n80C5VWKCGo0kxn2x5aJXOc48dlTM3hrewWA63XPEq0GMUpmppoRuMkcjB2uYWj61WrUtijKLGGtn9r2jZKcl27LIS0tB5d8wN/aWBsT/g+hWGUsYhio4bAWLnsbLI7rc9wJKbWlGp7DqyWOaJvcdnXlbEA1j4+QbwY7hvHM7ipHXhU1UcQaZHtjzOaxuYht3uNmtF+JPJBiho44ImQRNDGMaGNaOAa0AAfQqw6J/wDczPHJf53q0yqzon/3MzxyX+d6C0NT7h3YfqKqzqcw+GpxeKGeJkzC2Ulj2h7SRG4i4KtPUe4d2H6lTfRfCKqsqW01J/bODiO+2e5rSXd90bgUFjtN9B8Hbh9RI6lgpskb3CSNrYXNeGnJvHHfbd03UYep1qZBicsTScjqdxeOi7XsyO/iI/aKZ2mOj+I4e5kNdm78F7PbNqw2NjY3tcbvOFO+pTRWmpKFtZFIJ5KlrXOeBYNaL+1NHRY3B5kdQQe+uvSV9BhpbC4slndsWuG4tZYukcDzsLftKPNSeryCtY7Eaxm0ja8siiPuXOFi57+YFwAOnfdOf1R1C99DBO0XbHMQ7qD22BPlaB5Qur1P2MRS4YaQECSCR+Zvvsjzna/suXD9lA96nRLDZI9i+hpyy1rCJjbdhAu3yJs6J6qaLD659cxzpLH2hjuEVxZ+/wB+d5AvwHM71IK8GVcbpHRNe0vYGlzAQXtDr5S4cRex8yBi69vAk3x4fStTa9TV/dqv9ZH/ACOTl17eBJvjw+lam16mr+7Vf6yP+RyCZkiabeDK3xWp9C9LaRNNvBlb4rU+hegrnqefhorZDiWx2Wwdl24a5m12kVrX6bZ/pUv90aI8sO/cj+xQjq30OGMVT6Uz9z5YnS5gza3s9jMtsw/H49Skf2Pjfykfm/3qCYcKwmmpWmOmgjga45iI2hjS6wF7DqA8y7H8FlotuWH8EIN1YQhUOuR7J9x8B2BMvInozgOxdPd26sODo06ctlDGtjVRJUyuxHD2gyO76WHc3M7pfGTuuekdO88TZTOhY16sdHp/pFh7RSv2ne96BUQlzxy74jM7ykrMGB6QaQTsfUbUMB3Syt2EDB0ljLAOPxRfdvKs2hBx4VSOhgjhfK6dzGNaZH+7eQLZj1n/AOuq66MYFWN0iZM6lnbH3XI7OYnhmXO/fmtaysshB5z+5d2H6lXDUtgdZDjEMktLPEwNmu58T2NF4nAXJFlZNCBna1NE/XPD3xsF5o7ywnpzgb2ftC47bckw9Q1dW0z34bU008cT7yROfFI1jZQO/aSRYBwF+1v5ym1CDhxjDIauCSlnbnjkaWuHUeBHIg2IPQQq7Y7oDjGCVPdVCZZWC+SaAZnhn4ssYHn3Fp+hWXQgrM7WdpFMNgwuzndeOnG1Pky7j2BOzVJoHicdZ661kklPfNdjjmmmzcdqDezb79++4HDiptQgYmuqklmweWOKN8ri+EhrGl7t0jSdw3qDdG6vSDDmvZRw1MIeQXDuXaXIFh7uM2VrUIK1f9aaW/5n5mz/AGVPGk7HyYVUtDS57qWYZQLuLzC7cAOm54JdQgqTo7HjeHSmekp6mF7mmMu7mc+7CWutZ7COLW+ZOH/rTS3/ADPzNn+yrKoQR3qfxfFKqGd2JbTM17BHtIRTnKWm9gGNzdCkJ/ArZav4FCDcQhCqdiHMI07GcAm7s7GycMTrgHqCs/L1y5urTpw3QhC9UhCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIBCEIMLD+BWy85XWaT1FHsezdWUNFzZCrdXMQ7ayHK89e9dlBLcZekfUvSqhzjr6Emi7TyIWLUtbR1c8SxxP5KY5gsoXJDWA7nbvqXS14PSFtpq0vGYlnmsx7boWMwRmCnmEcMoWMwRmCZgwyhYzBGYJmDDKFjMEZgmYMMoWMwRmCZgwyhYzBGYJmBlCxmCMw5pkZQsZhzRmHNe5MBZWucc1h0rRxIHlR7hsuDFJ7NyDifqRUYi0bm98fo/5SYS57uZKjMtGjoznqs9qCLM8dW9CU6KmyN6zxQvYhDV1Oq3h0rxnpw/qPNCF5akXjEqomY8w4JKVw6L9i8iLLCFydxpRpz+rXpXm3sIQhZcrQhCEyBCEJkCEITIEIQmQIKwhexL1grUoQtVEoalalCFrolDCALoQr4J8Q6IaJ7ui3buSnS0bWdZ5oQrIhz9TVtbw6kIQvVL/2Q==",
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
      ],
      currency: "USD",
      language: "English",
      taxDetails: {
        amount: 15,
        amountType: "percentage",
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
  },
};
