import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Details from './pages/Details';
import Home from './pages/Home';
import Bookmarks from './pages/Bookmarks';
import Shop from './pages/Shop';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import actions from './reducers/actions';

const Stack = createNativeStackNavigator();

const Router = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem('bookmarks')
      .then((jsonBookmarks) => {
        const bookmarks = JSON.parse(jsonBookmarks || "[]");
        console.log(bookmarks);
        dispatch({ type: actions.REPLACE_BOOKMARKS, payload: bookmarks });
      }).catch( (err) => { console.log(err.message); } )
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={Details} options={{ title: "Détails" }} />
        <Stack.Screen name="Bookmarks" component={Bookmarks} options={{ title: "Mes jeux" }} />
        <Stack.Screen name="Shop" component={Shop} options={{ title: "Mon magasin" }} />
      </Stack.Navigator>
    </NavigationContainer>
  )

}

export default Router;
