import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";

const PrivacyAndPolicy = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>EAuctionsHub Privacy Policy</Text>
      <Text style={styles.subHeader}>Last Updated: January 7, 2025</Text>

      <Text style={styles.paragraph}>
        At EAuctionsHub, developed by Aperra Solutions, we are committed to
        protecting and respecting your privacy...
      </Text>

      <Text style={styles.sectionTitle}>Information We Collect</Text>
      <Text style={styles.boldText}>Personal Information:</Text>
      <Text style={styles.paragraph}>
        - Registration Information: When you create an account, we may collect
        your name, email address, phone number, and other registration details.
      </Text>
      <Text style={styles.paragraph}>
        - Auctions Participation Information: We collect relevant transaction
        data such as payment details (excluding sensitive financial data, which
        is processed by third-party payment processors).
      </Text>

      <Text style={styles.boldText}>Non-Personal Information:</Text>
      <Text style={styles.paragraph}>
        - Technical Data: We may collect technical data such as your IP address,
        browser type, operating system, device information, and browsing
        behavior.
      </Text>

      <Text style={styles.sectionTitle}>How We Use Your Information</Text>
      <Text style={styles.paragraph}>
        - Account Management: To create and manage your account.
      </Text>
      <Text style={styles.paragraph}>
        - Transaction Processing: To process your transactions securely.
      </Text>
      <Text style={styles.paragraph}>
        - Personalization: To tailor content and recommendations.
      </Text>

      <Text style={styles.sectionTitle}>How We Protect Your Information</Text>
      <Text style={styles.paragraph}>
        We implement a range of security measures including data encryption,
        secure storage, and access controls. However, no method of electronic
        transmission is 100% secure.
      </Text>

      <Text style={styles.sectionTitle}>Sharing Your Information</Text>
      <Text style={styles.paragraph}>
        - Service Providers: We may share your data with third-party providers
        for platform functionality.
      </Text>
      <Text style={styles.paragraph}>
        - Legal Compliance: We may disclose information as required by law.
      </Text>

      <Text style={styles.sectionTitle}>Your Choices and Rights</Text>
      <Text style={styles.paragraph}>
        - Access and Update: You can manage your data through your account.
      </Text>
      <Text style={styles.paragraph}>
        - Opt-Out: You can unsubscribe from promotional emails.
      </Text>
      <Text style={styles.paragraph}>
        - Data Deletion: You can request data removal by contacting us.
      </Text>

      <Text style={styles.sectionTitle}>Contact Us</Text>
      <Text style={styles.paragraph}>Email: privacy@eAuctionshub.com</Text>
      <Text style={styles.paragraph}>Phone: +918788241970</Text>
      <Text style={styles.paragraphEnd}>Address: Nagpur</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    margin: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
  },
  boldText: {
    fontWeight: "bold",
    marginTop: 10,
  },
  paragraph: {
    fontSize: 14,
    marginTop: 5,
    lineHeight: 20,
  },
  paragraphEnd: {
    fontSize: 14,
    marginTop: 5,
    lineHeight: 20,
    marginBottom: 34,
  },
});

export default PrivacyAndPolicy;
