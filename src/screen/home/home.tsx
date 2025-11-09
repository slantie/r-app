import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HomeStyles } from './styles';
import Container from '../../components/common/container';
import Images from '../../constants/images';
import { Image } from 'react-native';
import { userDetailAction } from '../../store/actions/auth/userDetailAction';
import { selectUserDetailData } from '../../store/selectors/auth';
import { fetchDashboardData, fetchQuickStats } from '../../store/actions/dashboard/dashboardAction';
import { RootState } from '../../store/reducers';

interface QuickActionItem {
  id: string;
  label: string;
  icon: string;
  screen?: string;
  image: ReturnType<typeof require>;
}

interface NoticePreview {
  id: string;
  title: string;
  priority: 'urgent' | 'important' | 'normal';
  date: string;
}

interface HomeProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state: { otp: { userData: any } }) => state.otp);
  const userName = userData?.firstName || 'Resident';
  const userDetailData = useSelector(selectUserDetailData);
  const user = userDetailData?.data?.result;

  // Redux Dashboard State
  const dashboardState = useSelector((state: RootState) => state.dashboard);
  const { loading, data, quickStats, error } = dashboardState;

  const userDetailsApi = React.useCallback(() => {
    dispatch(userDetailAction() as never);
  }, [dispatch]);

  useEffect(() => {
    if (user === undefined) {
      userDetailsApi();
    }
  }, [user, userDetailsApi]);

  // Get unitId from authenticated user data
  // Priority: userData.member (from registration) > userDetail API response
  const unitId = userData?.member?.unitId ||
                 userDetailData?.data?.result?.unitId ||
                 userDetailData?.data?.result?.unit?._id ||
                 user?.unitId ||
                 user?.unit?._id;

  // Fetch dashboard data when unitId is available
  useEffect(() => {
    if (unitId) {
      console.log('📊 Fetching dashboard data for unitId:', unitId);
      dispatch(fetchDashboardData(unitId) as never);
      dispatch(fetchQuickStats(unitId) as never);
    } else {
      console.warn('⚠️ No unitId found - cannot fetch dashboard data');
    }
  }, [dispatch, unitId]);

  // Extract data from dashboard response
  const unitInfo = data?.unitInfo
    ? `${data.unitInfo.blockName}-${data.unitInfo.unitNumber}`
    : 'Loading...';

  const maintenanceDue = data?.pendingBill
    ? `₹${data.pendingBill.amount}`
    : '₹0';

  const pendingComplaints = quickStats?.activeComplaints || 0;
  const upcomingBookings = quickStats?.activeBookings || 0;

  // Latest notice from dashboard data
  const latestNotice: NoticePreview = data?.recentNotices?.[0]
    ? {
        id: data.recentNotices[0]._id,
        title: data.recentNotices[0].title,
        priority: data.recentNotices[0].priority || 'normal',
        date: new Date(data.recentNotices[0].createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
      }
    : {
        id: '1',
        title: 'No new notices',
        priority: 'normal',
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
      };

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'urgent':
        return '#F44336';
      case 'important':
        return '#FF9800';
      default:
        return '#4CAF50';
    }
  };

  // Resident Quick Actions (8 items)
  const quickActions: QuickActionItem[] = [
    {
      id: '1',
      label: 'Complaints',
      icon: '🛠️',
      image: Images.FEEDBACK,
    },
    {
      id: '2',
      label: 'Amenities',
      icon: '🏊',
      image: Images.CALENDAR,
    },
    {
      id: '3',
      label: 'Visitors',
      icon: '👥',
      image: Images.CONTACT,
    },
    {
      id: '4',
      label: 'Parking',
      icon: '🚗',
      image: Images.LOCATION,
    },
    {
      id: '5',
      label: 'Maintenance',
      icon: '💰',
      image: Images.PROJECT,
    },
    {
      id: '6',
      label: 'Gallery',
      icon: '📸',
      image: Images.GALLARY,
    },
    {
      id: '7',
      label: 'Gate Pass',
      icon: '🚪',
      image: Images.SCANNER,
    },
    {
      id: '8',
      label: 'Help',
      icon: '📞',
      image: Images.CALL,
    },
  ];

  const renderQuickAction = ({ item }: { item: QuickActionItem }) => {
    const handlePress = () => {
      if (item.label === 'Visitors') {
        navigation.navigate('VisitorManagement');
      } else if (item.label === 'Parking') {
        navigation.navigate('ParkingManagement');
      } else if (item.label === 'Maintenance') {
        navigation.navigate('MaintenanceManagement');
      } else if (item.label === 'Complaints') {
        navigation.navigate('ComplaintManagement');
      } else {
        Alert.alert(
          'Coming Soon',
          `${item.label} feature will be available soon.`,
          [{ text: 'OK' }]
        );
      }
    };

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={HomeStyles.menuItem}
        onPress={handlePress}
      >
        <Image source={item.image} style={HomeStyles.menuIcon} />
        <Text style={HomeStyles.menuLabel}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  // Show loading indicator while fetching data
  if (loading && !data) {
    return (
      <Container>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#5773FF" />
          <Text style={{ marginTop: 16, color: '#666', fontSize: 16 }}>
            Loading dashboard...
          </Text>
        </View>
      </Container>
    );
  }

  // Show error if any
  if (error && !data) {
    return (
      <Container>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ color: '#F44336', fontSize: 16, textAlign: 'center' }}>
            {error}
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 20,
              backgroundColor: '#5773FF',
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 8,
            }}
            onPress={() => {
              if (unitId) {
                dispatch(fetchDashboardData(unitId) as never);
                dispatch(fetchQuickStats(unitId) as never);
              }
            }}
          >
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
              Retry
            </Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={HomeStyles.header}>
          <Text style={HomeStyles.headerTitle}>
            Hello, {userName}
          </Text>
          <Text style={HomeStyles.headerSubtitle}>
            {unitInfo}
          </Text>
        </View>

        <TouchableOpacity
          style={[HomeStyles.noticeCard, { borderLeftColor: getPriorityColor(latestNotice.priority) }]}
          onPress={() => {
            Alert.alert(
              '📢 Latest Notice',
              'Water supply will be interrupted tomorrow from 10:00 AM to 2:00 PM for tank cleaning.',
              [{ text: 'OK' }]
            );
          }}
        >
          <View style={HomeStyles.noticeCardRow}>
            <View style={HomeStyles.noticeCardContent}>
              <Text style={HomeStyles.noticeLabel}>
                📢 LATEST ANNOUNCEMENT
              </Text>
              <Text style={HomeStyles.noticeTitle}>
                {latestNotice.title}
              </Text>
              <Text style={HomeStyles.noticeDate}>
                {latestNotice.date}
              </Text>
            </View>
            <Image source={Images.ARROW} style={HomeStyles.noticeArrow} />
          </View>
        </TouchableOpacity>

        <View style={HomeStyles.section}>
          <Text style={HomeStyles.sectionTitle}>
            ⚡ Quick Actions
          </Text>
          <FlatList
            data={quickActions}
            renderItem={renderQuickAction}
            keyExtractor={(item) => item.id}
            numColumns={4}
            scrollEnabled={false}
            columnWrapperStyle={HomeStyles.columnWrapper}
          />
        </View>

        <View style={HomeStyles.section}>
          <Text style={HomeStyles.sectionTitle}>
            📊 My Stats
          </Text>
          
          <View style={HomeStyles.statsCard}>
            <View style={HomeStyles.statRow}>
              <Text style={HomeStyles.statLabel}>
                💰 Maintenance Due
              </Text>
              <Text style={HomeStyles.statValueRed}>
                {maintenanceDue}
              </Text>
            </View>

            <View style={HomeStyles.statRow}>
              <Text style={HomeStyles.statLabel}>
                🛠️ Pending Complaints
              </Text>
              <Text style={HomeStyles.statValueOrange}>
                {pendingComplaints}
              </Text>
            </View>

            <View style={HomeStyles.statRowLast}>
              <Text style={HomeStyles.statLabel}>
                📅 Upcoming Bookings
              </Text>
              <Text style={HomeStyles.statValueGreen}>
                {upcomingBookings}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default Home;
