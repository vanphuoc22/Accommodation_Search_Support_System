// import React, { useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   ScrollView,
//   View,
//   StatusBar,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   ImageBackground,
//   Button,
// } from "react-native";
// import Buttons from "../components/Buttons";
// import { Colors } from "../constants";
// import Icon from "react-native-vector-icons/FontAwesome";
// import styles from "../constants/styles";
// import { useEffect } from "react";
// import Info1 from "../components/Info1";
// import Toast from "react-native-toast-message";

// const Signup = ({ navigation }) => {
//   const [usernameInput, setUsername] = useState("");
//   const [firstNameInput, setFirstName] = useState("");
//   const [lastNameInput, setLastName] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [emailInput, setEmail] = useState("");
//   const [passwordInput, setPassword] = useState("");
//   const [registerInfo, setRegisterInfo] = useState([]);
//   // const [param, setParam] = useState([]);

//   const handleGetValue = () => {
//     if (passwordInput === confirmPassword) {
//       console.log("do ham moi");
//       Toast.show({
//         type: "info",
//         text1: "Đăng ký thành công. Vui lòng chờ xét duyệt!",
//       });
//     } else {
//       console.log(passwordInput, confirmPassword);
//       Toast.show({
//         type: "error",
//         text1: "Mật khẩu không khớp",
//       });
//       console.log("Mật khẩu không khớp!");
//     }

//     console.log("-----------------", usernameInput);
//     console.log("----------j-------", firstNameInput);
//   };

//   return (
//     <ScrollView
//       style={{ flex: 1, backgroundColor: "#fff", flexDirection: "column" }}>
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />
//       <Image
//         flex={1}
//         alt="Logo"
//         resizeMode="cover"
//         size="lg"
//         w="full"
//         source={require("../library/images/bg.png")}
//       />
//       <View
//         w="full"
//         h="full"
//         position="absolute"
//         top="0"
//         px="6"
//         justifyContent="center">
//         {/* {Login form} */}
//         <View
//           style={{
//             flex: 2,
//             flexDirection: "column",
//             paddingTop: 0,
//             paddingHorizontal: "2%",
//           }}>
//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "flex-start",
//               alignItems: "center",
//               paddingTop: "30%",
//             }}>
//             <Text style={styles.textHeader}>Register Page</Text>
//             <Image
//               source={require("../library/images/logo1.png")}
//               style={{ width: 50, height: 50 }}
//             />
//           </View>
//           <Text style={styles.textInfor}>Fill all to create account!!!</Text>
//           <View style={[styles.viewLogin, { marginRight: 25 }]}>
//             <View>
//               <View>
//                 <View style={[styles.inputSignUp]}>
//                   <Icon name="user" size={15} color="#818181" />
//                   <TextInput
//                     style={styles.input}
//                     placeholder="Enter username"
//                     value={usernameInput}
//                     onChangeText={(text) => setUsername(text)}
//                     placeholderTextColor="#818181"
//                   />
//                 </View>
//                 <View style={[styles.inputSignUp]}>
//                   <Icon name="envelope-o" size={15} color="#818181" />
//                   <TextInput
//                     style={[styles.input, { marginRight: 20 }]}
//                     value={emailInput}
//                     placeholder="Enter Email"
//                     onChangeText={(text) => setEmail(text)}
//                     placeholderTextColor="#818181"
//                   />
//                 </View>
//               </View>
//               <View style={{ flexDirection: "row", marginRight: -30 }}>
//                 <View style={[styles.inputSignUp, { width: "45%" }]}>
//                   <Icon name="user" size={15} color="#818181" />
//                   <TextInput
//                     style={styles.input}
//                     placeholder="Enter lastname"
//                     value={lastNameInput}
//                     onChangeText={(text) => setLastName(text)}
//                     placeholderTextColor="#818181"
//                   />
//                 </View>
//                 <View style={[styles.inputSignUp, { width: "45%" }]}>
//                   <Icon name="user" size={15} color="#818181" />
//                   <TextInput
//                     style={[styles.input, { marginRight: 20 }]}
//                     placeholder="Enter firstname"
//                     value={firstNameInput}
//                     onChangeText={(text) => setFirstName(text)}
//                     placeholderTextColor="#818181"
//                   />
//                 </View>
//               </View>
//               <View>
//                 <View style={[styles.inputSignUp]}>
//                   <Icon name="lock" size={15} color="#818181" />
//                   <TextInput
//                     style={styles.input}
//                     secureTextEntry={true}
//                     value={passwordInput}
//                     placeholder="Enter Password"
//                     onChangeText={(text) => setPassword(text)}
//                     placeholderTextColor="#818181"
//                   />
//                 </View>
//                 <View style={[styles.inputSignUp]}>
//                   <Icon name="lock" size={15} color="#818181" />
//                   <TextInput
//                     style={[styles.input, { marginRight: 20 }]}
//                     secureTextEntry={true}
//                     placeholder="Enter Password again"
//                     value={confirmPassword}
//                     onChangeText={(text) => setConfirmPassword(text)}
//                     placeholderTextColor="#818181"
//                   />
//                 </View>
//               </View>
//             </View>
//             <View style={{ paddingTop: 40 }}></View>

