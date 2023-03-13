import React, {useState, useEffect, useId} from 'react';
import {View, Dimensions,Image, StyleSheet,Text,SafeAreaView,TextInput,TouchableOpacity,Platform} from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginProps} from '../interface/user';
import { NavigationContainer, useRoute,useNavigation } from "@react-navigation/native";
import { connect,ConnectedProps  } from 'react-redux';
import { createStore } from 'redux'
const width = Dimensions.get('window').width;
const height= Dimensions.get('window').height;

const connector = connect(mapStateToProps,mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  backgroundColor: string
}
const Auth = (props: Props) => {
  // Setting up states
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [api_key, setApikey] = useState('');
  const [request_token, setRequestTkn] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  
  // useEffect(() => {
  //   if (loginSuccess) {
  //     // on getting login success navigate user to Home/dashboard screen:
  //     navigation.navigate('Homey');
  //   }
  // }, [loginSuccess]);

  const onChangeUsername = (value: any) => {
    // handle change event of Email textInput:
    setEmail(value);
    
  
  };
  const getAPIData = async () => {
    try {
      const apiResponse = await fetch("https://api.themoviedb.org/3/authentication/token/new?api_key=a5732c67a291e8645cab8e851a3095d9");
      
      const json = await apiResponse.json();
      
      setRequestTkn(json.request_token)
      setApikey("a5732c67a291e8645cab8e851a3095d9");
      console.log("REQAR TS",request_token);
      
      
      
    } catch (error) {
      // setError(error);
    }
  }
  const onChangePassword = (value: any) => {
    // handle change event of password textInput:
    setPassword(value);
  };
  const imageURl =
  'https://c4.wallpaperflare.com/wallpaper/790/555/758/garden-square-square-garden-nature-forests-hd-art-wallpaper-preview.jpg';

  
  const getapikey = (value : any) => {
    setApikey(api_key);
  }

  const onLogin = async () => {
   await getAPIData();
      
      const data = {
        username: username,
        password: password,
        request_token:request_token
      };
    const log=    fetch('https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=a5732c67a291e8645cab8e851a3095d9', {
      method: 'POST',
      headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json'
      },
     body: JSON.stringify({
      username: username,
      password: password,
      request_token:request_token})
     });

     const logs = await log;
     if(logs.status == 200  && logs.ok == true){
        const seonc = await fetch('https://api.themoviedb.org/3/authentication/session/new?api_key=a5732c67a291e8645cab8e851a3095d9', {
          method: 'POST',
         headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
         },
        body: JSON.stringify({
         "request_token":request_token})
        });
        props.updateState({ target: 'loggedIn', value: true});
        const sessid= await seonc.json()
        const json =  sessid.session_id;
        if(sessid.success == true){
          const acct =  await fetch("https://api.themoviedb.org/3/account?api_key=a5732c67a291e8645cab8e851a3095d9&session_id="+json,{
          method:'GET'});
      
          const alg = await acct.json();
          console.log(alg.id);
          if(alg.id != ""){
            console.log(  "acct",acct);
            
          
            props.updateState({target: 'loggedIn',value:true})
            props.updateState({target:"request_token",value:request_token})
            props.updateState({target:"api_token",value:api_key})
            props.updateState({target:"account_id",value:alg.id})
            props.updateState({target:"session_id",value:json})
          navigation.navigate("Homey",{
                    screen: 'Home',
                    params: { session_id: json ,account_id:alg.id}});
                console.log(json,"AAa");
          }
          
        }else{

        }
        
        
     }
      
  };


  

  return (
    <View style={styles.containerView}>
      <SafeAreaView style={styles.containerView}>
          <View style={{flex:11,justifyContent: 'center',
             alignItems: 'center',}}>
          <Image style={styles.img} source={{uri: imageURl}} />
          </View>
          <View style={styles.mainView}>
            <View >
            
            <TextInput
              onChangeText={text => onChangeUsername(text)}
              placeholder="Username"
              value={username}
              style={styles.textInput}
            />
            <TextInput
              onChangeText={text => onChangePassword(text)}
              placeholder="Password"
              value={password}
              style={styles.textInput}
            />
            </View>
          
          </View>
          <View style={{ flex:2,  justifyContent: 'center',
      alignItems: 'center',margin:10,width:width,}} >
          
            <TouchableOpacity onPress={ onLogin} style={{
                height: 50,alignItems:'center',justifyContent:'center',
                backgroundColor:'green', padding:10,
                borderRadius: 10,width:width/2}}>
                       <Text>LOGIN</Text>
                      </TouchableOpacity>
                      </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
containerView: {
  flex: 1,
  backgroundColor: 'white',
  flexDirection:'column'
},
mainView: {
  flex: 4,
  justifyContent: 'center',
  backgroundColor:'white',
  borderTopRightRadius:25,
  borderTopLeftRadius:25
},
img: {

        width: width,
        height: height-200,
  
},
title: {
  fontSize: 18,
  marginVertical: 30,
  color: 'gray',
  alignSelf: 'center',
  
},
textInput: {
  height:50,
  padding: 10,
  margin:10,
  color: '#05375a',
  borderWidth:2,
  borderRadius:8
},
})

// export container
const mapStateToProps = states => {
  console.log(states);
  
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

export default connector(Auth);