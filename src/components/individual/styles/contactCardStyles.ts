import { StyleSheet } from 'react-native';
import { COLORS, FF, FS } from '../../../constants';

const ContactCardStyles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#2c3e50',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    // backgroundColor: COLORS.CONTACT_CARD_BG,
    flexDirection: 'row',
  },
  contactCardImgContainer: {
    // width: 40,
    // height: 40,
    // borderRadius: 10,
    // backgroundColor: COLORS.WHITE,
  },
  contactCardImg: {
    width: 70,
    height: 70,
    borderRadius: 10,
    // backgroundColor: COLORS.WHITE,
  },
  contactCardInfoContainer: {
    marginLeft: 12,
    flex: 1,
  },
  contactCardInfoContainers: {
    paddingHorizontal: 8,
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderRadius: 3,
    position: 'absolute',
    bottom: -10,
    left: 15,
  },
  contactCardInfoTitle: {
    fontSize: FS.FS13,
    fontFamily: FF[400],
    color: COLORS.BLACK,
    // marginBottom: 4,
    textAlign: 'center',
  },
  contactCardName: {
    fontSize: FS.FS20,
    fontFamily: FF[500],
    color: COLORS.WHITE,

    // marginBottom:4,
  },
  contactCardDesignation: {
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.WHITE,
    marginTop: 8,
    // marginBottom:4,
  },
  contactCardLocation: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.WHITE,
    marginTop: 8,
    // marginBottom:4,
  },
});

export default ContactCardStyles;
