import { View, Text } from "react-native";
import React, { useContext } from "react";
import { MyUserContext } from "../../App";
import { CreatePost } from "../screens";
import UserCreatePost from "./UserCreatePost";

const RoleCreatePost = ({ navigation }) => {
  const [user] = useContext(MyUserContext);
  return (
    <View>
      {user.role.id === 2 ? (
        <CreatePost />
      ) : (
        <UserCreatePost navigation={navigation} />
      )}
    </View>
  );
};

export default RoleCreatePost;
