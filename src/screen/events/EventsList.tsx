import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, RefreshControl, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/common/container';
import { RootState } from '../../store/reducers';
import { fetchEvents } from '../../store/actions/events/eventsAction';
import { selectUserDetailData } from '../../store/selectors/auth';

interface EventsListProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}

const EventsList: React.FC<EventsListProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const userDetailData = useSelector(selectUserDetailData);
  const user = userDetailData?.data?.result;
  const buildingId = user?.buildingId || user?.building?._id;

  const { loading, events, error } = useSelector((state: RootState) => state.events);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    if (buildingId) {
      dispatch(fetchEvents(buildingId) as never);
    }
  }, [dispatch, buildingId]);

  const onRefresh = () => {
    setRefreshing(true);
    if (buildingId) {
      dispatch(fetchEvents(buildingId) as never);
    }
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getEventIcon = (eventType: string): string => {
    switch (eventType?.toLowerCase()) {
      case 'festival':
        return '🎊';
      case 'sports':
        return '⚽';
      case 'cultural':
        return '🎭';
      case 'workshop':
        return '📚';
      case 'meeting':
        return '🤝';
      case 'celebration':
        return '🎉';
      default:
        return '📅';
    }
  };

  const isUpcoming = (eventDate: string): boolean => {
    return new Date(eventDate) >= new Date();
  };

  const renderEventItem = ({ item }: { item: any }) => {
    const upcoming = isUpcoming(item.eventDate);

    return (
      <TouchableOpacity
        style={styles.eventCard}
        onPress={() => navigation.navigate('EventDetails', { eventId: item._id })}
      >
        <View style={styles.eventIconContainer}>
          <Text style={styles.eventIcon}>{getEventIcon(item.eventType)}</Text>
        </View>

        <View style={styles.eventInfo}>
          <Text style={styles.eventName}>{item.name}</Text>
          <Text style={styles.eventType}>{item.eventType}</Text>

          <View style={styles.eventMeta}>
            <View style={styles.metaRow}>
              <Text style={styles.metaIcon}>📅</Text>
              <Text style={styles.metaText}>
                {new Date(item.eventDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </Text>
            </View>

            {item.eventTime && (
              <View style={styles.metaRow}>
                <Text style={styles.metaIcon}>⏰</Text>
                <Text style={styles.metaText}>{item.eventTime}</Text>
              </View>
            )}
          </View>

          {item.venue && (
            <View style={styles.metaRow}>
              <Text style={styles.metaIcon}>📍</Text>
              <Text style={styles.metaText}>{item.venue}</Text>
            </View>
          )}

          <View style={styles.eventFooter}>
            {item.registrationLimit && (
              <Text style={styles.spotsText}>
                {item.registrationLimit - (item.currentRegistrations || 0)} spots left
              </Text>
            )}
            {!upcoming && (
              <View style={styles.pastBadge}>
                <Text style={styles.pastText}>PAST EVENT</Text>
              </View>
            )}
          </View>
        </View>

        <Text style={styles.viewDetails}>→</Text>
      </TouchableOpacity>
    );
  };

  if (loading && events.length === 0) {
    return (
      <Container>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Events</Text>
        </View>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#5773FF" />
          <Text style={styles.loadingText}>Loading events...</Text>
        </View>
      </Container>
    );
  }

  if (error && events.length === 0) {
    return (
      <Container>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Events</Text>
        </View>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              if (buildingId) {
                dispatch(fetchEvents(buildingId) as never);
              }
            }}
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
        <Text style={styles.headerTitle}>Community Events</Text>
        <Text style={styles.headerSubtitle}>
          {events.length} {events.length === 1 ? 'event' : 'events'}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.myRegistrationsButton}
        onPress={() => navigation.navigate('MyRegistrations')}
      >
        <Text style={styles.myRegistrationsText}>🎫 My Registrations</Text>
      </TouchableOpacity>

      {events.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyIcon}>🎉</Text>
          <Text style={styles.emptyText}>No events scheduled</Text>
          <Text style={styles.emptySubtext}>Check back later for upcoming events</Text>
        </View>
      ) : (
        <FlatList
          data={events}
          renderItem={renderEventItem}
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
  myRegistrationsButton: {
    margin: 16,
    backgroundColor: '#5773FF',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  myRegistrationsText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    padding: 16,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  eventIcon: {
    fontSize: 32,
  },
  eventInfo: {
    flex: 1,
  },
  eventName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  eventType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  eventMeta: {
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  metaIcon: {
    fontSize: 14,
    marginRight: 6,
    width: 20,
  },
  metaText: {
    fontSize: 13,
    color: '#666',
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  spotsText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  pastBadge: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  pastText: {
    fontSize: 10,
    color: '#999',
    fontWeight: '700',
  },
  viewDetails: {
    fontSize: 24,
    color: '#5773FF',
    fontWeight: '300',
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
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
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

export default EventsList;
