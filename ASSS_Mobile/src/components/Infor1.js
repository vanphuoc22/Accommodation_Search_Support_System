import React,{useState} from 'react'
import { StyleSheet, Text, ScrollView,View,StatusBar,Image,TextInput, TouchableOpacity, ImageBackground} from 'react-native'
import Buttons from './Buttons'
import {Colors} from '../constants'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from '../constants/styles'
import { useEffect } from 'react';

const infor1 = () => {
  return (
    <View>
      <View style={styles.inputSignUp}>
              <Icon name="user" size={22} color="#818181"/>
              <TextInput style={styles.input}
              placeholder="Enter username" 
              placeholderTextColor="#818181" />
            </View>

            <View style={styles.inputSignUp}>
              <Icon name="map" size={22} color="#818181"/>
              <TextInput style={styles.input}
              placeholder="Enter username" 
              placeholderTextColor="#818181" />
            </View>


            <View style={styles.inputSignUp}>
              <Icon name="envelope-o" size={22} color="#818181"/>
              <TextInput style={styles.input}
              value={email} 
              placeholder="Enter Email" 
              onChangeText={text => setEmail(text)}
              placeholderTextColor="#818181" />
            </View>

    </View>
  )
}

export default infor1

