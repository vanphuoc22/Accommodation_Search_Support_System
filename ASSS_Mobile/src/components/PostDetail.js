// import {
//   View,
//   Text,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   ActivityIndicator,
//   Linking,
// } from "react-native";
// import React, { useContext, useEffect, useState } from "react";
// import { useRoute } from "@react-navigation/native";
// import axios from "axios";
// import { endpoints } from "../config/Apis";
// import Comment from "./Comment";
// import styles from "../constants/styles";
// import { MyUserContext } from "../../App";
// import MainComment from "./MainComment";
// import { SliderBox } from "react-native-image-slider-box";
// import LikeStatus from "./LikeStatus";
// import { Colors } from "../constants";
// import { colors } from "react-native-elements";
// import CommentPost from "./CommentPost";
// import { useNavigation } from "@react-navigation/native";

// const PostDetail = ({ navigation }) => {
//   const route = useRoute();
//   const { postId } = route.params;
//   const { houseId } = route.params;
//   const { count } = route.params;
//   const { postDetail } = route.params;
//   const { houseDetail } = route.params;
//   const { DetailsOwner } = route.params;

//   const [cmts, setCmt] = useState([]);
//   const [post, setPost] = useState([]);
//   const [user, dispatch] = useContext(MyUserContext);
//   const [commentValue, setCommentValue] = useState("");
//   const [imgHouse, setImgHouse] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isDataLoaded, setIsDataLoaded] = useState(false); // Thêm biến state để theo dõi trạng thái hoàn thành của dữ liệu
//   const [approvalUrl, setapprovalUrl] = useState("");
//   const nav = useNavigation();

//   // const getPost = async () => {
//   //   try {
//   //     setIsLoading(true);

//   //     const { data } = await axios.get(endpoints["post"](postId));

//   //     // Giả lập độ trễ 2 giây
//   //     await new Promise((resolve) => setTimeout(resolve, 2000));

//   //     setPost(data);
//   //     setIsLoading(false);

//   //     console.log(data);
//   //   } catch (error) {
//   //     console.error("Error fetching home image:", error);
//   //     setIsLoading(false);
//   //     throw error;
//   //   }
//   // };

//   const getHomeImg = async (id) => {
//     try {
//       setIsLoading(true);

//       const { data } = await axios.get(endpoints["ImgOfHouse"](houseDetail.id));

//       // Giả lập độ trễ 2 giây
//       await new Promise((resolve) => setTimeout(resolve, 2000));

//       console.log("------Hình nhà-------", data);
//       setImgHouse(data);
//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error fetching home image:", error);
//       setIsLoading(false);
//       throw error;
//     }
//   };
//   const handleOpenMap = (address) => {
//     const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
//       address,
//     )}`;
//     // setDestination(address);

//     Linking.canOpenURL(mapUrl)
//       .then((supported) => {
//         if (supported) {
//           Linking.openURL(mapUrl);
//         } else {
//           console.log("Cannot open Google Maps");
//         }
//       })
//       .catch((error) => console.log(error));
//   };

//   // Hàm để thực hiện cuộc gọi điện trực tiếp
//   const makePhoneCall = () => {
//     const phoneNumber = DetailsOwner.phonenumber;

//     // Mở ứng dụng điện thoại với số điện thoại được chỉ định
//     Linking.openURL(`tel:${phoneNumber}`);
//   };
//   const postDetail1 = {
//     id: postDetail.id,
//     topic: postDetail?.topic,
//     describe: postDetail?.describe,
//     postingdate: postDetail?.postingdate,
//     expirationdate: postDetail?.expirationdate,
//   };
//   const houseDetail1 = {
//     id: houseDetail?.id,
//     address: houseDetail?.address,
//     acreage: houseDetail?.acreage,
//     price: houseDetail?.price,
//     quantity: houseDetail?.quantity,
//   };
//   const DetailsOwner1 = {
//     id: DetailsOwner?.id,
//     username: DetailsOwner?.username,
//     avatar: DetailsOwner?.avatar,
//     phonenumber: DetailsOwner?.phonenumber,
//   };
//   const navPayment = async () => {
//     amount = houseDetail.price;
//     nav.navigate("Paypal", {
//       amount: amount,
//       id: postDetail.id,
//       postDetail1,
//       DetailsOwner1,
//       houseDetail1,
//     });
//   };

