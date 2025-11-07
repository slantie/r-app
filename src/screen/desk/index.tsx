import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import { DeskStyles } from './styles';
import { Container, HeaderComponent, SearchInput } from '../../components/common';
import { useDispatch, useSelector } from 'react-redux';

import { COLORS, IMAGES } from '../../constants';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import AddLeadModal from '../../components/individual/addLeadModal';
let user = null;

const Desk = (props: any) => {
  const dispatch = useDispatch() as any;
  const { userData } = useSelector((state: any) => state.otp);
  // State management for pagination
  const [leadList, setLeadList] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const pageSize = 12; // 12 items per page as requested
  const isRequestingRef = useRef(false);
  const currentStateRef = useRef({ module: '', leadType: '', search: '' });
  const didInitialLoadRef = useRef(false);
  const lastLoadMoreTimeRef = useRef(0);

  // UI State
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLeadType, setSelectedLeadType] = useState('todays_follow_up');
  const [selectedLeadTitle, setSelectedLeadTitle] = useState('Today`s Follow Up');
  const [selectedModule, setSelectedModule] = useState('project');
  const [selectedModuleTitle, setSelectedModuleTitle] = useState('Project');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // const userDetailData = useSelector(selectUserDetailData);
  // const user = userDetailData?.data?.result;


  // Filter state management
  const [appliedFilters, setAppliedFilters] = useState<any>(null);

  // Function to clear filters
  const clearFilters = useCallback(() => {
    setAppliedFilters(null);
    // Reset throttle timer when clearing filters
    lastLoadMoreTimeRef.current = 0;
  }, []);

  // console.log("userData",userData);

  // Function to check if user has permission to view Fund option
  const hasFundPermission = () => {
    const userRoles = userData?.userRoles || [];
    const allowedRoles = ['FundManager', 'FundExecutive', 'SuperAdmin'];
    return userRoles.some((role: string) => allowedRoles.includes(role));
  };

  // Function to check if user has permission to view Land option
  const hasLandPermission = () => {
    const userRoles = userData?.userRoles || [];
    const allowedRoles = ['SuperAdmin', 'LandExecutive', 'LandManager'];
    return userRoles.some((role: string) => allowedRoles.includes(role));
  };

  const hasCpPermission = () => {
    const userRoles = userData?.userRoles || [];
    const allowedRoles = ['SuperAdmin', 'CPManager', 'CPExecutive'];
    return userRoles.some((role: string) => allowedRoles.includes(role));
  };

  // Generic permission checker to support roles as array or single string
  // const hasFilterPermission = () => {
  //   const rolesArray: string[] = Array.isArray(userData?.userRoles)
  //     ? userData?.userRoles
  //     : (userData?.userRoles ? [userData?.userRoles] : []);
  //   if (user?.role) {
  //     rolesArray.push(user.role);
  //   }
  //   const allowedRoles = [
  //     'SuperAdmin',
  //     'ProjectSalesManager',
  //     'ProjectSiteSales',
  //     'ProjectPreSales',
  //     'CPManager',
  //     'CPExecutive',
  //     'FundManager',
  //     'FundExecutive',
  //   ];
  //   return rolesArray.some((role: string) => allowedRoles.includes(role));
  // };

  // API call function - simplified to prevent circular dependencies
  const loadModuleData = useCallback(async (
    page: number,
    isLoadMore: boolean = false,
    search: string = "",
    leadType: string = "",
    moduleType: string = ""
  ) => {
    // Prevent multiple API calls when already requesting
    if (isRequestingRef.current && !isLoadMore) {
      console.log('⚠️ API call blocked - already requesting');
      return;
    }

    isRequestingRef.current = true;
    setIsLoading(true);

    // Use the passed parameters or fall back to current state
    const currentLeadType = leadType || selectedLeadType;
    const currentModuleType = moduleType || selectedModule;
    try {
      const payload = {
        page: page,
        pageSize: pageSize,
        type: currentLeadType,
        moduleType: currentModuleType === 'project' ? 'Project' : currentModuleType === 'land' ? 'Land' : currentModuleType === 'cp' ? 'CP User' : 'Fund',
        ...(search ? { search } : {})
      };

      console.log('📤 API Payload:', payload);

      let response: any;
      // switch (currentModuleType) {
      //   case 'project':
      //     response = await dispatch(projectLeadsListAction(payload));
      //     break;
      //   case 'land':
      //     response = await dispatch(landListAction(payload));
      //     break;
      //   case 'fund':
      //     response = await dispatch(fundListAction(payload));
      //     break;
      //   case 'cp':
      //     response = await dispatch(channelSalesFollowUpListAction(payload));
      //     break;
      //   default:
      //     console.log('Unknown module:', currentModuleType);
      //     setIsLoading(false);
      //     isRequestingRef.current = false;
      //     return;
      // }

      // Check for 404 error and stop infinite retries
      if (response?.status === 404 || response?.status === 404) {
        console.log('❌ API returned 404 - stopping retries');
        setHasMoreData(false);
        setHasError(true);
        setErrorMessage('Something went wrong. Please try again later.');
        if (!isLoadMore) {
          setLeadList([]);
        }
        setIsLoading(false);
        isRequestingRef.current = false;
        return;
      }

      // Clear any previous errors on successful response
      setHasError(false);
      setErrorMessage('');

      const newLeads = response?.data?.result?.leads || [];
      const total = response?.data?.result?.total || 0;

      // Check if we have more data
      if (newLeads.length < pageSize) {
        setHasMoreData(false);
      } else {
        setHasMoreData(true);
      }

      // Update lead list based on load more or fresh load
      if (isLoadMore) {
        setLeadList((prevLeads) => {
          const updatedLeads = [...prevLeads, ...newLeads];
          return updatedLeads;
        });
      } else {
        setLeadList(newLeads);
        // console.log('🆕 Fresh load - Total leads:', newLeads.length);
      }

    } catch (error: any) {

      if (error?.response?.status === 404 || error?.status === 404) {
        // console.log('❌ API returned 404 - stopping retries');
        setHasMoreData(false);
        setHasError(true);
        setErrorMessage('Something went wrong. Please try again later.');
        if (!isLoadMore) {
          setLeadList([]);
        }
      }
    } finally {
      setIsLoading(false);
      isRequestingRef.current = false;
    }
  }, [dispatch, pageSize]); // No state dependencies to prevent circular loops

  // Search handler with debounce
  const handleSearch = useCallback((text: string) => {
    setSearchTerm(text);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const newTimeout = setTimeout(() => {
      setCurrentPage(1);
      setHasMoreData(true);
      loadModuleData(1, false, text, selectedLeadType, selectedModule);
    }, 800); // 800ms debounce

    setTypingTimeout(newTimeout);
  }, [typingTimeout, selectedLeadType, selectedModule]); // Removed loadModuleData from dependencies

  // Function to fetch data with applied filters
  const fetchDataWithFilters = useCallback(async (
    filters: any,
    page: number = 1,
    isLoadMore: boolean = false,
    leadType?: string
  ) => {
    // Prevent multiple API calls when already requesting
    if (isRequestingRef.current && !isLoadMore) {
      console.log('⚠️ API call blocked - already requesting');
      return;
    }

    isRequestingRef.current = true;
    setIsLoading(true);

    try {
      const payload = {
        page: page,
        pageSize: pageSize,
        type: leadType || selectedLeadType, // Use passed leadType or current selectedLeadType
        moduleType: selectedModule === 'project' ? 'Project' : selectedModule === 'land' ? 'Land' : selectedModule === 'cp' ? 'CP User' : 'Fund',
        ...(searchTerm ? { search: searchTerm } : {}),
        // Include filter parameters
        ...(filters.projectsArray && filters.projectsArray.length > 0 && { projectsArray: filters.projectsArray }),
        ...(filters.ownerArray && filters.ownerArray.length > 0 && { ownerArray: filters.ownerArray }),
        ...(filters.sourceArray && filters.sourceArray.length > 0 && { sourceArray: filters.sourceArray }),
        ...(filters.subSourceArray && filters.subSourceArray.length > 0 && { subSourceArray: filters.subSourceArray }),
        ...(filters.stageIdArray && filters.stageIdArray.length > 0 && { stageIdArray: filters.stageIdArray }),
        ...(filters.stageArray && filters.stageArray.length > 0 && { stageArray: filters.stageArray }),
        ...(filters.cpExecutiveArray && filters.cpExecutiveArray.length > 0 && { cpExecutiveArray: filters.cpExecutiveArray }),
        ...(filters.referralType && { referralType: filters.referralType }),
        ...(filters.ownerType && { ownerType: filters.ownerType }),
        // Here pass the time as 18:30:00.000 for start date and 18:29:59.999 for end date as per web API payload
        // ...(filters.startDate && { newStartDate: `${filters.startDate}T18:30:00.000` }),
        // ...(filters.endDate && { newEndDate: `${filters.endDate}T18:29:59.999` })

        ...(filters.startDate && { startDate: filters.startDate }),
        ...(filters.endDate && { endDate: filters.endDate }),
        // Removed filters.type to prevent overriding the lead type
      };

      console.log('📤 API Payload with filters (all as query string):', payload);

      let response: any;
      switch (selectedModule) {
        case 'project':
        //   response = await dispatch(projectLeadsListAction(payload));
        //   break;
        // case 'land':
        //   response = await dispatch(landListAction(payload));
        //   break;
        // case 'fund':
        //   response = await dispatch(fundListAction(payload));
        //   break;
        // case 'cp':
        //   response = await dispatch(channelSalesFollowUpListAction(payload));
        //   break;
        // default:
        //   console.log('Unknown module:', selectedModule);
        //   setIsLoading(false);
        //   isRequestingRef.current = false;
        //   return;
      }

      // Handle response similar to loadModuleData
      if (response?.status === 404 || response?.status === 404) {
        console.log('❌ API returned 404 - stopping retries');
        setHasMoreData(false);
        setHasError(true);
        setErrorMessage('Something went wrong. Please try again later.');
        if (!isLoadMore) {
          setLeadList([]);
        }
        setIsLoading(false);
        isRequestingRef.current = false;
        return;
      }

      if (response?.status === 200 && response?.data?.result) {
        const newData = response.data.result.leads || response.data.result.lands || response.data.result.funds || [];

        console.log('📊 Filter API Response:', {
          page,
          newDataLength: newData.length,
          pageSize,
          isLoadMore,
          willHaveMore: newData.length === pageSize
        });

        if (isLoadMore) {
          setLeadList(prev => [...prev, ...newData]);
        } else {
          setLeadList(newData);
        }

        setHasMoreData(newData.length === pageSize);
        setHasError(false);
        setErrorMessage('');
      } else {
        console.log('❌ API Error:', response);
        setHasError(true);
        setErrorMessage('Failed to load data. Please try again.');
        if (!isLoadMore) {
          setLeadList([]);
        }
      }
    } catch (error) {
      console.error('❌ Error fetching data with filters:', error);
      setHasError(true);
      setErrorMessage('Network error. Please check your connection.');
      if (!isLoadMore) {
        setLeadList([]);
      }
    } finally {
      setIsLoading(false);
      isRequestingRef.current = false;
    }
  }, [selectedLeadType, selectedModule, searchTerm, pageSize, dispatch]);

  // Load more function
  const loadMoreData = useCallback(() => {
    const now = Date.now();
    const timeSinceLastCall = now - lastLoadMoreTimeRef.current;

    console.log('🔄 loadMoreData called:', {
      isLoading,
      hasMoreData,
      currentPage,
      isRequesting: isRequestingRef.current,
      timeSinceLastCall
    });

    // Throttle: prevent calls within 1 second of each other
    if (timeSinceLastCall < 1000) {
      console.log('🚫 loadMoreData throttled - too soon');
      return;
    }

    // Multiple safeguards to prevent infinite loops
    if (isLoading || !hasMoreData || isRequestingRef.current) {
      console.log('loadMoreData blocked:', { isLoading, hasMoreData, isRequesting: isRequestingRef.current });
      return;
    }

    lastLoadMoreTimeRef.current = now;
    const nextPage = currentPage + 1;
    console.log('📄 Loading page:', nextPage);
    setCurrentPage(nextPage);

    // Use filters if they are applied, otherwise use regular loadModuleData
    if (appliedFilters) {
      fetchDataWithFilters(appliedFilters, nextPage, true);
    } else {
      loadModuleData(nextPage, true, searchTerm, selectedLeadType, selectedModule);
    }
  }, [isLoading, hasMoreData, currentPage, appliedFilters, fetchDataWithFilters, loadModuleData, searchTerm, selectedLeadType, selectedModule]);

  // Refresh function
  const handleRefresh = useCallback(async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    setCurrentPage(1);
    setHasMoreData(true);

    // Use filters if they are applied, otherwise use regular loadModuleData
    if (appliedFilters) {
      await fetchDataWithFilters(appliedFilters, 1, false);
    } else {
      await loadModuleData(1, false, searchTerm, selectedLeadType, selectedModule);
    }

    setIsRefreshing(false);
  }, [isRefreshing, appliedFilters, fetchDataWithFilters, loadModuleData, searchTerm, selectedLeadType, selectedModule]);

  // Initial data load - prevent infinite loops
  useEffect(() => {
    const currentState = {
      module: selectedModule,
      leadType: selectedLeadType,
      search: searchTerm
    };

    // Only load if state actually changed
    if (
      currentStateRef.current.module === currentState.module &&
      currentStateRef.current.leadType === currentState.leadType &&
      currentStateRef.current.search === currentState.search
    ) {
      return;
    }

    currentStateRef.current = currentState;

    setCurrentPage(1);
    setHasMoreData(true);
    loadModuleData(1, false, searchTerm, selectedLeadType, selectedModule);
  }, [selectedModule, selectedLeadType, searchTerm]); // Removed loadModuleData from dependencies

  // Handle lead type selection
  const handleLeadTypeSelect = useCallback((item: any) => {
    console.log('item', item);

    setSelectedLeadType(item.data);
    setSelectedLeadTitle(item.title);
    setCurrentPage(1);
    setHasMoreData(true);
    // Keep filters when lead type changes - use filters if they exist
    if (appliedFilters) {
      fetchDataWithFilters(appliedFilters, 1, false, item.data);
    } else {
      loadModuleData(1, false, searchTerm, item.data, selectedModule);
    }
  }, [searchTerm, selectedModule, appliedFilters, fetchDataWithFilters]); // Removed loadModuleData from dependencies

  // Handle module selection
  const handleModuleSelect = useCallback((item: any) => {
    console.log('item', item);

    // handle module select time clear filters
    clearFilters();
    // dispatch(clearProjectFilter());
    // dispatch(clearCpFilter());
    // dispatch(clearFundFilter());

    setSelectedModule(item.data);
    setSelectedModuleTitle(item.title);
    setCurrentPage(1);
    setHasMoreData(true);
    setSearchTerm('');
    // Clear filters when module changes to prevent conflicts
    clearFilters();
    // Ensure selected lead type is allowed for the new module; otherwise default to Active Lead
    const allowedTypesAfterChange = getVisibleLeadTypesFor(item.data);
    const stillAllowed = allowedTypesAfterChange.some(t => t.data === selectedLeadType);
    const nextLeadType = stillAllowed ? selectedLeadType : 'active_lead';
    if (!stillAllowed) {
      setSelectedLeadType('active_lead');
      setSelectedLeadTitle('Active Lead');
    }
    loadModuleData(1, false, '', nextLeadType, item.data);
  }, [selectedLeadType, clearFilters]); // Removed loadModuleData from dependencies

  // Lead types data
  const leadTypes = [
    { count: 0, title: 'New Lead', data: 'new_lead' },
    { count: 16, title: 'Re-Inquiry', data: 're_enquiry_lead' },
    { count: 65, title: 'Untouched Lead', data: 'untouched_lead' },
    { count: 1, title: "Today's Follow Up", data: 'todays_follow_up' },
    { count: 15, title: 'Missed Follow Up', data: 'missed_follow_up' },
    { count: 15, title: 'Lost Lead', data: 'lost_lead' },
    { count: 70, title: 'Active Lead', data: 'active_lead' },
    { count: 13, title: 'Booked', data: 'booked_lead' },
    { count: 98, title: 'Total Lead', data: 'total_lead' },
  ];

  // Module wise roles allowed to view ALL lead type filters
  const moduleAllowedRolesMap: Record<string, string[]> = {
    project: ['SuperAdmin', 'ProjectSalesManager', 'ProjectSiteSales', 'ProjectPreSales'],
    fund: ['SuperAdmin', 'FundManager', 'FundExecutive'],
    cp: ['SuperAdmin', 'CPManager', 'CPExecutive'],
    land: ['SuperAdmin', 'LandExecutive', 'LandManager']
  };

  const getVisibleLeadTypesFor = useCallback((moduleKey: string) => {
    const rolesArray: string[] = Array.isArray(userData?.userRoles)
      ? userData?.userRoles
      : (userData?.userRoles ? [userData?.userRoles] : []);
    if (user?.role) {
      rolesArray.push(user.role);
    }

    const allowedForModule = moduleAllowedRolesMap[moduleKey] || [];
    const canSeeAll = rolesArray.some((r: string) => allowedForModule.includes(r));

    if (canSeeAll) return leadTypes;

    const restrictedKeys = ['lost_lead', 'active_lead', 'booked_lead', 'total_lead'];
    return leadTypes.filter(l => restrictedKeys.includes(l.data));
  }, [userData?.userRoles, user?.role]);

  const getVisibleLeadTypes = useCallback(() => {
    return getVisibleLeadTypesFor(selectedModule);
  }, [selectedModule, getVisibleLeadTypesFor]);

  // Navigation handlers
  const handleLandPress = () => {
    console.log('Land option selected');
    props.navigation.navigate('LandForm');
  };

  const handleProjectPress = () => {
    console.log("user?.isEmployee",user?.isEmployee);

    if (user?.isEmployee) {
      const userRoles = userData?.userRoles || [];
      console.log("userRoles", userRoles);
      console.log("allowedRoles", userData?.isEmployee);
      const allowedRoles = ['ProjectSiteSales', 'CPManager', 'CPExecutive', 'ProjectSalesManager', 'ProjectPreSales'];
      const hasAllowedRole = userRoles.some((role: string) => allowedRoles.includes(role));
      if (hasAllowedRole) {
        props.navigation.navigate('ProjectLead', { type: 'add' });
      } else {
        props.navigation.navigate('AddProjectLead', { data: null ,type:"projectAdd" });
      }
    } else {
      props.navigation.navigate('AddProjectLead', { data: null ,type:"projectAdd" });
    }
  };



  const handleAttendancePress = () => {
    console.log('Attendance option selected');
  };

  const handleCpPress = () => {
    console.log('CP option selected');
    props.navigation.navigate('CPForm', { type: 'add' });
  };

  const handleFundPress = () => {
    console.log('Fund option selected');
    props.navigation.navigate('FundForm', { type: 'add' });
  };

  const openFilter = () => {
    let filterScreen;

    if (selectedModuleTitle === 'CP') {
      filterScreen = 'CpFilter';
    } else if (selectedModuleTitle === 'Fund') {
      filterScreen = 'FundFilter';
    } else if (selectedModuleTitle === 'Land') {
      // LandFilter doesn't exist yet, fall back to ProjectFilter
      console.log('LandFilter not implemented yet, using ProjectFilter');
      filterScreen = 'ProjectFilter';
    } else {
      filterScreen = 'ProjectFilter';
    }

    props.navigation.navigate(filterScreen, {
      onApply: (selectedFilters: any) => {
        console.log('Applied filters:', selectedFilters);

        // If no filters, clear appliedFilters to avoid red icon state
        const isEmpty = !selectedFilters || Object.keys(selectedFilters).length === 0;
        setAppliedFilters(isEmpty ? null : selectedFilters);

        // Reset pagination when filters are applied
        setCurrentPage(1);
        setLeadList([]);
        setHasMoreData(true);

        // Reset throttle timer
        lastLoadMoreTimeRef.current = 0;

        // Trigger data fetch
        if (isEmpty) {
          // No filters -> load unfiltered data
          loadModuleData(1, false, searchTerm, selectedLeadType, selectedModule);
        } else {
          // Filters present -> fetch with filters
          fetchDataWithFilters(selectedFilters, 1, false);
        }
      },
      onReset: () => {
        console.log('Filters have been reset');
        // Only clear appliedFilters. Do NOT call API here; fetch only on Apply.
        setAppliedFilters(null);
      },
    });
  };



  // Footer component for loading more
  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View style={{ paddingVertical: 20, alignItems: 'center' }}>
        <ActivityIndicator size="small" color={COLORS.BLACK} />
        <Text style={{ marginTop: 8, color: COLORS.GREY_TEXT, fontSize: 12 }}>
          Loading more data...
        </Text>
      </View>
    );
  };

  // Empty component
  const renderEmpty = () => {
    if (isLoading) return null;

    if (hasError) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
          <Text style={{ color: COLORS.GREY_TEXT, fontSize: 16, textAlign: 'center', paddingHorizontal: 20 }}>
            {errorMessage}
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 16,
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: COLORS.BLACK,
              borderRadius: 8
            }}
            onPress={() => {
              setHasError(false);
              setErrorMessage('');
              setCurrentPage(1);
              setHasMoreData(true);
              loadModuleData(1, false, searchTerm, selectedLeadType, selectedModule);
            }}
          >
            <Text style={{ color: COLORS.WHITE, fontSize: 14 }}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }
