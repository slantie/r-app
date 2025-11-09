import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { WhoAmIStyles } from './styles';
import { Container, CustomButton, DropDowns, TextInputField } from '../../components/common';
import { IMAGES, COLORS } from '../../constants';
import { apiGetBuildings, apiGetBuildingDetails } from '../../services/apiServiceWrapper';
import { BUILDINGS_SEARCH, BUILDING_DETAILS } from '../../services/httpService';

const WhoAmI = ({ route, navigation }: any) => {
  // State for building search and selection
  const [city, setCity] = useState('');
  const [buildings, setBuildings] = useState<any[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [buildingDetails, setBuildingDetails] = useState<any>(null);
  
  // State for unit selection (cascading dropdowns)
  const [blocks, setBlocks] = useState<any[]>([]);
  const [floors, setFloors] = useState<any[]>([]);
  const [units, setUnits] = useState<any[]>([]);
  
  const [selectedBlock, setSelectedBlock] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  
  // Loading states
  const [loadingBuildings, setLoadingBuildings] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch buildings when city is entered (min 3 characters)
  useEffect(() => {
    if (city.length >= 3) {
      searchBuildings();
    } else {
      setBuildings([]);
      setSelectedBuilding('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  // Fetch building details when building is selected
  useEffect(() => {
    if (selectedBuilding) {
      fetchBuildingDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBuilding]);

  // Update blocks when building details are fetched
  useEffect(() => {
    if (buildingDetails?.blocks) {
      const uniqueBlocks = buildingDetails.blocks.map((b: any) => ({ 
        label: b.blockName, 
        value: b.blockName,
        blockData: b 
      }));
      setBlocks(uniqueBlocks);
    }
  }, [buildingDetails]);

  // Update floors when block is selected
  useEffect(() => {
    if (selectedBlock && buildingDetails?.blocks) {
      const selectedBlockData = buildingDetails.blocks.find((b: any) => b.blockName === selectedBlock);
      if (selectedBlockData?.floors) {
        const floorOptions = selectedBlockData.floors.map((f: any) => ({ 
          label: f.floorName, 
          value: f.floorName,
          floorData: f
        }));
        setFloors(floorOptions);
        setSelectedFloor('');
        setSelectedUnit('');
      }
    }
  }, [selectedBlock, buildingDetails]);

  // Update units when floor is selected
  useEffect(() => {
    if (selectedFloor && buildingDetails?.blocks) {
      const selectedBlockData = buildingDetails.blocks.find((b: any) => b.blockName === selectedBlock);
      const selectedFloorData = selectedBlockData?.floors.find((f: any) => f.floorName === selectedFloor);
      if (selectedFloorData?.units) {
        const unitOptions = selectedFloorData.units.map((u: any) => ({ 
          label: `Unit ${u.unitNumber}`, 
          value: u._id,
          unitData: {
            ...u,
            block: selectedBlock,
            blockId: selectedBlockData._id,
            floor: selectedFloor,
            floorId: selectedFloorData._id,
            buildingName: buildingDetails.building?.buildingName
          }
        }));
        setUnits(unitOptions);
        setSelectedUnit('');
      }
    }
  }, [selectedFloor, selectedBlock, buildingDetails]);

  const searchBuildings = async () => {
    setLoadingBuildings(true);
    try {
      const response = await apiGetBuildings(BUILDINGS_SEARCH, { city });
      if (response.data?.success) {
        const buildingOptions = response.data.data.map((b: any) => ({
          label: `${b.buildingName} - ${b.societyName}`,
          value: b._id,
          buildingData: b
        }));
        setBuildings(buildingOptions);
      }
    } catch (error: any) {
      console.log('Error fetching buildings:', error.message);
      Alert.alert('Error', 'Failed to fetch buildings. Please try again.');
    } finally {
      setLoadingBuildings(false);
    }
  };

  const fetchBuildingDetails = async () => {
    setLoadingDetails(true);
    try {
      const response = await apiGetBuildingDetails(BUILDING_DETAILS(selectedBuilding));
      if (response.data?.success) {
        setBuildingDetails(response.data.data);
      }
    } catch (error: any) {
      console.log('Error fetching building details:', error.message);
      Alert.alert('Error', 'Failed to fetch building details. Please try again.');
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedBuilding || !selectedUnit) {
      Alert.alert('Error', 'Please select a building and unit');
      return;
    }

    const selectedUnitData = units.find(u => u.value === selectedUnit)?.unitData;
    
    console.log('🏢 Building selection complete:', {
      building: selectedBuilding,
      block: selectedBlock,
      floor: selectedFloor,
      unit: selectedUnit,
      unitData: selectedUnitData
    });

    // Navigate to member registration screen with building and unit data
    navigation.navigate('MemberRegistration', {
      userData: route?.params?.userData,
      buildingId: selectedBuilding,
      unitId: selectedUnit,
      unitData: selectedUnitData
    });
  };

  return (
    <Container>
      <View style={WhoAmIStyles.container}>
        <View style={WhoAmIStyles.logoContainer}>
          <Image source={IMAGES.APP_LOGO} style={WhoAmIStyles.logo} />
        </View>
        <View style={WhoAmIStyles.titleContainer}>
          <Text style={WhoAmIStyles.title}>SELECT YOUR BUILDING</Text>
          <Text style={WhoAmIStyles.subtitle}>
            Enter your city and select your building and unit
          </Text>
        </View>

        {/* City Input */}
        <View style={styles.inputContainer}>
          <TextInputField
            placeholder="Enter City (e.g., Ahmedabad)"
            value={city}
            onChangeText={setCity}
            autoCapitalize="words"
          />
          {loadingBuildings && <Text style={styles.loadingText}>Searching buildings...</Text>}
        </View>

        {/* Building Dropdown */}
        {buildings.length > 0 && (
          <View style={styles.dropdownContainer}>
            <DropDowns
              data={buildings}
              value={selectedBuilding}
              placeholder="Select Building"
              onChange={setSelectedBuilding}
              dropdownStyle={styles.dropdownStyle}
            />
          </View>
        )}

        {/* Block Dropdown */}
        {blocks.length > 0 && (
          <View style={styles.dropdownContainer}>
            <DropDowns
              data={blocks}
              value={selectedBlock}
              placeholder="Select Block"
              onChange={setSelectedBlock}
              dropdownStyle={styles.dropdownStyle}
            />
          </View>
        )}

        {/* Floor Dropdown */}
        {floors.length > 0 && selectedBlock && (
          <View style={styles.dropdownContainer}>
            <DropDowns
              data={floors}
              value={selectedFloor}
              placeholder="Select Floor"
              onChange={setSelectedFloor}
              dropdownStyle={styles.dropdownStyle}
            />
          </View>
        )}

        {/* Unit Dropdown */}
        {units.length > 0 && selectedFloor && (
          <View style={styles.dropdownContainer}>
            <DropDowns
              data={units}
              value={selectedUnit}
              placeholder="Select Unit"
              onChange={setSelectedUnit}
              dropdownStyle={styles.dropdownStyle}
            />
          </View>
        )}

        {loadingDetails && <Text style={styles.loadingText}>Loading building details...</Text>}
      </View>
      
      <View style={styles.buttonContainer}>
        <CustomButton
          title={submitting ? 'Submitting...' : 'Continue'}
          onPress={handleSubmit}
          disabled={submitting || !selectedUnit}
          loading={submitting}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  dropdownContainer: {
    marginTop: 15,
    marginHorizontal: 20,
  },
  dropdownStyle: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_GREY,
    borderWidth: 0,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: COLORS.GREY_TEXT,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    bottom: 10,
    alignSelf: 'center',
  },
});

export default WhoAmI;
