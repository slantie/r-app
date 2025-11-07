import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { selectGetBranchesListData, selectGetBranchesListLoading, selectGetBranchesListCurrentPage, selectGetBranchesListHasMore, selectGetShiftManagementsListData, selectGetShiftManagementsListLoading, selectGetShiftManagementsListCurrentPage, selectGetShiftManagementsListHasMore, selectGetDesignationsListData, selectGetDesignationsListLoading, selectGetDesignationsListCurrentPage, selectGetDesignationsListHasMore, selectGetDepartmentsListData, selectGetDepartmentsListLoading, selectGetProfessionalListData, selectGetProfessionalListHasMore } from '../../store/selectors/profile';
import { ProfileScreenStyles } from './styles';
import { Container, HeaderComponent, TextInputField, CalendarPicker } from '../../components/common';
import { COLORS, IMAGES } from '../../constants';
import { OCCUPATION_OPTIONS } from '../../constants/arrays';
import Dropdowns from '../../components/common/dropDown';
import { useDispatch } from 'react-redux';
import { getBranchesListAction } from '../../store/actions/profile/getBranchesListAction';
import { getShiftManagementsListAction } from '../../store/actions/profile/getShiftManagementsListAction';
import { getDesignationsListAction } from '../../store/actions/profile/getDesignationsListAction';
import { getDepartmentsListAction } from '../../store/actions/profile/getDepartmentsListAction';
import { getProfessionalListAction } from '../../store/actions/profile/getProfessionalListAction';
import { createProfessionalAction } from '../../store/actions/profile/createProfessionalAction';
import { selectEmployeeDetailsData } from '../../store/selectors/employee';
import { selectUserDetailData } from '../../store/selectors/auth';