console.log("userData?.userRoles",userData?.userRoles);

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 70 }}>
        <Image source={IMAGES.NO_DATA} style={{ width: 100, height: 100 }} />
        <Text style={{ color: COLORS.GREY_TEXT, fontSize: 16 }}>
          No leads found
        </Text>
      </View>
    );
  };



  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  return (
    <Container>
      <View style={DeskStyles.container}>
        {/* Header */}
        <View style={DeskStyles.headerContainer}>
          <HeaderComponent Title={`${selectedModuleTitle} Desk`} onPress={() => props.navigation.goBack()} />
          <View style={DeskStyles.headerRightContainer}>
            <View>
              <Menu>
                <MenuTrigger>
                  <View style={{ paddingHorizontal: 10 }}>
                    <Image source={IMAGES.DROPDOWN} style={{ width: 24, height: 24 }} />
                  </View>
                </MenuTrigger>
                <MenuOptions
                  optionsContainerStyle={[DeskStyles.menuOptions, {
                    marginTop: 30,
                    alignSelf: 'flex-end',
                    right: 0,
                  }]}
                  customStyles={{
                    optionsContainer: [{ alignSelf: 'flex-end' }],
                    OptionTouchableComponent: TouchableOpacity,
                    optionTouchable: { activeOpacity: 0.9, },
                  }}>
                  <FlatList
                    data={[
                      ...(hasLandPermission() ? [{
                        title: 'Land',
                        data: 'land'
                      }] : []),
                      {
                        title: 'Project',
                        data: 'project'
                      },
                      ...(hasFundPermission() ? [{
                        title: 'Fund',
                        data: 'fund'
                      }] : []),
                      ...(hasCpPermission() ? [{
                        title: 'CP',
                        data: 'cp'
                      }] : [])
                    ]}
                    renderItem={({ item }) => {
                      return (
                        <MenuOption
                          onSelect={() => handleModuleSelect(item)} >
                          <View style={DeskStyles.btn}>
                            <Text style={[DeskStyles.userDeleteTxt, { color: COLORS.BLACK }]}>{item.title}</Text>
                          </View>
                        </MenuOption>
                      )
                    }}
                  />
                </MenuOptions>
              </Menu>
            </View>
            <View>
              <TouchableOpacity onPress={() => setIsModalVisible(true)} style={{ backgroundColor: COLORS.BLACK, padding: 8, borderRadius: 8 }}>
                <Image source={IMAGES.PLUS} style={{ width: 16, height: 16 }} tintColor={COLORS.WHITE} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Search */}
        <View style={DeskStyles.searchContainer}>
          <SearchInput
            placeholder='Search Name, number'
            value={searchTerm}
            onChangeText={handleSearch}
          />
        </View>

        {/* Lead Type Filter */}



        <AddLeadModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onLandPress={handleLandPress}
          onProjectPress={handleProjectPress}
          onAttendancePress={handleAttendancePress}
          onCpPress={handleCpPress}
          onFundPress={handleFundPress}
          showFundOption={hasFundPermission()}
          showLandOption={hasLandPermission()}
          showCpOption={hasCpPermission()}
        />
      </View>
    </Container>
  );
};

export default Desk;
