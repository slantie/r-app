import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, RefreshControl, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/common/container';
import { RootState } from '../../store/reducers';
import { fetchMyBookings, cancelBooking } from '../../store/actions/amenities/amenitiesAction';
import { selectUserDetailData } from '../../store/selectors/auth';

interface MyBookingsProps {
  navigation: {
    goBack: () => void;
  };
}

const MyBookings: React.FC<MyBookingsProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const userDetailData = useSelector(selectUserDetailData);
  const user = userDetailData?.data?.result;
  const unitId = user?.unitId || user?.unit?._id;

  const { loading, myBookings, cancelling, error } = useSelector((state: RootState) => state.amenities);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    if (unitId) {
      dispatch(fetchMyBookings(unitId) as never);
    }
  }, [dispatch, unitId]);

  const onRefresh = () => {
    setRefreshing(true);
    if (unitId) {
      dispatch(fetchMyBookings(unitId) as never);
    }
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleCancelBooking = (bookingId: string, amenityName: string) => {
    Alert.alert(
      'Cancel Booking',
      `Are you sure you want to cancel your booking for ${amenityName}?`,
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => {
            dispatch(cancelBooking(bookingId) as never);
            setTimeout(() => {
              if (unitId) {
                dispatch(fetchMyBookings(unitId) as never);
              }
            }, 500);
          },
        },
      ]
    );
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'confirmed':
        return '#4CAF50';
      case 'pending':
        return '#FF9800';
      case 'cancelled':
        return '#F44336';
      case 'completed':
        return '#2196F3';
      default:
        return '#999';
    }
  };

  const isUpcoming = (bookingDate: string): boolean => {
    return new Date(bookingDate) >= new Date();
  };

  const renderBookingItem = ({ item }: { item: any }) => {
    const upcoming = isUpcoming(item.bookingDate);

    return (
      <View style={styles.bookingCard}>
        <View style={styles.bookingHeader}>
          <Text style={styles.amenityName}>{item.amenityId?.name || 'Amenity'}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {item.status.toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.bookingDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>📅</Text>
            <Text style={styles.detailText}>
              {new Date(item.bookingDate).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
          </View>

          {item.slotId && (
            <View style={styles.detailRow}>
              <Text style={styles.detailIcon}>⏰</Text>
              <Text style={styles.detailText}>
                {item.slotId.startTime} - {item.slotId.endTime}
              </Text>
            </View>
          )}

          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>🎫</Text>
            <Text style={styles.detailText}>Booking ID: {item._id.slice(-8)}</Text>
          </View>

          {item.bookingDate && (
            <View style={styles.detailRow}>
              <Text style={styles.detailIcon}>📝</Text>
              <Text style={styles.detailText}>
                Booked on: {new Date(item.createdAt).toLocaleDateString('en-US')}
              </Text>
            </View>
          )}
        </View>

        {upcoming && item.status === 'confirmed' && (
          <TouchableOpacity
            style={[styles.cancelButton, cancelling && styles.cancelButtonDisabled]}
            onPress={() => handleCancelBooking(item._id, item.amenityId?.name || 'this amenity')}
            disabled={cancelling}
          >
            <Text style={styles.cancelButtonText}>
              {cancelling ? 'Cancelling...' : 'Cancel Booking'}
            </Text>
          </TouchableOpacity>
        )}

        {!upcoming && (
          <View style={styles.pastBookingNote}>
            <Text style={styles.pastBookingText}>Past booking</Text>
          </View>
        )}
      </View>
    );
  };

  if (loading && myBookings.length === 0) {
    return (
      <Container>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Bookings</Text>
        </View>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#5773FF" />
          <Text style={styles.loadingText}>Loading bookings...</Text>
        </View>
      </Container>
    );
  }

  if (error && myBookings.length === 0) {
    return (
      <Container>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Bookings</Text>
        </View>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              if (unitId) {
                dispatch(fetchMyBookings(unitId) as never);
              }
            }}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Bookings</Text>
        <Text style={styles.headerSubtitle}>
          {myBookings.length} {myBookings.length === 1 ? 'booking' : 'bookings'}
        </Text>
      </View>

      {myBookings.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyIcon}>📅</Text>
          <Text style={styles.emptyText}>No bookings yet</Text>
          <Text style={styles.emptySubtext}>Your amenity bookings will appear here</Text>
        </View>
      ) : (
        <FlatList
          data={myBookings}
          renderItem={renderBookingItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#5773FF']} />
          }
        />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    paddingVertical: 8,
    marginBottom: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#5773FF',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  listContainer: {
    padding: 16,
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  amenityName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  bookingDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailIcon: {
    fontSize: 16,
    marginRight: 8,
    width: 24,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  cancelButton: {
    backgroundColor: '#FFF3E0',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF9800',
  },
  cancelButtonDisabled: {
    backgroundColor: '#F5F5F5',
    borderColor: '#CCC',
  },
  cancelButtonText: {
    color: '#FF9800',
    fontSize: 15,
    fontWeight: '600',
  },
  pastBookingNote: {
    backgroundColor: '#F8F9FA',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  pastBookingText: {
    fontSize: 13,
    color: '#999',
    fontStyle: 'italic',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#F44336',
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
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#999',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#CCC',
  },
});

export default MyBookings;
