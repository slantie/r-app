import { StyleSheet } from "react-native";
import { COLORS, FF, FS } from "../../../constants";

const ProfileSettingStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  contentWrapper: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 24,
    paddingHorizontal: 0,
  },
  section: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: "#FBFBFB",
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREY,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  menuText: {
    fontFamily: FF[500],
    fontSize: FS.FS15,
    color: COLORS.BLACK_TEXT,
  },
  chevron: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: COLORS.GREY_TEXT,
    transform: [{ rotate: '180deg' }],
  },
  actionSection: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default ProfileSettingStyles;
