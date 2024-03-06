import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import ListFollowing from "./ListFollowing";
import { MyUserContext } from "../../App";
import { authApiToken, endpoints } from "../config/Apis";
import profileStyle from "../constants/profileStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-toast-message";
import { FontAwesome } from "@expo/vector-icons";
import styles from "../constants/styles";
export const ProfileBody = ({
  id,
  name,
  accountName,
  profileImage,
  post,
  followers,
  following,
}) => {
  console.log("id:", id);
  const nav = useNavigation();
  const goToListFollowing = (id) => {
    console.log("id của thằng muốn xem: ", { id });
    nav.navigate("ListFollowing", { id: id });
  };
  const goToListFollower = (id) => {
    nav.navigate("ListFollower", { id: id });
  };

  return (
    <View>
      {accountName ? (
        <View style={profileStyle.profileBodyV1}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {accountName}
            </Text>
            <Feather name="chevron-down" style={profileStyle.checkdown} />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Feather name="plus-square" style={profileStyle.square} />
            <Feather name="menu" style={{ fontSize: 25 }} />
          </View>
        </View>
      ) : null}
      <View style={[profileStyle.profileBodyV1, { paddingVertical: 20 }]}>
        <View
          style={{
            alignItems: "center",
          }}>
          <Image source={profileImage} style={profileStyle.profileImg} />
          <Text style={{ paddingVertical: 5, fontWeight: "bold" }}>{name}</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={profileStyle.flArea}>{post}</Text>
          <Text>Posts</Text>
        </View>
        <TouchableOpacity onPress={() => goToListFollower(id)}>
          <View style={{ alignItems: "center" }}>
            <Text style={profileStyle.flArea}>{followers}</Text>
            <Text>Followers</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goToListFollowing(id)}>
          <View style={{ alignItems: "center" }}>
            <Text style={profileStyle.flArea}>{following}</Text>
            <Text>Following</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const ProfileButtons = ({
  id,
  name,
  address,
  email,
  accountName,
  profileImage,
  phoneNumber,
}) => {
  const navigation = useNavigation();
  const [follow, setFollow] = useState(false); // Initialize follow with default value false
  const [user, dispatch] = useContext(MyUserContext);

  const getData = async () => {
    try {
      const res = await axios.get(endpoints["accFollow"](id));
      setFollow(res.data);
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "An error occurred. Please try again later.",
      });
    }
  };

  const getCheckFollowStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userResponse = await authApiToken(token).get(
        endpoints["checkFollowStatus"](id),
      );
      const statusData = userResponse.data;
      console.log("status: ", statusData.data);
      setFollow(statusData.data);
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "An error occurred. Please try again later.",
      });
    }
  };

  const setFollowStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      let formData = new FormData();
      formData.append("followed_user", id);

      const response = await authApiToken(token).post(
        endpoints["createOrDeleteFollow"],
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.status === 201 || response.status === 204) {
        // Nếu status là 201 hoặc 204, tức là mối quan hệ đã được tạo hoặc xóa thành công
        // Ta cập nhật trạng thái follow và cập nhật dữ liệu
        setFollow((prevFollow) => !prevFollow); // Đảo ngược trạng thái follow
        getData(); // Lấy dữ liệu mới
        // Hiển thị Toast thành công
        Toast.show({
          type: "success",
          text1: "Success",
        });
      } else {
        // Nếu status không phải là 201 hoặc 204, có thể là một lỗi từ phía server
        // Ta hiển thị thông báo lỗi
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to update follow status. Please try again later.",
        });
      }
    } catch (error) {
      console.error(error);
      // Nếu có lỗi xảy ra trong quá trình gửi request, ta hiển thị thông báo lỗi
      // Toast.show({
      //   type: "error",
      //   text1: "Error",
      //   text2: "An error occurred. Please try again later.",
      // });
    }
  };

  useEffect(() => {
    getData();
    getCheckFollowStatus();
  }, []);
  const navigateToChat = () => {
    navigation.navigate("Chat", {
      id: id,
      username: accountName,
    });
  };

  return (
    <>
      {id == user.id ? (
        <View style={styles.profileButtonsContainer2}>
          <TouchableOpacity
            onPress={() =>
              navigation.push("EditProfile", {
                name,
                accountName,
                profileImage,
                address,
                email,
                phoneNumber,
              })
            }
            style={{ width: "100%" }}>
            <View
              style={{
                width: "100%",
                height: 35,
                borderRadius: 5,
                borderColor: "#DEDEDE",
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Text style={styles.buttonText1}>Edit Profile</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.profileButtonsContainer1}>
          <TouchableOpacity
            onPress={setFollowStatus}
            style={[styles.button1, styles.followButton1]}>
            <View
              style={
                follow ? [styles.button1, styles.followButton1] : styles.button1
              }>
              <Text
                style={
                  follow
                    ? [styles.buttonText1, styles.followButtonText1]
                    : styles.buttonText1
                }>
                {" "}
                {follow ? "Following" : "Follow"}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={navigateToChat}
            style={[styles.button1, styles.messageButton1]}>
            <Text>Message</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button1, styles.optionsButton1]}>
            <FontAwesome
              name="chevron-down"
              style={{ fontSize: 20, color: "black" }}
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default ProfileButtons;
