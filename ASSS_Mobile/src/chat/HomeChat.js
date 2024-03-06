// import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
// import {
//   View,
//   TouchableOpacity,
//   Text,
//   Image,
//   StyleSheet,
//   TextInput,
//   FlatList,
//   ActivityIndicator,
//   Button,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { FontAwesome } from "@expo/vector-icons";
// // import colors from '../colors';
// import colors from "../library/colors";
// import { Entypo } from "@expo/vector-icons";
// import {
//   QuerySnapshot,
//   and,
//   collection,
//   getDocs,
//   onSnapshot,
//   or,
//   orderBy,
//   query,
//   where,
// } from "firebase/firestore";
// import { database } from "../config/firebase";
// import { MyUserContext } from "../../App";
// import ChatBox from "./ChatBox";
// import { Colors } from "react-native-paper";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// const catImageUrl =
//   "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d";
// const SERVER_URL = "http://172.16.16.74:8000";
// const HomeChat = () => {
//   const [user, dispatch] = useContext(MyUserContext);
//   const [loading, setLoading] = useState(false);
//   const [output, setOutput] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [searchType, setSearchType] = useState("username");
//   const navigation = useNavigation();
//   const [chatBox, setAllbox] = useState([]);
//   const [username, setUsername] = useState("");
//   const [userData, setUserData] = useState(null);

//   //   const handleSearch = async () => {
//   //     try {
//   //       const token = await AsyncStorage.getItem("token");
//   //       setLoading(true);
//   //       let e = endpoints["searchUser"];
//   //       let params = {};

//   //       if (searchValue) {
//   //         params[
//   //           `search${searchType.charAt(0).toUpperCase() + searchType.slice(1)}`
//   //         ] = searchValue;
//   //       }

//   //       let url =
//   //         e +
//   //         "?" +
//   //         Object.entries(params)
//   //           .map(([key, value]) => `${searchType}=${searchValue}`)
//   //           .join("&");
//   //       console.log(url);

//   //       let res = await authApiToken(token).get(url);

//   //       setOutput(res.data);
//   //       // console.log("Ngộ ha tụi bây", res, res.status);
//   //       setLoading(false);
//   //     } catch (error) {
//   //       console.log(error);
//   //     }
//   //   };
//   const searchUserByUsername = async () => {
//     try {
//       setLoading(true); // Đặt trạng thái đang tải là true khi bắt đầu tìm kiếm
//       // Gọi endpoint để tìm kiếm người dùng theo tên người dùng
//       console.log("==:", username);
//       const response = await axios.get(
//         `${SERVER_URL}/users/?username=${username}`,
//       );
//       // Lưu thông tin người dùng vào state
//       setUserData(response.data);
//       console.log("kkkk:", response.data);
//       console.log("info", userData);
//     } catch (error) {
//       console.error("Error searching user:", error);
//     } finally {
//       setLoading(false); // Đặt trạng thái đang tải là false khi kết thúc tìm kiếm
//     }
//   };
//   useEffect(() => {
//     navigation.setOptions({
//       headerLeft: () => (
//         <FontAwesome
//           name="search"
//           size={24}
//           color={colors.gray}
//           style={{ marginLeft: 15 }}
//         />
//       ),
//       headerRight: () => (
//         <Image
//           source={{ uri: catImageUrl }}
//           style={{
//             width: 40,
//             height: 40,
//             marginRight: 15,
//           }}
//         />
//       ),
//     });
//   }, [navigation]);

//   const fetchData = async (userId) => {
//     console.log("id ne", userId);
//     const collectionRef = collection(database, "ASSS/chatbox/chats");
//     const q = query(
//       collectionRef,
//       or(where("nguoigui._id", "==", userId), where("nguoinhan", "==", 9)),
//     );

//     try {
//       const snapshot = await getDocs(q);
//       let documents = [];

//       snapshot.forEach((doc) => {
//         const data = doc.data();
//         documents.push(data);
//       });
//       console.info("======fetch========", documents);
//       return documents;
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       return [];
//     }
//   };

//   useEffect(() => {
//     const fetchDataAsync = async () => {
//       const documents = await fetchData(user.id);
//       let tam = [];
//       documents.forEach((document) => {
//         const chatBoxId =
//           document.nguoinhan === user.id
//             ? document.nguoigui._id
//             : document.nguoinhan;
//         if (!tam.includes(chatBoxId)) {
//           tam.push(chatBoxId);
//         }
//       });
//       setAllbox(tam);
//     };

//     fetchDataAsync();
//   }, [user]);

//   console.info(chatBox);

