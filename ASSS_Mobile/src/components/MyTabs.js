// import React, { useContext } from "react";
// import { FontAwesome } from "@expo/vector-icons";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Profile, CreatePost, Home } from "./src/screens";
// import {
//   Notice,
//   HomeSearch,
//   HomeChat,
//   MapViewGoogle,
//   UserCreatePost,
// } from "./src/components";
// // import { MyUserContext } from "../screens";
// import { MyUserContext } from "../../App";

// const Tab = createBottomTabNavigator();

// const MyTabs = () => {
//   const [user, dispatch] = useContext(MyUserContext);

//   // Biến JSX để lưu trữ Tab.Navigator dựa trên vai trò của người dùng
//   let tabScreens;
//   if (user.role === 2) {
//     tabScreens = (
//       <Tab.Navigator>
//         <Tab.Screen
//           name="Home"
//           component={Home}
//           options={{
//             headerShown: false,
//             tabBarIcon: ({ color, size }) => (
//               <FontAwesome name="home" size={30} color={"#00A465"} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="Notice"
//           component={Notice}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <FontAwesome name="bell" size={30} color={"#00A465"} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="HomeSearch"
//           component={HomeSearch}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <FontAwesome name="search" size={30} color={"#00A465"} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="CreatePost"
//           component={CreatePost}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <FontAwesome name="plus-circle" size={40} color={"#00A465"} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="Profile"
//           component={Profile}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <FontAwesome name="user" size={30} color={"#00A465"} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="HomeChat"
//           component={HomeChat}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <FontAwesome name="envelope" size={40} color={"#00A465"} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="MapViewGoogle"
//           component={MapViewGoogle}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <FontAwesome name="map" size={40} color={"#00A465"} />
//             ),
//           }}
//         />
//       </Tab.Navigator>
//     );
//   } else {
//     tabScreens = (
//       <Tab.Navigator>
//         <Tab.Screen
//           name="Home"
//           component={Home}
//           options={{
//             headerShown: false,
//             tabBarIcon: ({ color, size }) => (
//               <FontAwesome name="home" size={30} color={"#00A465"} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="Notice"
//           component={Notice}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <FontAwesome name="bell" size={30} color={"#00A465"} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="HomeSearch"
//           component={HomeSearch}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <FontAwesome name="search" size={30} color={"#00A465"} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="UserCreatePost"
//           component={UserCreatePost}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <FontAwesome name="plus-circle" size={40} color={"#00A465"} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="Profile"
//           component={Profile}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <FontAwesome name="user" size={30} color={"#00A465"} />
//             ),
//           }}
//         />
//       </Tab.Navigator>
//     );
//   }

//   return tabScreens;
// };

// export default MyTabs;
