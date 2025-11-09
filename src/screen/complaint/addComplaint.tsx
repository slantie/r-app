import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { Container, HeaderComponent } from '../../components/common';
import { MakeApiRequest } from '../../services/apiService';
import { POST } from '../../constants/api';
import { COLORS } from '../../constants';
import addComplaintStyles from './styles/addComplaintStyles';

interface AddComplaintProps {
  navigation: {
    goBack: () => void;
    navigate: (screen: string) => void;
  };
}

const AddComplaint: React.FC<AddComplaintProps> = ({ navigation }) => {
  const { userData } = useSelector((state: any) => state.otp);
  const userId = userData?.user?._id || userData?._id;
  const memberId = userData?.member?._id;
  const unitId = userData?.member?.unitId;
  const buildingId = userData?.member?.buildingId || userData?.user?.buildingId;

  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('medium');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const categories = [
    { value: 'plumbing', label: 'Plumbing', icon: '🚰' },
    { value: 'electrical', label: 'Electrical', icon: '💡' },
    { value: 'cleaning', label: 'Cleaning', icon: '🧹' },
    { value: 'security', label: 'Security', icon: '🔒' },
    { value: 'maintenance', label: 'Maintenance', icon: '🔧' },
    { value: 'other', label: 'Other', icon: '📋' },
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: '#558B2F' },
    { value: 'medium', label: 'Medium', color: '#1565C0' },
    { value: 'high', label: 'High', color: '#E65100' },
  ];

  const handleSubmit = async () => {
    // Validation
    if (!category) {
      Alert.alert('Validation Error', 'Please select a category');
      return;
    }
    if (!title.trim()) {
      Alert.alert('Validation Error', 'Please enter a title');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Validation Error', 'Please enter a description');
      return;
    }

    setSubmitting(true);

    try {
      const response = await MakeApiRequest({
        apiUrl: 'http://10.0.2.2:5000/api/complaints',
        apiMethod: POST,
        apiData: {
          title: title.trim(),
          category,
          priority,
          description: description.trim(),
          complaintType: 'unit',
          buildingId,
          unitId,
          memberId,
        },
      });

      if (response.data.success) {
        Alert.alert(
          'Success',
          'Your complaint has been submitted successfully. Our team will review it shortly.',
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ]
        );
      }
    } catch (error: any) {
      console.error('Error submitting complaint:', error);
      Alert.alert('Error', error.response?.data?.message || 'Failed to submit complaint. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <View style={addComplaintStyles.container}>
        <HeaderComponent Title="Raise Complaint" onPress={() => navigation.goBack()} />

        <ScrollView
          style={addComplaintStyles.contentWrapper}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Category Selection */}
          <View style={addComplaintStyles.section}>
            <Text style={addComplaintStyles.sectionTitle}>
              Category <Text style={addComplaintStyles.required}>*</Text>
            </Text>
            <View style={addComplaintStyles.categoryGrid}>
              {categories.map(cat => (
                <TouchableOpacity
                  key={cat.value}
                  style={[
                    addComplaintStyles.categoryCard,
                    category === cat.value && addComplaintStyles.categoryCardActive,
                  ]}
                  onPress={() => setCategory(cat.value)}
                >
                  <Text style={addComplaintStyles.categoryIcon}>{cat.icon}</Text>
                  <Text
                    style={[
                      addComplaintStyles.categoryLabel,
                      category === cat.value && addComplaintStyles.categoryLabelActive,
                    ]}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Priority Selection */}
          <View style={addComplaintStyles.section}>
            <Text style={addComplaintStyles.sectionTitle}>Priority</Text>
            <View style={addComplaintStyles.priorityRow}>
              {priorities.map(p => (
                <TouchableOpacity
                  key={p.value}
                  style={[
                    addComplaintStyles.priorityChip,
                    priority === p.value && {
                      backgroundColor: `${p.color}20`,
                      borderColor: p.color,
                    },
                  ]}
                  onPress={() => setPriority(p.value)}
                >
                  <Text
                    style={[
                      addComplaintStyles.priorityText,
                      priority === p.value && { color: p.color },
                    ]}
                  >
                    {p.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Title Input */}
          <View style={addComplaintStyles.section}>
            <Text style={addComplaintStyles.sectionTitle}>
              Title <Text style={addComplaintStyles.required}>*</Text>
            </Text>
            <TextInput
              style={addComplaintStyles.input}
              placeholder="Enter complaint title"
              placeholderTextColor="#999"
              value={title}
              onChangeText={setTitle}
              maxLength={100}
            />
          </View>

          {/* Description Input */}
          <View style={addComplaintStyles.section}>
            <Text style={addComplaintStyles.sectionTitle}>
              Description <Text style={addComplaintStyles.required}>*</Text>
            </Text>
            <TextInput
              style={[addComplaintStyles.input, addComplaintStyles.textArea]}
              placeholder="Describe your complaint in detail..."
              placeholderTextColor="#999"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[addComplaintStyles.submitButton, submitting && addComplaintStyles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={submitting}
          >
            {submitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={addComplaintStyles.submitButtonText}>Submit Complaint</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Container>
  );
};

export default AddComplaint;
