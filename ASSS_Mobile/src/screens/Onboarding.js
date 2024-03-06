import { StyleSheet, Text, View,StatusBar,Image,ImageBackground,TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../constants/styles'
import Buttons from '../components/Buttons'
import { Colors } from '../constants'

const Onboarding = ({navigation}) => {
  return (
    <View style={styles.onboarding} >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.imgOnboarding} >
                <ImageBackground source={require('../library/images/handshake.png')}
                style={{flex:1,width:'100%', backgroundColor: Colors.background}}  />
            </View>

            <View style={styles.btOnBoard}>
              {/* {text} */}
              
              <View style={{flex:1,flexDirection:'column',justifyContent:'flex-start',alignItems:'center',backgroundColor:Colors.background}} >
                    <Text style={{color:Colors.green,fontSize:30}} >PiscesHouse</Text>
                    <Text style={{maxWidth:'50%',color:"#999",fontSize:14, textAlign:'center',paddingTop:10}} >All new in one place, be the first to know last new</Text>
                </View> 
              <View style={{flex:1,flexDirection:'column',justifyContent:'flex-end',alignItems:'center', margin:10}}>
                    <Buttons btn_text={"Get Started"} on_press={()=>navigation.navigate("Login")} />
              </View>
              <View style={{paddingBottom:20}}>

              </View>

            </View>
      

    </View>
  )
}

export default Onboarding

