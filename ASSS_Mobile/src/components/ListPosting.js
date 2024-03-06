// import axios from "axios";
// import React, { useContext, useEffect, useState } from "react";
// import {
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Linking,
// } from "react-native";
// import { endpoints } from "../config/Apis";
// import profileStyle from "../constants/profileStyle";
// import styles from "../constants/styles";
// import { MyUserContext } from "../../App";
// import Icon from "react-native-vector-icons/FontAwesome";
// import LikeStatus from "./LikeStatus";
// import { Colors } from "../constants";
// import ImgOfHouse from "./ImgOfHouse";
// import PostingInList from "./PostingInList";
// import BaiDang from "./BaiDang";

// // import { Linking } from "@react-native-community/linking";

// const ListPosting = ({ navigation }) => {
//   const [user, dispatch] = useContext(MyUserContext);
//   const [posts, setPosts] = useState([]);
//   const [imgHouse, setImgHouse] = useState([]);
//   const [cmts, setCmt] = useState([]);
//   const [destination, setDestination] = useState("");
//   const [distance, setDistance] = useState("");
//   const [onePost, setOnePost] = useState();
//   const [isMappingComplete, setIsMappingComplete] = useState(false);

//   const getData = async () => {
//     const { data } = await axios.get(endpoints["list"]);
//     setPosts(data);
//   };
//   // const getHomeImg = async (id) => {
//   //   console.log(
//   //     "====================================================================================",
//   //   );
//   //   const { data } = await axios.get(endpoints["ImgOfHouse"](onePost.house));
//   //   // console.log("-------------", data)
//   //   setImgHouse(data);
//   // };
//   const getPost = async () => {
//     try {
//       const { data } = await axios.get(endpoints["post"](posts.id));
//       setOnePost(data);
//     } catch (error) {
//       console.error("Error fetching home image:", error);
//       throw error;
//     }
//   };
//   // const getHomeImg = async () => {
//   //   console.log(
//   //     "====================================================================================",
//   //   );
//   //   try {
//   //     const { data } = await axios.get(endpoints["images"]);
//   //     setImgHouse(data);
//   //     // console.log("data", data);
//   //   } catch (error) {
//   //     console.error("Error fetching home image:", error);
//   //     throw error;
//   //   }
//   // };

//   useEffect(() => {
//     getData();
//     // getHomeImg();
//     getPost();
//     // getDistance(origin, destination, apiKey);
//     setIsMappingComplete(true);
//   }, []);

//   // const BlinkingText = ({ text, interval }) => {
//   //   const [isVisible, setIsVisible] = useState(true);

//   //   useEffect(() => {
//   //     const intervalId = setInterval(() => {
//   //       setIsVisible((prevVisible) => !prevVisible);
//   //     }, interval);

//   //     return () => {
//   //       clearInterval(intervalId);
//   //     };
//   //   }, [interval]);

//   //   return (
//   //     <Text style={[styles.blinkingText, isVisible && styles.visibleText]}>
//   //       {text}
//   //     </Text>
//   //   );
//   // };

//   // const handleOpenMap = (address) => {
//   //   const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
//   //     address,
//   //   )}`;
//   //   // setDestination(address);

//   //   Linking.canOpenURL(mapUrl)
//   //     .then((supported) => {
//   //       if (supported) {
//   //         Linking.openURL(mapUrl);
//   //       } else {
//   //         console.log("Cannot open Google Maps");
//   //       }
//   //     })
//   //     .catch((error) => console.log(error));
//   // };
//   // const origin = user.address;
//   // const apiKey = "AIzaSyA19KEqEq-0jWmvoZQC4oF3AoM3TdjwR5k";

//   // const getDistance = async (origin, destination, apiKey) => {
//   //   try {
//   //     const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
//   //       origin,
//   //     )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
//   //     console.log(url);
//   //     const response = await axios.get(url);
//   //     console.log("map: ", response);
//   //     if (response.data.status === "OK") {
//   //       const elements = response.data.rows[0].elements[0];

//   //       if (elements.status === "OK") {
//   //         const distanceText = elements.distance.text;
//   //         const distanceValue = elements.distance.value;

//   //         console.log("Distance:", distanceText);
//   //         console.log("Distance value:", distanceValue);

//   //         setDistance(distanceText);
//   //       } else {
//   //         console.log("Error đang ở:", elements.status);
//   //       }
//   //     } else {
//   //       console.log("Error này:", response.data.status);
//   //     }
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };

//   return (
//     <ScrollView
//       style={[
//         styles.containerListPosting,
//         { backgroundColor: Colors.background },
//       ]}>
//       {isMappingComplete &&
//         posts.map((post) => (
//           // <TouchableOpacity
//           //   key={post.id}
//           //   style={styles.postItem}
//           //   onPress={() => {
//           //     navigation.navigate("PostDetailPage", {
//           //       postId: post.post.id,
//           //       houseId: post.post.house.id,
//           //       priceHouse: post.post.house.price,
//           //     });
//           //   }}>
//           //   <View style={{ alignItems: "center", flexDirection: "row" }}>
//           //     <Image
//           //       source={{ uri: post.post.user.avatar }}
//           //       style={profileStyle.profileImgList}
//           //     />
//           //     <Text style={[styles.postTitle]}>{post.post.user.username}</Text>
//           //   </View>
//           //   <View>
//           //     <TouchableOpacity
//           //       onPress={() => handleOpenMap(post.post.house.address)}
//           //       style={styles.postDescription}>
//           //       <View style={{ flexDirection: "row" }}>
//           //         <Text style={[styles.postDescription, { fontWeight: "bold" }]}>
//           //           Address:
//           //         </Text>
//           //         <Text style={styles.postDescription}>
//           //           {" "}
//           //           {post.post.house.address}
//           //         </Text>
//           //       </View>

