// import {
//   View,
//   Text,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   Image,
// } from "react-native";
// import React, { useContext, useEffect, useState } from "react";
// import { useRoute } from "@react-navigation/native";
// import axios from "axios";
// import { authApiToken, endpoints } from "../config/Apis";
// import Comment from "./Comment";
// import styles from "../constants/styles";
// import { MyUserContext } from "../../App";
// import profileStyle from "../constants/profileStyle";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// const MainComment = () => {
//   const route = useRoute();
//   const { postId } = route.params;
//   const [cmts, setCmt] = useState([]);
//   const [post, setPost] = useState([]);
//   const [user, dispatch] = useContext(MyUserContext);
//   const [commentValue, setCommentValue] = useState("");
//   const [imgHouse, setImgHouse] = useState([]);
//   // const [replyingTo, setReplyingTo] = useState(null);
//   const [replyValue, setReplyValue] = useState("");
//   const [showInput, setShowInput] = useState(false);
//   const [selectedCommentId, setSelectedCommentId] = useState(null);

//   // const getHomeImg = async (id) => {
//   //   // console.log("====================================================================================")
//   //   const { data } = await axios.get(endpoints["ImgOfHouse"](post.id));
//   //   console.log("------Hình nhà-------", data);
//   //   setImgHouse(data);
//   // };
//   const toggleReplyInput = () => {
//     setShowInput(!showInput);
//   };
//   const getPost = async () => {
//     try {
//       const { data } = await axios.get(endpoints["post"](postId));
//       setPost(data);
//     } catch (error) {
//       console.error("Error fetching post:", error);
//       throw error;
//     }
//   };

//   // const getOwnerCmt = async () => {
//   //   try {
//   //     const { data } = await axios.get(endpoints["post"](postId));
//   //     setPost(data);
//   //   } catch (error) {
//   //     console.error("Error fetching post:", error);
//   //     throw error;
//   //   }
//   // };

//   const getCmt = async () => {
//     try {
//       const token = await AsyncStorage.getItem("token");
//       const { data } = await authApiToken(token).get(
//         endpoints["listCommentID"](postId),
//       );
//       setCmt(data);
//     } catch (error) {
//       console.error("Error fetching list cmt:", error);
//       throw error;
//     }
//   };

//   const deleteCmt = async (commnetId) => {
//     try {
//       const token = await AsyncStorage.getItem("token");
//       const response = await authApiToken(token).delete(
//         endpoints["commentAPI"](commnetId),
//       );
//       if (response.status == 204) {
//         console.log("xoa xong oi nhung ma t chua them ", commnetId);
//         getCmt();
//       } else {
//         console.log("xoa roi ", commnetId);
//       }
//     } catch (error) {
//       console.error("Error fetching comment :", error);
//       throw error;
//     }
//   };

//   const updateCmt = async (commnetId) => {
//     try {
//       const token = await AsyncStorage.getItem("token");
//       const data = new FormData();
//       data.append("value", "thay the ne");
//       const response = await authApiToken(token).patch(
//         endpoints["commentupdate"](commnetId),
//         data,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         },
//       );
//       if (response.status == 200) {
//         console.log("vua moi sua xong cmt ", commnetId);
//         getCmt();
//       } else {
//         console.log("loi roi ");
//       }
//     } catch (error) {
//       console.error("Error fetching comment update :", error);
//       throw error;
//     }
//   };

