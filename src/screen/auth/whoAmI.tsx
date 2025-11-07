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
  selectWhoAmIData,
  selectWhoAmILoading,
  selectWhoAmIError,
} from '../../store/selectors/auth';
import PrefManager from '../../utils/prefManager';
import { setAuthToken } from '../../store/actions/auth/loginAction';

const WhoAmI = ({ route, navigation }: any) => {
  const dispatch = useDispatch();
  const whoAmIData = useSelector(selectWhoAmIData);
  const loading = useSelector(selectWhoAmILoading);
  const error = useSelector(selectWhoAmIError);

  const [selectedOption, setSelectedOption] = useState('');
  const [selectedJobRole, setSelectedJobRole] = useState('');

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

  const options = [
    { label: 'Land Owner', value: 'Land Owner' },
    { label: 'Real Estate Developer', value: 'Real Estate Developer' },
    {
      label: 'Architect / Design Consultant',
      value: 'Architect / Design Consultant',
    },
    { label: 'Civil / MEP Contractor', value: 'Civil / MEP Contractor' },
    {
      label: 'Project Management Consultant (PMC)',
      value: 'Project Management Consultant (PMC)',
    },
    { label: 'Legal / RERA Consultant', value: 'Legal / RERA Consultant' },
    { label: 'CA / Financial Advisor', value: 'CA / Financial Advisor' },
    { label: 'Channel Partner / Broker', value: 'Channel Partner / Broker' },
    { label: 'Digital Marketing Agency', value: 'Digital Marketing Agency' },
    { label: 'Interior Designer', value: 'Interior Designer' },
    {
      label: 'Investor / Investment Firm',
      value: 'Investor / Investment Firm',
    },
    { label: 'Technology Provider', value: 'Technology Provider' },
    {
      label: 'Material / Product Supplier',
      value: 'Material / Product Supplier',
    },
    {
      label: 'Facility Management / Property Ops',
      value: 'Facility Management / Property Ops',
    },
    { label: 'New Entrants / Explorer', value: 'New Entrants / Explorer' },
    {
      label: 'Working Professionals (Job in Real Estate)',
      value: 'Working Professionals (Job in Real Estate)',
    },
  ];

  const jobRoles = [
    { label: 'Land Acquisition', value: 'Land Acquisition' },
    { label: 'Design / Project Planning', value: 'Design / Project Planning' },
    { label: 'Legal / Compliance', value: 'Legal / Compliance' },
    { label: 'Sales', value: 'Sales' },
    { label: 'Marketing / Branding', value: 'Marketing / Branding' },
    { label: 'CRM / Customer', value: 'CRM / Customer' },
    { label: 'Finance & Accounts', value: 'Finance & Accounts' },
    { label: 'Strategy & Investments', value: 'Strategy & Investments' },
    { label: 'Site Execution', value: 'Site Execution' },
    { label: 'Liaisoning', value: 'Liaisoning' },
    { label: 'IT / Automation', value: 'IT / Automation' },
    { label: 'HR / Admin', value: 'HR / Admin' },
    {
      label: 'Leasing & Asset Management',
      value: 'Leasing & Asset Management',
    },
    { label: 'Investor Relations', value: 'Investor Relations' },
  ];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    // Reset job role when a different option is selected
    if (option !== 'Working Professionals (Job in Real Estate)') {
      setSelectedJobRole('');
    }
  };

  const handleJobRoleSelect = (jobRole: string) => {
    setSelectedJobRole(jobRole);
  };

  const handleSubmit = async () => {
    if (!selectedOption) {
      Alert.alert('Error', 'Please select your identity');
      return;
    }

    if (
      selectedOption === 'Working Professionals (Job in Real Estate)' &&
      !selectedJobRole
    ) {
      Alert.alert('Error', 'Please select your job role');
      return;
    }

    const payload = {
      identitySelection: selectedOption,
      workingProfessionals:
        selectedOption === 'Working Professionals (Job in Real Estate)'
          ? selectedJobRole
          : '',
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
            // dropdownPosition="bottom"
            dropdownStyle={styles.dropdownStyle}
          />
        </View>

        {/* Job Role Dropdown - Only show when Working Professionals is selected */}
        {selectedOption === 'Working Professionals (Job in Real Estate)' && (
          <View style={styles.dropdownContainer}>
            <DropDowns
              data={jobRoles}
              value={selectedJobRole}
              placeholder="Select your job role"
              onChange={handleJobRoleSelect}
              //   dropdownPosition="bottom"
              dropdownStyle={styles.dropdownStyle}
            />
          </View>
        )}
      </View>
      <View style={{ alignItems: 'center', bottom: 10, alignSelf: 'center' }}>
        <CustomButton
          title={loading ? 'Submitting...' : 'Continue'}
          onPress={handleSubmit}
          disabled={
            loading ||
            !selectedOption ||
            (selectedOption === 'Working Professionals (Job in Real Estate)' &&
              !selectedJobRole)
          }
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
});

export default WhoAmI;
