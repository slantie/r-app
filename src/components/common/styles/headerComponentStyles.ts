import { Platform, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';
import { FF, FS, LH } from '../../../constants/fonts';

const HeaderComponentStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backImg: { height: 24, width: 24 },
  backBtn: {
    padding: 10,
  },
  title: {
    color: COLORS.BLACK_TEXT,
    fontSize: FS.FS22,
    fontFamily: FF[500],
    marginLeft: 15,
    marginTop: Platform.OS == 'android' ? 5 : undefined,
  },
});

export default HeaderComponentStyles;
