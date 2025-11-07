import React, { useEffect, useMemo } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator, Share, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Container, HeaderComponent } from '../../components/common';
import { COLORS, FF, FS, IMAGES } from '../../constants';
import { pulsesListAction } from '../../store/actions/pulses/pulsesListAction';
import {
  selectPulsesListData,
  selectPulsesListLoading,
  selectPulsesListError,
  selectPulsesListIsEmpty
} from '../../store/selectors/pulses';
import { stripHtmlTags } from '../../utils/helper';


const { width } = Dimensions.get('window');

const Pluses = (props: any) => {
  const dispatch = useDispatch()as any;

  const pulsesData = useSelector(selectPulsesListData);
  const loading = useSelector(selectPulsesListLoading);
  const error = useSelector(selectPulsesListError);
  const isEmpty = useSelector(selectPulsesListIsEmpty);

  // Memoize the pulses data to prevent unnecessary rerenders
  const memoizedPulsesData = useMemo(() => pulsesData, [pulsesData]);

// console.log("pulsesData", pulsesData);


  useEffect(() => {
    dispatch(pulsesListAction({ page: 1 }) as any);
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(pulsesListAction({ page: 1 }) as any);
  };

  const handleShare = async (item: any) => {
    try {
      // Prepare share content
      const title = item.title || 'Check out this pulse!';
      const description = item.descriptions ? stripHtmlTags(item.descriptions) : '';
      const imageUrl = item.image ? memoizedPulsesData?.data?.result?.knowledgesPath + item.image : null;

      // Create share message
      let message = `${title}`;
      if (description) {
        message += `\n\n${description}`;
      }
      message += '\n\nShared from rOS App';

      const shareContent: any = {
        title: title,
        message: message,
      };

      // Add URL if image is available
      if (imageUrl) {
        shareContent.url = imageUrl;
      }

      const result = await Share.share(shareContent, {
        dialogTitle: 'Share this pulse',
        excludedActivityTypes: [
          'com.apple.UIKit.activity.Print',
          'com.apple.UIKit.activity.AssignToContact',
          'com.apple.UIKit.activity.AddToReadingList'
        ],
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      Alert.alert('Error', 'Failed to share this pulse. Please try again.');
    }
  };

  const handleItemPress = (item: any) => {
    props.navigation.navigate('ProjectDetails', {
      projectData: item,
      imagePath: memoizedPulsesData?.data?.result?.knowledgesPath
    });
  };

  const renderItem = ({ item }: any) => {
    return (
    <TouchableOpacity style={styles.card} onPress={() => handleItemPress(item)} activeOpacity={0.8}>
      <Image
        source={{ uri: memoizedPulsesData?.data?.result?.knowledgesPath + item.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.date}>
          {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : undefined}
        </Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>
          {item.description}
        </Text>
        <View style={styles.readMoreContainer}>
          <Text style={[styles.description, { marginTop: 0 }]}>read more</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleShare(item)}
            activeOpacity={0.7}
          >
            <Image source={IMAGES.SHARE} style={styles.shareIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );  }

  if (error) {
    return (
      <Container>
        <HeaderComponent Title="Pulses" onPress={() => props.navigation.goBack()} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load pulses data</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={handleRefresh}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <HeaderComponent Title="Pulses" onPress={() => {
        props.navigation.goBack();
      }} />
      <FlatList
        data={memoizedPulsesData?.data?.result?.knowledgeList}
        renderItem={renderItem}
        // keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        contentContainerStyle={[styles.container,{paddingBottom:50}]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No pulses available</Text>
            </View>
          ) : (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={COLORS.BLUE_TEXT} />
            </View>
          )
        }
        refreshing={loading}
        onRefresh={handleRefresh}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  card: {
    borderRadius: 10,
    marginTop: 12,
    overflow: 'hidden',
    // elevation: 3,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    borderWidth: 0.5,
    borderColor: COLORS.BORDER_GREY
  },
  image: {
    width: '100%',
    height: width * 0.45,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.BLACK,
    marginTop: 12
  },
  description: {
    fontSize: FS.FS14,
    fontFamily: FF[300],
    color: COLORS.GREY_TEXT,
    marginTop: 12
  },
  date: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: 'flex-end',
    backgroundColor: COLORS.BG_GREY,
    // elevation: 2,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  shareIcon: {
    width: 20,
    height: 20,
  },
  readMoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  loaderContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: COLORS.BLACK_TEXT,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: FS.FS14,
    fontFamily: FF[400],
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    textAlign: 'center',
  },
});

export default Pluses;