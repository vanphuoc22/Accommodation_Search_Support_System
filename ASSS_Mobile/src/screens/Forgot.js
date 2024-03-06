import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import axios from "axios";
import { endpoints } from "../config/Apis";
import styles from "../constants/styles";
import Icon from "react-native-vector-icons/FontAwesome";

const Forgot = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(0); // 0: Nhập số điện thoại, 1: Nhập OTP, 2: Nhập mật khẩu mới, 3: Hoàn thành

  const handleSendOtp = async () => {
    try {
      const formData = new FormData();
      formData.append("phone_number", 388853371);

      const response = await axios.post(endpoints["sendOtp"], formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setStep(1); // Chuyển sang bước nhập OTP
        Alert.alert("OTP Sent", "Please check your phone for the OTP.");
      } else {
        Alert.alert("Error", "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred. Please try again later.");
    }
  };

  const handleVerifyOtp = async () => {
    console.log("otp_check", otp);
    try {
      const formData = new FormData();
      formData.append("otp_check", otp);
      console.log(otp);
      const response = await axios.post(endpoints["checkOTP"], formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setStep(2); // Chuyển sang bước nhập mật khẩu mới
        Alert.alert("OTP Verified", "Please enter a new password.");
      } else {
        Alert.alert("Error", "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred. Please try again later.");
    }
  };

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Password and Confirm Password do not match.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("phone_number", phoneNumber);
      // formData.append("otp_check", otp);
      formData.append("new_password", password);
      console.log(phoneNumber, password);
      const response = await axios.post(
        endpoints["otpChangeForgotPw"],
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.status === 200) {
        setStep(3); // Chuyển sang bước hoàn thành
        Alert.alert("Success", "Your password has been reset.");
      } else {
        Alert.alert("Error", "Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred. Please try again later.");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0: // Nhập số điện thoại
        return (
          <View style={[styles.viewLogin]}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                paddingTop: "50%",
              }}>
              <Text style={[styles.textHeader, { marginHorizontal: 50 }]}>
                Get a new Password
              </Text>
              <Image
                source={require("../library/images/logo1.png")}
                style={{ width: 50, height: 50 }}
              />
            </View>
            <Text style={{ marginVertical: 15 }}>Enter Phone Number:</Text>
            <View
              style={{
                marginHorizontal: 30,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ededed",
                width: "90%",
                borderRadius: 10,
                height: 60,
                marginRight: 30,
              }}>
              <Icon name="user" size={22} color="#818181" />
              <TextInput
                style={{
                  // position: "relative",
                  height: "100%",
                  width: "50%",
                  // fontFamily:'OpenSans-Medium',
                  paddingLeft: 20,
                }}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Enter Phone Number"
                placeholderTextColor="#818181"
              />
            </View>
            <TouchableOpacity style={styles.buttonFG} onPress={handleSendOtp}>
              <Text style={styles.buttonTextFG}>Send OTP</Text>
            </TouchableOpacity>
          </View>
        );
      case 1: // Nhập OTP
        return (
          <View style={[styles.viewLogin]}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                paddingTop: "50%",
              }}>
              <Text style={[styles.textHeader, { marginHorizontal: 50 }]}>
                Get a new Password
              </Text>
              <Image
                source={require("../library/images/logo1.png")}
                style={{ width: 50, height: 50 }}
              />
            </View>
            <Text style={{ marginVertical: 15 }}>Enter Phone Number:</Text>
            <View
              style={{
                marginHorizontal: 30,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ededed",
                width: "90%",
                borderRadius: 10,
                height: 60,
                marginRight: 30,
              }}>
              <Icon name="user" size={22} color="#818181" />
              <TextInput
                style={{
                  // position: "relative",
                  height: "100%",
                  width: "50%",
                  // fontFamily:'OpenSans-Medium',
                  paddingLeft: 20,
                }}
                value={otp}
                onChangeText={setOtp}
                placeholder="Enter OTP"
                placeholderTextColor="#818181"
              />
            </View>
            <TouchableOpacity style={styles.buttonFG} onPress={handleVerifyOtp}>
              <Text style={styles.buttonTextFG}>Send OTP</Text>
            </TouchableOpacity>
          </View>
        );
      case 2: // Nhập mật khẩu mới
        return (
          <View style={[styles.viewLogin]}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                paddingTop: "50%",
              }}>
              <Text style={[styles.textHeader, { marginHorizontal: 50 }]}>
                Get a new Password
              </Text>
              <Image
                source={require("../library/images/logo1.png")}
                style={{ width: 50, height: 50 }}
              />
            </View>
            <Text style={{ marginVertical: 15 }}>Enter Phone Number:</Text>
            <View
              style={{
                marginHorizontal: 30,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ededed",
                width: "90%",
                borderRadius: 10,
                height: 60,
                marginRight: 30,
              }}>
              <Icon name="user" size={22} color="#818181" />
              <TextInput
                style={{
                  // position: "relative",
                  height: "100%",
                  width: "50%",
                  // fontFamily:'OpenSans-Medium',
                  paddingLeft: 20,
                }}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Enter Password"
                placeholderTextColor="#818181"
              />
            </View>
            <View
              style={{
                marginHorizontal: 30,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ededed",
                width: "90%",
                borderRadius: 10,
                height: 60,
                marginRight: 30,
              }}>
              <Icon name="user" size={22} color="#818181" />
              <TextInput
                style={{
                  // position: "relative",
                  height: "100%",
                  width: "50%",
                  // fontFamily:'OpenSans-Medium',
                  paddingLeft: 20,
                }}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm Password"
                placeholderTextColor="#818181"
              />
            </View>
            <TouchableOpacity
              style={styles.buttonFG}
              onPress={handleResetPassword}>
              <Text style={styles.buttonTextFG}>Send OTP</Text>
            </TouchableOpacity>
          </View>
        );
      case 3: // Hoàn thành
        return (
          <View>
            <Text>Password Reset Successfully!</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text>Back to Login</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff", flexDirection: "column" }}>
      <Image
        flex={1}
        alt="Logo"
        resizeMode="cover"
        size="lg"
        w="full"
        source={require("../library/images/bg.png")}
      />
      <View
        style={{
          flex: 2,
          flexDirection: "column",
          paddingTop: 0,
          // paddingHorizontal: "2%",
        }}></View>
      <View
        w="full"
        h="full"
        position="absolute"
        top="0"
        px="6"
        justifyContent="center">
        {renderStep()}
      </View>
    </ScrollView>
  );
};

export default Forgot;
