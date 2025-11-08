import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Container, HeaderComponent } from '../../components/common';
import VisitorStyles from './styles/visitorStyles';
import VisitorStorageService, { Visitor } from '../../services/visitorStorage';
import { COLORS } from '../../constants';

interface VisitorManagementProps {
  navigation: {
    navigate: (screen: string, params?: object) => void;
    goBack: () => void;
  };
}

const VisitorManagement: React.FC<VisitorManagementProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming');
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Initialize storage on first load
  useEffect(() => {
    VisitorStorageService.initialize();
  }, []);

  // Load visitors whenever screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadVisitors();
    }, [])
  );

  const loadVisitors = async () => {
    try {
      setLoading(true);
      const allVisitors = await VisitorStorageService.getAllVisitors();
      setVisitors(allVisitors);
    } catch (error) {
      console.error('Error loading visitors:', error);
      Alert.alert('Error', 'Failed to load visitors');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadVisitors();
    setRefreshing(false);
  };

  const upcomingVisitors = visitors.filter(
    v => v.status === 'pending' || v.status === 'approved' || v.status === 'active'
  );
  const historyVisitors = visitors.filter(
    v => v.status === 'completed' || v.status === 'cancelled'
  );

  const getStatusStyle = (status: Visitor['status']) => {
    switch (status) {
      case 'pending':
        return { container: VisitorStyles.statusPending, text: VisitorStyles.statusTextPending };
      case 'approved':
        return { container: VisitorStyles.statusApproved, text: VisitorStyles.statusTextApproved };
      case 'active':
        return { container: VisitorStyles.statusActive, text: VisitorStyles.statusTextActive };
      case 'completed':
        return { container: VisitorStyles.statusCompleted, text: VisitorStyles.statusTextCompleted };
      case 'cancelled':
        return { container: VisitorStyles.statusCompleted, text: VisitorStyles.statusTextCompleted };
      default:
        return { container: VisitorStyles.statusPending, text: VisitorStyles.statusTextPending };
    }
  };

  const getStatusLabel = (status: Visitor['status']): string => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'approved':
        return 'Approved';
      case 'active':
        return 'Checked In';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const handleCancelVisitor = useCallback(async (visitorId: string, visitorName: string) => {
    Alert.alert(
      'Cancel Visitor',
      `Are you sure you want to cancel the visit for ${visitorName}?`,
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: async () => {
            try {
              const success = await VisitorStorageService.cancelVisitor(visitorId);
              if (success) {
                Alert.alert('Success', 'Visitor entry cancelled successfully');
                await loadVisitors(); // Reload to show updated list
              } else {
                Alert.alert('Error', 'Failed to cancel visitor');
              }
            } catch (error) {
              console.error('Error cancelling visitor:', error);
              Alert.alert('Error', 'Failed to cancel visitor');
            }
          },
        },
      ]
    );
  }, []);

  const handleViewDetails = useCallback((visitor: Visitor) => {
    navigation.navigate('VisitorDetails', { visitor });
  }, [navigation]);

  const renderVisitorCard = useCallback(({ item }: { item: Visitor }) => {
    const statusStyle = getStatusStyle(item.status);
    const isUpcoming = item.status !== 'completed' && item.status !== 'cancelled';

    return (
      <View style={VisitorStyles.visitorCard}>
        <View style={VisitorStyles.visitorHeader}>
          <View style={VisitorStyles.visitorInfo}>
            <Text style={VisitorStyles.visitorName}>{item.name}</Text>
            <Text style={VisitorStyles.visitorPhone}>{item.phone}</Text>
          </View>
          <View style={[VisitorStyles.statusBadge, statusStyle.container]}>
            <Text style={[VisitorStyles.statusText, statusStyle.text]}>
              {getStatusLabel(item.status)}
            </Text>
          </View>
        </View>

        <View style={VisitorStyles.visitorDetails}>
          <View style={VisitorStyles.detailRow}>
            <Text style={VisitorStyles.detailLabel}>Purpose:</Text>
            <Text style={VisitorStyles.detailValue}>{item.purpose}</Text>
          </View>
          <View style={VisitorStyles.detailRow}>
            <Text style={VisitorStyles.detailLabel}>Date & Time:</Text>
            <Text style={VisitorStyles.detailValue}>
              {item.expectedDate} at {item.expectedTime}
            </Text>
          </View>
          {item.vehicleNumber && (
            <View style={VisitorStyles.detailRow}>
              <Text style={VisitorStyles.detailLabel}>Vehicle:</Text>
              <Text style={VisitorStyles.detailValue}>{item.vehicleNumber}</Text>
            </View>
          )}
          <View style={VisitorStyles.detailRow}>
            <Text style={VisitorStyles.detailLabel}>Guests:</Text>
            <Text style={VisitorStyles.detailValue}>{item.numberOfGuests}</Text>
          </View>
        </View>

        <View style={VisitorStyles.actionButtons}>
          <TouchableOpacity
            style={[VisitorStyles.actionButton, VisitorStyles.viewButton]}
            onPress={() => handleViewDetails(item)}
          >
            <Text style={VisitorStyles.viewButtonText}>View Details</Text>
          </TouchableOpacity>
          {isUpcoming && (
            <TouchableOpacity
              style={[VisitorStyles.actionButton, VisitorStyles.cancelButton]}
              onPress={() => handleCancelVisitor(item.id, item.name)}
            >
              <Text style={VisitorStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }, [handleCancelVisitor, handleViewDetails]);

  const renderEmptyState = useCallback(() => (
    <View style={VisitorStyles.emptyContainer}>
      <Text style={VisitorStyles.emptyIcon}>👥</Text>
      <Text style={VisitorStyles.emptyText}>
        {activeTab === 'upcoming' ? 'No Upcoming Visitors' : 'No Visitor History'}
      </Text>
      <Text style={VisitorStyles.emptySubText}>
        {activeTab === 'upcoming'
          ? 'Pre-approve visitors to get started'
          : 'Your past visitors will appear here'}
      </Text>
    </View>
  ), [activeTab]);

  const handleAddVisitor = useCallback(() => {
    navigation.navigate('AddVisitor');
  }, [navigation]);

  if (loading) {
    return (
      <Container>
        <View style={VisitorStyles.container}>
          <HeaderComponent
            Title="Visitor Management"
            onPress={() => navigation.goBack()}
          />
          <View style={VisitorStyles.emptyContainer}>
            <ActivityIndicator size="large" color={COLORS.DARK_BLUE} />
            <Text style={VisitorStyles.emptySubText}>Loading visitors...</Text>
          </View>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <View style={VisitorStyles.container}>
        <HeaderComponent
          Title="Visitor Management"
          onPress={() => navigation.goBack()}
        />

        <View style={VisitorStyles.contentWrapper}>
          {/* Tab Switcher */}
          <View style={VisitorStyles.tabContainer}>
            <TouchableOpacity
              style={[
                VisitorStyles.tab,
                activeTab === 'upcoming' && VisitorStyles.activeTab,
              ]}
              onPress={() => setActiveTab('upcoming')}
            >
              <Text
                style={[
                  VisitorStyles.tabText,
                  activeTab === 'upcoming' && VisitorStyles.activeTabText,
                ]}
              >
                Upcoming ({upcomingVisitors.length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                VisitorStyles.tab,
                activeTab === 'history' && VisitorStyles.activeTab,
              ]}
              onPress={() => setActiveTab('history')}
            >
              <Text
                style={[
                  VisitorStyles.tabText,
                  activeTab === 'history' && VisitorStyles.activeTabText,
                ]}
              >
                History ({historyVisitors.length})
              </Text>
            </TouchableOpacity>
          </View>

          {/* Visitor List */}
          <FlatList
            data={activeTab === 'upcoming' ? upcomingVisitors : historyVisitors}
            renderItem={renderVisitorCard}
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
              (activeTab === 'upcoming' && upcomingVisitors.length === 0) ||
              (activeTab === 'history' && historyVisitors.length === 0)
                ? VisitorStyles.listContentEmpty
                : undefined
            }
          />
        </View>

        {/* Add Visitor FAB */}
        <TouchableOpacity
          style={VisitorStyles.fabButton}
          onPress={handleAddVisitor}
          activeOpacity={0.8}
        >
          <Text style={VisitorStyles.fabIcon}>+</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default VisitorManagement;
