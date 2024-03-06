// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   Image,
// } from "react-native";
// import React, { useContext, useEffect, useState } from "react";
// import { endpoints } from "../config/Apis";
// import { WebView } from "react-native-webview";
// import axios from "axios";
// import styles from "../constants/styles";
// import { MyUserContext } from "../../App";
// import { useRoute } from "@react-navigation/native";
// import { Colors } from "../constants";

// const Paypal = () => {
//   const [approvalUrl, setapprovalUrl] = useState(null);
//   const [confirmPayment, setConfirmPayment] = useState(true);
//   const [user, dispatch] = useContext(MyUserContext);
//   const route = useRoute();
//   const { postDetail1 } = route.params;
//   const { houseDetail1 } = route.params;
//   const { DetailsOwner1 } = route.params;
//   const amount = route.params?.amount;

//   const createPayment = async () => {
//     if (confirmPayment) {
//       try {
//         const res = await axios.post(endpoints["paypal"], {
//           amount: amount,
//         });
//         setapprovalUrl(res.data);
//         console.log("url thanh toán", res.data);
//       } catch (e) {
//         console.error("error createPayment", e);
//       }
//     } else {
//       // Không làm gì nếu không xác nhận thanh toán
//       console.log("Không xác nhận thanh toán");
//     }
//   };
//   const handleConfirmation = () => {
//     Alert.alert(
//       "Xác nhận thanh toán",
//       "Thanh toán sẽ không hoàn tiền nếu thay đổi ý định",
//       [
//         {
//           text: "No",
//           onPress: () => setConfirmPayment(false),
//           style: "cancel",
//         },
//         {
//           text: "Yes",
//           onPress: () => {
//             setConfirmPayment(true);
//             createPayment();
//           },
//         },
//       ],
//     );
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: "#fff", flexDirection: "column" }}>
//       <View style={{ flexDirection: "row", paddingTop: 10, paddingBottom: 0 }}>
//         <Image
//           source={require("../library/images/logo1.png")}
//           style={{ width: 50, height: 50, marginLeft: 12, paddingBottom: 0 }}
//         />
//         <Text
//           style={{
//             color: Colors.green,
//             paddingTop: 10,
//             fontWeight: "bold",
//             fontSize: 20,
//             textAlign: "center",
//             fontStyle: "italic",
//           }}>
//           PiscesHouse
//           <Text style={{ color: Colors.purple }}>
//             {" "}
//             xin chào {user.username}
//           </Text>
//         </Text>
//       </View>
//       {approvalUrl == null ? (
//         <View>
//           <View style={{ alignItems: "center" }}>
//             <Image source={require("../library/images/hand.png")} />
//             <Text
//               style={{
//                 fontSize: 24,
//                 fontWeight: "bold",
//                 margin: 16,
//                 color: Colors.greenPlus,
//               }}>
//               Thông tin thanh toán
//             </Text>
//             <View
//               style={[styles.borderInfo, { marginLeft: 10, marginRight: 10 }]}>
//               <View style={{ flexDirection: "row" }}>
//                 <Text style={[styles.postDescription, { fontWeight: "bold" }]}>
//                   Hot:
//                 </Text>
//                 <Text style={styles.postDescription}> {postDetail1.topic}</Text>
//               </View>
//               <View style={{ flexDirection: "row" }}>
//                 <Text style={[styles.postDescription, { fontWeight: "bold" }]}>
//                   Acreage:
//                 </Text>
//                 <Text style={styles.postDescription}>
//                   {" "}
//                   {houseDetail1.acreage} m2
//                 </Text>
//               </View>
//               <View style={{ flexDirection: "row" }}>
//                 <Text style={[styles.postDescription, { fontWeight: "bold" }]}>
//                   Describe:
//                 </Text>
//                 <Text style={styles.postDescription}>
//                   {" "}
//                   {postDetail1.describe}
//                 </Text>
//               </View>

