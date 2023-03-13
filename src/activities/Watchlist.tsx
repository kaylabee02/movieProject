import { Image } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { NavigationContainer, useRoute,useNavigation } from "@react-navigation/native";
import {Dimensions, ActivityIndicator, View, StyleSheet, SafeAreaView, FlatList, Text,TouchableOpacity } from 'react-native';
import { LoginProps } from '../interface/user';
const width = Dimensions.get('window').width;
const height= Dimensions.get('window').height;
import { connect,ConnectedProps } from 'react-redux';
const connector = connect(mapStateToProps,mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  backgroundColor: string
}
 const  Watchlist =(props: Props) =>{
  const route = useRoute();
  const navigation = useNavigation();
  console.log("PROPS",props);
  
  const [JSON_DATA, setJSON_DATA] = useState('');
 
  const [showIndicator, setShowIndicator] = useState(true);
  const [lines, SETLINES] = useState(5);
  const [textLenth, SETLENTH] = useState('');
  useEffect(() => {

    async function fetchData() {
      const apiResponse = await fetch("https://api.themoviedb.org/3/account/1/watchlist/movies?sort_by=created_at.desc&api_key=a5732c67a291e8645cab8e851a3095d9&session_id="+props.session_id);
      const json = await apiResponse.json();
      console.log(json.results);
      
    //   let dataRev = Object.values(json_reviews.results)
    // for (let index = 0; index < dataRev.length; index++) {
    //   const element = dataRev[index].author_details;
      setJSON_DATA(json.results);
      setShowIndicator(false);
    // }
      
      
    }
    fetchData();
 
  }, []);
  let watch = Object.values(JSON_DATA)
  console.log(watch.length);
  let mapReview = watch.map(item =>{
    
  return (
    <View style={{ flex:0,flexDirection:'row',backgroundColor:'#d1dbe4',
     marginTop:15,height:height/4,borderTopRightRadius:30,borderBottomLeftRadius:30,
     borderTopLeftRadius:5,borderBottomRightRadius:5,alignItems:'center'}}>
      <View style={{margin:10,flex:1.3}}>
         <Image style={styleSheet.tinyLogo}
           source={{
             uri: 'https://image.tmdb.org/t/p/original'+item.poster_path,
           }}/> 
      </View>
      <View style={{flexDirection:'column',flex:2, margin:10,alignSelf:'flex-start',marginTop:25}}>
          <Text style={{fontSize:20, color:'black',marginLeft:10,fontWeight:'bold'}}>{item.title}</Text>
          <Text style={styleSheet.itemText}> {convertValue(item.vote_average)}% </Text>
          <Text style={styleSheet.itemText1}
            numberOfLines={lines}
            onPress={() =>handleSeeMore()}
            ellipsizeMode="middle"
            
              >{item.overview}</Text>
              <Text
                 style={{color:'black',fontStyle:'italic',fontWeight:'800', textDecorationLine:'underline'}}
                onPress={() =>SETLINES(0)}>
                    see more
         </Text>
          
          
      </View>
      <View style={{flex:0.9}}>
      <TouchableOpacity >
                      <Image style={{width:50,height:50,}}
                      source={require('../assets/imgs/rate2.png')}
                        />
                  </TouchableOpacity>
      </View>
    </View>
   )
    
  });
 
  function convertValue (num){
    var discount = num.toFixed(1);
    var str_rating = discount.toString();
    var rating = str_rating.replace(".", "");
  
    return rating;
    
  }
  function handleSeeMore(){
    textLenth
    ? SETLINES(0)
    : SETLINES(5);
  }
   
  return (
    <SafeAreaView style={styleSheet.MainContainer}>
 
      <ActivityIndicator
        size="large"
        color="red"
        animating={showIndicator}
        style={styleSheet.activityIndicator} />

      <View style={{flex:1}}>
         {mapReview}
      </View>
    </SafeAreaView>
  );
}
 
const styleSheet = StyleSheet.create({
  MainContainer: {
    flex: 1,
    margin:20,
    // width:width,
    // padding:10,
   
  },
 
  listItem: {
    justifyContent:'space-between',
    flexDirection:'column',
    alignContent:'space-between',
   alignItems:'center',
  margin:10,
  padding:20
    
   
  },
 
  itemText: {
    fontSize: 18,
    color: 'black',
    marginLeft:10
  },
 
  itemText1: {
    fontSize: 15,
    color: 'black',
    width: 210,
    flexGrow: 1,
    flex: 1,
    marginLeft:10
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
  tinyLogo: {
    width: width/4,
    height: height/8,
    borderRadius:15
  },
 
});
const mapStateToProps = states => {
  return {
    session_id: states.reducer.session_id,
    api_token:states.reducer.api_token,
    request_token:states.reducer.request_token,
    account_id:states.reducer.account_id,
      loggedIn: states.reducer.loggedIn
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateState: (payload) => dispatch({
      type: 'UPDATE_STATE',
      payload: payload
    })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Watchlist);