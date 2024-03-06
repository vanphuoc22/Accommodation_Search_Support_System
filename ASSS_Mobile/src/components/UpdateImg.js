import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApiToken, endpoints } from "../config/Apis";
import { MyUserContext } from "../../App";
import { AntDesign } from "@expo/vector-icons";

const UpdateImg = ({ navigation }) => {
  const [user, dispatch] = useContext(MyUserContext);
  const [image, setImage] = useState(null);

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
        endpoints["updateUser"](user.id),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log("Tới đây");
      navigation.goBack();
      await AsyncStorage.setItem("user", JSON.stringify(res.data));
      dispatch({ type: "login", payload: res.data });
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <View
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <View style={[{ position: "relative" }]}>
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
          <Image source={{ uri: user.avatar }} />
        )}
        <View style={{ width: 100, height: 100 }}>
          <TouchableOpacity onPress={pickImage}>
            <AntDesign color="#2d665f" name="camerao" size={25} />
          </TouchableOpacity>
        </View>
      </View>
      {/* <View>
        <Text style={[{ fontSize: 25 }]}>
          {user.first_name} {user.last_name}
        </Text>
        <Text>Chức vụ: {user.role}</Text>
      </View> */}
    </View>
  );
};

export default UpdateImg;
