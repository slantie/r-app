import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useSelector } from 'react-redux';
import Container from '../../components/common/container';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MakeApiRequest } from '../../services/apiService';
import { POST } from '../../constants/api';

interface SimpleBookingScreenProps {
  navigation: {
    goBack: () => void;
    navigate: (screen: string) => void;
  };
  route: {
    params: {
      amenityId: string;
      amenity: any;
    };
  };
}

const SimpleBookingScreen: React.FC<SimpleBookingScreenProps> = ({ navigation, route }) => {
  const { amenity } = route.params;
  const { userData } = useSelector((state: { otp: { userData: any } }) => state.otp);
  const userId = userData?.user?._id || userData?._id;

  const [bookingDate, setBookingDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [booking, setBooking] = useState<any>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  const timeSlots = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00',
  ];

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setBookingDate(selectedDate);
    }
  };

  const handleBookNow = async () => {
    try {
      setIsBooking(true);
      const response = await MakeApiRequest({
        apiUrl: 'http://10.0.2.2:5000/api/resident/amenities/simple-book',
        apiMethod: POST,
        apiData: {
          amenityId: amenity._id,
          userId,
          bookingDate: bookingDate.toISOString().split('T')[0],
          startTime,
          endTime,
        },
      });

      if (response.data.success) {
        const createdBooking = response.data.data;
        setBooking(createdBooking);

        // If paid amenity, show payment modal
        if (amenity.amenityType === 'paid' && amenity.bookingCharge > 0) {
          setShowPaymentModal(true);
        } else {
          // Free amenity - show success
          Alert.alert(
            'Success!',
            amenity.requiresApproval
              ? 'Your booking has been submitted and is pending admin approval.'
              : 'Your booking has been confirmed!',
            [
              { text: 'View Bookings', onPress: () => navigation.navigate('MyBookings') },
              { text: 'OK', onPress: () => navigation.goBack() },
            ]
          );
        }
      }
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to create booking');
    } finally {
      setIsBooking(false);
    }
  };

  const handlePayment = async () => {
    try {
      setIsProcessingPayment(true);

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Complete payment
      const response = await MakeApiRequest({
        apiUrl: 'http://10.0.2.2:5000/api/resident/amenities/complete-payment',
        apiMethod: POST,
        apiData: {
          bookingId: booking._id,
          userId,
          transactionId: `TXN${Date.now()}`,
        },
      });

      if (response.data.success) {
        setShowPaymentModal(false);
        Alert.alert(
          'Payment Successful!',
          amenity.requiresApproval
            ? 'Your payment is complete. Booking is pending admin approval.'
            : 'Your payment is complete and booking is confirmed!',
          [
            { text: 'View Bookings', onPress: () => navigation.navigate('MyBookings') },
            { text: 'OK', onPress: () => navigation.goBack() },
          ]
        );
      }
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Payment failed');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <Container>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Amenity</Text>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Amenity Info */}
        {amenity.images && amenity.images.length > 0 && (
          <Image source={{ uri: amenity.images[0] }} style={styles.amenityImage} resizeMode="cover" />
        )}

        <View style={styles.card}>
          <Text style={styles.amenityName}>{amenity.name}</Text>
          <Text style={styles.amenityDescription}>{amenity.description}</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Type:</Text>
            <View style={amenity.amenityType === 'paid' ? styles.paidBadge : styles.freeBadge}>
              <Text style={amenity.amenityType === 'paid' ? styles.paidText : styles.freeText}>
                {amenity.amenityType === 'paid' ? `₹${amenity.bookingCharge}` : 'FREE'}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Capacity:</Text>
            <Text style={styles.infoValue}>👥 {amenity.capacity} people</Text>
          </View>

          {amenity.requiresApproval && (
            <View style={styles.warningBox}>
              <Text style={styles.warningText}>⚠️ This booking requires admin approval</Text>
            </View>
          )}
        </View>

        {/* Booking Date */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Select Date</Text>
          <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateButtonText}>
              📅 {bookingDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={bookingDate}
              mode="date"
              display="default"
              onChange={onDateChange}
              minimumDate={new Date()}
              maximumDate={new Date(Date.now() + amenity.advanceBookingDays * 24 * 60 * 60 * 1000)}
            />
          )}
        </View>

        {/* Time Selection */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Select Time</Text>
          <View style={styles.timeRow}>
            <View style={styles.timeSelector}>
              <Text style={styles.timeLabel}>Start Time</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timeScroll}>
                {timeSlots.map((time) => (
                  <TouchableOpacity
                    key={time}
                    style={[styles.timeSlot, startTime === time && styles.timeSlotSelected]}
                    onPress={() => setStartTime(time)}
                  >
                    <Text style={[styles.timeSlotText, startTime === time && styles.timeSlotTextSelected]}>
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.timeSelector}>
              <Text style={styles.timeLabel}>End Time</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timeScroll}>
                {timeSlots.map((time) => (
                  <TouchableOpacity
                    key={time}
                    style={[styles.timeSlot, endTime === time && styles.timeSlotSelected]}
                    onPress={() => setEndTime(time)}
                  >
                    <Text style={[styles.timeSlotText, endTime === time && styles.timeSlotTextSelected]}>
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>

        {/* Booking Summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Booking Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Date:</Text>
            <Text style={styles.summaryValue}>{bookingDate.toLocaleDateString()}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Time:</Text>
            <Text style={styles.summaryValue}>
              {startTime} - {endTime}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Amount:</Text>
            <Text style={styles.summaryValueBold}>
              ₹{amenity.bookingCharge || 0}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.bookButton, isBooking && styles.bookButtonDisabled]}
          onPress={handleBookNow}
          disabled={isBooking}
        >
          {isBooking ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.bookButtonText}>
              {amenity.amenityType === 'paid' ? 'Proceed to Payment' : 'Book Now'}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* Payment Modal */}
      <Modal visible={showPaymentModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.paymentModal}>
            <Text style={styles.modalTitle}>Payment Simulation</Text>
            <Text style={styles.modalSubtitle}>This is a simulated payment gateway</Text>

            <View style={styles.paymentDetails}>
              <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Amenity:</Text>
                <Text style={styles.paymentValue}>{amenity.name}</Text>
              </View>
              <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Date:</Text>
                <Text style={styles.paymentValue}>{bookingDate.toLocaleDateString()}</Text>
              </View>
              <View style={styles.paymentRow}>
                <Text style={styles.paymentLabel}>Time:</Text>
                <Text style={styles.paymentValue}>
                  {startTime} - {endTime}
                </Text>
              </View>
              <View style={[styles.paymentRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total Amount:</Text>
                <Text style={styles.totalValue}>₹{amenity.bookingCharge}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.payButton, isProcessingPayment && styles.payButtonDisabled]}
              onPress={handlePayment}
              disabled={isProcessingPayment}
            >
              {isProcessingPayment ? (
                <>
                  <ActivityIndicator color="#fff" />
                  <Text style={styles.payButtonText}> Processing...</Text>
                </>
              ) : (
                <Text style={styles.payButtonText}>Pay ₹{amenity.bookingCharge}</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowPaymentModal(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#5773FF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  container: {
    flex: 1,
  },
  amenityImage: {
    width: '100%',
    height: 220,
    backgroundColor: '#F0F4FF',
  },
  card: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  amenityName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  amenityDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    width: 80,
  },
  infoValue: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  paidBadge: {
    backgroundColor: '#4CAF5020',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  paidText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '700',
  },
  freeBadge: {
    backgroundColor: '#2196F320',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  freeText: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '700',
  },
  warningBox: {
    backgroundColor: '#FF980020',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  warningText: {
    fontSize: 13,
    color: '#FF9800',
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  dateButton: {
    backgroundColor: '#F0F4FF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  dateButtonText: {
    fontSize: 15,
    color: '#5773FF',
    fontWeight: '600',
  },
  timeRow: {
    gap: 16,
  },
  timeSelector: {
    marginBottom: 16,
  },
  timeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  timeScroll: {
    flexDirection: 'row',
  },
  timeSlot: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    marginRight: 8,
  },
  timeSlotSelected: {
    backgroundColor: '#5773FF',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  timeSlotTextSelected: {
    color: '#fff',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  summaryValueBold: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '700',
  },
  bookButton: {
    backgroundColor: '#5773FF',
    margin: 16,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  bookButtonDisabled: {
    backgroundColor: '#CCC',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentModal: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    marginBottom: 24,
  },
  paymentDetails: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  paymentLabel: {
    fontSize: 14,
    color: '#666',
  },
  paymentValue: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    paddingTop: 12,
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4CAF50',
  },
  payButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  payButtonDisabled: {
    backgroundColor: '#CCC',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  cancelButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default SimpleBookingScreen;
