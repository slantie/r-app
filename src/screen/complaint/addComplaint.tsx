import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { Container, HeaderComponent } from '../../components/common';
import Database, { Complaint } from '../../services/database';
import { COLORS } from '../../constants';
import addComplaintStyles from './styles/addComplaintStyles';

interface AddComplaintProps {
  navigation: {
    goBack: () => void;
  };
}

const AddComplaint: React.FC<AddComplaintProps> = ({ navigation }) => {
  const [category, setCategory] = useState<Complaint['category'] | ''>('');
  const [priority, setPriority] = useState<Complaint['priority']>('medium');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const categories: { value: Complaint['category']; label: string; icon: string }[] = [
    { value: 'plumbing', label: 'Plumbing', icon: '🚰' },
    { value: 'electrical', label: 'Electrical', icon: '💡' },
    { value: 'cleaning', label: 'Cleaning', icon: '🧹' },
    { value: 'security', label: 'Security', icon: '🔒' },
    { value: 'other', label: 'Other', icon: '📋' },
  ];

  const priorities: { value: Complaint['priority']; label: string; color: string }[] = [
    { value: 'low', label: 'Low', color: '#558B2F' },
    { value: 'medium', label: 'Medium', color: '#1565C0' },
    { value: 'high', label: 'High', color: '#E65100' },
    { value: 'urgent', label: 'Urgent', color: '#C62828' },
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
      const newComplaint: Complaint = {
        id: `C${Date.now()}`,
        category,
        title: title.trim(),
        description: description.trim(),
        priority,
        status: 'open',
        submittedDate: new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
        createdAt: new Date().toISOString(),
      };

      await Database.addComplaint(newComplaint);

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
    } catch (error) {
      console.error('Error submitting complaint:', error);
      Alert.alert('Error', 'Failed to submit complaint. Please try again.');
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
              placeholder="Brief summary of the issue"
              placeholderTextColor={COLORS.LIGHT_GRAY}
              value={title}
              onChangeText={setTitle}
              maxLength={100}
            />
            <Text style={addComplaintStyles.charCount}>{title.length}/100</Text>
          </View>

          {/* Description Input */}
          <View style={addComplaintStyles.section}>
            <Text style={addComplaintStyles.sectionTitle}>
              Description <Text style={addComplaintStyles.required}>*</Text>
            </Text>
            <TextInput
              style={[addComplaintStyles.input, addComplaintStyles.textArea]}
              placeholder="Describe the issue in detail..."
              placeholderTextColor={COLORS.LIGHT_GRAY}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              maxLength={500}
            />
            <Text style={addComplaintStyles.charCount}>{description.length}/500</Text>
          </View>

          {/* Info Box */}
          <View style={addComplaintStyles.infoBox}>
            <Text style={addComplaintStyles.infoIcon}>💡</Text>
            <Text style={addComplaintStyles.infoText}>
              Your complaint will be reviewed by our management team. You'll be notified about the
              progress via notifications.
            </Text>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              addComplaintStyles.submitButton,
              submitting && addComplaintStyles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={submitting}
          >
            {submitting ? (
              <ActivityIndicator size="small" color={COLORS.WHITE} />
            ) : (
              <Text style={addComplaintStyles.submitButtonText}>Submit Complaint</Text>
            )}
          </TouchableOpacity>

          <View style={addComplaintStyles.bottomSpacer} />
        </ScrollView>
      </View>
    </Container>
  );
};

export default AddComplaint;
