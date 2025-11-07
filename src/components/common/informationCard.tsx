import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IMAGES } from '../../constants';
import { InformationCardStyles } from './styles';

interface InformationCardProps {
    contactName: string;
    contactEmail: string;
    phoneNumber: string;
    source: string;
    projectId?: string;
    onPress?: () => void;
}

const InformationCard = ({
    contactName,
    contactEmail,
    phoneNumber,
    source,
    projectId,
    onPress
}: InformationCardProps) => {
    const navigation = useNavigation();

    const handleCardPress = () => {
        if (onPress) {
            onPress();
        } else {
            navigation.navigate('ProjectDetails' as never);
        }
    };

    const handleCallPress = () => {
        // Handle call action
        console.log('Call pressed for:', phoneNumber);
    };

    const handleWhatsAppPress = () => {
        // Handle WhatsApp action
        console.log('WhatsApp pressed for:', phoneNumber);
    };

    return (
        <TouchableOpacity
            style={InformationCardStyles.card}
            onPress={handleCardPress}
            activeOpacity={0.8}
        >
            <View style={InformationCardStyles.cardHeader}>
                <View style={InformationCardStyles.projectTag}>
                    <Text style={InformationCardStyles.projectTagText}>Project</Text>
                </View>
                <View style={InformationCardStyles.actionButtons}>
                    <TouchableOpacity
                        style={InformationCardStyles.actionButton}
                        onPress={(e) => {
                            e.stopPropagation();
                            // Handle refresh action
                        }}
                    >
                        <Image source={IMAGES.SHARE} style={InformationCardStyles.actionIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={InformationCardStyles.actionButton}
                        onPress={(e) => {
                            e.stopPropagation();
                            // Handle edit action
                        }}
                    >
                        <Image source={IMAGES.EDIT} style={InformationCardStyles.actionIcon} />
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={InformationCardStyles.contactName}>{contactName}</Text>
            <Text style={InformationCardStyles.contactEmail}>{contactEmail}</Text>

            <View style={InformationCardStyles.phoneContainer}>
                <Text style={InformationCardStyles.phoneNumber}>{phoneNumber}</Text>
                <View style={InformationCardStyles.phoneActions}>
                    <TouchableOpacity
                        style={InformationCardStyles.phoneButton}
                        onPress={(e) => {
                            e.stopPropagation();
                            handleCallPress();
                        }}
                    >
                        <Image source={IMAGES.CALL} style={InformationCardStyles.phoneIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={InformationCardStyles.phoneButton}
                        onPress={(e) => {
                            e.stopPropagation();
                            handleWhatsAppPress();
                        }}
                    >
                        <Image source={IMAGES.WHATSAPP} style={InformationCardStyles.phoneIcon} />
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={InformationCardStyles.sourceText}>{source}</Text>
        </TouchableOpacity>
    );
};

export default InformationCard;