//   // const repCmt = async (commnetId) => {
//   //   try {
//   //     const data = new FormData();
//   //     data.append("value", "comment ne !!");
//   //     data.append("post", postId);
//   //     data.append("user", user.id);
//   //     data.append("parentcomment", commnetId);
//   //     const response = await axios.post(endpoints["commentcreate"], data, {
//   //       headers: {
//   //         "Content-Type": "multipart/form-data",
//   //       },
//   //     });
//   //     if (response.status == 201) {
//   //       console.log("vua moi rep ", response.data);
//   //       // getCmt();
//   //     } else {
//   //       console.log("sai roi ");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching comment rep :", error);
//   //     throw error;
//   //   }
//   // };
//   const repCmt = async (commentId) => {
//     try {
//       const token = await AsyncStorage.getItem("token");
//       const data = new FormData();
//       data.append("value", replyValue);
//       data.append("post", postId);
//       data.append("user", user.id);
//       data.append("parentcomment", commentId);
//       const response = await authApiToken(token).post(
//         endpoints["commentcreate"],
//         data,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         },
//       );
//       if (response.status == 201) {
//         console.log("vua moi rep ", response.data);
//         setReplyValue(""); // Reset the reply value
//         setSelectedCommentId(null); // Reset the selected comment
//         toggleReplyInput(); // Ẩn TextInput sau khi gửi reply thành công
//         getCmt();
//       } else {
//         console.log("sai roi ");
//       }
//     } catch (error) {
//       console.error("Error fetching comment rep :", error);
//       throw error;
//     }
//   };
//   const createCmt = async () => {
//     console.log("VÀo được create cmt");
//     try {
//       const data = new FormData();
//       data.append("value", commentValue);
//       data.append("post", postId);
//       data.append("user", user.id);
//       const token = await AsyncStorage.getItem("token");
//       const response = await authApiToken(token).post(
//         endpoints["commentcreate"],
//         data,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         },
//       );
//       if (response.status == 201) {
//         console.log("vua moi ceate ", response.data);

//         setCommentValue(""); // Đặt giá trị của TextInput về chuỗi rỗng
//         getCmt();
//       } else {
//         console.log("sai roi ");
//       }
//     } catch (error) {
//       console.error("Error fetching comment create :", error);
//       throw error;
//     }
//   };

//   // console.log(cmts);

//   useEffect(() => {
//     if (postId) {
//       getPost();
//       getCmt();
//       // getHomeImg();
//     }
//   }, [postId]);

//   return (
//     <View
//       style={[
//         styles.containerListPosting,
//         { backgroundColor: Colors.background },
//       ]}>
//       {/* <View style={styles.imagePostContainer}>
//         {imgHouse.map((img, index) =>
//           img.house.id == post.house.id ? (
//             <Image
//               key={index}
//               source={{ uri: img.imageURL }}
//               style={styles.imagePost}
//             />
//           ) : null,
//         )}
//       </View> */}

//       {/* <View style={{ alignItems: "center", flexDirection: "row" }}>
//         <TextInput
//           placeholder="Enter value..."
//           style={[styles.search, { width: "67%" }]}
//           onChangeText={(text) => setCommentValue(text)}
//           value={commentValue}
//         />
//         <TouchableOpacity
//           style={{
//             justifyContent: "center",
//             width: "23%",
//             backgroundColor: Colors.greenPlus,
//             height: 50,
//             marginBottom: 0,
//             borderRadius: 10,
//           }}
//           onPress={() => createCmt()}>
//           <Text
//             style={{
//               fontSize: 10,
//               letterSpacing: 1.5,
//               textAlign: "center",
//               position: "relative",
//               color: Colors.white,
//             }}>
//             Comment
//           </Text>
//         </TouchableOpacity>
//       </View> */}
//       <View>
//         <Text style={styles.title}>Bình luận</Text>
//         <View style={[styles.container, { flexDirection: "row" }]}>
//           <TextInput
//             style={{
//               position: "relative",
//               height: "100%",
//               width: "70%",
//               // fontFamily:'OpenSans-Medium',
//               paddingLeft: 20,
//             }}
//             placeholder="Viết bình luận..."
//             value={commentValue}
//             onChangeText={(text) => setCommentValue(text)}
//           />
//           <TouchableOpacity style={styles.button} onPress={createCmt}>
//             <Text style={{ color: "blue" }}>Gửi</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       <ScrollView>
//         {cmts.map((comment) =>
//           comment.parentcomment === null ? (
//             <View key={comment.id}>
//               <View style={{ alignItems: "center", flexDirection: "row" }}>
//                 <Image
//                   source={{ uri: comment.user.avatar }}
//                   style={profileStyle.profileImgList}
//                   resizeMode="center"
//                 />
//                 <Text style={[styles.postTitle]}>{comment.user.username}</Text>
//               </View>

