import { Link, Tabs, useRouter } from "expo-router";
import { Button, H4, H5, H6, SizableText, useTheme } from "tamagui";
import {
  Atom,
  AudioWaveform,
  CircleUser,
  Home,
  Search,
} from "@tamagui/lucide-icons";
import { APP_COLOR } from "constants/Colors";
import { Image } from "react-native";
import { useUser } from "context/UserContextProvider";

export default function TabLayout() {
  const { user } = useUser();
  const router = useRouter();

  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.red10.val,
        tabBarStyle: {
          backgroundColor: theme.background.val,
          borderTopColor: theme.borderColor.val,
        },
        headerStyle: {
          backgroundColor: theme.background.val,
          borderBottomColor: theme.borderColor.val,
        },
        headerTintColor: theme.color.val,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "",
          title: "Home",
          tabBarIcon: ({ color }) => <Home color={color as any} />,
          headerRight: () => (
            <SizableText
              style={{
                backgroundColor: APP_COLOR.primary,
                padding: 5,
                borderRadius: 5,
                color: "white",
                marginRight: 5,
              }}
              onPress={() =>
                user.isLogin ? router.push("/profile") : router.push("/login")
              }
            >
              {user.isLogin ? user.name.slice(0, 13) : "Login/Signup"}
              {/* <CircleUser color={"white" as any} /> */}
            </SizableText>
          ),
          headerLeft: () => (
            <Image
              style={{ height: 20, width: 120, marginLeft: 5 }}
              source={require("../../assets/images/logo/logo.png")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerTitle: "",
          title: "Advance Search",

          headerLeft: () => (
            <Image
              style={{ height: 20, width: 120, marginLeft: 5 }}
              source={require("../../assets/images/logo/logo.png")}
            />
          ),
          tabBarIcon: ({ color }) => <Search color={color as any} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "",
          title: "Profile",

          headerLeft: () => (
            <Image
              style={{ height: 20, width: 120, marginLeft: 5 }}
              source={require("../../assets/images/logo/logo.png")}
            />
          ),
          tabBarIcon: ({ color }) => <CircleUser color={color as any} />,
        }}
      />
    </Tabs>
  );
}
