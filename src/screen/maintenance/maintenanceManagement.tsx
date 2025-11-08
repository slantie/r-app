import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, FlatList, TouchableOpacity, RefreshControl, Alert, ActivityIndicator } from 'react-native';
import Database, { MaintenanceBill } from '../../services/database';
import { Container, HeaderComponent } from '../../components/common';
import { COLORS } from '../../constants';
import maintenanceStyles from './maintenanceStyles';

interface Props {
  navigation: any;
}

const MaintenanceManagement: React.FC<Props> = ({ navigation }) => {
  const [bills, setBills] = useState<MaintenanceBill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const loadBills = useCallback(async () => {
    setLoading(true);
    try {
      const data = await Database.getAllMaintenanceBills();
      // Sort by date - newest first
      const sorted = data.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      setBills(sorted);
    } catch (error) {
      console.error('Error loading bills:', error);
      Alert.alert('Error', 'Unable to load maintenance bills');
    } finally {
      setLoading(false);
    }
  }, []);

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

  const renderItem = ({ item }: { item: MaintenanceBill }) => {
    const isPending = item.status === 'pending' || item.status === 'overdue';
    return (
      <View style={maintenanceStyles.card}>
        <View style={maintenanceStyles.row}>
          <Text style={maintenanceStyles.month}>{item.month} {item.year}</Text>
          <Text style={maintenanceStyles.amount}>₹ {item.amount.toLocaleString()}</Text>
        </View>
        <Text style={maintenanceStyles.due}>Due: {item.dueDate}</Text>
        <View style={maintenanceStyles.rowSpace}>
          <View style={[maintenanceStyles.statusBadge, item.status === 'paid' ? maintenanceStyles.paid : maintenanceStyles.pending]}>
            <Text style={maintenanceStyles.statusText}>{item.status.toUpperCase()}</Text>
          </View>
          <View style={maintenanceStyles.actions}>
            <TouchableOpacity
              style={maintenanceStyles.detailsBtn}
              onPress={() => navigation.navigate('MaintenanceDetails', { id: item.id })}
            >
              <Text style={maintenanceStyles.detailsBtnText}>View</Text>
            </TouchableOpacity>
            {isPending && (
              <TouchableOpacity
                style={maintenanceStyles.payBtn}
                onPress={() => navigation.navigate('MaintenanceDetails', { id: item.id })}
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
