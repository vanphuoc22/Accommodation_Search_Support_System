import { View, Text, StatusBar, Image, ScrollView } from "react-native";
import React, { useContext } from "react";
import HomeSearch from "../components/HomeSearch";
import HomeProducts from "../components/HomeProducts";
import Carousel from "../components/Carousel";
import styles from "../constants/styles";
import HouseTypes from "../components/HouseTypes";
import QuickHouse from "../components/QuickHouse";
import { MyUserContext } from "../../App";
import { Colors } from "../constants";
import ListPosting from "../components/ListPosting";
const Home = ({ navigation }) => {
  const [user, dispatch] = useContext(MyUserContext);
  return (
    <ScrollView>
      <View style={styles.bgColor}>
        {/* <StatusBar barStyle="light-content" hidden={true} backgroundColor="#465bd8" /> */}

        {/* <Text> xin chào {user.username}</Text> */}
        {/* <Text> xin chào {user.avatar}</Text> */}
        {/* <Image source={{uri:user.avatar}} style={{backgroundColor:Colors.btgreen}}/> */}
        {/* <Image 
      source={{uri:user.avatar}}
      style={{backgroundColor:"red", width:70, height:70}}/> */}

        <View
          style={{ flexDirection: "row", paddingTop: 10, paddingBottom: 0 }}>
          <Image
            source={require("../library/images/logo1.png")}
            style={{ width: 50, height: 50, marginLeft: 12, paddingBottom: 0 }}
          />
          <Text
            style={{
              color: Colors.green,
              paddingTop: 10,
              fontWeight: "bold",
              fontSize: 20,
              textAlign: "center",
              fontStyle: "italic",
            }}>
            PiscesHouse
            <Text style={{ color: Colors.purple }}>
              {" "}
              xin chào {user.username}
            </Text>
          </Text>
        </View>
        {/* <HomeSearch /> */}
        <Carousel />
        {/* <HomeProducts /> */}
        <HouseTypes />
        <QuickHouse />
        <ListPosting navigation={navigation} />

        {/* <Text>{current_user.username}</Text> */}
      </View>
    </ScrollView>
  );
};

export default Home;