//           //       {/* {distance !== "" && (
//           //         <Text style={styles.postDescription}>
//           //           Khoảng cách: {distance}
//           //         </Text>
//           //       )} */}
//           //     </TouchableOpacity>
//           //     <View style={{ flexDirection: "row" }}>
//           //       <Text style={[styles.postDescription, { fontWeight: "bold" }]}>
//           //         Hot:
//           //       </Text>
//           //       <Text style={styles.postDescription}> {post.post.topic}</Text>
//           //     </View>
//           //     <View style={{ flexDirection: "row" }}>
//           //       <Text style={[styles.postDescription, { fontWeight: "bold" }]}>
//           //         Price:
//           //       </Text>
//           //       <Text style={styles.postDescription}>
//           //         {" "}
//           //         {post.post.house.price}
//           //       </Text>
//           //     </View>

//           //     <View style={{ flexDirection: "row" }}>
//           //       <Text style={[styles.postDescription, { fontWeight: "bold" }]}>
//           //         Price:--------------
//           //       </Text>
//           //       <Text style={styles.postDescription}> {post.post.house.id}</Text>
//           //     </View>

//           //     <ImgOfHouse houseID={post.post.house.id} />

//           //     <Text style={styles.postDescription}>
//           //       {post.post.active === true ? (
//           //         <BlinkingText text="VẪN CÒN NHÉ" interval={500} />
//           //       ) : (
//           //         <Text style={styles.inactiveText}>HẾT RỒI Ạ!!</Text>
//           //       )}
//           //     </Text>
//           //     {post.post.discount.value !== 0 ? (
//           //       <Text style={styles.postDescription}>
//           //         {post.post.discount.name}{" "}
//           //       </Text>
//           //     ) : null}

//           //     <View style={styles.imagePostContainer}>
//           //       {imgHouse.map((img, index) =>
//           //         img.house.id == post.post.house.id ? (
//           //           <Image
//           //             key={index}
//           //             source={{ uri: img.imageURL }}
//           //             style={styles.imagePost}
//           //           />
//           //         ) : null,
//           //       )}
//           //     </View>
//           //   </View>

//           //   {/* {imgHouse.map((img) => (
//           //     {img.house == post.house.id ? (
//           //         <View> <Image
//           //           key={img.id}
//           //           source={{ uri: img.imageURL}}
//           //           style={styles.houseImage}
//           //           />
//           //           </View>
//           //     ) : (

//           //     )}

//           //   ))} */}

//           //   {/* Danh sách bình luận */}
//           //   <View style={styles.separator} />
//           //   <View
//           //     style={[
//           //       styles.footer,
//           //       { flexDirection: "row", justifyContent: "space-between" },
//           //     ]}>
//           //     <LikeStatus post_id={post.post.id} count={post.count} />
//           //     <TouchableOpacity
//           //       style={styles.action}
//           //       onPress={() => {
//           //         navigation.navigate("PostDetailPage", {
//           //           postId: post.post.id,
//           //         });
//           //       }}>
//           //       <Icon name="comment-o" size={20} color="#000" />
//           //       <Text style={styles.count}>Comment</Text>
//           //     </TouchableOpacity>
//           //   </View>
//           // </TouchableOpacity>

//           <PostingInList
//             postId={post?.post?.id}
//             houseId={post?.post?.house?.id}
//             userId={post?.post?.user?.id}
//             discountId={post?.post?.discount?.id}
//             count={post?.count}
//           />
//         ))}
//     </ScrollView>
//   );
// };

// export default ListPosting;

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  ActivityIndicator,
} from "react-native";
import { endpoints } from "../config/Apis";
import profileStyle from "../constants/profileStyle";
import styles from "../constants/styles";
import { MyUserContext } from "../../App";
import Icon from "react-native-vector-icons/FontAwesome";
import LikeStatus from "./LikeStatus";
import { Colors } from "../constants";
import ImgOfHouse from "./ImgOfHouse";
import PostingInList from "./PostingInList";
import BaiDang from "./BaiDang";

const ListPosting = ({ navigation }) => {
  const [user, dispatch] = useContext(MyUserContext);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      // Giả lập độ trễ 2 giây
      setTimeout(async () => {
        const { data } = await axios.get(endpoints["list"]);
        setPosts(data);

        setIsLoading(false);
      }, 5000);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setIsLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView
      style={[
        styles.containerListPosting,
        { backgroundColor: Colors.background },
      ]}>
      {isLoading ? (
        <ActivityIndicator size="small" color="#000" />
      ) : (
        posts.map((post) => (
          <PostingInList
            key={post?.post?.id}
            postId={post?.post?.id}
            houseId={post?.post?.house?.id}
            userId={post?.post?.user?.id}
            discountId={post?.post?.discount?.id}
            active={post?.post?.active}
            count={post?.count}
          />
        ))
      )}
    </ScrollView>
  );
};

export default ListPosting;
