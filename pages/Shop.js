import { useEffect, useState } from "react"
import { Text, View } from "react-native"
import * as Location from 'expo-location';
//import distFrom from 'distance-from';
//const distFrom = require('distance-from');
import haversine from 'haversine-distance'

const Shop = ({ }) => {

  const [myShop, setMyShop] = useState(false);

  useEffect(() => {
    fetch('https://www.formacitron.com/gps-api/selection.json')
      .then(response => response.json())
      .then((shops) => {
        console.log(shops.length + " shops loaded");
        Location.requestForegroundPermissionsAsync()
          .then((status) => {
            if (status.status !== 'granted') {
              alert('Permission to access location was denied');
              return;
            }

            Location.getCurrentPositionAsync({})
              .then((location) => {
                let closestShop = null;
                let best = 1000000;
                const here = { latitude: location.coords.latitude, longitude: location.coords.longitude};
                for (const shop of shops) {
                  const shopPos = { latitude:shop.gps_lat, longitude:shop.gps_lng}
                  const distance = haversine(shopPos, here) // 714504.18 (in meters)
                  if (distance < best) {
                    best = distance;
                    closestShop = shop
                  }
                }
                closestShop.distance = Math.round(best/1000);
                setMyShop(closestShop);
              })
          })
      })



  }, [])

  return (
    <View style={style.page}>
      {myShop ? (
        <View>
          <Text style={style.text}>{myShop.name}</Text>
          <Text style={style.text}>à {myShop.distance} km</Text>
        </View>
      ) : (
        <Text style={style.text}>Recherche en cours ...</Text>
      )}
    </View>
  )
}

export default Shop

const style = {
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text:{
    textAlign: 'center',
    fontSize: 30,
  }
}
