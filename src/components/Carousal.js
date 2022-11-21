import { View, Text, Image ,StyleSheet, FlatList, ImageBackground, TouchableNativeFeedback} from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'


const Carousal = () => {

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

    useEffect(()=>{  
        fetchData()
    },[])

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

    const renderItem = (item,index) => {
        return (
            <ImageBackground source={{uri: `${item.urlToImage}`}} style={styles.bg} key={index}>
            <View key={index} style={styles.content} >

            <View style={{alignItems:'flex-end'}}>
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

    <FlatList data={apiData} horizontal={true} renderItem={({item,index})=>renderItem(item,index)}
     style={styles.list}  showsHorizontalScrollIndicator={false}/>        
        
  )
}   

export default Carousal


const styles = StyleSheet.create({
    list:{
        marginLeft:10,
    },
    bg: {
        height:290,
        width:220,
        borderRadius:15,
        marginHorizontal:4,   
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