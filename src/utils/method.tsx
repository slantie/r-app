import COLORS from "../constants/colors";
import { Platform, PermissionsAndroid, Alert } from "react-native";
import { Camera } from "react-native-vision-camera";
import Geolocation from "react-native-geolocation-service";

export const print = (msg1: string, msg2: string, type: number): void => {
    if (type === 1) {
        console.log(COLORS.CONSOLE_GREEN, msg1, COLORS.CONSOLE_WHITE, msg2);
    } else if (type === 0) {
        console.log(COLORS.CONSOLE_RED, msg1, COLORS.CONSOLE_WHITE, msg2);
    } else {
        console.log(msg1 + msg2);
    }
};


export const getInitials = (firstName: string, lastName: string): string => {
    const firstInitial = firstName?.trim()?.charAt(0)?.toUpperCase() || '';
    const lastInitial = lastName?.trim()?.charAt(0)?.toUpperCase() || '';
    return firstInitial + lastInitial;
  };

//   export const Initials = (fullName:any)  => fullName
//   .split(' ')
//   .map((name:any) => name.charAt(0).toUpperCase())
//   .join('');


export const Initials = (name: any): string => {
    if (!name || typeof name !== 'string') {
      return '';
    }

    const words = name.trim().split(" ").filter(word => word.length > 0);
    const initials = words.slice(0, 2).map((word: string) => word.charAt(0).toUpperCase()).join('');
    return initials;
  };


  export async function CheckMultiplePermissions() {
    try {
      if (Platform.OS === 'ios') {
        // Check Camera Permission
        const cameraPermission = await Camera.requestCameraPermission();
        print('CAMERA Permission : ', cameraPermission, cameraPermission === 'granted' ? 1 : 0);

        // Check Location Permission
        const locationPermission = await Geolocation.requestAuthorization('whenInUse');
        print('LOCATION Permission : ', locationPermission, locationPermission === 'granted' ? 1 : 0);

        // Note: Photo library and contacts permissions are handled by the respective libraries
        // when they are actually used (e.g., react-native-image-crop-picker for photos)
        print('PHOTO_LIBRARY Permission : ', 'HANDLED_BY_LIBRARY', 1);
        print('CONTACTS Permission : ', 'HANDLED_BY_LIBRARY', 1);

      } else if (Platform.OS === 'android') {
        // Request Android permissions
        const permissions = [
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ];

        const granted = await PermissionsAndroid.requestMultiple(permissions);

        // Check Camera Permission
        const cameraStatus = granted[PermissionsAndroid.PERMISSIONS.CAMERA];
        print('CAMERA Permission : ', cameraStatus, cameraStatus === PermissionsAndroid.RESULTS.GRANTED ? 1 : 0);

        // Check Photo Library Permission
        const photoStatus = granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE];
        print('PHOTO_LIBRARY Permission : ', photoStatus, photoStatus === PermissionsAndroid.RESULTS.GRANTED ? 1 : 0);

        // Check Contacts Permission
        const contactsStatus = granted[PermissionsAndroid.PERMISSIONS.READ_CONTACTS];
        print('READ_CONTACTS Permission : ', contactsStatus, contactsStatus === PermissionsAndroid.RESULTS.GRANTED ? 1 : 0);

        // Check Location Permission
        const locationStatus = granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION];
        print('LOCATION Permission : ', locationStatus, locationStatus === PermissionsAndroid.RESULTS.GRANTED ? 1 : 0);

      } else {
        print('OS Platform is not valid', '', 0);
      }
    } catch (error: any) {
      print('Permission Error: ', error.message || 'Unknown error', 0);
    }
  }