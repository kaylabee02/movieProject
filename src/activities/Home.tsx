import { Image } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { NavigationContainer, useRoute,useNavigation } from "@react-navigation/native";
import {Dimensions, ActivityIndicator, View, StyleSheet, SafeAreaView, FlatList, Text,TouchableOpacity } from 'react-native';
import { LoginProps } from '../interface/user';
import { connect,ConnectedProps } from 'react-redux';
const connector = connect(mapStateToProps,mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  backgroundColor: string
}
const width = Dimensions.get('window').width;
const height= Dimensions.get('window').height;

 const  Home =(props: Props) =>{
  const route = useRoute();
  const navigation = useNavigation();
  console.log("HAHAH",props.request_token);
  
  const [JSON_DATA, setJSON_DATA] = useState('');
 
  const [showIndicator, setShowIndicator] = useState(true);
 
  useEffect(() => {

    async function fetchData() {
      const apiResponse = await fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=a5732c67a291e8645cab8e851a3095d9");
      const json = await apiResponse.json();
      console.log(json.results);
      
      
        setJSON_DATA(json.results);
        setShowIndicator(false);
      // });
    }
    fetchData();
 
  }, []);
   const datVal = JSON_DATA;
  const ItemRender = ({item}: {item: datVal}) => (
  
    

    
    <View style={styleSheet.listItem}>
      <TouchableOpacity onPress={()=>toView(item.id)} >
      <Image
       style={styleSheet.tinyLogo}
        source={{
          uri: 'https://image.tmdb.org/t/p/original'+item.poster_path,
        }}
        
      /> 
      </TouchableOpacity>
      
      <Text style={styleSheet.itemText1} numberOfLines={2}> {item.title} </Text>
      <Text style={styleSheet.itemText}> {convertValue(item.vote_average)}% </Text>
      <Text style={styleSheet.itemText}> {item.release_date} </Text>
    </View>
    
  );
  function toView(id){
    console.log("heheh", "'"+id+"'");
    navigation.navigate("Details",{
      title:'PLEASE',
      id: id,
      account_id:props.route.params.account_id,
      session_id:props.route.params.session_id
    });

  }
function convertValue (num){
  var discount = num.toFixed(1);
  var str_rating = discount.toString();
  var rating = str_rating.replace(".", "");

  return rating;
  
}
  const header = () => {
    return (
      <View style={{
        height: 50,
        width: "100%",
        backgroundColor: "#00B8D4",
        justifyContent: 'center',
        alignItems: 'center'
      }}>
 
        <Text style={{ fontSize: 24, color: 'white' }}> JSON FlatList in React Native </Text>
 
      </View>
    );
  }

 
  return (
    <SafeAreaView style={styleSheet.MainContainer}>
 
      <ActivityIndicator
        size="large"
        color="red"
        animating={showIndicator}
        style={styleSheet.activityIndicator} />
      <View style={{justifyContent:'center',alignSelf:'center'}}>
      <FlatList
        data={JSON_DATA}
        renderItem={ItemRender}
        // ItemSeparatorComponent={divider}
        keyExtractor={item => item.id}
        // ListHeaderComponent={header}
        numColumns={2}
        key={4}
      />
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
)(Home);