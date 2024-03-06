// import React,{useContext, useState} from 'react'
// import { Avatar,StyleSheet, Text, ScrollView,View,StatusBar,Image,TextInput, TouchableOpacity, ImageBackground, Button, SafeAreaView, Touchable, } from 'react-native'
// import Buttons from '../components/Buttons'
// import {Colors} from '../constants'
// import Icon from 'react-native-vector-icons/FontAwesome'
// import styles from '../constants/styles'
// import { useEffect } from 'react';
// import { Caption, Title, TouchableRipple } from 'react-native-paper'
// import { Ionicons } from '@expo/vector-icons'
// import { MyUserContext } from '../../App'
// import ProfileBody, { ProfileButtons } from '../components/ProfileBody'

// const UserProfile = ({navigation}) => {
//   const [user, dispatch] = useContext(MyUserContext)

//   return (
//     <SafeAreaView style={{flex: 1, paddingTop:10, backgroundColor:Colors.background}}>
//         {/* <View style={styles.userInfoSection}>
//           <View style={{flexDirection:"row"}}>
//         <Image
//           source={{
//           uri: "https://res.cloudinary.com/dycn3luxu/image/upload/v1703240826/t%E1%BA%A3i_xu%E1%BB%91ng_4_srgbl2.jpg",
//           }}
//             style={{ width: 100, height: 100, borderRadius:50 }}
//         />
//         <View style={{marginLeft:20, marginTop:30}}>
//           <Text style={styles.textHeader} >Nguyễn A</Text>
//         </View>
//         </View>
//         </View> */}

//         {/* <View style={{ alignSelf: "center" }}>
//           <View style={styles.profileImage}>
//                         <Image source={{uri:user.avatar}} style={styles.image1} resizeMode="center"/>
//             </View>

//               <View style={styles.add}>
//                         <Ionicons name="ios-add" size={18} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
//               </View>

//         </View>
//         <View style={{alignItems:"center"}}>
//           <Text style={styles.textHeader} >{user.username}</Text>
//         </View>

//         <View style={{paddingTop:10}}></View>

//         <View style={styles.userInfoSection}>
//           <View style={styles.row}>
//           <Icon name="envelope-o" size={15} color="#818181"/>
//           <Text >   {user.email}</Text>
//           </View>

//         </View>

//         <View style={styles.userInfoSection}>
//           <View style={styles.row}>
//           <Icon name="phone" size={22} color="#818181"/>
//           <Text>  {user.phonenumber}</Text>
//           </View>

//         </View>
//         <View style={styles.userInfoSection}>
//           <View style={styles.row}>
//           <Icon name="birthday-cake" size={22} color="#818181"/>
//           <Text> 22/02/2002</Text>
//           </View>

//         </View>
//         <View style={styles.userInfoSection}>
//           <View style={styles.row}>
//           <Icon name="map-marker" size={22} color="#818181"/>
//           <Text> Go Vap </Text>
//           </View>
//         </View>

//         <View style={styles.infoBoxWrapper}>
//           <View style={styles.infoBox}>
//             <Title></Title>
//             <Caption>Following</Caption>

//           </View>
//           <View style={styles.infoBox}>
//             <Title></Title>
//             <Caption>Follower</Caption>

//           </View>
//           <View style={styles.infoBox}>
//             <Title>2000</Title>
//             <Caption>Posted</Caption>

//           </View>
//           <View>

//           </View>
//         </View>
//         <View>
//             <Text style={{color: Colors.greenPlus,fontSize: 30,fontWeight: 'bold',paddingLeft:20, paddingTop:10}}>More:</Text>
//         </View> */}
//         <ProfileBody/>
//         <ProfileButtons/>

//       </SafeAreaView>
//   )
// }

// export default UserProfile
// =====================================================================================================
// import React,{useContext, useState} from 'react'
// import { Avatar,StyleSheet, Text, ScrollView,View,StatusBar,Image,TextInput, TouchableOpacity, ImageBackground, Button, SafeAreaView, Touchable, } from 'react-native'
// import Buttons from '../components/Buttons'
// import {Colors} from '../constants'
// import Icon from 'react-native-vector-icons/FontAwesome'
// import styles from '../constants/styles'
// import { useEffect } from 'react';
// import { Caption, Title, TouchableRipple } from 'react-native-paper'
// import { Ionicons } from '@expo/vector-icons'
// import { MyUserContext } from '../../App'

// const Profile = ({navigation}) => {
//   const [user, dispatch] = useContext(MyUserContext)
//   return (

//       <SafeAreaView style={{flex: 1, paddingTop:10, backgroundColor:Colors.background}}>
//         {/* <View style={styles.userInfoSection}>
//           <View style={{flexDirection:"row"}}>
//         <Image
//           source={{
//           uri: "https://res.cloudinary.com/dycn3luxu/image/upload/v1703240826/t%E1%BA%A3i_xu%E1%BB%91ng_4_srgbl2.jpg",
//           }}
//             style={{ width: 100, height: 100, borderRadius:50 }}
//         />
//         <View style={{marginLeft:20, marginTop:30}}>
//           <Text style={styles.textHeader} >Nguyễn A</Text>
//         </View>
//         </View>
//         </View> */}

