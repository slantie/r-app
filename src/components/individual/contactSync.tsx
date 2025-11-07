import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ContactSyncStyles } from './styles';
import { IMAGES } from '../../constants';
import { CustomButton } from '../common';

const contactSync = ({ onPress }: { onPress: () => void }) => {
  return (
    <View style={ContactSyncStyles.container}>
      <View style={ContactSyncStyles.contactSyncImgContainer}>
        <Image
          source={IMAGES.CONTACT_SYNC}
          style={ContactSyncStyles.contactSyncImg}
        />
      </View>
      <View>
        <Text style={ContactSyncStyles.contactSyncTitle}>
          Allow contact sync ?
        </Text>
        <Text style={ContactSyncStyles.contactSyncSubTitle}>
          Search directory or you can sync to check who are in your contact list
        </Text>
      </View>
      <View style={ContactSyncStyles.contactSyncButtonContainer}>
        <CustomButton title="Allow" onPress={onPress} />
      </View>
    </View>
  );
};

export default contactSync;
