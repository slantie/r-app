import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  Image,
} from 'react-native';
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

  const { userData } = useSelector((state: any) => state.otp);
  const userDetailData = useSelector(selectUserDetailData);
  const user = userDetailData?.data?.result;

  const buildingId =
    userData?.member?.buildingId ||
    user?.buildingId ||
    user?.building?._id;

  const { loading, amenities, error } = useSelector(
    (state: RootState) => state.amenities
  );
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    console.log('🏢 AmenitiesList - buildingId:', buildingId);
    if (buildingId) {
      console.log('🏊 Fetching amenities for buildingId:', buildingId);
      dispatch(fetchAmenities(buildingId) as never);
    } else {
      console.warn('⚠️ No buildingId found - cannot fetch amenities');
    }
  }, [dispatch, buildingId]);

  useEffect(() => {
    if (amenities?.length) {
      console.log(
        '✅ Amenities fetched:',
        amenities.map((a) => ({
          name: a.name,
          images: a.images,
        }))
      );
    }
  }, [amenities]);

  const onRefresh = () => {
    setRefreshing(true);
    if (buildingId) {
      dispatch(fetchAmenities(buildingId) as never);
    }
    setTimeout(() => setRefreshing(false), 1000);
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

  const renderAmenityItem = ({ item }: { item: any }) => {
    // ✅ Handle both array and stringified array cases
    const imageSource = Array.isArray(item.images)
      ? item.images[0]
      : (() => {
        try {
          const parsed = JSON.parse(item.images);
          return Array.isArray(parsed) ? parsed[0] : null;
        } catch {
          return null;
        }
      })();

    return (
      <TouchableOpacity
        style={styles.amenityCard}
        onPress={() =>
          navigation.navigate('SimpleBooking', {
            amenityId: item._id,
            amenity: item,
          })
        }
      >
        {imageSource ? (
          <Image
            source={{ uri: imageSource }}
            style={styles.amenityImage}
            resizeMode="cover"
            onError={(e) =>
              console.warn('⚠️ Image failed to load:', e.nativeEvent.error)
            }
          />
        ) : (
          // ✅ Fallback placeholder
          <Image
            source={{
              uri: 'https://via.placeholder.com/300x200?text=No+Image',
            }}
            style={styles.amenityImage}
            resizeMode="cover"
          />
        )}

        <View style={styles.amenityCardContent}>
          <View style={styles.amenityInfo}>
            <Text style={styles.amenityName}>{item.name}</Text>
            <Text style={styles.amenityDescription} numberOfLines={2}>
              {item.description}
            </Text>

            <View style={styles.amenityMeta}>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(item.amenityStatus) + '20' },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    { color: getStatusColor(item.amenityStatus) },
                  ]}
                >
                  {item.amenityStatus?.toUpperCase() || 'AVAILABLE'}
                </Text>
              </View>

              {item.amenityType === 'paid' && (
                <View style={styles.priceBadge}>
                  <Text style={styles.priceText}>
                    ₹{item.bookingCharge || 0}
                  </Text>
                </View>
              )}

              {item.amenityType === 'free' && (
                <View style={styles.freeBadge}>
                  <Text style={styles.freeText}>FREE</Text>
                </View>
              )}
            </View>

            <View style={styles.amenityDetails}>
              <Text style={styles.detailText}>
                👥 Capacity: {item.capacity}
              </Text>
              {item.requiresApproval && (
                <Text style={styles.approvalText}>
                  ⚠️ Requires Approval
                </Text>
              )}
            </View>
          </View>

          <Text style={styles.viewDetails}>→</Text>
        </View>
      </TouchableOpacity>
    );
  };

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
          {amenities.length}{' '}
          {amenities.length === 1 ? 'amenity' : 'amenities'} available
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
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#5773FF']}
            />
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
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  amenityImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#F0F4FF',
  },
  amenityCardContent: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  amenityDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
    lineHeight: 18,
  },
  amenityDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  detailText: {
    fontSize: 12,
    color: '#666',
  },
  approvalText: {
    fontSize: 11,
    color: '#FF9800',
    fontWeight: '600',
  },
  priceBadge: {
    backgroundColor: '#4CAF5020',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priceText: {
    fontSize: 13,
    color: '#4CAF50',
    fontWeight: '700',
  },
  freeBadge: {
    backgroundColor: '#2196F320',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  freeText: {
    fontSize: 11,
    color: '#2196F3',
    fontWeight: '700',
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
