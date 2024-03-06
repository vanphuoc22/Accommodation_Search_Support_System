import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ListAllNotice from "./ListAllNotice";
import ListUnreadNotice from "./ListUnreadNotice";
import { MyUserContext } from "../../App";
import { endpoints } from "../config/Apis";
import axios from "axios";
import styles from "../constants/styles";
import { color } from "react-native-elements/dist/helpers";
import profileStyle from "../constants/profileStyle";
import Icon from "react-native-vector-icons/FontAwesome";
const Notice = ({ navigation }) => {
  const [notice, setNotices] = useState([]);
  const [count, setCount] = useState("");
  const [user, dispatch] = useContext(MyUserContext);
  const [loading, setLoading] = useState(true);

  const remove = async (Id) => {
    // console.log("----------------------------them cai cho no xat nhan")
    try {
      const response = await axios.delete(endpoints["noticeAPI"](Id));
      if (response.status == 204) {
        getAllNotice();
        console.log("xoa xong oi nhung ma t chua them ", Id);
      } else {
        console.log("loi roi ");
      }
    } catch (error) {
      console.error("Error fetching comment delete :", error);
      throw error;
    }
  };

  const seenNotice = async (Id) => {
    try {
      const response = await axios.patch(endpoints["noticeAPI"](Id));
      if (response.status == 200) {
        console.log("xem xong oi ", Id);
        getAllNotice();
      } else {
        console.log("loi roi ");
      }
    } catch (error) {
      console.error("Error fetching comment delete :", error);
      throw error;
    }
  };

  const getAllNotice = async () => {
    try {
      const response = await axios.get(endpoints["allNotice"](user.id));
      setNotices(response.data.notices);
      setCount(response.data.count);
      setLoading(false); // Cập nhật trạng thái loading khi dữ liệu đã được tải xong
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
  const postDetail = {
    id: notice?.post?.id,
    topic: notice?.post?.topic,
    describe: notice?.post?.describe,
    postingdate: notice?.post?.postingdate,
    expirationdate: notice?.post?.expirationdate,
  };
  const houseDetail = {
    id: notice?.post?.house?.id,
    address: notice?.post?.house?.address,
    acreage: notice?.post?.house?.acreage,
    price: notice?.post?.house?.price,
    quantity: notice?.post?.house?.quantity,
  };
  const DetailsOwner = {
    id: notice?.post?.user?.id,
    username: notice?.post?.user?.username,
    avatar: notice?.post?.user?.avatar,
    phonenumber: notice?.post?.user?.phonenumber,
  };
  const nav = (id) => {
    seenNotice(notice.id),
      navigation.navigate("PostDetail", {
        postId: notice?.post?.id,
        houseId: notice?.post?.house?.id,
        postDetail,
        houseDetail,
        DetailsOwner,
        count: 10,
      });
  };
  useEffect(() => {
    if (user) {
      getAllNotice();
    }
  }, [user]);

  return (
    <View style={styles.containerListPosting}>
      {loading ? (
        <ActivityIndicator size="small" color="#000" />
      ) : (
        <View>
          <View>
            <Text>All {count}</Text>
          </View>
          <View>
            <ScrollView>
              {notice.map((notice) => {
                return (
                  <TouchableOpacity
                    key={notice.id}
                    onPress={() => {
                      // nav(notice.id);
                      navigation.navigate("PostDetail", {
                        postId: notice?.post?.id,
                        houseId: notice?.post?.house?.id,
                        postDetail,
                        houseDetail,
                        DetailsOwner,
                        count: 10,
                      });
                    }}>
                    <View
                      style={[
                        styles.postItem,
                        notice.status
                          ? { backgroundColor: "#DADADA" }
                          : { backgroundColor: "#D7CBC4" },
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
                        <Text style={styles.postTitle}>
                          {notice.post.user.username}
                        </Text>
                        <Text>just updated a house</Text>
                        <TouchableOpacity
                          style={{ marginLeft: 70 }}
                          onPress={() => remove(notice.id)}>
                          <Icon name="times" size={30} color="red" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <Text></Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Notice;
// ==============================
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   PanResponder,
//   Animated,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";
// import axios from "axios";
// import { endpoints } from "../config/Apis";

// const Notice = ({ navigation }) => {
//   const [notices, setNotices] = useState([]);
//   const [count, setCount] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getAllNotice();
//   }, []);

//   const removeNotice = async (id) => {
//     try {
//       const response = await axios.delete(endpoints.noticeAPI(id));
//       if (response.status === 204) {
//         console.log("Notice removed successfully:", id);
//         getAllNotice();
//       } else {
//         console.log("Failed to remove notice:", id);
//       }
//     } catch (error) {
//       console.error("Error removing notice:", error);
//     }
//   };

//   const getAllNotice = async () => {
//     try {
//       const response = await axios.get(endpoints.allNotice());
//       setNotices(response.data.notices);
//       setCount(response.data.count);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching notices:", error);
//     }
//   };
//   const postDetail = {
//     id: notices?.post?.id,
//     topic: notices?.post?.topic,
//     describe: notices?.post?.describe,
//     postingdate: notices?.post?.postingdate,
//     expirationdate: notices?.post?.expirationdate,
//   };
//   const houseDetail = {
//     id: notices?.post?.house?.id,
//     address: notices?.post?.house?.address,
//     acreage: notices?.post?.house?.acreage,
//     price: notices?.post?.house?.price,
//     quantity: notices?.post?.house?.quantity,
//   };
//   const DetailsOwner = {
//     id: notices?.post?.user?.id,
//     username: notices?.post?.user?.username,
//     avatar: notices?.post?.user?.avatar,
//     phonenumber: notices?.post?.user?.phonenumber,
//   };
//   const navToDetail = (id) => {
//     console.log("Navigate to post detail with ID:", id);
//     navigation.navigate("PostDetail", {
//       postId: notices?.post?.id,
//       houseId: notices?.post?.house?.id,
//       postDetail,
//       houseDetail,
//       DetailsOwner,
//       count: 10,
//     });
//     // Điều hướng đến màn hình chi tiết bài đăng với ID tương ứng
//   };

//   const panResponder = React.useRef(
//     PanResponder.create({
//       onMoveShouldSetPanResponderCapture: () => true,
//       onPanResponderRelease: (e, gestureState) => {
//         const swipeThreshold = 50; // Ngưỡng trượt ngang để xóa (đơn vị pixel)
//         if (gestureState.dx < -swipeThreshold) {
//           // Nếu trượt sang trái hơn ngưỡng, xóa thông báo
//           const index = Math.floor((-gestureState.dx - swipeThreshold) / 100); // Tính toán chỉ số của thông báo cần xóa
//           if (index >= 0 && index < notices.length) {
//             removeNotice(notices[index].id);
//           }
//         }
//       },
//     }),
//   ).current;

//   return (
//     <View>
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         <View>
//           <View>
//             <Text>All {count}</Text>
//           </View>
//           <ScrollView>
//             {notices.map((item, index) => (
//               <TouchableOpacity
//                 key={item.id}
//                 onPress={() => navToDetail(item.id)}>
//                 <Animated.View
//                   style={[
//                     styles.postItem,
//                     {
//                       transform: [
//                         {
//                           translateX: new Animated.Value(0),
//                         },
//                       ],
//                     },
//                   ]}
//                   {...panResponder.panHandlers}>
//                   <View>
//                     <Text>{item.title}</Text>
//                     <Text>{item.content}</Text>
//                   </View>
//                 </Animated.View>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </View>
//       )}
//     </View>
//   );
// };

// export default Notice;
