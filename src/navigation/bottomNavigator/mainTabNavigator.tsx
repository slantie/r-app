import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../screen/home/home';
import Setting from '../../screen/setting/settings';
import Community from '../../screen/community/community';
import Images from '../../constants/images';

const Tab = createBottomTabNavigator();

const renderHomeIcon = ({ focused }: { focused: boolean }) => (
    <Image
        source={Images.HOME}
        style={[
            styles.tabIcon,
            focused ? styles.tabIconActive : styles.tabIconInactive
        ]}
    />
);

const renderNoticesIcon = ({ focused }: { focused: boolean }) => (
    <Image
        source={Images.COMMUNITY}
        style={[
            styles.tabIcon,
            focused ? styles.tabIconActive : styles.tabIconInactive
        ]}
    />
);

const renderProfileIcon = ({ focused }: { focused: boolean }) => (
    <Image
        source={Images.RID}
        style={[
            styles.profileIcon,
            focused ? styles.tabIconActive : styles.tabIconInactive
        ]}
    />
);

const MainTabNavigator: React.FC = () => {
    return (
        <Tab.Navigator 
            screenOptions={{ 
                headerShown: false,
                tabBarStyle: styles.tabBar,
            }} 
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: renderHomeIcon
                }}
            />
            <Tab.Screen
                name="Notices"
                component={Community}
                options={{
                    tabBarIcon: renderNoticesIcon
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Setting}
                options={{
                    tabBarIcon: renderProfileIcon
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        height: 80,
    },
    tabIcon: {
        width: 24,
        height: 24,
    },
    profileIcon: {
        width: 30,
        height: 24,
    },
    tabIconActive: {
        tintColor: '#007AFF',
    },
    tabIconInactive: {
        tintColor: '#8E8E93',
    },
});

export default MainTabNavigator;
