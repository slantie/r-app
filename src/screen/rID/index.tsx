import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert, PermissionsAndroid, Linking, Pressable, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import { selectEditProfileLoading, selectEditProfileError, selectCreatePropertyLoading, selectCreatePropertyError, selectPropertyListLoading, selectPropertyListData, selectPropertyListError, selectGetBranchesListData, selectGetBranchesListLoading, selectGetBranchesListCurrentPage, selectGetBranchesListHasMore, selectGetShiftManagementsListData, selectGetShiftManagementsListLoading, selectGetShiftManagementsListCurrentPage, selectGetShiftManagementsListHasMore, selectGetDesignationsListData, selectGetDesignationsListLoading, selectGetDesignationsListCurrentPage, selectGetDesignationsListHasMore, selectGetDepartmentsListData, selectGetDepartmentsListLoading, selectGetProfessionalListData, selectGetProfessionalListLoading, selectGetProfessionalListCurrentPage, selectGetProfessionalListHasMore } from '../../store/selectors/profile';
import { ProfileScreenStyles } from './styles';
import { Container, HeaderComponent, TextInputField, CustomButton, ImagePickerModal, CalendarPicker } from '../../components/common';
import { COLORS, IMAGES} from '../../constants';
import { BLOOD_GROUPS, OCCUPATION_OPTIONS, COMPANY_INFO_OPTIONS, AREA_OPTIONS } from '../../constants/arrays';
import Dropdowns from '../../components/common/dropDown';
import { validateRequiredFields, getImageNameFromUri, extractFlatNumber, extractPropertyName, formatDateToDisplay, formatDateToServer } from '../../utils/helper';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch } from 'react-redux';
import { commonImageAction } from '../../store/actions/commonImage/imageAction';
import { editProfileAction } from '../../store/actions/profile/editProfileAction';
import { createPropertyAction } from '../../store/actions/profile/createPropertyAction';
import { getPropertyListAction } from '../../store/actions/profile/getPropertyListAction';
import { getBranchesListAction } from '../../store/actions/profile/getBranchesListAction';
import { getShiftManagementsListAction } from '../../store/actions/profile/getShiftManagementsListAction';
import { getDesignationsListAction } from '../../store/actions/profile/getDesignationsListAction';
import { getDepartmentsListAction } from '../../store/actions/profile/getDepartmentsListAction';
import { getProfessionalListAction } from '../../store/actions/profile/getProfessionalListAction';
import { createProfessionalAction } from '../../store/actions/profile/createProfessionalAction';
import { CountryPicker } from 'react-native-country-codes-picker';
import { GOOGLE_PLACES_API } from '../../services/httpService';
import { selectEmployeeDetailsData } from '../../store/selectors/employee';

