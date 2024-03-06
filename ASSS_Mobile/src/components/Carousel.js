import { View } from 'react-native'
import React from 'react'
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
    const images =[
        require('../library/images/home1.png'),
        require('../library/images/home2.png'),
        require('../library/images/home3.png'),
        require('../library/images/home4.png'),
    ]
  return (
    <View>
      <SliderBox
        images={images}
        autoPlay
        circleLoop
        dotColor="#13274F"
        inactiveDotColor="#90A4AE"
        ImageComponentStyle={{
            borderRadius:6,
            width:"94%"
        }}
/>
    </View>
  )
}

export default Carousel