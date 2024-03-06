// import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
// import React, { useContext, useEffect, useState } from "react";
// import { endpoints } from "../config/Apis";
// import axios from "axios";
// import { MyUserContext } from "../../App";
// import styles from "../constants/styles";
// import profileStyle from "../constants/profileStyle";

// const ListAllNotice = ({ notice, navigation }) => {
//   const [user, dispatch] = useContext(MyUserContext);
//   console.log(notice.post.user.avatar);
//   const postDetail = {
//     id: notice?.post?.id,
//     topic: notice?.post?.topic,
//     describe: notice?.post?.describe,
//     postingdate: notice?.post?.postingdate,
//     expirationdate: notice?.post?.expirationdate,
//   };
//   const houseDetail = {
//     id: notice?.post?.house?.id,
//     address: notice?.post?.house?.address,
//     acreage: notice?.post?.house?.acreage,
//     price: notice?.post?.house?.price,
//     quantity: notice?.post?.house?.quantity,
//   };
//   const DetailsOwner = {
//     id: notice?.post?.user?.id,
//     username: notice?.post?.user?.username,
//     avatar: notice?.post?.user?.avatar,
//     phonenumber: notice?.post?.user?.phonenumber,
//   };
//   return (
//     <View
//       style={[
//         styles.postItem,
//         notice.status
//           ? { backgroundColor: "#DADADA" }
//           : { backgroundColor: "#D7CBC4" },
//       ]}>
//       <TouchableOpacity
//         style={{
//           alignItems: "center",
//           flexDirection: "row",
//         }}
//         onPress={() => {
//           navigation.navigate("PostDetail", {
//             postId: notice?.post?.id,
//             houseId: notice?.post?.house?.id,
//             postDetail,
//             houseDetail,
//             DetailsOwner,
//             count: 10,
//           });
//         }}>
//         <Image
//           source={{
//             uri: notice.post.user.avatar,
//           }}
//           style={profileStyle.profileImgList}
//           resizeMode="center"
//         />
//         <Text style={styles.postTitle}>{notice.user.username}</Text>
//         <Text>just updated a house</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default ListAllNotice;
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { endpoints } from "../config/Apis";
import axios from "axios";
import { MyUserContext } from "../../App";
import styles from "../constants/styles";
import profileStyle from "../constants/profileStyle";

const ListAllNotice = ({ notice }) => {
  const [user, dispatch] = useContext(MyUserContext);
  console.log(notice.post.user.avatar);

  return (
    <View
      style={[
        styles.containerListPosting,
        notice.status
          ? { backgroundColor: "blue" }
          : { backgroundColor: "red" },
      ]}>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
        }}>
        <Image
          source={{
            uri: notice.post.user.avatar,
          }}
          style={profileStyle.profileImgList}
          resizeMode="center"
        />
        <Text style={styles.postTitle}>{notice.user.username}</Text>
        <Text>just updated a house</Text>
      </View>
    </View>
  );
};

export default ListAllNotice;
