import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/common/container';
import { RootState } from '../../store/reducers';
import {
  fetchEventDetails,
  registerForEvent,
} from '../../store/actions/events/eventsAction';
import { selectUserDetailData } from '../../store/selectors/auth';

interface EventDetailsProps {
  navigation: {
    goBack: () => void;
  };
  route: {
    params: {
      eventId: string;
    };
  };
}

const EventDetails: React.FC<EventDetailsProps> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { eventId } = route.params;

  const userDetailData = useSelector(selectUserDetailData);
  const user = userDetailData?.data?.result;
  const unitId = user?.unitId || user?.unit?._id;
  const memberId = user?._id || user?.id;

  const { loading, eventDetails, error } = useSelector(
    (state: RootState) => state.events,
  );

  const [numberOfGuests, setNumberOfGuests] = useState('0');
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    dispatch(fetchEventDetails(eventId) as never);
  }, [dispatch, eventId]);

  const handleRegister = () => {
    const guests = parseInt(numberOfGuests, 10);

    if (isNaN(guests) || guests < 0) {
      Alert.alert('Invalid Input', 'Please enter a valid number of guests');
      return;
    }

    if (eventDetails?.maxGuestsPerUnit && guests > eventDetails.maxGuestsPerUnit) {
      Alert.alert(
        'Too Many Guests',
        `Maximum ${eventDetails.maxGuestsPerUnit} guests allowed per unit`,
      );
      return;
    }

    if (!memberId || !unitId) {
      Alert.alert('Error', 'User information not available');
      return;
    }

    Alert.alert(
      'Confirm Registration',
      `Register for ${eventDetails?.eventName} with ${guests} guest(s)?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Register',
          onPress: () => {
            setRegistering(true);
            dispatch(
              registerForEvent(eventId, memberId, guests, unitId) as never,
            );
            setTimeout(() => {
              setRegistering(false);
              Alert.alert('Success', 'Registration successful!', [
                {
                  text: 'OK',
                  onPress: () => navigation.goBack(),
                },
              ]);
            }, 1500);
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

  if (loading) {
    return (
      <Container>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#5773FF" />
          <Text style={styles.loadingText}>Loading event details...</Text>
        </View>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <View style={styles.centerContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => dispatch(fetchEventDetails(eventId) as never)}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }

  if (!eventDetails) {
    return (
      <Container>
        <View style={styles.centerContainer}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyText}>Event not found</Text>
        </View>
      </Container>
    );
  }

  const isRegistrationOpen =
    eventDetails.registrationStatus === 'open' &&
    new Date(eventDetails.eventDate) > new Date();

  return (
    <Container>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <Text style={styles.eventIcon}>
              {getEventIcon(eventDetails.eventType)}
            </Text>
            <Text style={styles.eventName}>{eventDetails.eventName}</Text>
            <View style={styles.eventTypeBadge}>
              <Text style={styles.eventTypeText}>{eventDetails.eventType}</Text>
            </View>
          </View>

          {/* Date & Time Section */}
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>📅 Date:</Text>
              <Text style={styles.infoValue}>
                {formatDate(eventDetails.eventDate)}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>🕐 Time:</Text>
              <Text style={styles.infoValue}>
                {formatTime(eventDetails.startTime)} - {formatTime(eventDetails.endTime)}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>📍 Venue:</Text>
              <Text style={styles.infoValue}>{eventDetails.venue}</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About the Event</Text>
            <Text style={styles.description}>{eventDetails.description}</Text>
          </View>

          {/* Registration Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Registration Details</Text>
            <View style={styles.registrationInfo}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Status:</Text>
                <View
                  style={[
                    styles.statusBadge,
                    eventDetails.registrationStatus === 'open'
                      ? styles.statusOpen
                      : styles.statusClosed,
                  ]}>
                  <Text style={styles.statusText}>
                    {eventDetails.registrationStatus.toUpperCase()}
                  </Text>
                </View>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Max Guests per Unit:</Text>
                <Text style={styles.infoValue}>
                  {eventDetails.maxGuestsPerUnit}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Max Participants:</Text>
                <Text style={styles.infoValue}>
                  {eventDetails.maxParticipants}
                </Text>
              </View>
              {eventDetails.registeredCount !== undefined && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Registered:</Text>
                  <Text style={styles.infoValue}>
                    {eventDetails.registeredCount} / {eventDetails.maxParticipants}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Registration Form */}
          {isRegistrationOpen && (
            <View style={styles.registrationForm}>
              <Text style={styles.sectionTitle}>Register for Event</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Number of Guests</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter number of guests"
                  keyboardType="numeric"
                  value={numberOfGuests}
                  onChangeText={setNumberOfGuests}
                  maxLength={2}
                />
                <Text style={styles.inputHint}>
                  Maximum {eventDetails.maxGuestsPerUnit} guests allowed
                </Text>
              </View>

              <TouchableOpacity
                style={[styles.registerButton, registering && styles.buttonDisabled]}
                onPress={handleRegister}
                disabled={registering}>
                {registering ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={styles.registerButtonText}>Register Now</Text>
                )}
              </TouchableOpacity>
            </View>
          )}

          {!isRegistrationOpen && (
            <View style={styles.closedNotice}>
              <Text style={styles.closedNoticeIcon}>🔒</Text>
              <Text style={styles.closedNoticeText}>
                Registration is currently closed for this event
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  content: {
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
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  headerSection: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#F8F9FF',
    borderRadius: 12,
    marginBottom: 16,
  },
  eventIcon: {
    fontSize: 64,
    marginBottom: 12,
  },
  eventName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 8,
  },
  eventTypeBadge: {
    backgroundColor: '#5773FF',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  eventTypeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
  },
  registrationInfo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusOpen: {
    backgroundColor: '#34C759',
  },
  statusClosed: {
    backgroundColor: '#FF3B30',
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  registrationForm: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#1A1A1A',
    backgroundColor: '#F8F9FF',
  },
  inputHint: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  registerButton: {
    backgroundColor: '#5773FF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#B0B0B0',
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  closedNotice: {
    backgroundColor: '#FFF3CD',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginTop: 8,
  },
  closedNoticeIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  closedNoticeText: {
    fontSize: 14,
    color: '#856404',
    textAlign: 'center',
  },
});

export default EventDetails;
