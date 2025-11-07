import { StyleSheet } from 'react-native';
import { COLORS, FF, FS } from '../../../constants';

const CustomStyles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  container: {
    backgroundColor: COLORS.BLACK,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    paddingHorizontal: 24,
  },
  title: {
    color: COLORS.WHITE,
    fontSize: FS.FS14,
    fontFamily: FF[700],
    // textTransform: 'uppercase'
  },
  disabled: {
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.BLACK,
    borderWidth: 1,
  },
  disabledText: {
    color: COLORS.BLACK,
  },
  errorState: {
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.ERROR_COLOR,
    borderWidth: 1,
  },
  errorText: {
    color: COLORS.ERROR_COLOR,
    fontSize: FS.FS12,
    fontFamily: FF[400],
  },
  errorContainer: {
    marginTop: 8,
    paddingHorizontal: 4,
  },
});

export default CustomStyles;
