import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { endpoints } from "../config/Apis";
import styles from "../constants/styles";

const ImgOfHouse = ({ houseID }) => {
  const [post, setPost] = useState();
  const [imgHouse, setImgHouse] = useState([]);
  // console.log("Log ở đây ", postID);
  // const getPost = async () => {
  //   try {
  //     const { data } = await axios.get(endpoints["post"](postID));
  //     setPost(data);
  //     console.log(" Data Post:", data);
  //   } catch (error) {
  //     console.error("Error fetching home image:", error);
  //     throw error;
  //   }
  // };
  const getHomeImg = async (id) => {
    const { data } = await axios.get(endpoints["ImgOfHouse"](houseID));
    console.log("------Hình nhà-------", data);
    setImgHouse(data);
  };
  // useEffect(() => {
  //   getPost(postID);
  //   // getHomeImg(post.house);
  // }, [postID]);

  useEffect(() => {
    getHomeImg(houseID);
    console.log("id của cái nhà:", houseID);
  }, []);
  return (
    <View>
      <View style={styles.imagePostContainer}>
        {imgHouse.map((img, index) => (
          <Image
            key={index}
            source={{ uri: img.imageURL }}
            style={styles.imagePost}
          />
        ))}
      </View>
      {/* <Text>aaaaaaaaa</Text> */}
    </View>
  );
};

export default ImgOfHouse;
