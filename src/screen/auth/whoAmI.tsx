import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { WhoAmIStyles } from './styles';
import { Container, CustomButton, DropDowns } from '../../components/common';
import { IMAGES } from '../../constants';
import { COLORS } from '../../constants';
import {
  whoAmIAction,
} from '../../store/actions/auth/whoAmIAction';
import {
  // selectWhoAmIData,
  selectWhoAmILoading,
  // selectWhoAmIError,
} from '../../store/selectors/auth';
import PrefManager from '../../utils/prefManager';
import { setAuthToken } from '../../store/actions/auth/loginAction';

const WhoAmI = ({ route, navigation }: any) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectWhoAmILoading);

  const [selectedOption, setSelectedOption] = useState('');

  // // Handle API response
  // useEffect(() => {
  //     if (whoAmIData) {
  //         // API call successful
  //         console.log('WhoAmI API success:', whoAmIData);
  //         console.log('✅ Territory already submitted - navigating to AppStack');
  //         console.log('📍 Territory not submitted - navigating to Territory screen');

  //         const userData = route?.params?.userData;

  //         // Check if territory is already submitted
  //         const isTerritorySubmit = userData?.isTerritorySubmit;

  //         if (isTerritorySubmit) {
  //             console.log('✅ Territory already submitted - navigating to AppStack');
  //             // Navigate to AppStack (main app)
  //             navigation.reset({
  //                 index: 0,
  //                 routes: [{ name: 'AppStack' }],
  //             });
  //         } else {
  //             console.log('📍 Territory not submitted - navigating to Territory screen');
  //             // Navigate to Territory screen
  //             navigation.navigate('Territory', { userData });
  //         }
  //     }
  // }, [whoAmIData, navigation, route?.params?.userData]);

  // // Handle API error
  // useEffect(() => {
  //     if (error) {
  //         Alert.alert('Error', error?.message || 'Something went wrong. Please try again.');
  //     }
  // }, [error]);

  // // Clear Redux state on component unmount
  // useEffect(() => {
  //     return () => {
  //         dispatch(whoAmIClear());
  //     };
  // }, [dispatch]);

  // Resident & Security Guard Identity Options
  const options = [
    { label: 'Owner', value: 'Owner' },
    { label: 'Tenant', value: 'Tenant' },
    { label: 'Family Member', value: 'Family Member' },
    { label: 'Security Guard', value: 'Security Guard' },
    { label: 'Guest', value: 'Guest' },
    { label: 'Visitor', value: 'Visitor' },
  ];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleSubmit = async () => {
    if (!selectedOption) {
      Alert.alert('Error', 'Please select your identity');
      return;
    }

    const payload = {
      identitySelection: selectedOption,
      workingProfessionals: '',
      sourceName: 'Digital',
      subSourceName: 'App',
    };

    console.log('Submitting WhoAmI data:', payload);

    try {
      const response = await dispatch(whoAmIAction(payload) as any);

      if (response.status === 200) {
        console.log('WhoAmI API success:', response.data);
        console.log('✅ Territory already submitted - navigating to AppStack');
        console.log(
          '📍 Territory not submitted - navigating to Territory screen',
        );

        const userData = route?.params?.userData;

        // Check if territory is already submitted
        const isTerritorySubmit = userData?.isTerritorySubmit;

        if (isTerritorySubmit) {
          console.log(
            '✅ Territory already submitted - navigating to AppStack',
          );
          // Navigate to AppStack (main app)
          PrefManager.setValue('userData', userData);
          dispatch(
            setAuthToken({
              accessToken: userData.accessToken,
              userData: userData,
            }),
          );
        } else {
          console.log(
            '📍 Territory not submitted - navigating to Territory screen',
          );
          // Navigate to Territory screen
          navigation.navigate('Territory', { userData });
        }
      }
    } catch (error: any) {
      console.log(
        'WhoAmI API error:',
        error?.response?.data?.message || error?.message,
      );
      Alert.alert(
        'Error',
        error?.response?.data?.message ||
          'Something went wrong. Please try again.',
      );
    }
  };

  return (
    <Container>
      <View style={WhoAmIStyles.container}>
        <View style={WhoAmIStyles.logoContainer}>
          <Image source={IMAGES.APP_LOGO} style={WhoAmIStyles.logo} />
        </View>
        <View style={WhoAmIStyles.titleContainer}>
          <Text style={WhoAmIStyles.title}>WHO ARE YOU?</Text>
          <Text style={WhoAmIStyles.subtitle}>
            Select the identity that best describe you{' '}
          </Text>
        </View>

        {/* Identity Dropdown */}
        <View style={styles.dropdownContainer}>
          <DropDowns
            data={options}
            value={selectedOption}
            placeholder="Select your identity"
            onChange={handleOptionSelect}
            dropdownStyle={styles.dropdownStyle}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          title={loading ? 'Submitting...' : 'Continue'}
          onPress={handleSubmit}
          disabled={loading || !selectedOption}
          loading={loading}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  dropdownStyle: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_GREY,
    borderWidth: 0,
  },
  buttonContainer: {
    alignItems: 'center',
    bottom: 10,
    alignSelf: 'center',
  },
});

export default WhoAmI;
