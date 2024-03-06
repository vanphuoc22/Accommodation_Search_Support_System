// // import React, {
// //   useState,
// //   useEffect,
// //   useLayoutEffect,
// //   useCallback,
// //   useContext,
// // } from "react";
// // import { TouchableOpacity, Text } from "react-native";
// // import { Bubble, GiftedChat, MessageText } from "react-native-gifted-chat";
// // import {
// //   collection,
// //   addDoc,
// //   orderBy,
// //   query,
// //   onSnapshot,
// // } from "firebase/firestore";
// // import { signOut } from "firebase/auth";
// // import { auth, database } from "../config/firebase";
// // import { useNavigation, useRoute } from "@react-navigation/native";
// // import { AntDesign } from "@expo/vector-icons";
// // import colors from "../library/colors";
// // import { MyUserContext } from "../../App";
// // import { endpoints } from "../config/Apis";
// // import axios from "axios";
// // import styles from "../constants/styles";

// // export default function Chat() {
// //   const [user, dispatch] = useContext(MyUserContext);
// //   const [messages, setMessages] = useState([]);
// //   const navigation = useNavigation();
// //   const route = useRoute();
// //   const { id, username, avatar } = route.params;
// //   const [url_collection, setURL] = useState("chat");

// //   // lấy đường dẫn tin nhắn
// //   const getURLChat = (id) => {
// //     // ktra mình là người nhắn hay người nhận tin
// //     if (id > user.id) setURL("ASSS/" + username + "/" + user.username);
// //     else {
// //       setURL("ASSS/" + user.username + "/" + username);
// //     }
// //   };

// //   const data = {};

// //   useEffect(() => {
// //     getURLChat(id);
// //   }, [id]);

// //   console.log("++++++++++++++", url_collection);

// //   const onSignOut = () => {
// //     signOut(auth).catch((error) => console.log("Error logging out: ", error));
// //   };

// //   useLayoutEffect(() => {
// //     navigation.setOptions({
// //       headerRight: () => (
// //         <TouchableOpacity
// //           style={{
// //             marginRight: 10,
// //           }}
// //           onPress={onSignOut}>
// //           <AntDesign
// //             name="logout"
// //             size={24}
// //             color={colors.gray}
// //             style={{ marginRight: 10 }}
// //           />
// //         </TouchableOpacity>
// //       ),
// //     });
// //   }, [navigation]);

// //   useLayoutEffect(() => {
// //     const collectionRef = collection(database, url_collection);
// //     const q = query(collectionRef, orderBy("createdAt", "desc"));

// //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
// //       console.log("querySnapshot unsusbscribe");
// //       // lưu tin nhắn
// //       setMessages(
// //         querySnapshot.docs.map((doc) => ({
// //           _id: doc.data()._id,
// //           createdAt: doc.data().createdAt.toDate(),
// //           text: doc.data().text,
// //           user: doc.data().user,
// //         })),
// //       );
// //     });

// //     return unsubscribe;
// //   }, [url_collection]);

// //   const onSend = useCallback(
// //     (messages = []) => {
// //       setMessages((previousMessages) =>
// //         GiftedChat.append(previousMessages, messages),
// //       );
// //       // setMessages([...messages, ...messages]);
// //       const { _id, createdAt, text, user } = messages[0];
// //       addDoc(collection(database, url_collection), {
// //         _id,
// //         createdAt,
// //         text,
// //         user,
// //       });
// //       // lưu vào db trên firebase
// //       addDoc(collection(database, "ASSS/chatbox/chats"), {
// //         nguoigui: user,
// //         nguoinhan: id,
// //         createdAt,
// //       });
// //     },
// //     [url_collection],
// //     user,
// //   );

// //   return (
// //     <GiftedChat
// //       messages={messages}
// //       renderBubble={(props) => (
// //         <Bubble
// //           {...props}
// //           wrapperStyle={{
// //             left: { backgroundColor: "#e3e8e5" },
// //             right: {
// //               backgroundColor: "#3b965e",
// //             },
// //           }}
// //         />
// //       )}
// //       renderMessageText={(props) => (
// //         <MessageText
// //           {...props}
// //           textStyle={{
// //             left: { color: "black" }, // Màu sắc cho tin nhắn bên trái (người gửi tin)
// //             right: { color: "white" }, // Màu sắc cho tin nhắn bên phải (người nhận tin)
// //           }}
// //         />
// //       )}
// //       showAvatarForEveryMessage={true}
// //       showUserAvatar={true}
// //       onSend={(messages) => onSend(messages)}
// //       messagesContainerStyle={{
// //         backgroundColor: "#fff",
// //         paddingVertical: "10%",
// //         // paddingHorizontal: 10
// //       }}
// //       // nhập tin nhắn
// //       textInputStyle={[styles.messtextInput]}
// //       // ktra tin nhắn gửi hay nhận
// //       user={{
// //         _id: user.id,
// //         avatar: user.avatar,
// //       }}
// //     />
// //   );
// // }
// // ===================================
// import React, {
//   useState,
//   useEffect,
//   useLayoutEffect,
//   useCallback,
//   useContext,
// } from "react";
// import { TouchableOpacity, Text, View } from "react-native";
// import { Bubble, GiftedChat, MessageText } from "react-native-gifted-chat";
// import {
//   collection,
//   addDoc,
//   orderBy,
//   query,
//   onSnapshot,
// } from "firebase/firestore";
// import { signOut } from "firebase/auth";
// import { auth, database } from "../config/firebase";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { AntDesign } from "@expo/vector-icons";
// import colors from "../library/colors";
// import { MyUserContext } from "../../App";
// import { endpoints } from "../config/Apis";
// import axios from "axios";
// import styles from "../constants/styles";

