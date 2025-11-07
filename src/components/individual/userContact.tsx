import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { UserContactStyles } from './styles';
import ProgressCircle from 'react-native-progress-circle';
import { Image } from 'react-native';
import { Initials } from '../../utils/method';
import { COLORS, FF, FS } from '../../constants';

interface UserContactProps {
  percent?: number;
  userName?: string;
  userDesignation?: string;
  userAddress?: string;
  userImage?: string;
  type?: string;
  onPress?: any;
}

const UserContact = ({
  percent,
  userName,
  userDesignation,
  userAddress,
  userImage,
  type,
  onPress
}: UserContactProps) => {

  return (
    <View style={UserContactStyles.container}>
      <View style={UserContactStyles.contactCardContainer}>
        <View style={UserContactStyles.contactCardImgContainer}>
          <ProgressCircle
            percent={percent ?? 0}
            radius={35}
            borderWidth={4}
            color="#159428"
            shadowColor="#999"
            bgColor="#fff"
          >
            {userImage ?
              <View >
                <Image
                  source={{ uri: userImage }}
                  style={UserContactStyles.contactCardImg}
                />
              </View>
              :
              <View>
                <Text style={{ fontSize: FS.FS22, color: COLORS.BLACK_TEXT, fontFamily: FF[600] }} >{Initials(userName)}</Text>
              </View>}
          </ProgressCircle>
          {/* <View style={UserContactStyles.contactCardInfoContainers}>
            <Text style={UserContactStyles.contactCardInfoTitle}>
              {percent}%
            </Text>
          </View> */}
        </View>
      </View>
      <View style={[UserContactStyles.contactCardInfoContainer, { flex: 1, }]}>
        <View
          style={[
            UserContactStyles.contactCardInfoTextContainer,
            { flex: 1, paddingHorizontal: 8, justifyContent: 'center' },
          ]}
        >
          <Text style={UserContactStyles.userContactName}>{userName}</Text>
          {/* <Text style={UserContactStyles.userContactDesignation}>
            {userDesignation}
          </Text> */}
          {userAddress != "" ? <Text style={UserContactStyles.userContactAddress}>
            {userAddress}
          </Text> : undefined}
        </View>
        <TouchableOpacity style={{ flex: 1 }} onPress={onPress}>
          <Text style={UserContactStyles.addContactButton}>
            {type === 'contact' ? 'Add To Contact' : type === "" ? "" : 'Invite'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserContact;
