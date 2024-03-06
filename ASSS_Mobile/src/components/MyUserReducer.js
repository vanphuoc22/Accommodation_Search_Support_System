import AsyncStorage from "@react-native-async-storage/async-storage";

const MyUserReducer = (currentState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "login":
      return action.payload;
    case "logout":
      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("current_user");
      return null;
    case "updateUser":
      return {
        // ...currentState,
        ...action.payload,
      };
  }
  return currentState;
};

export default MyUserReducer;
