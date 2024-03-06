// import React, { useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   ScrollView,
//   View,
//   StatusBar,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   ImageBackground,
//   Button,
// } from "react-native";
// import Buttons from "../components/Buttons";
// import { Colors } from "../constants";
// import Icon from "react-native-vector-icons/FontAwesome";
// import styles from "../constants/styles";
// import { useEffect } from "react";
// import Info2 from "../components/Info2";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import * as ImagePicker from "expo-image-picker";
// import axios from "axios";
// import { endpoints } from "../config/Apis";

// const Signup2 = ({ navigation, route }) => {
//   const [account, setAccount] = useState();
//   const [phonenumber, setPhoneNumber] = useState();
//   const [address, setAddress] = useState();
//   const [role, setRole] = useState();
//   const [avatar, setAvatar] = useState();
//   const [dod, setDod] = useState(new Date());
//   const [beginShow, setBeginShow] = useState(false);
//   const [endShow, setEndShow] = useState(false);

//   // const { registerInfo } = route.params;
//   // console.log("qua sinup2-----------------", registerInfo);
//   console.log("qua sinup2-----------------", route.params.username);

//   const createAccount = async () => {
//     const filename = avatar.split("/").pop();
//     const match = /\.(\w+)$/.exec(filename);
//     const type = match ? `image/${match[1]}` : `image`;
//     let formData = new FormData();
//     formData.append("username", route.params.username);
//     formData.append("password", route.params.password);
//     formData.append("first_name", route.params.firstName);
//     formData.append("last_name", route.params.lastName);
//     formData.append("email", route.params.email);
//     formData.append("dob", dod.toISOString().slice(0, 10));
//     // formData.append("avatar", { uri: avatar, name: filename, type });
//     formData.append("avatar", { uri: avatar, name: filename, type });
//     formData.append("phonenumber", phonenumber);
//     formData.append("address", address);
//     formData.append("role", 3);
//     console.log("form data", formData);

//     try {
//       let myAccount = await axios.post(endpoints["createAccount"], formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       console.log("myAccount.data    ", myAccount.data);
//       setAccount(myPost.data);
//     } catch (e) {
//       console.log("error function create user", e.request);
//     }
//   };

//   const handleDoD = (event, date) => {
//     setBeginShow(false);
//     setDod(date || dod);
//     console.log(dod);
//   };

//   const openImagePicker = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (status !== "granted") {
//       console.log("Permission not granted");
//       return;
//     }

//     const options = {
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     };

//     let result;
//     if (Platform.OS !== "web") {
//       result = await ImagePicker.launchImageLibraryAsync(options);
//     } else {
//       result = await ImagePicker.launchImageLibraryAsync();
//     }

//     if (!result.cancelled) {
//       const localUri = result.uri;
//       console.log(localUri);
//       console.log("-------------f-------------");
//       setAvatar(localUri);
//     } else {
//       console.log("User canceled image picker");
//     }
//   };

