import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Container, HeaderComponent, QRCode } from '../../components/common';
import VisitorStyles from './styles/visitorStyles';
import VisitorStorageService, { Visitor } from '../../services/visitorStorage';

interface VisitorDetailsProps {
  navigation: {
    goBack: () => void;
  };
  route?: {
    params?: {
      visitor?: Visitor;
    };
  };
}

const VisitorDetails: React.FC<VisitorDetailsProps> = ({ navigation, route }) => {
  const initialVisitor = route?.params?.visitor;
  const [visitor, setVisitor] = useState<Visitor | null>(initialVisitor || null);

  // Reload visitor data when coming back to screen
  useEffect(() => {
    if (initialVisitor?.id) {
      loadVisitorData(initialVisitor.id);
    }
  }, [initialVisitor?.id]);

  const loadVisitorData = async (visitorId: string) => {
    const updatedVisitor = await VisitorStorageService.getVisitorById(visitorId);
    if (updatedVisitor) {
      setVisitor(updatedVisitor);
    }
  };

  const getStatusColor = (status: Visitor['status']): string => {
    switch (status) {
      case 'pending':
        return '#F57C00';
      case 'approved':
        return '#4CAF50';
      case 'active':
        return '#2196F3';
      case 'completed':
        return '#757575';
      case 'cancelled':
        return '#F44336';
      default:
        return '#757575';
    }
  };

  const getStatusLabel = (status: Visitor['status']): string => {
    switch (status) {
      case 'pending':
        return 'Pending Approval';
      case 'approved':
        return 'Approved';
      case 'active':
        return 'Currently Inside';
      case 'completed':
        return 'Visit Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const handleShareQR = useCallback(() => {
    Alert.alert(
      'Share QR Code',
      'QR code will be sent to the visitor via SMS/WhatsApp',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Send via SMS', onPress: () => Alert.alert('Success', 'QR code sent via SMS') },
        { text: 'Send via WhatsApp', onPress: () => Alert.alert('Success', 'QR code sent via WhatsApp') },
      ]
    );
  }, []);

  const handleCancelVisit = useCallback(async () => {
    if (!visitor) {
      return;
    }
    Alert.alert(
      'Cancel Visit',
      `Are you sure you want to cancel this visit for ${visitor.name}?`,
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: async () => {
            try {
              const success = await VisitorStorageService.cancelVisitor(visitor.id);
              if (success) {
                Alert.alert('Success', 'Visitor entry cancelled successfully', [
                  { 
                    text: 'OK', 
                    onPress: () => {
                      // Update local state
                      setVisitor({ ...visitor, status: 'cancelled' });
                      // Go back after a short delay to show updated status
                      setTimeout(() => navigation.goBack(), 500);
                    } 
                  },
                ]);
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
  }, [visitor, navigation]);

  if (!visitor) {
    return (
      <Container>
        <View style={VisitorStyles.detailsContainer}>
          <HeaderComponent
            Title="Visitor Details"
            onPress={() => navigation.goBack()}
          />
          <View style={VisitorStyles.emptyContainer}>
            <Text style={VisitorStyles.emptyText}>No visitor data available</Text>
          </View>
        </View>
      </Container>
    );
  }

  const isUpcoming = visitor.status !== 'completed' && visitor.status !== 'cancelled';

  return (
    <Container>
      <View style={VisitorStyles.detailsContainer}>
        <HeaderComponent
          Title="Visitor Details"
          onPress={() => navigation.goBack()}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Visitor Header */}
          <View style={VisitorStyles.detailsHeader}>
            <Text style={VisitorStyles.detailsName}>{visitor.name}</Text>
            <Text style={VisitorStyles.detailsPhone}>{visitor.phone}</Text>
            <View style={VisitorStyles.badgeRow}>
              <View
                style={[
                  VisitorStyles.statusBadge,
                  { backgroundColor: getStatusColor(visitor.status) + '20' },
                ]}
              >
                <Text
                  style={[
                    VisitorStyles.statusText,
                    { color: getStatusColor(visitor.status) },
                  ]}
                >
                  {getStatusLabel(visitor.status)}
                </Text>
              </View>
            </View>
          </View>

          {/* QR Code Section (only for approved/active visitors) */}
          {(visitor.status === 'approved' || visitor.status === 'active') && (
            <View style={VisitorStyles.qrSection}>
              <QRCode 
                value={`VISITOR:${visitor.id}:${visitor.name}:${visitor.phone}`}
                size={200}
              />
              <Text style={VisitorStyles.qrText}>
                Show this QR code at the gate for quick entry
              </Text>
              <Text style={VisitorStyles.qrSubText}>
                ID: {visitor.id}
              </Text>
            </View>
          )}

          {/* Visit Information */}
          <View style={VisitorStyles.infoSection}>
            <Text style={VisitorStyles.sectionTitle}>Visit Information</Text>

            <View style={VisitorStyles.infoRow}>
              <Text style={VisitorStyles.infoLabel}>Purpose</Text>
              <Text style={VisitorStyles.infoValue}>{visitor.purpose}</Text>
            </View>

            <View style={VisitorStyles.infoRow}>
              <Text style={VisitorStyles.infoLabel}>Expected Date</Text>
              <Text style={VisitorStyles.infoValue}>{visitor.expectedDate}</Text>
            </View>

            <View style={VisitorStyles.infoRow}>
              <Text style={VisitorStyles.infoLabel}>Expected Time</Text>
              <Text style={VisitorStyles.infoValue}>{visitor.expectedTime}</Text>
            </View>

            <View style={VisitorStyles.infoRow}>
              <Text style={VisitorStyles.infoLabel}>No. of Guests</Text>
              <Text style={VisitorStyles.infoValue}>{visitor.numberOfGuests}</Text>
            </View>

            {visitor.vehicleNumber && (
              <View style={VisitorStyles.infoRow}>
                <Text style={VisitorStyles.infoLabel}>Vehicle Number</Text>
                <Text style={VisitorStyles.infoValue}>{visitor.vehicleNumber}</Text>
              </View>
            )}

            {visitor.checkInTime && (
              <View style={VisitorStyles.infoRow}>
                <Text style={VisitorStyles.infoLabel}>Check-in Time</Text>
                <Text style={VisitorStyles.infoValue}>{visitor.checkInTime}</Text>
              </View>
            )}

            {visitor.checkOutTime && (
              <View style={[VisitorStyles.infoRow, VisitorStyles.infoRowLast]}>
                <Text style={VisitorStyles.infoLabel}>Check-out Time</Text>
                <Text style={VisitorStyles.infoValue}>{visitor.checkOutTime}</Text>
              </View>
            )}
          </View>

          {/* Action Buttons */}
          {isUpcoming && (
            <View style={VisitorStyles.actionSection}>
              {visitor.status === 'approved' && (
                <TouchableOpacity
                  style={VisitorStyles.primaryButton}
                  onPress={handleShareQR}
                  activeOpacity={0.8}
                >
                  <Text style={VisitorStyles.primaryButtonText}>
                    Share QR Code
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={VisitorStyles.secondaryButton}
                onPress={handleCancelVisit}
                activeOpacity={0.8}
              >
                <Text style={VisitorStyles.secondaryButtonText}>
                  Cancel Visit
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    </Container>
  );
};

export default VisitorDetails;
