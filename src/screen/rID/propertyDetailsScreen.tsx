import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import { selectCreatePropertyLoading, selectCreatePropertyError, selectPropertyListLoading, selectPropertyListData, selectPropertyListError } from '../../store/selectors/profile';
import { ProfileScreenStyles } from './styles';
import { Container, HeaderComponent, TextInputField } from '../../components/common';
import { COLORS } from '../../constants';
import { validateRequiredFields } from '../../utils/helper';
import { useDispatch } from 'react-redux';
import { createPropertyAction } from '../../store/actions/profile/createPropertyAction';
import { getPropertyListAction } from '../../store/actions/profile/getPropertyListAction';
import { GOOGLE_PLACES_API } from '../../services/httpService';

const PropertyDetailsScreen = (props: any) => {
  const createPropertyLoading = useSelector(selectCreatePropertyLoading);
  const createPropertyError = useSelector(selectCreatePropertyError);
  const propertyListLoading = useSelector(selectPropertyListLoading);
  const propertyListData = useSelector(selectPropertyListData);
  const propertyListError = useSelector(selectPropertyListError);
  const dispatch = useDispatch() as any;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const searchInputRef = useRef<TextInput>(null);

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

  // Fetch property list when component mounts
  useEffect(() => {
    dispatch(getPropertyListAction({ page: 1 }));
  }, [dispatch]);

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
      console.error('Property list error:', propertyListError);
    }
  }, [propertyListError]);

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
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(text)}&key=${GOOGLE_PLACES_API}&language=en&locationbias=ipbias&components=country:in`
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
    // Blur to show text from the start and hide the caret by defocusing
    searchInputRef.current?.blur();

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
                props.navigation.goBack();
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

  // Property details block as a function (to call like PersonalDetails())
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
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1, position: 'relative' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  ref={searchInputRef}
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
                  selectTextOnFocus={false}
                  onFocus={() => {
                    setTimeout(() => {
                      try {
                        searchInputRef.current?.setNativeProps?.({ selection: { start: 0, end: 0 } });
                      } catch {}
                    }, 0);
                  }}
                />
                {(propertyDetails.selectedProperty && propertyDetails.selectedProperty.length > 0) && (
                  <TouchableOpacity
                    onPress={() => {
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
                <View
                  style={{
                    marginTop: 10,
                    backgroundColor: '#ffffff',
                    borderRadius: 8,
                    zIndex: 1000,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 8,
                  }}
                  onStartShouldSetResponder={() => true}
                >
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
                        zIndex: 999999,
                        elevation: 999999
                      }}
                      onPress={() => {
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Container style={ProfileScreenStyles.mainContainer}>
          <HeaderComponent Title='Property Details' onPress={() => props.navigation.goBack()} />
          <ScrollView
            style={ProfileScreenStyles.container}
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps="handled"
          >
            <View style={ProfileScreenStyles.personalDetailsSection}>
              { PropertyDetails() }
            </View>
          </ScrollView>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default PropertyDetailsScreen;

