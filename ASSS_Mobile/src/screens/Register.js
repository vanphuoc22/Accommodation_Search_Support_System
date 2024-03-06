import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import styles from "../constants/styles";
import { authApiToken, endpoints } from "../config/Apis";
import profileStyle from "../constants/profileStyle";
import { MyUserContext } from "../../App";

const MainComment = () => {
  const [actionType, setActionType] = useState("create");
  const [commentValue, setCommentValue] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [replyingToCommentId, setReplyingToCommentId] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [editingCommentValue, setEditingCommentValue] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);

  const [cmts, setCmt] = useState([]);
  const [post, setPost] = useState([]);
  // const [user, dispatch] = useState({}); // Thay đổi từ useContext(MyUserContext) thành useState
  const [user, dispatch] = useContext(MyUserContext);

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

  const createCmt = async () => {
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
      if (response.status === 201) {
        setCommentValue(""); // Đặt giá trị của TextInput về chuỗi rỗng
        getCmt();
      } else {
        console.log("sai roi ");
      }
    } catch (error) {
      console.error("Error fetching comment create :", error);
      throw error;
    }
  };

  const editCmt = async (commentId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const data = new FormData();
      data.append("value", editingCommentValue);
      const response = await authApiToken(token).patch(
        endpoints["commentupdate"](commentId),
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (response.status === 200) {
        setEditingCommentValue(""); // Reset giá trị của TextInput
        setEditingCommentId(null); // Reset comment đang chỉnh sửa
        setShowInput(false); // Ẩn TextInput sau khi gửi edit thành công
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
      data.append("value", commentValue);
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
      if (response.status === 201) {
        setCommentValue(""); // Reset giá trị của TextInput
        setReplyingToCommentId(null); // Reset comment đang trả lời
        setShowInput(false); // Ẩn TextInput sau khi gửi reply thành công
        getCmt();
      } else {
        console.log("sai roi ");
      }
    } catch (error) {
      console.error("Error fetching comment rep :", error);
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
        console.log("xoa xong oi nhung ma t chua them ", commentId);
        getCmt();
      } else {
        console.log("xoa roi ", commentId);
      }
    } catch (error) {
      console.error("Error fetching comment :", error);
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
            placeholder={
              actionType === "edit"
                ? "Chỉnh sửa bình luận..."
                : "Viết bình luận..."
            }
            value={
              actionType === "edit" ? editingComment?.value || "" : commentValue
            }
            onChangeText={(text) => {
              if (actionType === "edit") {
                setEditingCommentValue(text);
              } else {
                setCommentValue(text);
              }
            }}
          />
          <TouchableOpacity style={styles.button} onPress={performAction}>
            <Text style={{ color: "blue" }}>
              {actionType === "edit" ? "Lưu" : "Gửi"}
            </Text>
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
                  {showInput && editingCommentId === comment.id && (
                    <View style={[styles.container, { flexDirection: "row" }]}>
                      <TextInput
                        style={{
                          position: "relative",
                          height: "100%",
                          width: "70%",
                          paddingLeft: 20,
                        }}
                        placeholder="Chỉnh sửa bình luận..."
                        value={editingComment?.value || ""}
                        onChangeText={(text) => setEditingCommentValue(text)}
                      />
                      <TouchableOpacity
                        style={styles.button}
                        onPress={performAction}>
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
              {/* ... (các phần khác của Comment) */}
            </View>
          ) : null,
        )}
      </ScrollView>
    </View>
  );
};

export default MainComment;
