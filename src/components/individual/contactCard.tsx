import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ContactCardStyles } from './styles';
import { Image } from 'react-native';
import { COLORS, FF, FS, IMAGES } from '../../constants';

import ProgressCircle from 'react-native-progress-circle';
import { getInitials, Initials } from '../../utils/method';

interface ContactCardProps {
  percent?: number;
  name?: string;
  designation?: string;
  location?: string;
  image?: string;
}


const ContactCard = ({
  percent,
  name,
  designation,
  location,
  image,
}: ContactCardProps) => {
  console.log("name",name);
  console.log("image",image);

  return (
    <View style={ContactCardStyles.container}>
      <View style={ContactCardStyles.contactCardImgContainer}>
        <ProgressCircle
          percent={percent ?? 0}
          radius={40}
          borderWidth={4}
          color="#159428"
          shadowColor="#999"
          bgColor="#fff"
        >
         {image ?  <Image
            source={{ uri: image }}
            style={ContactCardStyles.contactCardImg}
          /> :
          <View>
            <Text style={{fontSize:FS.FS24,color:COLORS.BLACK_TEXT,fontFamily:FF[600]}}>{Initials(name)}</Text>
            </View>}
        </ProgressCircle>
        {/* <View style={ContactCardStyles.contactCardInfoContainers}>
          <Text style={ContactCardStyles.contactCardInfoTitle}>{percent}%</Text>
        </View> */}
      </View>
      <View style={{ marginLeft: 20 }}>
        <Text style={ContactCardStyles.contactCardName}>{name}</Text>
       {designation ? <Text style={ContactCardStyles.contactCardDesignation}>
          {designation}
        </Text>: undefined}
     {location  ? <Text style={ContactCardStyles.contactCardLocation}>{location}</Text>:undefined}
      </View>
    </View>
  );
};

export default ContactCard;