//               <Text style={{ fontSize: 15 }}>
//                 {"  "}
//                 {comment.value}
//               </Text>
//               {user.id == comment.user.id ? (
//                 <View style={{ flexDirection: "row" }}>
//                   <Text>{"    "}</Text>
//                   <TouchableOpacity
//                     onPress={() => updateCmt(comment.id)}
//                     style={{ margin: 10 }}>
//                     <Text style={{ fontSize: 12, color: "grey" }}>
//                       Edit {comment.id}
//                     </Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     onPress={() => deleteCmt(comment.id)}
//                     style={{ margin: 10 }}>
//                     <Text style={{ fontSize: 12, color: "grey" }}>Delete</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     onPress={toggleReplyInput}
//                     style={{ margin: 10 }}>
//                     <Text style={{ fontSize: 12, color: "grey" }}>
//                       {"    "}Reply
//                     </Text>
//                   </TouchableOpacity>
//                   {showInput && (
//                     <View style={[styles.container, { flexDirection: "row" }]}>
//                       <TextInput
//                         style={{
//                           position: "relative",
//                           height: "100%",
//                           width: "70%",
//                           // fontFamily:'OpenSans-Medium',
//                           paddingLeft: 20,
//                         }}
//                         placeholder="Viết bình luận..."
//                         value={commentValue}
//                         onChangeText={(text) => setCommentValue(text)}
//                       />
//                       <TouchableOpacity
//                         style={styles.button}
//                         onPress={createCmt}>
//                         <Text style={{ color: "blue" }}>Gửi</Text>
//                       </TouchableOpacity>
//                     </View>
//                   )}
//                 </View>
//               ) : (
//                 <TouchableOpacity
//                   onPress={() => repCmt(comment.id)}
//                   style={{ margin: 10 }}>
//                   <Text style={{ fontSize: 12, color: "grey" }}>
//                     {showInput && (
//                       <TextInput
//                         placeholder="Enter reply..."
//                         style={[styles.search, { width: "67%" }]}
//                         onChangeText={(text) => setReplyValue(text)}
//                         value={replyValue}
//                       />
//                     )}
//                     {"    "}Reply
//                   </Text>
//                 </TouchableOpacity>
//               )}

//               <Comment ParId={comment.id} PostId={postId} />
//             </View>
//           ) : null,
//         )}
//       </ScrollView>
//     </View>

//     // <View>
//     //   {/* Giao diện chưa được triển khai */}
//     //   <ScrollView>
//     //     <View style={[styles.containe, { flexDirection: "row" }]}>
//     //       <Text style={styles.title}>Bình luận</Text>
//     //       <TextInput
//     //         style={{
//     //           position: "relative",
//     //           height: "100%",
//     //           width: "50%",
//     //           // fontFamily:'OpenSans-Medium',
//     //           paddingLeft: 20,
//     //         }}
//     //         placeholder="Viết bình luận..."
//     //         value={commentValue}
//     //         onChangeText={(text) => setCommentValue(text)}
//     //       />
//     //       <TouchableOpacity style={styles.button} onPress={createCmt}>
//     //         <Text style={{ color: "blue" }}>Gửi</Text>
//     //       </TouchableOpacity>
//     //     </View>
//     //   </ScrollView>
//     // </View>
//   );
// };

// export default MainComment;
// ===================================================================

// import React, { useContext, useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   TextInput,
// } from "react-native";
// import { useRoute } from "@react-navigation/native";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { authApiToken, endpoints } from "../config/Apis";
// import Comment from "./Comment";
// import styles from "../constants/styles";
// import profileStyle from "../constants/profileStyle";
// import { MyUserContext } from "../../App";

// const MainComment = () => {
//   const route = useRoute();
//   const { postId } = route.params;
//   const [cmts, setCmt] = useState([]);
//   const [post, setPost] = useState([]);
//   const [user, dispatch] = useContext(MyUserContext);
//   const [commentValue, setCommentValue] = useState("");
//   const [imgHouse, setImgHouse] = useState([]);
//   const [showInput, setShowInput] = useState(false);
//   const [selectedCommentId, setSelectedCommentId] = useState(null);
//   const [replyingToCommentId, setReplyingToCommentId] = useState(null);
//   const [replyValue, setReplyValue] = useState("");
//   const [editingCommentId, setEditingCommentId] = useState(null);

//   const toggleReplyInput = (commentId) => {
//     if (commentId === replyingToCommentId) {
//       setReplyingToCommentId(null);
//     } else {
//       setReplyingToCommentId(commentId);
//     }
//     setShowInput(!showInput);
//   };

