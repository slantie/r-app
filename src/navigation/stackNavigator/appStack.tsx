import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../screen/home/home';
import Setting from '../../screen/setting/settings';
import Help from '../../screen/setting/help';
import Contact from '../../screen/contact';
import ProfileScreen from '../../screen/rID';
import PersonalDetailsScreen from '../../screen/rID/personalDetailsScreen';
import ProfessionalDetailsScreen from '../../screen/rID/professionalDetailsScreen';
import PropertyDetailsScreen from '../../screen/rID/propertyDetailsScreen';
import Pluses from '../../screen/pluses';
import ProjectDetails from '../../screen/pluses/projectDetails';
import Project from '../../screen/project';
import Feedback from '../../screen/feedback';
import Desk from '../../screen/desk';
import MainTabNavigator from '../bottomNavigator/mainTabNavigator';
import ProfileSetting from '../../screen/setting/profileSetting';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName='MainTabs' screenOptions={{headerShown:false,animation:'slide_from_right'}}>
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="PersonalDetails" component={PersonalDetailsScreen} />
      <Stack.Screen name="ProfessionalDetails" component={ProfessionalDetailsScreen} />
      <Stack.Screen name="PropertyDetails" component={PropertyDetailsScreen} />
      <Stack.Screen name="Pluses" component={Pluses} />
      <Stack.Screen name="ProjectDetails" component={ProjectDetails} />
      <Stack.Screen name="Project" component={Project} />
      <Stack.Screen name="Feedback" component={Feedback} />
      <Stack.Screen name="Desk" component={Desk} />
      <Stack.Screen name="ProfileSetting" component={ProfileSetting} />
    </Stack.Navigator>
  );
}

export default AppStack;