// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View, SafeAreaView, Button, Image } from 'react-native';
// import { useEffect, useRef, useState } from 'react';
// import { Camera } from 'expo-camera';
// import { shareAsync } from 'expo-sharing';
// import * as MediaLibrary from 'expo-media-library';

// export default function TakeAPhoto() {
//     let cameraRef = useRef();
//     const [hasCameraPermission, setHasCameraPermission] = useState();
//     const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
//     const [photo, setPhoto] = useState();

//     useEffect(() => {
//       (async () => {
//         const cameraPermission = await Camera.requestCameraPermissionsAsync();
//         const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
//         setHasCameraPermission(cameraPermission.status === "granted");
//         setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
//       })();
//     }, []);

//     if (hasCameraPermission === undefined) {
//       return <Text>Requesting permissions...</Text>
//     } else if (!hasCameraPermission) {
//       return <Text>Permission for camera not granted. Please change this in settings.</Text>
//     }

//     let takePic = async () => {
//       let options = {
//         quality: 1,
//         base64: true,
//         exif: false
//       };

//       let newPhoto = await cameraRef.current.takePictureAsync(options);
//       setPhoto(newPhoto);
//     };

//     if (photo) {
//       let sharePic = () => {
//         shareAsync(photo.uri).then(() => {
//           setPhoto(undefined);
//         });
//       };

//       let savePhoto = () => {
//         MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
//           setPhoto(undefined);
//         });
//       };

//       return (
//         <SafeAreaView style={styles.container}>
//           <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
//           <Button title="Share" onPress={sharePic} />
//           {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} /> : undefined}
//           <Button title="Discard" onPress={() => setPhoto(undefined)} />
//         </SafeAreaView>
//       );
//     }
//   return (
//     <Camera style={styles.container} ref={cameraRef}>
//       <View style={styles.buttonContainer}>
//         <Button title="Take Pic" onPress={takePic} />
//       </View>
//       <StatusBar style="auto" />
//     </Camera>
//   )
// }
// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     buttonContainer: {
//       backgroundColor: '#fff',
//       alignSelf: 'flex-end'
//     },
//     preview: {
//       alignSelf: 'stretch',
//       flex: 1
//     }
//   });
import React, { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  Image,
} from "react-native";
import ImagePicker from "react-native-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { authApiToken, endpoints } from "../config/Apis";

export default function TakeAPhoto({ navigation, dispatch }) {
  const cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  const pickImage = async () => {
    const token = await AsyncStorage.getItem("token");
    let result = await ImagePicker.launchImageLibrary({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (result.canceled) {
      return;
    }

    const localUri = result.assets[0].uri;
    setPhoto({ uri: localUri });

    const filename = localUri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;

    const formData = new FormData();
    formData.append("avatar", { uri: localUri, name: filename, type });

    try {
      const res = await authApiToken(token).patch(
        endpoints["updateAvt"],
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      navigation.goBack();
      await AsyncStorage.setItem("user", JSON.stringify(res.data));
      dispatch({ type: "login", payload: res.data });
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const sharePic = () => {
    shareAsync(photo.uri).then(() => {
      setPhoto(undefined);
    });
  };

  const savePhoto = async () => {
    // Lưu ảnh xuống thư viện
    await MediaLibrary.saveToLibraryAsync(photo.uri);

    // Gọi API để truyền ảnh xuống server
    const token = await AsyncStorage.getItem("token");

    const filename = photo.uri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;

    const formData = new FormData();
    formData.append("avatar", { uri: photo.uri, name: filename, type });

    try {
      const res = await authApiToken(token).patch(
        endpoints["updateAvt"],
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      navigation.goBack();
      await AsyncStorage.setItem("user", JSON.stringify(res.data));
      dispatch({ type: "login", payload: res.data });
    } catch (error) {
      console.error("Upload error:", error);
    }

    // Xóa ảnh khỏi state sau khi đã lưu và gọi API thành công
    setPhoto(undefined);
  };

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {photo ? (
        <>
          <Image style={styles.preview} source={photo} />
          <Button title="Share" onPress={sharePic} />
          {hasMediaLibraryPermission ? (
            <Button title="Save" onPress={savePhoto} />
          ) : undefined}
          <Button title="Discard" onPress={() => setPhoto(undefined)} />
        </>
      ) : (
        <Camera style={styles.container} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <Button title="Take Picture" onPress={takePicture} />
            <Button title="Pick Image" onPress={pickImage} />
          </View>
        </Camera>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
});
