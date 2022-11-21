import { View, Text, Image ,StyleSheet, ScrollView, ImageBackground, TouchableNativeFeedback, Dimensions, FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'


const Explore = ({navigation}) => {

    const [apiData , setApiData] = useState([]);
    const [Bookmarks,setBookmark] = useState([]);

    const fetchData = async() =>{
        let url = 'https://newsapi.org/v2/everything?' +
        'q=Apple&' +
        'from=2022-11-19&' +
        'sortBy=popularity&' +
        'apiKey=d7b2e1a83d6d403cbfbf10c370d07882';
        let data = await fetch(url).then(res=>res.json()).then(d=>{

            let newData =  d.articles.map((d,index)=>{
                let newDate = new Date(d.publishedAt)
                var curDate = new Date();
                var timeDelay = (newDate.getTime() - curDate.getTime())/1000 ;

                timeDelay=Math.abs( Math.round( timeDelay/(60*60) ));
                if(timeDelay<24)
                {
                    timeDelay+= " hour ago"
                }
                else 
                {
                    timeDelay/=24;
                    timeDelay = Math.round(timeDelay)
                    timeDelay+= " day ago"
                }
                return {...d, timeDelay:timeDelay,bookmark:false }
            })
            setApiData(newData)
            //console.log(apiData)
        })
        .catch((error)=>console.log(error))

    }

    const renderItem = (item,index) =>{
      const {source , title , timeDelay , bookmark, content } = item
      return (
      <ImageBackground source={{uri: `${item.urlToImage}`}} style={styles.bg} key={index}>
                <View key={index} style={styles.content} >

                <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                    <TouchableNativeFeedback onPress={handleBack}>
                        <Icon  name="arrow-back" size={25}  style={{color:'#D0D0D0'}}/>
                        
                    </TouchableNativeFeedback> 

                    <TouchableNativeFeedback onPress={()=>handleBookmark(item)}>
                        <Icon  name="bookmark" size={25}  style={{color: bookmark ? "#e56584" : '#D0D0D0'}}/>
                        
                    </TouchableNativeFeedback> 
                </View>
                <View >
                   <Text style={{color:'pink',fontWeight:'400',fontSize:8}} >{timeDelay}</Text>
                   <Text style={{color:'white',fontWeight:'600',fontSize:12}} numberOfLines={3}>{title}</Text>
                   <Text style={{color:'#C8C8C8',fontWeight:'500',fontSize:8}} >{content}</Text>
                   <Text style={{color:'gray',fontWeight:'500',fontSize:8,marginTop:10}}>{source.name}</Text>
                </View>


                </View>
            </ImageBackground>
      )
    }

    useEffect(()=>{  
        fetchData()
    },[])

    const handleBack = () =>{
        navigation.pop()
    }

    const handleBookmark = (item)=>{ 
        const newData = apiData.map((val,)=>{
            if(item.title == val.title){
                console.log(item.title)
                console.log(val.title)
                    return {...val,bookmark:!val.bookmark}  
            }
            else return val
        } )
        console.log("click "+newData)
        setApiData(newData);        
    }


  return (    
        <FlatList data={apiData} renderItem={({item,index})=>renderItem(item,index)} style={{backgroundColor:'black'}} />        
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