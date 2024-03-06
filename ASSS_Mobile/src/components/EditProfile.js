// import React,{useContext, useState} from 'react'
// import { Avatar,StyleSheet, Text, ScrollView,View,StatusBar,Image,TextInput, TouchableOpacity, ImageBackground, Button, SafeAreaView, Touchable, } from 'react-native'
// import Buttons from '../components/Buttons'
// import {Colors} from '../constants'
// import Icon from 'react-native-vector-icons/FontAwesome'
// import styles from '../constants/styles'
// import { useEffect } from 'react';
// import { Caption, Title, TouchableRipple } from 'react-native-paper'
// import { Ionicons } from '@expo/vector-icons'
// import { MyUserContext } from '../../App'

// const EditProfile = () => {
//   return (
//     <SafeAreaView style={{flex: 1, paddingTop:10, backgroundColor:Colors.background}}>
//     {/* <View style={styles.userInfoSection}>
//       <View style={{flexDirection:"row"}}>
//     <Image
//       source={{
//       uri: "https://res.cloudinary.com/dycn3luxu/image/upload/v1703240826/t%E1%BA%A3i_xu%E1%BB%91ng_4_srgbl2.jpg",
//       }}
//         style={{ width: 100, height: 100, borderRadius:50 }}
//     />
//     <View style={{marginLeft:20, marginTop:30}}>
//       <Text style={styles.textHeader} >Nguyễn A</Text>
//     </View>
//     </View>
//     </View> */}

//     <View style={{ alignSelf: "center" }}>
//       <View style={styles.profileImage}>
//                     <Image source={{uri:user.avatar}} style={styles.image1} resizeMode="center"/>
//         </View>

//           {/* <View style={styles.active}></View> */}
//           <View style={styles.add}>
//                     <Ionicons name="ios-add" size={18} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
//           </View>

//     </View>
//     <View style={{alignItems:"center"}}>
//       <Text style={styles.textHeader} >{user.username}</Text>
//     </View>

//     <View style={{paddingTop:10}}></View>

//     <View style={styles.userInfoSection}>
//       <View style={styles.row}>
//       <Icon name="envelope-o" size={15} color="#818181"/>
//       <Text >   {user.email}</Text>
//       </View>

//     </View>

//     <View style={styles.userInfoSection}>
//       <View style={styles.row}>
//       <Icon name="phone" size={22} color="#818181"/>
//       <Text>  {user.phonenumber}</Text>
//       </View>

//     </View>
//     <View style={styles.userInfoSection}>
//       <View style={styles.row}>
//       <Icon name="birthday-cake" size={22} color="#818181"/>
//       <Text> 22/02/2002</Text>
//       </View>

//     </View>
//     <View style={styles.userInfoSection}>
//       <View style={styles.row}>
//       <Icon name="map-marker" size={22} color="#818181"/>
//       <Text> Go Vap </Text>
//       </View>
//     </View>

//     <View style={styles.infoBoxWrapper}>
//       <View style={styles.infoBox}>
//         <Title></Title>
//         <Caption>Following</Caption>

//       </View>
//       <View style={styles.infoBox}>
//         <Title></Title>
//         <Caption>Follower</Caption>

//       </View>
//       <View style={styles.infoBox}>
//         <Title>2000</Title>
//         <Caption>Posted</Caption>

//       </View>
//       <View>

//       </View>
//     </View>
//     <View>
//         <Text style={{color: Colors.greenPlus,fontSize: 30,fontWeight: 'bold',paddingLeft:20, paddingTop:10}}>More:</Text>
//     </View>

//     <View style={styles.menuWrapper}>
//       <TouchableRipple onPress={() => {}}>
//         <View style={styles.menuItem}>
//         <Icon name="cogs" size={15} color="#818181"/>
//           <Text style={styles.menuItemText}> Cài đặt</Text>
//         </View>
//       </TouchableRipple>

//       <TouchableRipple onPress={() => navigation.navigate("UserProfile")}>
//         <View style={styles.menuItem}>
//         <Icon name="pencil" size={15} color="#818181"/>

//           <Text style={styles.menuItemText} > Cập nhật thông tin</Text>

//         </View>
//       </TouchableRipple>

//       <TouchableRipple onPress={() => {}}>
//         <View style={styles.menuItem}>
//         <Icon name="sign-out" size={15} color="#818181"/>
//           <Text style={styles.menuItemText}> Đăng xuất</Text>
//         </View>
//       </TouchableRipple>
//     </View>
//   </SafeAreaView>

//   )
// }

// export default EditProfile
// ====================================================================================================================================
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import Ionic from "react-native-vector-icons/Ionicons";
import profileStyle from "../constants/profileStyle";
import UpdateImg from "./UpdateImg";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApiToken, endpoints } from "../config/Apis";
import { MyUserContext } from "../../App";
import { AntDesign } from "@expo/vector-icons";
import Upgrade from "./Upgrade";
import Toast from "react-native-toast-message";