//   // const getHouse = async (houseId) => {
//   //   try {
//   //     const { data } = await axios.get(endpoints["getHouseByID"](houseId));
//   //     //   console.log(data);
//   //     setHouse(data);
//   //   } catch (error) {
//   //     console.error("Error fetching home image:", error);
//   //     throw error;
//   //   }
//   // };
//   useEffect(() => {
//     if (postDetail.id && houseDetail.id) {
//       Promise.all([getHomeImg()]) // Sử dụng Promise.all để chờ cả hai hàm hoàn thành
//         .then(() => {
//           setIsDataLoaded(true); // Đã hoàn thành, đặt isDataLoaded thành true
//         })
//         .catch((error) => {
//           console.error("Error fetching post and home image:", error);
//         });
//     }
//   }, [postDetail.id, houseDetail.id]);

//   return (
//     <View style={[{ backgroundColor: Colors.background }]}>
//       <View style={{ flexDirection: "row", paddingTop: 10, paddingBottom: 0 }}>
//         <Image
//           source={require("../library/images/logo1.png")}
//           style={{ width: 50, height: 50, marginLeft: 12, paddingBottom: 0 }}
//         />
//         <Text
//           style={{
//             color: Colors.green,
//             paddingTop: 10,
//             fontWeight: "bold",
//             fontSize: 20,
//             textAlign: "center",
//             fontStyle: "italic",
//           }}>
//           PiscesHouse
//         </Text>
//       </View>
//       <View>
//         <Text style={[styles.postTitle, { fontSize: 20 }]}>
//           {" "}
//           {postDetail.topic}
//         </Text>
//       </View>
//       {post && (
//         <SliderBox
//           images={imgHouse.map((img) => img?.imageURL)}
//           autoPlay
//           circleLoop
//           dotColor="#13274F"
//           inactiveDotColor="#90A4AE"
//           ImageComponentStyle={{
//             borderRadius: 6,
//             width: "94%",
//           }}
//         />
//       )}
//       {/* <View style={{ marginBottom: 10 }} /> */}
//       <ScrollView>
//         {isLoading ? (
//           <ActivityIndicator size="small" color="#000" />
//         ) : (
//           <View style={[styles.borderInfo, { margin: 10 }]}>
//             {/* <View>
//               <LikeStatus post_id={postDetail.id} count={count} />
//             </View> */}
//             <View style={{ flexDirection: "row" }}>
//               <Text style={[styles.postDescription, { fontWeight: "bold" }]}>
//                 Hot:
//               </Text>
//               <Text style={styles.postDescription}> {postDetail.topic}</Text>
//             </View>
//             <View style={{ flexDirection: "row" }}>
//               <Text style={[styles.postDescription, { fontWeight: "bold" }]}>
//                 Acreage:
//               </Text>
//               <Text style={styles.postDescription}>
//                 {" "}
//                 {houseDetail.acreage} m2
//               </Text>
//             </View>
//             <View style={{ flexDirection: "row" }}>
//               <Text style={[styles.postDescription, { fontWeight: "bold" }]}>
//                 Describe:
//               </Text>
//               <Text style={styles.postDescription}> {postDetail.describe}</Text>
//             </View>
//             <TouchableOpacity
//               onPress={() => handleOpenMap(houseDetail.address)}
//               style={{ fontWeight: "normal" }}>
//               <View style={{ flexDirection: "row" }}>
//                 <Text style={[styles.postDescription, { fontWeight: "bold" }]}>
//                   Address:
//                 </Text>
//                 <Text style={styles.postDescription}>
//                   {" "}
//                   {houseDetail.address}
//                 </Text>
//               </View>
//               <Text
//                 style={[
//                   styles.postDescription,
//                   {
//                     fontWeight: "bold",
//                     color: Colors.greenPlus,
//                     fontStyle: "italic",
//                   },
//                 ]}>
//                 View the map{">"}
//               </Text>
//             </TouchableOpacity>
//             <View style={{ flexDirection: "row" }}>
//               <Text style={[styles.postDescription, { fontWeight: "bold" }]}>
//                 Price:
//               </Text>
//               <Text style={styles.postDescription}> {houseDetail.price}</Text>
//             </View>
//             <View style={{ flexDirection: "row" }}>
//               <Text style={[styles.postDescription, { fontWeight: "bold" }]}>
//                 Quantity:
//               </Text>
//               <Text style={styles.postDescription}>
//                 {" "}
//                 {houseDetail.quantity}
//               </Text>
//             </View>
//             <View style={{ flexDirection: "row" }}>
//               <Text style={[styles.postDescription, { fontWeight: "bold" }]}>
//                 Price:
//               </Text>
//               <Text style={styles.postDescription}> {houseDetail.price}</Text>
//             </View>
//             <View style={{ flexDirection: "row" }}>
//               <Text style={[styles.postDescription, { fontWeight: "bold" }]}>
//                 Quantity:
//               </Text>
//               <Text style={styles.postDescription}>
//                 {" "}
//                 {houseDetail.quantity}
//               </Text>
//             </View>
//             <View style={styles.bottomButtonsContainer}>
//               {/* Nút dẫn đến trang chat */}
//               <TouchableOpacity
//                 style={styles.bottomButton}
//                 onPress={() =>
//                   navigation.navigate("Chat", {
//                     id: DetailsOwner1.id,
//                     username: DetailsOwner1.username,
//                   })
//                 }>
//                 <Text style={{ color: Colors.blue, fontSize: 16 }}>Chat</Text>
//               </TouchableOpacity>

