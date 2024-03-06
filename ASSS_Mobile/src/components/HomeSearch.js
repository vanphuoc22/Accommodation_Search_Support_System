// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   FlatList,
//   SafeAreaView,
//   Image,
//   TouchableOpacity,
//   Linking,
// } from "react-native";

// import React, { useEffect, useState } from "react";
// import styles from "../constants/styles";
// import { Colors } from "../constants";
// import { FontAwesome } from "@expo/vector-icons";
// import style from "../constants/styles";
// import { Picker } from "@react-native-picker/picker";
// import { authApiToken, endpoints } from "../config/Apis";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import profileStyle from "../constants/profileStyle";

// function HomeSearch() {
//   // const [searchInput, setSearchInput] = useState("");
//   // const [searchResults, setSearchResults] = useState([]);

//   const [loading, setLoading] = useState(false);
//   const [output, setOutput] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [searchType, setSearchType] = useState("user__username");

//   const handleOpenMap = (address) => {
//     const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
//       address,
//     )}`;

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
//   const handleSearch = async () => {
//     try {
//       const token = await AsyncStorage.getItem("token");
//       setLoading(true);
//       let e = endpoints["search"];
//       let params = {};

//       if (searchValue) {
//         params[
//           `search${searchType.charAt(0).toUpperCase() + searchType.slice(1)}`
//         ] = searchValue;
//       }

//       let url =
//         e +
//         "?" +
//         Object.entries(params)
//           .map(([key, value]) => `${searchType}=${searchValue}`)
//           .join("&");
//       console.log(url);

//       let res = await authApiToken(token).get(url);
//       //let data = await res.json();

//       // setOutput(data.content);
//       setOutput(res.data);
//       // console.log("Ngộ ha tụi bây", res, res.status);
//       setLoading(false);
//       // console.log(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     handleSearch();
//   }, [searchValue, searchType]);

//   return (
//     <SafeAreaView style={{ backgroundColor: Colors.background }}>
//       <TextInput
//         placeholder="Search value"
//         value={searchValue}
//         onChangeText={setSearchValue}
//         style={[styles.search]}
//       />
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "flex-end",
//           marginBottom: 20,
//         }}>
//         <Text>Vui lòng chọn tìm kiếm theo </Text>
//         <Picker
//           selectedValue={searchType}
//           onValueChange={(itemValue) => setSearchType(itemValue)}
//           style={{
//             backgroundColor: Colors.greenPlus,
//             color: "red",
//             width: 70,
//             borderRadius: 30,
//           }}>
//           <Picker.Item
//             style={{ color: "black" }}
//             label="House Address"
//             value="house__address"
//             placeholder="House"
//           />
//           <Picker.Item
//             style={{ color: "black" }}
//             label="Username"
//             value="user__username"
//             placeholder="Username"
//           />
//           <Picker.Item
//             style={{ color: "black" }}
//             label="Discount Name"
//             value="discount__name"
//             placeholder="Discount"
//           />
//         </Picker>
//       </View>
//       <Button title="Search" onPress={handleSearch} />

//       {loading ? (
//         <Text>Loading...</Text>
//       ) : (
//         <FlatList
//           data={output}
//           renderItem={({ item }) => (
//             <View style={styles.containerListPosting}>
//               <TouchableOpacity style={styles.postItem}>
//                 <View style={{ alignItems: "center", flexDirection: "row" }}>
//                   <Image
//                     source={{ uri: item.user.avatar }}
//                     style={profileStyle.profileImgList}
//                   />
//                   <Text style={[styles.postTitle, { marginLeft: 20 }]}>
//                     {item.user.username}
//                   </Text>
//                 </View>
//                 <View>
//                   <TouchableOpacity
//                     onPress={() => handleOpenMap(item.house.address)}
//                     style={styles.postDescription}>
//                     <Text style={styles.postDescription}>
//                       Địa chỉ:{item.house.address}
//                     </Text>
//                   </TouchableOpacity>
//                   <Text style={styles.postDescription}>Hot: {item.topic}</Text>
//                   <Text style={styles.postDescription}>Id: {item.id}</Text>
//                   <Text style={styles.postDescription}>
//                     Giá: {item.house.price}
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//             </View>
//           )}
//           keyExtractor={(item) => item.id.toString()}
//         />
//       )}
//     </SafeAreaView>
//   );
// }

// export default HomeSearch;

// ===================================
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from "react-native";

import React, { useEffect, useState } from "react";
import styles from "../constants/styles";
import { Colors } from "../constants";
import { FontAwesome } from "@expo/vector-icons";
import style from "../constants/styles";
import { Picker } from "@react-native-picker/picker";
import { authApiToken, endpoints } from "../config/Apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import profileStyle from "../constants/profileStyle";
import Buttons from "./Buttons";
import PostingInList from "./PostingInList";

