//@ts-nocheck
import { View, Text,StyleSheet } from 'react-native'
import { ComponentNavigationProps } from './utils/types'
import DetailsCard from '../components/DetailsCard';


const NewsOverview = (props:ComponentNavigationProps) => { 
  
  const {title,description,image_url,content}=props?.route?.params;
  return (<DetailsCard content={content} image_url={image_url} title={title} />)
}
export default NewsOverview;

const Styles=StyleSheet.create({
});