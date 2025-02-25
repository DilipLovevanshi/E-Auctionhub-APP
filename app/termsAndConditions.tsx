import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";

const TermsAndConditions = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>EAuctionsHub Terms and Conditions</Text>
      <Text style={styles.date}>Last Updated: January 7, 2025</Text>

      <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
      <Text style={styles.text}>
        By using the EAuctionsHub Platform, you acknowledge and agree that you
        have read, understood, and accepted these Terms and Conditions,
        including any future amendments. If you do not agree with these Terms,
        you should stop using the Platform immediately.
      </Text>

      <Text style={styles.sectionTitle}>2. Eligibility</Text>
      <Text style={styles.text}>
        You must be at least 18 years of age to use the Platform. By agreeing to
        these Terms, you affirm that you are legally capable of entering into
        binding contracts under the applicable law of your jurisdiction.
      </Text>

      <Text style={styles.sectionTitle}>3. Use of Platform</Text>
      <Text style={styles.text}>
        EAuctionsHub grants you a limited, non-exclusive, non-transferable
        license to access and use the Platform for personal, non-commercial
        purposes only.
      </Text>

      <Text style={styles.sectionTitle}>4. Auctions Listings</Text>
      <Text style={styles.text}>
        EAuctionsHub acts as an intermediary between buyers and sellers
        (including banks and financial institutions) by providing Auctions
        listings. The details of each Auction are provided as received from
        third-party sources.
      </Text>

      <Text style={styles.sectionTitle}>5. User Registration</Text>
      <Text style={styles.text}>
        To access certain features of the Platform, you may need to create an
        account. You agree to provide accurate and complete information and
        maintain the confidentiality of your account credentials.
      </Text>

      <Text style={styles.sectionTitle}>6. Bidding and Participation</Text>
      <Text style={styles.text}>
        Users may place bids on Auction listings through the Platform as
        permitted. All bids are final and binding.
      </Text>

      <Text style={styles.sectionTitle}>7. Payment and Transactions</Text>
      <Text style={styles.text}>
        Payments must be made in accordance with the terms specified by the
        Auctions organizers (banks, financial institutions). EAuctionsHub does
        not handle or process any payments.
      </Text>

      <Text style={styles.sectionTitle}>8. Fees</Text>
      <Text style={styles.text}>
        EAuctionsHub may charge fees for certain services, such as premium
        listings. Any applicable fees will be clearly outlined on the Platform.
      </Text>

      <Text style={styles.sectionTitle}>9. Intellectual Property</Text>
      <Text style={styles.text}>
        All content, trademarks, logos, and intellectual property related to the
        Platform are owned by Aperra Solutions and are protected by applicable
        laws.
      </Text>

      <Text style={styles.sectionTitle}>10. Privacy Policy</Text>
      <Text style={styles.text}>
        Please review our Privacy Policy to understand how we collect, use, and
        protect your data.
      </Text>

      <Text style={styles.sectionTitle}>11. Disclaimer of Warranties</Text>
      <Text style={styles.text}>
        The Platform is provided on an "as-is" basis. EAuctionsHub does not
        provide any warranties regarding its functionality, accuracy, or
        reliability.
      </Text>

      <Text style={styles.sectionTitle}>12. Limitation of Liability</Text>
      <Text style={styles.text}>
        EAuctionsHub will not be liable for any indirect, incidental,
        consequential, or punitive damages arising from the use of the Platform.
      </Text>

      <Text style={styles.sectionTitle}>13. Indemnification</Text>
      <Text style={styles.text}>
        You agree to indemnify, defend, and hold harmless EAuctionsHub from any
        claims, liabilities, damages, or losses arising from your use of the
        Platform.
      </Text>

      <Text style={styles.sectionTitle}>14. Termination</Text>
      <Text style={styles.text}>
        EAuctionsHub reserves the right to suspend or terminate your access to
        the Platform at any time.
      </Text>

      <Text style={styles.sectionTitle}>15. Amendments to Terms</Text>
      <Text style={styles.text}>
        EAuctionsHub may update these Terms at any time. You are responsible for
        reviewing these Terms regularly.
      </Text>

      <Text style={styles.sectionTitle}>16. Governing Law</Text>
      <Text style={styles.text}>
        These Terms are governed by the laws of India. Any disputes will be
        resolved in the courts located in [insert jurisdiction].
      </Text>

      <Text style={styles.sectionTitle}>17. Contact Us</Text>
      <Text style={styles.sectionTitleEnd}>
        If you have any questions, contact us at support@eAuctionshub.com or
        +918788241970.
      </Text>
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
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  date: {
    fontSize: 14,
    textAlign: "center",
    color: "#777",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    color: "#444",
  },
  text: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    marginBottom: 10,
  },
  sectionTitleEnd: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    marginBottom: 32,
  },
});

export default TermsAndConditions;
