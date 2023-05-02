//@ts-nocheck
import { View, StyleSheet, FlatList } from 'react-native';
import React, { useState } from 'react'
import { Appbar, Chip, Button } from 'react-native-paper'
import { NewsData } from './utils/types';
import Carditem from '../components/Carditem';
import { CompositeNavigationProp } from '@react-navigation/native';

const categories = ["Technology", "Sports", "Politics", "Health", "Business"]
const API_KEY ="pub_21219108bca5c978c2e3c14614477699bb018";

const Home = (props:CompositeNavigationProp) => {
  const [newsData, setnewsData] = useState<NewsData[]>([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const[nextPage,setNextPage]=useState("")

  const handleSelect = (val: string) => {
    setSelectedCategories((prev: string[]) => prev.find((p) => p === val) ? prev.filter((cat) => cat !== val) : [...prev, val])
  }
  const handlePress = async () => {
    const URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=in&language=en${selectedCategories.length > 0 ?
     `&category=${selectedCategories.join()}` 
     :""
     }${nextPage?.length >0 ? `&page=${nextPage}`:''}`;
   
    try {
      await fetch(URL)
        .then((res) => res.json())
        .then((data) => {
          setnewsData((prev)=>[...prev,...data.results])
        setNextPage(data.nextPage)
        })
    } catch (err) {
      console.log(err)
    }
  }

  if (newsData[0] != undefined) {
    var Allkeys = Object.keys(newsData[0])
  }
  console.log(Allkeys)

  return (
    <View style={Styles.container}>
      <Appbar.Header>
        <Appbar.Content title='Home' ></Appbar.Content>
      </Appbar.Header>
      <View style={Styles.filterContainer}>

        {categories.map((cat) =>
          <Chip
            key={cat}
            mode='outlined'
            style={Styles.chipItem}
            textStyle={{ fontWeight: '400', color: 'white', padding: 1 }}
            showSelectedOverlay
            selected={selectedCategories.find((c) => cat === c) ? true : false}
            onPress={() => handleSelect(cat)}
          >{cat}
          </Chip>
        )
        }
        <Button
          mode='outlined'
          style={Styles.button}
          onPress={handlePress}
          icon={'sync'}
          labelStyle={{ margin: 'auto', fontSize: 14 }}
        >Refresh
        </Button>
      </View>
      <FlatList 
      onEndReached={()=>handlePress()}
        style={Styles.flatList}
        data={newsData} 
        renderItem={({ item }) =>
          <Carditem
            navigation={props.navigation}
            description={item.description}
            image_url={item.image_url}
            title={item.title}
            content={item.content}
          />} />
    </View>
  )
}

export default Home;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  chipItem: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
  button: {
    maxWidth: 400,
    padding: 0,
    maxHeight: 400,
  },
  flatList: {
    flex: 1,
    height: "auto",
  }
});
