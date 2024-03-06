// import AsyncStorage from "@react-native-async-storage/async-storage";
// import React, { useContext, useEffect, useState } from "react";
// import { TouchableOpacity, Text } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";
// import { authApiToken, endpoints } from "../config/Apis";
// import { MyUserContext } from "../../App";

// const LikeStatus = ({ post_id, count }) => {
//   const [isLiked, setIsLiked] = useState();
//   const [user, dispatch] = useContext(MyUserContext);
//   // const [like, setLike] = useState();
//   console.log("postId tại Like status đang như v", post_id);

//   const checkLikeStatus = async () => {
//     const token = await AsyncStorage.getItem("token");
//     const userResponse = await authApiToken(token).get(
//       endpoints["checkLikeStatus"](post_id),
//     );
//     const statusData = userResponse.data;
//     console.log("Lấy được cái này", statusData, post_id);
//     setIsLiked(statusData);
//   };

//   // const handleLike = async () => {
//   //   // Gửi yêu cầu API để thực hiện hành động like
//   //   // Sau khi thành công, cập nhật giá trị của isLiked

//   //   const token = await AsyncStorage.getItem("token");
//   //   let formData = new FormData();
//   //   formData.append("user_id", user.id);
//   //   formData.append("post_id", post_id);

//   //   const myLikeStatus = await authApiToken(token).post(
//   //     endpoints["createLike"],
//   //     formData,
//   //     {
//   //       headers: {
//   //         "Content-Type": "multipart/form-data",
//   //       },
//   //     },
//   //   );

//   //   setIsLiked(!isLiked);
//   // };
//   const handleLike = async () => {
//     const token = await AsyncStorage.getItem("token");
//     let formData = new FormData();
//     formData.append("user_id", user.id);
//     formData.append("post_id", post_id);

//     const myLikeStatus = await authApiToken(token).post(
//       endpoints["createLike"],
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       },
//     );

//     const likeStatus = myLikeStatus.data;
//     console.log("ở đây mang giá trị trả về", likeStatus);
//     setIsLiked(!isLiked);

//     if (likeStatus === "Like") {
//       console.log("Đã like thành công!");
//     } else if (likeStatus === "Un Like") {
//       console.log("Đã unlike thành công!");
//     } else {
//       console.log("Like thất bại hoặc đã unlike!");
//     }
//   };

//   // Gọi API để kiểm tra xem bài post có được like hay không
//   // Sử dụng giá trị isLiked để cập nhật màu sắc của icon

//   useEffect(() => {
//     checkLikeStatus();
//   }, [post_id]);

//   return (
//     <TouchableOpacity onPress={handleLike}>
//       <Icon
//         name={isLiked ? "heart" : "heart-o"}
//         size={20}
//         color={isLiked ? "red" : "#000"}
//         style={{ marginLeft: 10 }}
//       />
//       <Text>
//         {count} {isLiked ? "Liked" : "Like"}
//       </Text>
//     </TouchableOpacity>
//   );
// };

// export default LikeStatus;
// ===================================================================
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import React, { useContext, useEffect, useState } from "react";
// import { TouchableOpacity, Text } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";
// import { authApiToken, endpoints } from "../config/Apis";
// import { MyUserContext } from "../../App";

// const LikeStatus = ({ post_id, count }) => {
//   const [isLiked, setIsLiked] = useState(false);
//   const [user, dispatch] = useContext(MyUserContext);
//   const [like, setLike] = useState();
//   console.log("postId tại Like status đang như v", post_id);

//   const checkLikeStatus = async () => {
//     const token = await AsyncStorage.getItem("token");
//     const userResponse = await authApiToken(token).get(
//       endpoints["checkLikeStatus"](post_id),
//     );
//     const statusData = userResponse.data;
//     console.log("Lấy được cái này", statusData, post_id);
//     setIsLiked(isLiked);
//   };

//   // const handleLike = async () => {
//   //   // Gửi yêu cầu API để thực hiện hành động like
//   //   // Sau khi thành công, cập nhật giá trị của isLiked

