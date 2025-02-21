import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { APP_COLOR } from "constants/Colors";
import { WebView } from "react-native-webview";
import { useEffect, useState } from "react";
import { BACKEND_API } from "constants/api";
import { useUser } from "../context/UserContextProvider";
// import dayjs from "dayjs";

const AuctionDetails = () => {
  const { auctionId } = useLocalSearchParams() as any;
  const { user } = useUser();

  console.log(user, "user Data")

  const isPremiumUser = true
  const [auctionDetails, setAuctionDetails] = useState({} as any);
  const [loading, setLoading] = useState(true);

  const getAuctionById = async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtMmU5czcxMDAwMDExMjFrM3JpcGp6MnMiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTczOTYwNzE2NH0.MUYiJIr54ykn1-hKv0G8EfJozYa2kwQMR7HJKLZzrEg";
    let headers: any = {};
    try {
      setLoading(true);
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      const URL = `${BACKEND_API}auction/get/${auctionId}`;
      const response = await fetch(URL, {
        headers,
      });
      const data = await response.json();
      console.log(data);

      if (data.statusCode === 200) {
        setAuctionDetails(data?.data);
      }
    } catch (error) {
      console.log("error while fetching searched by id  auctions", error);
    } finally {
      setLoading(false);
    }
  };

  const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${auctionDetails.latitude},${auctionDetails.longitude}&hl=es&z=14&amp;output=embed`;

  useEffect(() => {
    getAuctionById();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Auction Details</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity>
            <FontAwesome5 name="heart" size={24} color={APP_COLOR.primary} />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome5
              name="share-alt"
              size={24}
              color={APP_COLOR.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome5 name="copy" size={24} color={APP_COLOR.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.field}>
            <FontAwesome5 name="building" size={20} /> Asset Type:{" "}
            {auctionDetails.assetType}
          </Text>
          <Text style={styles.field}>
            <FontAwesome5 name="ruler-combined" size={20} /> Area (in square
            feet) : {auctionDetails.areaSqFt}
          </Text>

          <Text style={[styles.field, styles.reservePricefiled]}>
            <FontAwesome5 name="tags" size={20} /> Reserve Price:{" "}
            {auctionDetails.reservePrice}
          </Text>
          <Text style={styles.field}>
            <FontAwesome5 name="coins" size={20} /> Earnest Money Deposit:{" "}
            {auctionDetails.emd}
          </Text>
          <Text style={styles.field}>
            <FontAwesome5 name="university" size={20} /> Bank Name:{" "}
            {auctionDetails.bank}
          </Text>

          <Text style={styles.field}>
            <FontAwesome5 name="map-marker-alt" size={20} /> Locality:{" "}
            {auctionDetails.locality}
          </Text>
          <Text style={styles.field}>
            <FontAwesome5 name="city" size={20} /> City: {auctionDetails.city}
          </Text>
          <Text style={styles.field}>
            <FontAwesome5 name="flag" size={20} /> State: {auctionDetails.state}
          </Text>

          <Text style={styles.field}>
            <FontAwesome5 name="calendar-alt" size={20} /> Application Date:{" "}
            {/* {auctionDetails.startDate || "NA"} */}
            {/* {dayjs(auctionDetails.startDate).format("MMM DD, YYYY")} */}
            {auctionDetails.startDate}
          </Text>
          <Text style={[styles.field, styles.appliationDeadlineFiled]}>
            <FontAwesome5 name="clock" size={20} color="orange" /> Application
            Deadline:{" "}
            {auctionDetails.applicationDeadLine
              ? auctionDetails.applicationDeadLin
              : "NA"}
          </Text>
        </View>
      </View>

      <View style={[styles.card, styles.premiumCard]}>
        <Text style={styles.premiumTitle}>Premium Details</Text>
        {isPremiumUser ? (
          <View>
            <View style={styles.detailRow}>
              <FontAwesome5 name="file-alt" size={20} style={styles.icon} />
              <View style={styles.textContainer}>
                <Text style={styles.fieldTitle}>Loan Account Number</Text>
                <Text style={styles.fieldValue}>
                  {auctionDetails.loanAccountNumber}
                </Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <FontAwesome5 name="user" size={20} style={styles.icon} />
              <View style={styles.textContainer}>
                <Text style={styles.fieldTitle}> Bank Contact Person</Text>
                <Text style={styles.fieldValue}>
                  {auctionDetails?.contactPerson?.name || "N/A"}
                </Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <FontAwesome5 name="phone-alt" size={20} style={styles.icon} />
              <View style={styles.textContainer}>
                <Text style={styles.fieldTitle}>Bank Contact Person Phone</Text>
                <Text style={styles.fieldValue}>
                  {auctionDetails?.contactPerson?.phone || "N/A"}
                </Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <FontAwesome5
                name="map-marker-alt"
                size={20}
                style={styles.icon}
              />
              <View style={styles.textContainer}>
                <Text style={styles.fieldTitle}>Property Address</Text>
                <Text style={styles.fieldValue}>
                  {auctionDetails.propertyAddress || "N/A"}
                </Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <FontAwesome5 name="file-pdf" size={20} style={styles.icon} />
              <View style={styles.textContainer}>
                <Text style={styles.fieldTitle}>Documents Link</Text>
                {auctionDetails?.documentLink?.length > 0 ? (
                  auctionDetails?.documentLink.map((el, index) => (
                    <Link key={index} href={el} style={{ color: "blue" }}>
                      {el}
                    </Link>
                  ))
                ) : (
                  <Text style={styles.fieldValue}>No documents available</Text>
                )}
              </View>
            </View>

            <View style={styles.detailRow}>
              <FontAwesome5
                name="map-marked-alt"
                size={20}
                style={styles.icon}
              />
              <View style={styles.textContainer}>
                <Text style={styles.fieldTitle}>Map</Text>
              </View>
            </View>

            <View
              style={{
                height: 250,
                shadowColor: "black",
                shadowOffset: { width: -1, height: 1 },
                shadowRadius: 18,
              }}
            >
              <WebView
                originWhitelist={["*"]}
                source={{
                  html: `<iframe src="${googleMapsEmbedUrl}" style="border:0;" allowFullScreen height="100%" width="100%" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>`,
                }}
              />
            </View>
          </View>
        ) : (
          <View style={styles.lockedContent}>
            <View style={styles.detailRow}>
              <FontAwesome5
                name="map-marker-alt"
                size={20}
                style={styles.icon}
              />
              <View style={styles.textContainer}>
                <Text style={styles.fieldTitle}>Loan Account Number:</Text>
                <Text
                  style={{
                    textShadowColor: "black",
                    textShadowOffset: { width: -1, height: 1 },
                    textShadowRadius: 18,
                    color: "transparent",
                  }}
                >
                  Test123AbcTest222555555
                </Text>
              </View>
            </View>
            <View style={styles.detailRow}>
              <FontAwesome5 name="user" size={20} style={styles.icon} />
              <View style={styles.textContainer}>
                <Text style={styles.fieldTitle}>Bank Contact Person:</Text>
                <Text
                  style={{
                    textShadowColor: "black",
                    textShadowOffset: { width: -1, height: 1 },
                    textShadowRadius: 18,
                    color: "transparent",
                  }}
                >
                  1234567890
                </Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <FontAwesome5
                name="map-marker-alt"
                size={20}
                style={styles.icon}
              />
              <View style={styles.textContainer}>
                <Text style={styles.fieldTitle}>Property Address:</Text>
                <Text
                  style={{
                    textShadowColor: "black",
                    textShadowOffset: { width: -1, height: 1 },
                    textShadowRadius: 18,
                    color: "transparent",
                  }}
                >
                  123, xyz Abc XXXXXXX xxxxxXXXXXX XX
                </Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <FontAwesome5 name="file-pdf" size={20} style={styles.icon} />
              <View style={styles.textContainer}>
                <Text style={styles.fieldTitle}>Documents:</Text>
                <Text
                  style={{
                    textShadowColor: "black",
                    textShadowOffset: { width: -1, height: 1 },
                    textShadowRadius: 18,
                    color: "transparent",
                  }}
                >
                  www.asdsads.sadsda
                </Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <FontAwesome5
                name="map-marker-alt"
                size={20}
                style={styles.icon}
              />
              <View style={styles.textContainer}>
                <Text style={styles.fieldTitle}>Location on Map:</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.upgradeButton}>
              <FontAwesome5 name="crown" size={18} color="white" />
              <Text style={styles.upgradeText}> Upgrade to Premium</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: "#f8f9fa" },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    margin: 7,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 15 },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  fieldContainer: { marginBottom: 10 },
  field: { fontSize: 18, marginVertical: 6, fontWeight: "bold", opacity: 0.6 },
  reservePricefiled: { color: "green" },
  appliationDeadlineFiled: { color: "orange" },
  premiumCard: {
    position: "relative",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gold",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  premiumTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#d4af37",
  },
  premiumField: {
    fontSize: 17,
    marginVertical: 6,
    fontWeight: "bold",
    opacity: 0.6,
    borderWidth: 1,
    padding: 8,
    borderRadius: 10,
    borderColor: "gold",
  },
  lockedContent: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 10,
    justifyContent: "center",
    borderRadius: 15,
    textAlign: "left",
  },
  upgradeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gold",
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  upgradeText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  // premiumCard: {
  //   backgroundColor: "white",
  //   borderWidth: 1,
  //   borderColor: "gold",
  //   padding: 20,
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 4 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 6,
  //   elevation: 3,
  //   borderRadius: 10,
  //   marginBottom: 10,
  // },
  // premiumTitle: {
  //   fontSize: 24,
  //   fontWeight: "bold",
  //   marginBottom: 15,
  //   color: "#d4af37",
  //   textAlign: "center",
  // },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
    color: "#d4af37",
  },
  textContainer: {
    flex: 1,
  },
  fieldTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  fieldValue: {
    fontSize: 16,
    fontWeight: "400",
    color: "#666",
  },
});

export default AuctionDetails;