//   return (
//     <ScrollView
//       style={{ flex: 1, backgroundColor: "#fff", flexDirection: "column" }}>
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />
//       <Image
//         flex={1}
//         alt="Logo"
//         resizeMode="cover"
//         size="lg"
//         w="full"
//         source={require("../library/images/bg.png")}
//       />
//       <View
//         w="full"
//         h="full"
//         position="absolute"
//         top="0"
//         px="6"
//         justifyContent="center">
//         {/* {Login form} */}
//         <View
//           style={{
//             flex: 2,
//             flexDirection: "column",
//             paddingTop: 0,
//             paddingHorizontal: "2%",
//           }}>
//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "flex-start",
//               alignItems: "center",
//               paddingTop: "30%",
//             }}>
//             <Text style={styles.textHeader}>Register Page</Text>
//             <Image
//               source={require("../library/images/logo1.png")}
//               style={{ width: 50, height: 50 }}
//             />
//           </View>
//           <Text style={styles.textInfor}>Fill all to create account!!!</Text>
//           <View style={styles.viewLogin}>
//             <View style={styles.inputSignUp}>
//               <Icon name="phone" size={22} color="#818181" />
//               <TextInput
//                 style={styles.input}
//                 secureTextEntry={true}
//                 value={phonenumber}
//                 placeholder="Number Phone"
//                 onChangeText={(text) => setPhoneNumber(text)}
//                 placeholderTextColor="#818181"
//               />
//             </View>
//             <View style={styles.inputSignUp}>
//               <Icon name="map" size={22} color="#818181" />
//               <TextInput
//                 style={styles.input}
//                 value={address}
//                 placeholder="Address"
//                 onChangeText={(text) => setAddress(text)}
//                 placeholderTextColor="#818181"
//               />
//             </View>
//             {/* <View style={styles.inputSignUp}>
//               <TouchableOpacity onPress={() => setBeginShow(true)}>
//                 <Text>Chọn ngày bắt đầu</Text>
//                 <Text>{`${String(dod.getDate()).padStart(2, "0")}/${String(
//                   dod.getMonth() + 1,
//                 ).padStart(2, "0")}/${dod.getFullYear()}`}</Text>
//                 {beginShow ? (
//                   <DateTimePicker
//                     value={dod}
//                     mode="date"
//                     placeholder="Select date"
//                     onChange={handleDoD}
//                     // minimumDate={currentDay}
//                     // disabled={isPastDate}
//                   />
//                 ) : null}
//               </TouchableOpacity>
//             </View> */}
//             <View style={styles.inputSignUp}>
//               {/* <Icon name="calendar" size={22} color="#818181" />
//           <TextInput
//             style={styles.input}
//             value={postingdate}
//             onChangeText={setPostingdate}
//             placeholder="postingdate"
//             placeholderTextColor="#818181"
//           /> */}
//               <TouchableOpacity
//                 onPress={() => setBeginShow(true)}
//                 style={{
//                   width: "100%",
//                 }}>
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     marginLeft: 0,
//                   }}>
//                   <Icon name="calendar" size={22} color="#818181" />
//                   <Text
//                     style={{
//                       paddingLeft: 20,
//                       color: "#818181",
//                     }}>
//                     Ngày sinh:{" "}
//                   </Text>
//                   <Text
//                     style={{
//                       paddingLeft: 20,
//                     }}>{`${String(dod.getDate()).padStart(2, "0")}/${String(
//                     dod.getMonth() + 1,
//                   ).padStart(2, "0")}/${dod.getFullYear()}`}</Text>
//                 </View>
//                 {beginShow ? (
//                   <DateTimePicker
//                     value={dod}
//                     mode="date"
//                     placeholder="Select date"
//                     // minimumDate={currentDay}
//                     onChange={handleDoD}
//                     // disabled={isPastDate}
//                   />
//                 ) : null}
//               </TouchableOpacity>
//             </View>
//             <View style={[styles.inputSignUp, { flexDirection: "row" }]}>
//               <TouchableOpacity
//                 onPress={openImagePicker}
//                 style={{
//                   width: "100%",
//                 }}>
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     marginLeft: 0,
//                   }}>
//                   <Icon name="image" size={22} color="#818181" />
//                   <Text
//                     style={{
//                       paddingLeft: 20,
//                       color: "#818181",
//                     }}>
//                     upload image
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//             </View>

//             <View style={{ paddingTop: 10 }}></View>

//             <Buttons
//               btn_text={"CREATE ACCOUNT"}
//               on_press={() => {
//                 createAccount();
//               }}
//             />
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default Signup2;
//===================
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import Buttons from "../components/Buttons";
import { Colors } from "../constants";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../constants/styles";
import axios from "axios";
import { endpoints } from "../config/Apis";
import Toast from "react-native-toast-message";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";

