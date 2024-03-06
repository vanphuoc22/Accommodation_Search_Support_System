import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { MyUserContext } from "../../App";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApiToken, endpoints } from "../config/Apis";
import styles from "../constants/styles";
import profileStyle from "../constants/profileStyle";

const ListFollowing = ({ route, navigation }) => {
  const [user, dispatch] = useContext(MyUserContext);
  const [dataUserFL, setDataUserFL] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = route.params;
  // const getFollowing = async () => {
  //   const token = await AsyncStorage.getItem("token");
  //   try {
  //     const response = await authApiToken(token).get(endpoints["following"]);
  //     const dataFollow = response.data;
  //     setDataUserFL(dataFollow);
  //     // console.log('aaaaaa',dataFollow)
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  const getFollowing = async () => {
    try {
      const res = await axios.get(endpoints["getFollowing"](id));
      setDataUserFL(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFollowing();
  }, [id]);

  const nav = (idA) => {
    navigation.navigate("UserProfile", { id: idA });
  };
  return (
    <ScrollView style={styles.containerListPosting}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#000" />
        </View>
      ) : (
        dataUserFL.map((users, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => nav(users.followeduser.id)}
            style={styles.postItem}>
            <View
              key={users.id}
              style={{
                alignItems: "center",
                flexDirection: "row",
              }}>
              <Image
                source={{
                  uri: users.followeduser.avatar,
                }}
                style={profileStyle.profileImgList}
                resizeMode="center"
              />
              <Text style={styles.postTitle}>
                {users.followeduser.username}
                {""}
              </Text>
              <Text>Id của tài khoản này là: {users.followeduser.id}</Text>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

export default ListFollowing;