//   return (
//     <View>
//       {chatBox.map((box) =>
//         box != user.id ? (
//           <View>
//             <ChatBox id={box} />
//           </View>
//         ) : null,
//       )}
//       <View style={{ alignItems: "center", flexDirection: "column" }}>
//         <TextInput
//           style={styles.input}
//           placeholder="Nhập tên người dùng"
//           value={username}
//           onChangeText={(text) => setUsername(text)}
//         />
//         <Button title="Tìm kiếm" onPress={searchUserByUsername} />

//         {loading ? ( // Nếu đang tải, hiển thị ActivityIndicator
//           <ActivityIndicator size="small" color="#000" />
//         ) : (
//           <FlatList
//             data={username}
//             renderItem={({ item }) => (
//               <View
//                 style={[
//                   styles.containerListPosting,
//                   { backgroundColor: Colors.background, fontSize: 10 },
//                 ]}>
//                 <TouchableOpacity style={styles.postItem}>
//                   <View style={{ alignItems: "center", flexDirection: "row" }}>
//                     <Image
//                       source={{ uri: item.user.avatar }}
//                       style={profileStyle.profileImgList}
//                     />
//                     <Text style={[styles.postTitle, { marginLeft: 20 }]}>
//                       {item.user.username}
//                     </Text>
//                   </View>
//                 </TouchableOpacity>
//               </View>
//             )}
//           />
//         )}
//       </View>
//       <View style={styles.container}>
//         <TouchableOpacity
//           onPress={() =>
//             navigation.navigate("Chat", { id: 1, username: "admin" })
//           }
//           style={styles.chatButton}>
//           <Entypo name="chat" size={24} color={colors.lightGray} />
//         </TouchableOpacity>
//       </View>
//       {/* {loading ? (
//         <ActivityIndicator size="small" color="#000" />
//       ) : (
//         <FlatList
//           data={output}
//           renderItem={({ item }) => (
//             <View
//               style={[
//                 styles.containerListPosting,
//                 { backgroundColor: Colors.background, fontSize: 10 },
//               ]}>
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
//               </TouchableOpacity>
//             </View>
//           )}
//           keyExtractor={(item) => item.id.toString()}
//         />
//       )} */}
//     </View>
//   );
// };

