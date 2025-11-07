import { StyleSheet } from 'react-native';
import { COLORS, FF, FS } from '../../../constants';

const UserContactStyles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    marginTop:16
    //    alignItems:'center',
  },
  contactCardImgContainer: {
    // width: 40,
    // height: 40,
    // borderRadius: 10,
    // backgroundColor: COLORS.WHITE,
  },
  contactCardImg: {
    width: 60,
    height: 60,
    borderRadius: 10,
    borderWidth:1
    // backgroundColor: COLORS.WHITE,
  },
  contactCardInfoContainer: {
    flexDirection: 'row',
    // alignItems:'center',

    // marginLeft: 12,
    // flex: 1
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
  contactCardContainer: {
    // flexDirection:'row',
    // alignItems:'center',
    // justifyContent:'center',
  },
  contactCardInfoTextContainer: {
    // flex:1,
  },
  contactCardInfoText: {
    fontSize: FS.FS13,
    fontFamily: FF[400],
    color: COLORS.BG_GREY,
  },
  userContactName: {
    fontSize: FS.FS18,
    fontFamily: FF[500],
    color: COLORS.BLACK_TEXT,
  },
  userContactDesignation: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.BLACK_TEXT,
    marginTop: 8,
  },
  userContactAddress: {
    fontSize: FS.FS14,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
    marginTop: 8,
  },
  addContactButton: {
    fontSize: FS.FS12,
    fontFamily: FF[500],
    color: COLORS.BLUE_TEXT,
    textAlign: 'right',
    marginTop: 8,
  },
});

export default UserContactStyles;
