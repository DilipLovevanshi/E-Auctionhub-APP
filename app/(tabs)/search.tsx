import { APP_COLOR } from "constants/Colors";
import { Button, H3, SizableText, Text, View, YStack } from "tamagui";
import { Dropdown } from "react-native-element-dropdown";
import { StyleSheet, ScrollView, TextInput } from "react-native";
import { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import { BACKEND_API } from "constants/api";
import Toast from "react-native-toast-message";

export default function search() {
  const [city, setCity] = useState("");
  const [bank, setBank] = useState("");
  const [assetType, setAssetType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [allCities, setAllCities] = useState([]);
  const [allBanks, setAllBanks] = useState([]);
  const [allAssetTypes, setAllAssetTypes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchCities();
    fetchBanks();
    fetchAssetsType();
  }, []);

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

  const fetchBanks = async () => {
    try {
      const response = await fetch(`${BACKEND_API}auction/banks`);
      if (response.ok) {
        const data = await response.json();
        setAllBanks(
          data.banks.map((bank) => ({ label: bank.name, value: bank.id }))
        );
      }
    } catch (error) {
      console.error("Error fetching banks:", error);
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

  const clearFilters = () => {
    setCity("");
    setBank("");
    setAssetType("");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <YStack flex={1} items="center" gap="$3">
        <H3 style={styles.headerText}>
          Advanced <Text style={{ color: APP_COLOR.primary }}>Search</Text>
        </H3>
        <SizableText size="$5" text="center" color="black">
          Find auction listings with more filter options.
        </SizableText>
        <Toast />

        <Dropdown
          style={styles.dropdown}
          data={allBanks}
          labelField="label"
          valueField="value"
          placeholder="Select Bank"
          value={bank}
          onChange={(item) => setBank(item.value)}
        />

        <Dropdown
          style={styles.dropdown}
          data={allCities}
          labelField="label"
          valueField="value"
          placeholder="Select City"
          search
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

        <View style={styles.priceContainer}>
          <TextInput
            style={[styles.input, styles.priceInput]}
            placeholder="Min Price"
            keyboardType="numeric"
            value={minPrice}
            onChangeText={setMinPrice}
          />
          <TextInput
            style={[styles.input, styles.priceInput]}
            placeholder="Max Price"
            keyboardType="numeric"
            value={maxPrice}
            onChangeText={setMaxPrice}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            onPress={clearFilters}
            style={styles.clearButton}
            fontSize={16}
            fontWeight={700}
          >
            Clear
          </Button>
          <Button
            onPress={() =>
              city || assetType || bank || minPrice || maxPrice
                ? router.push({
                    pathname: `/auctions`,
                    params: {
                      bankId: bank,
                      cityId: city,
                      assetTypeId: assetType,
                      minPrice,
                      maxPrice,
                    },
                  })
                : Toast.show({
                    type: "error",
                    text1: "Please select atleat one filed",
                  })
            }
            fontSize={16}
            fontWeight={700}
            style={styles.searchButton}
          >
            Search
          </Button>
        </View>
      </YStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "white",
    paddingTop: 40,
  },
  headerText: {
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: "100%",
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: "100%",
  },
  button: {
    backgroundColor: APP_COLOR.primary,
    color: "white",
    paddingVertical: 12,
    borderRadius: 8,
    textAlign: "center",
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 8,
  },

  searchButton: {
    flex: 1,
    backgroundColor: APP_COLOR.primary,
    color: "white",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },

  clearButton: {
    flex: 1,
    // backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "gray",
    color: "gray",
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  priceContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    width: "100%",
  },
  priceInput: {
    flex: 1,
  },
});
