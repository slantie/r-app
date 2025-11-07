import { StyleSheet } from 'react-native';
import { COLORS, FF, FS } from '../../../constants';

const InputFieldStyles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
  input: {
    borderBottomWidth: 0.5,
    borderColor: COLORS.BORDER_GREY,
    // borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    fontFamily: FF[400],
    fontSize: FS.FS16,
    color: COLORS.BLACK_TEXT,
  },
  inputError: {
    borderColor: COLORS.ERROR_COLOR,
    borderBottomWidth: 1,
  },
  errorText: {
    color: COLORS.ERROR_COLOR,
    fontSize: FS.FS12,
    fontFamily: FF[400],
    marginTop: 4,
    marginLeft: 10,
  },
  scanButton: {
    position: 'absolute',
    right: 0,
    top: 10,
  },
  scanButtonText: {
    fontSize: FS.FS14,
    fontFamily: FF[500],
    color: COLORS.BLACK_TEXT,
  },
});

export default InputFieldStyles;