//   //   const token = await AsyncStorage.getItem("token");
//   //   let formData = new FormData();
//   //   formData.append("user_id", user.id);
//   //   formData.append("post_id", post_id);

//   //   const myLikeStatus = await authApiToken(token).post(
//   //     endpoints["createLike"],
//   //     formData,
//   //     {
//   //       headers: {
//   //         "Content-Type": "multipart/form-data",
//   //       },
//   //     },
//   //   );

//   //   setIsLiked(!isLiked);
//   // };
//   const handleLike = async () => {
//     const token = await AsyncStorage.getItem("token");
//     let formData = new FormData();
//     formData.append("user_id", user.id);
//     formData.append("post_id", post_id);

//     const myLikeStatus = await authApiToken(token).post(
//       endpoints["createLike"],
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       },
//     );

//     const likeStatus = myLikeStatus.data;
//     console.log("ở đây mang giá trị trả về", likeStatus);
//     setIsLiked(!isLiked);

//     if (likeStatus === "Like") {
//       console.log("Đã like thành công!");
//     } else if (likeStatus === "Un Like") {
//       console.log("Đã unlike thành công!");
//     } else {
//       console.log("Like thất bại hoặc đã unlike!");
//     }
//   };

//   // Gọi API để kiểm tra xem bài post có được like hay không
//   // Sử dụng giá trị isLiked để cập nhật màu sắc của icon

//   useEffect(() => {
//     checkLikeStatus();
//   }, [post_id]);

//   return (
//     <TouchableOpacity onPress={handleLike}>
//       <Icon
//         name={isLiked ? "heart" : "heart-o"}
//         size={20}
//         color={isLiked ? "red" : "#000"}
//       />
//       <Text>
//         {count} {isLiked ? "Liked" : "Like"}
//       </Text>
//     </TouchableOpacity>
//   );
// };

// export default LikeStatus;
// -------------------------------------------------------------
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import React, { useContext, useEffect, useState } from "react";
// import { TouchableOpacity, Text } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";
// import { authApiToken, endpoints } from "../config/Apis";
// import { MyUserContext } from "../../App";

// const LikeStatus = ({ post_id, count }) => {
//   const [isLiked, setIsLiked] = useState("");
//   const [user, dispatch] = useContext(MyUserContext);

//   console.log("postId tại Like status đang như v", post_id);

//   const checkLikeStatus = async () => {
//     const token = await AsyncStorage.getItem("token");
//     const userResponse = await authApiToken(token).get(
//       endpoints["checkLikeStatus"],
//       post_id,
//     );
//     const statusData = userResponse.data;
//     console.log("Lấy được cái này", statusData);
//     setIsLiked(statusData);
//   };

//   const handleLike = async () => {
//     const token = await AsyncStorage.getItem("token");
//     let formData = new FormData();
//     formData.append("user_id", user.id);
//     formData.append("post_id", post_id);

//     const myLikeStatus = await authApiToken(token).post(
//       endpoints["createLike"],
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       },
//     );

//     const likeStatus = myLikeStatus.data;
//     console.log("ở đây mang giá trị trả về", likeStatus);
//     setIsLiked(!isLiked);

//     if (likeStatus === "like") {
//       console.log("Đã like thành công!");
//     } else {
//       console.log("Like thất bại!");
//     }
//   };
//   // Gọi API để kiểm tra xem bài post có được like hay không
//   // Sử dụng giá trị isLiked để cập nhật màu sắc của icon

//   useEffect(() => {
//     checkLikeStatus();
//   }, [post_id]);

//   return (
//     <TouchableOpacity onPress={handleLike}>
//       <Icon
//         name={isLiked ? "heart" : "heart-o"}
//         size={20}
//         color={isLiked ? "red" : "#000"}
//       />
//       <Text>
//         {count} {isLiked ? "Liked" : "Like"}
//       </Text>
//       <Text>{post_id}</Text>
//       <Text>{isLiked}</Text>
//     </TouchableOpacity>
//   );
// };