// export default HomeChat;

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     // justifyContent: 'flex-end',
//     // alignItems: 'flex-end',
//     backgroundColor: "#fff",
//   },
//   chatButton: {
//     backgroundColor: colors.primary,
//     height: 50,
//     width: 50,
//     borderRadius: 25,
//     alignItems: "center",
//     justifyContent: "center",
//     shadowColor: colors.primary,
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.9,
//     shadowRadius: 8,
//     marginRight: 20,
//     marginBottom: 50,
//   },
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   input: {
//     width: 300,
//     height: 40,
//     borderWidth: 1,
//     borderColor: "gray",
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginBottom: 20,
//   },
//   userData: {
//     marginTop: 20,
//     alignItems: "center",
//   },
//   username: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//   },
// });
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextInput,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
// import colors from '../colors';
import colors from "../library/colors";
import { Entypo } from "@expo/vector-icons";
import {
  QuerySnapshot,
  and,
  collection,
  getDocs,
  onSnapshot,
  or,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { database } from "../config/firebase";
import { MyUserContext } from "../../App";
import ChatBox from "./ChatBox";
import Buttons from "../components/Buttons";
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors } from "../constants";
import axios from "axios";
import profileStyle from "../constants/profileStyle";

const catImageUrl =
  "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d";
const SERVER_URL = "http://192.168.10.28:8000/";
const HomeChat = () => {
  const [user, dispatch] = useContext(MyUserContext);
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [chatBox, setAllBox] = useState([]);
  // const handleSearch = async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     console.log("12");
  //     console.log("12a", username);

  //     const response = await axios.get(
  //       `${SERVER_URL}/users/?username=${username}`,
  //     );
  //     setUsers(response.data);
  //     console.log(response.data.username);
  //   } catch (error) {
  //     setError("     Error searching for users. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading1(true);
      const documents = await fetchData(user.id);
      let tam = [];

      documents.forEach((document) => {
        const chatBoxId =
          document.nguoinhan === user.id
            ? document.nguoigui._id
            : document.nguoinhan;
        if (!tam.includes(chatBoxId)) {
          tam.push(chatBoxId);
        }
      });
      setAllBox(tam);
      setLoading1(false);
    };

    fetchDataAsync();
  }, [user]);
  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("qq");
      const response = await axios.get(
        `${SERVER_URL}/users/?username=${username}`,
      );
      setUsers(response.data);
    } catch (error) {
      setError("Error searching for users. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <FontAwesome
          name="search"
          size={24}
          color={colors.gray}
          style={{ marginLeft: 15 }}
        />
      ),
      headerRight: () => (
        <Image
          source={{ uri: catImageUrl }}
          style={{
            width: 40,
            height: 40,
            marginRight: 15,
          }}
        />
      ),
    });
  }, [navigation]);

  const fetchData = async (userId) => {
    console.log("id ne", userId);
    // const collectionRef = collection(database, "ASSS/chatbox/chats");
    // db khi lưu tin nhắn của 2 người bên trang chat
    // setLoading1(true);
    const collectionRef = collection(database, "chat/Chatbox/chat");
    console.log("collectionRef", collectionRef);
    const q = query(
      collectionRef,
      or(where("nguoigui._id", "==", userId), where("nguoinhan", "==", 9)),
    );

    try {
      const snapshot = await getDocs(q);
      let documents = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        documents.push(data);
      });
      console.info("======fetch========", documents);
      // setLoading1(false);
      return documents;
    } catch (error) {
      // setLoading1(true);
      console.error("Error fetching data:", error);
      return [];
    }
  };

  // useEffect(() => {
  //   const fetchDataAsync = async () => {
  //     const documents = await fetchData(user.id);
  //     let tam = [];
  //     documents.forEach((document) => {
  //       const chatBoxId =
  //         document.nguoinhan === user.id
  //           ? document.nguoigui._id
  //           : document.nguoinhan;
  //       if (!tam.includes(chatBoxId)) {
  //         tam.push(chatBoxId);
  //       }
  //     });
  //     setAllBox(tam);
  //   };

  //   fetchDataAsync();
  // }, [user]);

  useEffect(() => {
    fetchData();
  }, []);
  console.info("hic", chatBox);

  return (
    <View>
      <View
        style={{
          flex: 1,
          padding: 20,
          marginBottom: 30,
          flexDirection: "row",
        }}>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 10,
            paddingHorizontal: 10,
            width: "80%",
          }}
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholder="Enter username"
        />
        {/* <View style={{ width: "20%", paddingHorizontal: 10 }}>
          <Buttons
            btn_text={"Search"}
            on_press={handleSearch}
            disabled={loading}
          />
          
        </View> */}
        <TouchableOpacity
          onPress={() => handleSearch()}
          disabled={loading}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: Colors.greenPlus,
            padding: 10,
            borderRadius: 5,
            marginLeft: 20,
            height: 42,
          }}>
          <Icon name="search" size={15} color="white" style={{ margin: 3 }} />
          {/* Icon kính lúp */}
          {/* <Text style={{ color: "white", fontSize: 16 }}>Search</Text> */}
        </TouchableOpacity>
      </View>
      <View style={{ marginHorizontal: 10 }}>
        <Text style={{ marginVertical: 10 }}>Chat History</Text>
        {loading1 && <ActivityIndicator size="small" color="#000" />}

        {chatBox.map((box) =>
          box != user.id ? (
            <View>
              <ChatBox id={box} />
            </View>
          ) : null,
        )}
      </View>

      <View style={{ marginBottom: 150 }}>
        {loading && <ActivityIndicator size="small" color="#000" />}

        {error && <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>}
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            // <View
            //   style={[
            //     styles.containerListPosting,
            //     { backgroundColor: Colors.background, fontSize: 10 },
            //   ]}>
            //   <TouchableOpacity
            //     onPress={() => handleUserPress(item.username)}
            //     style={styles.postItem}>
            //     <View style={{ alignItems: "center", flexDirection: "row" }}>
            //       <Text style={[styles.postTitle, { marginLeft: 20 }]}>
            //         {item.username}
            //       </Text>
            //       <Image
            //         source={{ uri: item.avatar }}
            //         style={profileStyle.profileImgList}
            //       />
            //     </View>
            //   </TouchableOpacity>
            // </View>
            <View
              style={[
                styles.containerListPosting,
                {
                  backgroundColor: Colors.background,
                  fontSize: 10,
                  marginBottom: 15,
                  borderRadius: 40,
                  marginHorizontal: 20,
                  padding: 10,
                },
              ]}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Chat", {
                    id: item.id,
                    username: item.username,
                  })
                }>
                <View style={{ alignItems: "center", flexDirection: "row" }}>
                  <Image
                    source={{ uri: item.avatar }}
                    style={profileStyle.profileImgList}
                  />
                  <Text
                    style={[
                      styles.postTitle,
                      { marginLeft: 20, fontWeight: "bold" },
                    ]}>
                    {item.username}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      {/* <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Chat", { id: 1, username: "admin" })
          }
          style={styles.chatButton}>
          <Entypo name="chat" size={24} color={colors.lightGray} />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default HomeChat;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end',
    backgroundColor: "#fff",
  },
  chatButton: {
    backgroundColor: colors.primary,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    marginRight: 20,
    marginBottom: 50,
  },
});
