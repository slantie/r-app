import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Container, HeaderComponent } from '../../components/common';
import ParkingStyles from './styles/parkingStyles';
import ParkingStorageService, { ParkingPass } from '../../services/parkingStorage';
import { COLORS } from '../../constants';

interface ParkingManagementProps {
  navigation: {
    navigate: (screen: string, params?: object) => void;
    goBack: () => void;
  };
}

const ParkingManagement: React.FC<ParkingManagementProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<'active' | 'inactive'>('active');
  const [passes, setPasses] = useState<ParkingPass[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    ParkingStorageService.initialize();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadPasses();
    }, [])
  );

  const loadPasses = async () => {
    try {
      setLoading(true);
      const allPasses = await ParkingStorageService.getAllPasses();
      setPasses(allPasses);
    } catch (error) {
      console.error('Error loading parking passes:', error);
      Alert.alert('Error', 'Failed to load parking passes');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadPasses();
    setRefreshing(false);
  };

  const activePasses = passes.filter(p => p.status === 'active');
  const inactivePasses = passes.filter(p => p.status === 'expired' || p.status === 'suspended');

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

  const getStatusStyle = (status: ParkingPass['status']) => {
    switch (status) {
      case 'active':
        return { container: ParkingStyles.statusActive, text: ParkingStyles.statusTextActive };
      case 'expired':
        return { container: ParkingStyles.statusExpired, text: ParkingStyles.statusTextExpired };
      case 'suspended':
        return { container: ParkingStyles.statusSuspended, text: ParkingStyles.statusTextSuspended };
      default:
        return { container: ParkingStyles.statusActive, text: ParkingStyles.statusTextActive };
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

  const handleDeletePass = useCallback(async (passId: string, vehicleNumber: string) => {
    Alert.alert(
      'Delete Parking Pass',
      `Are you sure you want to delete the parking pass for ${vehicleNumber}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const success = await ParkingStorageService.deletePass(passId);
              if (success) {
                Alert.alert('Success', 'Parking pass deleted successfully');
                await loadPasses();
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
  }, []);

  const handleViewDetails = useCallback((pass: ParkingPass) => {
    navigation.navigate('ParkingDetails', { pass });
  }, [navigation]);

  const renderPassCard = useCallback(({ item }: { item: ParkingPass }) => {
    const statusStyle = getStatusStyle(item.status);
    const isActive = item.status === 'active';

    return (
      <View style={ParkingStyles.passCard}>
        <View style={ParkingStyles.passHeader}>
          <View style={ParkingStyles.vehicleInfo}>
            <Text style={ParkingStyles.vehicleNumber}>{item.vehicleNumber}</Text>
            <Text style={ParkingStyles.vehicleDetails}>
              {item.vehicleBrand} {item.vehicleModel} • {item.vehicleColor}
            </Text>
            <View style={ParkingStyles.badgeRow}>
              <View style={[ParkingStyles.statusBadge, statusStyle.container]}>
                <Text style={[ParkingStyles.statusText, statusStyle.text]}>
                  {getStatusLabel(item.status)}
                </Text>
              </View>
              <View
                style={[
                  ParkingStyles.passTypeBadge,
                  item.passType === 'permanent'
                    ? ParkingStyles.permanentBadge
                    : ParkingStyles.temporaryBadge,
                ]}
              >
                <Text
                  style={[
                    ParkingStyles.passTypeText,
                    item.passType === 'permanent'
                      ? ParkingStyles.permanentText
                      : ParkingStyles.temporaryText,
                  ]}
                >
                  {item.passType.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
          <Text style={ParkingStyles.vehicleIcon}>{getVehicleIcon(item.vehicleType)}</Text>
        </View>

        <View style={ParkingStyles.passDetails}>
          <View style={ParkingStyles.detailRow}>
            <Text style={ParkingStyles.detailLabel}>Owner:</Text>
            <Text style={ParkingStyles.detailValue}>{item.ownerName}</Text>
          </View>
          {item.slotNumber && (
            <View style={ParkingStyles.detailRow}>
              <Text style={ParkingStyles.detailLabel}>Slot:</Text>
              <Text style={ParkingStyles.detailValue}>{item.slotNumber}</Text>
            </View>
          )}
          <View style={ParkingStyles.detailRow}>
            <Text style={ParkingStyles.detailLabel}>Valid From:</Text>
            <Text style={ParkingStyles.detailValue}>{item.validFrom}</Text>
          </View>
          {item.validUntil && (
            <View style={ParkingStyles.detailRow}>
              <Text style={ParkingStyles.detailLabel}>Valid Until:</Text>
              <Text style={ParkingStyles.detailValue}>{item.validUntil}</Text>
            </View>
          )}
        </View>

        <View style={ParkingStyles.actionButtons}>
          <TouchableOpacity
            style={[ParkingStyles.actionButton, ParkingStyles.viewButton]}
            onPress={() => handleViewDetails(item)}
          >
            <Text style={ParkingStyles.viewButtonText}>View QR Code</Text>
          </TouchableOpacity>
          {!isActive && (
            <TouchableOpacity
              style={[ParkingStyles.actionButton, ParkingStyles.deleteButton]}
              onPress={() => handleDeletePass(item.id, item.vehicleNumber)}
            >
              <Text style={ParkingStyles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }, [handleDeletePass, handleViewDetails]);

  const renderEmptyState = useCallback(() => (
    <View style={ParkingStyles.emptyContainer}>
      <Text style={ParkingStyles.emptyIcon}>🚗</Text>
      <Text style={ParkingStyles.emptyText}>
        {activeTab === 'active' ? 'No Active Parking Passes' : 'No Inactive Passes'}
      </Text>
      <Text style={ParkingStyles.emptySubText}>
        {activeTab === 'active'
          ? 'Add a vehicle to get started'
          : 'Expired or suspended passes will appear here'}
      </Text>
    </View>
  ), [activeTab]);

  const handleAddPass = useCallback(() => {
    navigation.navigate('AddParking');
  }, [navigation]);

  if (loading) {
    return (
      <Container>
        <View style={ParkingStyles.container}>
          <HeaderComponent
            Title="Parking Management"
            onPress={() => navigation.goBack()}
          />
          <View style={ParkingStyles.emptyContainer}>
            <ActivityIndicator size="large" color={COLORS.DARK_BLUE} />
            <Text style={ParkingStyles.emptySubText}>Loading parking passes...</Text>
          </View>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <View style={ParkingStyles.container}>
        <HeaderComponent
          Title="Parking Management"
          onPress={() => navigation.goBack()}
        />

        <View style={ParkingStyles.contentWrapper}>
          <View style={ParkingStyles.tabContainer}>
            <TouchableOpacity
              style={[
                ParkingStyles.tab,
                activeTab === 'active' && ParkingStyles.activeTab,
              ]}
              onPress={() => setActiveTab('active')}
            >
              <Text
                style={[
                  ParkingStyles.tabText,
                  activeTab === 'active' && ParkingStyles.activeTabText,
                ]}
              >
                Active ({activePasses.length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                ParkingStyles.tab,
                activeTab === 'inactive' && ParkingStyles.activeTab,
              ]}
              onPress={() => setActiveTab('inactive')}
            >
              <Text
                style={[
                  ParkingStyles.tabText,
                  activeTab === 'inactive' && ParkingStyles.activeTabText,
                ]}
              >
                Inactive ({inactivePasses.length})
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={activeTab === 'active' ? activePasses : inactivePasses}
            renderItem={renderPassCard}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmptyState}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[COLORS.DARK_BLUE]}
              />
            }
            contentContainerStyle={
              (activeTab === 'active' && activePasses.length === 0) ||
              (activeTab === 'inactive' && inactivePasses.length === 0)
                ? ParkingStyles.listContentEmpty
                : undefined
            }
          />
        </View>

        <TouchableOpacity
          style={ParkingStyles.fabButton}
          onPress={handleAddPass}
          activeOpacity={0.8}
        >
          <Text style={ParkingStyles.fabIcon}>+</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default ParkingManagement;
