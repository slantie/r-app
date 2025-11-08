import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Container, HeaderComponent, QRCode } from '../../components/common';
import ParkingStyles from './styles/parkingStyles';
import ParkingStorageService, { ParkingPass } from '../../services/parkingStorage';

interface ParkingDetailsProps {
  navigation: {
    goBack: () => void;
  };
  route?: {
    params?: {
      pass?: ParkingPass;
    };
  };
}

const ParkingDetails: React.FC<ParkingDetailsProps> = ({ navigation, route }) => {
  const initialPass = route?.params?.pass;
  const [pass, setPass] = useState<ParkingPass | null>(initialPass || null);

  useEffect(() => {
    if (initialPass?.id) {
      loadPassData(initialPass.id);
    }
  }, [initialPass?.id]);

  const loadPassData = async (passId: string) => {
    const updatedPass = await ParkingStorageService.getPassById(passId);
    if (updatedPass) {
      setPass(updatedPass);
    }
  };

  const getVehicleIcon = (type: ParkingPass['vehicleType']): string => {
    switch (type) {
      case 'car':
        return '🚗';
      case 'bike':
        return '🏍️';
      case 'scooter':
        return '🛵';
      default:
        return '🚙';
    }
  };

  const getStatusColor = (status: ParkingPass['status']): string => {
    switch (status) {
      case 'active':
        return '#4CAF50';
      case 'expired':
        return '#F44336';
      case 'suspended':
        return '#F57C00';
      default:
        return '#757575';
    }
  };

  const getStatusLabel = (status: ParkingPass['status']): string => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'expired':
        return 'Expired';
      case 'suspended':
        return 'Suspended';
      default:
        return status;
    }
  };

  const handleDeletePass = useCallback(async () => {
    if (!pass) {
      return;
    }
    Alert.alert(
      'Delete Parking Pass',
      `Are you sure you want to delete the parking pass for ${pass.vehicleNumber}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const success = await ParkingStorageService.deletePass(pass.id);
              if (success) {
                Alert.alert('Success', 'Parking pass deleted successfully', [
                  { text: 'OK', onPress: () => navigation.goBack() },
                ]);
              } else {
                Alert.alert('Error', 'Failed to delete parking pass');
              }
            } catch (error) {
              console.error('Error deleting pass:', error);
              Alert.alert('Error', 'Failed to delete parking pass');
            }
          },
        },
      ]
    );
  }, [pass, navigation]);

  if (!pass) {
    return (
      <Container>
        <View style={ParkingStyles.detailsContainer}>
          <HeaderComponent
            Title="Parking Details"
            onPress={() => navigation.goBack()}
          />
          <View style={ParkingStyles.emptyContainer}>
            <Text style={ParkingStyles.emptyText}>No parking pass data available</Text>
          </View>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <View style={ParkingStyles.detailsContainer}>
        <HeaderComponent
          Title="Parking Pass"
          onPress={() => navigation.goBack()}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={ParkingStyles.detailsHeader}>
            <View style={ParkingStyles.badgeRow}>
              <Text style={ParkingStyles.vehicleIcon}>{getVehicleIcon(pass.vehicleType)}</Text>
            </View>
            <Text style={ParkingStyles.detailsVehicleNumber}>{pass.vehicleNumber}</Text>
            <Text style={ParkingStyles.detailsVehicleInfo}>
              {pass.vehicleBrand} {pass.vehicleModel} • {pass.vehicleColor}
            </Text>
            <View style={ParkingStyles.badgeRow}>
              <View
                style={[
                  ParkingStyles.statusBadge,
                  { backgroundColor: getStatusColor(pass.status) + '20' },
                ]}
              >
                <Text
                  style={[
                    ParkingStyles.statusText,
                    { color: getStatusColor(pass.status) },
                  ]}
                >
                  {getStatusLabel(pass.status)}
                </Text>
              </View>
              <View
                style={[
                  ParkingStyles.passTypeBadge,
                  pass.passType === 'permanent'
                    ? ParkingStyles.permanentBadge
                    : ParkingStyles.temporaryBadge,
                ]}
              >
                <Text
                  style={[
                    ParkingStyles.passTypeText,
                    pass.passType === 'permanent'
                      ? ParkingStyles.permanentText
                      : ParkingStyles.temporaryText,
                  ]}
                >
                  {pass.passType.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>

          {/* QR Code (only for active passes) */}
          {pass.status === 'active' && (
            <View style={ParkingStyles.qrSection}>
              <QRCode
                value={`PARKING:${pass.id}:${pass.vehicleNumber}:${pass.slotNumber || 'VISITOR'}`}
                size={200}
              />
              <Text style={ParkingStyles.qrText}>
                Show this QR code at the gate for parking access
              </Text>
              <Text style={ParkingStyles.qrSubText}>
                Pass ID: {pass.id}
              </Text>
            </View>
          )}

          {/* Pass Information */}
          <View style={ParkingStyles.infoSection}>
            <Text style={ParkingStyles.sectionTitle}>Pass Information</Text>

            <View style={ParkingStyles.infoRow}>
              <Text style={ParkingStyles.infoLabel}>Owner</Text>
              <Text style={ParkingStyles.infoValue}>{pass.ownerName}</Text>
            </View>

            {pass.slotNumber && (
              <View style={ParkingStyles.infoRow}>
                <Text style={ParkingStyles.infoLabel}>Slot Number</Text>
                <Text style={ParkingStyles.infoValue}>{pass.slotNumber}</Text>
              </View>
            )}

            <View style={ParkingStyles.infoRow}>
              <Text style={ParkingStyles.infoLabel}>Vehicle Type</Text>
              <Text style={ParkingStyles.infoValue}>{pass.vehicleType}</Text>
            </View>

            <View style={ParkingStyles.infoRow}>
              <Text style={ParkingStyles.infoLabel}>Valid From</Text>
              <Text style={ParkingStyles.infoValue}>{pass.validFrom}</Text>
            </View>

            {pass.validUntil && (
              <View style={ParkingStyles.infoRow}>
                <Text style={ParkingStyles.infoLabel}>Valid Until</Text>
                <Text style={ParkingStyles.infoValue}>{pass.validUntil}</Text>
              </View>
            )}

            <View style={[ParkingStyles.infoRow, ParkingStyles.infoRowLast]}>
              <Text style={ParkingStyles.infoLabel}>Pass Type</Text>
              <Text style={ParkingStyles.infoValue}>
                {pass.passType === 'permanent' ? 'Permanent' : 'Temporary'}
              </Text>
            </View>
          </View>

          {/* Actions */}
          {pass.status !== 'active' && (
            <View style={ParkingStyles.actionSection}>
              <TouchableOpacity
                style={ParkingStyles.secondaryButton}
                onPress={handleDeletePass}
                activeOpacity={0.8}
              >
                <Text style={ParkingStyles.secondaryButtonText}>
                  Delete Pass
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    </Container>
  );
};

export default ParkingDetails;
