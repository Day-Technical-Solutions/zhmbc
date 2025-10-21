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
} from "@react-email/components";

type PrayerRequestEmailProps = {
  name: string;
  email: string;
  requestType: string;
  urgent: boolean;
  isPrivate: boolean;
  request: string;
};

export default function PrayerRequestEmail({
  name,
  email,
  requestType,
  urgent,
  isPrivate,
  request,
}: PrayerRequestEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New Prayer Request from {name}</Preview>
      <Body style={styles.main}>
        <Container style={styles.container}>
          <Heading as="h2" style={styles.h2}>
            🙏 New Prayer Request
          </Heading>

          <Section style={styles.section}>
            <Text>
              <Text style={styles.label}>Name</Text> {name}
            </Text>
            <Text>
              <Text style={styles.label}>Email: </Text> {email}
            </Text>
            <Text>
              <Text style={styles.label}>Type: </Text>{" "}
              {requestType.toUpperCase()}
            </Text>
            {urgent && (
              <Text style={styles.urgentStyle}>⚠️ Marked as Urgent</Text>
            )}
            {isPrivate && (
              <Text style={styles.privateStyle}>🔒 Keep Private</Text>
            )}
          </Section>

          <Section style={styles.section}>
            <Heading as="h3" style={styles.h3}>
              Request:
            </Heading>
            <Text style={styles.requestText}>{request}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles: Record<string, React.CSSProperties> = {
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
    whiteSpace: "pre-wrap" as const,
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