//               <View style={{ flexDirection: "row" }}>
//                 <Text style={[styles.postDescription, { fontWeight: "bold" }]}>
//                   Price:
//                 </Text>
//                 <Text style={styles.postDescription}>
//                   {" "}
//                   {houseDetail1.price}
//                 </Text>
//               </View>
//               <View style={{ flexDirection: "row" }}>
//                 <Text style={[styles.postDescription, { fontWeight: "bold" }]}>
//                   Quantity:
//                 </Text>
//                 <Text style={styles.postDescription}>
//                   {" "}
//                   {houseDetail1.quantity}
//                 </Text>
//               </View>
//               <View style={{ flexDirection: "row" }}>
//                 <Text style={[styles.postDescription, { fontWeight: "bold" }]}>
//                   Price:
//                 </Text>
//                 <Text style={styles.postDescription}>
//                   {" "}
//                   {houseDetail1.price}
//                 </Text>
//               </View>
//               <View style={{ flexDirection: "row" }}>
//                 <Text style={[styles.postDescription, { fontWeight: "bold" }]}>
//                   Quantity:
//                 </Text>
//                 <Text style={styles.postDescription}>
//                   {" "}
//                   {houseDetail1.quantity}
//                 </Text>
//               </View>
//               <View style={{ flexDirection: "row" }}>
//                 <Text style={[styles.postDescription, { fontWeight: "bold" }]}>
//                   CHÚ Ý: Quý khách vui lòng kiểm tra thông tin trước khi nhấn
//                   thanh toán
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </View>
//       ) : (
//         <View
//           style={{
//             resizeMode: "cover",
//             height: "100%",
//             width: "100%",
//           }}>
//           <WebView source={{ uri: approvalUrl }} />
//         </View>
//       )}
//       <View style={login.text_input}>
//         <TouchableOpacity
//           // onPress={() => {
//           //   createPayment();
//           // }}
//           onPress={handleConfirmation}>
//           <Text style={login.button}>Thanh Toán Ở Đây</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default Paypal;

// const login = StyleSheet.create({
//   text_input: {
//     marginTop: 10,
//     marginLeft: 30,
//   },
//   button: {
//     height: 45,
//     marginTop: 10,
//     marginRight: 30,
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 10,
//     textAlign: "center",
//     backgroundColor: "#2d665f",
//     color: "#ffff",
//     fontWeight: "bold",
//     borderColor: "#2d665f",
//   },
// });
//=================================
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
import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "../constants";
import Toast from "react-native-toast-message";

