import { Text, View,StatusBar,Image} from 'react-native'
import React from 'react'
import styles from '../constants/styles'

const Welcome = ({navigation}) => {

  setTimeout(()=>{
    navigation.replace('Onboarding')
  },2000)
  return (
    <View style={styles.welcome} >
      <View >
            <StatusBar barStyle="light-content" hidden={true} backgroundColor="#465bd8" />
            <Image source={require('../library/images/logo1.png')} 
                style={{width:200,height:200, marginLeft:12, paddingBottom:0}}  />    
            <Text style={styles.text} >PiscesHouse</Text>
            
        </View>
        <Text style={styles.text1} >welcome to my House</Text>
    </View>
    
  )
}

export default Welcome

 