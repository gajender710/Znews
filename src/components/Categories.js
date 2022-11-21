import { View, Text, ScrollView, Image , TouchableWithoutFeedback, ImageBackground, TouchableNativeFeedback, FlatList} from 'react-native'
import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

import {API_KEY} from "../../config"


const Categories = () => {
    const categoriesList = [{name:"All",selected:true},{name:"Android",selected:false},{name:"Cricket",selected:false},{name:"iPhone",selected:false},{name:"Google",selected:false}];
    const [categories,setCategories] = useState(categoriesList)
    const defaultImageURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png?20220519031949"
    const [apiData , setApiData] = useState([]);

    const fetchData = async(query) =>{
        let url = 'https://newsapi.org/v2/everything?' +
        `q=${query || "All"}&` +
        'from=2022-11-19&' +
        'sortBy=popularity&' +
        'apiKey=d7b2e1a83d6d403cbfbf10c370d07882';
        let data = await fetch(url).then(res=>res.json()).then(d=>{

            console.log(d)    
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
                return {...d,timeDelay:timeDelay,bookmark:false}
            })
            setApiData(newData)
            console.log(apiData)
        })

        .catch((error)=>console.log(error))

    }
    
    useEffect(()=>{  
        fetchData("")
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

    const handleCategory=(item)=>{
        const newData = categories.map((e,index)=>{
            if(item.name == e.name){
                return {...e,selected:true}
            }
            return {...e,selected:false}
        } )

        setCategories(newData)
        fetchData(item.name)
    }
    
    const renderItem = (item,index) =>{
        return(
            <View style={styles.newsCard} key={index}>
            <View style={styles.hBar}> 
                <Text style={[styles.text,{color:'#A9A9A9'}]}>{item.timeDelay}</Text>
                <TouchableNativeFeedback onPress={()=>handleBookmark(item)}>
                    <Icon name="bookmark" size={18}  style={{color: item.bookmark ? "#e56584" : '#D0D0D0'}}/>
                </TouchableNativeFeedback>
                
            </View>
            <View style={styles.hBar}>
                <View style={{width:'50%'}}>
                    <Text style={[styles.text,{fontWeight:'400',fontSize:12}]} numberOfLines={2}>{item.title}</Text>
                    <Text style={[styles.textLight]} numberOfLines={3}>{item.content}</Text>
                </View>
                
                
                <View  style={styles.placeholder}>
                    <Image  source={{uri: `${item.urlToImage || defaultImageURL}`}}  style={styles.image} />
                </View>
                
            </View>
            <View>
                <Text style={[styles.text,{color:'#e56584'}]} numberOfLines={1}>{item.author}</Text>
            </View>

        </View>
        )
    }


  return (
    <>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scroll}>
        {
            categories.map((item,index)=>(
                <TouchableWithoutFeedback key={index} onPress={()=>handleCategory(item,index)}>
                    <Text style={[styles.category,{backgroundColor: item.selected ? "#e56584" : "white" ,
                    color: item.selected? "white" : "black"} ]} >{item.name}</Text>
                </TouchableWithoutFeedback>
            ))
            
        }
      </ScrollView>

      <FlatList data={apiData} renderItem={({item,index})=>renderItem(item,index)} nestedScrollEnabled={true}/>        
        
      </>
      
  )
}

export default Categories


const styles = StyleSheet.create({
    scroll:{
        marginVertical:10,
        marginLeft:20,
    },
    category: {   
        fontSize:10,
        marginHorizontal:6,
        paddingHorizontal:12,
        paddingVertical:4,
        borderRadius:14,
    
    },
   

    text:{
        color:'black',
        fontSize:10,
    },
    textLight:{
        color:'#D0D0D0',
        fontSize:10,
    },
    image:{
        height:100,
        width:130,
        borderRadius:5,
    },
    placeholder:{
        height:100,
        width:130,
        borderRadius:5,
        backgroundColor:'grey',
    },
    newsCard:{
        backgroundColor:'white',
        marginHorizontal:14,
        marginVertical:6,
        padding:12,
        borderRadius:6
    },
    hBar:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical:2
    }

})

