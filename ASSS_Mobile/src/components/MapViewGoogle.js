import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import MapView from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import { Colors } from "react-native-paper";

const MapViewGoogle = () => {
  useEffect(() => {
    requestCameraPermission();
  }, []);
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the LOCATION");
      } else {
        console.log("LOCATION permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };
  return (
    <View>
      <View Style={{ flex: 1 }}>
        <MapView
          style={{ with: "100%", height: "100%" }}
          initialRegion={{
            latitude: 10.833767,
            longitude: 106.678997,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onRegionChange={(x) => {
            console.log(x);
          }}></MapView>
        <TouchableOpacity
          style={{
            width: "90%",
            height: 50,
            alignSelf: "center",
            position: "absolute",
            bottom: 20,
            backgroundColor: "#00504B",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            getLocation();
          }}>
          <Text>Get current location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MapViewGoogle;

// -----------------------------------------------------
// import { View, Text } from "react-native";
// import React, { useEffect, useState } from "react";
// import MapView from "react-native-maps";
// import Geolocation from "@react-native-community/geolocation";

// const MapViewGoogle = () => {
//   const [initialRegion, setInitialRegion] = useState(null);

//   useEffect(() => {
//     // Lấy vị trí hiện tại
//     Geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         const region = {
//           latitude,
//           longitude,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         };
//         setInitialRegion(region);
//       },
//       (error) => {
//         console.log(error);
//       },
//     );
//   }, []);

//   return (
//     <View style={{ flex: 1 }}>
//       {initialRegion && (
//         <MapView
//           style={{ width: "100%", height: "100%" }}
//           initialRegion={initialRegion}
//           onRegionChange={(x) => {
//             console.log(x);
//           }}
//         />
//       )}
//     </View>
//   );
// };

// export default MapViewGoogle;
