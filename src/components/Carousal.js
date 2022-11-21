import { View, Text, Image ,StyleSheet, FlatList, ImageBackground, TouchableNativeFeedback, Dimensions} from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'


const Carousal = (props) => {

    const [apiData , setApiData] = useState([]);
    const [Bookmarks,setBookmark] = useState([]);

    const fetchData = async() =>{
        console.log(props.url+"!!!!!!!!")
        let url = props.url
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

    useEffect(()=>{  
        fetchData()
    },[])

    const handleBookmark = (item)=>{ 
        const newData = apiData.map((val,)=>{
            if(item.title == val.title){
                    return {...val,bookmark:!val.bookmark}  
            }
            else return val
        } )
        setApiData(newData);        
    }

    const handleBack = () =>{
        props.navigation.pop()
    }

    const renderItem = (item,index) => {
        return (
            <ImageBackground source={{uri: `${item.urlToImage}`}} style={props.explore ? styles.bgExplore : styles.bgHome} key={index}>
            <View key={index} style={styles.content} >

            <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                <View>
                    {props.explore ? 
                        <TouchableNativeFeedback onPress={handleBack} >
                        <Icon  name="arrow-back" size={25}  style={{color:'#D0D0D0'}}/>
                    </TouchableNativeFeedback> : null
                    } 
                </View>
                <TouchableNativeFeedback onPress={()=>handleBookmark(item)}>
                    <Icon  name="bookmark" size={25}  style={{color: item.bookmark ? "#e56584" : '#D0D0D0'}}/>
                </TouchableNativeFeedback> 
            </View>
            <View >
               <Text style={{color:'pink',fontWeight:'400',fontSize:8}} >{item.timeDelay}</Text>
               <Text style={{color:'white',fontWeight:'600',fontSize:12}} numberOfLines={3}>{item.title}</Text>
               <Text style={{color:'#C8C8C8',fontWeight:'500',fontSize:8}} numberOfLines={1}>{item.author}</Text>
               <Text style={{color:'gray',fontWeight:'500',fontSize:8,marginTop:10}}>{item.source.name}</Text>
            </View>


            </View>
        </ImageBackground>
        )
    }

  return (

    <FlatList data={apiData} horizontal={!props.explore} renderItem={({item,index})=>renderItem(item,index)}
     style= {!props.explore ? styles.list : styles.exloreList}  showsHorizontalScrollIndicator={false} nestedScrollEnabled={true}/>        
        
  )
}   

export default Carousal


const styles = StyleSheet.create({
    list:{
        marginLeft:10,
        backgroundColor:'white',
    },
    exloreList:{
        backgroundColor:'black',
    },
    bgHome: {
        height:290,
        width:220,
        borderRadius:15,
        marginHorizontal:4,   
        overflow:'hidden', 
    },
    bgExplore: {
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