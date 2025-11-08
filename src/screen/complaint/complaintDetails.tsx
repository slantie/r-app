import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Database, { Complaint } from '../../services/database';
import { Container, HeaderComponent } from '../../components/common';
import { COLORS } from '../../constants';
import complaintDetailsStyles from './styles/complaintDetailsStyles';

interface Props {
  route: any;
  navigation: any;
}

const ComplaintDetails: React.FC<Props> = ({ route, navigation }) => {
  const { id } = route.params || {};
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        if (!id) return;
        const c = await Database.getComplaintById(id);
        if (mounted) setComplaint(c);
      } catch (error) {
        console.error('Error loading complaint:', error);
        Alert.alert('Error', 'Unable to load complaint details');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  const getCategoryIcon = (category: Complaint['category']): string => {
    switch (category) {
      case 'plumbing': return '🚰';
      case 'electrical': return '💡';
      case 'cleaning': return '🧹';
      case 'security': return '🔒';
      case 'other': return '📋';
      default: return '📋';
    }
  };

  const getCategoryLabel = (category: Complaint['category']): string => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const getPriorityColor = (priority: Complaint['priority']): string => {
    switch (priority) {
      case 'urgent': return '#C62828';
      case 'high': return '#E65100';
      case 'medium': return '#1565C0';
      case 'low': return '#558B2F';
      default: return '#757575';
    }
  };

  const getStatusLabel = (status: Complaint['status']): string => {
    switch (status) {
      case 'open': return 'Open';
      case 'in-progress': return 'In Progress';
      case 'resolved': return 'Resolved';
      case 'closed': return 'Closed';
      default: return status;
    }
  };

  const getStatusColor = (status: Complaint['status']): string => {
    switch (status) {
      case 'open': return '#E65100';
      case 'in-progress': return '#1565C0';
      case 'resolved': return '#2E7D32';
      case 'closed': return '#616161';
      default: return '#757575';
    }
  };

  const handleChangeStatus = async (newStatus: Complaint['status']) => {
    if (!complaint) return;

    const statusTransitions: Record<Complaint['status'], Complaint['status'][]> = {
      'open': ['in-progress', 'closed'],
      'in-progress': ['resolved', 'open'],
      'resolved': ['closed', 'open'],
      'closed': [],
    };

    const allowedStatuses = statusTransitions[complaint.status];
    
    if (!allowedStatuses.includes(newStatus)) {
      Alert.alert('Invalid Action', `Cannot change status from ${complaint.status} to ${newStatus}`);
      return;
    }

    try {
      const updates: Partial<Complaint> = { status: newStatus };
      
      if (newStatus === 'resolved') {
        updates.resolvedDate = new Date().toLocaleDateString('en-GB', { 
          day: '2-digit', 
          month: 'short', 
          year: 'numeric' 
        });
      }

      await Database.updateComplaint(complaint.id, updates);
      
      const updated = await Database.getComplaintById(complaint.id);
      setComplaint(updated);
      
      Alert.alert('Success', `Status updated to ${getStatusLabel(newStatus)}`);
    } catch (error) {
      console.error('Error updating status:', error);
      Alert.alert('Error', 'Failed to update status');
    }
  };

  const showStatusChangeOptions = () => {
    if (!complaint) return;

    const statusOptions: { label: string; status: Complaint['status'] }[] = [];

    if (complaint.status === 'open') {
      statusOptions.push(
        { label: 'Mark as In Progress', status: 'in-progress' },
        { label: 'Close Complaint', status: 'closed' }
      );
    } else if (complaint.status === 'in-progress') {
      statusOptions.push(
        { label: 'Mark as Resolved', status: 'resolved' },
        { label: 'Reopen', status: 'open' }
      );
    } else if (complaint.status === 'resolved') {
      statusOptions.push(
        { label: 'Close Complaint', status: 'closed' },
        { label: 'Reopen', status: 'open' }
      );
    }

    if (statusOptions.length === 0) {
      Alert.alert('Info', 'This complaint is closed and cannot be modified');
      return;
    }

    const buttons = statusOptions.map(option => ({
      text: option.label,
      onPress: () => handleChangeStatus(option.status),
    }));

    Alert.alert('Change Status', 'Select new status', [
      ...buttons,
      { text: 'Cancel', style: 'cancel' as const }
    ] as any);
  };

  const getDaysOpen = (submittedDate: string): number => {
    const submitted = new Date(submittedDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - submitted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <Container>
        <View style={complaintDetailsStyles.container}>
          <HeaderComponent
            Title="Complaint Details"
            onPress={() => navigation.goBack()}
          />
          <View style={complaintDetailsStyles.emptyContainer}>
            <ActivityIndicator size="large" color={COLORS.DARK_BLUE} />
            <Text style={complaintDetailsStyles.emptySubText}>Loading details...</Text>
          </View>
        </View>
      </Container>
    );
  }

  if (!complaint) {
    return (
      <Container>
        <View style={complaintDetailsStyles.container}>
          <HeaderComponent
            Title="Complaint Details"
            onPress={() => navigation.goBack()}
          />
          <View style={complaintDetailsStyles.emptyContainer}>
            <Text style={complaintDetailsStyles.emptyIcon}>📋</Text>
            <Text style={complaintDetailsStyles.emptyText}>Complaint not found</Text>
          </View>
        </View>
      </Container>
    );
  }

  const daysOpen = getDaysOpen(complaint.submittedDate);
  const needsEscalation = (complaint.status === 'open' || complaint.status === 'in-progress') && daysOpen > 7;

  return (
    <Container>
      <View style={complaintDetailsStyles.container}>
        <HeaderComponent
          Title="Complaint Details"
          onPress={() => navigation.goBack()}
        />
      
        <ScrollView 
          style={complaintDetailsStyles.contentWrapper}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={complaintDetailsStyles.headerSection}>
            <View style={complaintDetailsStyles.iconTitleRow}>
              <Text style={complaintDetailsStyles.categoryIconLarge}>
                {getCategoryIcon(complaint.category)}
              </Text>
              <View style={complaintDetailsStyles.titleColumn}>
                <Text style={complaintDetailsStyles.complaintTitle}>{complaint.title}</Text>
                <Text style={complaintDetailsStyles.categoryText}>
                  {getCategoryLabel(complaint.category)}
                </Text>
              </View>
            </View>

            <View style={complaintDetailsStyles.badgesRow}>
              <View style={[
                complaintDetailsStyles.priorityBadge,
                { backgroundColor: `${getPriorityColor(complaint.priority)}20` }
              ]}>
                <Text style={[
                  complaintDetailsStyles.priorityText,
                  { color: getPriorityColor(complaint.priority) }
                ]}>
                  {complaint.priority.toUpperCase()} PRIORITY
                </Text>
              </View>
              
              <View style={[
                complaintDetailsStyles.statusBadge,
                { backgroundColor: `${getStatusColor(complaint.status)}20` }
              ]}>
                <Text style={[
                  complaintDetailsStyles.statusText,
                  { color: getStatusColor(complaint.status) }
                ]}>
                  {getStatusLabel(complaint.status).toUpperCase()}
                </Text>
              </View>
            </View>

            {needsEscalation && (
              <View style={complaintDetailsStyles.escalationWarning}>
                <Text style={complaintDetailsStyles.escalationIcon}>⚠️</Text>
                <Text style={complaintDetailsStyles.escalationText}>
                  This complaint is {daysOpen} days old and needs escalation
                </Text>
              </View>
            )}
          </View>

          {/* Description Section */}
          <View style={complaintDetailsStyles.section}>
            <Text style={complaintDetailsStyles.sectionTitle}>Description</Text>
            <Text style={complaintDetailsStyles.descriptionText}>{complaint.description}</Text>
          </View>

          {/* Timeline Section */}
          <View style={complaintDetailsStyles.section}>
            <Text style={complaintDetailsStyles.sectionTitle}>Timeline</Text>
            
            <View style={complaintDetailsStyles.timelineContainer}>
              <View style={complaintDetailsStyles.timelineItem}>
                <View style={complaintDetailsStyles.timelineDot} />
                <View style={complaintDetailsStyles.timelineContent}>
                  <Text style={complaintDetailsStyles.timelineLabel}>Submitted</Text>
                  <Text style={complaintDetailsStyles.timelineDate}>{complaint.submittedDate}</Text>
                  <Text style={complaintDetailsStyles.timelineSubtext}>
                    {daysOpen} day{daysOpen !== 1 ? 's' : ''} ago
                  </Text>
                </View>
              </View>

              {complaint.assignedTo && (
                <View style={complaintDetailsStyles.timelineItem}>
                  <View style={[complaintDetailsStyles.timelineDot, complaintDetailsStyles.timelineDotBlue]} />
                  <View style={complaintDetailsStyles.timelineContent}>
                    <Text style={complaintDetailsStyles.timelineLabel}>Assigned</Text>
                    <Text style={complaintDetailsStyles.timelineDate}>{complaint.assignedTo}</Text>
                  </View>
                </View>
              )}

              {complaint.resolvedDate && (
                <View style={complaintDetailsStyles.timelineItem}>
                  <View style={[complaintDetailsStyles.timelineDot, complaintDetailsStyles.timelineDotGreen]} />
                  <View style={complaintDetailsStyles.timelineContent}>
                    <Text style={complaintDetailsStyles.timelineLabel}>Resolved</Text>
                    <Text style={complaintDetailsStyles.timelineDate}>{complaint.resolvedDate}</Text>
                  </View>
                </View>
              )}
            </View>
          </View>

          {/* Resolution Section */}
          {complaint.resolution && (
            <View style={complaintDetailsStyles.section}>
              <Text style={complaintDetailsStyles.sectionTitle}>Resolution</Text>
              <View style={complaintDetailsStyles.resolutionCard}>
                <Text style={complaintDetailsStyles.resolutionText}>{complaint.resolution}</Text>
              </View>
            </View>
          )}

          {/* Attachments Section */}
          {complaint.attachments && complaint.attachments.length > 0 && (
            <View style={complaintDetailsStyles.section}>
              <Text style={complaintDetailsStyles.sectionTitle}>
                Attachments ({complaint.attachments.length})
              </Text>
              <View style={complaintDetailsStyles.attachmentsContainer}>
                {complaint.attachments.map((attachment, index) => (
                  <View key={index} style={complaintDetailsStyles.attachmentItem}>
                    <Text style={complaintDetailsStyles.attachmentIcon}>📎</Text>
                    <Text style={complaintDetailsStyles.attachmentText} numberOfLines={1}>
                      {attachment}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Action Buttons */}
          {complaint.status !== 'closed' && (
            <View style={complaintDetailsStyles.actionSection}>
              <TouchableOpacity
                style={complaintDetailsStyles.changeStatusButton}
                onPress={showStatusChangeOptions}
              >
                <Text style={complaintDetailsStyles.changeStatusButtonText}>
                  Change Status
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={complaintDetailsStyles.bottomSpacer} />
        </ScrollView>
      </View>
    </Container>
  );
};

export default ComplaintDetails;
