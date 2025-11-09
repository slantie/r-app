import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator, RefreshControl, KeyboardAvoidingView, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Container, HeaderComponent } from '../../components/common';
import { MakeApiRequest } from '../../services/apiService';
import { GET, POST } from '../../constants/api';
import { COLORS } from '../../constants';
import complaintDetailsStyles from './styles/complaintDetailsStyles';

interface Props {
  route: any;
  navigation: any;
}

const ComplaintDetails: React.FC<Props> = ({ route, navigation }) => {
  const { complaintId } = route.params || {};
  const { userData } = useSelector((state: any) => state.otp);
  const userId = userData?.user?._id || userData?._id;

  const [complaint, setComplaint] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [sendingReply, setSendingReply] = useState(false);

  const loadComplaintDetails = useCallback(async () => {
    try {
      setLoading(true);
      const response = await MakeApiRequest({
        apiUrl: `http://10.0.2.2:5000/api/complaints/${complaintId}`,
        apiMethod: GET,
      });

      if (response.data.success) {
        setComplaint(response.data.data);
      }
    } catch (error) {
      console.error('Error loading complaint details:', error);
      Alert.alert('Error', 'Failed to load complaint details');
    } finally {
      setLoading(false);
    }
  }, [complaintId]);

  useFocusEffect(
    useCallback(() => {
      loadComplaintDetails();
    }, [loadComplaintDetails])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadComplaintDetails();
    setRefreshing(false);
  };

  const handleSendReply = async () => {
    if (!replyText.trim()) {
      Alert.alert('Error', 'Please enter a message');
      return;
    }

    setSendingReply(true);
    try {
      const response = await MakeApiRequest({
        apiUrl: `http://10.0.2.2:5000/api/complaints/${complaintId}/reply`,
        apiMethod: POST,
        apiData: {
          message: replyText.trim(),
          isAdminReply: false,
        },
      });

      if (response.data.success) {
        setReplyText('');
        await loadComplaintDetails();
      }
    } catch (error: any) {
      console.error('Error sending reply:', error);
      Alert.alert('Error', error.response?.data?.message || 'Failed to send reply');
    } finally {
      setSendingReply(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
      case 're-open':
        return '#E65100';
      case 'in-process':
        return '#1565C0';
      case 'on-hold':
        return '#F57C00';
      case 'close':
        return '#558B2F';
      case 'dismiss':
        return '#757575';
      default:
        return '#999';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return '#558B2F';
      case 'medium':
        return '#1565C0';
      case 'high':
        return '#E65100';
      default:
        return '#999';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open':
        return 'Open';
      case 'in-process':
        return 'In Progress';
      case 'on-hold':
        return 'On Hold';
      case 'close':
        return 'Closed';
      case 're-open':
        return 'Re-opened';
      case 'dismiss':
        return 'Dismissed';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <Container>
        <View style={complaintDetailsStyles.container}>
          <HeaderComponent Title="Complaint Details" onPress={() => navigation.goBack()} />
          <View style={complaintDetailsStyles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.DARK_BLUE} />
            <Text style={complaintDetailsStyles.loadingText}>Loading...</Text>
          </View>
        </View>
      </Container>
    );
  }

  if (!complaint) {
    return (
      <Container>
        <View style={complaintDetailsStyles.container}>
          <HeaderComponent Title="Complaint Details" onPress={() => navigation.goBack()} />
          <View style={complaintDetailsStyles.loadingContainer}>
            <Text style={complaintDetailsStyles.errorText}>Complaint not found</Text>
          </View>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <KeyboardAvoidingView
        style={complaintDetailsStyles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <HeaderComponent Title="Complaint Details" onPress={() => navigation.goBack()} />

        <ScrollView
          style={complaintDetailsStyles.content}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.DARK_BLUE]} />}
        >
          {/* Header */}
          <View style={complaintDetailsStyles.header}>
            <View style={complaintDetailsStyles.headerRow}>
              <View style={[complaintDetailsStyles.statusBadge, { backgroundColor: `${getStatusColor(complaint.complaintStatus)}20` }]}>
                <Text style={[complaintDetailsStyles.statusText, { color: getStatusColor(complaint.complaintStatus) }]}>
                  {getStatusLabel(complaint.complaintStatus)}
                </Text>
              </View>
              <View style={[complaintDetailsStyles.priorityBadge, { backgroundColor: `${getPriorityColor(complaint.priority)}20` }]}>
                <Text style={[complaintDetailsStyles.priorityText, { color: getPriorityColor(complaint.priority) }]}>
                  {complaint.priority.toUpperCase()}
                </Text>
              </View>
            </View>

            <Text style={complaintDetailsStyles.title}>{complaint.title}</Text>
            <Text style={complaintDetailsStyles.category}>📋 {complaint.category}</Text>
            <Text style={complaintDetailsStyles.date}>
              Submitted on {new Date(complaint.createdAt).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </Text>
          </View>

          {/* Description */}
          <View style={complaintDetailsStyles.section}>
            <Text style={complaintDetailsStyles.sectionTitle}>Description</Text>
            <Text style={complaintDetailsStyles.description}>{complaint.description}</Text>
          </View>

          {/* Replies Thread */}
          <View style={complaintDetailsStyles.section}>
            <Text style={complaintDetailsStyles.sectionTitle}>
              Conversation ({complaint.replies?.length || 0})
            </Text>

            {complaint.replies && complaint.replies.length > 0 ? (
              complaint.replies.map((reply: any, index: number) => (
                <View
                  key={index}
                  style={[
                    complaintDetailsStyles.replyCard,
                    reply.isAdminReply && complaintDetailsStyles.adminReplyCard,
                  ]}
                >
                  <View style={complaintDetailsStyles.replyHeader}>
                    <View style={complaintDetailsStyles.replyAuthor}>
                      <View
                        style={[
                          complaintDetailsStyles.avatarCircle,
                          reply.isAdminReply && complaintDetailsStyles.adminAvatarCircle,
                        ]}
                      >
                        <Text style={complaintDetailsStyles.avatarText}>
                          {reply.isAdminReply ? '👨‍💼' : '👤'}
                        </Text>
                      </View>
                      <View>
                        <Text style={complaintDetailsStyles.authorName}>
                          {reply.isAdminReply ? 'Admin' : reply.createdBy?.firstName || 'You'}
                        </Text>
                        <Text style={complaintDetailsStyles.replyTime}>
                          {new Date(reply.createdAt).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Text style={complaintDetailsStyles.replyMessage}>{reply.message}</Text>
                </View>
              ))
            ) : (
              <View style={complaintDetailsStyles.emptyReplies}>
                <Text style={complaintDetailsStyles.emptyRepliesText}>No replies yet</Text>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Reply Input */}
        {complaint.complaintStatus !== 'close' && complaint.complaintStatus !== 'dismiss' && (
          <View style={complaintDetailsStyles.replyInputContainer}>
            <TextInput
              style={complaintDetailsStyles.replyInput}
              placeholder="Type your message..."
              placeholderTextColor="#999"
              value={replyText}
              onChangeText={setReplyText}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[complaintDetailsStyles.sendButton, (sendingReply || !replyText.trim()) && complaintDetailsStyles.sendButtonDisabled]}
              onPress={handleSendReply}
              disabled={sendingReply || !replyText.trim()}
            >
              {sendingReply ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={complaintDetailsStyles.sendButtonText}>Send</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </Container>
  );
};

export default ComplaintDetails;
