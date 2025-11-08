import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/common/container';
import { RootState } from '../../store/reducers';
import { fetchAmenityDetails, fetchAvailableSlots } from '../../store/actions/amenities/amenitiesAction';

interface AmenityDetailsProps {
  navigation: {
    goBack: () => void;
    navigate: (screen: string, params?: any) => void;
  };
  route: {
    params: {
      amenityId: string;
    };
  };
}

const AmenityDetails: React.FC<AmenityDetailsProps> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { amenityId } = route.params;

  const { loading, amenityDetails, availableSlots, error } = useSelector((state: RootState) => state.amenities);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    dispatch(fetchAmenityDetails(amenityId, selectedDate) as never);
    if (amenityDetails?.bookingRequired) {
      dispatch(fetchAvailableSlots(amenityId, selectedDate) as never);
    }
  }, [dispatch, amenityId, selectedDate]);

  const getAmenityIcon = (amenityType: string): string => {
    switch (amenityType?.toLowerCase()) {
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

  const getSlotStatusColor = (status: string): string => {
    switch (status) {
      case 'available':
        return '#4CAF50';
      case 'booked':
        return '#F44336';
      default:
        return '#999';
    }
  };

  if (loading && !amenityDetails) {
    return (
      <Container>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#5773FF" />
          <Text style={styles.loadingText}>Loading amenity details...</Text>
        </View>
      </Container>
    );
  }

  if (error || !amenityDetails) {
    return (
      <Container>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error || 'Amenity not found'}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => dispatch(fetchAmenityDetails(amenityId) as never)}
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
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.iconHeader}>
          <Text style={styles.largeIcon}>{getAmenityIcon(amenityDetails.amenityType)}</Text>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{amenityDetails.name}</Text>
          <Text style={styles.subtitle}>{amenityDetails.amenityType}</Text>
        </View>

        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(amenityDetails.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(amenityDetails.status) }]}>
            {amenityDetails.status.toUpperCase()}
          </Text>
        </View>

        {amenityDetails.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{amenityDetails.description}</Text>
          </View>
        )}

        <View style={styles.infoGrid}>
          {amenityDetails.location && (
            <View style={styles.infoCard}>
              <Text style={styles.infoIcon}>📍</Text>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>{amenityDetails.location}</Text>
            </View>
          )}

          {amenityDetails.capacity && (
            <View style={styles.infoCard}>
              <Text style={styles.infoIcon}>👥</Text>
              <Text style={styles.infoLabel}>Capacity</Text>
              <Text style={styles.infoValue}>{amenityDetails.capacity} people</Text>
            </View>
          )}

          {amenityDetails.slotDuration && (
            <View style={styles.infoCard}>
              <Text style={styles.infoIcon}>⏱️</Text>
              <Text style={styles.infoLabel}>Slot Duration</Text>
              <Text style={styles.infoValue}>{amenityDetails.slotDuration} mins</Text>
            </View>
          )}

          {amenityDetails.pricePerSlot !== undefined && (
            <View style={styles.infoCard}>
              <Text style={styles.infoIcon}>💰</Text>
              <Text style={styles.infoLabel}>Price</Text>
              <Text style={styles.infoValue}>
                {amenityDetails.pricePerSlot === 0 ? 'Free' : `₹${amenityDetails.pricePerSlot}`}
              </Text>
            </View>
          )}
        </View>

        {amenityDetails.bookingRequired && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Available Slots - {selectedDate}</Text>

            {availableSlots && availableSlots.length > 0 ? (
              <View style={styles.slotsGrid}>
                {availableSlots.map((slot: any) => (
                  <TouchableOpacity
                    key={slot._id}
                    style={[
                      styles.slotCard,
                      slot.status === 'booked' && styles.slotCardBooked,
                    ]}
                    disabled={slot.status === 'booked'}
                    onPress={() => {
                      if (slot.status === 'available') {
                        navigation.navigate('BookAmenity', {
                          amenityId,
                          slotId: slot._id,
                          amenityName: amenityDetails.name,
                          slotTime: `${slot.startTime} - ${slot.endTime}`,
                          bookingDate: selectedDate,
                        });
                      }
                    }}
                  >
                    <Text style={[
                      styles.slotTime,
                      slot.status === 'booked' && styles.slotTimeBooked,
                    ]}>
                      {slot.startTime} - {slot.endTime}
                    </Text>
                    <View style={[
                      styles.slotStatusBadge,
                      { backgroundColor: getSlotStatusColor(slot.status) + '20' }
                    ]}>
                      <Text style={[
                        styles.slotStatusText,
                        { color: getSlotStatusColor(slot.status) }
                      ]}>
                        {slot.status.toUpperCase()}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <Text style={styles.noSlotsText}>No slots available for this date</Text>
            )}
          </View>
        )}

        {amenityDetails.rules && amenityDetails.rules.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Rules & Guidelines</Text>
            {amenityDetails.rules.map((rule: string, index: number) => (
              <View key={index} style={styles.ruleItem}>
                <Text style={styles.ruleBullet}>•</Text>
                <Text style={styles.ruleText}>{rule}</Text>
              </View>
            ))}
          </View>
        )}

        {amenityDetails.bookingRequired && amenityDetails.status === 'available' && (
          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => {
              if (availableSlots && availableSlots.length > 0) {
                // Scroll up to slots section
              } else {
                navigation.navigate('BookAmenity', {
                  amenityId,
                  amenityName: amenityDetails.name,
                  bookingDate: selectedDate,
                });
              }
            }}
          >
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    paddingVertical: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#5773FF',
    fontWeight: '600',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  iconHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  largeIcon: {
    fontSize: 80,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  statusBadge: {
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 16,
    marginBottom: 24,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '700',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 24,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
    marginHorizontal: -8,
  },
  infoCard: {
    width: '50%',
    padding: 8,
  },
  infoIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  slotCard: {
    width: '50%',
    padding: 6,
  },
  slotCardBooked: {
    opacity: 0.5,
  },
  slotTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 6,
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 8,
    textAlign: 'center',
  },
  slotTimeBooked: {
    color: '#999',
  },
  slotStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'center',
  },
  slotStatusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  noSlotsText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    paddingVertical: 20,
  },
  ruleItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  ruleBullet: {
    fontSize: 16,
    color: '#5773FF',
    marginRight: 8,
    marginTop: 2,
  },
  ruleText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  bookButton: {
    backgroundColor: '#5773FF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
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
});

export default AmenityDetails;