const ProfessionalDetailsScreen = (props: any) => {
  const dispatch = useDispatch() as any;
  // Helper function to convert yyyy-mm-dd to dd-mm-yyyy
  const formatDateToDisplay = (dateString: string) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  // Helper function to convert dd-mm-yyyy to yyyy-mm-dd
  const formatDateToServer = (dateString: string) => {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('-');
    return `${year}-${month}-${day}`;
  };

  const { userData } = useSelector((state: any) => state.otp);
  const employeeDetailsData = useSelector(selectEmployeeDetailsData);
  const employeeDetails = employeeDetailsData?.data?.result?.employee;

  // Dropdown data selectors
  const branchesListData = useSelector(selectGetBranchesListData);
  const branchesListLoading = useSelector(selectGetBranchesListLoading);
  const branchesListCurrentPage = useSelector(selectGetBranchesListCurrentPage);
  const branchesListHasMore = useSelector(selectGetBranchesListHasMore);
  const shiftManagementsListData = useSelector(selectGetShiftManagementsListData);
  const shiftManagementsListLoading = useSelector(selectGetShiftManagementsListLoading);
  const shiftManagementsListCurrentPage = useSelector(selectGetShiftManagementsListCurrentPage);
  const shiftManagementsListHasMore = useSelector(selectGetShiftManagementsListHasMore);
  const designationsListData = useSelector(selectGetDesignationsListData);
  const designationsListLoading = useSelector(selectGetDesignationsListLoading);
  const designationsListCurrentPage = useSelector(selectGetDesignationsListCurrentPage);
  const designationsListHasMore = useSelector(selectGetDesignationsListHasMore);
  const departmentsListData = useSelector(selectGetDepartmentsListData);
  const departmentsListLoading = useSelector(selectGetDepartmentsListLoading);
  const professionalListData = useSelector(selectGetProfessionalListData);
  const professionalListHasMore = useSelector(selectGetProfessionalListHasMore);

  const userDetailData = useSelector(selectUserDetailData);
  const user = userDetailData?.data?.result;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProfessionalCompanyInfoExpanded, setIsProfessionalCompanyInfoExpanded] = useState(false);
  const [openJoiningDatePicker, setOpenJoiningDatePicker] = useState(false);
  const [reflectedJoiningDate, setReflectedJoiningDate] = useState('');

  const [professionalDetails, setProfessionalDetails] = useState({
    occupation: '',
    companyInfo: '',
    department: '',
    industry: '',
    branch: '',
    subBranch: '',
    shift: '',
    employeeType: '',
    joiningDate: ''
  });

  const [companyDetails, setCompanyDetails] = useState({
    companyName: '',
    companyType: '',
    brandLogo: '',
    brandName: '',
    designation: '',
    companyEmail: '',
    companyAddress: '',
    searchProperty: '',
    selectedProperty: '',
    flatHouseOffice: '',
    pinCode: '',
    companyMobileNo: '',
    companyDescription: '',
    visitingCard: '',
    city: '',
    state: '',
    country: '',
    area: '',
    landmark: '',
    lat: '',
    long: ''
  });

  // Fetch professional list when component mounts
  useEffect(() => {
    dispatch(getProfessionalListAction(1));
  }, [dispatch]);

  // Set last professional data as default in professionalDetails
  useEffect(() => {
    if (professionalListData?.data?.result?.professionals?.length > 0) {
      const professionals = professionalListData.data.result.professionals;
      const lastProfessional = professionals[professionals.length - 1]; // Get last item
      setProfessionalDetails(prevState => ({
        ...prevState,
        occupation: lastProfessional.occupation || '',
        companyInfo: lastProfessional.companyInfo || '',
        industry: lastProfessional.industry || '',
      }));

      // Set company details if available
      if (lastProfessional.companyName || lastProfessional.companyType) {
        setCompanyDetails(prevState => ({
          ...prevState,
          companyName: lastProfessional.companyName || '',
          companyType: lastProfessional.companyType || '',
          brandLogo: lastProfessional.brandLogo || '',
          brandName: lastProfessional.brandName || '',
          designation: lastProfessional.designation || '',
          companyEmail: lastProfessional.companyEmail || '',
          companyAddress: lastProfessional.companyAddress || '',
          companyMobileNo: lastProfessional.companyMobileNo || '',
          companyDescription: lastProfessional.companyDescription || '',
          visitingCard: lastProfessional.visitingCard || '',
        }));
      }

      // Format and set joining date for display if available
      if (lastProfessional.joiningDate) {
        const date = new Date(lastProfessional.joiningDate);
        const formattedDate = date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }).replace(/\//g, '-');
        setReflectedJoiningDate(formattedDate);
      }
    }
  }, [professionalListData]);

  // Prefill professional details from employeeDetails (only if no professional data exists)
  useEffect(() => {
    if (employeeDetails && !professionalListData?.data?.result?.professionals?.length) {
      setProfessionalDetails(prevState => ({
        ...prevState,
        branch: employeeDetails.branchDetails?._id || '',
        shift: employeeDetails.shiftManagement?._id || '',
        employeeType: employeeDetails?.designationDetails?._id || '',
        joiningDate: employeeDetails.dateOfJoin || '',
        department: employeeDetails?.departmentDetails?._id || '',
      }));

      // Format and set joining date for display
      if (employeeDetails.dateOfJoin) {
        const formattedDate = formatDateToDisplay(employeeDetails.dateOfJoin);
        setReflectedJoiningDate(formattedDate);
      }
    }
  }, [employeeDetails, professionalListData]);

  // Preload dropdown data if default values exist in employeeDetails or professionalListData
  useEffect(() => {
    const loadInitialDropdownData = async () => {
      try {
        const lastProfessional = professionalListData?.data?.result?.professionals?.length > 0
          ? professionalListData.data.result.professionals[professionalListData.data.result.professionals.length - 1]
          : null;

        // Load branches if value exists (from professional data or employee details)
        const branchId = lastProfessional?.branch || employeeDetails?.branchDetails?._id;
        if (branchId && !branchesListData?.data?.result?.branches) {
          await dispatch(getBranchesListAction(1));
          await dispatch(getBranchesListAction(2));
        }

        // Load shifts if value exists
        const shiftId = lastProfessional?.shift || employeeDetails?.shiftManagement?._id;
        if (shiftId && !shiftManagementsListData?.data?.result?.shiftManagements) {
          await dispatch(getShiftManagementsListAction(1));
          await dispatch(getShiftManagementsListAction(2));
        }

        // Load designations if value exists
        const designationId = lastProfessional?.employeeType || employeeDetails?.designationDetails?._id;
        if (designationId && !designationsListData?.data?.result?.designations) {
          await dispatch(getDesignationsListAction(1));
          await dispatch(getDesignationsListAction(2));
        }

        // Load departments if value exists
        const departmentId = lastProfessional?.departmentId || lastProfessional?.department || employeeDetails?.departmentDetails?._id;
        if (departmentId && !departmentsListData?.data?.result?.departments) {
          await dispatch(getDepartmentsListAction(1));
          await dispatch(getDepartmentsListAction(2));
        }
      } catch (error) {
        console.error('Error preloading dropdown data:', error);
      }
    };

    if (employeeDetails || professionalListData?.data?.result?.professionals?.length > 0) {
      loadInitialDropdownData();
    }
  }, [employeeDetails, professionalListData, dispatch]);

  // Computed dropdown options from selectors
  const branchOptions = React.useMemo(() => {
    if (branchesListData?.data?.result?.branches) {
      return [
        ...branchesListData.data.result.branches.map((branch: any) => ({
          label: branch.title || branch.name,
          value: branch._id
        }))
      ];
    }
    return [];
  }, [branchesListData]);

  const shiftOptions = React.useMemo(() => {
    if (shiftManagementsListData?.data?.result?.shiftManagements) {
      return [
        ...shiftManagementsListData.data.result.shiftManagements.map((shift: any) => ({
          label: shift.title || shift.name,
          value: shift._id
        }))
      ];
    }
    return [];
  }, [shiftManagementsListData]);

  const employeeTypeOptions = React.useMemo(() => {
    if (designationsListData?.data?.result?.designations) {
      return [
        ...designationsListData.data.result.designations.map((designation: any) => ({
          label: designation.title || designation.name,
          value: designation._id
        }))
      ];
    }
    return [];
  }, [designationsListData]);

  const departmentOptions = React.useMemo(() => {
    if (departmentsListData?.data?.result?.departments) {
      const options = [
        ...departmentsListData.data.result.departments.map((department: any) => ({
          label: department.title || department.name,
          value: department._id
        }))
      ];
      return options;
    }
    return [];
  }, [departmentsListData, professionalDetails.department]);

  // Dropdown click handlers - only trigger API calls if data doesn't exist
  const handleBranchDropdownClick = async () => {
    if (!branchesListData?.data?.result?.branches) {
      try {
        await dispatch(getBranchesListAction(1));
        // Also load page 2 to ensure default value is available if it's on page 2
        if (employeeDetails?.branchDetails?._id) {
          await dispatch(getBranchesListAction(2));
        }
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    } else if (employeeDetails?.branchDetails?._id) {
      // Check if default branch exists in loaded data
      const branchExists = branchesListData.data.result.branches.some(
        (branch: any) => branch._id === employeeDetails.branchDetails._id
      );

      // If branch doesn't exist and we have more pages, load next page
      if (!branchExists && branchesListHasMore && !branchesListLoading) {
        try {
          const nextPage = branchesListCurrentPage + 1;
          await dispatch(getBranchesListAction(nextPage));
        } catch (error) {
          console.error('Error loading more branches:', error);
        }
      }
    }
  };

  const handleShiftDropdownClick = async () => {
    if (!shiftManagementsListData?.data?.result?.shiftManagements) {
      try {
        await dispatch(getShiftManagementsListAction(1));
        // Also load page 2 to ensure default value is available if it's on page 2
        if (employeeDetails?.shiftManagement?._id) {
          await dispatch(getShiftManagementsListAction(2));
        }
      } catch (error) {
        console.error('Error fetching shifts:', error);
      }
    } else if (employeeDetails?.shiftManagement?._id) {
      // Check if default shift exists in loaded data
      const shiftExists = shiftManagementsListData.data.result.shiftManagements.some(
        (shift: any) => shift._id === employeeDetails.shiftManagement._id
      );

      // If shift doesn't exist and we have more pages, load next page
      if (!shiftExists && shiftManagementsListHasMore && !shiftManagementsListLoading) {
        try {
          const nextPage = shiftManagementsListCurrentPage + 1;
          await dispatch(getShiftManagementsListAction(nextPage));
        } catch (error) {
          console.error('Error loading more shifts:', error);
        }
      }
    }
  };

  const handleEmployeeTypeDropdownClick = async () => {
    if (!designationsListData?.data?.result?.designations) {
      try {
        await dispatch(getDesignationsListAction(1));
        // Also load page 2 to ensure default value is available if it's on page 2
        if (employeeDetails?.designationDetails?._id) {
          await dispatch(getDesignationsListAction(2));
        }
      } catch (error) {
        console.error('Error fetching employee types:', error);
      }
    } else if (employeeDetails?.designationDetails?._id) {
      // Check if default designation exists in loaded data
      const designationExists = designationsListData.data.result.designations.some(
        (designation: any) => designation._id === employeeDetails.designationDetails._id
      );

      // If designation doesn't exist and we have more pages, load next page
      if (!designationExists && designationsListHasMore && !designationsListLoading) {
        try {
          const nextPage = designationsListCurrentPage + 1;
          await dispatch(getDesignationsListAction(nextPage));
        } catch (error) {
          console.error('Error loading more designations:', error);
        }
      }
    }
  };

  const handleDepartmentDropdownClick = async () => {
    if (!departmentsListData?.data?.result?.departments) {
      try {
        await dispatch(getDepartmentsListAction(1));
        // Also load page 2 to ensure default value is available if it's on page 2
        if (employeeDetails?.departmentDetails?._id) {
          await dispatch(getDepartmentsListAction(2));
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    }
  };

  // Pagination handlers for loading more items on scroll end
  const handleBranchesEndReached = async () => {
    if (branchesListHasMore && !branchesListLoading) {
      try {
        const nextPage = branchesListCurrentPage + 1;
        await dispatch(getBranchesListAction(nextPage));
      } catch (error) {
        console.error('Error loading more branches:', error);
      }
    }
  };

  const handleShiftsEndReached = async () => {
    if (shiftManagementsListHasMore && !shiftManagementsListLoading) {
      try {
        const nextPage = shiftManagementsListCurrentPage + 1;
        console.log('Loading more shifts, page:', nextPage);
        await dispatch(getShiftManagementsListAction(nextPage));
      } catch (error) {
        console.error('Error loading more shifts:', error);
      }
    }
  };

  const handleDesignationsEndReached = async () => {
    if (designationsListHasMore && !designationsListLoading) {
      try {
        const nextPage = designationsListCurrentPage + 1;
        console.log('Loading more designations, page:', nextPage);
        await dispatch(getDesignationsListAction(nextPage));
      } catch (error) {
        console.error('Error loading more designations:', error);
      }
    }
  };

  // Handle professional field changes
  const handleProfessionalChange = (field: any, value: any) => {
    setProfessionalDetails((prevState: any) => ({
      ...prevState,
      [field]: value
    }));
  };

  // Handle company details field changes
  const handleCompanyChange = (field: any, value: any) => {
    setCompanyDetails((prevState: any) => ({
      ...prevState,
      [field]: value
    }));
  };

  // Handle Submit Function - Professional Details
  const handleProfessionalSubmit = async () => {
    if (isSubmitting) return;

    // Check if this is an update (professionalListData has items)
    const isUpdateMode = professionalListData?.data?.result?.professionals?.length >= 1;

    if (isUpdateMode) {
      // Show alert for update feature under development
      Alert.alert(
        'Feature Under Development',
        'This feature is currently under development.\nUpdate Professional Info will be available soon.',
        [{ text: 'OK' }]
      );
      return;
    }

    // Validate occupation field - mandatory
    if (!professionalDetails.occupation || professionalDetails.occupation.trim() === '') {
      Alert.alert('Please select an Occupation');
      return;
    }

    // Check if occupation is "Own Company" and validate company name
    if (professionalDetails.occupation === 'own_company') {
      if (!companyDetails.companyName || companyDetails.companyName.trim() === '') {
        Alert.alert('Company Name is required when occupation is "Own Company"');
        return;
      }
    }

    setIsSubmitting(true);
    try {
      // Prepare professional data for API call
      const professionalData = {
        occupation: professionalDetails.occupation,
        ...(professionalDetails.companyInfo && { companyInfo: professionalDetails.companyInfo }),
        ...(professionalDetails.industry && { industry: professionalDetails.industry }),
        ...(userData?.isEmployee === true && {
          branch: professionalDetails.branch,
          departmentId: professionalDetails.department,
          shift: professionalDetails.shift,
          employeeType: professionalDetails.employeeType,
          joiningDate: professionalDetails.joiningDate,
        }),
        ...(companyDetails.companyName && { companyName: companyDetails.companyName }),
        ...(companyDetails.companyType && { companyType: companyDetails.companyType }),
        ...(companyDetails.brandLogo && { brandLogo: companyDetails.brandLogo }),
        ...(companyDetails.brandName && { brandName: companyDetails.brandName }),
        ...(companyDetails.designation && { designation: companyDetails.designation }),
        ...(companyDetails.companyEmail && { companyEmail: companyDetails.companyEmail }),
        ...(companyDetails.companyAddress && { companyAddress: companyDetails.companyAddress }),
        ...(companyDetails.companyMobileNo && { companyMobileNo: companyDetails.companyMobileNo }),
        ...(companyDetails.companyDescription && { companyDescription: companyDetails.companyDescription }),
        ...(companyDetails.visitingCard && { visitingCard: companyDetails.visitingCard }),
      };

      // Call the create professional API
      const createProfessionalResponse = await dispatch(createProfessionalAction(professionalData));

      console.log('Create professional response:', createProfessionalResponse);

      if (createProfessionalResponse.status === 200) {
        // Refresh professional list data after successful submission
        await dispatch(getProfessionalListAction(1));

        Alert.alert(
          'Success!',
          'Professional details have been saved successfully.',
          [
            {
              text: 'OK',
              onPress: () => {
                // Reset form or navigate back if needed
              }
            }
          ]
        );
      } else {
        Alert.alert('Error', 'Failed to save professional details. Please try again.');
      }

    } catch (error: any) {
      console.log('Professional submission error:', error);
      Alert.alert('Error', error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Professional Details Component
  const ProfessionalDetails = () => (
    <View style={ProfileScreenStyles.personalDetailsContainer}>
      <View style={ProfileScreenStyles.inputWrapper}>
        <Dropdowns
          data={OCCUPATION_OPTIONS}
          value={professionalDetails.occupation}
          placeholder="Occupation*"
          onChange={(value: string) => handleProfessionalChange('occupation', value)}
        />
      </View>

      {/* Company Info Section Header */}
      <TouchableOpacity
        onPress={() => setIsProfessionalCompanyInfoExpanded(!isProfessionalCompanyInfoExpanded)}
        activeOpacity={0.8}
        style={ProfileScreenStyles.sectionHeaderContainer}
      >
        <Text style={ProfileScreenStyles.sectionHeaderText}>Company Info.</Text>
        <Text style={ProfileScreenStyles.sectionHeaderArrow}>{isProfessionalCompanyInfoExpanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {/* Company Info Fields - Show when expanded */}
      {isProfessionalCompanyInfoExpanded && (
        <View style={ProfileScreenStyles.personalDetailsContainer}>
          <View style={ProfileScreenStyles.inputWrapper}>
            <TouchableOpacity style={ProfileScreenStyles.dobButton} activeOpacity={0.8} onPress={() => { }}>
              <View style={{ paddingHorizontal: 10 }}>
                <Text style={ProfileScreenStyles.dobText}>Brand Logo</Text>
              </View>
              <View>
                <Image source={IMAGES.CAMERA} style={ProfileScreenStyles.calendarIcon} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={ProfileScreenStyles.inputWrapper}>
            <TextInputField
              placeholder={professionalDetails.occupation === 'own_company' ? 'Company Name*' : 'Company Name'}
              value={companyDetails.companyName}
              onChangeText={(text) => handleCompanyChange('companyName', text)}
            />
          </View>
          <View style={ProfileScreenStyles.inputWrapper}>
            <TextInputField
              placeholder="Company Type"
              value={companyDetails.companyType}
              onChangeText={(text) => handleCompanyChange('companyType', text)}
            />
          </View>

          <View style={ProfileScreenStyles.inputWrapper}>
            <TextInputField
              placeholder='Brand Name'
              value={companyDetails.brandName}
              onChangeText={(text) => handleCompanyChange('brandName', text)}
            />
          </View>

          <View style={ProfileScreenStyles.inputWrapper}>
            <TextInputField
              placeholder='Designation'
              value={companyDetails.designation}
              onChangeText={(text) => handleCompanyChange('designation', text)}
            />
          </View>

          <View style={ProfileScreenStyles.inputWrapper}>
            <TextInputField
              placeholder='Company Email'
              value={companyDetails.companyEmail}
              onChangeText={(text) => handleCompanyChange('companyEmail', text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={ProfileScreenStyles.inputWrapper}>
            <TextInputField
              placeholder='Company Address'
              value={companyDetails.companyAddress}
              onChangeText={(text) => handleCompanyChange('companyAddress', text)}
            />
          </View>

          <View style={ProfileScreenStyles.inputWrapper}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ borderBottomWidth: 1, borderBottomColor: COLORS.BORDER_GREY, paddingVertical: 14, paddingRight: 10 }}>
                <Text style={ProfileScreenStyles.dobText}>+91</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <TextInputField
                  placeholder='Company Mobile No'
                  value={companyDetails.companyMobileNo}
                  onChangeText={(text) => handleCompanyChange('companyMobileNo', text)}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>

          <View style={ProfileScreenStyles.inputWrapper}>
            <TextInputField
              placeholder='Company Description'
              value={companyDetails.companyDescription}
              onChangeText={(text) => handleCompanyChange('companyDescription', text)}
            />
          </View>

          <View style={ProfileScreenStyles.inputWrapper}>
            <TouchableOpacity style={ProfileScreenStyles.dobButton} activeOpacity={0.8} onPress={() => { }}>
              <View style={{ paddingHorizontal: 10 }}>
                <Text style={ProfileScreenStyles.dobText}>Visiting Card</Text>
              </View>
              <View>
                <Image source={IMAGES.CAMERA} style={ProfileScreenStyles.calendarIcon} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={ProfileScreenStyles.inputWrapper}>
        <TextInputField
          placeholder='Industry'
          value={professionalDetails.industry}
          onChangeText={(text) => handleProfessionalChange('industry', text)}
        />
      </View>

      {userData?.isEmployee == true || user?.isEmployee == true ? <View pointerEvents='none' style={{ opacity: 0.5 }}>
        {/* Employee Fields - Always show after Company Info */}
        <View style={ProfileScreenStyles.inputWrapper}>
          {departmentsListLoading && !departmentsListData?.data?.result?.departments ? (
            <View style={{ padding: 15, alignItems: 'center' }}>
              <Text style={{ color: COLORS.GREY_TEXT }}>Loading departments...</Text>
            </View>
          ) : (
            <Dropdowns
              data={departmentOptions}
              value={professionalDetails.department}
              placeholder="Department"
              onChange={(value: string) => handleProfessionalChange('department', value)}
              onFocus={handleDepartmentDropdownClick}
            />
          )}
        </View>

        <View style={ProfileScreenStyles.inputWrapper}>
          {branchesListLoading && !branchesListData?.data?.result?.branches ? (
            <View style={{ padding: 15, alignItems: 'center' }}>
              <Text style={{ color: COLORS.GREY_TEXT }}>Loading branches...</Text>
            </View>
          ) : (
            <Dropdowns
              data={branchOptions}
              value={professionalDetails.branch}
              placeholder="Branch"
              onChange={(value: string) => handleProfessionalChange('branch', value)}
              onFocus={handleBranchDropdownClick}
              flatListProps={{
                onEndReached: handleBranchesEndReached,
                onEndReachedThreshold: 0.5,
              } as any}
            />
          )}
        </View>

        <View style={ProfileScreenStyles.inputWrapper}>
          {shiftManagementsListLoading && !shiftManagementsListData?.data?.result?.shiftManagements ? (
            <View style={{ padding: 15, alignItems: 'center' }}>
              <Text style={{ color: COLORS.GREY_TEXT }}>Loading shifts...</Text>
            </View>
          ) : (
            <Dropdowns
              data={shiftOptions}
              value={professionalDetails.shift}
              placeholder="Shift"
              onChange={(value: string) => handleProfessionalChange('shift', value)}
              onFocus={handleShiftDropdownClick}
              flatListProps={{
                onEndReached: handleShiftsEndReached,
                onEndReachedThreshold: 0.5,
              } as any}
            />
          )}
        </View>

        <View style={ProfileScreenStyles.inputWrapper}>
          {designationsListLoading && !designationsListData?.data?.result?.designations ? (
            <View style={{ padding: 15, alignItems: 'center' }}>
              <Text style={{ color: COLORS.GREY_TEXT }}>Loading employee types...</Text>
            </View>
          ) : (
            <Dropdowns
              data={employeeTypeOptions}
              value={professionalDetails.employeeType}
              placeholder="Employee Type"
              onChange={(value: string) => handleProfessionalChange('employeeType', value)}
              onFocus={handleEmployeeTypeDropdownClick}
              flatListProps={{
                onEndReached: handleDesignationsEndReached,
                onEndReachedThreshold: 0.5,
              } as any}
            />
          )}
        </View>
        <View style={ProfileScreenStyles.dobContainer}>
          <TouchableOpacity style={ProfileScreenStyles.dobButton} activeOpacity={0.8} onPress={() => setOpenJoiningDatePicker(true)}>
            <View style={{ paddingHorizontal: 10 }}>
              <Text style={ProfileScreenStyles.dobText}>{reflectedJoiningDate || 'Joining date'}</Text>
            </View>
            <View>
              <Image source={IMAGES.CALENDAR} style={ProfileScreenStyles.calendarIcon} />
            </View>
          </TouchableOpacity>
        </View>
      </View> : undefined}

      <TouchableOpacity
        style={[ProfileScreenStyles.submitButton, isSubmitting && { opacity: 0.6 }]}
        onPress={handleProfessionalSubmit}
        disabled={isSubmitting}
      >
        <Text style={ProfileScreenStyles.submitButtonText}>
          {isSubmitting
            ? (professionalListData?.data?.result?.professionals?.length >= 1 ? 'Updating...' : 'Submitting...')
            : (professionalListData?.data?.result?.professionals?.length >= 1 ? 'Update' : 'Submit')}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={ProfileScreenStyles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={-35}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container style={ProfileScreenStyles.mainContainer}>
          <HeaderComponent Title='Professional Details' onPress={() => props.navigation.goBack()} />
          <ScrollView
            style={ProfileScreenStyles.container}
            nestedScrollEnabled={true}
          >
            <View style={ProfileScreenStyles.personalDetailsSection}>
              {
                ProfessionalDetails()
              }
            </View>
          </ScrollView>

          {/* Joining Date Calendar Modal */}
          <CalendarPicker
            visible={openJoiningDatePicker}
            onClose={() => setOpenJoiningDatePicker(false)}
            onSelect={date => {
              const formattedDate = formatDateToDisplay(date);
              setReflectedJoiningDate(formattedDate);
              setProfessionalDetails(prevState => ({
                ...prevState,
                joiningDate: date // Store in yyyy-mm-dd format for server
              }));
              setOpenJoiningDatePicker(false);
            }}
            initialDate={formatDateToServer(reflectedJoiningDate)}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ProfessionalDetailsScreen;
