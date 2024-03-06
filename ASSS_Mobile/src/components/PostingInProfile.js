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

const PostingInProfile = ({ id }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      // Giả lập độ trễ 2 giây
      setTimeout(async () => {
        const { data } = await axios.get(endpoints["listPostById"](id));
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
    <ScrollView style={[styles.containerListPostingInProfile]}>
      {isLoading ? (
        <ActivityIndicator size="small" color="#000" />
      ) : (
        posts.map((post) => (
          <PostingInList
            key={post?.id}
            postId={post?.id}
            houseId={post?.house?.id}
            userId={post?.user?.id}
            discountId={post?.discount?.id}
            active={post?.active}
            count={10}
          />
        ))
      )}
    </ScrollView>
  );
};

export default PostingInProfile;
