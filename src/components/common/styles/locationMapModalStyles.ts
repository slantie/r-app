import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../../constants';
import { FF, FS } from '../../../constants/fonts';

const { width, height } = Dimensions.get('window');

const LocationMapModalStyles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: height * 0.85,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LIGHT_GRAY,
  },
  headerTitle: {
    fontSize: FS.FS18,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.LIGHT_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: FS.FS16,
    color: COLORS.BLACK_TEXT,
    fontFamily: FF[500],
  },
  mapContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  map: {
    flex: 1,
  },
  currentLocationButton: {
    backgroundColor: COLORS.BLACK,
    marginHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  currentLocationText: {
    color: COLORS.WHITE,
    fontSize: FS.FS14,
    fontFamily: FF[500],
  },
  locationInfo: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.LIGHT_GRAY,
    marginHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  locationLabel: {
    fontSize: FS.FS12,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    marginBottom: 4,
  },
  locationText: {
    fontSize: FS.FS14,
    fontFamily: FF[500],
    color: COLORS.BLACK_TEXT,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: COLORS.LIGHT_GRAY,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
  },
  cancelButtonText: {
    color: COLORS.BLACK_TEXT,
    fontSize: FS.FS14,
    fontFamily: FF[500],
  },
  confirmButton: {
    backgroundColor: COLORS.BLACK,
  },
  confirmButtonText: {
    color: COLORS.WHITE,
    fontSize: FS.FS14,
    fontFamily: FF[500],
  },
});

export default LocationMapModalStyles;
