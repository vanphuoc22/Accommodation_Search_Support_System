import { View, Text } from "react-native";
import React from "react";

const MyLikeReducer = (currentState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "like":
      return action.payload;
    // case "unlike":
    //   //   AsyncStorage.removeItem("token");
    //   //   AsyncStorage.removeItem("current_user");
    //   return action.payload;
  }
  return currentState;
};
export default MyLikeReducer;
