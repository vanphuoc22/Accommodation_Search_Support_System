// import React, { useContext, useEffect, useState } from "react";
// import { View, Text, ScrollView } from "react-native";
// import { ProfileBody, ProfileButtons } from "../components/ProfileBody";
// import Entypo from "react-native-vector-icons/Entypo";
// import { MyUserContext } from "../../App";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { authApiToken, endpoints } from "../config/Apis";
// import { useRoute } from "@react-navigation/native";
// import profileStyle from "../constants/profileStyle";

// const Profile = ({ route }) => {
//   const [user, dispatch] = useContext(MyUserContext);
//   const [userInfo, setUserInfo] = useState([]);

//   const getData = async () => {
//     const token = await AsyncStorage.getItem("token");

//     // console.log(token)

//     const userResponse = await authApiToken(token).get(
//       endpoints["countFollow"],
//     );
//     const userData = userResponse.data;
//     // console.log(userData)
//     setUserInfo(userData);
//   };

//   useEffect(() => {
//     if (user) {
//       getData();
//     } else {
//       console.log("user khong ton tai");
//     }
//   }, [user]);

//   return (
//     <View style={profileStyle.viewProfile}>
//       <View style={{ width: "100%", padding: 10 }}>
//         <ProfileBody
//           name={user.first_name}
//           accountName={user.username}
//           profileImage={(source = { uri: user.avatar })}
//           followers={userInfo.count_follower}
//           following={userInfo.count_following}
//           post={userInfo.count_post}
//         />
//         <ProfileButtons
//           id={user.id}
//           name={user.first_name}
//           accountName={user.username}
//           profileImage={(source = { uri: user.avatar })}
//           address={user.address}
//           email={user.email}
//           phoneNumber={user.phoneNumber}
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

// export default Profile;
// ----------------------------------16/01/2024-----------------------------/
import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { ProfileBody, ProfileButtons } from "../components/ProfileBody";
import Entypo from "react-native-vector-icons/Entypo";
import { MyUserContext } from "../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApiToken, endpoints } from "../config/Apis";
import { useRoute } from "@react-navigation/native";
import profileStyle from "../constants/profileStyle";
import PostingInProfile from "../components/PostingInProfile";

const Profile = ({ route }) => {
  const [user, dispatch] = useContext(MyUserContext);
  const [userInfo, setUserInfo] = useState([]);

  const getData = async () => {
    const token = await AsyncStorage.getItem("token");

    console.log(token);

    const userResponse = await authApiToken(token).get(
      endpoints["countFollow"],
    );
    const userData = userResponse.data;
    console.log(userData);
    setUserInfo(userData);
  };

  useEffect(() => {
    if (user) {
      getData();
    } else {
      console.log("user khong ton tai");
    }
  }, [user]);

  return (
    <View style={profileStyle.viewProfile}>
      <View style={{ width: "100%", padding: 10 }}>
        <ProfileBody
          id={user.id}
          name={user.first_name}
          accountName={user.username}
          profileImage={(source = { uri: user.avatar })}
          followers={userInfo.count_follower}
          following={userInfo.count_following}
          post={userInfo.count_post}
        />
        <ProfileButtons
          id={user.id}
          name={user.last_name}
          accountName={user.username}
          profileImage={(source = { uri: user.avatar })}
          address={user.address}
          email={user.email}
          phoneNumber={user.phoneNumber}
        />
      </View>
      <View>
        <Text style={profileStyle.textUserName}>Story Highlights</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}></ScrollView>
      </View>
      <View style={{ width: "100%" }}>
        <Text style={profileStyle.textUserName}>List Posting</Text>
      </View>
      <PostingInProfile id={user.id} />
    </View>
  );
};

export default Profile;
