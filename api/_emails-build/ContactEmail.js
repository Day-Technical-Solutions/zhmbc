import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Html, Head, Preview, Body, Container, Section, Heading, Text, Hr, Link, } from "@react-email/components";
const styles = {
    body: { backgroundColor: "#f6f9fc", margin: 0, padding: "24px 0" },
    container: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        border: "1px solid #e5e7eb",
        padding: 24,
        width: "100%",
        maxWidth: 640,
    },
    h1: { margin: 0, fontSize: 22, lineHeight: "28px" },
    meta: { color: "#6b7280", fontSize: 14, marginTop: 8 },
    hr: { borderColor: "#e5e7eb", margin: "16px 0" },
    block: { marginBottom: 12 },
    label: {
        color: "#6b7280",
        fontSize: 12,
        textTransform: "uppercase",
        letterSpacing: 0.4,
    },
    value: { fontSize: 14, color: "#111827", whiteSpace: "pre-wrap" },
    footer: { color: "#9ca3af", fontSize: 12, marginTop: 8 },
};
export default function ContactEmail({ name, email, phone, subject, message, siteName = "ZHMBC", siteUrl = "https://www.zhmbc.com/", toLabel = "Trustee", }) {
    return (_jsxs(Html, { children: [_jsx(Head, {}), _jsx(Preview, { children: `New contact from ${name}` }), _jsx(Body, { style: styles.body, children: _jsx(Container, { style: styles.container, children: _jsxs(Section, { children: [_jsxs(Heading, { style: styles.h1, children: [siteName, " \u2014 New Contact Message", " "] }), _jsxs(Text, { style: styles.meta, children: ["You received a new message from ", _jsx("strong", { children: name }), siteUrl ? (_jsxs(_Fragment, { children: [" ", "via ", _jsx(Link, { href: siteUrl, children: siteName })] })) : (_jsxs(_Fragment, { children: [" via ", siteName] })), "."] }), _jsx(Hr, { style: styles.hr }), _jsxs(Section, { style: styles.block, children: [_jsx(Text, { style: styles.label, children: "Subject" }), _jsx(Text, { style: styles.value, children: subject })] }), _jsxs(Section, { style: styles.block, children: [_jsx(Text, { style: styles.label, children: "From" }), _jsxs(Text, { style: styles.value, children: [name, " \u2014 ", _jsx(Link, { href: `mailto:${email}`, children: email }), phone ? (_jsxs(_Fragment, { children: [" ", "\u2014 ", _jsx(Link, { href: `tel:${phone}`, children: phone })] })) : null] })] }), _jsxs(Section, { style: styles.block, children: [_jsx(Text, { style: styles.label, children: "Message" }), _jsxs(Text, { style: styles.value, children: ["\u201C", message, "\u201D"] })] }), _jsx(Hr, { style: styles.hr }), _jsxs(Text, { style: styles.footer, children: ["This email was sent automatically to ", toLabel, ". Reply to the sender at ", _jsx(Link, { href: `mailto:${email}`, children: email }), "."] })] }) }) })] }));
}