// export default LikeStatus;
// =========================================================
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import React, { useContext, useEffect, useState } from "react";
// import { TouchableOpacity, Text } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";
// import { authApiToken, endpoints } from "../config/Apis";
// import { MyUserContext } from "../../App";

// const LikeStatus = ({ post_id, count }) => {
//   const [isLiked, setIsLiked] = useState(false);
//   const [user, dispatch] = useContext(MyUserContext);
//   const [like, setLike] = useState();
//   console.log("postId tại Like status đang như v", post_id);

//   const checkLikeStatus = async () => {
//     const token = await AsyncStorage.getItem("token");
//     const userResponse = await authApiToken(token).get(
//       endpoints["checkLikeStatus"],
//       post_id,
//     );
//     const statusData = userResponse.data;
//     console.log("Lấy được cái này", statusData, post_id);
//     setIsLiked(statusData);
//   };

//   // const handleLike = async () => {
//   // // Gửi yêu cầu API để thực hiện hành động like
//   // // Sau khi thành công, cập nhật giá trị của isLiked

//   // const token = await AsyncStorage.getItem("token");
//   // let formData = new FormData();
//   // formData.append("user_id", user.id);
//   // formData.append("post_id", post_id);

//   // const myLikeStatus = await authApiToken(token).post(
//   // endpoints["createLike"],
//   // formData,
//   // {
//   // headers: {
//   // "Content-Type": "multipart/form-data",
//   // },
//   // },
//   // );

//   // setIsLiked(!isLiked);
//   // };
//   const handleLike = async () => {
//     const token = await AsyncStorage.getItem("token");
//     let formData = new FormData();
//     formData.append("user_id", user.id);
//     formData.append("post_id", post_id);

//     const myLikeStatus = await authApiToken(token).post(
//       endpoints["createLike"],
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       },
//     );

//     const likeStatus = myLikeStatus.data;
//     console.log("ở đây mang giá trị trả về", likeStatus);
//     setIsLiked(!isLiked);

//     if (likeStatus === "Like") {
//       console.log("Đã like thành công!");
//     } else if (likeStatus === "Un Like") {
//       console.log("Đã unlike thành công!");
//     } else {
//       console.log("Like thất bại hoặc đã unlike!");
//     }
//   };

//   // Gọi API để kiểm tra xem bài post có được like hay không
//   // Sử dụng giá trị isLiked để cập nhật màu sắc của icon

//   useEffect(() => {
//     checkLikeStatus();
//   }, [post_id]);

//   return (
//     <TouchableOpacity onPress={handleLike}>
//       <Icon
//         name={isLiked ? "heart" : "heart-o"}
//         size={20}
//         color={isLiked ? "red" : "#000"}
//       />
//       <Text>
//         {count} {isLiked ? "Liked" : "Like"}
//       </Text>
//     </TouchableOpacity>
//   );
// };

// export default LikeStatus;
// ==========================
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import React, { useContext, useEffect, useState } from "react";
// import { TouchableOpacity, Text } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";
// import { authApiToken, endpoints } from "../config/Apis";
// import { MyUserContext } from "../../App";

// const LikeStatus = ({ post_id, count }) => {
//   const [isLiked, setIsLiked] = useState(false);
//   const [user, dispatch] = useContext(MyUserContext);
//   const [like, setLike] = useState();
//   console.log("postId tại Like status đang như v", post_id);

//   const checkLikeStatus = async () => {
//     const token = await AsyncStorage.get("token");
//     const userResponse = await authApiToken(token).get(
//       endpoints["checkLikeStatus"],
//       post_id,
//     );
//     const statusData = userResponse.data;
//     console.log("Lấy được cái này", statusData, post_id);
//     setIsLiked(statusData);
//   };

//   const handleLike = async () => {
//     const token = await AsyncStorage.getItem("token");
//     let formData = new FormData();
//     formData.append("user_id", user.id);
//     formData.append("post_id", post_id);

