import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, RefreshControl, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/common/container';
import { RootState } from '../../store/reducers';
import { fetchAmenities } from '../../store/actions/amenities/amenitiesAction';
import { selectUserDetailData } from '../../store/selectors/auth';

interface AmenitiesListProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}

const AmenitiesList: React.FC<AmenitiesListProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const userDetailData = useSelector(selectUserDetailData);
  const user = userDetailData?.data?.result;
  const buildingId = user?.buildingId || user?.building?._id;

  const { loading, amenities, error } = useSelector((state: RootState) => state.amenities);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    if (buildingId) {
      dispatch(fetchAmenities(buildingId) as never);
    }
  }, [dispatch, buildingId]);

  const onRefresh = () => {
    setRefreshing(true);
    if (buildingId) {
      dispatch(fetchAmenities(buildingId) as never);
    }
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getAmenityIcon = (amenityType: string): string => {
    switch (amenityType.toLowerCase()) {
      case 'swimming pool':
        return '🏊';
      case 'gym':
        return '💪';
      case 'clubhouse':
        return '🏛️';
      case 'sports court':
        return '🎾';
      case 'community hall':
        return '🏢';
      case 'garden':
        return '🌳';
      default:
        return '🏢';
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'available':
        return '#4CAF50';
      case 'unavailable':
        return '#F44336';
      case 'maintenance':
        return '#FF9800';
      default:
        return '#999';
    }
  };

  const renderAmenityItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.amenityCard}
      onPress={() => navigation.navigate('AmenityDetails', { amenityId: item._id })}
    >
      <View style={styles.amenityIconContainer}>
        <Text style={styles.amenityIcon}>{getAmenityIcon(item.amenityType)}</Text>
      </View>

      <View style={styles.amenityInfo}>
        <Text style={styles.amenityName}>{item.name}</Text>
        <Text style={styles.amenityType}>{item.amenityType}</Text>

        {item.location && (
          <Text style={styles.amenityLocation}>📍 {item.location}</Text>
        )}

        <View style={styles.amenityMeta}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {item.status.toUpperCase()}
            </Text>
          </View>

          {item.bookingRequired && (
            <Text style={styles.bookingRequired}>🎫 Booking Required</Text>
          )}
        </View>

        {item.bookingRequired && item.slotDuration && (
          <Text style={styles.slotInfo}>
            ⏱️ Slot Duration: {item.slotDuration} minutes
          </Text>
        )}

        {item.pricePerSlot > 0 && (
          <Text style={styles.priceInfo}>
            💰 ₹{item.pricePerSlot} per slot
          </Text>
        )}
      </View>

      <Text style={styles.viewDetails}>→</Text>
    </TouchableOpacity>
  );

  if (loading && amenities.length === 0) {
    return (
      <Container>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Amenities</Text>
        </View>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#5773FF" />
          <Text style={styles.loadingText}>Loading amenities...</Text>
        </View>
      </Container>
    );
  }

  if (error && amenities.length === 0) {
    return (
      <Container>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Amenities</Text>
        </View>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              if (buildingId) {
                dispatch(fetchAmenities(buildingId) as never);
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
        <Text style={styles.headerTitle}>Amenities</Text>
        <Text style={styles.headerSubtitle}>
          {amenities.length} {amenities.length === 1 ? 'amenity' : 'amenities'} available
        </Text>
      </View>

      <TouchableOpacity
        style={styles.myBookingsButton}
        onPress={() => navigation.navigate('MyBookings')}
      >
        <Text style={styles.myBookingsText}>📅 My Bookings</Text>
      </TouchableOpacity>

      {amenities.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No amenities available</Text>
          <Text style={styles.emptySubtext}>Check back later</Text>
        </View>
      ) : (
        <FlatList
          data={amenities}
          renderItem={renderAmenityItem}
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
  myBookingsButton: {
    margin: 16,
    backgroundColor: '#5773FF',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  myBookingsText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    padding: 16,
  },
  amenityCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  amenityIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#F0F4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  amenityIcon: {
    fontSize: 32,
  },
  amenityInfo: {
    flex: 1,
  },
  amenityName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  amenityType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  amenityLocation: {
    fontSize: 13,
    color: '#999',
    marginBottom: 8,
  },
  amenityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  bookingRequired: {
    fontSize: 11,
    color: '#5773FF',
    fontWeight: '600',
  },
  slotInfo: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  priceInfo: {
    fontSize: 13,
    color: '#4CAF50',
    fontWeight: '600',
    marginTop: 4,
  },
  viewDetails: {
    fontSize: 24,
    color: '#5773FF',
    fontWeight: '300',
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

export default AmenitiesList;
