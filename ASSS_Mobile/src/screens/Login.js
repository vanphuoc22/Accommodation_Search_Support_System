import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Buttons from "../components/Buttons";
import { Colors } from "../constants";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../constants/styles";
import { useEffect } from "react";
import axios from "axios";
import Apis, { authApiToken, endpoints } from "../config/Apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { MyUserContext } from "../../App";
// import Spinner from 'react-bootstrap/Spinner'

const Login = ({ navigation }) => {
  // const [user, setUser] = useState(null)
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [user, dispatch] = useContext(MyUserContext);

  const login = async () => {
    if (!username || !password) {
      // Nếu không, hiển thị thông báo lỗi
      alert("Please enter username and password");
      return;
    }
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    // formData.append("username", "user1");
    // formData.append("password", "123");

    try {
      // console.log(formData)
      const response = await axios.post(endpoints["token"], formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if ((response.status = 200)) {
        // const responseData = await response.json();
        const token = response.data.access_token;
        console.log("------------------------Token:-----------------", token);
        await AsyncStorage.setItem("token", token);

        const userResponse = await authApiToken(token).get(
          endpoints["current_user"],
        );
        const userData = userResponse.data;
        // console.log(userResponse.data);

        await AsyncStorage.setItem("current_user", JSON.stringify(userData));
        dispatch({
          type: "login",
          payload: userData,
        });

        navigation.navigate("MyTab");
      } else {
        const errorData = await response.json();
        console.log("Error1:", errorData.message);
      }
    } catch (error) {
      console.log("Error2:", error.message);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff", flexDirection: "column" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Image
        flex={1}
        alt="Logo"
        resizeMode="cover"
        size="lg"
        w="full"
        source={require("../library/images/bg.png")}
      />
      <View
        w="full"
        h="full"
        position="absolute"
        top="0"
        px="6"
        justifyContent="center">
        {/* {Login form} */}
        <View
          style={{
            flex: 2,
            flexDirection: "column",
            paddingTop: 0,
            paddingHorizontal: "2%",
          }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingTop: "50%",
            }}>
            <Text style={styles.textHeader}>Welcome Back</Text>
            <Image
              source={require("../library/images/logo1.png")}
              style={{ width: 50, height: 50 }}
            />
          </View>
          <Text style={styles.textInfor}>
            I am happy to see you again. You can continue where you left off by
            logging in
          </Text>

          {/* LoginView */}

          <View style={styles.viewLogin}>
            <View style={styles.inputSignUp}>
              <Icon name="user" size={22} color="#818181" />
              <TextInput
                style={styles.input}
                value={username}
                placeholder="Enter User"
                onChangeText={(text) => setUsername(text)}
                placeholderTextColor="#818181"
              />
            </View>
            <View style={styles.inputSignUp}>
              <Icon name="lock" size={22} color="#818181" />
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                value={password}
                placeholder="Enter Password"
                onChangeText={(text) => setPassword(text)}
                placeholderTextColor="#818181"
              />
            </View>
            <View style={{ width: "95%", marginBottom: 10 }}>
              <Text
                style={styles.fogotPass}
                onPress={() => navigation.navigate("Forgot")}>
                Forgot Password?
              </Text>
            </View>

            <Buttons btn_text={"Log In"} on_press={login} />
            {/* <Buttons btn_text={"Log In"} on_press={()=>navigation.navigate("MyTab")} /> */}

            {/* <View style={{width: '95%', marginBottom: 10, paddingTop: 0}}>
              <Text style={{fontSize: 17, fontFamily: 'OpenSans-SemiBold', color: '#818181', alignSelf: 'flex-end'}} onPress={() => navigation.navigate("Signup")}>Register</Text>
            </View> */}
          </View>
        </View>
        {/* {Google Login} */}
        <View>
          {/* {user.length < 1 ? (
                    <Text>Chưa có dữ liệu</Text>
                ) : (
                    user.map(c => <Text key={c.id}>{c.name}</Text>)
                )} */}
          <View
            style={{
              flex: 2,
              flexDirection: "column",
              paddingHorizontal: "3%",
            }}>
            <Text
              style={{
                textAlign: "center",
                marginVertical: 35,
                color: "#818181",
                fontSize: 20,
              }}>
              Or
            </Text>

            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}>
              <TouchableOpacity
                onPress={() => console.log("google login")}
                style={styles.social_btn}>
                <Image
                  style={styles.social_img}
                  source={require("../library/images/google_icon.png")}
                />
                <Text
                  style={{ width: "80%", textAlign: "center", fontSize: 16 }}>
                  Sign in with Google{" "}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-end",
                marginBottom: 10,
              }}>
              <Text style={{ fontSize: 17, color: "#818181" }}>
                Don't have a account?{" "}
              </Text>
              <Text
                style={{ fontSize: 18, color: "#333" }}
                onPress={() => navigation.navigate("Signup")}>
                Sign Up
              </Text>
            </View>
          </View>
        </View>
        {/* </ImageBackground> */}
      </View>
    </ScrollView>
  );
};

export default Login;
