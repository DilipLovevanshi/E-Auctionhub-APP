import { APP_COLOR } from "constants/Colors";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Switch,
  Alert,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from "react-native";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { BACKEND_API } from "constants/api";

const SignupScreen = ({ navigation }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhoneChange = (text) => {
    if (text.length <= 10) {
      handleInputChange("phone", text);
    }
    if (text.length === 10) {
      Keyboard.dismiss();
    }
  };

  const validateForm = () => {
    const { name, phone, password, confirmPassword, termsAccepted } = formData;
    if (!name || !phone || !password || !confirmPassword) {
      Toast.show({ type: "error", text1: "All fields are required." });
      return false;
    }
    if (phone.length !== 10) {
      Toast.show({
        type: "error",
        text1: "Enter a valid 10-digit phone number.",
      });
      return false;
    }
    if (password !== confirmPassword) {
      Toast.show({ type: "error", text1: "Passwords do not match." });
      return false;
    }
    if (password.length < 6) {
      Toast.show({
        type: "error",
        text1: "Password must be at least 6 characters.",
      });
      return false;
    }
    if (!termsAccepted) {
      Toast.show({
        type: "error",
        text1: "Accept Privacy Policy and Terms & Conditions.",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = { ...formData, phone: `+91${formData.phone}` };
      const response = await fetch(`${BACKEND_API}user/create-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log(data, " signup Data");

      if (data?.statusCode === 201) {
        handleSendOtp(data.user.phone);
      } else {
        Toast.show({ type: "error", text1: data.message });
      }
    } catch (error) {
      Toast.show({ type: "error", text1: "Error during signup." });
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (phone) => {
    try {
      const response = await fetch(`${BACKEND_API}user/send-otp-phone`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await response.json();
      if (data.statusCode === 200) {
        Toast.show({ type: "success", text1: "OTP sent to your phone." });
        router.push({
          pathname: `/verifyOtp`,
          params: { phone: phone },
        });
      } else {
        Toast.show({ type: "error", text1: "Failed to send OTP." });
      }
    } catch (error) {
      Toast.show({ type: "error", text1: "Error while sending OTP." });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create Account</Text>
      <Toast />

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={formData.name}
          onChangeText={(text) => handleInputChange("name", text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          keyboardType="number-pad"
          value={formData.phone}
          onChangeText={handlePhoneChange} // Handle phone change here
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

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm your password"
          secureTextEntry
          value={formData.confirmPassword}
          onChangeText={(text) => handleInputChange("confirmPassword", text)}
        />
      </View>

      <View style={styles.checkboxContainer}>
        <Switch
          value={formData.termsAccepted}
          onValueChange={(value) => handleInputChange("termsAccepted", value)}
        />
        <Text style={styles.checkboxText}>
          I accept the Privacy Policy and Terms & Conditions
        </Text>
      </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.authButton}>
        <Text style={styles.authButtonText}>Signup</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.loginLink}>Login</Text>
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
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "flex-start",
  },
  checkboxText: {
    marginHorizontal: 10,
    fontSize: 14,
    textAlign: "center",
    flexShrink: 1, // Prevents text from going out of the screen
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
  loginContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  loginText: {
    fontSize: 14,
    color: "#666",
  },
  loginLink: {
    fontSize: 16,
    color: APP_COLOR.primary,
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default SignupScreen;
