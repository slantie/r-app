import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, FlatList, TouchableOpacity, RefreshControl, Alert, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { Container, HeaderComponent } from '../../components/common';
import { MakeApiRequest } from '../../services/apiService';
import { GET } from '../../constants/api';
import { COLORS } from '../../constants';
import maintenanceStyles from './maintenanceStyles';

interface Props {
  navigation: any;
}

const MaintenanceManagement: React.FC<Props> = ({ navigation }) => {
  const { userData } = useSelector((state: any) => state.otp);
  const unitId = userData?.member?.unitId;

  const [bills, setBills] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const loadBills = useCallback(async () => {
    if (!unitId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await MakeApiRequest({
        apiUrl: `http://10.0.2.2:5000/api/resident/maintenance/bills?unitId=${unitId}`,
        apiMethod: GET,
      });

      if (response.data.success) {
        setBills(response.data.data);
      }
    } catch (error) {
      console.error('Error loading bills:', error);
      Alert.alert('Error', 'Unable to load maintenance bills');
    } finally {
      setLoading(false);
    }
  }, [unitId]);

  useFocusEffect(
    useCallback(() => {
      loadBills();
    }, [loadBills])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadBills();
    setRefreshing(false);
  };

  const renderEmptyState = useCallback(() => (
    <View style={maintenanceStyles.emptyContainer}>
      <Text style={maintenanceStyles.emptyIcon}>💰</Text>
      <Text style={maintenanceStyles.emptyText}>No Maintenance Bills</Text>
      <Text style={maintenanceStyles.emptySubText}>Your bills will appear here</Text>
    </View>
  ), []);

  const renderItem = ({ item }: { item: any }) => {
    const isPaid = item.isPaid;
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthName = monthNames[item.month - 1] || item.month;

    return (
      <View style={maintenanceStyles.card}>
        <View style={maintenanceStyles.row}>
          <Text style={maintenanceStyles.month}>{monthName} {item.year}</Text>
          <Text style={maintenanceStyles.amount}>₹ {item.totalOwnerAmount || item.totalTenantAmount || 0}</Text>
        </View>
        <Text style={maintenanceStyles.due}>Due: {new Date(item.dueDate).toLocaleDateString()}</Text>
        <View style={maintenanceStyles.rowSpace}>
          <View style={[maintenanceStyles.statusBadge, isPaid ? maintenanceStyles.paid : maintenanceStyles.pending]}>
            <Text style={maintenanceStyles.statusText}>{isPaid ? 'PAID' : 'PENDING'}</Text>
          </View>
          <View style={maintenanceStyles.actions}>
            <TouchableOpacity
              style={maintenanceStyles.detailsBtn}
              onPress={() => navigation.navigate('MaintenanceDetails', { billId: item._id, unitId })}
            >
              <Text style={maintenanceStyles.detailsBtnText}>View</Text>
            </TouchableOpacity>
            {!isPaid && (
              <TouchableOpacity
                style={maintenanceStyles.payBtn}
                onPress={() => navigation.navigate('MaintenanceDetails', { billId: item._id, unitId })}
              >
                <Text style={maintenanceStyles.payBtnText}>Pay</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <Container>
        <View style={maintenanceStyles.container}>
          <HeaderComponent
            Title="Maintenance Bills"
            onPress={() => navigation.goBack()}
          />
          <View style={maintenanceStyles.emptyContainer}>
            <ActivityIndicator size="large" color={COLORS.DARK_BLUE} />
            <Text style={maintenanceStyles.emptySubText}>Loading bills...</Text>
          </View>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <View style={maintenanceStyles.container}>
        <HeaderComponent
          Title="Maintenance Bills"
          onPress={() => navigation.goBack()}
        />

        <View style={maintenanceStyles.contentWrapper}>
          <FlatList
            data={bills}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            refreshControl={
              <RefreshControl 
                refreshing={refreshing} 
                onRefresh={onRefresh}
                colors={[COLORS.DARK_BLUE]}
              />
            }
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmptyState}
            contentContainerStyle={bills.length === 0 ? maintenanceStyles.listContentEmpty : undefined}
          />
        </View>
      </View>
    </Container>
  );
};

export default MaintenanceManagement;
