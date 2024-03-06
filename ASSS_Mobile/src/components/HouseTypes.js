import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { endpoints } from "../config/Apis";
import styles from "../constants/styles";
import { useNavigation } from "@react-navigation/native";

const HouseTypes = () => {
  const navigation = useNavigation();
  // const types = [
  //     {
  //         id:"0",
  //         image:"https://res.cloudinary.com/dycn3luxu/image/upload/v1703240645/house5_ptxphx.jpg",
  //         name:"Biriyani",
  //     },
  //     {
  //         id:"1",
  //         image:"https://res.cloudinary.com/dycn3luxu/image/upload/v1703240645/house6_dqa7fx.jpg",
  //         name:"Dessert"
  //     },
  //     {
  //         id:"2",
  //         image:"https://res.cloudinary.com/dycn3luxu/image/upload/v1703240644/house3_vqudtr.jpg",
  //         name:"Burger"
  //     },
  //     {
  //         id:"3",
  //         image:"https://res.cloudinary.com/dycn3luxu/image/upload/v1703240644/house1_cbldqp.jpg",
  //         name:"Salad",

  //     },
  //     {
  //         id:"4",
  //         image:"https://res.cloudinary.com/dycn3luxu/image/upload/v1703240644/house4_caagv8.jpg",
  //         name:"Sandwiches"
  //     },
  //     {
  //         id:"5",
  //         image:"https://res.cloudinary.com/dycn3luxu/image/upload/v1703240826/t%E1%BA%A3i_xu%E1%BB%91ng_4_srgbl2.jpg",
  //         name:"Sandwiches"
  //     }
  // ]
  const [top, setTop] = useState();
  const getUserHot = async () => {
    const getUserImg = await axios.get(endpoints["topPost"]);
    const res = getUserImg.data;
    setTop(res);
  };
  useEffect(() => {
    getUserHot();
  }, []);
  const nav = (idA) => {
    navigation.navigate("UserProfile", { id: idA });
  };
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {top &&
          top.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => nav(item.user.id)}>
              <View style={{ margin: 10 }} key={index}>
                <Image
                  source={{ uri: item.user.avatar }}
                  style={{ width: 60, height: 60, borderRadius: 30 }}
                />
                <Text style={{ marginTop: 6, textAlign: "center" }}>
                  {item.user.username}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

export default HouseTypes;
