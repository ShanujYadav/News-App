//@ts-nocheck
import { Pressable ,StyleSheet} from 'react-native'
import React from 'react'
import { NewsData } from '../screens/utils/types'
import { Card, useTheme} from 'react-native-paper'
import { NavigateProps } from 'react-router-native'
import { Route } from '@react-navigation/native'
type Props={
  title:string
  image_url:string
  description:string
  content:string
  navigation:NavigationProp<Route>
}

const Carditem = (props:props) => {
  const theme=useTheme();
  const handlePress=()=>{
    props.navigation.navigate("NewsOverview",{
      title:props.title,
      description:props.description,
      image_url:props.image_url,
      content:props.content,
    });
  }
  return (
    <Pressable onPress={handlePress}>
      <Card style={{marginVertical:10,backgroundColor:theme.colors.elevation.level5}}>
        <Card.Cover borderRadius={10} source={{uri:props.image_url}}/>
        <Card.Title 
        title={props.title}
        titleNumberOfLines={1}></Card.Title>
      </Card>
      </Pressable>
  )
}
export default Carditem;
const Styles=StyleSheet.create({
})
