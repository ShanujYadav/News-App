import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewsOverview from "../screens/NewsOverview";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Saved from "../screens/Saved";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Stack=createNativeStackNavigator();
const Tab=createBottomTabNavigator();
const HomeScreen=()=>{
    return(<Tab.Navigator screenOptions={{headerShown:false}}>
        <Tab.Screen options={{tabBarIcon(props){ return <Icon color='#99c2ff' size={27} name={props.focused ? "home-circle":"home-circle-outline"}/> }}}  name="Home" component={Home}/>
        <Tab.Screen options={{tabBarIcon(props){ return <Icon color='#99c2ff' size={27} name={props.focused ? "hospital-box-outline":"hospital"} />}}} name="Saved"  component={Saved}/>
    </Tab.Navigator>
    )
}
const AppNavigator= ()=> {
        return(
            <NavigationContainer>
                <Stack.Navigator  screenOptions={{headerShown:false}}>
                    <Stack.Screen name='HomeScreen' component={HomeScreen}/>
                    <Stack.Screen name='NewsOverview' component={NewsOverview}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
}
export default AppNavigator;
