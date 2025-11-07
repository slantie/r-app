import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  Share,
  Alert,
  Platform,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {
  Container,
  CustomButton,
  HeaderComponent,
} from '../../components/common';
import { COLORS, FF, FS, IMAGES } from '../../constants';
import { ProjectStyles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { projectListAction } from '../../store/actions/project/projectListAction';
import {
  selectProjectListData,
  selectProjectListLoading,
  selectProjectListError,
  selectUserDetailData,
} from '../../store/selectors/auth';
import { userDetailAction } from '../../store/actions/auth/userDetailAction';

const { width } = Dimensions.get('window');

const Project = (props: any) => {
  const dispatch = useDispatch() as any;
  const projectListData = useSelector(selectProjectListData);
  const projectListLoading = useSelector(selectProjectListLoading);
  const projectListError = useSelector(selectProjectListError);
  const userDetailData = useSelector(selectUserDetailData);
  const user = userDetailData?.data?.result;

  // State for infinite scroll
  const [allProjects, setAllProjects] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [baseurl, setBaseurl] = useState('');

  const [shareProject, setShareProject] = useState<any>(null);
  const [customShareModalVisible, setCustomShareModalVisible] = useState(false);
  const [selectedShareOptions, setSelectedShareOptions] = useState({
    brochure: true,
    location: true,
    availability: true,
    amenity: true,
    website: true,
  });

  const userDetailsApi = () => {
    dispatch(userDetailAction()).then((res: any) => {
      console.log('User Details API Response', res);
    });
  };
  // Load initial data
  useEffect(() => {
    loadInitialProjects();
    userDetailsApi();
  }, []);

  // Load first page
  const loadInitialProjects = async () => {
    try {
      setCurrentPage(1);
      const response = await dispatch(projectListAction({ page: 1 }));
      if (response?.data?.result?.projects) {
        setAllProjects(response.data.result.projects);
        setHasMoreData(response.data.result.projects.length >= 10);
        setBaseurl(response.data.result.projectDocPath); // Assume 10 per page
      }
    } catch (error) {
      console.log('Error loading initial projects:', error);
    }
  };

  // Load more projects when scrolling to end
  const loadMoreProjects = async () => {
    if (isLoadingMore || !hasMoreData) return;

    setIsLoadingMore(true);
    const nextPage = currentPage + 1;

    try {
      const response = await dispatch(projectListAction({ page: nextPage }));
      if (response?.data?.result?.projects) {
        const newProjects = response.data.result.projects;

        // ADD new projects to existing array (no replacement)
        setAllProjects(prevProjects => [...prevProjects, ...newProjects]);
        setCurrentPage(nextPage);

        // Check if there are more projects to load
        setHasMoreData(newProjects.length >= 10); // If less than 10, no more data
      }
    } catch (error) {
      console.log('Error loading more projects:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Pull to refresh - reset everything and load from page 1
  const onRefresh = async () => {
    setIsRefreshing(true);
    try {
      setCurrentPage(1);
      const response = await dispatch(projectListAction({ page: 1 }));
      if (response?.data?.result?.projects) {
        // REPLACE with fresh data from page 1
        setAllProjects(response.data.result.projects);
        setHasMoreData(response.data.result.projects.length >= 10);
      }
    } catch (error) {
      console.log('Error refreshing projects:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const shareOptions = [
    { key: 'brochure', label: 'Brochure' },
    { key: 'amenity', label: 'Amenity' },
    { key: 'location', label: 'Location' },
    { key: 'website', label: 'Website link' },
    // { key: 'availability', label: 'Availability' },
  ];

  const toggleShareOption = (key: string) => {
    setSelectedShareOptions(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  const handleSharePress = async (project: any) => {
    console.log('project*-*-**-*-*-*-*-', project);

    setShareProject(project);
    setCustomShareModalVisible(true);
  };

  const handleShareSubmit = async () => {
    if (!shareProject) return;
    try {
      let shareMessage = `*Project Name:* ${shareProject.name}\n\n`;

      if (selectedShareOptions.brochure) {
        const brochureUrl =
          baseurl + shareProject.technicalDocumentsData[0]?.documentUrl;
        // Properly encode the brochure URL to handle spaces and special characters
        const encodedBrochureUrl = encodeURI(brochureUrl);
        shareMessage += `📄 *Brochure:* ${encodedBrochureUrl}\n\n`;
      }

      if (selectedShareOptions.location) {
        shareMessage += `📍 *Location:* ${shareProject?.projectAdvanceDetailsData?.locationLink}\n\n`;
      }

      if (selectedShareOptions.amenity) {
        // Format amenities from the data structure
        const amenitiesList =
          shareProject.amenitiesData?.map((amenity: any) => amenity.name) || [];
        const amenitiesText =
          amenitiesList.length > 0
            ? amenitiesList.slice(0, 5).join(', ') +
              (amenitiesList.length > 5 ? '...' : '')
            : ' - ';
        shareMessage += `✨ *Amenities:* ${amenitiesText}\n\n`;
      }

      if (selectedShareOptions.website) {
        shareMessage += `🌐 *Website:* ${shareProject?.projectAdvanceDetailsData?.websiteLink}\n\n`;
      }

      const shareContent = {
        title: shareProject.name,
        message: shareMessage.trim(),
        // url: shareUrl
      };

      console.log('Share content:', shareContent);

      setCustomShareModalVisible(false);
      setTimeout(async () => {
        try {
          if (Platform.OS === 'ios') {
            const result = await Share.share(shareContent);
            console.log('iOS Share result:', result);
          } else {
            // Android share
            const result = await Share.share(shareContent, {
              dialogTitle: `Share ${shareProject.name}`,
            });
            console.log('Android Share result:', result);
          }
        } catch (shareError) {
          console.log('Share error:', shareError);
          // Fallback: show alert with share content
          Alert.alert('Share Content', shareContent.message, [
            { text: 'Copy', onPress: () => console.log('Copy pressed') },
            { text: 'OK', style: 'default' },
          ]);
        }
      }, 100);
    } catch (error) {
      console.log('Error in handleShareSubmit:', error);
    }
  };

  // console.log("user?.userRoles",user?.userRoles);

  const renderItem = ({ item }: any) => {

    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: COLORS.BORDER_GREY,
          borderRadius: 16,
          marginTop: 16,
        }}
      >
        <View style={ProjectStyles.imageContainer}>
          <Image
            source={{
              uri:
                projectListData?.data?.result?.projectDocPath +
                (item.banner ? item.banner : item.bannersArray?.[0] || ''),
            }}
            style={ProjectStyles.image}
          />
          <View style={[ProjectStyles.statusTag,{maxWidth:'60%'}]}>
            <Text numberOfLines={1} style={ProjectStyles.statusText}>
              {item.projectStatusData?.title || item.projectStatus}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              marginTop: 16,
              position: 'absolute',
              bottom: 10,
              left: 10,
            }}
          >
            {item?.inverstmentData.map((i: any) => (
              <View
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  borderRadius: 8,
                  borderColor: COLORS.BORDER_GREY,
                  backgroundColor: '#F4F4F4CC',
                  overflow:'hidden',
                  // flex:1
                }}
              >
                <Text
                  style={{
                    fontSize: FS.FS16,
                    fontFamily: FF[400],
                    color: COLORS.BLACK,
                  }}
                >
                  {i?.mastersData?.title}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ padding: 12 }}>
          <View style={ProjectStyles.content}>
            <Text style={ProjectStyles.title}>{item.name}</Text>
            <View style={ProjectStyles.locationContainer}>
              <Image
                source={IMAGES.LOCATION}
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 5,
                  tintColor: COLORS.GREY_TEXT,
                }}
                resizeMode="contain"
              />
              <Text style={ProjectStyles.location}>
                {item?.territoryData?.title}
              </Text>
            </View>
          </View>
          {/* ======================== */}
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
            {item?.categoriesData.map((i: any) => {
              return (
                <Text
                  style={{
                    fontSize: FS.FS16,
                    fontFamily: FF[400],
                    color: COLORS.GREY_TEXT,
                  }}
                >
                  {i?.mastersData?.title}
                </Text>
              );
            })}
          </View>
          {item?.categoriesData?.some(
            (category: any) => category?.mastersData?.title === 'Residential',
          ) && (
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
              {item?.subUnitTypeData.map((i: any) => {
                return (
                  <View>
                    <Text
                      style={{
                        fontSize: FS.FS16,
                        fontFamily: FF[400],
                        color: COLORS.GREY_TEXT,
                      }}
                    >
                      {i?.mastersData?.title}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
            {item?.unitTypeData.map((i: any) => {
              return (
                <View>
                  <Text
                    style={{
                      fontSize: FS.FS16,
                      fontFamily: FF[400],
                      color: COLORS.GREY_TEXT,
                    }}
                  >
                    {i?.mastersData?.title}
                  </Text>
                </View>
              );
            })}
          </View>
          <View style={{ marginTop: 16 }}>
            <Text
              style={{
                fontSize: FS.FS16,
                fontFamily: FF[400],
                color: COLORS.GREY_TEXT,
              }}
            >
              {item?.projectAdvanceDetailsData?.carpetAreaUnit}
            </Text>
          </View>
          <View>
            <Text style={ProjectStyles.description} numberOfLines={2}>
              {item.overview}
            </Text>
          </View>
        </View>
        <View style={{ borderTopWidth: 1, borderColor: COLORS.BORDER_GREY }} />
        <View
          style={{
            padding: 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View>
            <Text
              style={{
                fontSize: FS.FS16,
                fontFamily: FF[500],
                color: COLORS.BLACK,
              }}
            >
              ₹ {item?.projectAdvanceDetailsData?.priceStartFrom}
            </Text>
            <Text
              style={{
                fontSize: FS.FS16,
                fontFamily: FF[400],
                color: COLORS.GREY_TEXT,
              }}
            >
              onwards
            </Text>
          </View>
          <View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderRadius: 8,
                  backgroundColor: COLORS.BG_GREY,
                }}
                onPress={() => handleSharePress(item)}
              >
                <Image
                  source={IMAGES.SHARE}
                  style={{ width: 16, height: 16 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderRadius: 8,
                  backgroundColor: COLORS.BG_GREY,
                }}
                onPress={() => {
                  if (user?.isEmployee) {
                    console.log("userrrrr===========",user);

                    console.log('user*-*-*-*-*-*-*-*-', user?.isEmployee);

                    const userRoles = user?.userRoles || [];
                    console.log('userRoles', userRoles);
                    console.log('allowedRoles', user?.isEmployee);
                    const allowedRoles = [
                      'ProjectSiteSales',
                      'CPManager',
                      'CPExecutive',
                      'ProjectSalesManager',
                      'ProjectPreSales',
                    ];
                    const hasAllowedRole = userRoles.some((role: string) =>
                      allowedRoles.includes(role),
                    );
                    if (hasAllowedRole) {
                      props.navigation.navigate('ProjectLead', {
                        data: item,
                        type: 'add',
                      });
                    } else {
                      props.navigation.navigate('AddProjectLead', {
                        data: item,
                      });
                    }
                  } else {
                    props.navigation.navigate('AddProjectLead', { data: item });
                  }
                }}
              >
                <Image
                  source={IMAGES.PLUS}
                  style={{ width: 16, height: 16 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderCustomShareModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={customShareModalVisible}
        onRequestClose={() => setCustomShareModalVisible(false)}
      >
        <View style={ProjectStyles.modalOverlay}>
          <View style={ProjectStyles.shareModalContent}>
            <View style={ProjectStyles.modalHeader}>
              <Text style={ProjectStyles.modalTitle}>Share Option</Text>
              <TouchableOpacity
                style={ProjectStyles.closeButton}
                onPress={() => setCustomShareModalVisible(false)}
              >
                <Text style={ProjectStyles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            <View style={ProjectStyles.shareOptionsContainer}>
              <View style={ProjectStyles.shareOptionsGrid}>
                {shareOptions.map(option => (
                  <TouchableOpacity
                    key={option.key}
                    style={ProjectStyles.shareOptionItem}
                    onPress={() => toggleShareOption(option.key)}
                  >
                    <View
                      style={[
                        ProjectStyles.checkbox,
                        selectedShareOptions[
                          option.key as keyof typeof selectedShareOptions
                        ] && ProjectStyles.checkboxChecked,
                      ]}
                    >
                      {selectedShareOptions[
                        option.key as keyof typeof selectedShareOptions
                      ] && <Text style={ProjectStyles.checkboxText}>✓</Text>}
                    </View>
                    <Text style={ProjectStyles.shareOptionLabel}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={ProjectStyles.modalFooter}>
              <CustomButton title="Share Project" onPress={handleShareSubmit} />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  // Render loading footer for infinite scroll
  const renderFooter = () => {
    if (!isLoadingMore) return null;

    return (
      <View style={{ padding: 20, alignItems: 'center' }}>
        <ActivityIndicator size="small" color="#007AFF" />
        <Text style={{ marginTop: 8, color: '#666', fontSize: 12 }}>
          Loading more projects...
        </Text>
      </View>
    );
  };

  return (
    <Container>
      <HeaderComponent
        Title="Project"
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <FlatList
        data={allProjects.filter(
          (item: any) =>
            item?.name != 'Gift 4' &&
            item?.name != 'Square' &&
            item?.name != 'Enclave' &&
            item?.name != 'Shilp 1' &&
            item?.name != 'Universal',
        )}
        renderItem={renderItem}
        keyExtractor={(item, index) => item._id || index.toString()}
        contentContainerStyle={ProjectStyles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={['#007AFF']}
            tintColor="#007AFF"
          />
        }
        onEndReached={loadMoreProjects}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 50,
            }}
          >
            <Text style={{ color: COLORS.GREY_TEXT, fontSize: 16 }}>
              {projectListLoading
                ? 'Loading projects...'
                : projectListError
                ? 'Error loading projects'
                : 'No projects found'}
            </Text>
          </View>
        )}
      />
      {renderCustomShareModal()}
    </Container>
  );
};

export default Project;