//               {/* Nút gọi điện trực tiếp */}
//               <TouchableOpacity
//                 style={styles.bottomButton}
//                 onPress={makePhoneCall}>
//                 <Text style={{ color: Colors.green, fontSize: 16 }}>
//                   Call Owner
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.bottomButton}
//                 onPress={navPayment}>
//                 <Text style={{ color: Colors.green, fontSize: 16 }}>
//                   THANH TOÁN
//                 </Text>
//               </TouchableOpacity>
//               <View style={styles.bottomButton}>
//                 <LikeStatus
//                   style={{ color: Colors.green, fontSize: 16 }}
//                   post_id={postDetail.id}
//                   count={count}
//                 />
//               </View>
//             </View>
//           </View>
//         )}

//         {isDataLoaded ? ( // Chỉ hiển thị component MainComment khi isDataLoaded là true
//           <MainComment postId={postDetail.id} />
//         ) : // <CommentPost postId={postDetail.id} />
//         null}
//       </ScrollView>
//     </View>
//   );
// };

// export default PostDetail;
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Linking,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { authApiToken, endpoints } from "../config/Apis";
import Comment from "./Comment";
import styles from "../constants/styles";
import { MyUserContext } from "../../App";
import MainComment from "./MainComment";
import { SliderBox } from "react-native-image-slider-box";
import LikeStatus from "./LikeStatus";
import { Colors } from "../constants";
import { colors } from "react-native-elements";
import CommentPost from "./CommentPost";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import profileStyle from "../constants/profileStyle";
import InputComment from "./InputComment";