//             <Buttons
//               btn_text={"Next"}
//               on_press={() => {
//                 handleGetValue();
//                 navigation.navigate("Signup2", {
//                   // registerInfo: param,
//                   username: usernameInput,
//                   email: emailInput,
//                   lastName: lastNameInput,
//                   firstName: firstNameInput,
//                   password: passwordInput,
//                 });
//               }}
//             />
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default Signup;
import React, { useState } from "react";
import {
  ScrollView,
  View,
  StatusBar,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { Colors } from "../constants";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../constants/styles";
import Buttons from "../components/Buttons";
import Toast from "react-native-toast-message";

const Signup = ({ navigation }) => {
  const [usernameInput, setUsername] = useState("");
  const [firstNameInput, setFirstName] = useState("");
  const [lastNameInput, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailInput, setEmail] = useState("");
  const [passwordInput, setPassword] = useState("");

  const validateInput = () => {
    if (
      !usernameInput ||
      !firstNameInput ||
      !lastNameInput ||
      !emailInput ||
      !passwordInput ||
      !confirmPassword
    ) {
      Toast.show({
        type: "error",
        text1: "Vui lòng điền đầy đủ thông tin",
      });
      return false;
    }

    if (passwordInput !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Mật khẩu không khớp",
      });
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (validateInput()) {
      navigation.navigate("Signup2", {
        username: usernameInput,
        email: emailInput,
        lastName: lastNameInput,
        firstName: firstNameInput,
        password: passwordInput,
      });
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff", flexDirection: "column" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {/* Background image */}
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
        {/* Login form */}
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
              paddingTop: "30%",
            }}>
            <Text style={styles.textHeader}>Register Page</Text>
            <Image
              source={require("../library/images/logo1.png")}
              style={{ width: 50, height: 50 }}
            />
          </View>
          <Text style={styles.textInfor}>Fill all to create account!!!</Text>
          <View style={[styles.viewLogin, { marginRight: 25 }]}>
            <View>
              <View>
                {/* Username and email */}
                <View style={[styles.inputSignUp]}>
                  <Icon name="user" size={15} color="#818181" />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter username"
                    value={usernameInput}
                    onChangeText={(text) => setUsername(text)}
                    placeholderTextColor="#818181"
                  />
                </View>
                <View style={[styles.inputSignUp]}>
                  <Icon name="envelope-o" size={15} color="#818181" />
                  <TextInput
                    style={[styles.input, { marginRight: 20 }]}
                    value={emailInput}
                    placeholder="Enter Email"
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor="#818181"
                  />
                </View>
              </View>
              <View style={{ flexDirection: "row", marginRight: -30 }}>
                {/* Last name and first name */}
                <View style={[styles.inputSignUp, { width: "45%" }]}>
                  <Icon name="user" size={15} color="#818181" />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter lastname"
                    value={lastNameInput}
                    onChangeText={(text) => setLastName(text)}
                    placeholderTextColor="#818181"
                  />
                </View>
                <View style={[styles.inputSignUp, { width: "45%" }]}>
                  <Icon name="user" size={15} color="#818181" />
                  <TextInput
                    style={[styles.input, { marginRight: 20 }]}
                    placeholder="Enter firstname"
                    value={firstNameInput}
                    onChangeText={(text) => setFirstName(text)}
                    placeholderTextColor="#818181"
                  />
                </View>
              </View>
              {/* Password and confirm password */}
              <View>
                <View style={[styles.inputSignUp]}>
                  <Icon name="lock" size={15} color="#818181" />
                  <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    value={passwordInput}
                    placeholder="Enter Password"
                    onChangeText={(text) => setPassword(text)}
                    placeholderTextColor="#818181"
                  />
                </View>
                <View style={[styles.inputSignUp]}>
                  <Icon name="lock" size={15} color="#818181" />
                  <TextInput
                    style={[styles.input, { marginRight: 20 }]}
                    secureTextEntry={true}
                    placeholder="Enter Password again"
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                    placeholderTextColor="#818181"
                  />
                </View>
              </View>
            </View>
            <View style={{ paddingTop: 40 }}></View>

            {/* Next button */}
            <Buttons btn_text={"Next"} on_press={handleNext} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup;