//         <View style={{ alignSelf: "center" }}>
//           <View style={styles.profileImage}>
//                         <Image source={{uri:user.avatar}} style={styles.image1} resizeMode="center"/>
//             </View>

//               {/* <View style={styles.active}></View> */}
//               <View style={styles.add}>
//                         <Ionicons name="ios-add" size={18} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
//               </View>

//         </View>
//         <View style={{alignItems:"center"}}>
//           <Text style={styles.textHeader} >{user.username}</Text>
//         </View>

//         <View style={{paddingTop:10}}></View>

//         <View style={styles.userInfoSection}>
//           <View style={styles.row}>
//           <Icon name="envelope-o" size={15} color="#818181"/>
//           <Text >   {user.email}</Text>
//           </View>

//         </View>

//         <View style={styles.userInfoSection}>
//           <View style={styles.row}>
//           <Icon name="phone" size={22} color="#818181"/>
//           <Text>  {user.phonenumber}</Text>
//           </View>

//         </View>
//         <View style={styles.userInfoSection}>
//           <View style={styles.row}>
//           <Icon name="birthday-cake" size={22} color="#818181"/>
//           <Text> 22/02/2002</Text>
//           </View>

//         </View>
//         <View style={styles.userInfoSection}>
//           <View style={styles.row}>
//           <Icon name="map-marker" size={22} color="#818181"/>
//           <Text> Go Vap </Text>
//           </View>
//         </View>

//         <View style={styles.infoBoxWrapper}>
//           <View style={styles.infoBox}>
//             <Title></Title>
//             <Caption>Following</Caption>

//           </View>
//           <View style={styles.infoBox}>
//             <Title></Title>
//             <Caption>Follower</Caption>

//           </View>
//           <View style={styles.infoBox}>
//             <Title>2000</Title>
//             <Caption>Posted</Caption>

//           </View>
//           <View>

//           </View>
//         </View>
//         <View>
//             <Text style={{color: Colors.greenPlus,fontSize: 30,fontWeight: 'bold',paddingLeft:20, paddingTop:10}}>More:</Text>
//         </View>

//         <View style={styles.menuWrapper}>
//           <TouchableRipple onPress={() => {}}>
//             <View style={styles.menuItem}>
//             <Icon name="cogs" size={15} color="#818181"/>
//               <Text style={styles.menuItemText}> Cài đặt</Text>
//             </View>
//           </TouchableRipple>

//           <TouchableRipple onPress={() => navigation.navigate("UserProfile")}>
//             <View style={styles.menuItem}>
//             <Icon name="pencil" size={15} color="#818181"/>

//               <Text style={styles.menuItemText} > Cập nhật thông tin</Text>

//             </View>
//           </TouchableRipple>

//           <TouchableRipple onPress={() => {}}>
//             <View style={styles.menuItem}>
//             <Icon name="sign-out" size={15} color="#818181"/>
//               <Text style={styles.menuItemText}> Đăng xuất</Text>
//             </View>
//           </TouchableRipple>
//         </View>
//       </SafeAreaView>

//   )
// }

// export default Profile
// ========================================================================================
// import React, { useContext, useEffect, useState } from "react";
// import { View, Text, ScrollView } from "react-native";
// import { ProfileBody, ProfileButtons } from "../components/ProfileBody";
// import Entypo from "react-native-vector-icons/Entypo";
// import { MyUserContext } from "../../App";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { authApiToken, endpoints } from "../config/Apis";
// import { route } from "@react-navigation/native";
// import axios from "axios";

// const UserProfile = ({ route }) => {
//   const [user, dispatch] = useContext(MyUserContext);
//   const [otherUser, setOtherUser] = useState([]);

//   const { id } = route.params;
//   // alert(users)
//   console.log("aaaaaaaaaaaaaaaaaaaaaa", id);
//   const [userInfo, setUserInfo] = useState([]);

//   const getData = async () => {
//     const res = await axios.get(endpoints["accFollow"](id));
//     console.log("ra--------------------", res.data);
//     setUserInfo(res.data);
//   };

//   const getUser = async () => {
//     const res = await axios.get(endpoints["otherUSer"](id));
//     console.log("Đây là đối tượng được lấy ra với ", res.data);
//     setOtherUser(res.data);
//   };

//   useEffect(() => {
//     if (id) {
//       getData();
//       getUser();
//     } else {
//       console.log("user khong ton tai");
//     }
//   }, [id]);

//   return (
//     <View style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
//       <View style={{ width: "100%", padding: 10 }}>
//         <ProfileBody
//           name={otherUser.first_name}
//           accountName={otherUser.username}
//           profileImage={(source = { uri: otherUser.avatar })}
//           followers={userInfo.count_follower}
//           following={userInfo.count_following}
//           post={userInfo.count_post}
//         />
//         <ProfileButtons
//           id={otherUser.id}
//           name="Mr Peobody"
//           accountName="mr_peobody"
//           profileImage={require("../library/images/home1.png")}
//         />
//       </View>
//       <View>
//         <Text
//           style={{
//             padding: 10,
//             letterSpacing: 1,
//             fontSize: 14,
//           }}>
//           Story Highlights
//         </Text>
//         <ScrollView
//           horizontal={true}
//           showsHorizontalScrollIndicator={false}
//           style={{
//             paddingVertical: 5,
//             paddingHorizontal: 10,
//           }}></ScrollView>
//       </View>
//     </View>
//   );
// };

