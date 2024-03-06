// import { useRoute } from "@react-navigation/native";
// import axios from "axios";
// import { useEffect } from "react";
// import { Text, View } from "react-native";
// import Toast from "react-native-toast-message";
// import { endpoints } from "../config/Apis";
// const CheckPaypalCreate = ({ navigation }) => {
//   const route = useRoute();
//   const { payID, postId } = route.params; // Truy cập trực tiếp vào payID và postId từ route.params
//   console.log("payID", payID);
//   console.log("postId", postId);

//   const checkPaypal = async (payID) => {
//     try {
//       console.log("id khi qua check", payID);
//       const data = new FormData();
//       data.append("payment_id", payID);
//       const res = await axios.post(endpoints["checkPaypal"], data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       console.log("res", res);
//       // Nếu kết quả trả về từ checkPaypal là true, điều hướng về màn hình Home và hiển thị Toast thành công
//       if (res.data === true) {
//         createNotice();
//         console.log("=================doooooooooooo============:", postId);

//         Toast.show({
//           type: "success",
//           text1: "Thanh toán thành công!",
//         });
//       } else {
//         // Nếu kết quả trả về từ checkPaypal là false, quay lại màn hình trước đó và hiển thị Toast lỗi
//         navigation.goBack();
//         Toast.show({
//           type: "error",
//           text1: "Thanh toán không thành công. Vui lòng thử lại sau.",
//         });
//       }
//     } catch (error) {
//       console.error("Error when checking PayPal:", error);
//       // Hiển thị Toast lỗi nếu có lỗi xảy ra khi kiểm tra PayPal
//       Toast.show({
//         type: "error",
//         text1:
//           "Đã có lỗi xảy ra khi kiểm tra thanh toán. Vui lòng thử lại sau.",
//       });
//     }
//   };
//   const createNotice = async (postId) => {
//     try {
//       let formData = new FormData();
//       formData.append("post_id", postId);
//       const response = await axios.post(endpoints["createNotice"], formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       console.log("============================== thanh cong");
//       navigation.navigate("Home");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     checkPaypal(payID);
//   }, [payID]);
//   return (
//     <View>
//       <Text>aaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Text>
//     </View>
//   );
// };

// export default CheckPaypalCreate;
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { endpoints } from "../config/Apis";
import { MyUserContext } from "../../App";

const CheckPaypalCreate = ({ navigation }) => {
  const [user, dispatch] = useContext(MyUserContext);
  const route = useRoute();
  const { payID, postId } = route.params; // Truy cập trực tiếp vào payID và postId từ route.params

  const checkPaypal = async (payID) => {
    try {
      const data = new FormData();
      data.append("payment_id", payID);
      const res = await axios.post(endpoints["checkPaypal"], data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data === true) {
        createNotice();
        Toast.show({
          type: "success",
          text1: "Thanh toán thành công!",
        });
      } else {
        navigation.goBack();
        deletePost();
        Toast.show({
          type: "error",
          text1: "Thanh toán không thành công. Vui lòng thử lại sau.",
        });
      }
    } catch (error) {
      console.error("Error when checking PayPal:", error);
      Toast.show({
        type: "error",
        text1:
          "Đã có lỗi xảy ra khi kiểm tra thanh toán. Vui lòng thử lại sau.",
      });
    }
  };

  const createNotice = async () => {
    try {
      let formData = new FormData();
      formData.append("post_id", postId);
      const response = await axios.post(endpoints["createNotice"], formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.status);
      senMail();
      navigation.navigate("MyTab");
    } catch (error) {
      console.log(error);
    }
  };
  const senMail = async () => {
    const mail = await authApiToken(token).post(endpoints["sendmail"]);
  };
  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(endpoints["deletePost"], postId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkPaypal(payID);
  }, [payID]);

  return (
    <View>
      <Text>Xin Chào</Text>
    </View>
  );
};

export default CheckPaypalCreate;
