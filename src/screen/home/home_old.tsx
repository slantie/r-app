import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Linking, StatusBar, Platform, PermissionsAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HomeStyles } from './styles';
import Container from '../../components/common/container';
import Images from '../../constants/images';
import { Image } from 'react-native';
import { COLORS, FF, FS } from '../../constants';
import { userDetailAction } from '../../store/actions/auth/userDetailAction';
import { selectUserDetailData } from '../../store/selectors/auth';
import { Camera } from 'react-native-vision-camera';
import Geolocation from 'react-native-geolocation-service';

const Home = (props: any) => {
  const dispatch = useDispatch() as any;
  const { userData } = useSelector((state: any) => state.otp);
  const userName = userData?.firstName;
  const userDetailData = useSelector(selectUserDetailData);
  const user = userDetailData?.data?.result;


  const userDetailsApi = () => {
    dispatch(userDetailAction()).then((res: any) => {
      console.log('User Details API Response', res);
    });
  }

  useEffect(() => {
    if(user == undefined){
      userDetailsApi();
    }
  }, []);

  useEffect(() => {
    console.log('User is Employee', user?.isEmployee);
    console.log('User ID', user?._id);


    if (user?.isEmployee && user?._id) {
      // employeeDetailsApi();
      console.log('Employee Details API Called');

    }

  }, [user?.isEmployee, user?._id]);

  // Function to request camera permission
  const requestCameraPermission = async (): Promise<boolean> => {
    try {
      const permission = await Camera.requestCameraPermission();
      if (permission === 'granted') {
        return true;
      } else if (permission === 'denied') {
        Alert.alert(
          'Camera Permission Required',
          'Camera access is required for attendance. Please grant camera permission.',
          [{ text: 'OK' }]
        );
        return false;
      }
      return false;
    } catch (error) {
      console.error('Camera permission error:', error);
      Alert.alert('Error', 'Unable to request camera permission.');
      return false;
    }
  };

  // Function to request location permission
  const requestLocationPermissionForAttendance = async (): Promise<boolean> => {
    try {
      let granted = false;

      if (Platform.OS === 'android') {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location for attendance verification.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        granted = permission === PermissionsAndroid.RESULTS.GRANTED;
      } else if (Platform.OS === 'ios') {
        const permission = await Geolocation.requestAuthorization('whenInUse');
        granted = permission === 'granted';
      }

      if (!granted) {
        Alert.alert(
          'Location Permission Required',
          'Location access is required for attendance. Please grant location permission.',
          [{ text: 'OK' }]
        );
      }

      return granted;
    } catch (error) {
      console.error('Location permission error:', error);
      Alert.alert('Error', 'Unable to request location permission.');
      return false;
    }
  };

  const homeMenuItems = [
    {
      label: 'Desk',
      image: Images.FOLLOW_UP,
    },
    {
      label: 'Project',
      image: Images.PROJECT,
    },
    {
      label: 'Pulses',
      image: Images.PLUSES,
    },
    {
      label: 'Feedback',
      image: Images.FEEDBACK,
    },
    {
      label: 'Network',
      image: Images.CONTACT,
    },
    // {
    //   label: 'Terrotory',
    //   image: Images.TERROTORY,
    // },
    // {
    //   label: 'R - ID',
    //   image: Images.RIDES,
    // },
    // {
    //   label: 'Setting',
    //   image: Images.SETTINGS,
    // },
    // {
    //   label: 'Punch System',
    //   image: Images.PUNCH_SYSTEM,
    // },
    // {
    //   label: 'Land',
    //   image: Images.LAND,
    // },
    {
      label: 'Territory',
      image: Images.TERRITORY,
    },
  ];

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[HomeStyles.menuItem]}
        onPress={() => {
          if (item.label === 'Setting') {
            props.navigation.navigate('Setting');
          } else if (item.label === 'Network') {
            props.navigation.navigate('Contact');
          }
          else if (item.label === 'Pulses') {
            props.navigation.navigate('Pluses');
          } else if (item.label === 'Feedback') {
            props.navigation.navigate('Feedback');
          } else if (item.label === 'Project') {
            props.navigation.navigate('Project');
          }
          else if (item.label === 'R - ID') {
            props.navigation.navigate('Profile');
          }
          else if (item.label === 'Punch System') {
            props.navigation.navigate('PunchSystem');
          }
          else if (item.label === 'Desk') {
            props.navigation.navigate('Desk');
          }

          else {
            Alert.alert(
              'Coming Soon',
              'We’ll be introducing this feature soon.',
              [{ text: 'OK' }]
            );
          }
        }}
      >
        <Image source={item.image} style={[HomeStyles.menuIcon]} />
        <Text style={HomeStyles.menuLabel}>{item.label}</Text>
      </TouchableOpacity>
    );
  };



  return (
    <Container>

      <View>
        <Text style={{ fontSize: FS.FS22, color: COLORS.BLACK, fontFamily: FF[500],marginTop:40 }}>Hello, {userName}</Text>
        <Text style={{ fontSize: FS.FS16, color: COLORS.GREY_TEXT, fontFamily: FF[400],marginTop:16,letterSpacing:0.1 }}>Welcome to R</Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          marginTop: 40,
        }}
      >
        <FlatList
          data={homeMenuItems}
          renderItem={renderItem}
          numColumns={3}
          contentContainerStyle={HomeStyles.menuGrid}
          columnWrapperStyle={{}}
          showsVerticalScrollIndicator={false}
        />



      </View>
    </Container>
  );
};

export default Home;
{/* paste here */ }
{/*
          <CustomDropdownInput
          placeholder="Select Fruit"
          data={fruitArray}
          value={fruit}
          onChangeText={setFruit}
          isActive={activeIndex === 0}
          onFocus={() => setActiveIndex(0)}
          onClose={() => setActiveIndex(null)}
        />

<CustomDropdownInput
          placeholder="Select Berry"
          data={berryArray}
          value={berry}
          onChangeText={setBerry}
          isActive={activeIndex === 1}
          onFocus={() => setActiveIndex(1)}
          onClose={() => setActiveIndex(null)}
        /> */}