// export default function Chat() {
//   const [user, dispatch] = useContext(MyUserContext);
//   const [messages, setMessages] = useState([]);

//   const navigation = useNavigation();
//   const route = useRoute();
//   const { id, username, avatar } = route.params;
//   const [url_collection, setURL] = useState("Chat/Chat/Chat");
//   // const [url_collection, setURL] = useState("chat");
//   const [recipientName, setRecipientName] = useState(username); // Tên của người nhận
//   // Lấy đường dẫn tin nhắn
//   const getURLChat = (id) => {
//     // Kiểm tra mình là người nhắn hay người nhận tin
//     if (id > user.id) setURL("messager/" + username + "/" + user.username);
//     else {
//       setURL("messager/" + user.username + "/" + username);
//     }
//   };

//   useEffect(() => {
//     // Gọi API hoặc thực hiện các thao tác cần thiết để lấy tên của người bạn đang nhắn tin dựa vào `id`
//     const fetchRecipientName = async () => {
//       try {
//         const response = await axios.get(endpoints.getUserByID(id));
//         console.log("data chat", response.data);
//         setRecipientName(response.data.username); // Giả sử tên của người nhận được lấy từ API là `username`
//       } catch (error) {
//         console.error("Error fetching recipient name:", error);
//       }
//     };

//     fetchRecipientName();
//   }, [id]);

//   console.log("++++++++++++++", url_collection);

//   const onSignOut = () => {
//     signOut(auth).catch((error) => console.log("Error logging out: ", error));
//   };

//   // useLayoutEffect(() => {
//   //   navigation.setOptions({
//   //     headerTitle: recipientName, // Hiển thị tên của người nhận ở header
//   //     headerRight: () => (
//   //       <TouchableOpacity
//   //         style={{
//   //           marginRight: 10,
//   //         }}
//   //         onPress={onSignOut}>
//   //         <AntDesign
//   //           name="logout"
//   //           size={24}
//   //           color={colors.gray}
//   //           style={{ marginRight: 10 }}
//   //         />
//   //       </TouchableOpacity>
//   //     ),
//   //   });
//   // }, [navigation, recipientName]);
//   useEffect(() => {
//     console.log("Recipient Name:", recipientName); // Thêm console.log ở đây
//     navigation.setOptions({
//       headerTitle: recipientName, // Hiển thị tên của người nhận ở header
//       headerLeft: () => (
//         <TouchableOpacity
//           style={{
//             marginRight: 10,
//           }}
//           onPress={onSignOut}>
//           <AntDesign
//             name="logout"
//             size={24}
//             color={colors.gray}
//             style={{ marginRight: 10 }}
//           />
//         </TouchableOpacity>
//       ),
//     });
//   }, [navigation, recipientName]);

//   useLayoutEffect(() => {
//     const collectionRef = collection(database, url_collection);
//     const q = query(collectionRef, orderBy("createdAt", "desc"));

//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       console.log("querySnapshot unsusbscribe");
//       // Lưu tin nhắn
//       setMessages(
//         querySnapshot.docs.map((doc) => ({
//           _id: doc.data()._id,
//           createdAt: doc.data().createdAt.toDate(),
//           text: doc.data().text,
//           user: doc.data().user,
//         })),
//       );
//     });

//     return unsubscribe;
//   }, [url_collection]);

//   const onSend = useCallback(
//     (messages = []) => {
//       setMessages((previousMessages) =>
//         GiftedChat.append(previousMessages, messages),
//       );
//       // setMessages([...messages, ...messages]);
//       const { _id, createdAt, text, user } = messages[0];
//       addDoc(collection(database, url_collection), {
//         _id,
//         createdAt,
//         text,
//         user,
//       });
//       // Lưu vào db trên firebase
//       addDoc(collection(database, "ASSS/chatbox/chats"), {
//         nguoigui: user,
//         nguoinhan: id,
//         createdAt,
//       });
//     },
//     [url_collection],
//     user,
//   );

