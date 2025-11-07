import { StyleSheet } from 'react-native';
import { COLORS, FF, FS } from '../../../constants';

const ContactStyles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
  searchContainer: {
    marginTop: 16,
  },
  contactSyncContainer: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  contactCardContainer: {
    marginTop: 16,
    // marginHorizontal:16
  },
  // New styles for contact list
  scrollContainer: {
    flex: 1,
  },
  sectionHeader: {
    // paddingHorizontal: 16,
    // paddingVertical: 12,
    // backgroundColor: COLORS.BG_GREY,
    marginTop: 16,
    // borderTopLeftRadius: 12,
    // borderTopRightRadius: 12,
  },
  sectionHeaderText: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.GREY_TEXT,
  },
  contactItem: {
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    flexDirection: 'row',
    // marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 14,
    // borderTopWidth: 0,
  },
  contactAvatar: {
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    borderRadius: 100,
    padding: 10,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactAvatarText: {
    fontSize:FS.FS24,color:COLORS.BLACK_TEXT,fontFamily:FF[600]
    // style={{fontSize:FS.FS24,color:COLORS.BLACK_TEXT,fontFamily:FF[600]}}
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
    paddingLeft:12,
    // paddingHorizontal: 12,
  },
  contactName: {
    fontSize: FS.FS18,
    fontFamily: FF[500],
    color: COLORS.BLACK,
  },
  contactStatus: {
    fontSize: FS.FS16,
    fontFamily: FF[500],
  },
  registeredStatus: {
    color: COLORS.BLACK_TEXT,
  },
  inviteStatus: {
    color: COLORS.IOS_BLUE,
  },
  addContactStatus: {
    color: COLORS.IOS_BLUE,
  },
  bottomPadding: {
    height: 20,
  },
  flatListFooter: {
    height: 16,
  },
  // New styles for invite buttons
  inviteButton: {
    flex: 0.2,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: COLORS.IOS_BLUE + '10', // Light blue background
    justifyContent: 'center',
    alignItems: 'center',
  },
  inviteButtonText: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.IOS_BLUE,
    textAlign: 'center',
  },
  inviteButtonPressed: {
    backgroundColor: COLORS.IOS_BLUE + '20', // Slightly darker when pressed
  },
  // Header action styles
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  bulkInviteButton: {
    backgroundColor: COLORS.IOS_BLUE,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bulkInviteButtonText: {
    fontSize: FS.FS14,
    fontFamily: FF[600],
    color: COLORS.WHITE,
  },
});

export default ContactStyles;
