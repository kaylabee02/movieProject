// In App.js in a new project

import * as React from 'react';
import { View, Text, Button,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect,ConnectedProps  } from 'react-redux';
import { createStore } from 'redux'

const connector = connect(mapStateToProps,mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  backgroundColor: string
}
//activities
import Home from './activities/Home';
import Movie from './activities/Movie';
import Watchlist from './activities/Watchlist';
import Auth from './activities/Auth';
import Details from './activities/MovieDetails';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const  MyTabs =() =>{
  return (
    <Tab.Navigator  screenOptions={{headerShown:false}} initialRouteName='Home'
    >
      <Tab.Screen name="Home" component={Home} 
       options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }} />
      <Tab.Screen name="Movie" component={Movie} tabBarOptions= {{ 
            showIcon: true }} tabBarIcon={<MaterialCommunityIcons name="home" color={'red'} size={30} />} />
      <Tab.Screen name="Watchlist" component={Watchlist} 
      options={{
        tabBarLabel: 'Watchlist',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home"  size={20} />
        ),
      }}
      
        />
    </Tab.Navigator>
  );
}
const MainStackNavigator = (props:Props) => {
  console.log("ROUTER",props);
    return (
      <Stack.Navigator screenOptions={{
        headerShown: false,
      }} initialRouteName={props.loggedIn == false ? 'Auth' : 'Homey'}>
        <Stack.Screen name="Auth" component={Auth}  />
        <Stack.Screen name="Homey" component={MyTabs} />
        <Stack.Screen name="Details" component={Details}   />
      </Stack.Navigator>
    );
  };
const App=()=> {
  
  return (
    <NavigationContainer>
      
       {/* {false ? <MyTabs /> :  */}
       <MainStackNavigator /> 
       
        
      
    </NavigationContainer>
  );
}

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
)(App)