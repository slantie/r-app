import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Modal, ActivityIndicator } from 'react-native';
import Database, { MaintenanceBill } from '../../services/database';
import { Container, HeaderComponent } from '../../components/common';
import { COLORS } from '../../constants';
import maintenanceStyles from './maintenanceStyles';

type PaymentGateway = 'razorpay' | 'stripe' | 'upi' | null;

interface Props {
  route: any;
  navigation: any;
}

const MaintenanceDetails: React.FC<Props> = ({ route, navigation }) => {
  const { id } = route.params || {};
  const [bill, setBill] = useState<MaintenanceBill | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [selectedGateway, setSelectedGateway] = useState<PaymentGateway>(null);
  const [processing, setProcessing] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        if (!id) return;
        const b = await Database.getMaintenanceBillById(id);
        if (mounted) setBill(b);
      } catch (error) {
        console.error('Error loading bill:', error);
        Alert.alert('Error', 'Unable to load bill');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  const handlePaymentInitiate = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentConfirm = async () => {
    if (!bill || !selectedGateway) return;
    
    setProcessing(true);
    
    // Simulate payment gateway processing
    setTimeout(async () => {
      try {
        const txnId = `${selectedGateway.toUpperCase()}_${Date.now()}`;
        const paymentMethod = selectedGateway === 'razorpay' ? 'Razorpay' : selectedGateway === 'stripe' ? 'Stripe' : 'UPI';
        
        await Database.updateMaintenanceBill(bill.id, {
          status: 'paid',
          paidDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          paymentMethod,
          transactionId: txnId,
        });
        
        setProcessing(false);
        setShowPaymentModal(false);
        
        Alert.alert(
          '✅ Payment Successful',
          `Your payment of ₹${bill.amount} has been processed successfully.\n\nTransaction ID: ${txnId}\nPayment Method: ${paymentMethod}`,
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      } catch (error) {
        console.error('Payment error:', error);
        setProcessing(false);
        Alert.alert('Payment Failed', 'Please try again');
      }
    }, 2000); // Simulate 2 second processing time
  };

  if (loading) {
    return (
      <Container>
        <View style={maintenanceStyles.container}>
          <HeaderComponent
            Title="Bill Details"
            onPress={() => navigation.goBack()}
          />
          <View style={maintenanceStyles.emptyContainer}>
            <ActivityIndicator size="large" color={COLORS.DARK_BLUE} />
            <Text style={maintenanceStyles.emptySubText}>Loading bill details...</Text>
          </View>
        </View>
      </Container>
    );
  }

  if (!bill) {
    return (
      <Container>
        <View style={maintenanceStyles.container}>
          <HeaderComponent
            Title="Bill Details"
            onPress={() => navigation.goBack()}
          />
          <View style={maintenanceStyles.emptyContainer}>
            <Text style={maintenanceStyles.emptyIcon}>💰</Text>
            <Text style={maintenanceStyles.emptyText}>Bill not found</Text>
          </View>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <View style={maintenanceStyles.container}>
        <HeaderComponent
          Title="Bill Details"
          onPress={() => navigation.goBack()}
        />
      
        <ScrollView 
          style={maintenanceStyles.contentWrapper}
          showsVerticalScrollIndicator={false}
        >
        <View style={maintenanceStyles.detailsHeader}>
          <Text style={maintenanceStyles.billTitle}>{bill.month} {bill.year}</Text>
          <Text style={maintenanceStyles.billStatus}>
            {bill.status === 'paid' ? '✅ Paid' : '⏳ Pending Payment'}
          </Text>
        </View>

      <View style={maintenanceStyles.amountCard}>
        <Text style={maintenanceStyles.amountLabel}>Total Amount</Text>
        <Text style={maintenanceStyles.amountLarge}>₹ {bill.amount.toLocaleString()}</Text>
        {bill.status !== 'paid' && (
          <Text style={maintenanceStyles.dueLabel}>Due by {bill.dueDate}</Text>
        )}
      </View>

      <Text style={maintenanceStyles.sectionTitle}>Cost Breakdown</Text>
      <View style={maintenanceStyles.breakdownContainer}>
        {Object.entries(bill.breakdown).map(([key, value], index) => {
          // Format the label properly
          const label = key
            .replace(/([A-Z])/g, ' $1') // Add space before capital letters
            .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
            .trim();
          
          return (
            <View key={key}>
              {index > 0 && <View style={maintenanceStyles.divider} />}
              <View style={maintenanceStyles.breakdownRow}>
                <Text style={maintenanceStyles.breakdownLabel}>{label}</Text>
                <Text style={maintenanceStyles.breakdownValue}>₹ {value.toLocaleString()}</Text>
              </View>
            </View>
          );
        })}
        <View style={maintenanceStyles.breakdownTotal}>
          <Text style={maintenanceStyles.breakdownTotalLabel}>Total Amount</Text>
          <Text style={maintenanceStyles.breakdownTotalValue}>₹ {bill.amount.toLocaleString()}</Text>
        </View>
      </View>

      {bill.status === 'paid' ? (
        <View style={maintenanceStyles.paidInfo}>
          <View style={maintenanceStyles.paidBadge}>
            <Text style={maintenanceStyles.paidBadgeText}>✓ PAYMENT COMPLETED</Text>
          </View>
          <View style={maintenanceStyles.paidInfoRow}>
            <Text style={maintenanceStyles.paidInfoLabel}>Payment Date</Text>
            <Text style={maintenanceStyles.paidInfoValue}>{bill.paidDate}</Text>
          </View>
          <View style={maintenanceStyles.paidInfoRow}>
            <Text style={maintenanceStyles.paidInfoLabel}>Payment Method</Text>
            <Text style={maintenanceStyles.paidInfoValue}>{bill.paymentMethod}</Text>
          </View>
          <View style={maintenanceStyles.paidInfoRow}>
            <Text style={maintenanceStyles.paidInfoLabel}>Transaction ID</Text>
            <Text style={maintenanceStyles.paidInfoValue}>{bill.transactionId}</Text>
          </View>
        </View>
      ) : (
        <TouchableOpacity style={maintenanceStyles.payBtn} onPress={handlePaymentInitiate}>
          <Text style={maintenanceStyles.payBtnText}>Proceed to Pay ₹ {bill.amount}</Text>
        </TouchableOpacity>
      )}

      {/* Payment Gateway Modal */}
      <Modal
        visible={showPaymentModal}
        transparent
        animationType="slide"
        onRequestClose={() => !processing && setShowPaymentModal(false)}
      >
        <View style={maintenanceStyles.modalOverlay}>
          <View style={maintenanceStyles.modalContent}>
            <View style={maintenanceStyles.modalHeader}>
              <Text style={maintenanceStyles.modalTitle}>Select Payment Method</Text>
              <TouchableOpacity 
                style={maintenanceStyles.closeButton} 
                onPress={() => !processing && setShowPaymentModal(false)}
                disabled={processing}
              >
                <Text style={maintenanceStyles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>

            {!processing ? (
              <>
                <View style={maintenanceStyles.modalSection}>
                  <Text style={maintenanceStyles.modalSectionTitle}>Choose Payment Gateway</Text>
                  
                  <TouchableOpacity
                    style={[
                      maintenanceStyles.paymentMethodCard,
                      selectedGateway === 'razorpay' && maintenanceStyles.paymentMethodSelected
                    ]}
                    onPress={() => setSelectedGateway('razorpay')}
                  >
                    <Text style={maintenanceStyles.paymentMethodIcon}>💳</Text>
                    <View style={maintenanceStyles.paymentMethodInfo}>
                      <Text style={maintenanceStyles.paymentMethodName}>Razorpay</Text>
                      <Text style={maintenanceStyles.paymentMethodDesc}>Cards, UPI, Net Banking & More</Text>
                    </View>
                    <View style={[maintenanceStyles.radioOuter, selectedGateway === 'razorpay' && maintenanceStyles.radioOuterSelected]}>
                      {selectedGateway === 'razorpay' && <View style={maintenanceStyles.radioInner} />}
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      maintenanceStyles.paymentMethodCard,
                      selectedGateway === 'stripe' && maintenanceStyles.paymentMethodSelected
                    ]}
                    onPress={() => setSelectedGateway('stripe')}
                  >
                    <Text style={maintenanceStyles.paymentMethodIcon}>🌐</Text>
                    <View style={maintenanceStyles.paymentMethodInfo}>
                      <Text style={maintenanceStyles.paymentMethodName}>Stripe</Text>
                      <Text style={maintenanceStyles.paymentMethodDesc}>International Cards & Wallets</Text>
                    </View>
                    <View style={[maintenanceStyles.radioOuter, selectedGateway === 'stripe' && maintenanceStyles.radioOuterSelected]}>
                      {selectedGateway === 'stripe' && <View style={maintenanceStyles.radioInner} />}
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      maintenanceStyles.paymentMethodCard,
                      selectedGateway === 'upi' && maintenanceStyles.paymentMethodSelected
                    ]}
                    onPress={() => setSelectedGateway('upi')}
                  >
                    <Text style={maintenanceStyles.paymentMethodIcon}>📱</Text>
                    <View style={maintenanceStyles.paymentMethodInfo}>
                      <Text style={maintenanceStyles.paymentMethodName}>UPI Direct</Text>
                      <Text style={maintenanceStyles.paymentMethodDesc}>Google Pay, PhonePe, Paytm</Text>
                    </View>
                    <View style={[maintenanceStyles.radioOuter, selectedGateway === 'upi' && maintenanceStyles.radioOuterSelected]}>
                      {selectedGateway === 'upi' && <View style={maintenanceStyles.radioInner} />}
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={maintenanceStyles.modalSection}>
                  <Text style={maintenanceStyles.modalSectionTitle}>Bill Summary</Text>
                  <View style={maintenanceStyles.billSummaryCard}>
                    <View style={maintenanceStyles.summaryRow}>
                      <Text style={maintenanceStyles.summaryLabel}>Billing Period</Text>
                      <Text style={maintenanceStyles.summaryValue}>{bill.month} {bill.year}</Text>
                    </View>
                    <View style={maintenanceStyles.summaryRow}>
                      <Text style={maintenanceStyles.summaryLabel}>Due Date</Text>
                      <Text style={maintenanceStyles.summaryValue}>{bill.dueDate}</Text>
                    </View>
                    <View style={maintenanceStyles.summaryTotal}>
                      <Text style={maintenanceStyles.summaryTotalLabel}>Amount to Pay</Text>
                      <Text style={maintenanceStyles.summaryTotalValue}>₹ {bill.amount}</Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={[
                    maintenanceStyles.confirmButton,
                    !selectedGateway && maintenanceStyles.confirmButtonDisabled
                  ]}
                  onPress={handlePaymentConfirm}
                  disabled={!selectedGateway}
                >
                  <Text style={maintenanceStyles.confirmButtonText}>
                    {selectedGateway ? `Pay with ${selectedGateway === 'razorpay' ? 'Razorpay' : selectedGateway === 'stripe' ? 'Stripe' : 'UPI'}` : 'Select Payment Method'}
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <View style={maintenanceStyles.processingContainer}>
                <ActivityIndicator size="large" color="#1976D2" />
                <Text style={maintenanceStyles.processingText}>Processing Payment...</Text>
                <Text style={maintenanceStyles.processingSubtext}>
                  Please wait while we process your payment securely
                </Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
      </ScrollView>
      </View>
    </Container>
  );
};

export default MaintenanceDetails;
