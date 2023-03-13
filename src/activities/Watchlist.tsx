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
 
  useEffect(() => {

    async function fetchData() {
      ///3/account/get-movie-watchlist
      const apiResponse = await fetch("https://api.themoviedb.org/3/account/watchlist/movies?api_key=a5732c67a291e8645cab8e851a3095d9");
      const json = await apiResponse.json();
      console.log(json);
      
    }
    fetchData();
 
  }, []);
   
 
  return (
    <SafeAreaView style={styleSheet.MainContainer}>
 
      <ActivityIndicator
        size="large"
        color="red"
        animating={showIndicator}
        style={styleSheet.activityIndicator} />
      
     
 
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
   
  },
 
  itemText1: {
    fontSize: 18,
    color: 'black',
    width: 100,
    flexGrow: 1,
    flex: 1,
    margin:10
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
    width: width/3,
    height: height/4,
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