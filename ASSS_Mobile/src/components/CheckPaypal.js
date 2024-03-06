import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { endpoints } from "../config/Apis";
import { StatusBar } from "expo-status-bar";
import styles from "../constants/styles";

const CheckPaypal = ({ payID, navigation }) => {
  const [pdf, setPDF] = useState();
  const route = useRoute();
  const idPay = route.params;
  const BookingID = route.params;
  console.log("payID ở check", idPay.payID);
  const checkPaypal = async (payID) => {
    try {
      console.log("id khi qua check", payID);
      const data = new FormData();
      data.append("payment_id", payID);
      const res = await axios.post(endpoints["checkPaypal"], data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("res", res);
      // Nếu kết quả trả về từ checkPaypal là true, điều hướng về màn hình Home và hiển thị Toast thành công
      if (res.data === true) {
        Toast.show({
          type: "success",
          text1: "Thanh toán thành công!",
        });
        sendPDF();
        navigation.navigate("MyTab");
      } else {
        // Nếu kết quả trả về từ checkPaypal là false, quay lại màn hình trước đó và hiển thị Toast lỗi
        navigation.goBack();
        Toast.show({
          type: "error",
          text1: "Thanh toán không thành công. Vui lòng thử lại sau.",
        });
      }
    } catch (error) {
      console.error("Error when checking PayPal:", error);
      // Hiển thị Toast lỗi nếu có lỗi xảy ra khi kiểm tra PayPal
      Toast.show({
        type: "error",
        text1:
          "Đã có lỗi xảy ra khi kiểm tra thanh toán. Vui lòng thử lại sau.",
      });
    }
  };
  const sendPDF = async () => {
    console.log("id booking khi qua check", BookingID.BookingID);
    const id = BookingID.BookingID;
    try {
      const res = await axios.get(endpoints["pdfBooking"](id));

      // console.log("PDF", res);
      setPDF(res);
    } catch (error) {
      console.error("Error when checking PayPal:", error);
      // Hiển thị Toast lỗi nếu có lỗi xảy ra khi kiểm tra PayPal
      Toast.show({
        type: "error",
        text1:
          "Đã có lỗi xảy ra khi kiểm tra thanh toán. Vui lòng thử lại sau.",
      });
    }
  };

  useEffect(() => {
    checkPaypal(idPay.payID);
  }, [idPay.payID]);
  return (
    <View>
      <Text>Xin Chào</Text>
    </View>
  );
};
export default CheckPaypal;
