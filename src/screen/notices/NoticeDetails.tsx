import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/common/container';
import { RootState } from '../../store/reducers';
import { fetchNoticeDetails, markNoticeRead } from '../../store/actions/notices/noticesAction';
import { selectUserDetailData } from '../../store/selectors/auth';

interface NoticeDetailsProps {
  navigation: {
    goBack: () => void;
  };
  route: {
    params: {
      noticeId: string;
    };
  };
}

const NoticeDetails: React.FC<NoticeDetailsProps> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { noticeId } = route.params;

  // Get user data from Redux
  const userDetailData = useSelector(selectUserDetailData);
  const user = userDetailData?.data?.result;
  const unitId = user?.unitId || user?.unit?._id;

  const { loading, noticeDetails, error } = useSelector((state: RootState) => state.notices);

  useEffect(() => {
    dispatch(fetchNoticeDetails(noticeId) as never);

    // Mark notice as read when viewing details (only if unitId exists)
    if (unitId) {
      dispatch(markNoticeRead(noticeId, unitId) as never);
    }
  }, [dispatch, noticeId, unitId]);

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

  if (loading) {
    return (
      <Container>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#5773FF" />
          <Text style={styles.loadingText}>Loading notice...</Text>
        </View>
      </Container>
    );
  }

  if (error || !noticeDetails) {
    return (
      <Container>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error || 'Notice not found'}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => dispatch(fetchNoticeDetails(noticeId) as never)}
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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.metaContainer}>
          <View style={getPriorityBadgeStyle(noticeDetails.priority)}>
            <Text style={getPriorityTextStyle(noticeDetails.priority)}>
              {noticeDetails.priority.toUpperCase()}
            </Text>
          </View>
          <Text style={styles.dateText}>
            {new Date(noticeDetails.createdAt).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Text>
        </View>

        <Text style={styles.title}>{noticeDetails.title}</Text>

        {noticeDetails.description && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{noticeDetails.description}</Text>
          </View>
        )}

        {noticeDetails.content && (
          <View style={styles.contentContainer}>
            <Text style={styles.contentLabel}>Full Content:</Text>
            <Text style={styles.content}>{noticeDetails.content}</Text>
          </View>
        )}

        {noticeDetails.attachments && noticeDetails.attachments.length > 0 && (
          <View style={styles.attachmentsContainer}>
            <Text style={styles.attachmentsLabel}>Attachments ({noticeDetails.attachments.length})</Text>
            {noticeDetails.attachments.map((attachment: any, index: number) => (
              <TouchableOpacity key={index} style={styles.attachmentItem}>
                <Text style={styles.attachmentIcon}>📎</Text>
                <Text style={styles.attachmentText}>{attachment.filename || `Attachment ${index + 1}`}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.footerInfo}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Posted by:</Text>
            <Text style={styles.infoValue}>
              {noticeDetails.postedBy?.name || 'Management'}
            </Text>
          </View>

          {noticeDetails.targetAudience && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Target Audience:</Text>
              <Text style={styles.infoValue}>
                {noticeDetails.targetAudience.join(', ')}
              </Text>
            </View>
          )}

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status:</Text>
            <Text style={[styles.infoValue, { color: '#4CAF50' }]}>
              {noticeDetails.status || 'Published'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    paddingVertical: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#5773FF',
    fontWeight: '600',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  priorityBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '700',
  },
  dateText: {
    fontSize: 13,
    color: '#999',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 20,
    lineHeight: 34,
  },
  descriptionContainer: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  contentContainer: {
    marginBottom: 20,
  },
  contentLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  content: {
    fontSize: 15,
    color: '#333',
    lineHeight: 24,
  },
  attachmentsContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 20,
  },
  attachmentsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  attachmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    marginBottom: 8,
  },
  attachmentIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  attachmentText: {
    fontSize: 14,
    color: '#5773FF',
    flex: 1,
  },
  footerInfo: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  infoLabel: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '600',
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
});

export default NoticeDetails;
