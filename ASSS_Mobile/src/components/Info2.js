import React,{useState} from 'react'
import { StyleSheet, Text, ScrollView,View,StatusBar,Image,TextInput, TouchableOpacity, ImageBackground, Button} from 'react-native'
import Buttons from '../components/Buttons'
import {Colors} from '../constants'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from '../constants/styles'
import Date from '../components/Date'


const Info2 = () => {
 
  return (
    <View>
      <View style={styles.inputSignUp}>
              <Icon name="phone" size={22} color="#818181"/>
              <TextInput style={styles.input}
              placeholder="Enter number phone" 
              placeholderTextColor="#818181" />
            </View>

            <View style={styles.inputSignUp}>
              <Icon name="map" size={22} color="#818181"/>
              <TextInput style={styles.input}
              placeholder="Enter address" 
              placeholderTextColor="#818181" />
            </View>


            <View style={styles.inputSignUp}>
              <Icon name="calendar" size={22} color="#818181"/>
              <TextInput style={styles.input}
              placeholder="Để tạm ở đây sau thêm date" 
              placeholderTextColor="#818181" />
            </View>

            {/* <Date/> */}
    </View>
  )
}

export default Info2