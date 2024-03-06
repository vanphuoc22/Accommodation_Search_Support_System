import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const profileStyle = StyleSheet.create({
    viewProfile:{width: '100%', height: '100%', backgroundColor: 'white'},
    textUserName:{
        padding: 10,
        letterSpacing: 1,
        fontSize: 14,
      },
    profileBodyV1:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
    checkdown:{
        fontSize: 20,
        color: 'black',
        paddingHorizontal: 5,
        opacity: 0.5,
      },
      square:{
        fontSize: 25,
        color: 'black',
        paddingHorizontal: 15,
      },
      profileImg:{
        resizeMode: 'cover',
        width: 80,
        height: 80,
        borderRadius: 100,
      },
      flArea:{fontWeight: 'bold', fontSize: 18},
      inputEditProfile:{
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: '#CDCDCD',
      },
      profileImgList:{
        resizeMode: 'cover',
        width: 40,
        height: 40,
        borderRadius: 100,
      }

})

export default profileStyle

 