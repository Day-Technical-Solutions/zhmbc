type ContactEmailProps = {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    siteName?: string;
    siteUrl?: string;
    toLabel?: string;
};
export default function ContactEmail({ name, email, phone, subject, message, siteName, siteUrl, toLabel, }: ContactEmailProps): import("react/jsx-runtime").JSX.Element;
export {};
