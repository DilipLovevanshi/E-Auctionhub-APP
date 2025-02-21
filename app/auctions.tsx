import { APP_COLOR } from "constants/Colors";
import { useEffect, useState } from "react";
import { View, Text, Image } from "tamagui";
import { TouchableOpacity, StyleSheet, FlatList } from "react-native";
// import dayjs from "dayjs";
import { useLocalSearchParams, useRouter } from "expo-router";
import { BACKEND_API } from "constants/api";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import LoaderSkelton from "components/LoaderSkelton";
import RenderFooter from "components/NoAuctionFoundCard";

export default function AuctionScreen() {
  const { cityId, assetTypeId } = useLocalSearchParams() as any;
  const [loading, setLoading] = useState(false);
  const [auctions, setAuctions] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const LIMIT = 10;
  const router = useRouter();

  const fetchAuctions = async (pageNumber = 1, isRefreshing = false) => {
    if (loading) return;
    try {
      setLoading(true);
      // if (!isRefreshing) setLoading(true);

      const URL = `${BACKEND_API}auction/search?assetTypeId=${assetTypeId}&cityId=${cityId}&page=${pageNumber}&limit=${LIMIT}`;
      const response = await fetch(URL);
      const data = await response.json();
      console.log(data, "datatat");

      if (data?.statusCode === 200) {
        setAuctions((prev) =>
          isRefreshing ? data?.data : [...prev, ...data?.data]
        );
        setLastPage(data?.lastPage);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
      if (isRefreshing) setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAuctions(1, true);
  }, [cityId, assetTypeId]);

  const loadMore = () => {
    if (!loading && page < lastPage) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        fetchAuctions(nextPage);
        return nextPage;
      });
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchAuctions(1, true);
  };

  const renderFooter = () => {
    if (!loading) {
      return <RenderFooter />;
    }
  };

  const renderItem = ({ item: auction }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Image
          source={
            auction.assetType === "Flat"
              ? require("assets/images/assetsTypes/flat.png")
              : auction.assetType === "House"
              ? require("assets/images/assetsTypes/house.png")
              : auction.assetType === "Bungalow"
              ? require("assets/images/assetsTypes/banglow.jpg")
              : require("assets/images/assetsTypes/land.jpg")
          }
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.assetType}>
            {auction.assetType ? auction.assetType : "Others"}
          </Text>
          <Text style={styles.text}>
            <FontAwesome6 name="location-dot" size={16} color="black" />{" "}
            {auction.city}
          </Text>
          <Text style={styles.text}>
            <FontAwesome name="bank" size={14} color="black" /> {auction.bank}
          </Text>
          <Text style={styles.price}>
            <FontAwesome name="rupee" size={16} />{" "}
            {auction.reservePrice.toLocaleString()}
          </Text>
          <Text style={styles.date}>
            <Fontisto name="date" size={14} color="black" />{" "}
            <Text style={{ fontWeight: "bold" }}>
              {/* {dayjs(auction.startDate).format("MMM DD, YYYY")} */}
              {auction.startDate}
            </Text>
          </Text>
          {auction.applicationDeadLine && (
            <Text style={styles.deadline}>
              ⏳ Deadline Date:{" "}
              {/* {dayjs(auction.applicationDeadLine).format("MMM DD, YYYY")} */}
              {auction.applicationDeadLine}
            </Text>
          )}
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push({
            pathname: `/auctionDetails`,
            params: { auctionId: auction.id },
          })
        }
      >
        <Text style={styles.buttonText}>View Auction</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={auctions}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListFooterComponent={loading ? <LoaderSkelton /> : null}
        ListEmptyComponent={renderFooter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  card: {
    backgroundColor: "#fcfeff",
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    margin: 5,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: APP_COLOR.primary,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  assetType: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: "#555",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#28a745",
    marginVertical: 5,
  },
  date: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
  deadline: {
    fontSize: 14,
    color: "red",
    marginTop: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: APP_COLOR.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