function HomeSearch() {
  // const [searchInput, setSearchInput] = useState("");
  // const [searchResults, setSearchResults] = useState([]);

  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("user__username");
  const [imgHouse, setImgHouse] = useState([]);

  const getHomeImg = async () => {
    console.log(
      "====================================================================================",
    );
    try {
      const { data, status } = await axios.get(endpoints["images"]);
      setImgHouse(data);
      console.log("data", data);
    } catch (error) {
      console.error("Error fetching home image:", error);
      throw error;
    }
  };

  const handleOpenMap = (address) => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address,
    )}`;

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
  const nav = (idB) => {
    navigation.navigate("UserProfile", { id: idB });
  };
  // const CallPost = as
  const handleSearch = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      setLoading(true);
      let e = endpoints["search"];
      let params = {};

      if (searchValue) {
        params[
          `search${searchType.charAt(0).toUpperCase() + searchType.slice(1)}`
        ] = searchValue;
      }

      let url =
        e +
        "?" +
        Object.entries(params)
          .map(([key, value]) => `${searchType}=${searchValue}`)
          .join("&");
      console.log(url);

      let res = await authApiToken(token).get(url);

      setOutput(res.data);
      // console.log("Ngộ ha tụi bây", res, res.status);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleSearch();
    getHomeImg();
  }, [searchValue, searchType]);

  return (
    <SafeAreaView style={{ backgroundColor: Colors.background }}>
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
      <View style={{ alignItems: "center", flexDirection: "row" }}>
        <TextInput
          placeholder="Search value"
          value={searchValue}
          onChangeText={setSearchValue}
          style={[styles.search, { width: "70%" }]}
        />
        {/* <Button title="Search" onPress={handleSearch} /> */}
        {/* <Buttons btn_text={"Log In"} onPress={handleSearch} /> */}
        <TouchableOpacity
          style={{
            justifyContent: "center",
            width: "23%",
            backgroundColor: Colors.greenPlus,
            height: 50,
            marginBottom: 0,
            borderRadius: 10,
          }}
          onPress={handleSearch}>
          <Text
            style={{
              fontSize: 15,
              letterSpacing: 1.5,
              textAlign: "center",
              position: "relative",
              color: Colors.white,
            }}>
            Search
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 10,
        }}>
        <Picker
          selectedValue={searchType}
          onValueChange={(itemValue) => setSearchType(itemValue)}
          style={{
            backgroundColor: "white",
            color: "black",
            width: "95%",
            height: 20,
            borderRadius: 1000,
            alignItems: "center",
            fontSize: 14,
            marginLeft: 10,
          }}
          label="Select">
          <Picker.Item
            style={{
              backgroundColor: "#E0FFFF",
              width: 30,
              fontSize: 14,
            }}
            label="Select an option"
          />
          <Picker.Item
            style={{
              backgroundColor: "#F0FFF0",
              width: 30,
              fontSize: 14,
            }}
            label="House Address"
            value="house__address"
            placeholder="House"
          />
          <Picker.Item
            style={{
              backgroundColor: "#F0FFFF",
              width: 30,
              fontSize: 14,
            }}
            label="Username"
            value="user__username"
            placeholder="Username"
          />
          <Picker.Item
            style={{
              backgroundColor: "#FFF0F5",
              width: 30,
              fontSize: 14,
            }}
            label="Discount Name"
            value="discount__name"
            placeholder="Discount"
            color="black"
          />
        </Picker>
      </View>
      {/* <Button title="Search" onPress={handleSearch} /> */}

      {loading ? (
        // <View
        //   style={{
        //     height: "100%",
        //     width: "100%",
        //     backgroundColor: Colors.background,
        //   }}>
        //   <Text
        //     style={{
        //       height: "100%",
        //       width: "100%",
        //       backgroundColor: Colors.background,
        //       fontSize: 20,
        //       display: "flex",
        //       justifyContent: "center",
        //       alignItems: "center",
        //       fontWeight: "bold",
        //     }}>
        //     Loading...
        //   </Text>
        // </View>
        <ActivityIndicator size="small" color="#000" />
      ) : (
        <FlatList
          data={output}
          renderItem={({ item }) => (
            <View
              style={[
                styles.containerListPosting,
                { backgroundColor: Colors.background, fontSize: 10 },
              ]}>
              <TouchableOpacity style={styles.postItem}>
                {/* <View style={{ alignItems: "center", flexDirection: "row" }}>
                  <Image
                    source={{ uri: item.user.avatar }}
                    style={profileStyle.profileImgList}
                  />
                  <Text style={[styles.postTitle, { marginLeft: 20 }]}>
                    {item.user.username}
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => handleOpenMap(item.house.address)}
                    style={styles.postDescription}>
                    <Text style={styles.postDescription}>
                      Địa chỉ:{item.house.address}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.postDescription}>Hot: {item.topic}</Text>
                  <Text style={styles.postDescription}>Id: {item.id}</Text>
                  <Text style={styles.postDescription}>
                    Giá: {item.house.price}
                  </Text>
                </View>
                <View style={styles.imagePostContainer}>
                  {imgHouse.map((img, index) =>
                    img.house.id == item.house.id ? (
                      <Image
                        key={index}
                        source={{ uri: img.imageURL }}
                        style={styles.imagePost}
                      />
                    ) : null,
                  )}
                </View> */}
                <PostingInList
                  postId={item?.id}
                  houseId={item?.house?.id}
                  userId={item?.user?.id}
                  discountId={item?.discount?.id}
                  active={item?.active}
                  count={10}
                />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </SafeAreaView>
  );
}

export default HomeSearch;

// ========================
