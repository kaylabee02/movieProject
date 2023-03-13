import { Avatar, ListItem } from '@rneui/base';
import { Image } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { NavigationContainer, useRoute,useNavigation } from "@react-navigation/native";
import type {PropsWithChildren} from 'react';
 
import { ActivityIndicator, View, StyleSheet, SafeAreaView, ScrollView, Text,Dimensions, FlatList,TouchableOpacity } from 'react-native';
import { LoginProps } from '../interface/user';
const width = Dimensions.get('window').width;
const height= Dimensions.get('window').height;

const MovieDetails = () => {
  const route = useRoute();
  const nav = useNavigation();
  
  console.log("MOVVV",route.params);
  

const [JSON_DATA, setJSON_DATA] = useState('');
const [JSON_DATA_GENRES, setJSON_DATA_GENRES] = useState('');
const [JSON_DATA_REVIEW, setJSON_DATA_REVIEW] = useState('');
const [JSON_DATA_AUTHor_DETAILS, setJSON_DATA_AUTHOR_DETAILS] = useState('');
const [showIndicator, setShowIndicator] = useState(true);
const [lines, SETLINES] = useState(5);
const [textLenth, SETLENTH] = useState('');
const [yeardate, SETYEAR] = useState('');
const [movieid, SETMOVIEID] = useState('');
const [rate, SETRATE] = useState('');


let myLoop = []; // Declaring an array
useEffect(() => {
  async function fetchData() {
    SETMOVIEID(String(route.params.id));
  // console.log("THIS ID j", String(movieid));
    const movid =String(route.params.id);
    // ttps://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key=<<api_key>>&language=en-US&page=1
    const apiResponse = await fetch("https://api.themoviedb.org/3/movie/"+movid+"?api_key=a5732c67a291e8645cab8e851a3095d9&language=en-US");
    const reviews = await fetch("https://api.themoviedb.org/3/movie/"+movid+"/reviews?api_key=a5732c67a291e8645cab8e851a3095d9&language=en-US");
    const json = await apiResponse.json();
    const json_reviews = await reviews.json();
    const avg = await json.vote_average;
    console.log("apiResponse",apiResponse);
    
 
    let dataRev = Object.values(json_reviews.results)
    for (let index = 0; index < dataRev.length; index++) {
      const element = dataRev[index].author_details;
      setJSON_DATA_AUTHOR_DETAILS(element);
      
    }
    
    setJSON_DATA_GENRES(json.genres);
    setJSON_DATA_REVIEW(json_reviews.results);
    setJSON_DATA(json);
    setShowIndicator(false);
    SETRATE(convertValue(avg));
   
  //  const ff = convertValue(JSON_DATA.vote_average)
  
  }
fetchData();

}, []);

let dataKeys = Object.values(JSON_DATA_GENRES)
let newData = dataKeys.map(item => {


return (
  <View style={{justifyContent:'center',marginLeft:10}}>

    <Text style={{fontStyle:'normal',fontSize:15}}>{item.name}</Text></View>
    
 

)

})
 
function handleSeeMore(){
  textLenth
  ? SETLINES(0)
  : SETLINES(5);
}
 
let reviewData = Object.values(JSON_DATA_REVIEW)
console.log(reviewData.length);

let mapReview = reviewData.map(item =>{
  

  return (
   <View style={{flex:0.1, flexDirection:'row',backgroundColor:'#d1dbe4', marginTop:5}}>
     <View style={{margin:10}}>
        <Image style={styleSheet.tinyLogo}
          source={{
            uri: 'https://image.tmdb.org/t/p/original'+item.author_details['avatar_path'],
          }}/> 
     </View>
     <View style={{flexDirection:'column', margin:10}}>
          <Text style={{fontSize:18, color:'black'}}>{"A review by "+item.author}</Text>
          <Text>{"Written by "+item.author_details['username'] + " on "+ formatDate(item.created_at)}</Text>
          <Text style={styleSheet.itemText2}
            numberOfLines={lines}
            onPress={() =>handleSeeMore()}
            ellipsizeMode="middle"
            
              >{item.content}</Text>
              <Text
                 style={{color:'black',fontStyle:'italic',fontWeight:'800', textDecorationLine:'underline'}}
                onPress={() =>SETLINES(0)}>
                    read the rest
         </Text>
         
     </View>
   </View>
  )
  
})
  

const header = () => {
  return (
    <View style={{flex:1.5,
      backgroundColor:'orange'}}>

      <Text style={{ fontSize: 24, color: 'white' }}>buttn text</Text>
       <Text style={{ fontSize: 24, color: 'white' }}>buttn text</Text>

     </View>
  );
}
function formatDate(string){
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(string).toLocaleDateString([],options);
}
function year(string){
  let date: Date = new Date(string);  

return date.getFullYear();
  
  // return new Date(string).toLocaleDateString([],options);
}



 function convertValue (num){
  
  var discount = num.toFixed(1);
  var str_rating =  discount.toString();
  var rating = str_rating.replace(".", "");

  return rating;
  
}
async function rateMovie(){
  console.log(route.params.account_id);
  await fetch("https://api.themoviedb.org/3/account/"+route.params.id+"/watchlist?api_key=a5732c67a291e8645cab8e851a3095d9&session_id="+route.params.session_id, {
         method: 'POST',
        headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json'
        },
       body: JSON.stringify({
        "media_type": "movie",
      "media_id": 11,
      "watchlist": true})
       }).then((response) => response.json())
       .then((responseJson) => {
          if(responseJson.success== true){
            console.log(responseJson.status_message);
            
          }
          
       
      });
            
}
return (
  <SafeAreaView style={styleSheet.MainContainer}>

    <ActivityIndicator
    size="large"
    color="red"
    animating={showIndicator}
    style={styleSheet.activityIndicator} />
    <View style={{flex:0.0,justifyContent:"flex-start",marginBottom:20}}>
       <TouchableOpacity >
       <Image  style={{marginLeft:20, marginTop:20, width:20,height:20}}source={require('../assets/imgs/back.png')}/>
         </TouchableOpacity> 
      </View>
    <View style={{flex: 1,flexDirection:'column',borderTopLeftRadius:2}}>
      
      <View style={{flex: 1.8,flexDirection:'column'}} >
      
        <Image
            style={styleSheet.image}
            source={{
            uri: 'https://image.tmdb.org/t/p/original'+JSON_DATA.poster_path,
            }}/> 
       
      </View>
      
      <View style={{flex:0.3, justifyContent:"space-evenly",flexDirection:'row',backgroundColor:'#a3b7ca',
      borderTopRightRadius:50,borderTopLeftRadius:50}}>
                  <View style={{borderWidth:4,borderColor:'black',borderRadius:50,width:50,height:50,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:20,fontWeight:"bold"}}>{rate}%</Text>
                  </View>
                  <TouchableOpacity >
                      <Image style={{width:50,height:50,}}
                      source={require('../assets/imgs/rate2.png')}
                        />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={rateMovie}>
                      <Image style={{width:50,height:50}}
                      source={require('../assets/imgs/watch2.png')} />
                  </TouchableOpacity>
                 
        </View>
   
          
      <ScrollView style={{flex:2,backgroundColor:'#e8eef1'}}>
        <View style={{flex: 1, backgroundColor:'#a3b7ca', alignItems:'center'}} >
            <View style={{margin:10,padding:2}}>
              <Text style={styleSheet.itemText}>{JSON_DATA.title+"("+year(JSON_DATA.release_date)+")"}</Text>
              <Text style={[styleSheet.itemText,{fontStyle:'italic'}]}>{JSON_DATA.tagline}</Text>
            </View>
            <Text>{JSON_DATA.release_date}</Text>
            <View style={{margin:10,flexDirection:'row'}}>
             
                  
                  {newData} 
                
            </View> 
            <View style={{margin:20}}>
              <Text style={{fontSize:20,fontWeight:"bold", color:'black'}}>Overview</Text>
              <Text style={{marginTop:1,fontWeight:'600',fontSize:15}}> {JSON_DATA.overview}</Text>
            </View>
            <View style={{margin:20}}>
               <Text style={{fontSize:20,fontWeight:"bold", color:'black'}}>SOCIAL </Text>
               {/* <Text>{route.params.title}</Text>
               <Text>{route.params.id}</Text> */}

               {
                 reviewData.length == 0 ? <Text style={{fontSize:18}}>Reviews 0</Text> : <Text style={{fontSize:18}}>{"Reviews "+reviewData.length}</Text>
               }
               {mapReview} 
            </View>
        
      
          </View>
      </ScrollView>
    </View>
  </SafeAreaView>
);
}

const styleSheet = StyleSheet.create({
MainContainer: {
flex: 1,
// backgroundColor:'#e8eef1'
// padding:20
},

listItem: {
  padding:10,
  margin:1,
  flex:1,
  flexDirection:'row',
  alignSelf:'baseline',
  backgroundColor:'#d1dbe4',
  width: width,

},

itemText: {
fontSize: 24,
color: 'black',

},

itemText2: {
  flexWrap:'wrap',
  flex:1,
  width:width/2,
  marginRight:10,
  marginTop:15
},
activityIndicator: {
position: 'absolute',
alignItems: 'center',
justifyContent: 'center',
left: 0,
right: 0,
top: 0,
bottom: 0,
},  
image: {
width: width,
height: height/2+90,

},
mainContainer:{
flex:1,
flexDirection:'column',

},
tinyLogo: {
  width: 70,
  height: 70,
  borderRadius:50
},

});

export default MovieDetails;