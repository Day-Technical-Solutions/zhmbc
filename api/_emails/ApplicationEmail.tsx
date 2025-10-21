import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
} from "@react-email/components";

export interface ApplicationEmailProps {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  memberSince?: string;
  positionApplying?: string;
  ministry?: string;
  experience?: string;
  qualifications?: string;
  motivation?: string;
  availability?: string;
  references?: string;
  hasCV?: boolean;
  siteName?: string;
}

const Row = ({ label, value }: { label: string; value?: string }) =>
  value ? (
    <div style={{ marginBottom: 8 }}>
      <Text
        style={{
          margin: 0,
          color: "#6b7280",
          fontSize: 12,
          textTransform: "uppercase",
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          margin: 0,
          fontSize: 14,
          color: "#111827",
          whiteSpace: "pre-wrap",
        }}
      >
        {value}
      </Text>
    </div>
  ) : null;

export default function ApplicationEmail({
  firstName,
  lastName,
  email,
  phone,
  address,
  dateOfBirth,
  memberSince,
  positionApplying,
  ministry,
  experience,
  qualifications,
  motivation,
  availability,
  references,
  hasCV = false,
  siteName = "Website",
}: ApplicationEmailProps) {
  const fullName = `${firstName} ${lastName}`.trim();

  return (
    <Html>
      <Head />
      <Preview>{`New Leadership Application from ${fullName}`}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section>
            <Heading as="h2" style={styles.h2}>
              New Application For Pastorhood
            </Heading>
            <Text style={styles.meta}>Submitted on {siteName}.</Text>
            <Hr style={styles.hr} />

            <Row label="Applicant" value={fullName} />
            <Row label="Email" value={email} />
            <Row label="Phone" value={phone} />
            <Row label="Address" value={address} />
            <Row label="Date of Birth" value={dateOfBirth} />
            <Row label="Member Since" value={memberSince} />
            <Row label="Position Applying For" value={positionApplying} />
            <Row label="Ministry" value={ministry} />
            <Row label="Experience" value={experience} />
            <Row label="Qualifications" value={qualifications} />
            <Row label="Motivation" value={motivation} />
            <Row label="Availability" value={availability} />
            <Row label="References" value={references} />
            <Row label="CV Attached" value={hasCV ? "Yes" : "No"} />

            <Hr style={styles.hr} />
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles: Record<string, React.CSSProperties> = {
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
