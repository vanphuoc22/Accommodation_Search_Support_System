import { View, Text, ScrollView, Image, TextInput, Button } from "react-native";
import React, { useState } from "react";
import styles from "../constants/styles";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/FontAwesome";
import Buttons from "./Buttons";
import { authApiToken, endpoints } from "../config/Apis";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserCreatePost = ({ navigation }) => {
  const [topic, setTopic] = useState();
  const [describe, setDescribe] = useState();

  const createPost = async () => {
    const token = await AsyncStorage.getItem("token");
    let formData = new FormData();
    formData.append("topic", topic);
    formData.append("describe", describe);
    console.log(formData);
    let myPost = await authApiToken(token).post(
      endpoints["createPost"],
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    console.log(myPost.data);
    if (myPost.status === 200) {
      setTopic("");
      setDescribe("");
      navigation.navigate("Home");
    }
  };

  return (
    <View style={[styles.bgColor, { width: "100%", height: "100%" }]}>
      <ScrollView>
        <StatusBar
          barStyle="light-content"
          hidden={true}
          backgroundColor="#465bd8"
        />
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
          </Text>
        </View>
        <Text
          style={{
            fontSize: 12,
            paddingTop: 2,
            color: "black",
            marginHorizontal: 10,
          }}>
          I am happy to see you again. You can continue write everything"
        </Text>
        <View style={{ marginHorizontal: 10, marginVertical: 30 }}>
          <View style={{ margin: 10 }}>
            <View style={styles.inputSignUp}>
              <Icon name="book" size={22} color="#818181" />
              <TextInput
                style={styles.input}
                value={topic}
                onChangeText={setTopic}
                placeholder="Topic"
                placeholderTextColor="#818181"
              />
            </View>
            <View style={styles.inputSignUp}>
              <Icon name="book" size={22} color="#818181" />
              <TextInput
                style={styles.input}
                value={describe}
                onChangeText={setDescribe}
                placeholder="Describe"
                placeholderTextColor="#818181"
              />
            </View>
            {/* ==========================================date area======================================== */}
          </View>

          <View style={{ marginLeft: 12, marginRight: 4, marginVertical: 20 }}>
            <Buttons on_press={createPost} btn_text={"CreatePost"} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UserCreatePost;
