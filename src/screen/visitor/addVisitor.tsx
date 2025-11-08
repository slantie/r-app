import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Container, HeaderComponent } from '../../components/common';
import VisitorStyles from './styles/visitorStyles';
import VisitorStorageService from '../../services/visitorStorage';

interface AddVisitorProps {
  navigation: {
    goBack: () => void;
  };
}

const AddVisitor: React.FC<AddVisitorProps> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    purpose: '',
    vehicleNumber: '',
    numberOfGuests: '1',
  });

  const [expectedDate, setExpectedDate] = useState(new Date());
  const [expectedTime, setExpectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const updateFormData = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleDateChange = useCallback((event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setExpectedDate(selectedDate);
    }
  }, []);

  const handleTimeChange = useCallback((event: any, selectedTime?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      setExpectedTime(selectedTime);
    }
  }, []);

  const formatDate = (date: Date): string => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const formatTime = (date: Date): string => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  };

  const validateForm = useCallback((): boolean => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Please enter visitor name');
      return false;
    }
    if (!formData.phone.trim()) {
      Alert.alert('Error', 'Please enter phone number');
      return false;
    }
    if (formData.phone.length < 10) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return false;
    }
    if (!formData.purpose.trim()) {
      Alert.alert('Error', 'Please enter purpose of visit');
      return false;
    }
    const guestCount = parseInt(formData.numberOfGuests, 10);
    if (isNaN(guestCount) || guestCount < 1) {
      Alert.alert('Error', 'Number of guests must be at least 1');
      return false;
    }
    return true;
  }, [formData]);

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) {
      return;
    }

    try {
      // Save to local storage
      await VisitorStorageService.addVisitor({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        purpose: formData.purpose.trim(),
        expectedDate: formatDate(expectedDate),
        expectedTime: formatTime(expectedTime),
        status: 'approved', // Auto-approve for demo
        vehicleNumber: formData.vehicleNumber.trim() || undefined,
        numberOfGuests: parseInt(formData.numberOfGuests, 10),
      });

      Alert.alert(
        'Success',
        'Visitor pre-approved successfully! They will receive a notification.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.error('Error adding visitor:', error);
      Alert.alert('Error', 'Failed to add visitor. Please try again.');
    }
  }, [validateForm, formData, expectedDate, expectedTime, navigation]);

  return (
    <Container>
      <View style={VisitorStyles.container}>
        <HeaderComponent
          Title="Add Visitor"
          onPress={() => navigation.goBack()}
        />

        <ScrollView
          style={VisitorStyles.formContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Visitor Name */}
          <View style={VisitorStyles.inputGroup}>
            <Text style={VisitorStyles.label}>Visitor Name *</Text>
            <TextInput
              style={VisitorStyles.input}
              placeholder="Enter visitor's full name"
              value={formData.name}
              onChangeText={(text) => updateFormData('name', text)}
              placeholderTextColor="#9E9E9E"
            />
          </View>

          {/* Phone Number */}
          <View style={VisitorStyles.inputGroup}>
            <Text style={VisitorStyles.label}>Phone Number *</Text>
            <TextInput
              style={VisitorStyles.input}
              placeholder="Enter 10-digit phone number"
              value={formData.phone}
              onChangeText={(text) => updateFormData('phone', text)}
              keyboardType="phone-pad"
              maxLength={10}
              placeholderTextColor="#9E9E9E"
            />
          </View>

          {/* Purpose of Visit */}
          <View style={VisitorStyles.inputGroup}>
            <Text style={VisitorStyles.label}>Purpose of Visit *</Text>
            <TextInput
              style={[VisitorStyles.input, VisitorStyles.inputMultiline]}
              placeholder="E.g., Family visit, Plumber, Delivery, etc."
              value={formData.purpose}
              onChangeText={(text) => updateFormData('purpose', text)}
              multiline
              numberOfLines={3}
              placeholderTextColor="#9E9E9E"
            />
          </View>

          {/* Expected Date */}
          <View style={VisitorStyles.inputGroup}>
            <Text style={VisitorStyles.label}>Expected Date *</Text>
            <TouchableOpacity
              style={VisitorStyles.dateTimeButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={VisitorStyles.dateTimeText}>
                {formatDate(expectedDate)}
              </Text>
              <Text>📅</Text>
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={expectedDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}

          {/* Expected Time */}
          <View style={VisitorStyles.inputGroup}>
            <Text style={VisitorStyles.label}>Expected Time *</Text>
            <TouchableOpacity
              style={VisitorStyles.dateTimeButton}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={VisitorStyles.dateTimeText}>
                {formatTime(expectedTime)}
              </Text>
              <Text>🕐</Text>
            </TouchableOpacity>
          </View>

          {showTimePicker && (
            <DateTimePicker
              value={expectedTime}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleTimeChange}
            />
          )}

          {/* Vehicle Number */}
          <View style={VisitorStyles.inputGroup}>
            <Text style={VisitorStyles.label}>Vehicle Number (Optional)</Text>
            <TextInput
              style={VisitorStyles.input}
              placeholder="E.g., GJ01AB1234"
              value={formData.vehicleNumber}
              onChangeText={(text) => updateFormData('vehicleNumber', text.toUpperCase())}
              autoCapitalize="characters"
              placeholderTextColor="#9E9E9E"
            />
          </View>

          {/* Number of Guests */}
          <View style={VisitorStyles.inputGroup}>
            <Text style={VisitorStyles.label}>Number of Guests *</Text>
            <TextInput
              style={VisitorStyles.input}
              placeholder="Enter number of guests"
              value={formData.numberOfGuests}
              onChangeText={(text) => updateFormData('numberOfGuests', text)}
              keyboardType="number-pad"
              maxLength={2}
              placeholderTextColor="#9E9E9E"
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={VisitorStyles.submitButton}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text style={VisitorStyles.submitButtonText}>
              Pre-Approve Visitor
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Container>
  );
};

export default AddVisitor;