//   return (
//     <GiftedChat
//       messages={messages}
//       renderBubble={(props) => (
//         <Bubble
//           {...props}
//           wrapperStyle={{
//             left: { backgroundColor: "#e3e8e5" },
//             right: {
//               backgroundColor: "#3b965e",
//             },
//           }}
//         />
//       )}
//       renderMessageText={(props) => (
//         <MessageText
//           {...props}
//           textStyle={{
//             left: { color: "black" }, // Màu sắc cho tin nhắn bên trái (người gửi tin)
//             right: { color: "white" }, // Màu sắc cho tin nhắn bên phải (người nhận tin)
//           }}
//         />
//       )}
//       showAvatarForEveryMessage={true}
//       showUserAvatar={true}
//       onSend={(messages) => onSend(messages)}
//       messagesContainerStyle={{
//         backgroundColor: "#fff",
//         paddingVertical: "10%",
//         // paddingHorizontal: 10
//       }}
//       // Nhập tin nhắn
//       textInputStyle={[styles.messtextInput]}
//       // Kiểm tra tin nhắn gửi hay nhận
//       user={{
//         _id: user.id,
//         avatar: user.avatar,
//       }}
//     />
//   );
// }
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useContext,
} from "react";
import { TouchableOpacity, Text, View, ActivityIndicator } from "react-native";
import { Bubble, GiftedChat, MessageText } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
// import { signOut } from "firebase/auth";
import { auth, database } from "../config/firebase";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
// import { MyUserContext } from "../../../App";
// import mess from "./style";
// import color from "../../assets/js/color";
import { MyUserContext } from "../../App";
// import { endpoints } from '../config/Apis';
// import axios from 'axios';

export default function Chat() {
  const [user, dispatch] = useContext(MyUserContext);
  // const id = 1
  // const username = 'admin'
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  const { id, username } = route.params;
  console.log("thông tin user", user.id);
  const [url_collection, setURL] = useState("asss/Chat/chat");

  // lấy đường dẫn tin nhắn
  const getURLChat = (id) => {
    // ktra mình là người nhắn hay người nhận tin
    if (id > user.id) setURL("newchat/" + username + "/" + user.username);
    else {
      setURL("newchat/" + user.username + "/" + username);
    }
  };
  useEffect(() => {
    getURLChat(id);
  }, [id]);
  useEffect(() => {
    // Gọi API hoặc thực hiện các thao tác cần thiết để lấy tên của người bạn đang nhắn tin dựa vào `id`
    const fetchRecipientName = async () => {
      try {
        const response = await axios.get(endpoints.getUserByID(id));
        console.log("data chat", response.data);
        setRecipientName(response.data.username); // Giả sử tên của người nhận được lấy từ API là `username`
      } catch (error) {
        console.error("Error fetching recipient name:", error);
      }
    };

    fetchRecipientName();
  }, [id]);
  console.log("++++++++++++++", url_collection);

  useEffect(() => {
    const collectionRef = collection(database, url_collection);
    console.log("thông tin chat", collectionRef);
    const q = query(collectionRef, orderBy("createdAt", "desc")); //sắp xếp theo thời gian
    // console.log('thông tin chat.........', q)
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("============", unsubscribe);
      // lưu tin nhắn
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.data()._id, //id user
          createdAt: doc.data().createdAt.toDate(), //thời gian nhắn
          text: doc.data().text, //nội dung nhắn
          user: doc.data().user, //user
        })),
      );
    });

    return unsubscribe;
  }, [url_collection]);

  // gửi tin nhắn
  const onSend = useCallback(
    (messages = []) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages),
      );
      const { _id, createdAt, text, user } = messages[0];
      // lưu vào db trên firebase
      addDoc(collection(database, url_collection), {
        _id,
        createdAt,
        text,
        user,
      });
      // lưu db chưa thông tin chat của 2 người
      addDoc(collection(database, "chat/Chatbox/chat"), {
        nguoigui: user,
        nguoinhan: id,
        createdAt,
      });
    },
    [url_collection],
    user,
  );

  return (
    <GiftedChat
      messages={messages}
      renderBubble={(props) => (
        <Bubble
          {...props}
          wrapperStyle={{
            left: { backgroundColor: "#e3e8e5" },
            right: {
              backgroundColor: "#3b965e",
            },
          }}
        />
      )}
      renderMessageText={(props) => (
        <MessageText
          {...props}
          textStyle={{
            left: { color: "black" }, // Màu sắc cho tin nhắn bên trái (người gửi tin)
            right: { color: "white" }, // Màu sắc cho tin nhắn bên phải (người nhận tin)
          }}
        />
      )}
      showAvatarForEveryMessage={true}
      showUserAvatar={true}
      onSend={(messages) => onSend(messages)}
      messagesContainerStyle={{
        backgroundColor: "#fff",
        paddingVertical: "10%",
        // paddingHorizontal: 10
      }}
      // nhập tin nhắn
      // textInputStyle={[mess.textInput]}
      // ktra tin nhắn gửi hay nhận
      user={{
        _id: user.id,
        avatar: user.avatar,
      }}
    />
  );
}
