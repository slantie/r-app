import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SettingStyles } from './styles';
import { getInitials } from '../../utils/method';
import { IMAGES } from '../../constants';
import { Container, HeaderComponent } from '../../components/common';
import { useSelector } from 'react-redux';

interface SettingProps {
  navigation: {
    navigate: (screen: string) => void;
    goBack: () => void;
  };
}

const Setting: React.FC<SettingProps> = (props) => {
  const { userData } = useSelector((state: any) => state.otp);

  // Resident display data from actual user
  const staticFirstName = userData?.firstName || 'Slantie';
  const staticLastName = userData?.lastName || 'Hacks';
  const staticDisplayName = `${userData?.firstName || 'Slantie'} ${userData?.lastName || 'Hacks'}`;
  const staticPhoneNumber = userData?.phoneNumber || '7567600101';
  const staticCountryCode = userData?.countryCode || '+91';
  const staticEmail = userData?.email || 'slantiehacks@gmail.com';
  
  const unitInfo = 'A-101, Shivalik Heights';
  // In a real app, this would come from user data/API
  const [residentType] = React.useState<'Owner' | 'Tenant'>('Tenant');
  const memberSince = 'January 2024';

  return (
    <Container>
      <View style={SettingStyles.container}>
        <HeaderComponent
          Title="My Profile"
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
              style={SettingStyles.profileCardTouch}
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
                  <Text style={SettingStyles.profileEmail}>
                    {staticEmail}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </LinearGradient>

          <View style={SettingStyles.unitInfoCard}>
            <Text style={SettingStyles.unitLabel}>MY UNIT</Text>
            <Text style={SettingStyles.unitText}>
              {unitInfo}
            </Text>
            <View style={SettingStyles.badgeRow}>
              <View style={[SettingStyles.residentBadge, residentType === 'Owner' ? SettingStyles.ownerBadge : SettingStyles.tenantBadge]}>
                <Text style={SettingStyles.badgeText}>
                  {residentType.toUpperCase()}
                </Text>
              </View>
              <Text style={SettingStyles.memberSinceText}>
                Member since {memberSince}
              </Text>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={SettingStyles.scrollView}>

            <View style={SettingStyles.sectionMarginTop}>
              <TouchableOpacity
                style={SettingStyles.menuItem}
                onPress={() => { 
                  Alert.alert('Coming Soon', 'Family members management will be available soon.');
                }}>
                <View style={SettingStyles.menuItemLeft}>
                  <Text style={SettingStyles.menuIcon}>👥</Text>
                  <Text style={SettingStyles.menuText}>Family Members</Text>
                </View>
                <Image source={IMAGES.BACK} style={SettingStyles.chevron} />
              </TouchableOpacity>
            </View>

            <View style={SettingStyles.section}>
              <TouchableOpacity
                style={SettingStyles.menuItem}
                onPress={() => { 
                  Alert.alert('Coming Soon', 'Vehicle management will be available soon.');
                }}>
                <View style={SettingStyles.menuItemLeft}>
                  <Text style={SettingStyles.menuIcon}>🚗</Text>
                  <Text style={SettingStyles.menuText}>My Vehicles</Text>
                </View>
                <Image source={IMAGES.BACK} style={SettingStyles.chevron} />
              </TouchableOpacity>
            </View>

            <View style={SettingStyles.section}>
              <TouchableOpacity
                style={SettingStyles.menuItem}
                onPress={() => { 
                  Alert.alert('Coming Soon', 'Document management will be available soon.');
                }}>
                <View style={SettingStyles.menuItemLeft}>
                  <Text style={SettingStyles.menuIcon}>📄</Text>
                  <Text style={SettingStyles.menuText}>My Documents</Text>
                </View>
                <Image source={IMAGES.BACK} style={SettingStyles.chevron} />
              </TouchableOpacity>
            </View>

            {/* Action Buttons */}
            <View style={SettingStyles.section}>
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
