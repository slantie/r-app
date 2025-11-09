import { createStackNavigator } from '@react-navigation/stack';

import Landing from '../../screen/auth/landing';
import Login from '../../screen/auth/login';
import OtpScreen from '../../screen/auth/otp';
import Profile from '../../screen/auth/profile';
import WhoAmI from '../../screen/auth/whoAmI';
import MemberRegistration from '../../screen/auth/memberRegistration';
import Territory from '../../screen/auth/territory';


const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false,animation:'slide_from_right'}}>
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="WhoAmI" component={WhoAmI} />
      <Stack.Screen name="MemberRegistration" component={MemberRegistration} />
      <Stack.Screen name="Territory" component={Territory} />
    </Stack.Navigator>
  );
}

export default AuthStack;