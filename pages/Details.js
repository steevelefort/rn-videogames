import { useEffect, useState } from "react";
import { Dimensions, Image, Text, View } from "react-native"
import config from "../config";

export default Details = ({ navigation, route }) => {
  console.log(route.params.slug);

  const [game, setGame] = useState(null);

  useEffect(() => {
    const url = `https://api.rawg.io/api/games/${route.params.slug}?key=${config.apiKey}`;
    fetch(url)
      .then(response => response.json())
      .then(data => { setGame(data) })
      .catch((err) => { alert('Une erreur est survenue.' + err.message) })
  }, []);

  return (
    <View style={style.page} >
      {game !== null ? (
        <View style={style.page} >
          <Text style={style.title}>{game.name}</Text>
          <Image source={{ uri: game.background_image }} style={style.image}></Image>
          <Text>{game.description}</Text>
        </View>
      ) : (
        <View style={style.page}>
          <Text>Chargement en cours ...</Text>
        </View>
      )}
    </View>
  )
}

const style = {
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10
  },
  image: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').width*9/16,
    resizeMode: 'center',
    margin:10
  }
}