const PostDetail = () => {
  const route = useRoute();
  const { postId } = route.params;
  const { houseId } = route.params;
  const { count } = route.params;
  const { postDetail } = route.params;
  const { houseDetail } = route.params;
  const { DetailsOwner } = route.params;
  const [action, setAction] = useState(1);
  const [cmts, setCmt] = useState([]);
  const [post, setPost] = useState([]);
  const [user, dispatch] = useContext(MyUserContext);
  const [IDCE, setIDCE] = useState(null);
  const [imgHouse, setImgHouse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Thêm biến state để theo dõi trạng thái hoàn thành của dữ liệu
  const [CommentEdit, setCommentEdit] = useState("");
  const [placeholder, setPlaceholder] = useState("Viết bình luận...");
  const nav = useNavigation();
  const getHomeImg = async () => {
    try {
      setIsLoading(true);

      const { data } = await axios.get(endpoints["ImgOfHouse"](houseDetail.id));

      // Giả lập độ trễ 2 giây
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("------Hình nhà-------", data);
      setImgHouse(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching home image:", error);
      setIsLoading(false);
      throw error;
    }
  };
  const handleOpenMap = (address) => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address,
    )}`;
    // setDestination(address);

    Linking.canOpenURL(mapUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(mapUrl);
        } else {
          console.log("Cannot open Google Maps");
        }
      })
      .catch((error) => console.log(error));
  };
  const navigateToChat = () => {
    nav.navigate("Chat", {
      id: DetailsOwner.id,
      username: DetailsOwner.username,
    });
  };

  // Hàm để thực hiện cuộc gọi điện trực tiếp
  const makePhoneCall = () => {
    const phoneNumber = DetailsOwner.phonenumber;

    // Mở ứng dụng điện thoại với số điện thoại được chỉ định
    Linking.openURL(`tel:${phoneNumber}`);
  };
  const postDetail1 = {
    id: postDetail.id,
    topic: postDetail?.topic,
    describe: postDetail?.describe,
    postingdate: postDetail?.postingdate,
    expirationdate: postDetail?.expirationdate,
  };
  const houseDetail1 = {
    id: houseDetail?.id,
    address: houseDetail?.address,
    acreage: houseDetail?.acreage,
    price: houseDetail?.price,
    quantity: houseDetail?.quantity,
  };
  const DetailsOwner1 = {
    id: DetailsOwner?.id,
    username: DetailsOwner?.username,
    avatar: DetailsOwner?.avatar,
    phonenumber: DetailsOwner?.phonenumber,
  };
  const navPayment = async () => {
    const token = await AsyncStorage.getItem("token");
    const date = new FormData();
    date.append("post", postId);
    const responsa = await authApiToken(token).post(
      endpoints["createBooking"],
      date,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    const idBooking = responsa.data.id;
    const payment = new FormData();
    payment.append("booking", responsa.data.id);
    payment.append("typepayment", 2);
    payment.append("total", houseDetail.price);
    const response = await axios.post(endpoints["createPayment"], payment, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const paymentID = response.data.id;
    console.log("idbooking", idBooking);
    amount = houseDetail.price;
    nav.navigate("Paypal", {
      amount: amount,
      id: postDetail.id,
      postDetail1,
      DetailsOwner1,
      houseDetail1,
      paymentID: paymentID,
      idBooking: idBooking,
    });
  };

  useEffect(() => {
    if (postDetail.id && houseDetail.id) {
      Promise.all([getHomeImg()]) // Sử dụng Promise.all để chờ cả hai hàm hoàn thành
        .then(() => {
          setIsDataLoaded(true); // Đã hoàn thành, đặt isDataLoaded thành true
        })
        .catch((error) => {
          console.error("Error fetching post and home image:", error);
        });
    }
  }, [postDetail.id, houseDetail.id]);

  useEffect(() => {
    getCmt();
  }, [postId]);

  const getCmt = async () => {
    console.log("ID của bài post", postId);
    try {
      const token = await AsyncStorage.getItem("token");
      const { data } = await authApiToken(token).get(
        endpoints["listCommentID"](postId),
      );
      setCmt(data);
      console.info("1342432742346tr7243262743", data);
    } catch (error) {
      console.error("Error fetching list cmt:", error);
      throw error;
    }
  };

  const deleteCmt = async (commentId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await authApiToken(token).delete(
        endpoints["commentAPI"](commentId),
      );
      if (response.status === 204) {
        console.log("Deleted comment:", commentId);
        getCmt();
      } else {
        console.log("Error deleting comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      throw error;
    }
  };

  return (
    <>
      <View style={[{ backgroundColor: Colors.background }]}>
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
        <View style={{ position: "relative" }}>
          <Text style={[styles.postTitle, { fontSize: 20 }]}>
            {" "}
            {postDetail.topic}
          </Text>
        </View>
        <View style={{ height: "80%" }}>
          <ScrollView>
            {post && (
              <SliderBox
                images={imgHouse.map((img) => img?.imageURL)}
                autoPlay
                circleLoop
                dotColor="#13274F"
                inactiveDotColor="#90A4AE"
                ImageComponentStyle={{
                  borderRadius: 6,
                  width: "94%",
                }}
              />
            )}
            <View>
              {isLoading ? (
                <ActivityIndicator size="small" color="#000" />
              ) : (
                <View style={[styles.borderInfo, { margin: 10 }]}>
                  {/* <View>
              <LikeStatus post_id={postDetail.id} count={count} />
            </View> */}
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={[styles.postDescription, { fontWeight: "bold" }]}>
                      Hot:
                    </Text>
                    <Text style={styles.postDescription}>
                      {" "}
                      {postDetail.topic}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={[styles.postDescription, { fontWeight: "bold" }]}>
                      Acreage:
                    </Text>
                    <Text style={styles.postDescription}>
                      {" "}
                      {houseDetail.acreage} m2
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={[styles.postDescription, { fontWeight: "bold" }]}>
                      Describe:
                    </Text>
                    <Text style={styles.postDescription}>
                      {" "}
                      {postDetail.describe}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleOpenMap(houseDetail.address)}
                    style={{ fontWeight: "normal" }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={[
                          styles.postDescription,
                          { fontWeight: "bold" },
                        ]}>
                        Address:
                      </Text>
                      <Text style={styles.postDescription}>
                        {" "}
                        {houseDetail.address}
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.postDescription,
                        {
                          fontWeight: "bold",
                          color: Colors.greenPlus,
                          fontStyle: "italic",
                        },
                      ]}>
                      View the map{">"}
                    </Text>
                  </TouchableOpacity>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={[styles.postDescription, { fontWeight: "bold" }]}>
                      Price:
                    </Text>
                    <Text style={styles.postDescription}>
                      {" "}
                      {houseDetail.price}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={[styles.postDescription, { fontWeight: "bold" }]}>
                      Quantity:
                    </Text>
                    <Text style={styles.postDescription}>
                      {" "}
                      {houseDetail.quantity}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={[styles.postDescription, { fontWeight: "bold" }]}>
                      Price:
                    </Text>
                    <Text style={styles.postDescription}>
                      {" "}
                      {houseDetail.price}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={[styles.postDescription, { fontWeight: "bold" }]}>
                      Quantity:
                    </Text>
                    <Text style={styles.postDescription}>
                      {" "}
                      {houseDetail.quantity}
                    </Text>
                  </View>
                  <View style={styles.bottomButtonsContainer}>
                    {/* Nút dẫn đến trang chat */}
                    <TouchableOpacity
                      style={styles.bottomButton}
                      onPress={navigateToChat}>
                      <Text style={{ color: Colors.blue, fontSize: 16 }}>
                        Chat
                      </Text>
                    </TouchableOpacity>

                    {/* Nút gọi điện trực tiếp */}
                    <TouchableOpacity
                      style={styles.bottomButton}
                      onPress={makePhoneCall}>
                      <Text style={{ color: Colors.green, fontSize: 16 }}>
                        Call Owner
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.bottomButton}
                      onPress={navPayment}>
                      <Text style={{ color: Colors.green, fontSize: 16 }}>
                        Payment
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.bottomButton}>
                      <LikeStatus
                        style={{ color: Colors.green, fontSize: 16 }}
                        post_id={postDetail.id}
                        count={count}
                      />
                    </View>
                  </View>
                </View>
              )}
            </View>
            {cmts.map((comment) =>
              comment.parentcomment === null ? (
                <View key={comment.id}>
                  <TouchableOpacity>
                    <View
                      style={{ alignItems: "center", flexDirection: "row" }}>
                      <Image
                        source={{ uri: comment.user.avatar }}
                        style={profileStyle.profileImgList}
                        resizeMode="center"
                      />
                      <Text style={[styles.postTitle]}>
                        {comment.user.username}
                      </Text>
                    </View>
                    <Text style={{ fontSize: 15 }}>
                      {"  "}
                      {comment.value}
                    </Text>
                  </TouchableOpacity>
                  {user.id === comment.user.id ? (
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        onPress={() => {
                          setAction(2),
                            setIDCE(comment.id),
                            setCommentEdit(comment.value);
                        }}
                        style={{ margin: 10 }}>
                        <Text style={{ fontSize: 12, color: "grey" }}>
                          Edit {comment.id}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => deleteCmt(comment.id)}
                        style={{ margin: 10 }}>
                        <Text style={{ fontSize: 12, color: "grey" }}>
                          Delete
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setAction(3),
                            setIDCE(comment.id),
                            setPlaceholder(
                              "Trả lời " + `${comment.user.username}`,
                            );
                        }}
                        style={{ margin: 10 }}>
                        <Text style={{ fontSize: 12, color: "grey" }}>
                          {"    "}Reply
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        setAction(3),
                          setIDCE(comment.id),
                          setPlaceholder(
                            "Trả lời " + `${comment.user.username}`,
                          );
                      }}
                      style={{ margin: 10 }}>
                      <Text style={{ fontSize: 12, color: "grey" }}>
                        {"    "}Reply
                      </Text>
                    </TouchableOpacity>
                  )}
                  <Comment
                    ParId={comment.id}
                    PostId={postId}
                    getCMT={getCmt}
                    setIDCE={setIDCE}
                    setAction={setAction}
                    setCommentEdit={setCommentEdit}
                    setPlaceholder={setPlaceholder}
                  />
                </View>
              ) : null,
            )}
          </ScrollView>
        </View>
        <InputComment
          postId={postId}
          action={action}
          getCmt={getCmt}
          IDCE={IDCE}
          CommentEdit={CommentEdit}
          placeholder={placeholder}
        />
      </View>
      {/* <InputComment postId={postId} action={action}/> */}
    </>
  );
};

export default PostDetail;
