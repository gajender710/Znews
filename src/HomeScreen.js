import { View, Text , StyleSheet, ScrollView, TouchableWithoutFeedback, Button, Platform, Dimensions, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import Carousal from './components/Carousal'
import Categories from './components/Categories'

const HomeScreen = ({navigation}) => {

  const handleExplore = () =>{
    //console.log(navigation)
    navigation.navigate('Explore')
  }

  return (
    <>
    <ScrollView style={styles.container}>
      <Carousal/>
        <Text style={styles.topStory}>Top Stories for you</Text>
      <Categories/>
    </ScrollView>
    <TouchableNativeFeedback onPress={handleExplore}>
      <View style={styles.exploreInner}>
        <Icon name="globe" size={20} color="white"/>
        <Text style={styles.exploreButton}>Explore</Text>
      </View>
    </TouchableNativeFeedback>
    
    </>
  )
}

export default HomeScreen


const styles = StyleSheet.create({
  container:{
  },
  topStory:{
    color:'black',
    fontWeight:'500',
    marginTop:20,
    marginHorizontal:10,
  },

  exploreInner:{
    position:'absolute',
    width:10,
    bottom:40,
    marginLeft:'30%',
    flexDirection:'row',
    backgroundColor:'#e56584',
    alignItems:'center',
    paddingHorizontal:18,
    borderRadius:30,
    shadowColor:'black',

  },
  exploreButton:{
    color:'white',
   
    paddingHorizontal:4,
  }

})