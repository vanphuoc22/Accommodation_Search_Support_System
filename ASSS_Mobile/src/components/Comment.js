// import React, { useContext, useEffect, useState } from "react";
// import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
// import { authApiToken, endpoints } from "../config/Apis";
// import axios from "axios";
// import styles from "../constants/styles";
// import { MyUserContext } from "../../App";
// import profileStyle from "../constants/profileStyle";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const Comment = ({ ParId, PostId }) => {
//   const [commentReplies, setCommentReplies] = useState([]);
//   const [user, dispatch] = useContext(MyUserContext);

//   const getCommentReplies = async () => {
//     try {
//       const token = await AsyncStorage.getItem("token");
//       const { data } = await authApiToken(token).get(
//         endpoints["getCommentRep"](ParId),
//       );
//       setCommentReplies(data);
//     } catch (error) {
//       console.error("Error:", error);
//       throw error;
//     }
//   };

//   const deleteCmt = async (commnetId) => {
//     // console.log("----------------------------them cai cho no xat nhan")
//     try {
//       const token = await AsyncStorage.getItem("token");
//       const response = await authApiToken(token).delete(
//         endpoints["commentAPI"](commnetId),
//       );
//       if (response.status == 204) {
//         console.log("xoa xong oi nhung ma t chua them ", commnetId);
//         getCommentReplies();
//       } else {
//         console.log("loi roi ");
//       }
//     } catch (error) {
//       console.error("Error fetching comment delete :", error);
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
//         getCommentReplies();
//       } else {
//         console.log("loi roi ");
//       }
//     } catch (error) {
//       console.error("Error fetching comment update :", error);
//       throw error;
//     }
//   };

//   const repCmt = async (commnetId) => {
//     try {
//       const data = new FormData();
//       data.append("value", "comment ne !!");
//       data.append("post", PostId);
//       data.append("user", user.id);
//       data.append("parentcomment", commnetId);
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
//         console.log("vua moi rep ", response.data);
//         getCommentReplies();
//       } else {
//         console.log("sai roi ");
//       }
//     } catch (error) {
//       console.error("Error fetching comment rep :", error);
//       throw error;
//     }
//   };

//   useEffect(() => {
//     if (ParId) {
//       getCommentReplies();
//     }
//   }, [ParId]);

//   return (
//     <View>
//       {commentReplies.map((reply) =>
//         reply != null ? (
//           <View style={{ margin: 16 }} key={reply.id}>
//             {/* <Text>
//               {"  "}
//               {reply.user.username}: {reply.value}
//             </Text> */}
//             <View style={{ alignItems: "center", flexDirection: "row" }}>
//               <Image
//                 source={{ uri: reply.user.avatar }}
//                 style={profileStyle.profileImgList}
//                 resizeMode="center"
//               />
//               <Text style={[styles.postTitle]}>
//                 {"  "}
//                 {reply.user.username}
//               </Text>
//             </View>

//             <Text style={{ fontSize: 15 }}>
//               {"  "}
//               {reply.value}
//             </Text>
//             {user.id == reply.user.id ? (
//               <View key={reply.id} style={{ flexDirection: "row" }}>
//                 <TouchableOpacity
//                   onPress={() => updateCmt(reply.id)}
//                   style={{ margin: 10 }}>
//                   <Text style={{ fontSize: 12, color: "grey" }}>
//                     Edit {reply.id}
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={() => deleteCmt(reply.id)}
//                   style={{ margin: 10 }}>
//                   <Text style={{ fontSize: 12, color: "grey" }}>Delete</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={() => repCmt(reply.id)}
//                   style={{ margin: 10 }}>
//                   <Text style={{ fontSize: 12, color: "grey" }}>
//                     Reply {reply.id}
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             ) : (
//               <TouchableOpacity
//                 onPress={() => repCmt(reply.id)}
//                 style={{ margin: 10 }}>
//                 <Text style={{ fontSize: 12, color: "grey" }}>
//                   Reply {reply.id}
//                 </Text>
//               </TouchableOpacity>
//             )}

//             <Comment ParId={reply.id} />
//           </View>
//         ) : null,
//       )}
//     </View>
//   );
// };

// export default Comment;
// ==============================
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { authApiToken, endpoints } from "../config/Apis";
import axios from "axios";
import styles from "../constants/styles";
import { MyUserContext } from "../../App";
import profileStyle from "../constants/profileStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Comment = ({
  ParId,
  PostId,
  getCMT,
  setIDCE,
  setCommentEdit,
  setAction,
  setPlaceholder,
}) => {
  const [commentReplies, setCommentReplies] = useState([]);
  const [user, dispatch] = useContext(MyUserContext);
  const [replyText, setReplyText] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCommentId, setEditedCommentId] = useState(null);

  const getCommentReplies = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const { data } = await authApiToken(token).get(
        endpoints["getCommentRep"](ParId),
      );
      setCommentReplies(data);
    } catch (error) {
      console.error("Error:", error);
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
        // cmt = document.getEl(commentId)
        // cmt.style.display = none
        getCommentReplies();
      } else {
        console.log("Error deleting comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (ParId) {
      getCommentReplies();
    }
  }, [ParId]);

  return (
    <View>
      {commentReplies.map((reply) =>
        reply != null ? (
          <View style={{ margin: 16 }} key={reply.id}>
            <View style={{ alignItems: "center", flexDirection: "row" }}>
              <Image
                source={{ uri: reply.user.avatar }}
                style={profileStyle.profileImgList}
                resizeMode="center"
              />
              <Text style={[styles.postTitle]}>
                {"  "}
                {reply.user.username}
              </Text>
            </View>

            {isEditing && editedCommentId === reply.id ? (
              <TextInput
                value={replyText}
                onChangeText={(text) => setReplyText(text)}
                placeholder="Edit your comment..."
                multiline
                style={{ borderColor: "gray", borderWidth: 1, padding: 8 }}
              />
            ) : (
              <Text style={{ fontSize: 15 }}>
                {"  "}
                {reply.value}
              </Text>
            )}
            {user.id === reply.user.id ? (
              <View key={reply.id} style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => {
                    setAction(2),
                      setIDCE(reply.id),
                      setCommentEdit(reply.value);
                  }}
                  style={{ margin: 10 }}>
                  <Text style={{ fontSize: 12, color: "grey" }}>
                    Edit {reply.id}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => deleteCmt(reply.id)}
                  style={{ margin: 10 }}>
                  <Text style={{ fontSize: 12, color: "grey" }}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setAction(3),
                      setIDCE(reply.id),
                      setPlaceholder("Trả lời " + `${reply.user.username}`);
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
                    setIDCE(reply.id),
                    setPlaceholder("Trả lời " + `${reply.user.username}`);
                }}
                style={{ margin: 10 }}>
                <Text style={{ fontSize: 12, color: "grey" }}>
                  {"    "}Reply
                </Text>
              </TouchableOpacity>
            )}

            <Comment
              ParId={reply.id}
              PostId={PostId}
              getCMT={getCMT}
              setIDCE={setIDCE}
              setAction={setAction}
              setCommentEdit={setCommentEdit}
            />
          </View>
        ) : null,
      )}
    </View>
  );
};

export default Comment;
