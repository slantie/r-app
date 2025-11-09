import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { Container, CustomButton, DropDowns } from '../../components/common';
import { IMAGES, COLORS } from '../../constants';
import { apiRegisterMember, apiGetAppConstants } from '../../services/apiServiceWrapper';
import { REGISTER_MEMBER, APP_CONSTANTS } from '../../services/httpService';
import PrefManager from '../../utils/prefManager';
import { setAuthToken } from '../../store/actions/auth/loginAction';

const MemberRegistration = ({ route, _navigation }: any) => {
  const dispatch = useDispatch();
  const { userData, buildingId, unitId, unitData } = route.params;

  const [memberType, setMemberType] = useState('');
  const [memberTypeOptions, setMemberTypeOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingConstants, setLoadingConstants] = useState(true);

  // Fetch app constants on mount
  useEffect(() => {
    fetchAppConstants();
  }, []);

  const fetchAppConstants = async () => {
    try {
      setLoadingConstants(true);
      const response = await apiGetAppConstants(APP_CONSTANTS);
      
      if (response.data?.success) {
        const constants = response.data.data;
        setMemberTypeOptions(constants.memberTypes || []);
        console.log('✅ App constants loaded:', constants);
      }
    } catch (error: any) {
      console.log('❌ Error fetching app constants:', error.message);
      // Fallback to hardcoded values if API fails
      setMemberTypeOptions([
        { label: 'Owner', value: 'Owner' },
        { label: 'Tenant', value: 'Tenant' },
        { label: 'Family Member', value: 'Family Member' },
      ]);
      Alert.alert('Notice', 'Using default member types. Some options may be limited.');
    } finally {
      setLoadingConstants(false);
    }
  };

  const handleSubmit = async () => {
    if (!memberType) {
      Alert.alert('Error', 'Please select your member type');
      return;
    }

    setLoading(true);

    try {
      // Get userId from route params first, then fallback to stored userData
      let userId = userData?.user?._id || userData?._id;
      let storedUserData: any = null;
      let parsedUserData: any = null;

      if (!userId) {
        storedUserData = await PrefManager.getValue('userData');
        parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
        userId = parsedUserData?.user?._id || parsedUserData?._id;
      }

      if (!userId) {
        throw new Error('User ID not found. Please login again.');
      }

      const payload = {
        userId,
        buildingId,
        blockId: unitData?.blockId,
        floorId: unitData?.floorId,
        unitId,
        memberType,
      };

      console.log('📝 Submitting member registration:', payload);

      const response = await apiRegisterMember(REGISTER_MEMBER, payload);

      if (response.data?.success) {
        const { member, memberStatus } = response.data.data;
        
        console.log('✅ Member registration successful:', member);
        console.log(`📋 Registration Status: ${memberStatus}`);

        // Update stored userData with member info
        if (!parsedUserData) {
          storedUserData = await PrefManager.getValue('userData');
          parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
        }
        
        if (parsedUserData) {
          parsedUserData.isMemberRegistered = true;
          parsedUserData.memberStatus = memberStatus;
          parsedUserData.memberId = member._id;
          
          // Store member data with buildingId, unitId, blockId for future use
          parsedUserData.member = {
            _id: member._id,
            buildingId: member.buildingId || buildingId,
            blockId: member.blockId || unitData?.blockId,
            floorId: member.floorId || unitData?.floorId,
            unitId: member.unitId || unitId,
            memberType: member.memberType || memberType,
            memberStatus: memberStatus,
          };
          
          await PrefManager.setValue('userData', JSON.stringify(parsedUserData));
          console.log('✅ Stored member data:', parsedUserData.member);
        }

        // Show status-based alert
        if (memberStatus === 'pending') {
          Alert.alert(
            'Registration Pending',
            'Your membership request has been submitted and is pending approval from the building admin. You can still explore the app.',
            [
              {
                text: 'OK',
                onPress: () => {
                  // Navigate to home/main app
                  dispatch(
                    setAuthToken({
                      accessToken: userData.accessToken,
                      userData: parsedUserData || userData,
                    }),
                  );
                },
              },
            ]
          );
        } else if (memberStatus === 'approved') {
          Alert.alert(
            'Registration Approved',
            'Your membership has been approved! Welcome to the community.',
            [
              {
                text: 'OK',
                onPress: () => {
                  // Navigate to home/main app with full access
                  dispatch(
                    setAuthToken({
                      accessToken: userData.accessToken,
                      userData: parsedUserData || userData,
                    }),
                  );
                },
              },
            ]
          );
        }
      }
    } catch (error: any) {
      console.log('❌ Member registration error:', error?.response?.data || error?.message);
      Alert.alert(
        'Registration Failed',
        error?.response?.data?.message || error?.message || 'Failed to register member. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image source={IMAGES.APP_LOGO} style={styles.logo} />
          </View>
          
          <View style={styles.titleContainer}>
            <Text style={styles.title}>MEMBER REGISTRATION</Text>
            <Text style={styles.subtitle}>
              You're almost there! Select your member type to complete registration.
            </Text>
          </View>

          {/* Building and Unit Info */}
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Building:</Text>
            <Text style={styles.infoText}>{unitData?.buildingName || 'N/A'}</Text>
            
            <Text style={[styles.infoLabel, styles.marginTop]}>Unit:</Text>
            <Text style={styles.infoText}>
              Block {unitData?.block}, Floor {unitData?.floor}, Unit {unitData?.unitNumber}
            </Text>
          </View>

          {/* Member Type Dropdown */}
          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownLabel}>Select Member Type</Text>
            {loadingConstants ? (
              <Text style={styles.loadingText}>Loading member types...</Text>
            ) : (
              <DropDowns
                data={memberTypeOptions}
                value={memberType}
                placeholder="Choose your relationship to this unit"
                onChange={setMemberType}
                dropdownStyle={styles.dropdownStyle}
              />
            )}
          </View>

          {/* Info Text */}
          <View style={styles.noteContainer}>
            <Text style={styles.noteText}>
              ℹ️ Your registration will be sent to the building admin for approval. 
              You'll be notified once your request is processed.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <CustomButton
          title={loading ? 'Submitting...' : 'Complete Registration'}
          onPress={handleSubmit}
          disabled={loading || !memberType || loadingConstants}
          loading={loading}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  titleContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.BLACK_TEXT,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.GREY_TEXT,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  infoCard: {
    backgroundColor: COLORS.BG_GREY,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoLabel: {
    fontSize: 12,
    color: COLORS.GREY_TEXT,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 16,
    color: COLORS.BLACK_TEXT,
    fontWeight: '500',
  },
  marginTop: {
    marginTop: 12,
  },
  dropdownContainer: {
    marginBottom: 24,
  },
  dropdownLabel: {
    fontSize: 14,
    color: COLORS.BLACK_TEXT,
    fontWeight: '500',
    marginBottom: 8,
  },
  dropdownStyle: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_GREY,
    borderWidth: 0,
  },
  loadingText: {
    fontSize: 14,
    color: COLORS.GREY_TEXT,
    textAlign: 'center',
    paddingVertical: 16,
  },
  noteContainer: {
    backgroundColor: '#FFF9E6',
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  noteText: {
    fontSize: 13,
    color: '#856404',
    lineHeight: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
});

export default MemberRegistration;
