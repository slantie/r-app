import { StyleSheet } from 'react-native';
import { COLORS, FF, FS, LH } from '../../../constants';

const CountryInputStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth:1
  },
  countryCodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: COLORS.BORDER_GREY,
    borderRadius: 8,
    marginRight: 10,
    // backgroundColor: COLORS.WHITE,
    // paddingRight: 20,
  },
  countryCodeText: {
    fontSize: FS.FS18,
    fontFamily: FF[500],
    color: COLORS.BLACK_TEXT,
    marginRight: 8,
  },
  arrowText: {
    fontSize: FS.FS18,
    color: COLORS.BLACK_TEXT,
  },
  input: {
    flex: 1,
    fontFamily: FF[400],
    fontSize: FS.FS16,
    // lineHeight:LH.LH18,
    color: COLORS.BLACK_TEXT,
    borderBottomWidth: 0.5,
    borderColor: COLORS.BORDER_GREY,
    borderRadius: 8,
    // backgroundColor: COLORS.WHITE,
    padding: 11,
  },
});

export default CountryInputStyles;
