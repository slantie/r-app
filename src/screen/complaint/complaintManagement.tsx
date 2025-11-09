import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Container, HeaderComponent } from '../../components/common';
import { MakeApiRequest } from '../../services/apiService';
import { GET } from '../../constants/api';
import { COLORS } from '../../constants';
import complaintStyles from './styles/complaintStyles';

interface ComplaintManagementProps {
  navigation: {
    navigate: (screen: string, params?: object) => void;
    goBack: () => void;
  };
}

const ComplaintManagement: React.FC<ComplaintManagementProps> = ({ navigation }) => {
  const { userData } = useSelector((state: any) => state.otp);
  const memberId = userData?.member?._id;

  const [activeTab, setActiveTab] = useState<'open' | 'resolved'>('open');
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadComplaints = useCallback(async () => {
    if (!memberId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await MakeApiRequest({
        apiUrl: `http://10.0.2.2:5000/api/complaints?memberId=${memberId}`,
        apiMethod: GET,
      });

      if (response.data.success) {
        setComplaints(response.data.data);
      }
    } catch (error) {
      console.error('Error loading complaints:', error);
      Alert.alert('Error', 'Failed to load complaints');
    } finally {
      setLoading(false);
    }
  }, [memberId]);

  useFocusEffect(
    useCallback(() => {
      loadComplaints();
    }, [loadComplaints])
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadComplaints();
    setRefreshing(false);
  };

  const openComplaints = complaints.filter(
    c => c.complaintStatus === 'open' || c.complaintStatus === 'in-process' || c.complaintStatus === 're-open'
  );
  const resolvedComplaints = complaints.filter(
    c => c.complaintStatus === 'close' || c.complaintStatus === 'dismiss'
  );

  const getCategoryIcon = (category: string): string => {
    switch (category) {
      case 'plumbing':
        return '🚰';
      case 'electrical':
        return '💡';
      case 'cleaning':
        return '🧹';
      case 'security':
        return '🔒';
      case 'maintenance':
        return '🔧';
      case 'other':
        return '📋';
      default:
        return '📋';
    }
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
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

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'open':
      case 're-open':
        return { container: complaintStyles.statusOpen, text: complaintStyles.statusTextOpen };
      case 'in-process':
        return { container: complaintStyles.statusInProgress, text: complaintStyles.statusTextInProgress };
      case 'on-hold':
        return { container: complaintStyles.statusClosed, text: complaintStyles.statusTextClosed };
      case 'close':
        return { container: complaintStyles.statusResolved, text: complaintStyles.statusTextResolved };
      case 'dismiss':
        return { container: complaintStyles.statusClosed, text: complaintStyles.statusTextClosed };
      default:
        return { container: complaintStyles.statusOpen, text: complaintStyles.statusTextOpen };
    }
  };

  const getStatusLabel = (status: string): string => {
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

  const getCategoryLabel = (category: string): string => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const getDaysOpen = (createdAt: string): number => {
    const created = new Date(createdAt);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleViewDetails = useCallback((complaint: any) => {
    navigation.navigate('ComplaintDetails', { complaintId: complaint._id });
  }, [navigation]);

  const renderComplaintCard = useCallback(({ item }: { item: any }) => {
    const priorityStyle = getPriorityStyle(item.priority);
    const statusStyle = getStatusStyle(item.complaintStatus);
    const daysOpen = getDaysOpen(item.createdAt);
    const isOpen = item.complaintStatus === 'open' || item.complaintStatus === 'in-process';
    const needsEscalation = isOpen && daysOpen > 7;

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
            <Text style={complaintStyles.metaValue}>
              {new Date(item.createdAt).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </Text>
          </View>
          {item.resolvedDate && (
            <View style={complaintStyles.metaRow}>
              <Text style={complaintStyles.metaLabel}>Resolved:</Text>
              <Text style={complaintStyles.metaValue}>
                {new Date(item.resolvedDate).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </Text>
            </View>
          )}
        </View>

        <View style={complaintStyles.cardFooter}>
          <View style={complaintStyles.statusSection}>
            <View style={[complaintStyles.statusBadge, statusStyle.container]}>
              <Text style={[complaintStyles.statusText, statusStyle.text]}>
                {getStatusLabel(item.complaintStatus)}
              </Text>
            </View>
            {needsEscalation && (
              <View style={complaintStyles.escalationBadge}>
                <Text style={complaintStyles.escalationText}>⚠️ {daysOpen} days old</Text>
              </View>
            )}
            {item.replies && item.replies.length > 0 && (
              <Text style={complaintStyles.replyCount}>💬 {item.replies.length}</Text>
            )}
          </View>

          <View style={complaintStyles.actionButtons}>
            <TouchableOpacity
              style={complaintStyles.viewButton}
              onPress={() => handleViewDetails(item)}
            >
              <Text style={complaintStyles.viewButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }, [handleViewDetails]);

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
            keyExtractor={item => item._id}
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
