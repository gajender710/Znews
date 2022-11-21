
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator   } from '@react-navigation/native-stack';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Header from './src/components/Header';
import Explore from './src/Explore';
import HomeScreen from './src/HomeScreen';




const Stack = createNativeStackNavigator()

const App =() => {


  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Home" component={HomeScreen}  options={{title:'Zentlr' ,
          header:()=><Header/>, headerShadowVisible:false, }}/>
        <Stack.Screen name="Explore" component={Explore}  options={{title:'Zentlr' , headerShown:false,
          headerShadowVisible:false, presentation:'modal' , animation:'slide_from_bottom'}}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;