const ProfileScreen = (props: any) => {
  const { userData } = useSelector((state: any) => state.otp);
  const editProfileLoading = useSelector(selectEditProfileLoading);
  const editProfileError = useSelector(selectEditProfileError);
  const createPropertyLoading = useSelector(selectCreatePropertyLoading);
  const createPropertyError = useSelector(selectCreatePropertyError);
  const propertyListLoading = useSelector(selectPropertyListLoading);
  const propertyListData = useSelector(selectPropertyListData);
  const propertyListError = useSelector(selectPropertyListError);
  const employeeDetailsData = useSelector(selectEmployeeDetailsData);
  const employeeDetails = employeeDetailsData?.data?.result?.employee;
  // console.log("employeeDetails==========", employeeDetails);

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
  // const professionalListLoading = useSelector(selectGetProfessionalListLoading);
  // const professionalListCurrentPage = useSelector(selectGetProfessionalListCurrentPage);
  const professionalListHasMore = useSelector(selectGetProfessionalListHasMore);
  const dispatch = useDispatch() as any;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPersonalDetailsExpanded, setIsPersonalDetailsExpanded] = useState(false);
  const [profileImageUri, setProfileImageUri] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [imageFormData, setImageFormData] = useState<any>(null);
  const [isImagePickerVisible, setIsImagePickerVisible] = useState(false);
  const [opencountryPicker, setOpenCountryPicker] = useState(false);
  const [isAddressDetailsExpanded, setIsAddressDetailsExpanded] = useState(false);
  const [isProfessionalCompanyInfoExpanded, setIsProfessionalCompanyInfoExpanded] = useState(false);
  const [isPropertyDetailsExpanded, setIsPropertyDetailsExpanded] = useState(false);
  const [openPicker, setOpenPicker] = useState(false);
  const [reflectedDate, setReflectedDate] = useState('');
  const [openJoiningDatePicker, setOpenJoiningDatePicker] = useState(false);
  const [reflectedJoiningDate, setReflectedJoiningDate] = useState('');


  const [personalDetails, setPersonalDetails] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    dob: '',
    gender: '',
    nationality: '',
    bloodGroup: ''
  });

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

  const [propertyDetails, setPropertyDetails] = useState({
    searchProperty: '',
    selectedProperty: '',
    flatHouseOffice: '',
    landmark: '',
    pinCode: '',
    area: '',
    city: '',
    state: '',
    country: '',
    lat: '',
    long: ''
  });

  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);



  // Fetch property list when component mounts
  useEffect(() => {
    dispatch(getPropertyListAction({ page: 1 }));
  }, [dispatch]);

  // Fetch professional list when component mounts
  useEffect(() => {
    dispatch(getProfessionalListAction(1));
  }, [dispatch]);

  // Log professional list data when it changes
  useEffect(() => {
    if (professionalListData) {
      // console.log('Professional List Data:==============', professionalListData);
      // console.log('Professionals:', professionalListData?.data?.result?.professionals);
    }
  }, [professionalListData]);

  // Set last professional data as default in professionalDetails
  useEffect(() => {
    if (professionalListData?.data?.result?.professionals?.length > 0) {
      const professionals = professionalListData.data.result.professionals;
      const lastProfessional = professionals[professionals.length - 1]; // Get last item

      console.log('Setting last professional as default:', lastProfessional);
      console.log('Department ID from API:', lastProfessional.departmentId);
      console.log('Shift from API:', lastProfessional.shift);
      console.log('EmployeeType from API:', lastProfessional.employeeType);
      console.log('Branch from API:', lastProfessional.branch);

      setProfessionalDetails(prevState => ({
        ...prevState,
        occupation: lastProfessional.occupation || '',
        companyInfo: lastProfessional.companyInfo || '',
        // department: lastProfessional.departmentId || lastProfessional.department || '',
        industry: lastProfessional.industry || '',
        // branch: lastProfessional.branch || '',
        // subBranch: lastProfessional.subBranch || '',
        // shift: lastProfessional.shift || '',
        // employeeType: lastProfessional.employeeType || '',
        // joiningDate: lastProfessional.joiningDate || '',
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

  // Prefill property details if property list data exists
  useEffect(() => {
    if (propertyListData && propertyListData.data && propertyListData.data.result?.properties?.length > 0) {
      const firstProperty = propertyListData.data.result?.properties[0]; // Get the first property
      setPropertyDetails(prevState => ({
        ...prevState,
        searchProperty: firstProperty.selectedProperty || '',
        selectedProperty: firstProperty.selectedProperty || '',
        flatHouseOffice: firstProperty.flatNo || '',
        landmark: firstProperty.landmark || '',
        pinCode: firstProperty.pincode || '',
        area: firstProperty.area || '',
        city: firstProperty.city || '',
        state: firstProperty.state || '',
        country: firstProperty.country || '',
        lat: firstProperty.lat || '',
        long: firstProperty.long || ''
      }));
    }
  }, [propertyListData]);

  // Handle property list error
  useEffect(() => {
    if (propertyListError) {
      // console.error('Property list error:', propertyListError);
    }
  }, [propertyListError]);

  useEffect(() => {
    if (userData) {
      console.log("userData==========", userData);

      setPersonalDetails(prevState => ({
        ...prevState,
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        phone: userData.countryCode + " " + userData.phoneNumber,
        email: userData.email || '',
        dob: userData.dob || '',
        gender: userData.gender || '',
        nationality: userData.nationality || '',
        bloodGroup: userData.bloodGroup || ''
      }));
      setProfileImageUri(userData.profileImage != "" ? userData.profilePath + userData.profileImage : '');

      // Format and set DOB for display if available
      if (userData.dob) {
        const formattedDate = formatDateToDisplay(userData.dob);
        setReflectedDate(formattedDate);
      }
    }
  }, [userData]);

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

  // API functions
  const imageUploadApi = (req: any) => dispatch(commonImageAction(req));

  // Computed dropdown options from selectors
  const branchOptions = React.useMemo(() => {
    if (branchesListData?.data?.result?.branches) {
      return [
        // { label: 'Select Branch', value: '' },
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
        // { label: 'Select Shift', value: '' },
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
        // { label: 'Select Employee Type', value: '' },
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
        // { label: 'Select Department', value: '' },
        ...departmentsListData.data.result.departments.map((department: any) => ({
          label: department.title || department.name,
          value: department._id
        }))
      ];
      // console.log('Department options:', options);
      // console.log('Current department value in state:', professionalDetails.department);
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
          // console.log('Loading page', nextPage, 'to find default branch');
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
          // console.log('Loading page', nextPage, 'to find default shift');
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
          // console.log('Loading page', nextPage, 'to find default designation');
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
        // console.log('Loading more branches, page:', nextPage);
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
  // Handle field changes
  const handleChange = (field: any, value: any) => {
    setPersonalDetails((prevState: any) => ({
      ...prevState,
      [field]: value
    }));
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

  const handlePropertyChange = (field: any, value: any) => {
    setPropertyDetails((prevState: any) => ({
      ...prevState,
      [field]: value
    }));
  };

  const handlePropertySearch = async (text: string) => {
    handlePropertyChange('selectedProperty', text);

    if (text.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(text)}&key=${GOOGLE_PLACES_API}&types=establishment|geocode&language=en`
      );
      const data = await response.json();

      if (data.status === 'OK') {
        setSearchResults(data.predictions);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.log('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handlePlaceSelect = async (place: any) => {
    if (isSelecting) return; // Prevent double-tap

    console.log("PLACE SELECTED:", place);
    setIsSelecting(true);

    // Immediately update the UI
    handlePropertyChange('selectedProperty', place.description);
    setSearchResults([]);

    try {
      // Get place details
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&key=${GOOGLE_PLACES_API}&fields=address_components,geometry`
      );
      const data = await response.json();

      if (data.status === 'OK') {
        const details = data.result;
        let city, state, country, pincode, area, landmark;

        details.address_components?.forEach((component: any) => {
          const types = component.types;
          if (types.includes('locality'))
            city = component.long_name;
          else if (types.includes('administrative_area_level_1'))
            state = component.long_name;
          else if (types.includes('country'))
            country = component.long_name;
          else if (types.includes('postal_code'))
            pincode = component.long_name;
          else if (
            types.includes('sublocality') ||
            types.includes('sublocality_level_1')
          )
            area = component.long_name;
          else if (types.includes('route'))
            landmark = component.long_name;
        });

        // Update all address fields
        handlePropertyChange('city', city);
        handlePropertyChange('state', state);
        handlePropertyChange('country', country);
        handlePropertyChange('pinCode', pincode);
        handlePropertyChange('area', area);
        handlePropertyChange('landmark', landmark);
        handlePropertyChange(
          'lat',
          details.geometry?.location?.lat?.toString(),
        );
        handlePropertyChange(
          'long',
          details.geometry?.location?.lng?.toString(),
        );
      }
    } catch (error) {
      console.log('Place details error:', error);
    } finally {
      setTimeout(() => setIsSelecting(false), 500);
    }
  };

  // Handle Image Upload and Profile Update
  const handleImageUploadAndProfileUpdate = async (imageData: any) => {
    try {
      console.log('Starting automatic image upload and profile update...');

      // Upload image first
      const uploadFormData = new FormData();
      uploadFormData.append('upload_file', imageData);
      uploadFormData.append('root', 'users');
      uploadFormData.append('type', 'profile');

      console.log('Uploading image...');
      const imageUploadResponse = await imageUploadApi(uploadFormData);
      console.log('Image upload response:', imageUploadResponse);

      if (imageUploadResponse.status === 200) {
        const profileImageFileName = imageUploadResponse?.data?.result?.fileName;
        console.log('Image upload successful:', profileImageFileName);

        // Prepare profile data with the new image
        const profileData = {
          firstName: personalDetails.firstName.trim(),
          lastName: personalDetails.lastName.trim(),
          email: personalDetails.email.trim(),
          profileImage: profileImageFileName,
          gender: personalDetails.gender,
          nationality: personalDetails.nationality.trim(),
          bloodGroup: personalDetails.bloodGroup,
          dob: personalDetails.dob,
        };

        // Get user ID from userData
        const userId = userData?._id;

        // Call editProfileAction with the updated profile data
        console.log('Calling editProfileAction with new image...');
        const editProfileResponse = await dispatch(editProfileAction(userId, profileData, userData));

        if (editProfileResponse.status === 200) {
          console.log('Profile updated successfully with new image');
          Alert.alert('Success', 'Profile image updated successfully!');
        } else {
          console.log('Profile update failed');
          Alert.alert('Error', 'Failed to update profile with new image');
        }
      } else {
        console.log('Image upload failed');
        Alert.alert('Error', 'Failed to upload image. Please try again.');
      }
    } catch (error) {
      console.error('Error in handleImageUploadAndProfileUpdate:', error);
      Alert.alert('Error', 'Something went wrong while updating your profile image');
    }
  };

  // Safe camera permission handling - replaces the problematic takePermissions function
  const takePermissions = async (): Promise<boolean> => {
    try {
      console.log('🔒 Starting camera permission check...');

      if (Platform.OS === 'android') {
        // Check if permission is already granted
        const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
        console.log('🔒 Current permission status:', hasPermission);

        if (hasPermission) {
          console.log('✅ Camera permission already granted');
          return true;
        }

        // Request permission if not granted
        console.log('🔒 Permission not granted, requesting permission...');
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera to take photos for your profile.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }
        );

        console.log('🔒 Permission request result:', granted);

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('✅ Camera permission granted after request');
          return true;
        } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          console.log('❌ Camera permission blocked by user');
          Alert.alert(
            'Permission Required',
            'This app requires access to your Camera to capture photos for your profile.\n\nPlease grant camera permission in Settings to continue.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Open Settings',
                onPress: () => {
                  try {
                    Linking.openSettings();
                  } catch (error) {
                    console.warn('Failed to open settings:', error);
                    Alert.alert('Error', 'Unable to open settings. Please manually enable camera permission.');
                  }
                },
              },
            ]
          );
          return false;
        } else {
          console.log('❌ Camera permission denied by user');
          Alert.alert(
            'Permission Denied',
            'Camera permission is required to take photos. Please grant permission to continue.',
            [{ text: 'OK' }]
          );
          return false;
        }
      } else {
        // For iOS, we need to handle permissions differently
        console.log('🍎 iOS - checking camera permission...');
        try {
          // On iOS, we'll let the system handle the permission request
          // The permission will be requested when we try to open the camera
          console.log('✅ iOS - camera permission will be handled by system');
          return true;
        } catch (error) {
          console.error('❌ iOS permission check failed:', error);
          return false;
        }
      }
    } catch (error) {
      console.error('❌ Error in takePermissions:', error);
      Alert.alert(
        'Error',
        'Something went wrong while checking camera permissions. Please try again.',
        [{ text: 'OK' }]
      );
      return false;
    }
  };

  // Safe UploadImage function that can be called after permissions are granted
  const UploadImage = async () => {
    try {
      console.log('📷 Opening camera for image capture...');

      // iOS-specific camera configuration to prevent crashes
      const cameraOptions = {
        width: 300,
        height: 400,
        cropping: true,
        compressImageQuality: 0.7,
      }
      // Remove problematic iOS settings


      ImagePicker.openCamera(cameraOptions).then(async image => {
        console.log('📷 Camera image captured successfully!');
        setIsImagePickerVisible(false);
        setSelectedImage(image);
        setProfileImageUri(image.path);

        // Prepare form data for image upload
        let imageData: any = {
          uri: image.path,
          type: image.mime,
          name: getImageNameFromUri(image.path),
        };
        setImageFormData(imageData);
        console.log('📷 Camera image data:', imageData);

        // Automatically upload image and call editProfileAction
        await handleImageUploadAndProfileUpdate(imageData);
      }).catch(error => {
        setIsImagePickerVisible(false);
        console.log('❌ Camera error occurred:', {
          code: error.code,
          message: error.message,
          fullError: error
        });

        // Don't show alert if user just cancelled
        if (error.code === 'E_PICKER_CANCELLED') {
          console.log('ℹ️ User cancelled camera');
          return;
        }

        // Provide user-friendly error messages
        if (error.code === 'camera_unavailable') {
          console.log('❌ Camera unavailable on device');
          Alert.alert('Camera Unavailable', 'Camera is not available on this device.');
        } else if (error.code === 'E_NO_CAMERA_PERMISSION' || error.code === 'permission') {
          console.log('❌ Camera permission denied');
          Alert.alert('Permission Denied', 'Camera permission was denied. Please enable it in settings.');
        } else if (error.code === 'E_PICKER_NO_CAMERA_PERMISSION') {
          console.log('❌ Camera permission denied during capture');
          Alert.alert('Permission Denied', 'Camera permission was denied while taking the photo. Please try again.');
        } else if (error.code === 'E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR') {
          console.log('❌ Camera not available on simulator');
          Alert.alert('Camera Unavailable', 'Camera is not available on simulator. Please test on a real device.');
        } else if (Platform.OS === 'ios' && error.code === 'E_PICKER_CANCELLED') {
          console.log('ℹ️ User cancelled camera on iOS');
          // Don't show alert for user cancellation on iOS
          return;
        } else if (Platform.OS === 'ios' && error.message?.includes('permission')) {
          console.log('❌ iOS camera permission issue');
          Alert.alert(
            'Camera Permission Required',
            'This app needs access to your camera to take photos. Please grant permission in Settings.',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Open Settings',
                onPress: () => {
                  try {
                    Linking.openSettings();
                  } catch (settingsError) {
                    console.warn('Failed to open settings:', settingsError);
                  }
                }
              }
            ]
          );
        } else {
          console.log('❌ Unknown camera error:', error);
          Alert.alert('Error', `Failed to open camera: ${error.message || 'Unknown error'}`);
        }
      });
    } catch (error) {
      console.error('❌ Exception in UploadImage:', error);
      setIsImagePickerVisible(false);
      Alert.alert('Error', 'Something went wrong while opening the camera.');
    }
  };

  // Handle Camera Selection - Updated to use safe permission handling
  const handleCameraPress = async () => {
    console.log('📸 Camera button pressed - starting camera flow...');
    try {
      // For iOS, add a small delay to ensure UI is ready
      if (Platform.OS === 'ios') {
        console.log('🍎 iOS detected - adding delay for stability...');
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Check camera permission first using the safe takePermissions function
      console.log('🔒 Checking camera permission...');
      const hasPermission = await takePermissions();
      console.log('🔒 Camera permission result:', hasPermission);

      if (!hasPermission) {
        console.log('❌ Camera permission denied by user');
        setIsImagePickerVisible(false);
        return;
      }

      // If permission is granted, proceed with camera
      console.log('✅ Camera permission granted, proceeding with camera...');

      // Additional delay for iOS to prevent crashes
      if (Platform.OS === 'ios') {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      await UploadImage();
    } catch (error) {
      console.error('❌ Exception in handleCameraPress:', error);
      setIsImagePickerVisible(false);

      // iOS-specific error handling
      if (Platform.OS === 'ios') {
        Alert.alert(
          'Camera Error',
          'Unable to open camera. Please make sure the app has camera permission and try again.',
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert('Error', 'Something went wrong while opening the camera.');
      }
    }
  };

  // Check storage permission for gallery access
  const checkStoragePermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        // For Android 13+ (API 33+), we don't need storage permissions for media access
        if (Platform.Version >= 33) {
          return true;
        }

        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'This app needs access to your photo library to select images for your profile.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Storage permission error:', err);
        return false;
      }
    }
    return true; // iOS handles permissions automatically
  };

  // Handle Gallery Selection
  const handleGalleryPress = async () => {
    try {
      // Check storage permission first
      const hasPermission = await checkStoragePermission();

      if (!hasPermission) {
        Alert.alert(
          'Storage Permission Required',
          'Please grant storage permission to access your photo library.',
          [{ text: 'OK' }]
        );
        setIsImagePickerVisible(false);
        return;
      }

      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        compressImageQuality: 0.7,
        compressImageMaxHeight: 1000,
        compressImageMaxWidth: 1000,
      }).then(async image => {
        setIsImagePickerVisible(false); // Close modal after successful selection
        setSelectedImage(image);
        setProfileImageUri(image.path);

        // Prepare form data for image upload
        let imageData: any = {
          uri: image.path,
          type: image.mime,
          name: getImageNameFromUri(image.path),
        };
        setImageFormData(imageData);

        // Automatically upload image and call editProfileAction
        await handleImageUploadAndProfileUpdate(imageData);
        console.log('Gallery image selected:', imageData);
      }).catch(error => {
        setIsImagePickerVisible(false); // Close modal even if error occurs
        console.log('Gallery error:', error);

        // Don't show alert if user just cancelled
        if (error.code === 'E_PICKER_CANCELLED' || error.code === 'picker_canceled') {
          console.log('User cancelled gallery selection');
          return;
        }

        // Provide user-friendly error messages
        if (error.code === 'E_NO_LIBRARY_PERMISSION' || error.code === 'permission') {
          Alert.alert('Permission Denied', 'Storage permission was denied. Please enable it in settings.');
        } else {
          Alert.alert('Error', 'Failed to open photo library. Please try again.');
        }
      });
    } catch (error) {
      console.error('Error in handleGalleryPress:', error);
      setIsImagePickerVisible(false);
      Alert.alert('Error', 'Something went wrong while opening the photo library.');
    }
  };

  // Section Header Component for Accordion
  const SectionHeader = ({ title, isOpen, onPress, index }: { title: string, isOpen: boolean, onPress: () => void, index: number }) => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={ProfileScreenStyles.sectionHeaderContainer}
    >
      <Text style={ProfileScreenStyles.sectionHeaderText}>{index}. {title}</Text>
      <Text style={ProfileScreenStyles.sectionHeaderArrow}>{isOpen ? '▲' : '▼'}</Text>
    </TouchableOpacity>
  );

  // Profile Image Component
  const ProfileImageSection = () => {

    return (
      <View style={ProfileScreenStyles.profileImageSection}>
        <View style={ProfileScreenStyles.profileImageContainer}>
          <View style={ProfileScreenStyles.profileImageWrapper}>
            {profileImageUri ? (
              <Image
                source={{ uri: profileImageUri }}
                style={ProfileScreenStyles.profileImage}
                resizeMode="cover"
              />
            ) : (
              <Image
                source={IMAGES.PROFILE}
                style={ProfileScreenStyles.profileImageDefault}
                resizeMode="cover"
              />
            )}
          </View>
          <TouchableOpacity
            style={ProfileScreenStyles.cameraButton}
            onPress={() => setIsImagePickerVisible(true)}
            activeOpacity={0.7}
          >
            <Image
              source={IMAGES.CAMERA}
              style={ProfileScreenStyles.cameraIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Handle Submit Function - Profile Details
  const handleSubmit = async () => {
    if (isSubmitting || editProfileLoading) return;

    // Validate required fields using helper function
    const requiredFields = {
      firstName: personalDetails.firstName,
      lastName: personalDetails.lastName,
      phone: personalDetails.phone,
      email: personalDetails.email
    };

    const validation = validateRequiredFields(requiredFields, ['firstName', 'lastName', 'phone', 'email']);

    if (!validation.isValid) {
      Alert.alert('Validation Error', validation.errors.join('\n'));
      return;
    }

    // Additional phone validation
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(personalDetails.phone.trim())) {
      Alert.alert('Validation Error', 'Please enter a valid phone number');
      return;
    }

    setIsSubmitting(true);

    try {
      // If user has selected an image, upload it first
      let profileImageFileName = '';
      if (selectedImage && imageFormData) {
        console.log('Uploading image first...');
        const uploadFormData = new FormData();
        uploadFormData.append('upload_file', imageFormData);
        uploadFormData.append('root', 'users');
        uploadFormData.append('type', 'profile');

        console.log('imageFormData', imageFormData);

        const imageUploadResponse = await imageUploadApi(uploadFormData);
        console.log('imageUploadResponse', imageUploadResponse);

        if (imageUploadResponse.status === 200) {
          console.log(
            'Image upload successful:',
            imageUploadResponse?.data?.result?.fileName,
          );
          profileImageFileName = imageUploadResponse?.data?.result?.fileName;
        } else {
          console.log('Image upload failed');
          Alert.alert('Error', 'Failed to upload image. Please try again.');
          return;
        }
      }

      // Prepare profile data for API call
      const profileData = {
        firstName: personalDetails.firstName.trim(),
        lastName: personalDetails.lastName.trim(),
        email: personalDetails.email.trim(),
        profileImage: profileImageFileName || undefined,
        gender: personalDetails.gender,
        nationality: personalDetails.nationality.trim(),
        bloodGroup: personalDetails.bloodGroup,
        dob: personalDetails.dob,
      };

      // Get user ID from userData
      const userId = userData?._id;



      // Call the edit profile API with original user data for comparison
      const editProfileResponse = await dispatch(editProfileAction(userId, profileData, userData));

      console.log('Edit profile response:', editProfileResponse);

      if (editProfileResponse.status === 200) {
        // Show success message
        Alert.alert(
          'Success!',
          'Profile has been updated successfully. Your data has been updated.',
          [
            {
              text: 'OK',
              onPress: () => {
                // Reset form or navigate back
                props.navigation.goBack();
              }
            }
          ]
        );
      } else {
        Alert.alert('Error', 'Failed to update profile. Please try again.');
      }

    } catch (error) {
      console.error('Submission error:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Submit Function - Property Details Only
  const handlePropertySubmit = async () => {
    console.log('handlePropertySubmit==========');

    if (isSubmitting || createPropertyLoading) return;

    // Validate required property fields (all except flatHouseOffice)
    const requiredPropertyFields = {
      selectedProperty: propertyDetails.selectedProperty,
      landmark: propertyDetails.landmark,
      pinCode: propertyDetails.pinCode,
      area: propertyDetails.area,
      city: propertyDetails.city,
      state: propertyDetails.state,
      country: propertyDetails.country,
      lat: propertyDetails.lat,
      long: propertyDetails.long
    };

    const validation = validateRequiredFields(requiredPropertyFields, [
      'selectedProperty', 'landmark', 'pinCode', 'area', 'city', 'state', 'country', 'lat', 'long'
    ]);

    if (!validation.isValid) {
      Alert.alert('Validation Error', 'Please fill all required property fields:\n' + validation.errors.join('\n'));
      return;
    }

    // Additional validation for coordinates
    if (!propertyDetails.lat || !propertyDetails.long) {
      Alert.alert('Validation Error', 'Please select a property location from the search results');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare property data for API call
      const propertyData = {
        selectedProperty: propertyDetails.selectedProperty?.trim() || '',
        flatNo: propertyDetails.flatHouseOffice?.trim() || '', // Optional field
        landmark: propertyDetails.landmark?.trim() || '',
        pincode: propertyDetails.pinCode?.trim() || '',
        area: propertyDetails.area?.trim() || '',
        city: propertyDetails.city?.trim() || '',
        state: propertyDetails.state?.trim() || '',
        country: propertyDetails.country?.trim() || '',
        lat: propertyDetails.lat?.trim() || '',
        long: propertyDetails.long?.trim() || ''
      };

      console.log('Calling create property API with data:', propertyData);

      // Call the create property API
      const createPropertyResponse = await dispatch(createPropertyAction(propertyData));

      console.log('Create property response:', createPropertyResponse);

      if (createPropertyResponse.status === 200) {

        Alert.alert(
          'Success!',
          'Property details have been saved successfully.',
          [
            {
              text: 'OK',
              onPress: () => {
                // Reset property form or navigate back
                // setPropertyDetails({
                //   searchProperty: '',
                //   selectedProperty: '',
                //   flatHouseOffice: '',
                //   landmark: '',
                //   pinCode: '',
                //   area: '',
                //   city: '',
                //   state: '',
                //   country: '',
                //   lat: '',
                //   long: ''
                // });
                // props.navigation.goBack();
              }
            }
          ]
        );
      } else {
        Alert.alert('Error', 'Failed to save property details. Please try again.');
      }

    } catch (error: any) {
      console.log('error', error);

      console.error('Property submission error:', error);
      Alert.alert('Error', 'Failed to save property details. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Personal Details Component
  const PersonalDetails = () => (
    <View style={ProfileScreenStyles.personalDetailsContainer}>
      <View style={ProfileScreenStyles.inputWrapper}>
        <TextInputField placeholder='First Name*' value={personalDetails.firstName} onChangeText={(text) => handleChange('firstName', text)} />
      </View>
      <View style={ProfileScreenStyles.inputWrapper}>
        <TextInputField placeholder='Last Name*' value={personalDetails.lastName} onChangeText={(text) => handleChange('lastName', text)} />
      </View>
      <View style={ProfileScreenStyles.inputWrapper} pointerEvents='none'>
        <TextInputField placeholder='Phone Number*' value={personalDetails.phone} onChangeText={(text) => handleChange('phone', text)} />
      </View>
      <View style={ProfileScreenStyles.inputWrapper}>
        <TextInputField placeholder='Email*' value={personalDetails.email} onChangeText={(text) => handleChange('email', text)} keyboardType="email-address" autoCapitalize="none" />
      </View>
      {/* gender */}
      <View style={ProfileScreenStyles.inputWrapper}>
        <Text style={ProfileScreenStyles.genderLabel}>Gender</Text>
        <View style={ProfileScreenStyles.genderOptionsContainer}>
          <TouchableOpacity
            style={ProfileScreenStyles.genderOption}
            onPress={() => handleChange('gender', 'Male')}
            activeOpacity={0.7}
          >
            <View>
              <View style={ProfileScreenStyles.radioButton}>
                {personalDetails.gender === 'Male' && (
                  <View style={ProfileScreenStyles.radioButtonSelected} />
                )}
              </View>
            </View>
            <Text style={ProfileScreenStyles.genderText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={ProfileScreenStyles.genderOptionFemale}
            onPress={() => handleChange('gender', 'Female')}
            activeOpacity={0.7}
          >
            <View>
              <View style={ProfileScreenStyles.radioButton}>
                {personalDetails.gender === 'Female' && (
                  <View style={ProfileScreenStyles.radioButtonSelected} />
                )}
              </View>
            </View>
            <Text style={ProfileScreenStyles.genderText}>Female</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* dob */}
      <View style={ProfileScreenStyles.dobContainer}>
        <TouchableOpacity style={ProfileScreenStyles.dobButton} activeOpacity={0.8} onPress={() => setOpenPicker(true)}>
          <View style={{ paddingHorizontal: 10 }}>
            <Text style={ProfileScreenStyles.dobText}>{reflectedDate || 'Date of Birth'}</Text>
          </View>
          <View>
            <Image source={IMAGES.CALENDAR} style={ProfileScreenStyles.calendarIcon} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={ProfileScreenStyles.nationalityContainer}>
        <TouchableOpacity
          style={ProfileScreenStyles.nationalityButton}
          onPress={() => setOpenCountryPicker(true)}
          activeOpacity={0.7}
        >
          <Text style={[
            ProfileScreenStyles.nationalityText,
            personalDetails.nationality ? ProfileScreenStyles.nationalityTextSelected : ProfileScreenStyles.nationalityTextPlaceholder
          ]}>
            {personalDetails.nationality || 'Nationality'}
          </Text>
          <Text style={ProfileScreenStyles.dropdownArrow}>▼</Text>
        </TouchableOpacity>
      </View>
      <View style={ProfileScreenStyles.inputWrapper}>
        <Dropdowns
          data={BLOOD_GROUPS}
          value={personalDetails.bloodGroup}
          placeholder="Blood Group"
          onChange={(value: string) => handleChange('bloodGroup', value)}
        />
      </View>
      {/* <CalendarPicker  /> */}
      <TouchableOpacity
        style={[ProfileScreenStyles.submitButton, (isSubmitting || editProfileLoading) && { opacity: 0.6 }]}
        onPress={handleSubmit}
        disabled={isSubmitting || editProfileLoading}
      >
        <Text style={ProfileScreenStyles.submitButtonText}>
          {(isSubmitting || editProfileLoading) ? 'Updating...' : 'Submit'}
        </Text>
      </TouchableOpacity>
    </View>
  );

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


      {userData?.isEmployee == true ? <View pointerEvents='none' style={{ opacity: 0.5 }}>
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

        {/* <View style={ProfileScreenStyles.inputWrapper}>
          <TextInputField
            placeholder='Sub branch'
            value={professionalDetails.subBranch}
            onChangeText={(text) => handleProfessionalChange('subBranch', text)}
          />
        </View> */}

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


  const PropertyDetails = () => (
    <View style={[ProfileScreenStyles.personalDetailsContainer,{zIndex:999999}]}>
      {propertyListLoading && (
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text style={{ color: COLORS.GREY_TEXT, fontSize: 16 }}>Loading property data...</Text>
        </View>
      )}
      <View style={ProfileScreenStyles.inputWrapper}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: COLORS.BORDER_GREY,
          paddingVertical: 14
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' ,/* zIndex:999999 */}}>
            <View style={{ flex: 1, position: 'relative',/* zIndex:999999 */ }}>
              <View style={{ flexDirection: 'row', alignItems: 'center',/* zIndex:999999 */ }}>
                <TextInput
                  style={{
                    flex: 1,
                    height: 38,
                    color: '#5d5d5d',
                    fontSize: 16,
                    paddingHorizontal: 0,
                  }}
                  placeholder="Search Property"
                  placeholderTextColor="#999"
                  value={propertyDetails.selectedProperty || ''}
                  onChangeText={handlePropertySearch}
                />
                {(propertyDetails.selectedProperty && propertyDetails.selectedProperty.length > 0) && (
                  <TouchableOpacity
                    onPress={() => {
                      // Clear all property-related fields
                      handlePropertyChange('selectedProperty', '');
                      handlePropertyChange('flatHouseOffice', '');
                      handlePropertyChange('city', '');
                      handlePropertyChange('state', '');
                      handlePropertyChange('country', '');
                      handlePropertyChange('pinCode', '');
                      handlePropertyChange('area', '');
                      handlePropertyChange('landmark', '');
                      handlePropertyChange('lat', '');
                      handlePropertyChange('long', '');
                      setSearchResults([]);
                    }}
                    style={{
                      padding: 5,
                      marginLeft: 10,
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={{ fontSize: 18, color: '#999' }}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>
              {searchResults.length > 0 && (
                <View style={{
                  // position: 'absolute',
                  top: 10,
                  left: 0,
                  right: 0,
                  bottom: -200, // Extend below to cover content
                  backgroundColor: '#ffffff',
                  borderRadius: 8,
                  zIndex: -999999,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}>
                  <ScrollView
                    style={{
                      maxHeight: 200,
                    }}
                    keyboardShouldPersistTaps="always"
                  >
                  {searchResults.map((result, index) => (
                    <TouchableOpacity
                      key={index}
                      style={{
                        padding: 15,
                        borderBottomWidth: index < searchResults.length - 1 ? 0.5 : 0,
                        borderBottomColor: '#e0e0e0',
                        // backgroundColor: '#4CAF50',
                        zIndex: 999999,
                        elevation: 999999
                      }}
                      onPress={(e) => {
                        e.stopPropagation();
                        console.log("TOUCH EVENT TRIGGERED", result);
                        handlePlaceSelect(result);
                      }}
                      activeOpacity={0.5}
                      disabled={isSelecting}
                    >
                      <Text style={{ color: '#000', fontSize: 16 }}>
                        {result.description}
                      </Text>
                    </TouchableOpacity>
                  ))}
                  </ScrollView>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>

      <View style={ProfileScreenStyles.inputWrapper}>
        <TextInputField
          placeholder='Selected Property'
          value={propertyDetails.selectedProperty}
          onChangeText={(text) => handlePropertyChange('selectedProperty', text)}
        />
      </View>

      <View style={ProfileScreenStyles.inputWrapper}>
        <TextInputField
          placeholder='Flat / House/ Office/ Showroom No'
          value={propertyDetails.flatHouseOffice}
          onChangeText={(text) => handlePropertyChange('flatHouseOffice', text)}
        />
      </View>

      <View style={ProfileScreenStyles.inputWrapper}>
        <TextInputField
          placeholder='Landmark'
          value={propertyDetails.landmark}
          onChangeText={(text) => handlePropertyChange('landmark', text)}
        />
      </View>

      <View style={ProfileScreenStyles.inputWrapper}>
        <TextInputField
          placeholder='Pincode'
          value={propertyDetails.pinCode}
          onChangeText={(text) => handlePropertyChange('pinCode', text)}
          keyboardType="numeric"
        />
      </View>

      <View style={ProfileScreenStyles.inputWrapper}>
        <TextInputField
          placeholder='Area'
          value={propertyDetails.area}
          onChangeText={(text) => handlePropertyChange('area', text)}
        />
      </View>

      <View style={ProfileScreenStyles.inputWrapper}>
        <TextInputField
          placeholder='City'
          value={propertyDetails.city}
          onChangeText={(text) => handlePropertyChange('city', text)}
        />
      </View>

      <View style={ProfileScreenStyles.inputWrapper}>
        <TextInputField
          placeholder='State'
          value={propertyDetails.state}
          onChangeText={(text) => handlePropertyChange('state', text)}
        />
      </View>

      <View style={ProfileScreenStyles.inputWrapper}>
        <TextInputField
          placeholder='Country'
          value={propertyDetails.country}
          onChangeText={(text) => handlePropertyChange('country', text)}
        />
      </View>
      <TouchableOpacity
        style={[ProfileScreenStyles.submitButton, (isSubmitting || createPropertyLoading || propertyListLoading) && { opacity: 0.6 }]}
        onPress={handlePropertySubmit}
        disabled={isSubmitting || createPropertyLoading || propertyListLoading}
      >
        <Text style={ProfileScreenStyles.submitButtonText}>
          {(isSubmitting || createPropertyLoading) ? 'Submitting...' : 'Submit'}
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
          <HeaderComponent Title='Your Profile' onPress={() => props.navigation.goBack()} />
          <ScrollView
            style={ProfileScreenStyles.container}
            nestedScrollEnabled={true}
          >
            {/* <View style={ProfileScreenStyles.container}> */}
            {/* Profile Image Section */}
            {ProfileImageSection()}

            {/* Personal Details Section */}
            <View style={ProfileScreenStyles.personalDetailsSection}>
              <SectionHeader
                title="Personal Details"
                isOpen={isPersonalDetailsExpanded}
                onPress={() => {
                  if (isPersonalDetailsExpanded) {
                    // If Personal Details is open, just close it
                    setIsPersonalDetailsExpanded(false);
                  } else {
                    // If Personal Details is closed, open it and close all others
                    setIsPersonalDetailsExpanded(true);
                    setIsAddressDetailsExpanded(false);
                    setIsPropertyDetailsExpanded(false);
                  }
                }}
                index={1}
              />
              {isPersonalDetailsExpanded && PersonalDetails()}
            </View>
            <View style={ProfileScreenStyles.personalDetailsSection}>
              <SectionHeader
                title="Professional Details"
                isOpen={isAddressDetailsExpanded}
                onPress={() => {
                  if (isAddressDetailsExpanded) {
                    // If Professional Details is open, just close it
                    setIsAddressDetailsExpanded(false);
                  } else {
                    // If Professional Details is closed, open it and close all others
                    setIsAddressDetailsExpanded(true);
                    setIsPersonalDetailsExpanded(false);
                    setIsPropertyDetailsExpanded(false);
                  }
                }}
                index={2}
              />
              {isAddressDetailsExpanded && ProfessionalDetails()}
            </View>

            <View style={ProfileScreenStyles.personalDetailsSection}>
              <SectionHeader
                title="Property Details"
                isOpen={isPropertyDetailsExpanded}
                onPress={() => {
                  if (isPropertyDetailsExpanded) {
                    // If Property Details is open, just close it
                    setIsPropertyDetailsExpanded(false);
                  } else {
                    // If Property Details is closed, open it and close all others
                    setIsPropertyDetailsExpanded(true);
                    setIsPersonalDetailsExpanded(false);
                    setIsAddressDetailsExpanded(false);
                  }
                }}
                index={3}
              />
              {isPropertyDetailsExpanded && PropertyDetails()}
            </View>


          </ScrollView>
          {/* </View> */}

          {/* Image Picker Modal */}
          <ImagePickerModal
            isVisible={isImagePickerVisible}
            onClose={() => setIsImagePickerVisible(false)}
            onCameraPress={handleCameraPress}
            onGalleryPress={handleGalleryPress}
            title="Select Profile Photo"
          />

          {/* Country Picker Modal */}
          <CountryPicker
            onBackdropPress={() => setOpenCountryPicker(false)}
            onRequestClose={() => setOpenCountryPicker(false)}
            style={{
              modal: ProfileScreenStyles.countryPickerModal,
              countryName:{
                color:"#000000"
              },
              dialCode:{
                  color:"#000000"
              }
            }}
            show={opencountryPicker}
            lang="en"
            pickerButtonOnPress={(item) => {
              handleChange("nationality", item?.name?.en);
              setOpenCountryPicker(false);
            }}

          />

          {/* Calendar Modal */}
          <CalendarPicker
            visible={openPicker}
            onClose={() => setOpenPicker(false)}
            onSelect={date => {
              const formattedDate = formatDateToDisplay(date);
              setReflectedDate(formattedDate);
              setPersonalDetails(prevState => ({
                ...prevState,
                dob: date // Store in yyyy-mm-dd format for server
              }));
              setOpenPicker(false);
            }}
            initialDate={formatDateToServer(reflectedDate)}
          />

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

export default ProfileScreen;
