import { useEffect, useState } from "react";
import { Button, Dimensions, Image, ScrollView, Text, View } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import actions from '../reducers/actions';
import config from '../config';

export default Details = ({ navigation, route }) => {
  console.log(route.params.slug);

  const [game, setGame] = useState(null);

  useEffect(() => {
    console.log("Load game");
    const url = `https://api.rawg.io/api/games/${route.params.slug}?key=${config.apiKey}`;
    fetch(url)
      .then(response => response.json())
      .then(data => { setGame(data) })
      .catch(() => { alert('Une erreur est survenue') })
  }, []);


  const bookmarks = useSelector((state) => state.bookmarks)
  const dispatch = useDispatch();

  const handlePressAdd = () => {
    dispatch({
      type: actions.ADD_BOOKMARK, payload: {
        "slug": game.slug,
        "name": game.name,
        "background_image": game.background_image,
        "id": game.id,
      }
    });
  }
  const handlePressRemove = () => {
    dispatch({
      type: actions.REMOVE_BOOKMARK, payload: game.id
    })
  }
  const isBookmarked = () => bookmarks.find(bookmark => bookmark.id == game.id) !== undefined;

  return (
    <View style={style.page}>
      {game !== null && (
        <View style={style.page}>

          <Text style={style.title}>{game.name}</Text>
          <Image source={{ uri: game.background_image }} style={style.image}></Image>
          <ScrollView style={style.description}>
            <Text>{game.description_raw}</Text>
          </ScrollView>

          {isBookmarked() ? (
            <Button title='⭐ Retirer' onPress={handlePressRemove}></Button>
          ) : (
            <Button title='⭐ Ajouter' onPress={handlePressAdd}></Button>
          )}
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
    height: Dimensions.get('screen').width * 9 / 16,
    resizeMode: 'center',
    margin: 10
  },
  description: {
    marginBottom: 20
  }
}