// export default UserProfile;
// ================================================================================
// import React, { useContext, useEffect, useState } from "react";
// import { View, Text, ScrollView } from "react-native";
// import { ProfileBody, ProfileButtons } from "../components/ProfileBody";
// import Entypo from "react-native-vector-icons/Entypo";
// import { MyUserContext } from "../../App";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { authApiToken, endpoints } from "../config/Apis";
// import { useRoute } from "@react-navigation/native";
// import profileStyle from "../constants/profileStyle";

// const UserProfile = ({ route }) => {
//   const [user, dispatch] = useContext(MyUserContext);
//   const [userInfo, setUserInfo] = useState([]);
//   const [otherUser, setOtherUser] = useState([]);

//   const { id } = route.params;

//   console.log("ID truyền qua userProfile", id);
//   const getData = async () => {
//     const res = await axios.get(endpoints["accFollow"](id));
//     console.log("ra--------------------", res.data);
//     setUserInfo(res.data);
//   };
//   const getUser = async () => {
//     const res = await axios.get(endpoints["otherUSer"](id));
//     console.log("Đây là đối tượng được lấy ra với ", res.data);
//     setOtherUser(res.data);
//   };
//   useEffect(() => {
//     if (otherUser) {
//       getData();
//       getUser();
//     } else {
//       console.log("user khong ton tai");
//     }
//   }, [otherUser]);

//   return (
//     <View style={profileStyle.viewProfile}>
//       <View style={{ width: "100%", padding: 10 }}>
//         <ProfileBody
//           name={otherUser.first_name}
//           accountName={otherUser.username}
//           profileImage={(source = { uri: otherUser.avatar })}
//           followers={userInfo.count_follower}
//           following={userInfo.count_following}
//           post={userInfo.count_post}
//         />
//         <ProfileButtons
//           id={otherUser.id}
//           name={otherUser.first_name}
//           accountName={otherUser.username}
//           profileImage={(source = { uri: otherUser.avatar })}
//           address={otherUser.address}
//           email={otherUser.email}
//           phoneNumber={otherUser.phoneNumber}
//         />
//       </View>
//       <View>
//         <Text style={profileStyle.textUserName}>Story Highlights</Text>
//         <ScrollView
//           horizontal={true}
//           showsHorizontalScrollIndicator={false}
//           style={{
//             paddingVertical: 5,
//             paddingHorizontal: 10,
//           }}></ScrollView>
//       </View>
//     </View>
//   );
// };

// export default UserProfile;
// --------------------------------------------------------16/01/2024-----------------------------------
import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { ProfileBody, ProfileButtons } from "../components/ProfileBody";
import Entypo from "react-native-vector-icons/Entypo";
import { MyUserContext } from "../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApiToken, endpoints } from "../config/Apis";
import { route } from "@react-navigation/native";
import axios from "axios";
import PostingInProfile from "../components/PostingInProfile";

const UserProfile = ({ route, navigation }) => {
  const [user, dispatch] = useContext(MyUserContext);
  const [otherUser, setOtherUser] = useState([]);

  const { id } = route.params;
  // alert(users)
  // console.log("aaaaaaaaaaaaaaaaaaaaaa",id)
  const [userInfo, setUserInfo] = useState([]);

  const getData = async () => {
    const res = await axios.get(endpoints["accFollow"](id));
    console.log("đếm được số Fl của thằng được chạm vào", res.data);
    setUserInfo(res.data);
  };

  const getUser = async () => {
    console.log("Đây là id của thằng được chạm vào", id);
    const res = await axios.get(endpoints["otherUSer"](id));
    console.log("Lấy ra đôi tượng của ID được chạm vào", res.data);
    setOtherUser(res.data);
  };

  useEffect(() => {
    if (id) {
      getData();
      getUser();
    } else {
      console.log("user khong ton tai");
    }
  }, [id]);

  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
      <View style={{ width: "100%", padding: 10 }}>
        <ProfileBody
          id={id}
          name={otherUser.first_name}
          accountName={otherUser.username}
          profileImage={(source = { uri: otherUser.avatar })}
          followers={userInfo.count_follower}
          following={userInfo.count_following}
          post={userInfo.count_post}
        />
        <ProfileButtons
          id={id}
          name="Mr Peobody"
          accountName="mr_peobody"
          profileImage={require("../library/images/home1.png")}
        />
      </View>
      <View>
        <Text
          style={{
            padding: 10,
            letterSpacing: 1,
            fontSize: 14,
          }}>
          Story Highlights
        </Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}></ScrollView>
      </View>
      <PostingInProfile id={id} />
    </View>
  );
};

export default UserProfile;
