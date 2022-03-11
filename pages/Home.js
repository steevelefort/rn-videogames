import { useState } from 'react';
import { Button, FlatList, Image, Pressable, Text, TextInput, View } from 'react-native';
import { ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';
import Background from '../assets/background.jpg';
import config from '../config';

export default Home = ({navigation}) => { 
  
  const [searchText, setSearchText] = useState('');
  const [games, setGames] = useState([]);

  const bookmarks = useSelector((state) => state.bookmarks)
  
  const handleSearch = () => {
    const url = `https://api.rawg.io/api/games?key=${config.apiKey}&search=${encodeURI(searchText)}`;
    fetch(url)
      .then( response => response.json() )
      .then( data => { setGames(data.results) } )
      .catch( () => { alert('Une erreur est survenue') } )
   }

  const handleClick = slug => {
    navigation.push('Details', {slug}); 
  }

  return (
    <View style={style.full}>
      <ImageBackground source={Background} resizeMode="cover" style={style.background}>
      <View style={style.searchBar}>
        <TextInput style={style.searchInput}
          onChangeText={setSearchText}
          value={searchText}
        ></TextInput>
        <Button title="Chercher" onPress={handleSearch}></Button>
      </View>
      <FlatList style={style.full} data={games} renderItem={ ({item}) => (
        <Pressable onPress={ () => { handleClick(item.slug) } }>
          <View style={style.listItem}>
            <Image source={{uri:item.background_image}} style={style.listImage}></Image>
            <View style={style.page}>
              <Text>{item.name}</Text>
              <Text>Note: {item.rating}</Text>
            </View>
            { bookmarks.find( (bookmark) => bookmark.id == item.id ) !== undefined && ( <Text>⭐</Text> ) }
          </View>
        </Pressable>
      )} keyExtractor={(item) => item.id}>
      </FlatList>
        <View style={style.buttonsBar}>
          <Button style={style.full} title="Mes jeux" onPress={ () => { navigation.push('Bookmarks') } }></Button>
          <Button style={style.full} title="Magasin" onPress={ () => { navigation.push('Shop') } }></Button>
        </View>
      </ImageBackground>
    </View>
  );
};

const style = {
  full: {
    flex: 1
  },
  searchBar:{
    flexDirection:"row", 
    margin: 5
  },
  searchInput:{
    flex: 1, 
    borderWidth: 1,
    borderColor: "#dddddd",
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  listItem: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    margin: 2,
    padding: 15,
    flexDirection: "row"
  },
  listImage: {
    width: 75,
    resizeMode: 'center',
    marginRight:10
  },
  background: {
    flex:1,
  },
  buttonsBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10
  }
}

