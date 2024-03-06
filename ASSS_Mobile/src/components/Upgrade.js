import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Button,
  Modal,
} from "react-native";
import Buttons from "../components/Buttons";
import { Colors } from "../constants";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../constants/styles";
import { useEffect } from "react";
import Info1 from "../components/Info1";
import Toast from "react-native-toast-message";
import { MyUserContext } from "../../App";
import axios from "axios";
import { authApiToken, endpoints } from "../config/Apis";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Upgrade = ({ navigation }) => {
  const [user, dispatch] = useContext(MyUserContext);
  const [showModal, setShowModal] = useState(true);
  const [otp, setOTP] = useState();
  const [otpUpgrade, setOtpUpgrade] = useState();

  const handleSendOTP = async () => {
    setShowModal(false);
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

  const handleUpgrade = async () => {
    console.log("Tức quá douma");
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    let formData = new FormData();
    formData.append("otp_check", otpUpgrade);
    console.log("OTP", otpUpgrade);

    try {
      const myUser = await authApiToken(token).post(
        endpoints["upgradeAcc"],
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log("sai cái gì", myUser.data);

      if (myUser.status === 200) {
        console.log("Thanhcong");
        navigation.navigate("Login");
      }
      // console.log("sai cái gì", myUser.data);
      // setOtpUpgrade(myUser.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff", flexDirection: "column" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Image
        flex={1}
        alt="Logo"
        resizeMode="cover"
        size="lg"
        w="full"
        source={require("../library/images/bg.png")}
      />
      <View
        w="full"
        h="full"
        position="absolute"
        top="0"
        px="6"
        justifyContent="center">
        {/* {Login form} */}
        <View
          style={{
            flex: 2,
            flexDirection: "column",
            paddingTop: 0,
            paddingHorizontal: "2%",
          }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingTop: "30%",
            }}>
            <Text style={styles.textHeader}>Upgrade to host</Text>
            <Image
              source={require("../library/images/logo1.png")}
              style={{ width: 50, height: 50 }}
            />
          </View>
          <Text style={styles.textInfor}>Fill all to create account!!!</Text>
          <View style={[styles.viewLogin, { marginRight: 25 }]}>
            <View>
              <View>
                <View style={[styles.inputSignUp]}>
                  <Icon name="envelope-o" size={15} color="#818181" />
                  <TextInput
                    style={[styles.input, { marginRight: 20 }]}
                    value={otpUpgrade}
                    placeholder="Enter OTP code"
                    onChangeText={(text) => setOtpUpgrade(text)}
                    placeholderTextColor="#818181"
                  />
                </View>
              </View>
            </View>

            <View style={{ paddingTop: 40 }}></View>

            <Buttons btn_text={"Upgrade"} on_press={handleUpgrade} />
          </View>
          <Modal
            visible={showModal}
            animationType="slide"
            transparent
            style={{ margin: 40, borderRadius: 1000 }}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                margin: 40,
                height: 100,
                borderRadius: 1000,
              }}>
              <ScrollView
                style={{ backgroundColor: Colors.background, padding: 20 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}>
                  Điều khoản và điều kiện
                </Text>
                <Text style={styles.termsAndConditions}>
                  Chào mừng bạn đến với nền tảng của chúng tôi! Bằng việc trở
                  thành một tài khoản chủ trọ, bạn đồng ý tuân thủ các điều
                  khoản và quy định sau đây: Quyền lợi của tài khoản chủ trọ:
                </Text>
                <Text style={styles.termsAndConditions}>
                  a) Đăng bài: Bạn có quyền đăng bài về thông tin phòng trọ, căn
                  hộ hoặc nhà ở mà bạn muốn cho thuê.
                </Text>
                <Text style={styles.termsAndConditions}>
                  {" "}
                  b) Tìm kiếm khách hàng: Bạn được phép tìm kiếm và xem thông
                  tin các khách hàng có nhu cầu thuê trọ trên nền tảng của chúng
                  tôi. Thông báo đến khách hàng:
                </Text>
                <Text style={styles.termsAndConditions}>
                  a) Khi có bài đăng mới: Khi bạn đăng bài mới, chúng tôi sẽ gửi
                  thông báo tới các khách hàng phù hợp với yêu cầu của bạn để họ
                  có thể tìm hiểu và liên hệ với bạn.
                </Text>
                <Text style={styles.termsAndConditions}>
                  {" "}
                  b) Thông qua email hoặc ứng dụng: Thông báo sẽ được gửi đến
                  khách hàng thông qua email hoặc thông qua ứng dụng của chúng
                  tôi. Quy đổi bài đăng thành 100.000 VNĐ:
                </Text>
                <Text style={styles.termsAndConditions}>
                  Bằng cách sử dụng nền tảng của chúng tôi, bạn đồng ý rằng bạn
                  đã đọc, hiểu và chấp nhận các điều khoản và điều kiện này. Nếu
                  bạn không đồng ý hoặc có bất kỳ câu hỏi nào, vui lòng liên hệ
                  với chúng tôi để được hỗ trợ.
                </Text>

                <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Profile")}
                    style={{ marginRight: 20 }}>
                    <Text style={{ color: "blue" }}>Từ chối</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleSendOTP}
                    style={{ marginRight: 20 }}>
                    <Text style={{ color: "blue" }}>Đồng ý</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </Modal>
        </View>
      </View>
    </ScrollView>
  );
};

export default Upgrade;

const pdfBooking = async () => {
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
      Alert.alert("OTP Sent", "Please check your phone fo.");
    } else {
      Alert.alert("Error", "Failed to send OTP. Please try again.");
    }
  } catch (error) {
    console.error(error);
    Alert.alert("Error", "An error occurred. Please try again later.");
  }
};