const Signup2 = ({ navigation, route }) => {
  const [phonenumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  // const [dod, setDod] = useState(new Date());
  const [beginShow, setBeginShow] = useState(false);
  const [maximumDob, setMaximumDob] = useState(new Date()); // Thêm state để lưu trữ ngày tối đa
  const [dod, setDod] = useState(new Date(2002, 1, 22)); // Thiết lập ngày tháng ban đầu là ngày 22/2/2002
  useEffect(() => {
    const maxDob = new Date();
    maxDob.setFullYear(maxDob.getFullYear() - 16); // Người dùng phải từ 16 tuổi trở lên
    setMaximumDob(maxDob);
  }, []);
  const createAccount = async () => {
    // Kiểm tra các trường thông tin có được nhập đầy đủ không
    if (!phonenumber || !address || !avatar) {
      Toast.show({
        type: "error",
        text1: "Vui lòng nhập đầy đủ thông tin",
      });
      return;
    }

    const filename = avatar.split("/").pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;
    const formData = new FormData();
    formData.append("username", route.params.username);
    formData.append("password", route.params.password);
    formData.append("first_name", route.params.firstName);
    formData.append("last_name", route.params.lastName);
    formData.append("email", route.params.email);
    formData.append("dob", dod.toISOString().slice(0, 10));
    formData.append("avatar", { uri: avatar, name: filename, type });
    formData.append("phonenumber", phonenumber);
    formData.append("address", address);
    formData.append("role", 3);

    try {
      const response = await axios.post(endpoints.createAccount, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Hiển thị thông báo tạo tài khoản thành công
      Toast.show({
        type: "success",
        text1: "Tạo tài khoản thành công",
      });

      // Chuyển hướng đến màn hình đăng nhập
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error creating account:", error);
      // Hiển thị thông báo lỗi khi tạo tài khoản
      Toast.show({
        type: "error",
        text1: "Đã có lỗi xảy ra khi tạo tài khoản",
      });
    }
  };

  const handleDoD = (event, date) => {
    setBeginShow(false);
    setDod(date || dod);
  };

  const openImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      console.log("Permission not granted");
      return;
    }

    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    };

    let result;
    if (Platform.OS !== "web") {
      result = await ImagePicker.launchImageLibraryAsync(options);
    } else {
      result = await ImagePicker.launchImageLibraryAsync();
    }

    if (!result.cancelled) {
      const localUri = result.uri;
      setAvatar(localUri);
    } else {
      console.log("User canceled image picker");
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
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
        <View
          style={{
            flex: 2,
            paddingHorizontal: "2%",
          }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingTop: "30%",
            }}>
            <Text style={styles.textHeader}>Register Page</Text>
            <Image
              source={require("../library/images/logo1.png")}
              style={{ width: 50, height: 50 }}
            />
          </View>
          <Text style={styles.textInfor}>Fill all to create account!!!</Text>
          <View style={[styles.viewLogin]}>
            <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
              {avatar ? (
                <Image
                  source={{ uri: avatar }}
                  style={{
                    borderRadius: 20,
                    width: 200,
                    height: 200,
                    borderColor: "green",
                    borderWidth: 2,
                    marginTop: 20,
                    marginBottom: 20,
                  }}
                />
              ) : null}
            </View>
            <View style={[styles.inputSignUp, { flexDirection: "row" }]}>
              <TouchableOpacity
                onPress={openImagePicker}
                style={{ width: "100%" }}>
                <View style={{ flexDirection: "row", marginLeft: 0 }}>
                  <Icon name="image" size={22} color="#818181" />
                  <Text
                    style={{
                      paddingLeft: 20,
                      color: "#818181",
                    }}>
                    Upload image
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.inputSignUp}>
              <Icon name="phone" size={22} color="#818181" />
              <TextInput
                style={styles.input}
                value={phonenumber}
                placeholder="Number Phone"
                onChangeText={(text) => setPhoneNumber(text)}
                placeholderTextColor="#818181"
              />
            </View>
            <View style={styles.inputSignUp}>
              <Icon name="map" size={22} color="#818181" />
              <TextInput
                style={styles.input}
                value={address}
                placeholder="Address"
                onChangeText={(text) => setAddress(text)}
                placeholderTextColor="#818181"
              />
            </View>
            {/* <View style={styles.inputSignUp}>
              <TouchableOpacity
                onPress={() => setBeginShow(true)}
                style={{ width: "100%" }}>
                <View style={{ flexDirection: "row", marginLeft: 0 }}>
                  <Icon name="calendar" size={22} color="#818181" />
                  <Text
                    style={{
                      paddingLeft: 20,
                      color: "#818181",
                    }}>
                    Ngày sinh:{" "}
                  </Text>
                  <Text
                    style={{
                      paddingLeft: 20,
                    }}>{`${String(dod.getDate()).padStart(2, "0")}/${String(
                    dod.getMonth() + 1,
                  ).padStart(2, "0")}/${dod.getFullYear()}`}</Text>
                </View>
                {beginShow && (
                  <DateTimePicker
                    value={dod}
                    mode="date"
                    placeholder="Select date"
                    onChange={handleDoD}
                  />
                )}
              </TouchableOpacity>
            </View> */}
            <View style={styles.inputSignUp}>
              <TouchableOpacity
                onPress={() => setBeginShow(true)}
                style={{ width: "100%" }}>
                <View style={{ flexDirection: "row", marginLeft: 0 }}>
                  <Icon name="calendar" size={22} color="#818181" />
                  <Text style={{ paddingLeft: 20, color: "#818181" }}>
                    Ngày sinh:{" "}
                  </Text>
                  <Text style={{ paddingLeft: 20 }}>{`${String(
                    dod.getDate(),
                  ).padStart(2, "0")}/${String(dod.getMonth() + 1).padStart(
                    2,
                    "0",
                  )}/${dod.getFullYear()}`}</Text>
                </View>
                {beginShow && (
                  <DateTimePicker
                    value={dod}
                    mode="date"
                    placeholder="Select date"
                    onChange={handleDoD}
                    maximumDate={maximumDob}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={{ paddingTop: 10 }}></View>
            <Buttons
              btn_text={"CREATE ACCOUNT"}
              on_press={() => {
                createAccount();
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup2;
