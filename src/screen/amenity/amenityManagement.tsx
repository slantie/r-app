import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Container, HeaderComponent } from '../../components/common';
import amenityStyles from './styles/amenityStyles';
import { 
  getAllAmenities, 
  getBookingsByUser, 
  type Amenity, 
  type AmenityBooking 
} from '../../services/database';
import { COLORS } from '../../constants';

interface AmenityManagementProps {
  navigation: {
    navigate: (screen: string, params?: object) => void;
    goBack: () => void;
  };
}

const AmenityManagement: React.FC<AmenityManagementProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<'amenities' | 'bookings'>('amenities');
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [bookings, setBookings] = useState<AmenityBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    try {
      setLoading(true);
      const [amenitiesData, bookingsData] = await Promise.all([
        getAllAmenities(),
        getBookingsByUser('current-user-id') // Replace with actual user ID
      ]);
      setAmenities(amenitiesData);
      setBookings(bookingsData);
    } catch (error) {
      console.error('Error loading amenities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'upcoming':
        return amenityStyles.statusUpcoming;
      case 'completed':
        return amenityStyles.statusCompleted;
      case 'cancelled':
        return amenityStyles.statusCancelled;
      default:
        return amenityStyles.statusUpcoming;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'UPCOMING';
      case 'completed':
        return 'COMPLETED';
      case 'cancelled':
        return 'CANCELLED';
      default:
        return status.toUpperCase();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const renderAmenityCard = ({ item }: { item: Amenity }) => (
    <TouchableOpacity
      style={amenityStyles.amenityCard}
      onPress={() => navigation.navigate('BookAmenity', { amenity: item })}
      activeOpacity={0.7}
    >
      <View style={amenityStyles.amenityHeader}>
        <View style={amenityStyles.amenityIconContainer}>
          <Text style={amenityStyles.amenityIcon}>{item.icon}</Text>
        </View>
        <View style={amenityStyles.amenityInfo}>
          <Text style={amenityStyles.amenityName}>{item.name}</Text>
          <Text style={amenityStyles.amenityDescription} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
        {item.isAvailable ? (
          <View style={amenityStyles.availableBadge}>
            <Text style={amenityStyles.availableText}>Available</Text>
          </View>
        ) : (
          <View style={amenityStyles.unavailableBadge}>
            <Text style={amenityStyles.unavailableText}>Booked</Text>
          </View>
        )}
      </View>

      <View style={amenityStyles.amenityDetails}>
        <View style={amenityStyles.detailItem}>
          <Text style={amenityStyles.detailIcon}>👥</Text>
          <Text style={amenityStyles.detailText}>Capacity: {item.capacity}</Text>
        </View>
        <View style={amenityStyles.detailItem}>
          <Text style={amenityStyles.detailIcon}>💰</Text>
          <Text style={amenityStyles.detailText}>₹{item.bookingFee}/hr</Text>
        </View>
        <View style={amenityStyles.detailItem}>
          <Text style={amenityStyles.detailIcon}>🕒</Text>
          <Text style={amenityStyles.detailText}>
            {item.availableFrom} - {item.availableTo}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={amenityStyles.bookButton}
        onPress={() => navigation.navigate('BookAmenity', { amenity: item })}
      >
        <Text style={amenityStyles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderBookingCard = ({ item }: { item: AmenityBooking }) => (
    <TouchableOpacity
      style={amenityStyles.bookingCard}
      onPress={() => navigation.navigate('BookingDetails', { booking: item })}
      activeOpacity={0.7}
    >
      <View style={amenityStyles.bookingHeader}>
        <View style={amenityStyles.bookingIconContainer}>
          <Text style={amenityStyles.bookingIcon}>{item.amenityIcon}</Text>
        </View>
        <View style={amenityStyles.bookingInfo}>
          <Text style={amenityStyles.bookingAmenityName}>{item.amenityName}</Text>
          <Text style={amenityStyles.bookingDate}>📅 {formatDate(item.date)}</Text>
          <Text style={amenityStyles.bookingTime}>🕒 {item.timeSlot}</Text>
        </View>
        <View style={[amenityStyles.statusBadge, getStatusStyle(item.status)]}>
          <Text style={amenityStyles.statusText}>{getStatusText(item.status)}</Text>
        </View>
      </View>

      <View style={amenityStyles.bookingFooter}>
        <View style={amenityStyles.bookingDetailRow}>
          <Text style={amenityStyles.bookingDetailLabel}>Duration:</Text>
          <Text style={amenityStyles.bookingDetailValue}>{item.duration} hour(s)</Text>
        </View>
        <View style={amenityStyles.bookingDetailRow}>
          <Text style={amenityStyles.bookingDetailLabel}>Guests:</Text>
          <Text style={amenityStyles.bookingDetailValue}>{item.guestCount}</Text>
        </View>
        <View style={amenityStyles.bookingDetailRow}>
          <Text style={amenityStyles.bookingDetailLabel}>Amount:</Text>
          <Text style={amenityStyles.bookingAmountValue}>₹{item.totalAmount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyAmenities = () => (
    <View style={amenityStyles.emptyContainer}>
      <Text style={amenityStyles.emptyIcon}>🏊</Text>
      <Text style={amenityStyles.emptyText}>No Amenities Available</Text>
      <Text style={amenityStyles.emptySubText}>
        Check back later for available amenities
      </Text>
    </View>
  );

  const renderEmptyBookings = () => (
    <View style={amenityStyles.emptyContainer}>
      <Text style={amenityStyles.emptyIcon}>📅</Text>
      <Text style={amenityStyles.emptyText}>No Bookings Yet</Text>
      <Text style={amenityStyles.emptySubText}>
        Book an amenity to see your reservations here
      </Text>
    </View>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <View style={amenityStyles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.DARK_BLUE} />
          <Text style={amenityStyles.loadingText}>Loading...</Text>
        </View>
      );
    }

    if (activeTab === 'amenities') {
      return (
        <FlatList
          data={amenities}
          renderItem={renderAmenityCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={amenityStyles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[COLORS.DARK_BLUE]}
            />
          }
          ListEmptyComponent={renderEmptyAmenities}
        />
      );
    } else {
      const upcomingBookings = bookings.filter(b => b.status === 'upcoming');
      return (
        <FlatList
          data={upcomingBookings}
          renderItem={renderBookingCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={amenityStyles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[COLORS.DARK_BLUE]}
            />
          }
          ListEmptyComponent={renderEmptyBookings}
        />
      );
    }
  };

  return (
    <Container>
      <HeaderComponent
        Title="Amenities & Bookings"
        onPress={() => navigation.goBack()}
      />
      
      <View style={amenityStyles.contentWrapper}>
        <View style={amenityStyles.tabContainer}>
          <TouchableOpacity
            style={[
              amenityStyles.tab,
              activeTab === 'amenities' && amenityStyles.activeTab,
            ]}
            onPress={() => setActiveTab('amenities')}
          >
            <Text
              style={[
                amenityStyles.tabText,
                activeTab === 'amenities' && amenityStyles.activeTabText,
              ]}
            >
              🏊 All Amenities
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              amenityStyles.tab,
              activeTab === 'bookings' && amenityStyles.activeTab,
            ]}
            onPress={() => setActiveTab('bookings')}
          >
            <Text
              style={[
                amenityStyles.tabText,
                activeTab === 'bookings' && amenityStyles.activeTabText,
              ]}
            >
              📅 My Bookings
              {bookings.filter(b => b.status === 'upcoming').length > 0 && (
                <Text style={amenityStyles.tabBadge}>
                  {' '}{bookings.filter(b => b.status === 'upcoming').length}
                </Text>
              )}
            </Text>
          </TouchableOpacity>
        </View>

        {renderContent()}
      </View>
    </Container>
  );
};

export default AmenityManagement;
