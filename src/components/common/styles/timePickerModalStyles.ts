import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FF, FS } from '../../../constants';

const { height: screenHeight } = Dimensions.get('window');

export const timePickerModalStyles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxHeight: screenHeight * 0.6,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  cancelText: {
    fontSize: FS.FS16,
    fontFamily: FF[500],
    color: COLORS.GREY_TEXT,
  },
  titleText: {
    fontSize: FS.FS18,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
  },
  doneText: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.DARK_BLUE,
  },
  timePickerContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  timePicker: {
    width: '100%',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  switchLabel: {
    fontSize: 16,
    fontFamily: 'System',
    color: '#333',
  },
  wheelPickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  wheelColumn: {
    width: 80,
    height: 220,
  },
  wheelSeparator: {
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  wheelSeparatorText: {
    fontSize: FS.FS28,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
  },
  wheelItemText: {
    fontSize: FS.FS20,
    fontFamily: FF[500],
    color: COLORS.BLACK_TEXT,
  },
  wheelSelectedIndicator: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.3)',
  },
});
