import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/common/container';
import { RootState } from '../../store/reducers';
import { fetchNotices } from '../../store/actions/notices/noticesAction';
import { selectUserDetailData } from '../../store/selectors/auth';

interface NoticesListProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}

const NoticesList: React.FC<NoticesListProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  // Get user data from Redux
  const userDetailData = useSelector(selectUserDetailData);
  const user = userDetailData?.data?.result;
  const unitId = user?.unitId || user?.unit?._id;

  const { loading, notices, error } = useSelector((state: RootState) => state.notices);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    if (unitId) {
      dispatch(fetchNotices(unitId) as never);
    }
  }, [dispatch, unitId]);

  const onRefresh = () => {
    if (unitId) {
      setRefreshing(true);
      dispatch(fetchNotices(unitId) as never);
      setTimeout(() => setRefreshing(false), 1000);
    }
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

  const getPriorityBadgeStyle = (priority: string) => {
    return {
      ...styles.priorityBadge,
      backgroundColor: getPriorityColor(priority) + '20',
    };
  };

  const getPriorityTextStyle = (priority: string) => {
    return {
      ...styles.priorityText,
      color: getPriorityColor(priority),
    };
  };

  const renderNoticeItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.noticeCard, { borderLeftColor: getPriorityColor(item.priority) }]}
      onPress={() => navigation.navigate('NoticeDetails', { noticeId: item._id })}
    >
      <View style={styles.noticeHeader}>
        <View style={getPriorityBadgeStyle(item.priority)}>
          <Text style={getPriorityTextStyle(item.priority)}>
            {item.priority.toUpperCase()}
          </Text>
        </View>
        <Text style={styles.noticeDate}>
          {new Date(item.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </Text>
      </View>

      <Text style={styles.noticeTitle}>{item.title}</Text>

      {item.description && (
        <Text style={styles.noticeDescription} numberOfLines={2}>
          {item.description}
        </Text>
      )}

      <View style={styles.noticeFooter}>
        <Text style={styles.noticeAuthor}>
          Posted by: {item.postedBy?.name || 'Management'}
        </Text>
        <Text style={styles.viewDetails}>View Details →</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading && notices.length === 0) {
    return (
      <Container>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Notices & Announcements</Text>
        </View>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#5773FF" />
          <Text style={styles.loadingText}>Loading notices...</Text>
        </View>
      </Container>
    );
  }

  if (error && notices.length === 0) {
    return (
      <Container>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Notices & Announcements</Text>
        </View>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => unitId && dispatch(fetchNotices(unitId) as never)}
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
        <Text style={styles.headerTitle}>Notices & Announcements</Text>
        <Text style={styles.headerSubtitle}>
          {notices.length} {notices.length === 1 ? 'notice' : 'notices'}
        </Text>
      </View>

      {notices.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No notices available</Text>
          <Text style={styles.emptySubtext}>Check back later for new announcements</Text>
        </View>
      ) : (
        <FlatList
          data={notices}
          renderItem={renderNoticeItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#5773FF']} />
          }
        />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  listContainer: {
    padding: 16,
  },
  noticeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  noticeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '700',
  },
  noticeDate: {
    fontSize: 13,
    color: '#999',
  },
  noticeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  noticeDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  noticeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  noticeAuthor: {
    fontSize: 12,
    color: '#999',
  },
  viewDetails: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5773FF',
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
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#999',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#CCC',
  },
});

export default NoticesList;
