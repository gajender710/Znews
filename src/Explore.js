import { View, Text, Image ,StyleSheet, ScrollView, ImageBackground, TouchableNativeFeedback, Dimensions, FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import Carousal from './components/Carousal';


const Explore = ({navigation}) => {

    let headlineUrl =  'https://newsapi.org/v2/everything?' +
    'q=Apple&' +
    'from=2022-11-19&' +
    'sortBy=popularity&' +
    'apiKey=d7b2e1a83d6d403cbfbf10c370d07882';

    const handleBack = () =>{
        navigation.pop()
    }
 
  return (    
        <Carousal url = {headlineUrl} explore = {true} navigation={navigation}/>        
  )
}   

export default Explore


const styles = StyleSheet.create({
    bg: {
        height:Dimensions.get('window').height,
        width:Dimensions.get('window').width,
        borderRadius:15,
        overflow:'hidden', 
    },
    content:{
        flex:1,
        backgroundColor:'rgba(0,0,0,0.5)',
        overflow:'hidden',
        borderRadius:10,
        justifyContent:'space-between',
        padding:8,
        
    },
    bookmark:{
        marginTop:10,
        height:20,
    }

})