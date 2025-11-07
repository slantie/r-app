import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, RefreshControl, ActivityIndicator, Image, Alert } from 'react-native';
import { Container } from '../../components/common';
import { COLORS, FF, FS, IMAGES } from '../../constants';

const Community = (props: any) => {

  const fallbackData = [
    {
      id: '1',
      title: 'Wire',
      subtitle: 'Women in Real Estate',
      description: "WIRE is not just an event, it's a thriving community where women empower women in real estate.",
      hasReadMore: false,
    },
    {
      id: '2',
      title: 'CP',
      subtitle: 'Channel Partner',
      description: "Join Shivalik as a Channel Partner and grow with one of Gujarat's most trusted real estate brands.",
      hasReadMore: false,
    },
    {
      id: '3',
      title: 'Shine',
      subtitle: 'Shivalik hub of innovation networking and empowerment',
      description: "SHINE is Shivalik's community space for young minds to connect, create, and grow.",
      hasReadMore: false,
    },
    {
      id: '4',
      title: 'Staff',
      subtitle: 'Team Directory',
      description: 'Connect with our dedicated team members and find the right person to help with your needs.',
      hasReadMore: false,
    },
  ];

  const handleItemPress = (item: any) => {
    switch (item.title) {
      case 'Wire':
      case 'CP':
      case 'Shine':
      case 'Staff':
        Alert.alert('Coming Soon', 'This feature is under development. We will introduce it soon.');
        break;
      default:
        console.log('Community item pressed:', item.title);
    }
  };

  const renderCommunityItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        style={styles.communityCard}
        onPress={() => handleItemPress(item)}
      >
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
          <Text style={styles.cardDescription}>
            {item.description}
            {item.hasReadMore && (
              <Text style={styles.readMoreText}> Read More</Text>
            )}
          </Text>
          <TouchableOpacity 
            style={{alignSelf:'flex-end',backgroundColor:COLORS.WHITE,padding:10,borderRadius:25}} 
            onPress={() => handleItemPress(item)}
          >
            <Image source={IMAGES.ARROW} style={{height:20,width:20}} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Container style={styles.container}>

    <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Community</Text>
      </View>

      <FlatList
        data={fallbackData}
        renderItem={renderCommunityItem}
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
