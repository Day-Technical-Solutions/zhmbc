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
  Link,
} from "@react-email/components";

type ContactEmailProps = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  siteName?: string; // optional branding
  siteUrl?: string; // optional link back
  toLabel?: string; // who receives (e.g., "ZHBC Office")
};
const styles: Record<string, React.CSSProperties> = {
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

export default function ContactEmail({
  name,
  email,
  phone,
  subject,
  message,
  siteName = "ZHMBC",
  siteUrl = "https://www.zhmbc.com/",
  toLabel = "Trustee",
}: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{`New contact from ${name}`}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section>
            <Heading style={styles.h1}>
              {siteName} — New Contact Message{" "}
            </Heading>
            <Text style={styles.meta}>
              You received a new message from <strong>{name}</strong>
              {siteUrl ? (
                <>
                  {" "}
                  via <Link href={siteUrl}>{siteName}</Link>
                </>
              ) : (
                <> via {siteName}</>
              )}
              .
            </Text>

            <Hr style={styles.hr} />

            <Section style={styles.block}>
              <Text style={styles.label}>Subject</Text>
              <Text style={styles.value}>{subject}</Text>
            </Section>

            <Section style={styles.block}>
              <Text style={styles.label}>From</Text>
              <Text style={styles.value}>
                {name} — <Link href={`mailto:${email}`}>{email}</Link>
                {phone ? (
                  <>
                    {" "}
                    — <Link href={`tel:${phone}`}>{phone}</Link>
                  </>
                ) : null}
              </Text>
            </Section>

            <Section style={styles.block}>
              <Text style={styles.label}>Message</Text>
              <Text style={styles.value}>&ldquo;{message}&rdquo;</Text>
            </Section>

            <Hr style={styles.hr} />
            <Text style={styles.footer}>
              This email was sent automatically to {toLabel}. Reply to the
              sender at <Link href={`mailto:${email}`}>{email}</Link>.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
