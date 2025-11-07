import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../screen/home/home';
import Setting from '../../screen/setting/settings';
import Community from '../../screen/community/community';
import Images from '../../constants/images';

const MainTabNavigator = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator screenOptions={{ headerShown: false,
            tabBarStyle: { height:80},
         }} >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={Images.HOME}
                            style={{ width: 24, height: 24, tintColor: focused ? '#007AFF' : '#8E8E93' }}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Community"
                component={Community}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={Images.COMMUNITY}
                            style={{ width: 24, height: 24, tintColor: focused ? '#007AFF' : '#8E8E93' }}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="R -ID"
                component={Setting}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={Images.RID}
                            style={{ width: 30, height: 24, tintColor: focused ? '#007AFF' : '#8E8E93' }}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