//   const getPost = async () => {
//     try {
//       const { data } = await axios.get(endpoints["post"](postId));
//       setPost(data);
//     } catch (error) {
//       console.error("Error fetching post:", error);
//       throw error;
//     }
//   };

//   const getCmt = async () => {
//     try {
//       const token = await AsyncStorage.getItem("token");
//       const { data } = await authApiToken(token).get(
//         endpoints["listCommentID"](postId),
//       );
//       setCmt(data);
//     } catch (error) {
//       console.error("Error fetching list cmt:", error);
//       throw error;
//     }
//   };

//   const deleteCmt = async (commnetId) => {
//     try {
//       const token = await AsyncStorage.getItem("token");
//       const response = await authApiToken(token).delete(
//         endpoints["commentAPI"](commnetId),
//       );
//       if (response.status == 204) {
//         console.log("xoa xong oi nhung ma t chua them ", commnetId);
//         getCmt();
//       } else {
//         console.log("xoa roi ", commnetId);
//       }
//     } catch (error) {
//       console.error("Error fetching comment :", error);
//       throw error;
//     }
//   };

//   const updateCmt = async (commnetId) => {
//     try {
//       const token = await AsyncStorage.getItem("token");
//       const data = new FormData();
//       data.append("value", "thay the ne");
//       const response = await authApiToken(token).patch(
//         endpoints["commentupdate"](commnetId),
//         data,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         },
//       );
//       if (response.status == 200) {
//         console.log("vua moi sua xong cmt ", commnetId);
//         getCmt();
//       } else {
//         console.log("loi roi ");
//       }
//     } catch (error) {
//       console.error("Error fetching comment update :", error);
//       throw error;
//     }
//   };

//   const repCmt = async () => {
//     try {
//       const token = await AsyncStorage.getItem("token");
//       const data = new FormData();
//       data.append("value", replyValue);
//       data.append("post", postId);
//       data.append("user", user.id);
//       data.append("parentcomment", replyingToCommentId);
//       const response = await authApiToken(token).post(
//         endpoints["commentcreate"],
//         data,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         },
//       );
//       if (response.status == 201) {
//         console.log("vua moi rep ", response.data);
//         setReplyValue("");
//         setReplyingToCommentId(null);
//         toggleReplyInput();
//         getCmt();
//       } else {
//         console.log("sai roi ");
//       }
//     } catch (error) {
//       console.error("Error fetching comment rep :", error);
//       throw error;
//     }
//   };

//   const createCmt = async () => {
//     console.log("VÀo được create cmt");
//     try {
//       const data = new FormData();
//       data.append("value", commentValue);
//       data.append("post", postId);
//       data.append("user", user.id);
//       const token = await AsyncStorage.getItem("token");
//       const response = await authApiToken(token).post(
//         endpoints["commentcreate"],
//         data,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         },
//       );
//       if (response.status == 201) {
//         console.log("vua moi ceate ", response.data);
//         setCommentValue("");
//         getCmt();
//       } else {
//         console.log("sai roi ");
//       }
//     } catch (error) {
//       console.error("Error fetching comment create :", error);
//       throw error;
//     }
//   };

//   useEffect(() => {
//     if (postId) {
//       getPost();
//       getCmt();
//     }
//   }, [postId]);

