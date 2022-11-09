
import react from 'react';
import { StyleSheet, Text, View,ImageBackground, Image, Dimensions,TextInput,TouchableOpacity } from 'react-native';
import COLORS from '../const/color';
import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { auth } from '../config/firebase';
import {createUserWithEmailAndPassword, updateProfile,getAuth} from 'firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import useNavigation from '@react-navigation/native';





export default function RegisterScreen({navigation}) {

    const [passSecured,setpassSecured]=react.useState(true);
    const [uid,setUid]=react.useState('');
    const [email,setEmail]=react.useState('');
    const [password,setPass]=react.useState('');
    const [confirmPassword,setConfirmedPassword]=react.useState('');
    const[user,setUser]=react.useState('');
    // const auth = getAuth()

    // const navigate = useNavigation()
    

    const register = ()=>{
        
          createUserWithEmailAndPassword(auth, email, password).then(async(userCredential)=>{

            const displayName = uid;
            setUser(()=>({...userCredential.user}));

             updateProfile(auth.currentUser, {displayName:displayName}).then().catch();
            alert(displayName+ "successfull")
            navigation.push('Home',{user:{user}})
        }).catch((error)=>{
            alert(error);
            console.log(error)
        })
        
    }
    


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
                    name="person" 
                    size={20} 
                    color={COLORS.dark}
                    type='font-awesome'
                    style={{color:COLORS.primary}}
                />
                <TextInput
                style={{flex:1,paddingHorizontal:12}}
                placeholder={'Enter username'}
                onChangeText={(uid)=>setUid(uid)}
                />
            </View>

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
            onChangeText={(pass)=>setPass(pass)}
            />
            
            <TouchableOpacity
            style={{padding:4}}
            onPress={()=>{
                setpassSecured(!passSecured);
            }}>
                <Ionicons name='eye' size={20} style={{color:COLORS.primary}}/>
            </TouchableOpacity>
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
            placeholder={'confirm Password'}
            secureTextEntry={passSecured}
            textContentType='password'
            onChangeText={(e)=>setConfirmedPassword(e)}
            />
            
            <TouchableOpacity
            style={{padding:4}}
            onPress={()=>{
                setpassSecured(!passSecured);
            }}>
                <Ionicons name='eye' size={20} style={{color:COLORS.primary}}/>
            </TouchableOpacity>
        </View>

        <TouchableOpacity style={{
            backgroundColor:COLORS.primary,
            // width:'60vw',
            height:40,
            alignItems:'center',
            justifyContent:'center',
            marginTop:20,
            borderRadius:20,
            
            }}
            onPress={register}>
            <Text style={{color:COLORS.white,fontSize:16}}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
            textAlign:'center',
            color:'#7393B3'
            }}
            onPress={() => navigation.push('Login')}
            >
            <Text style={{
            textAlign:'center',
            color:'#7393B3'
            }}
            >Click here to Login</Text>
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
    paddingTop:40,
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
