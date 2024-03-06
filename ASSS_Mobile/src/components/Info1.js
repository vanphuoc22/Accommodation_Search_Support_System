import React,{useState} from 'react'
import { StyleSheet, Text, ScrollView,View,StatusBar,Image,TextInput, TouchableOpacity, ImageBackground} from 'react-native'
import Buttons from '../components/Buttons'
import {Colors} from '../constants'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from '../constants/styles'

const Info1 = () => {
    const [user, setUser] = useState([])
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
  return (
    <View>
        <View style={styles.inputSignUp}>
              <Icon name="user" size={22} color="#818181"/>
              <TextInput style={styles.input}
              placeholder="Enter username" 
              placeholderTextColor="#818181" />
        </View>


        <View style={styles.inputSignUp}>
              <Icon name="user" size={22} color="#818181"/>
              <TextInput style={styles.input}
              placeholder="Enter firstname" 
              placeholderTextColor="#818181" />
        </View>

        <View style={styles.inputSignUp}>
              <Icon name="user" size={22} color="#818181"/>
              <TextInput style={styles.input}
              placeholder="Enter lastname" 
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


        <View style={styles.inputSignUp}>
              <Icon name="lock" size={22} color="#818181"/>
              <TextInput style={styles.input}
              secureTextEntry={true}
              value={password}
              placeholder="Enter Password" 
              onChangeText={text => setPassword(text)}
              placeholderTextColor="#818181" />
            </View>


            <View style={styles.inputSignUp}>
              <Icon name="lock" size={22} color="#818181"/>
              <TextInput style={styles.input}
              secureTextEntry={true}
              value={password}
              placeholder="Enter Password again" 
              onChangeText={text => setPassword(text)}
              placeholderTextColor="#818181" />
            </View>

    </View>
  )
}

export default Info1