//   return (
//     <View
//       style={[
//         styles.containerListPosting,
//         { backgroundColor: Colors.background },
//       ]}>
//       <View>
//         <Text style={styles.title}>Bình luận</Text>
//         <View style={[styles.container, { flexDirection: "row" }]}>
//           <TextInput
//             style={{
//               position: "relative",
//               height: "100%",
//               width: "70%",
//               paddingLeft: 20,
//             }}
//             placeholder="Viết bình luận..."
//             value={commentValue}
//             onChangeText={(text) => setCommentValue(text)}
//           />
//           <TouchableOpacity style={styles.button} onPress={createCmt}>
//             <Text style={{ color: "blue" }}>Gửi</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       <ScrollView>
//         {cmts.map((comment) =>
//           comment.parentcomment === null ? (
//             <View key={comment.id}>
//               <TouchableOpacity onPress={() => toggleReplyInput(comment.id)}>
//                 <View style={{ alignItems: "center", flexDirection: "row" }}>
//                   <Image
//                     source={{ uri: comment.user.avatar }}
//                     style={profileStyle.profileImgList}
//                     resizeMode="center"
//                   />
//                   <Text style={[styles.postTitle]}>
//                     {comment.user.username}
//                   </Text>
//                 </View>
//                 <Text style={{ fontSize: 15 }}>
//                   {"  "}
//                   {comment.value}
//                 </Text>
//               </TouchableOpacity>
//               {user.id === comment.user.id ? (
//                 <View style={{ flexDirection: "row" }}>
//                   <TouchableOpacity
//                     onPress={() => updateCmt(comment.id)}
//                     style={{ margin: 10 }}>
//                     <Text style={{ fontSize: 12, color: "grey" }}>
//                       Edit {comment.id}
//                     </Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     onPress={() => deleteCmt(comment.id)}
//                     style={{ margin: 10 }}>
//                     <Text style={{ fontSize: 12, color: "grey" }}>Delete</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     onPress={() => toggleReplyInput(comment.id)}
//                     style={{ margin: 10 }}>
//                     <Text style={{ fontSize: 12, color: "grey" }}>
//                       {"    "}Reply
//                     </Text>
//                   </TouchableOpacity>
//                   {showInput && comment.id === replyingToCommentId && (
//                     <View style={[styles.container, { flexDirection: "row" }]}>
//                       <TextInput
//                         style={{
//                           position: "relative",
//                           height: "100%",
//                           width: "70%",
//                           paddingLeft: 20,
//                         }}
//                         placeholder="Viết bình luận..."
//                         value={replyValue}
//                         onChangeText={(text) => setReplyValue(text)}
//                       />
//                       <TouchableOpacity style={styles.button} onPress={repCmt}>
//                         <Text style={{ color: "blue" }}>Gửi</Text>
//                       </TouchableOpacity>
//                     </View>
//                   )}
//                 </View>
//               ) : (
//                 <TouchableOpacity
//                   onPress={() => repCmt(comment.id)}
//                   style={{ margin: 10 }}>
//                   <Text style={{ fontSize: 12, color: "grey" }}>
//                     {"    "}Reply
//                   </Text>
//                 </TouchableOpacity>
//               )}
//               <Comment ParId={comment.id} PostId={postId} />
//             </View>
//           ) : null,
//         )}
//       </ScrollView>
//     </View>
//   );
// };

// export default MainComment;
// ============================================================================

import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApiToken, endpoints } from "../config/Apis";
import Comment from "./Comment";
import styles from "../constants/styles";
import profileStyle from "../constants/profileStyle";
import { MyUserContext } from "../../App";