const EditProfile = ({ route, navigation }) => {
  // const { name, accountName, profileImage, address, email, phoneNumber } =
  //   route.params;

  const [user, dispatch] = useContext(MyUserContext);
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [address, setAddress] = useState(user.address);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phonenumber);

  const pickImage = async () => {
    console.log("aaaaaaaaaaaaa");
    const token = await AsyncStorage.getItem("token");
    console.log("token", token);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (result.canceled) {
      return;
    }
    const localUri = result.assets[0].uri;
    console.log("--------------------------");
    setImage(localUri);

    const filename = localUri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;
    const formData = new FormData();

    formData.append("avatar", { uri: localUri, name: filename, type });
    console.log(localUri, filename, type);

    console.log(formData);
    try {
      // Gọi API để truyền ảnh xuống server
      const res = await authApiToken(token).patch(
        endpoints["updateAvt"],
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log("Tới đây nè em");
      navigation.goBack();
      await AsyncStorage.setItem("user", JSON.stringify(res.data));
      // dispatch({ type: "login", payload: res.data });
      dispatch({ type: "updateUser", payload: res.data });
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const TostMessage = () => {
    ToastAndroid.show(
      "Edited Sucessfully !",
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
    );
  };
  const showToast = (message) => {
    Toast.show({
      text1: message,
      position: "top",
      type: "success", // hoặc 'error' cho thông báo lỗi
    });
  };
  const updateProfile = async () => {
    const token = await AsyncStorage.getItem("token");

    // Tạo một đối tượng FormData
    const formData = new FormData();

    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("address", address);
    formData.append("email", email);
    formData.append("phonenumber", phoneNumber);

    try {
      const res = await authApiToken(token).patch(
        endpoints["updateUser"](user.id),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log("User vua duoc cap nha: ", res.data);

      // Kiểm tra response status và cập nhật thông tin người dùng nếu thành công
      if (res.status === 200) {
        console.log("User vua duoc cap nha: ", res.data);
        showToast("Profile updated successfully!");
        // Toast.show({
        //   type: "info",
        //   text1: "Đăng ký thành công. Vui lòng chờ xét duyệt!",
        // });
        // Toast.show({
        //   type: "info",
        //   text1: "Đăng ký thành công. Vui lòng chờ xét duyệt!",
        // });
        // navigation.goBack();
        dispatch({ type: "updateUser", payload: res.data });
      } else {
        showToast("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      showToast("Error updating profile");
    }
  };
  const logout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.navigate("Login");
  };
  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <ScrollView
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
      }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionic name="close-outline" style={{ fontSize: 35 }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Edit Profile</Text>
        <TouchableOpacity
          onPress={() => {
            updateProfile();
            navigation.goBack();
          }}>
          <Ionic name="checkmark" style={{ fontSize: 35, color: "#3493D9" }} />
        </TouchableOpacity>
      </View>
      <View style={{ padding: 20, alignItems: "center" }}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={{
              borderRadius: 20,
              width: 200,
              height: 200,
              borderColor: "green",
              borderWidth: 2,
              marginTop: 20,
            }}
          />
        ) : (
          <Image
            source={{ uri: user.avatar }}
            style={{
              borderRadius: 20,
              width: 200,
              height: 200,
              borderColor: "green",
              borderWidth: 2,
              marginTop: 20,
            }}
          />
        )}
        <TouchableOpacity onPress={pickImage}>
          <AntDesign color="#2d665f" name="camerao" size={25} />
        </TouchableOpacity>
      </View>
      <View style={{ padding: 10 }}>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ opacity: 0.5 }}>Name</Text>
          <TextInput
            placeholder="name"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            style={profileStyle.inputEditProfile}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ opacity: 0.5 }}>Name</Text>
          <TextInput
            placeholder="name"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            style={profileStyle.inputEditProfile}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ opacity: 0.5 }}>Address</Text>
          <TextInput
            placeholder="Address"
            value={address}
            onChangeText={(text) => setAddress(text)}
            style={profileStyle.inputEditProfile}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ opacity: 0.5 }}>Email</Text>
          <TextInput
            placeholder="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={profileStyle.inputEditProfile}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ opacity: 0.5 }}>Phone</Text>
          <TextInput
            placeholder="Number Phone"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            style={profileStyle.inputEditProfile}
          />
        </View>
        {/* <View style={{ paddingVertical: 10 }}>
          <Text
            style={{
              opacity: 0.5,
            }}>
            Username
          </Text>
          <TextInput
            placeholder="accountname"
            defaultValue={user.accountName}
            style={profileStyle.inputEditProfile}
          />
        </View>
        <View style={{ paddingVertical: 10 }}>
          <TextInput
            placeholder="Website"
            style={profileStyle.inputEditProfile}
          />
        </View> */}
        <View style={{ paddingVertical: 10 }}>
          <TextInput placeholder="Bio" style={profileStyle.inputEditProfile} />
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("Upgrade")}>
          <Text
            style={{
              marginVertical: 10,
              padding: 10,
              color: "#3493D9",
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: "#EFEFEF",
            }}>
            Upgrade your account to host
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row", marginBottom: 50 }}
          onPress={logout}>
          <Text
            style={{
              marginVertical: 10,
              padding: 10,
              color: "#3493D9",
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: "#EFEFEF",
            }}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
      {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
      {/* <Toast /> */}
    </ScrollView>
  );
};

export default EditProfile;
