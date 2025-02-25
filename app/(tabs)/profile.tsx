import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { APP_COLOR } from "constants/Colors";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useUser } from "context/UserContextProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const getInitials = (name: string) => {
  return name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "";
};

const ProfileScreen = () => {
  const { user, setUser } = useUser();
  const isLoggedIn = user?.isLogin;
  const router = useRouter();

  const username = isLoggedIn ? user.name : "Guest User";
  const phoneNumber = isLoggedIn ? user.phone || "N/A" : "";
  const initials = getInitials(username);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      Toast.show({ type: "success", text1: "Logged Out" });
      setUser({
        id: "",
        name: "",
        phone: "",
        role: "USER",
        isLogin: false,
        isSubscribed: false,
        subscribedPlan: null,
      });
      router.push("/login");
    } catch (e) {
      // remove error
      console.log(e, "error");
    }

    console.log("Done.");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Profile Section */}
      {isLoggedIn && (
        <View style={styles.profileSection}>
          {/* Left: Circular Profile Picture */}
          <View style={styles.profileCircle}>
            <Text style={styles.initials}>{initials}</Text>
          </View>

          {/* Right: Name & Phone */}
          <View style={styles.profileDetails}>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.phoneNumber}>{phoneNumber}</Text>
          </View>
        </View>
      )}

      {/* Menu Options */}
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/premium")}
        >
          <MaterialIcons
            name="star"
            size={24}
            color="#333"
            style={styles.icon}
          />
          <Text style={styles.menuText}>Premium</Text>
        </TouchableOpacity>
        {isLoggedIn && (
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => console.log("Navigate to ChangePassword")}
          >
            <MaterialIcons
              name="lock"
              size={24}
              color="#333"
              style={styles.icon}
            />
            <Text style={styles.menuText}>Change Password</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => console.log("Navigate to AboutUs")}
        >
          <MaterialIcons
            name="info"
            size={24}
            color="#333"
            style={styles.icon}
          />
          <Text style={styles.menuText}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => console.log("Navigate to ContactUs")}
        >
          <MaterialIcons
            name="phone"
            size={24}
            color="#333"
            style={styles.icon}
          />
          <Text style={styles.menuText}>Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/termsAndConditions")}
        >
          <MaterialIcons
            name="description"
            size={24}
            color="#333"
            style={styles.icon}
          />
          <Text style={styles.menuText}>Terms and Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/privacyAndPolicy")}
        >
          <MaterialIcons
            name="shield"
            size={24}
            color="#333"
            style={styles.icon}
          />
          <Text style={styles.menuText}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>

      {/* Auth Buttons */}
      <View style={styles.authButtonsContainer}>
        {!isLoggedIn ? (
          <>
            <TouchableOpacity
              style={styles.authButton}
              onPress={() => router.push("/login")}
            >
              <AntDesign
                name="login"
                size={20}
                color="white"
                style={styles.icon}
              />
              <Text style={styles.authButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.authButton}
              onPress={() => router.push("/signup")}
            >
              <MaterialIcons
                name="create-new-folder"
                size={20}
                color="white"
                style={styles.icon}
              />
              <Text style={styles.authButtonText}>Signup</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.authButton} onPress={handleLogout}>
            <AntDesign
              name="logout"
              size={20}
              color="white"
              style={styles.icon}
            />
            <Text style={styles.authButtonText}>Logout</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#155E95",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  initials: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
  },
  profileDetails: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  phoneNumber: {
    fontSize: 16,
    color: "white",
    marginTop: 5,
  },
  menuContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  menuText: {
    fontSize: 16,
    color: "#333",
  },
  authButtonsContainer: {
    flexDirection: "row",
    marginTop: 20,
    width: "100%",
    justifyContent: "center",
    gap: 10,
  },
  authButton: {
    backgroundColor: APP_COLOR.primary,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  authButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
