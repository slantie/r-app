import { StyleSheet } from 'react-native';
import { COLORS, FF, FS } from '../../../constants';

const TextInputFieldStyles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    fontFamily: FF[500],
    fontSize: FS.FS14,
    color: COLORS.BLACK_TEXT,
  },
});

export default TextInputFieldStyles;