const Paypal = () => {
  const [approvalUrl, setapprovalUrl] = useState(null);
  const [confirmPayment, setConfirmPayment] = useState(true);
  const [user, dispatch] = useContext(MyUserContext);
  const route = useRoute();
  const { postDetail1 } = route.params;
  const { houseDetail1 } = route.params;
  const { DetailsOwner1 } = route.params;
  const amount = route.params;
  const paymentID = route.params;
  const idBooking = route.params;

  const nav = useNavigation();

  const createPayment = async () => {
    if (confirmPayment) {
      console.log("kkkkkkkkkkkk:", paymentID.paymentID);
      console.log("kkkkkkkkkkkk:", amount.amount);
      console.log("kkkkkkkkkkkk:", idBooking.idBooking);

      try {
        const data = new FormData();
        data.append("amount", amount.amount);
        data.append("payment_id", paymentID.paymentID);
        const res = await axios.post(endpoints["paypal"], data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setapprovalUrl(res.data);
        console.log("url thanh toán", res.data);

        // Sau khi thanh toán thành công, gọi hàm để kiểm tra PayPal
      } catch (e) {
        console.error("error createPayment", e);
      }
    } else {
      // Không làm gì nếu không xác nhận thanh toán
      console.log("Không xác nhận thanh toán");
    }
    // checkPaypal(paymentID.paymentID);
  };

  const checkPaypal = async (paymentID) => {
    try {
      console.log("llllllllll", paymentID);
      const data = new FormData();
      data.append("payment_id", paymentID);
      const res = await axios.get(endpoints["checkPaypal"], data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("llllllllllưfwefwefwefws", paymentID);
      console.log("ré", res);
      // Nếu kết quả trả về từ checkPaypal là true, điều hướng về màn hình Home và hiển thị Toast thành công
      if (res.data === true) {
        navigation.navigate("Home");
        Toast.show({
          type: "success",
          text1: "Thanh toán thành công!",
        });
      } else {
        // Nếu kết quả trả về từ checkPaypal là false, quay lại màn hình trước đó và hiển thị Toast lỗi
        // navigation.goBack();
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

  const handleConfirmation = () => {
    Alert.alert(
      "Xác nhận thanh toán",
      "Thanh toán sẽ không hoàn tiền nếu thay đổi ý định",
      [
        {
          text: "No",
          onPress: () => setConfirmPayment(false),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            setConfirmPayment(true);
            createPayment();
          },
        },
      ],
    );
  };

  const CheckPay = () => {
    const payID = paymentID.paymentID;
    const BookingID = idBooking.idBooking;
    console.log("booking ở paypal ", BookingID);
    console.log("check nè!", payID);
    nav.navigate("CheckPaypal", { payID: payID, BookingID: BookingID });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", flexDirection: "column" }}>
      <View>
        <TouchableOpacity onPress={CheckPay}>
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", paddingTop: 10, paddingBottom: 0 }}>
        <Image
          source={require("../library/images/logo1.png")}
          style={{ width: 50, height: 50, marginLeft: 12, paddingBottom: 0 }}
        />
        <Text
          style={{
            color: Colors.green,
            paddingTop: 10,
            fontWeight: "bold",
            fontSize: 20,
            textAlign: "center",
            fontStyle: "italic",
          }}>
          PiscesHouse
          <Text style={{ color: Colors.purple }}>
            {" "}
            xin chào {user.username}
          </Text>
        </Text>
      </View>
      {approvalUrl == null ? (
        <View>
          <View style={{ alignItems: "center" }}>
            <Image source={require("../library/images/hand.png")} />
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                margin: 16,
                color: Colors.greenPlus,
              }}>
              Thông tin thanh toán
            </Text>
            <View
              style={[styles.borderInfo, { marginLeft: 10, marginRight: 10 }]}>
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.postDescription, { fontWeight: "bold" }]}>
                  Hot:
                </Text>
                <Text style={styles.postDescription}> {postDetail1.topic}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.postDescription, { fontWeight: "bold" }]}>
                  Acreage:
                </Text>
                <Text style={styles.postDescription}>
                  {" "}
                  {houseDetail1.acreage} m2
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.postDescription, { fontWeight: "bold" }]}>
                  Describe:
                </Text>
                <Text style={styles.postDescription}>
                  {" "}
                  {postDetail1.describe}
                </Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.postDescription, { fontWeight: "bold" }]}>
                  Price:
                </Text>
                <Text style={styles.postDescription}>
                  {" "}
                  {houseDetail1.price}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.postDescription, { fontWeight: "bold" }]}>
                  Quantity:
                </Text>
                <Text style={styles.postDescription}>
                  {" "}
                  {houseDetail1.quantity}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.postDescription, { fontWeight: "bold" }]}>
                  Price:
                </Text>
                <Text style={styles.postDescription}>
                  {" "}
                  {houseDetail1.price}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.postDescription, { fontWeight: "bold" }]}>
                  Quantity:
                </Text>
                <Text style={styles.postDescription}>
                  {" "}
                  {houseDetail1.quantity}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.postDescription, { fontWeight: "bold" }]}>
                  CHÚ Ý: Quý khách vui lòng kiểm tra thông tin trước khi nhấn
                  thanh toán
                </Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View
          style={{
            resizeMode: "cover",
            height: "100%",
            width: "100%",
          }}>
          <WebView source={{ uri: approvalUrl }} />
        </View>
      )}
      <View style={login.text_input}>
        <TouchableOpacity
          // onPress={() => {
          //   createPayment();
          // }}
          onPress={handleConfirmation}>
          <Text style={login.button}>Thanh Toán Ở Đây</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Paypal;

const login = StyleSheet.create({
  text_input: {
    marginTop: 10,
    marginLeft: 30,
  },
  button: {
    height: 45,
    marginTop: 10,
    marginRight: 30,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
    backgroundColor: "#2d665f",
    color: "#ffff",
    fontWeight: "bold",
    borderColor: "#2d665f",
  },
});
