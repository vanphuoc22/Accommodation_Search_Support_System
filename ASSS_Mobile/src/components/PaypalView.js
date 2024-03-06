import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { endpoints } from "../config/Apis";
import { WebView } from "react-native-webview";
import axios from "axios";
import styles from "../constants/styles";
import { MyUserContext } from "../../App";

const PaypalView = ({ route }) => {
  const [approvalUrl, setapprovalUrl] = useState(null);
  const [confirmPayment, setConfirmPayment] = useState(false);
  const [user, dispatch] = useContext(MyUserContext);
  const amount = route.params?.amount;

  const createPayment = async () => {
    try {
      const res = await axios.post(endpoints["paypal"], {
        amount: amount,
      });
      setapprovalUrl(res.data);
      console.log("url thanh toán", res.data);
    } catch (e) {
      console.error("error createPayment", e);
    }
  };
  useEffect(() => {
    createPayment();
  }, []);
  return (
    <View>
      {approvalUrl == null ? (
        <View>
          <Text>Bấm Thanh Toán Đi</Text>
          <Text>Thanh Toán</Text>
          <Image source={require("../library/images/hand.png")} />
        </View>
      ) : (
        <>
          <WebView source={{ uri: approvalUrl }} />
        </>
      )}
    </View>
  );
};

export default PaypalView;
