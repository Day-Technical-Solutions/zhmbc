import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Html, Head, Preview, Body, Container, Section, Heading, Text, Hr, } from "@react-email/components";
const Row = ({ label, value }) => value ? (_jsxs("div", { style: { marginBottom: 8 }, children: [_jsx(Text, { style: {
                margin: 0,
                color: "#6b7280",
                fontSize: 12,
                textTransform: "uppercase",
            }, children: label }), _jsx(Text, { style: {
                margin: 0,
                fontSize: 14,
                color: "#111827",
                whiteSpace: "pre-wrap",
            }, children: value })] })) : null;
export default function ApplicationEmail({ firstName, lastName, email, phone, address, dateOfBirth, memberSince, positionApplying, ministry, experience, qualifications, motivation, availability, references, hasCV = false, siteName = "Website", }) {
    const fullName = `${firstName} ${lastName}`.trim();
    return (_jsxs(Html, { children: [_jsx(Head, {}), _jsx(Preview, { children: `New Leadership Application from ${fullName}` }), _jsx(Body, { style: styles.body, children: _jsx(Container, { style: styles.container, children: _jsxs(Section, { children: [_jsx(Heading, { as: "h2", style: styles.h2, children: "New Application For Pastorhood" }), _jsxs(Text, { style: styles.meta, children: ["Submitted on ", siteName, "."] }), _jsx(Hr, { style: styles.hr }), _jsx(Row, { label: "Applicant", value: fullName }), _jsx(Row, { label: "Email", value: email }), _jsx(Row, { label: "Phone", value: phone }), _jsx(Row, { label: "Address", value: address }), _jsx(Row, { label: "Date of Birth", value: dateOfBirth }), _jsx(Row, { label: "Member Since", value: memberSince }), _jsx(Row, { label: "Position Applying For", value: positionApplying }), _jsx(Row, { label: "Ministry", value: ministry }), _jsx(Row, { label: "Experience", value: experience }), _jsx(Row, { label: "Qualifications", value: qualifications }), _jsx(Row, { label: "Motivation", value: motivation }), _jsx(Row, { label: "Availability", value: availability }), _jsx(Row, { label: "References", value: references }), _jsx(Row, { label: "CV Attached", value: hasCV ? "Yes" : "No" }), _jsx(Hr, { style: styles.hr })] }) }) })] }));
}
const styles = {
    body: { backgroundColor: "#f6f9fc", margin: 0, padding: "24px 0" },
    container: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        border: "1px solid #e5e7eb",
        padding: 24,
        width: "100%",
        maxWidth: 720,
    },
    h2: { margin: 0, fontSize: 20 },
    meta: { color: "#6b7280", fontSize: 13, marginTop: 8, marginBottom: 12 },
    hr: { borderColor: "#e5e7eb", margin: "14px 0" },
};
