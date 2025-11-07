import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SettingStyles } from './styles';
import { getInitials } from '../../utils/method';
import { COLORS, IMAGES } from '../../constants';
import { Container, HeaderComponent } from '../../components/common';
import { useSelector } from 'react-redux';

const Setting = (props: any) => {
  const { userData } = useSelector((state: any) => state.otp);

  // Static display data
  const staticFirstName = 'John';
  const staticLastName = 'Doe';
  const staticDisplayName = 'John Doe';
  const staticPhoneNumber = userData?.phoneNumber || '9988776655';
  const staticCountryCode = userData?.countryCode || '+91';

  return (
    <Container>
      <View style={SettingStyles.container}>
        <HeaderComponent
          Title="Profiles"
          onPress={() => {
            props.navigation.goBack();
          }}
        />

        <View style={SettingStyles.contentWrapper}>
          {/* Account Information Card */}
          <LinearGradient
            colors={['rgba(207, 216, 220, 0.10)', 'rgba(111, 116, 118, 0.10)']}
            start={{ x: 0.7, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={SettingStyles.card}
          >
            <TouchableOpacity
              style={{ paddingVertical: 20, paddingHorizontal: 20 }}
              onPress={() => {
                props.navigation.navigate('Profile');
              }}
            >
              <View style={SettingStyles.profileRow}>
                <View style={SettingStyles.profileAvatar}>
                  <Text style={SettingStyles.profileAvatarText}>
                    {getInitials(staticFirstName, staticLastName)}
                  </Text>
                </View>
                <View style={SettingStyles.profileInfo}>
                  <Text style={SettingStyles.profileName}>
                    {staticDisplayName}
                  </Text>
                  <View style={SettingStyles.phoneContainer}>
                    <Text style={SettingStyles.phoneText}>{staticCountryCode} {staticPhoneNumber}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </LinearGradient>
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, width: "100%" }}>

            {/* Menu Items */}
            <View style={[SettingStyles.section, { marginTop: 16 }]}>
              {/* <TouchableOpacity
                style={SettingStyles.menuItem}
                onPress={() => { props.navigation.navigate('Profile') }}>
                <Text style={SettingStyles.menuText}>Your profile</Text>
                <Image source={IMAGES.BACK} style={SettingStyles.chevron} />
              </TouchableOpacity> */}

              <TouchableOpacity
                style={SettingStyles.menuItem}
                onPress={() => { props.navigation.navigate('PersonalDetails') }}>
                <Text style={SettingStyles.menuText}>Personal Details</Text>
                <Image source={IMAGES.BACK} style={SettingStyles.chevron} />
              </TouchableOpacity>

            </View>
            <View style={[SettingStyles.section, { marginTop: 0 }]}>
              <TouchableOpacity
                style={SettingStyles.menuItem}
                onPress={() => { props.navigation.navigate('ProfessionalDetails') }}>
                <Text style={SettingStyles.menuText}>Professional Details</Text>
                <Image source={IMAGES.BACK} style={SettingStyles.chevron} />
              </TouchableOpacity>

            </View>
            <View style={[SettingStyles.section, { marginTop: 0 }]}>
              <TouchableOpacity
                style={SettingStyles.menuItem}
                onPress={() => { props.navigation.navigate('PropertyDetails') }}>
                <Text style={SettingStyles.menuText}>Property Details</Text>
                <Image source={IMAGES.BACK} style={SettingStyles.chevron} />
              </TouchableOpacity>
            </View>

            {/* Action Buttons */}
            <View style={[SettingStyles.section, { marginTop: 0 }]}>
              <TouchableOpacity
                style={SettingStyles.menuItem}
                onPress={() => { props.navigation.navigate('ProfileSetting') }}>
                <Text style={SettingStyles.menuText}>Settings</Text>
                <Image source={IMAGES.BACK} style={SettingStyles.chevron} />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Container>
  );
};

export default Setting;
