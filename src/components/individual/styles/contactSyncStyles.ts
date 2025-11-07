import { StyleSheet } from 'react-native';
import { COLORS, FF, FS } from '../../../constants';
import { width } from '../../../utils/responsiveStyle';

const ContactSyncStyles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: COLORS.BG_GREY,
    padding: 20,
    justifyContent: 'center',
    // alignItems:'center',
    borderRadius: 10,
    marginTop: 16,
    // alignContent:'center',
  },
  contactSyncImg: {
    width: 60,
    height: 60,
    // borderWidth:1
  },
  contactSyncTitle: {
    fontSize: FS.FS16,
    fontFamily: FF[600],
    color: COLORS.BLACK_TEXT,
    textAlign: 'center',
  },
  contactSyncSubTitle: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    textAlign: 'center',
    marginTop: 16,
  },
  contactSyncImgContainer: {
    alignSelf: 'center',
  },
  contactSyncButtonContainer: {
    marginTop: 16,
    width: width - 300,
    alignSelf: 'center',
  },
});

export default ContactSyncStyles;
