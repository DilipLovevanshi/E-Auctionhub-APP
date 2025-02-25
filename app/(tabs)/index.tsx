import { APP_COLOR } from "constants/Colors";
import { Button, H3, SizableText, Text, View, YStack } from "tamagui";
import { Dropdown } from "react-native-element-dropdown";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import { BACKEND_API } from "constants/api";
import PopularCities from "components/PopularCities";
import Footer from "components/Footer";
import { useUser } from "../../context/UserContextProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export default function TabOneScreen() {
  const [city, setCity] = useState("");
  const [allCities, setAllCities] = useState([] as any);
  const [topCities, setTopCities] = useState([] as any);
  const [allAssetTypes, setAllAssetTypes] = useState([] as any);
  const { user, setUser } = useUser();

  const router = useRouter();

  const [assetType, setAssetType] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const fetchCities = async () => {
    try {
      const response = await fetch(`${BACKEND_API}user/cities`);
      if (response.ok) {
        const data = await response.json();
        setAllCities(
          data.cities.map((city) => ({ label: city.name, value: city.id }))
        );
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const fetchPopularCities = async () => {
    try {
      const response = await fetch(`${BACKEND_API}auction/top-cities`);
      if (response.ok) {
        const data = await response.json();
        setTopCities(data);
      } else {
        console.log("error white fetching cities ", response);
      }
    } catch (error) {
      console.error("Error fetching  cities :", error);
    }
  };

  const fetchAssetsType = async () => {
    try {
      const response = await fetch(`${BACKEND_API}auction/asset-types`);
      if (response.ok) {
        const data = await response.json();
        setAllAssetTypes(
          data.assetTypes.map((asset) => ({
            label: asset.name,
            value: asset.id,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching asset types:", error);
    }
  };

  useEffect(() => {
    getUser();
    fetchCities();
    fetchAssetsType();
    fetchPopularCities();
  }, []);

  const getUser = async () => {
    const token = await AsyncStorage.getItem("token");

    if (!token) return;
    try {
      const URL = `${BACKEND_API}user/get-user`;
      const response = await fetch(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      console.log(data, "login person token data");

      if (data.statusCode === 200) {
        setUser((prev: any) => ({
          ...prev,
          id: data?.data?.id,
          name: data?.data?.name,
          phone: data?.data?.phone,
          role: data?.data?.role,
          isSubscribed: data?.data?.subscribed,
          isLogin: data?.data?.verified,
          subscribedPlan: data?.data?.subscribedPlan[0] || null,
        }));
      } else {
      }
    } catch (error) {
      console.log("error while getting user", error);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/home.jpg")}
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <YStack flex={1} items="center" gap="$2">
          <View px="$4" bg="rgba(0,0,0,0.5)" style={styles.overlay}>
            <View style={styles.topContainer}>
              <H3 style={styles.headerText}>
                Your Trusted Place{" "}
                <Text style={{ color: APP_COLOR.primary }}>
                  for Auctioned Assets
                </Text>
              </H3>
              <SizableText size="$5" text="center" color="white">
                Find your next great investment with our exclusive bank auction
                listings.
              </SizableText>
              <Toast />
              <View style={styles.container}>
                <Dropdown
                  style={styles.dropdown}
                  data={allCities}
                  maxHeight={300}
                  search
                  labelField="label"
                  valueField="value"
                  placeholder="Select City"
                  searchPlaceholder="Search City..."
                  value={city}
                  onChange={(item) => setCity(item.value)}
                />
                <Dropdown
                  style={styles.dropdown}
                  data={allAssetTypes}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Asset Type"
                  value={assetType}
                  onChange={(item) => setAssetType(item.value)}
                />
                <Button
                  onPress={() =>
                    city || assetType
                      ? router.push({
                          pathname: `/auctions`,
                          params: {
                            cityId: city,
                            assetTypeId: assetType,
                            bankId: "",
                            minPrice: "",
                            maxPrice: "",
                          },
                        })
                      : Toast.show({
                          type: "error",
                          text1: "Select City or Asset Type",
                        })
                  }
                  fontSize={16}
                  fontWeight={700}
                  style={styles.button}
                >
                  Search Auction
                </Button>
              </View>
            </View>

            <PopularCities />

            <View style={styles.popularSection}>
              <Text style={styles.sectionTitle}>
                {" "}
                <Text style={{ color: APP_COLOR.primary, fontWeight: "bold" }}>
                  Top
                </Text>{" "}
                Auctions Cities
              </Text>
              <FlatList
                data={topCities}
                numColumns={2}
                scrollEnabled={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.cityCard}
                    onPress={() =>
                      router.push({
                        pathname: `/auctions`,
                        params: {
                          cityId: item.id,
                          assetTypeId: "",
                          bankId: "",
                          minPrice: "",
                          maxPrice: "",
                        },
                      })
                    }
                  >
                    <Text style={styles.auctionCount}>{item.count}+</Text>
                    <Text style={styles.cityLabel}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </YStack>
        <Footer />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 90,
  },
  topContainer: {},
  headerText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  container: {
    backgroundColor: "white",
    padding: 20,
    // width: 310,
    borderRadius: 10,
    marginTop: 30,
    gap: 15,
    opacity: 0.9,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: APP_COLOR.primary,
    color: "white",
  },
  popularSection: {
    width: 340,
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    opacity: 0.9,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "semibold",
    textAlign: "center",
    marginBottom: 5,
    color: "#fff",
  },
  cityCard: {
    flex: 1,
    margin: 8,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    elevation: 3,
    paddingVertical: 12,
    alignItems: "center",
  },
  auctionCount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
  },
  cityLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  carouselContainer: {
    // marginTop: 20,
    alignItems: "center",
    height: 200,
  },

  scrollContent: {
    flexDirection: "row",
    paddingHorizontal: 6,
  },
  cityCircle: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 6,
  },
  cityImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "white",
  },
  cityName: {
    marginTop: 5,
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});
