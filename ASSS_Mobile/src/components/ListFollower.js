import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";

import { MyUserContext } from "../../App";
import { authApiToken, endpoints } from "../config/Apis";
import styles from "../constants/styles";
import profileStyle from "../constants/profileStyle";
import axios from "axios";

const ListFollower = ({ route, navigation }) => {
  const [user, dispatch] = useContext(MyUserContext);
  const [dataUserFLR, setDataUserFLR] = useState([]);
  const { id } = route.params;

  // const getFollower = async () => {
  //   const token = await AsyncStorage.getItem("token");
  //   try {
  //     const response = await authApiToken(token).get(endpoints["follower"]);
  //     const dataFollowr = response.data;
  //     setDataUserFLR(dataFollowr);
  //     // console.log('aaaaaa',dataFollow)
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // useEffect(() => {
  //   getFollower();
  // }, []);
  const getFollower = async () => {
    const res = await axios.get(endpoints["getFollower"](id));
    console.log("ra tại body--------------------", res.data);
    setDataUserFLR(res.data);
  };

  useEffect(() => {
    console.log("ơ đây: ", id);
    getFollower();
  }, [id]);

  const nav = (idB) => {
    navigation.navigate("UserProfile", { id: idB });
  };

  return (
    <ScrollView style={styles.containerListPosting}>
      {dataUserFLR.map((users, index) => {
        return (
          <TouchableOpacity
            onPress={() => nav(users.follower.id)}
            style={styles.postItem}
            key={index}>
            <View
              key={users.id}
              style={{ alignItems: "center", flexDirection: "row" }}>
              <Image
                source={{ uri: users.follower.avatar }}
                style={profileStyle.profileImgList}
                resizeMode="center"
              />
              <Text style={styles.postTitle}>{users.follower.username}</Text>
              <Text>Id của tài khoản này là:{users.follower.id}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default ListFollower;
