import * as React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/components/homeScreen';
import LoginScreen from './src/components/loginScreen';
import RegisterScreen from './src/components/registerScreen';
import BottomNavigator from './src/const/bottomNav';
import DetailsScreen from './src/components/DetailsScreen';






const Stack = createNativeStackNavigator();
function App() {


  return (

       <NavigationContainer >
            <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: 'Welcome',headerShown:false }}
            />
            <Stack.Screen
              name="Home"
              component={BottomNavigator}
              options={{ title: 'Welcome',headerShown:false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ title: 'Welcome',headerShown:false }}
            />
            <Stack.Screen
              name="detail"
              component={DetailsScreen}
              options={{ title: 'Details',headerShown:false }}
            />
            

            </Stack.Navigator>
    </NavigationContainer>

   
   
  );
}

export default App;
