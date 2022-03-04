import { useState } from 'react';
import { Button, FlatList, Image, Pressable, Text, TextInput, View } from 'react-native';
import { ImageBackground } from 'react-native';
import Background from '../assets/background.jpg';
import config from '../config';

export default Home = ({navigation}) => { 
  
  const [searchText, setSearchText] = useState('');
  const [games, setGames] = useState([]);

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
    <View style={style.page}>
      <ImageBackground source={Background} resizeMode="cover" style={style.background}>
      <View style={style.searchBar}>
        <TextInput style={style.searchInput}
          onChangeText={setSearchText}
          value={searchText}
        ></TextInput>
        <Button title="Chercher" onPress={handleSearch}></Button>
      </View>
      <FlatList style={style.list} data={games} renderItem={ ({item}) => (
        <Pressable onPress={ () => { handleClick(item.slug) } }>
          <View style={style.listItem}>
            <Image source={{uri:item.background_image}} style={style.listImage}></Image>
            <View>
              <Text>{item.name}</Text>
              <Text>Note: {item.rating}</Text>
            </View>
          </View>
        </Pressable>
      )} keyExtractor={(item) => item.id}>
      </FlatList>
      </ImageBackground>
    </View>
  );
};

const style = {
  page: {
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
  list: {
    flex:1,
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
}

