import { View, Text } from "react-native";
import React from "react";
import MapView from "react-native-maps";

const GoogleMapView = () => {
  return (
    <View Style={{ flex: 1 }}>
      <MapView
        style={{ with: "100%", height: "100%" }}
        initialRegion={{
          latitude: 10.833767,
          longitude: 106.678997,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
};

export default MapView;
