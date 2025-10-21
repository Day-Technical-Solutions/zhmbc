import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Html, Head, Preview, Body, Container, Section, Heading, Text, } from "@react-email/components";
export default function PrayerRequestEmail({ name, email, requestType, urgent, isPrivate, request, }) {
    return (_jsxs(Html, { children: [_jsx(Head, {}), _jsxs(Preview, { children: ["New Prayer Request from ", name] }), _jsx(Body, { style: styles.main, children: _jsxs(Container, { style: styles.container, children: [_jsx(Heading, { as: "h2", style: styles.h2, children: "\uD83D\uDE4F New Prayer Request" }), _jsxs(Section, { style: styles.section, children: [_jsxs(Text, { children: [_jsx(Text, { style: styles.label, children: "Name" }), " ", name] }), _jsxs(Text, { children: [_jsx(Text, { style: styles.label, children: "Email: " }), " ", email] }), _jsxs(Text, { children: [_jsx(Text, { style: styles.label, children: "Type: " }), " ", requestType.toUpperCase()] }), urgent && (_jsx(Text, { style: styles.urgentStyle, children: "\u26A0\uFE0F Marked as Urgent" })), isPrivate && (_jsx(Text, { style: styles.privateStyle, children: "\uD83D\uDD12 Keep Private" }))] }), _jsxs(Section, { style: styles.section, children: [_jsx(Heading, { as: "h3", style: styles.h3, children: "Request:" }), _jsx(Text, { style: styles.requestText, children: request })] })] }) })] }));
}
const styles = {
    main: { backgroundColor: "#f6f9fc", margin: 0, padding: "24px 0" },
    container: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        border: "1px solid #e5e7eb",
        padding: 24,
        width: "100%",
        maxWidth: 640,
    },
    label: {
        color: "#6b7280",
        fontSize: 12,
        textTransform: "uppercase",
        letterSpacing: 0.4,
    },
    section: {
        marginBottom: "16px",
    },
    h2: {
        fontSize: "20px",
        marginBottom: "16px",
    },
    h3: {
        fontSize: "16px",
        marginBottom: "8px",
    },
    requestText: {
        whiteSpace: "pre-wrap",
        lineHeight: "1.5",
    },
    urgentStyle: {
        color: "red",
        fontWeight: "bold",
    },
    privateStyle: {
        color: "purple",
        fontWeight: "bold",
    },
};
