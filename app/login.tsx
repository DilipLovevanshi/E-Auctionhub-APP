import { APP_COLOR } from "constants/Colors";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useRouter } from "expo-router";
import { BACKEND_API } from "constants/api";
import Toast from "react-native-toast-message";

const LoginScreen = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  useEffect(() => {
    const getData = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        router.push("/");
      }
    };

    getData();
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhoneChange = (text) => {
    // Allow only 10 digits and close the keyboard after reaching 10 digits
    if (text.length <= 10) {
      handleInputChange("phone", text);
    }
    if (text.length === 10) {
      Keyboard.dismiss(); // Close the keyboard after 10 digits
    }
  };

  const validateForm = () => {
    const { phone, password } = formData;

    if (!phone || !password) {
      Alert.alert("Validation Error", "All fields are required.");
      return false;
    }

    if (phone.length !== 10) {
      Alert.alert(
        "Validation Error",
        "Please enter a valid 10-digit phone number."
      );
      return false;
    }

    if (password.length < 6) {
      Alert.alert(
        "Validation Error",
        "Password must be at least 6 characters."
      );
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      // Show loading state if needed
      // setLoading(true);

      const payload = {
        phone: `+91${formData.phone}`,
        password: formData.password,
      };

      const response = await fetch(`${BACKEND_API}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      console.log(data, "login Data");

      if (data.statusCode === 200) {
        Toast.show({ type: "success", text1: "Login Successful" });
        await AsyncStorage.setItem("token", data.token);
        await AsyncStorage.setItem("role", data.role);

        router.push("/");
      } else {
        Toast.show({ type: "error", text1: data.message });
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "An error occurred",
        text2: error.message,
      });
    } finally {
      // setLoading(false); // Hide loading state
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Login</Text>
      <Toast />

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          keyboardType="number-pad"
          value={formData.phone}
          onChangeText={handlePhoneChange}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={formData.password}
          onChangeText={(text) => handleInputChange("password", text)}
        />
      </View>

      <TouchableOpacity onPress={handleLogin} style={styles.authButton}>
        <Text style={styles.authButtonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/signup")}>
          <Text style={styles.signupLink}>Signup</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: APP_COLOR.primary,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
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
    alignItems: "center",
    marginTop: 20,
  },
  authButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  signupContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  signupText: {
    fontSize: 14,
    color: "#666",
  },
  signupLink: {
    fontSize: 16,
    color: APP_COLOR.primary,
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default LoginScreen;