//     const myLikeStatus = await authApiToken(token).post(
//       endpoints["createLike"],
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       },
//     );

//     const likeStatus = myLikeStatus.data;
//     console.log("ở đây mang giá trị trả về", likeStatus);
//     setIsLiked(!isLiked);

//     if (likeStatus === "Like") {
//       console.log("Đã like thành công!");
//     } else if (likeStatus === "Un Like") {
//       console.log("Đã unlike thành công!");
//     } else {
//       console.log("Like thất bại hoặc đã unlike!");
//     }
//   };

//   useEffect(() => {
//     checkLikeStatus();
//   }, [post_id]);

//   return (
//     <TouchableOpacity onPress={handleLike}>
//       <Icon
//         name={isLiked ? "heart" : "heart-o"}
//         size={20}
//         color={isLiked ? "red" : "#000"}
//       />
//       <Text>
//         {count} {isLiked ? "Liked" : "Like"}
//       </Text>
//     </TouchableOpacity>
//   );
// };

// export default LikeStatus;
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { authApiToken, endpoints } from "../config/Apis";
import { MyUserContext } from "../../App";

const LikeStatus = ({ post_id, count }) => {
  const [isLiked, setIsLiked] = useState();
  const [user, dispatch] = useContext(MyUserContext);
  const [like, setLike] = useState();
  const [countLike, setCountLike] = useState();
  // console.log("postId tại Like status đang như v", post_id);

  const checkLikeStatus = async () => {
    const token = await AsyncStorage.getItem("token");
    const userResponse = await authApiToken(token).get(
      endpoints["checkLikeStatus"](post_id),
    );
    const statusData = userResponse.data;
    // console.log("Lấy được cái này", statusData, post_id);
    setIsLiked(statusData);
  };
  const countLikeStatus = async () => {
    const token = await AsyncStorage.getItem("token");
    const userResponse = await authApiToken(token).get(
      endpoints["countLike"](post_id),
    );
    const statusData = userResponse.data;
    setCountLike(statusData);
  };

  // const handleLike = async () => {
  //   // Gửi yêu cầu API để thực hiện hành động like
  //   // Sau khi thành công, cập nhật giá trị của isLiked

  //   const token = await AsyncStorage.getItem("token");
  //   let formData = new FormData();
  //   formData.append("user_id", user.id);
  //   formData.append("post_id", post_id);

  //   const myLikeStatus = await authApiToken(token).post(
  //     endpoints["createLike"],
  //     formData,
  //     {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     },
  //   );

  //   setIsLiked(!isLiked);
  // };
  const handleLike = async () => {
    const token = await AsyncStorage.getItem("token");
    let formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("post_id", post_id);

    const myLikeStatus = await authApiToken(token).post(
      endpoints["createLike"],
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    const likeStatus = myLikeStatus.data;
    console.log("ở đây mang giá trị trả về", likeStatus);
    countLikeStatus();
    setIsLiked(!isLiked);

    if (likeStatus === "Like") {
      console.log("Đã like thành công!");
    } else if (likeStatus === "Un Like") {
      console.log("Đã unlike thành công!");
    } else {
      console.log("Like thất bại hoặc đã unlike!");
    }
  };

  // Gọi API để kiểm tra xem bài post có được like hay không
  // Sử dụng giá trị isLiked để cập nhật màu sắc của icon

  useEffect(() => {
    countLikeStatus(post_id);
    checkLikeStatus(post_id);
  }, [post_id]);

  return (
    <TouchableOpacity onPress={handleLike}>
      <Icon
        name={isLiked ? "heart" : "heart-o"}
        size={20}
        color={isLiked ? "red" : "#000"}
        style={{ paddingLeft: 14 }}
      />
      <Text>
        {countLike} {isLiked ? "Like" : "Like"}
      </Text>
    </TouchableOpacity>
  );
};

export default LikeStatus;
