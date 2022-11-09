import { StatusBar } from 'expo-status-bar';
import react from 'react';
import { StyleSheet, Text, View,ImageBackground, Image, Dimensions,TextInput,TouchableOpacity } from 'react-native';
import COLORS from '../const/color';
import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth';
// import { useNavigation } from '@react-navigation/core';
import { auth } from '../config/firebase';





export default function LoginScreen({navigation}) {

   const [passSecured,setpassSecured]=react.useState(true);
  const [email,setEmail]=react.useState('');
  const [password,setPass]=react.useState('');
  
  // const navigate = useNavigation()

  const login = (()=>{

    signInWithEmailAndPassword(auth, email, password).then(()=>{
      navigation.push('Home');
    }).catch((err)=>{

        console.log(err);
    })
    
})


  return (
    
     <View style={styles.container}>
        <View style={styles.topContainer}>
          <TouchableOpacity
            style={{
                padding:4, 
                backgroundColor:COLORS.primary, 
                width:50, height:50, alignItems:'center',
                justifyContent:'center',
                borderRadius:30
            }}
            onPress={() => navigation.goBack()}
            >
                <Icon name='arrow-back-ios' size={20} style={{color:COLORS.white}}/>
            </TouchableOpacity>
            <Text style={{color:COLORS.primary, fontSize:28,marginTop:30}}>WELCOME</Text>
            <Text style={{color:COLORS.white, fontSize:28,fontWeight:"bold"}}>EATFAST</Text>
        </View>
        <View style={styles.bottomContainer}>

        
        <View style={styles.inputContainer}>


            <View style={styles.inputView}>
            <Ionicons 
                name="mail" 
                size={20} 
                color={COLORS.dark}
                type='font-awesome'
                style={{color:COLORS.primary}}
            />
            <TextInput
            style={{flex:1,paddingHorizontal:12}}
            placeholder={'Enter Email-Address'}
            onChangeText={(email)=>setEmail(email)}
            />
        </View>

        <View style={styles.inputView}>
            <Icon 
                name="lock" 
                size={20} 
                color={COLORS.dark}
                type='font-awesome'
                style={{color:COLORS.primary}}
            />
            <TextInput
            style={{flex:1,paddingHorizontal:12}}
          placeholder={'Enter Password'}
            secureTextEntry={passSecured}
            textContentType='password'
            // value={password}
            onChangeText={pass => setPass(pass)}
            />
            
            <TouchableOpacity
            style={{padding:4}}
            onPress={()=>{
                setpassSecured(!passSecured);
            }}>
                <Ionicons name='eye' size={20} style={{color:COLORS.primary}}/>
            </TouchableOpacity>
        </View>

        <Text style={{
            textAlign:'right',
            color:'#7393B3'
            }}>
            Forgot password?</Text>
        
        

        

        <TouchableOpacity style={{
            backgroundColor:COLORS.primary,
            // width:'60vw',
            height:40,
            alignItems:'center',
            justifyContent:'center',
            marginTop:30,
            borderRadius:20,
            
            }}
            onPress={login}>
            <Text style={{color:COLORS.white,fontSize:16}}>Login</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={{
            textAlign:'center',
            color:'#7393B3'
            }}
            onPress={() => navigation.navigate('Register')}
            >
            <Text style={{
              textAlign:'center',
              color:'#7393B3'
              }}>Don't have an account? Click here</Text>
            </TouchableOpacity>
        </View>

       

        </View>
     </View>
      
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.dark,
    justifyContent:'center',
    // alignItems:"center"
    
    
  },
  topContainer:{
    padding:30,
    height:"35vh",
    paddingTop:50,
  },
  bottomContainer:{
    flex: 1, 
    backgroundColor: COLORS.white,
    borderTopEndRadius:50,
    borderTopStartRadius:50,
    padding:40,
    paddingTop:10,
    alignContent:'center',
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center'

  },
  inputView:{
    height:44,
    backgroundColor:'#f1f3f6',
    borderRadius:8,
    paddingHorizontal:10,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    marginTop:10
   
    
  },
  
  
 
});
