import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Container, HeaderComponent } from '../../components/common';
import ParkingStyles from './styles/parkingStyles';
import ParkingStorageService from '../../services/parkingStorage';

interface AddParkingProps {
  navigation: {
    goBack: () => void;
  };
}

const AddParking: React.FC<AddParkingProps> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    vehicleNumber: '',
    vehicleBrand: '',
    vehicleModel: '',
    vehicleColor: '',
    ownerName: 'Slantie Hacks', // Default from user profile
    slotNumber: '',
  });

  const [vehicleType, setVehicleType] = useState<'car' | 'bike' | 'scooter' | 'other'>('car');
  const [passType, setPassType] = useState<'permanent' | 'temporary'>('permanent');

  const updateFormData = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const validateForm = useCallback((): boolean => {
    if (!formData.vehicleNumber.trim()) {
      Alert.alert('Error', 'Please enter vehicle number');
      return false;
    }
    if (formData.vehicleNumber.length < 6) {
      Alert.alert('Error', 'Please enter a valid vehicle number');
      return false;
    }
    if (!formData.vehicleBrand.trim()) {
      Alert.alert('Error', 'Please enter vehicle brand');
      return false;
    }
    if (!formData.vehicleModel.trim()) {
      Alert.alert('Error', 'Please enter vehicle model');
      return false;
    }
    if (!formData.vehicleColor.trim()) {
      Alert.alert('Error', 'Please enter vehicle color');
      return false;
    }
    return true;
  }, [formData]);

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await ParkingStorageService.addPass({
        vehicleNumber: formData.vehicleNumber.trim().toUpperCase(),
        vehicleType,
        vehicleBrand: formData.vehicleBrand.trim(),
        vehicleModel: formData.vehicleModel.trim(),
        vehicleColor: formData.vehicleColor.trim(),
        ownerName: formData.ownerName.trim(),
        slotNumber: formData.slotNumber.trim() || undefined,
        passType,
        status: 'active',
        validFrom: new Date().toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }),
        validUntil: passType === 'temporary' 
          ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            })
          : undefined,
      });

      Alert.alert(
        'Success',
        'Parking pass created successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.error('Error adding parking pass:', error);
      Alert.alert('Error', 'Failed to create parking pass. Please try again.');
    }
  }, [validateForm, formData, vehicleType, passType, navigation]);

  return (
    <Container>
      <View style={ParkingStyles.container}>
        <HeaderComponent
          Title="Add Parking Pass"
          onPress={() => navigation.goBack()}
        />

        <ScrollView
          style={ParkingStyles.formContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Vehicle Number */}
          <View style={ParkingStyles.inputGroup}>
            <Text style={ParkingStyles.label}>Vehicle Number *</Text>
            <TextInput
              style={ParkingStyles.input}
              placeholder="E.g., GJ01AB1234"
              value={formData.vehicleNumber}
              onChangeText={(text) => updateFormData('vehicleNumber', text.toUpperCase())}
              autoCapitalize="characters"
              placeholderTextColor="#9E9E9E"
            />
          </View>

          {/* Vehicle Type */}
          <View style={ParkingStyles.inputGroup}>
            <Text style={ParkingStyles.label}>Vehicle Type *</Text>
            <View style={ParkingStyles.radioGroup}>
              {(['car', 'bike', 'scooter', 'other'] as const).map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    ParkingStyles.radioButton,
                    vehicleType === type && ParkingStyles.radioButtonSelected,
                  ]}
                  onPress={() => setVehicleType(type)}
                >
                  <View
                    style={[
                      ParkingStyles.radioCircle,
                      vehicleType === type && ParkingStyles.radioCircleSelected,
                    ]}
                  >
                    {vehicleType === type && <View style={ParkingStyles.radioInner} />}
                  </View>
                  <Text style={ParkingStyles.radioLabel}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Vehicle Brand */}
          <View style={ParkingStyles.inputGroup}>
            <Text style={ParkingStyles.label}>Vehicle Brand *</Text>
            <TextInput
              style={ParkingStyles.input}
              placeholder="E.g., Maruti Suzuki, Honda"
              value={formData.vehicleBrand}
              onChangeText={(text) => updateFormData('vehicleBrand', text)}
              placeholderTextColor="#9E9E9E"
            />
          </View>

          {/* Vehicle Model */}
          <View style={ParkingStyles.inputGroup}>
            <Text style={ParkingStyles.label}>Vehicle Model *</Text>
            <TextInput
              style={ParkingStyles.input}
              placeholder="E.g., Swift, Activa"
              value={formData.vehicleModel}
              onChangeText={(text) => updateFormData('vehicleModel', text)}
              placeholderTextColor="#9E9E9E"
            />
          </View>

          {/* Vehicle Color */}
          <View style={ParkingStyles.inputGroup}>
            <Text style={ParkingStyles.label}>Vehicle Color *</Text>
            <TextInput
              style={ParkingStyles.input}
              placeholder="E.g., White, Black, Red"
              value={formData.vehicleColor}
              onChangeText={(text) => updateFormData('vehicleColor', text)}
              placeholderTextColor="#9E9E9E"
            />
          </View>

          {/* Slot Number */}
          <View style={ParkingStyles.inputGroup}>
            <Text style={ParkingStyles.label}>Parking Slot (Optional)</Text>
            <TextInput
              style={ParkingStyles.input}
              placeholder="E.g., A-101-1"
              value={formData.slotNumber}
              onChangeText={(text) => updateFormData('slotNumber', text.toUpperCase())}
              autoCapitalize="characters"
              placeholderTextColor="#9E9E9E"
            />
          </View>

          {/* Pass Type */}
          <View style={ParkingStyles.inputGroup}>
            <Text style={ParkingStyles.label}>Pass Type *</Text>
            <View style={ParkingStyles.radioGroup}>
              <TouchableOpacity
                style={[
                  ParkingStyles.radioButton,
                  passType === 'permanent' && ParkingStyles.radioButtonSelected,
                ]}
                onPress={() => setPassType('permanent')}
              >
                <View
                  style={[
                    ParkingStyles.radioCircle,
                    passType === 'permanent' && ParkingStyles.radioCircleSelected,
                  ]}
                >
                  {passType === 'permanent' && <View style={ParkingStyles.radioInner} />}
                </View>
                <Text style={ParkingStyles.radioLabel}>Permanent</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  ParkingStyles.radioButton,
                  passType === 'temporary' && ParkingStyles.radioButtonSelected,
                ]}
                onPress={() => setPassType('temporary')}
              >
                <View
                  style={[
                    ParkingStyles.radioCircle,
                    passType === 'temporary' && ParkingStyles.radioCircleSelected,
                  ]}
                >
                  {passType === 'temporary' && <View style={ParkingStyles.radioInner} />}
                </View>
                <Text style={ParkingStyles.radioLabel}>Temporary (7 days)</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={ParkingStyles.submitButton}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text style={ParkingStyles.submitButtonText}>
              Create Parking Pass
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Container>
  );
};

export default AddParking;
