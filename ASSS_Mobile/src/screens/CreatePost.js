import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  StyleSheet,
  Text,
  ScrollView,
  View,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Button,
  SafeAreaView,
  Touchable,
  Picker,
  Platform,
  ActivityIndicator,
} from "react-native";
// import Buttons from '../components/Buttons';
import { Colors } from "../constants";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../constants/styles";
import { useNavigation } from "@react-navigation/native";
import ListPosting from "../components/ListPosting";
import Buttons from "../components/Buttons";
import { MyUserContext } from "../../App";
import { authApiToken, endpoints } from "../config/Apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UpdateImg from "../components/UpdateImg";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import Toast from "react-native-toast-message";

const CreatePost = ({ navigation }) => {
  const [user, dispatch] = useContext(MyUserContext);
  const [address, setAddress] = useState();
  const [acreage, setAcreage] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [topic, setTopic] = useState();
  const [describe, setDescribe] = useState();
  const [postingdate, setPostingdate] = useState(new Date());
  const [expirationdate, setExpirationdate] = useState(new Date());
  const [discount, setDiscount] = useState();
  const [userCreate, setUserCreate] = useState();
  const [posting, setPosting] = useState();
  const [beginShow, setBeginShow] = useState(false);
  const [endShow, setEndShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const [images, setImages] = useState([]);

  const currentDay = new Date();

  const getCurrentUser = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      let res = await authApiToken(token).get(endpoints["current_user"]);
      setUserCreate(res.data);
      console.log("Đối tượng chuẩn bị đăng bài: ", res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCurrentUser();
    // getDiscount();
  }, []);

  const createPost = async () => {
    if (
      !address ||
      !acreage ||
      !price ||
      !quantity ||
      !topic ||
      !describe ||
      !postingdate ||
      !expirationdate ||
      !images.length
    ) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill in all required fields.",
      });
      return;
    }

    if (!validateDates()) {
      Toast.show({
        type: "error",
        text1: "Ngày bắt đầu phải trước ngày kết thúc",
      });
      return;
    }
    setLoading(true); // Bắt đầu loading
    const token = await AsyncStorage.getItem("token");
    let formData = new FormData();
    formData.append("address", address);
    formData.append("acreage", acreage);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("topic", topic);
    formData.append("describe", describe);
    formData.append("postingdate", postingdate.toISOString().slice(0, 10));
    formData.append(
      "expirationdate",
      expirationdate.toISOString().slice(0, 10),
    );
    formData.append("discount", 1);
    formData.append("postingprice", 10);
    console.log(address);
    console.log(acreage);
    console.log(price);
    console.log(topic);
    console.log(describe);
    console.log(postingdate);
    console.log(expirationdate);
    console.log(quantity);

    // formData.append("images", { uri: image, name: filename, type });
    for (let i = 0; i < images.length; i++) {
      const imageUri = images[i].uri;
      console.log(imageUri);

      const filename = imageUri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;
      formData.append("images", { uri: imageUri, name: filename, type });
    }
    console.log("aaa", images);
    // console.log(filename);

    let myPost = await authApiToken(token).post(
      endpoints["createPost"],
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    setImages([]);
    console.log("Bài post", myPost.data, myPost.status);
    setPosting(myPost.data);
    console.log(myPost.status);
    try {
      if (myPost.status == 200) {
        // createNotice(myPost.data.id);
        console.log("============================== thanh cong");
        setAcreage("");
        setAddress("");
        setPrice("");
        setQuantity("");
        setTopic("");
        setDescribe("");
        navPaypal(myPost.data);
      }
      setLoading(false); // Hoàn thành loading
    } catch (error) {
      console.error("Error creating post:", error);
      setLoading(false); // Kết thúc loading nếu có lỗi
    }
  };
  const validateDates = () => {
    return postingdate < expirationdate;
  };

  const handlePostingDateChange = (event, date) => {
    setBeginShow(false);
    setPostingdate(date || postingdate);
  };

  const handleExpirationDateChange = (event, date) => {
    setEndShow(false);
    setExpirationdate(date || expirationdate);
  };

  const openImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      console.log("Permission not granted");
      return;
    }

    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      allowsMultipleSelection: true,
      // aspect: [4, 3],
      quality: 1,
    };

    let result;
    if (Platform.OS !== "web") {
      result = await ImagePicker.launchImageLibraryAsync(options);
    } else {
      result = await ImagePicker.launchImageLibraryAsync();
    }

    if (!result.canceled) {
      const localUri = result.assets;
      console.log(localUri);
      console.log("--------------------------");
      // setImage(localUri);
      setImages(localUri);
    } else {
      console.log("User canceled image picker");
    }
  };

  const isPastDate = (date) => {
    const currentDate = moment().format("DD/MM/YYYY");
    return moment(date, "DD/MM/YYYY").isBefore(currentDate);
  };

  const handlePostingDate = (event, date) => {
    setBeginShow(false);
    setPostingdate(date || postingdate);
    console.log(postingdate);
  };

  const handleExprirationDate = (event, date) => {
    setEndShow(false);
    setExpirationdate(date || expirationdate);
  };

  const checkVar = async () => {
    console.log(images);
  };

  const removeImg = (index) => {
    setImages((prevImages) => {
      const updateImages = [...prevImages];
      updateImages.splice(index, 1);
      return updateImages;
    });
  };
  const navPaypal = async (mypost) => {
    const postDetail1 = {
      id: mypost.id,
      topic: mypost?.topic,
      describe: mypost?.describe,
      postingdate: mypost?.postingdate,
      expirationdate: mypost?.expirationdate,
    };
    const houseDetail1 = {
      id: mypost?.house.id,
      address: mypost?.house.address,
      acreage: mypost?.house.acreage,
      price: mypost?.house.price,
      quantity: mypost?.house.quantity,
    };
    const DetailsOwner1 = {
      id: mypost?.user.id,
      username: mypost?.user.username,
      avatar: mypost?.user.avatar,
      phonenumber: mypost?.user.phonenumber,
    };
    console.log("vào nav được r", mypost.id);
    const token = await AsyncStorage.getItem("token");
    const date = new FormData();
    date.append("post_id", mypost.id);
    const responsa = await authApiToken(token).post(
      endpoints["createPaymentUpPost"],
      date,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    console.log("payment_id", responsa.data.id);
    const paymentID = responsa.data.id;
    const payment = new FormData();
    payment.append("payment_id", responsa.data.id);
    payment.append("amount", 10);
    const response = await axios.post(endpoints["createPaymentPost"], payment, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("paymentID", paymentID);
    console.log("gọi được hàm r");
    navigation.navigate("PayPalForPost", {
      amount: 10,
      id: mypost.id,
      postDetail1,
      DetailsOwner1,
      houseDetail1,
      paymentID: paymentID,
    });
  };
  return (
    <ScrollView style={styles.bgColor}>
      <StatusBar
        barStyle="light-content"
        hidden={true}
        backgroundColor="#465bd8"
      />
      <View style={{ flexDirection: "row", paddingTop: 10, paddingBottom: 0 }}>
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
      {/* <Button title="Check" onPress={() => checkVar()} /> */}

      <View style={{ marginHorizontal: 10 }}>
        <View style={styles.inputSignUp}>
          <Icon name="book" size={22} color="#818181" />
          <TextInput
            style={styles.input}
            value={topic}
            onChangeText={setTopic}
            placeholder="Topic"
            placeholderTextColor="#818181"
          />
        </View>
        <View style={styles.inputSignUp}>
          <Icon name="info" size={22} color="#818181" />
          <TextInput
            style={styles.input}
            value={describe}
            onChangeText={setDescribe}
            placeholder="Describe"
            placeholderTextColor="#818181"
          />
        </View>
        {/* ==========================================date area======================================== */}

        <TouchableOpacity onPress={() => setBeginShow(true)}>
          <View style={styles.inputCreatePost}>
            <Icon name="calendar" size={22} color="#818181" />
            <Text style={{ color: "#818181", paddingLeft: 10 }}>
              Start date:
            </Text>
            <Text style={{ paddingLeft: 20 }}>{`${String(
              postingdate.getDate(),
            ).padStart(2, "0")}/${String(postingdate.getMonth() + 1).padStart(
              2,
              "0",
            )}/${postingdate.getFullYear()}`}</Text>
            {beginShow ? (
              <DateTimePicker
                value={postingdate}
                mode="date"
                placeholder="Select date"
                minimumDate={currentDay}
                onChange={handlePostingDate}
                disabled={isPastDate}
              />
            ) : null}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setEndShow(true)}>
          <View style={styles.inputCreatePost}>
            <Icon name="calendar" size={22} color="#818181" />
            <Text style={{ color: "#818181", paddingLeft: 10 }}>End date:</Text>
            <Text style={{ paddingLeft: 20 }}>
              {`${String(expirationdate.getDate()).padStart(2, "0")}/${String(
                expirationdate.getMonth() + 1,
              ).padStart(2, "0")}/${expirationdate.getFullYear()}`}
            </Text>
            {endShow ? (
              <DateTimePicker
                value={expirationdate}
                mode="date"
                placeholder="Select date"
                onChange={handleExprirationDate}
                minimumDate={currentDay}
                disabled={isPastDate}
              />
            ) : null}
          </View>
        </TouchableOpacity>

        {/* ======================================================================= */}

        {/* ///////////////////////////////////////////////////////////////////////////// */}

        <View style={styles.inputSignUp}>
          <Icon name="rocket" size={22} color="#818181" />
          <TextInput
            style={styles.input}
            value={quantity}
            onChangeText={setQuantity}
            placeholder="Quantity"
            placeholderTextColor="#818181"
          />
        </View>

        <View style={styles.inputSignUp}>
          <Icon name="map-marker" size={22} color="#818181" />
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Address"
            placeholderTextColor="#818181"
          />
        </View>
        <View style={styles.inputSignUp}>
          <Icon name="circle" size={22} color="#818181" />
          <TextInput
            style={styles.input}
            value={acreage}
            onChangeText={setAcreage}
            placeholder="Acreage"
            placeholderTextColor="#818181"
          />
        </View>
        <View style={styles.inputSignUp}>
          <Icon name="money" size={22} color="#818181" />
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="Price"
            placeholderTextColor="#818181"
          />
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
            {images.map((i, index) => (
              <View>
                <Image
                  key={index}
                  source={{ uri: i.uri }}
                  style={{ width: 120, height: 120, marginRight: 5 }}
                />
                <TouchableOpacity
                  onPress={() => removeImg(index)}
                  style={{
                    backgroundColor: "rgb(58, 59, 60)",
                    height: 25,
                    width: 25,
                    borderRadius: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 8,
                    position: "absolute",
                    top: 3,
                    right: 10,
                  }}>
                  <Icon name="trash" size={22} color="#818181" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
        <TouchableOpacity onPress={openImagePicker}>
          <View style={styles.inputSignUp}>
            <Icon name="camera" size={22} color="#818181" />
            <Text style={{ paddingLeft: 10 }}>Upload image</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ marginHorizontal: 10, marginVertical: 30 }}>
        {/* <Buttons btn_text={"Create Post"} on_press={createPost} /> */}
        {loading ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          <Buttons btn_text={"Create Post"} on_press={createPost} />
        )}
      </View>
    </ScrollView>
  );
};

export default CreatePost;
