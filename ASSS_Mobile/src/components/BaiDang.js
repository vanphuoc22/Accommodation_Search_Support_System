import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { endpoints } from "../config/Apis";
import ImgOfHouse from "./ImgOfHouse";
import styles from "../constants/styles";
import profileStyle from "../constants/profileStyle";

const BaiDang = ({ userId, discountId, houseId }) => {
  const [userpost, setUserPost] = useState();
  const [discount, setDiscount] = useState();
  const [house, setHouse] = useState();
  const [imgHouse, setImgHouse] = useState([]);

  const getUser = async (userId) => {
    try {
      const { data } = await axios.get(endpoints["getUserByID"](userId));
      // console.log("wwwwwwwwwwwwwwwwwwwwww", data);
      setUserPost(data);
    } catch (error) {
      console.error("Error fetching User:", error);
      throw error;
    }
  };

  const getDiscount = async (discountId) => {
    try {
      const { data } = await axios.get(
        endpoints["getDiscountByID"](discountId),
      );
      //   console.log(data);
      setDiscount(data);
    } catch (error) {
      console.error("Error fetching Discount:", error);
      throw error;
    }
  };
  const getHouse = async (houseId) => {
    try {
      const { data } = await axios.get(endpoints["getHouseByID"](houseId));
      //   console.log(data);
      setHouse(data);
    } catch (error) {
      console.error("Error fetching home image:", error);
      throw error;
    }
  };
  const getHomeImg = async (houseId) => {
    const { data } = await axios.get(endpoints["ImgOfHouse"](houseId));
    // console.log("------Hình nhà-------", data);
    setImgHouse(data);
  };

  useEffect(() => {
    getUser(userId);
  }, [userId]);

  useEffect(() => {
    getDiscount(discountId);
  }, [discountId]);
  useEffect(() => {
    getHouse(houseId);
    getHomeImg(houseId);
  }, []);
  return (
    <View>
      <Text>BaiDang {userpost?.username}</Text>
      <Text>BaiDang {discount?.value}</Text>
      <Text>BaiDang {discount?.value}</Text>
      <View style={styles.imagePostContainer}>
        {imgHouse.map((img, index) => (
          <Image
            key={index}
            source={{ uri: img?.imageURL }}
            style={styles.imagePost}
          />
        ))}
      </View>
      <View style={{ alignItems: "center", flexDirection: "row" }}>
        <Image
          source={{ uri: userpost?.avatar }}
          style={profileStyle.profileImgList}
        />
        <Text style={[styles.postTitle]}>{userpost?.username}</Text>
        <Text style={[styles.postTitle]}>Cái này thì ăn </Text>
      </View>
    </View>
  );
};

export default BaiDang;
