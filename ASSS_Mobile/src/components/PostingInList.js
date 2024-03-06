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
} from "react-native";
import { endpoints } from "../config/Apis";
import profileStyle from "../constants/profileStyle";
import styles from "../constants/styles";
import { MyUserContext } from "../../App";
import Icon from "react-native-vector-icons/FontAwesome";
import LikeStatus from "./LikeStatus";
import { Colors } from "../constants";
import ImgOfHouse from "./ImgOfHouse";
import { useNavigation } from "@react-navigation/native";

export const PostingInList = ({
  postId,
  houseId,
  userId,
  discountId,
  count,
  active,
}) => {
  const [post, setPost] = useState();
  const [house, setHouse] = useState();
  const [user, setUser] = useState();
  const [discount, setDiscount] = useState();
  const [imgHouse, setImgHouse] = useState([]);
  const navigation = useNavigation();
  // console.log("Cái này ra bao nhiêu vậy trời ", active);
  const getPost = async (postId) => {
    try {
      const { data } = await axios.get(endpoints["post"](postId));
      //   console.log(data);
      setPost(data);
    } catch (error) {
      console.error("Error fetching post:", error);
      throw error;
    }
  };
  const getHouse = async (houseId) => {
    try {
      const { data } = await axios.get(endpoints["getHouseByID"](houseId));
      //   console.log(data);
      setHouse(data);
    } catch (error) {
      console.error("Error fetching home image:", error);
      throw error;
    }
  };
  const getUser = async (userId) => {
    try {
      const { data } = await axios.get(endpoints["getUserByID"](userId));
      // console.log("wwwwwwwwwwwwwwwwwwwwww", data);
      setUser(data);
    } catch (error) {
      console.error("Error fetching User:", error);
      throw error;
    }
  };
  const getDiscount = async (discountId) => {
    try {
      const { data } = await axios.get(
        endpoints["getDiscountByID"](discountId),
      );
      //   console.log(data);
      setDiscount(data);
    } catch (error) {
      console.error("Error fetching Discount:", error);
      throw error;
    }
  };
  const getHomeImg = async (houseId) => {
    const { data } = await axios.get(endpoints["ImgOfHouse"](houseId));
    // console.log("------Hình nhà-------", data);
    setImgHouse(data);
  };
  const BlinkingText = ({ text, interval }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
      const intervalId = setInterval(() => {
        setIsVisible((prevVisible) => !prevVisible);
      }, interval);

      return () => {
        clearInterval(intervalId);
      };
    }, [interval]);

    return (
      <Text style={[styles.blinkingText, isVisible && styles.visibleText]}>
        {text}
      </Text>
    );
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

  useEffect(() => {
    getPost(postId);

    getHouse(houseId);
    getUser(userId);
    getDiscount(discountId);
    getHomeImg(houseId);
  }, [postId, houseId, userId, discountId]);
  const postDetail = {
    id: post?.id,
    topic: post?.topic,
    describe: post?.describe,
    postingdate: post?.postingdate,
    expirationdate: post?.expirationdate,
  };
  const houseDetail = {
    id: house?.id,
    address: house?.address,
    acreage: house?.acreage,
    price: house?.price,
    quantity: house?.quantity,
  };
  const DetailsOwner = {
    id: user?.id,
    username: user?.username,
    avatar: user?.avatar,
    phonenumber: user?.phonenumber,
  };
  return (
    <View>
      <TouchableOpacity
        style={styles.postItem}
        onPress={() => {
          navigation.navigate("PostDetail", {
            postId: post?.id,
            houseId: house?.id,
            postDetail,
            houseDetail,
            DetailsOwner,
            count,
          });
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("UserProfile", {
              id: user?.id,
            });
          }}>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Image
              source={{ uri: user?.avatar }}
              style={profileStyle.profileImgList}
            />
            <Text style={[styles.postTitle]}>{user?.username}</Text>
          </View>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            onPress={() => handleOpenMap(house.address)}
            style={styles.postDescription}>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.postDescription, { fontWeight: "bold" }]}>
                Address:
              </Text>
              <Text style={styles.postDescription}> {house?.address}</Text>
            </View>
          </TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.postDescription, { fontWeight: "bold" }]}>
              Hot:
            </Text>
            <Text style={styles.postDescription}> {post?.topic}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.postDescription, { fontWeight: "bold" }]}>
              Price:
            </Text>
            <Text style={styles.postDescription}> {house?.price}</Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.postDescription, { fontWeight: "bold" }]}>
              ID của cái nhà này nè:
            </Text>
            <Text style={styles.postDescription}> {house?.id}</Text>
          </View>

          {/* <ImgOfHouse houseID={house?.id} /> */}

          {/* <Text style={styles.postDescription}>
            {post?.active === 1 ? (
              <BlinkingText text="VẪN CÒN NHÉ" interval={500} />
            ) : (
              <Text style={styles.inactiveText}>HẾT RỒI Ạ!!</Text>
            )}
          </Text> */}
          <Text style={styles.postDescription}>
            {active === true ? (
              <BlinkingText text="VẪN CÒN NHÉ" interval={500} />
            ) : (
              <Text style={styles.inactiveText}>HẾT RỒI Ạ!!</Text>
            )}
          </Text>
          {post?.discount !== 0 ? (
            <Text style={styles.postDescription}>{discount?.name} </Text>
          ) : null}

          <View style={styles.imagePostContainer}>
            {imgHouse.map((img, index) => (
              <Image
                key={index}
                source={{ uri: img.imageURL }}
                style={styles.imagePost}
              />
            ))}
          </View>
        </View>

        {/* Danh sách bình luận */}
        <View style={styles.separator} />
        <View
          style={[
            styles.footer,
            { flexDirection: "row", justifyContent: "space-between" },
          ]}>
          <LikeStatus post_id={post?.id} count={count} />
          <TouchableOpacity
            style={styles.action}
            onPress={() => {
              navigation.navigate("PostDetail", {
                postId: post?.id,
                houseId: house?.id,
                postDetail,
                houseDetail,
                DetailsOwner,
                count,
              });
            }}>
            <Icon name="comment-o" size={20} color="#000" />
            <Text style={styles.count}>Comment</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PostingInList;