const MainComment = () => {
  const route = useRoute();
  const { postId } = route.params;
  const [cmts, setCmt] = useState([]);
  const [post, setPost] = useState([]);
  const [user, dispatch] = useContext(MyUserContext);
  const [commentValue, setCommentValue] = useState("");
  const [imgHouse, setImgHouse] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [replyingToCommentId, setReplyingToCommentId] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [replyValue, setReplyValue] = useState("");

  const toggleInput = (action, commentId) => {
    if (action === "reply") {
      if (commentId === replyingToCommentId) {
        setReplyingToCommentId(null);
      } else {
        setReplyingToCommentId(commentId);
      }
    } else if (action === "edit") {
      if (commentId === editingCommentId) {
        setEditingCommentId(null);
      } else {
        setEditingCommentId(commentId);
      }
    }
    setShowInput(!showInput);
  };
  const getPost = async () => {
    try {
      const { data } = await axios.get(endpoints["post"](postId));
      setPost(data);
    } catch (error) {
      console.error("Error fetching post:", error);
      throw error;
    }
  };
  const getCmt = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const { data } = await authApiToken(token).get(
        endpoints["listCommentID"](postId),
      );
      setCmt(data);
    } catch (error) {
      console.error("Error fetching list cmt:", error);
      throw error;
    }
  };

  const editCmt = async (commentId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const data = new FormData();
      data.append("value", commentValue);
      const response = await authApiToken(token).patch(
        endpoints["commentupdate"](commentId),
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (response.status == 200) {
        console.log("vua moi sua xong cmt ", commentId);
        setEditingCommentId(null);
        getCmt();
      } else {
        console.log("loi roi ");
      }
    } catch (error) {
      console.error("Error fetching comment update :", error);
      throw error;
    }
  };

  const repCmt = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const data = new FormData();
      data.append("value", replyValue);
      data.append("post", postId);
      data.append("user", user.id);
      data.append("parentcomment", replyingToCommentId);
      const response = await authApiToken(token).post(
        endpoints["commentcreate"],
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (response.status == 201) {
        console.log("vua moi rep ", response.data);
        setReplyValue("");
        setReplyingToCommentId(null);
        toggleInput("reply");
        getCmt();
      } else {
        console.log("sai roi ");
      }
    } catch (error) {
      console.error("Error fetching comment rep :", error);
      throw error;
    }
  };

  const createCmt = async () => {
    console.log("VÀo được create cmt");
    try {
      const data = new FormData();
      data.append("value", commentValue);
      data.append("post", postId);
      data.append("user", user.id);
      const token = await AsyncStorage.getItem("token");
      const response = await authApiToken(token).post(
        endpoints["commentcreate"],
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (response.status == 201) {
        console.log("vua moi ceate ", response.data);
        setCommentValue("");
        getCmt();
      } else {
        console.log("sai roi ");
      }
    } catch (error) {
      console.error("Error fetching comment create :", error);
      throw error;
    }
  };

  useEffect(() => {
    if (postId) {
      getPost();
      getCmt();
    }
  }, [postId]);

  return (
    <View
      style={[
        styles.containerListPosting,
        { backgroundColor: Colors.background },
      ]}>
      <View>
        <Text style={styles.title}>Bình luận</Text>
        <View style={[styles.container, { flexDirection: "row" }]}>
          <TextInput
            style={{
              position: "relative",
              height: "100%",
              width: "70%",
              paddingLeft: 20,
            }}
            placeholder="Viết bình luận..."
            value={commentValue}
            onChangeText={(text) => setCommentValue(text)}
          />
          <TouchableOpacity style={styles.button} onPress={createCmt}>
            <Text style={{ color: "blue" }}>Gửi</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        {cmts.map((comment) =>
          comment.parentcomment === null ? (
            <View key={comment.id}>
              <TouchableOpacity
                onPress={() => toggleInput("reply", comment.id)}>
                <View style={{ alignItems: "center", flexDirection: "row" }}>
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
                    onPress={() => toggleInput("edit", comment.id)}
                    style={{ margin: 10 }}>
                    <Text style={{ fontSize: 12, color: "grey" }}>
                      Edit {comment.id}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => deleteCmt(comment.id)}
                    style={{ margin: 10 }}>
                    <Text style={{ fontSize: 12, color: "grey" }}>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => toggleInput("reply", comment.id)}
                    style={{ margin: 10 }}>
                    <Text style={{ fontSize: 12, color: "grey" }}>
                      {"    "}Reply
                    </Text>
                  </TouchableOpacity>
                  {showInput && comment.id === replyingToCommentId && (
                    <View style={[styles.container, { flexDirection: "row" }]}>
                      <TextInput
                        style={{
                          position: "relative",
                          height: "100%",
                          width: "70%",
                          paddingLeft: 20,
                        }}
                        placeholder="Viết bình luận..."
                        value={replyValue}
                        onChangeText={(text) => setReplyValue(text)}
                      />
                      <TouchableOpacity style={styles.button} onPress={repCmt}>
                        <Text style={{ color: "blue" }}>Gửi</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  {showInput && comment.id === editingCommentId && (
                    <View style={[styles.container, { flexDirection: "row" }]}>
                      <TextInput
                        style={{
                          position: "relative",
                          height: "100%",
                          width: "70%",
                          paddingLeft: 20,
                        }}
                        placeholder="Chỉnh sửa bình luận..."
                        value={commentValue}
                        onChangeText={(text) => setCommentValue(text)}
                      />
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => editCmt(comment.id)}>
                        <Text style={{ color: "blue" }}>Lưu</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => toggleInput("reply", comment.id)}
                  style={{ margin: 10 }}>
                  <Text style={{ fontSize: 12, color: "grey" }}>
                    {"    "}Reply
                  </Text>
                </TouchableOpacity>
              )}
              <Comment ParId={comment.id} PostId={postId} />
            </View>
          ) : null,
        )}
      </ScrollView>
    </View>
  );
};

export default MainComment;
