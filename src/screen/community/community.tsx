import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Container } from '../../components/common';
import { COLORS, FF, FS } from '../../constants';

interface NoticeItem {
  id: string;
  title: string;
  category: string;
  priority: 'urgent' | 'important' | 'normal';
  description: string;
  publishDate: string;
  expiryDate: string;
  hasReadMore: boolean;
}

interface CommunityProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

const Community: React.FC<CommunityProps> = () => {

  const noticesData: NoticeItem[] = [
    {
      id: '1',
      title: 'Water Supply Disruption',
      category: 'Maintenance',
      priority: 'urgent',
      description: "Water supply will be interrupted tomorrow from 10:00 AM to 2:00 PM for tank cleaning. Please store water accordingly.",
      publishDate: 'Nov 9, 2025',
      expiryDate: 'Nov 10, 2025',
      hasReadMore: false,
    },
    {
      id: '2',
      title: 'Holi Celebration 2025',
      category: 'Event',
      priority: 'normal',
      description: "Join us for the grand Holi celebration on March 25th at the clubhouse. Snacks and colors will be provided. Time: 4:00 PM onwards.",
      publishDate: 'Nov 8, 2025',
      expiryDate: 'Mar 25, 2025',
      hasReadMore: false,
    },
    {
      id: '3',
      title: 'Parking Rules Update',
      category: 'Rules',
      priority: 'important',
      description: "New parking rules effective from Nov 15. Visitor parking limited to 2 hours. Please display parking passes on dashboard.",
      publishDate: 'Nov 7, 2025',
      expiryDate: 'Dec 31, 2025',
      hasReadMore: false,
    },
    {
      id: '4',
      title: 'Maintenance Bill - November',
      category: 'Payment',
      priority: 'important',
      description: 'November maintenance bills have been generated. Due date: November 20, 2025. Late payment charges applicable after due date.',
      publishDate: 'Nov 5, 2025',
      expiryDate: 'Nov 20, 2025',
      hasReadMore: false,
    },
    {
      id: '5',
      title: 'Security Guard Change',
      category: 'Security',
      priority: 'normal',
      description: 'New security guard Mr. Ramesh Kumar has joined from November 1st for the night shift (8 PM - 8 AM).',
      publishDate: 'Nov 1, 2025',
      expiryDate: 'Dec 1, 2025',
      hasReadMore: false,
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return '#F44336';
      case 'important':
        return '#FF9800';
      default:
        return '#4CAF50';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return '🔴';
      case 'important':
        return '🟡';
      default:
        return '🟢';
    }
  };

  const handleItemPress = (item: NoticeItem) => {
    Alert.alert(
      item.title,
      `${item.description}\n\nCategory: ${item.category}\nPublished: ${item.publishDate}\nValid until: ${item.expiryDate}`,
      [{ text: 'OK' }]
    );
  };

  const renderNoticeItem = ({ item }: { item: NoticeItem }) => {
    return (
      <TouchableOpacity
        style={styles.communityCard}
        onPress={() => handleItemPress(item)}
      >
        <View style={styles.cardContent}>
          <View style={styles.titleRow}>
            <Text style={styles.priorityIcon}>{getPriorityIcon(item.priority)}</Text>
            <Text style={[styles.cardTitle, styles.titleFlex]}>{item.title}</Text>
          </View>
          <View style={[styles.categoryBadge, { backgroundColor: getPriorityColor(item.priority) }]}>
            <Text style={styles.categoryText}>
              {item.category.toUpperCase()}
            </Text>
          </View>
          <Text style={styles.cardDescription}>
            {item.description}
          </Text>
          <View style={styles.dateRow}>
            <Text style={styles.dateText}>
              📅 Valid until: {item.expiryDate}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Container style={styles.container}>

    <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Notices & Announcements</Text>
      </View>

      <FlatList
        data={noticesData}
        renderItem={renderNoticeItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: FS.FS24,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  communityCard: {
    backgroundColor: COLORS.LIGHT_GRAY,
    borderRadius: 8,
    marginVertical: 8,
    padding: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: FS.FS18,
    fontFamily: FF[600],
    color: COLORS.BLACK,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    lineHeight: 20,
  },
  readMoreText: {
    color: COLORS.BLACK,
    fontWeight: 'bold',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  priorityIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  titleFlex: {
    flex: 1,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  categoryText: {
    color: COLORS.WHITE,
    fontSize: 11,
    fontFamily: FF[600],
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  dateText: {
    fontSize: 12,
    color: COLORS.GREY_TEXT,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.ERROR_COLOR,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: COLORS.BLUE_TEXT,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryButtonText: {
    color: COLORS.WHITE,
    fontSize: FS.FS14,
    fontFamily: FF[500],
  },
});

export default Community;
