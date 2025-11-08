import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Container, HeaderComponent } from '../../components/common';
import Database, { Complaint } from '../../services/database';
import { COLORS } from '../../constants';
import complaintStyles from './styles/complaintStyles';

interface ComplaintManagementProps {
  navigation: {
    navigate: (screen: string, params?: object) => void;
    goBack: () => void;
  };
}

const ComplaintManagement: React.FC<ComplaintManagementProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<'open' | 'resolved'>('open');
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadComplaints();
    }, [])
  );

  const loadComplaints = async () => {
    try {
      setLoading(true);
      const allComplaints = await Database.getAllComplaints();
      // Sort by date - newest first
      const sorted = allComplaints.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      setComplaints(sorted);
    } catch (error) {
      console.error('Error loading complaints:', error);
      Alert.alert('Error', 'Failed to load complaints');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadComplaints();
    setRefreshing(false);
  };

  const openComplaints = complaints.filter(
    c => c.status === 'open' || c.status === 'in-progress'
  );
  const resolvedComplaints = complaints.filter(
    c => c.status === 'resolved' || c.status === 'closed'
  );

  const getCategoryIcon = (category: Complaint['category']): string => {
    switch (category) {
      case 'plumbing':
        return '🚰';
      case 'electrical':
        return '💡';
      case 'cleaning':
        return '🧹';
      case 'security':
        return '🔒';
      case 'other':
        return '📋';
      default:
        return '📋';
    }
  };

  const getPriorityStyle = (priority: Complaint['priority']) => {
    switch (priority) {
      case 'urgent':
        return { container: complaintStyles.priorityUrgent, text: complaintStyles.priorityTextUrgent };
      case 'high':
        return { container: complaintStyles.priorityHigh, text: complaintStyles.priorityTextHigh };
      case 'medium':
        return { container: complaintStyles.priorityMedium, text: complaintStyles.priorityTextMedium };
      case 'low':
        return { container: complaintStyles.priorityLow, text: complaintStyles.priorityTextLow };
      default:
        return { container: complaintStyles.priorityMedium, text: complaintStyles.priorityTextMedium };
    }
  };

  const getStatusStyle = (status: Complaint['status']) => {
    switch (status) {
      case 'open':
        return { container: complaintStyles.statusOpen, text: complaintStyles.statusTextOpen };
      case 'in-progress':
        return { container: complaintStyles.statusInProgress, text: complaintStyles.statusTextInProgress };
      case 'resolved':
        return { container: complaintStyles.statusResolved, text: complaintStyles.statusTextResolved };
      case 'closed':
        return { container: complaintStyles.statusClosed, text: complaintStyles.statusTextClosed };
      default:
        return { container: complaintStyles.statusOpen, text: complaintStyles.statusTextOpen };
    }
  };

  const getStatusLabel = (status: Complaint['status']): string => {
    switch (status) {
      case 'open':
        return 'Open';
      case 'in-progress':
        return 'In Progress';
      case 'resolved':
        return 'Resolved';
      case 'closed':
        return 'Closed';
      default:
        return status;
    }
  };

  const getCategoryLabel = (category: Complaint['category']): string => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const getDaysOpen = (submittedDate: string): number => {
    const submitted = new Date(submittedDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - submitted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleViewDetails = useCallback((complaint: Complaint) => {
    navigation.navigate('ComplaintDetails', { id: complaint.id });
  }, [navigation]);

  const handleDeleteComplaint = useCallback(async (complaintId: string, title: string) => {
    Alert.alert(
      'Delete Complaint',
      `Are you sure you want to delete "${title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await Database.deleteComplaint(complaintId);
              Alert.alert('Success', 'Complaint deleted successfully');
              await loadComplaints();
            } catch (error) {
              console.error('Error deleting complaint:', error);
              Alert.alert('Error', 'Failed to delete complaint');
            }
          },
        },
      ]
    );
  }, []);

  const renderComplaintCard = useCallback(({ item }: { item: Complaint }) => {
    const priorityStyle = getPriorityStyle(item.priority);
    const statusStyle = getStatusStyle(item.status);
    const daysOpen = getDaysOpen(item.submittedDate);
    const isOpen = item.status === 'open' || item.status === 'in-progress';
    const needsEscalation = isOpen && daysOpen > 7; // Escalate after 7 days

    return (
      <View style={complaintStyles.complaintCard}>
        <View style={complaintStyles.cardHeader}>
          <View style={complaintStyles.headerLeft}>
            <Text style={complaintStyles.categoryIcon}>{getCategoryIcon(item.category)}</Text>
            <View style={complaintStyles.titleSection}>
              <Text style={complaintStyles.complaintTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={complaintStyles.categoryLabel}>
                {getCategoryLabel(item.category)}
              </Text>
            </View>
          </View>
          <View style={[complaintStyles.priorityBadge, priorityStyle.container]}>
            <Text style={[complaintStyles.priorityText, priorityStyle.text]}>
              {item.priority.toUpperCase()}
            </Text>
          </View>
        </View>

        <Text style={complaintStyles.description} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={complaintStyles.metaInfo}>
          <View style={complaintStyles.metaRow}>
            <Text style={complaintStyles.metaLabel}>Submitted:</Text>
            <Text style={complaintStyles.metaValue}>{item.submittedDate}</Text>
          </View>
          {item.assignedTo && (
            <View style={complaintStyles.metaRow}>
              <Text style={complaintStyles.metaLabel}>Assigned to:</Text>
              <Text style={complaintStyles.metaValue}>{item.assignedTo}</Text>
            </View>
          )}
          {item.resolvedDate && (
            <View style={complaintStyles.metaRow}>
              <Text style={complaintStyles.metaLabel}>Resolved:</Text>
              <Text style={complaintStyles.metaValue}>{item.resolvedDate}</Text>
            </View>
          )}
        </View>

        <View style={complaintStyles.cardFooter}>
          <View style={complaintStyles.statusSection}>
            <View style={[complaintStyles.statusBadge, statusStyle.container]}>
              <Text style={[complaintStyles.statusText, statusStyle.text]}>
                {getStatusLabel(item.status)}
              </Text>
            </View>
            {needsEscalation && (
              <View style={complaintStyles.escalationBadge}>
                <Text style={complaintStyles.escalationText}>⚠️ {daysOpen} days old</Text>
              </View>
            )}
          </View>

          <View style={complaintStyles.actionButtons}>
            <TouchableOpacity
              style={complaintStyles.viewButton}
              onPress={() => handleViewDetails(item)}
            >
              <Text style={complaintStyles.viewButtonText}>View Details</Text>
            </TouchableOpacity>
            {item.status === 'closed' && (
              <TouchableOpacity
                style={complaintStyles.deleteButton}
                onPress={() => handleDeleteComplaint(item.id, item.title)}
              >
                <Text style={complaintStyles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  }, [handleViewDetails, handleDeleteComplaint]);

  const renderEmptyState = useCallback(() => (
    <View style={complaintStyles.emptyContainer}>
      <Text style={complaintStyles.emptyIcon}>
        {activeTab === 'open' ? '📝' : '✅'}
      </Text>
      <Text style={complaintStyles.emptyText}>
        {activeTab === 'open' ? 'No Open Complaints' : 'No Resolved Complaints'}
      </Text>
      <Text style={complaintStyles.emptySubText}>
        {activeTab === 'open'
          ? 'Raise a complaint to get started'
          : 'Your resolved complaints will appear here'}
      </Text>
    </View>
  ), [activeTab]);

  const handleAddComplaint = useCallback(() => {
    navigation.navigate('AddComplaint');
  }, [navigation]);

  if (loading) {
    return (
      <Container>
        <View style={complaintStyles.container}>
          <HeaderComponent
            Title="Complaints & Issues"
            onPress={() => navigation.goBack()}
          />
          <View style={complaintStyles.emptyContainer}>
            <ActivityIndicator size="large" color={COLORS.DARK_BLUE} />
            <Text style={complaintStyles.emptySubText}>Loading complaints...</Text>
          </View>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <View style={complaintStyles.container}>
        <HeaderComponent
          Title="Complaints & Issues"
          onPress={() => navigation.goBack()}
        />

        <View style={complaintStyles.contentWrapper}>
          {/* Tab Switcher */}
          <View style={complaintStyles.tabContainer}>
            <TouchableOpacity
              style={[
                complaintStyles.tab,
                activeTab === 'open' && complaintStyles.activeTab,
              ]}
              onPress={() => setActiveTab('open')}
            >
              <Text
                style={[
                  complaintStyles.tabText,
                  activeTab === 'open' && complaintStyles.activeTabText,
                ]}
              >
                Open ({openComplaints.length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                complaintStyles.tab,
                activeTab === 'resolved' && complaintStyles.activeTab,
              ]}
              onPress={() => setActiveTab('resolved')}
            >
              <Text
                style={[
                  complaintStyles.tabText,
                  activeTab === 'resolved' && complaintStyles.activeTabText,
                ]}
              >
                Resolved ({resolvedComplaints.length})
              </Text>
            </TouchableOpacity>
          </View>

          {/* Complaints List */}
          <FlatList
            data={activeTab === 'open' ? openComplaints : resolvedComplaints}
            renderItem={renderComplaintCard}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmptyState}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[COLORS.DARK_BLUE]}
              />
            }
            contentContainerStyle={
              (activeTab === 'open' && openComplaints.length === 0) ||
              (activeTab === 'resolved' && resolvedComplaints.length === 0)
                ? complaintStyles.listContentEmpty
                : undefined
            }
          />
        </View>

        {/* Add Complaint FAB */}
        <TouchableOpacity
          style={complaintStyles.fabButton}
          onPress={handleAddComplaint}
          activeOpacity={0.8}
        >
          <Text style={complaintStyles.fabIcon}>+</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default ComplaintManagement;
