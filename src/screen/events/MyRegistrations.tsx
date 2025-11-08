import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/common/container';
import { RootState } from '../../store/reducers';
import {
  fetchMyRegistrations,
  cancelRegistration,
} from '../../store/actions/events/eventsAction';
import { selectUserDetailData } from '../../store/selectors/auth';

interface MyRegistrationsProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
    goBack: () => void;
  };
}

const MyRegistrations: React.FC<MyRegistrationsProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const userDetailData = useSelector(selectUserDetailData);
  const user = userDetailData?.data?.result;
  const memberId = user?._id || user?.id;

  const { loading, myRegistrations, error } = useSelector(
    (state: RootState) => state.events,
  );

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (memberId) {
      dispatch(fetchMyRegistrations(memberId) as never);
    }
  }, [dispatch, memberId]);

  const onRefresh = () => {
    setRefreshing(true);
    if (memberId) {
      dispatch(fetchMyRegistrations(memberId) as never);
    }
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleCancelRegistration = (registrationId: string, eventName: string) => {
    Alert.alert(
      'Cancel Registration',
      `Are you sure you want to cancel your registration for "${eventName}"?`,
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => {
            dispatch(cancelRegistration(registrationId) as never);
            setTimeout(() => {
              Alert.alert('Success', 'Registration cancelled successfully');
              if (memberId) {
                dispatch(fetchMyRegistrations(memberId) as never);
              }
            }, 1000);
          },
        },
      ],
    );
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatTime = (timeString: string): string => {
    if (!timeString) return '';
    return timeString;
  };

  const getEventIcon = (eventType: string): string => {
    switch (eventType?.toLowerCase()) {
      case 'festival':
        return '🎊';
      case 'sports':
        return '⚽';
      case 'cultural':
        return '🎭';
      case 'workshop':
        return '📚';
      case 'meeting':
        return '🤝';
      case 'celebration':
        return '🎉';
      default:
        return '📅';
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'registered':
        return '#34C759';
      case 'waitlist':
        return '#FF9500';
      case 'cancelled':
        return '#FF3B30';
      default:
        return '#999';
    }
  };

  const renderRegistrationItem = ({ item }: { item: any }) => {
    const canCancel = item.registrationStatus === 'registered' &&
                      new Date(item.eventDetails?.eventDate) > new Date();

    return (
      <View style={styles.registrationCard}>
        {/* Event Icon and Name */}
        <View style={styles.cardHeader}>
          <Text style={styles.eventIcon}>
            {getEventIcon(item.eventDetails?.eventType)}
          </Text>
          <View style={styles.headerInfo}>
            <Text style={styles.eventName}>{item.eventDetails?.eventName}</Text>
            <Text style={styles.eventType}>{item.eventDetails?.eventType}</Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(item.registrationStatus) },
            ]}>
            <Text style={styles.statusText}>
              {item.registrationStatus.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Event Details */}
        <View style={styles.detailsSection}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>📅 Date:</Text>
            <Text style={styles.detailValue}>
              {formatDate(item.eventDetails?.eventDate)}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>🕐 Time:</Text>
            <Text style={styles.detailValue}>
              {formatTime(item.eventDetails?.startTime)} - {formatTime(item.eventDetails?.endTime)}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>📍 Venue:</Text>
            <Text style={styles.detailValue}>{item.eventDetails?.venue}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>👥 Guests:</Text>
            <Text style={styles.detailValue}>{item.numberOfGuests}</Text>
          </View>
        </View>

        {/* Registration Info */}
        <View style={styles.registrationInfo}>
          <Text style={styles.registrationDate}>
            Registered on: {formatDate(item.registeredAt)}
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() =>
              navigation.navigate('EventDetails', {
                eventId: item.eventId,
              })
            }>
            <Text style={styles.viewButtonText}>View Event</Text>
          </TouchableOpacity>

          {canCancel && (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() =>
                handleCancelRegistration(item._id, item.eventDetails?.eventName)
              }>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  if (loading && (!myRegistrations || myRegistrations.length === 0)) {
    return (
      <Container>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#5773FF" />
          <Text style={styles.loadingText}>Loading registrations...</Text>
        </View>
      </Container>
    );
  }

  if (error && (!myRegistrations || myRegistrations.length === 0)) {
    return (
      <Container>
        <View style={styles.centerContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              if (memberId) {
                dispatch(fetchMyRegistrations(memberId) as never);
              }
            }}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <View style={styles.container}>
        <FlatList
          data={myRegistrations}
          renderItem={renderRegistrationItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#5773FF']}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>📭</Text>
              <Text style={styles.emptyText}>No Event Registrations</Text>
              <Text style={styles.emptySubtext}>
                Register for events to see them here
              </Text>
            </View>
          }
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#5773FF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  registrationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  eventIcon: {
    fontSize: 40,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  eventType: {
    fontSize: 12,
    color: '#999',
    textTransform: 'capitalize',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  detailsSection: {
    backgroundColor: '#F8F9FF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  detailLabel: {
    fontSize: 13,
    color: '#666',
    flex: 1,
  },
  detailValue: {
    fontSize: 13,
    color: '#1A1A1A',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  registrationInfo: {
    marginBottom: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  registrationDate: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  viewButton: {
    flex: 1,
    backgroundColor: '#5773FF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FF3B30',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default MyRegistrations;
