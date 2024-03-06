import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApiToken, endpoints } from "../config/Apis";
import { MyUserContext } from "../../App";
import styles from "../constants/styles";

const InputComment = ({
  postId,
  action,
  getCmt,
  IDCE,
  CommentEdit,
  placeholder,
}) => {
  const [user, dispatch] = useContext(MyUserContext);
  const [commentValue, setCommentValue] = useState("");

  useEffect(() => {
    if (action == 2) {
      setCommentValue(CommentEdit);
    }
    if (action == 3) {
      setCommentValue("");
    }
  }, [action, CommentEdit]);

  const editCmt = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const data = new FormData();
      data.append("value", commentValue);
      const response = await authApiToken(token).patch(
        endpoints["commentupdate"](IDCE),
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (response.status == 200) {
        console.log("vua moi sua xong cmt ", IDCE);
        setCommentValue("");
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
      data.append("parentcomment", IDCE);
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
        setCommentValue("");
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

  const actionComment = async () => {
    try {
      if (action == 1) {
        console.log("Bình luận");
        createCmt();
      }
      if (action == 2) {
        console.log("Edit");
        editCmt();
      }
      if (action == 3) {
        console.log("Reply");
        repCmt();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text style={styles.title}>Bình luận</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.background,
        }}>
        <TextInput
          style={{
            // position: "absolute",
            height: "100%",
            width: "70%",
            paddingLeft: 20,
          }}
          placeholder={placeholder}
          value={commentValue}
          onChangeText={(text) => setCommentValue(text)}
        />
        {commentValue.trim() !== "" ? (
          <TouchableOpacity style={styles.button} onPress={actionComment}>
            <Icon name="send" size={20} color="#000" />
          </TouchableOpacity>
        ) : (
          ""
        )}
        {/* <TouchableOpacity style={styles.button} onPress={actionComment}>
            <Icon name="send" size={20} color="#000" />
          </TouchableOpacity>  */}
      </View>
    </View>
    // <View><Text>TTRRRRRRRRRRRRRRRRRRRR</Text></View>
  );
};
export default InputComment;
