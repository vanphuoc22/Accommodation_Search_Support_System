import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Welcome,
  Onboarding,
  Login,
  Forgot,
  Signup2,
  Cam,
  Profile,
  CreatePost,
  Post,
  UserProfile,
} from "./src/screens";
import Signup from "./src/screens/Signup";
import Home from "./src/screens/Home";
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useReducer } from "react";
import MyUserReducer from "./src/components/MyUserReducer";
import EditProfile from "./src/components/EditProfile";
import ListFollowing from "./src/components/ListFollowing";
import { ProfileBody } from "./src/components/ProfileBody";
import ListPosting from "./src/components/ListPosting";
import ListFollower from "./src/components/ListFollower";
import UpdateImg from "./src/components/UpdateImg";
import PostDetail from "./src/components/PostDetail";
import HomeSearch from "./src/components/HomeSearch";
import Toast from "react-native-toast-message";
import Upgrade from "./src/components/Upgrade";
import Notice from "./src/components/Notice";
import MainComment from "./src/components/MainComment";
import Comment from "./src/components/Comment";
import MapView from "./src/components/GoogleMapView";
import MapViewGoogle from "./src/components/MapViewGoogle";
import Chat from "./src/chat/Chat";
import HomeChat from "./src/chat/HomeChat";
import Paypal from "./src/components/Paypal";
import PaypalView from "./src/components/PaypalView";
import PostingInProfile from "./src/components/PostingInProfile";
import ListAllNotice from "./src/components/ListAllNotice";
import CheckPaypal from "./src/components/CheckPaypal";
import PayPalForPost from "./src/components/PayPalForPost";
import CheckPaypalCreate from "./src/components/CheckPaypalCreate";

import UserCreatePost from "./src/components/UserCreatePost";
import RoleCreatePost from "./src/components/RoleCreatePost";

const Tab = createBottomTabNavigator();
export const MyUserContext = createContext();
export const MyLikeContext = createContext();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={30} color={"#00A465"} />
          ),
        }}
      />

      <Tab.Screen
        name="Notice"
        component={Notice}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="bell" size={30} color={"#00A465"} />
          ),
        }}
      />

      <Tab.Screen
        name="HomeSearch"
        component={HomeSearch}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" size={30} color={"#00A465"} />
          ),
        }}
      />

      <Tab.Screen
        name="Create Post"
        component={RoleCreatePost}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="plus-circle" size={40} color={"#00A465"} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={30} color={"#00A465"} />
          ),
        }}
      />
      <Tab.Screen
        name="HomeChat"
        component={HomeChat}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="envelope" size={40} color={"#00A465"} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Post"
        component={Post}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="plus-circle" size={40} color={"#00A465"} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="MapViewGoogle"
        component={MapViewGoogle}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="map" size={40} color={"#00A465"} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();
const App = () => {
  const [user, dispatch] = useReducer(
    MyUserReducer,
    AsyncStorage.getItem("current_user") || null,
  );
  return (
    <MyUserContext.Provider value={[user, dispatch]}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="MyTab" component={MyTabs} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Forgot" component={Forgot} />
          <Stack.Screen name="Signup2" component={Signup2} />
          <Stack.Screen name="Cam" component={Cam} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="CreatePost" component={CreatePost} />
          <Stack.Screen name="Post" component={Post} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="ListFollowing" component={ListFollowing} />
          <Stack.Screen name="ProfileBody" component={ProfileBody} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="ListPosting" component={ListPosting} />
          <Stack.Screen name="ListFollower" component={ListFollower} />
          <Stack.Screen name="UpdateImg" component={UpdateImg} />
          <Stack.Screen name="PostDetail" component={PostDetail} />
          <Stack.Screen name="HomeSearch" component={HomeSearch} />
          <Stack.Screen name="Upgrade" component={Upgrade} />
          <Stack.Screen name="Notice" component={Notice} />
          <Stack.Screen name="ListAllNotice" component={ListAllNotice} />
          <Stack.Screen name="MainComment" component={MainComment} />
          <Stack.Screen name="MapViewGoogle" component={MapViewGoogle} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Paypal" component={Paypal} />
          <Stack.Screen name="PaypalView" component={PaypalView} />
          <Stack.Screen name="PostingInProfile" component={PostingInProfile} />
          <Stack.Screen name="CheckPaypal" component={CheckPaypal} />
          <Stack.Screen name="PayPalForPost" component={PayPalForPost} />
          <Stack.Screen name="UserCreatePost" component={UserCreatePost} />
          <Stack.Screen name="Create Post" component={RoleCreatePost} />

          <Stack.Screen
            name="CheckPaypalCreate"
            component={CheckPaypalCreate}
          />

          {/* <Stack.Screen name="Comment" component={Comment} /> */}
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </MyUserContext.Provider>
  );
};
export default App;
