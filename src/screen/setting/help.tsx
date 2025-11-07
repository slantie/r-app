import React from 'react';
import { View, Text, TouchableOpacity, Linking, Image } from 'react-native';
import HelpStyles from './styles/helpStyles';
import { IMAGES } from '../../constants';
import { Container, HeaderComponent } from '../../components/common';

const Help = (props: any) => {
  const handleCall = () => {
    Linking.openURL('tel:+919638002500');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:noreply@realestateos.io');
  };

  return (
    <Container>
      <HeaderComponent Title="Help & Support" onPress={() => props.navigation.goBack()} />
      <View style={HelpStyles.container}>
        <Text style={HelpStyles.title}>How can we help you?</Text>
        <Text style={HelpStyles.subtitle}>
          We have got an entire team dedicated to support you and your business.
        </Text>

        <View style={HelpStyles.card}>
          <View style={HelpStyles.iconContainer}>
            <Image source={IMAGES.EMAIL} style={HelpStyles.icon} />
          </View>
          <Text style={HelpStyles.cardTitle}>Email Us</Text>
          <Text style={HelpStyles.cardDesc}>
            Our friendly team is here to help.
          </Text>
          <Text style={HelpStyles.cardInfo}>noreply@r.systems</Text>
          <TouchableOpacity style={HelpStyles.button} onPress={handleEmail}>
            <Text style={HelpStyles.buttonText}>Send Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default Help;
