import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

const Header = () => {
  return (
    <View style={styles.headerBox}>
        <Icon name="menu" size={30} color="black"/>
        <Text style={styles.text}>Zintlr News</Text>
        <Icon name="search" size={30} color="black"/>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    headerBox:{
        flexDirection:'row',
        height:60,
        backgroundColor:'white',
        paddingHorizontal:6,
        justifyContent:'space-between',
        alignItems:'center',
    },
    text:{
        color:'black',
        fontSize:15,
        fontWeight:'600',
    }
})