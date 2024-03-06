import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { endpoints } from "../config/Apis";
import axios from "axios";
import profileStyle from "../constants/profileStyle";
import styles from "../constants/styles";
import { useNavigation } from "@react-navigation/native";

const ChatBox = ({ id }) => {
  const [otherUser, setUser] = useState([]);
  const navigation = useNavigation();
  const getUser = async (id) => {
    console.log("Đây là id của thằng được chạm vào", id);
    const res = await axios.get(endpoints["otherUSer"](id));
    console.log("+++", res.data.result);
    console.log("+++");
    setUser(res.data);
  };

  useEffect(() => {
    if (id) {
      getUser(id);
    } else {
      console.log("user khong ton tai");
    }
  }, [id]);

  console.log(otherUser);
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Chat", {
            id: otherUser.id,
            username: otherUser.username,
          })
        }
        style={{ marginBottom: 10 }}>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
          }}>
          <Image
            source={{ uri: otherUser?.avatar }}
            style={profileStyle.profileImgList}
            resizeMode="center"
          />
          <Text style={styles.postTitle}>{otherUser?.username}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ChatBox;
