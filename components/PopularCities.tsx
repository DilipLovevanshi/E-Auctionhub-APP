import { APP_COLOR } from "constants/Colors";
import { popularCitiesList } from "constants/staticData";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

const PopularCities = () => {
  const router = useRouter();

  return (
    <View style={styles.carouselContainer}>
      <Text style={styles.PopularCityTitle}>
        Popular{" "}
        <Text style={{ color: APP_COLOR.primary, fontWeight: "bold" }}>
          Cities
        </Text>
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        contentContainerStyle={styles.scrollContent}
      >
        {popularCitiesList.map((city: any, index: number) => (
          <TouchableOpacity
            key={index}
            style={styles.cityCircle}
            onPress={() =>
              router.push({
                pathname: `/auctions`,
                params: {
                  cityId: city.id,
                  assetTypeId: "",
                  bankId: "",
                  minPrice: "",
                  maxPrice: "",
                },
              })
            }
          >
            <Image source={city.image} style={styles.cityImage} />
            <Text style={styles.cityName}>{city.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 15,
    alignItems: "center",
    height: 150,
    opacity: 0.9,
  },
  PopularCityTitle: {
    fontSize: 20,
    fontWeight: "semibold",
    textAlign: "center",
    marginTop: 20,
    color: "#fff",
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
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 2.5,
    borderColor: APP_COLOR.primary,
  },
  cityName: {
    marginTop: 5,
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default PopularCities;
