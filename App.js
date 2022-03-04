import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
//import { StyleSheet, View } from 'react-native';
import Details from './pages/Details';
import Home from './pages/Home';

    //<View style={styles.container}>
        //<Home></Home> 
        //<StatusBar hidden={true} style="auto" />
    //</View>

const Stack = createNativeStackNavigator();

export default function App() {
  return( 
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
        <Stack.Screen name="Details" component={Details} options={{title:"Détails"}} />
      </Stack.Navigator>
      <StatusBar hidden={true} style="auto" />
    </NavigationContainer>
  )
}  

//const styles = StyleSheet.create({
  //container: {
    //flex: 1,
    //backgroundColor: '#fff',
  //},
//});


/*
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Home from './pages/Home';
import Background from './assets/background.jpg';
import { ImageBackground } from 'react-native';

export default function App() {
  return( 
    <View style={styles.container}>
      <ImageBackground source={Background} resizeMode="cover" style={styles.background}>
      <Home></Home> 
      </ImageBackground>
      <StatusBar hidden={true} style="auto" />
    </View>
  )
}  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  background: {
    flex:1,
  },
});
*/
