import { StyleSheet } from "react-native";
import { COLORS, FF, FS, LH } from "../../../constants";

const DeskStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  borderContainer: {
    // padding: 16, // Border thickness
    borderRadius: 16,
    opacity:0.8,
    overflow:'hidden'
    // margin: 16,
  },
  innerContainer: {
    borderRadius: 14,
    padding: 2,
    overflow:'hidden'
    // margin :16
  },
  projectTag: {
    backgroundColor: '#E8FFF0',
    color: '#34A853',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    fontSize: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  name: {
    marginTop: 12,
    fontSize:FS.FS16,
    fontFamily:FF[500],
    color:COLORS.GREY_TEXT,
    // lineHeight:LH.LH27
  },
  phone: {
    fontSize:FS.FS18,
    fontFamily:FF[400],
    color:COLORS.GREY_TEXT,
    marginTop:6
    // color: '#333',
    // marginBottom: 10,
  },
  icons: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  item: {
    fontSize:FS.FS12,
    fontFamily:FF[400],
    color:COLORS.GREY_TEXT,
    // lineHeight:LH.LH22
  },
  // Project Lead Card Styles
  projectLeadCard: {
    marginTop: 16,
    padding: 16,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: COLORS.BORDER_GREY,
    backgroundColor: COLORS.WHITE,
  },
  tagContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  projectTagStyle: {
    paddingHorizontal: 13,
    paddingVertical: 5,
    borderRadius: 16,
    backgroundColor: COLORS.OCEAN_BLUE_BG,
    borderColor: COLORS.OCEAN_BLUE_BORDER,
    borderWidth: 1,
  },
  hotTagStyle: {
    paddingHorizontal: 13,
    paddingVertical: 5,
    borderRadius: 16,
    
    borderWidth: 1,
  },
  projectTagText: {
    fontSize: FS.FS16,
    fontFamily: FF[500],
    color: COLORS.OCEAN_BLUE_TEXT,
  },
  hotTagText: {
    fontSize: FS.FS16,
    fontFamily: FF[500],
    color: COLORS.GREY_TEXT,
  },
  divider: {
    borderBottomWidth: 0.5,
    borderColor: COLORS.BORDER_GREY,
    paddingVertical: 5,
  },
  itemWithMargin: {
    marginTop: 10,
  },
  nameWithMargin: {
    marginTop: 6,
  },
  // Header Styles
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1000,
  },
  headerRightContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 1000,
  },
  dropdownButton: {
    paddingHorizontal: 10,
  },
  dropdownIcon: {
    width: 24,
    height: 24,
  },
  // Search and Button Styles
  searchContainer: {
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  // Loading and Error States
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  loadingText: {
    marginTop: 10,
    fontSize: FS.FS16,
    fontFamily: FF[400],
  },
  errorText: {
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.ERROR_COLOR,
  },
  noDataText: {
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
  },
  // FlatList Styles
  flatListContainer: {
    paddingBottom: 20,
  },
  totalLeadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'flex-end',
  },
  totalLeadText: {
    fontSize: FS.FS16,
    color: COLORS.BLACK,
    fontFamily: FF[400],
    lineHeight:LH.LH24,
  },
  totalLeadValue: {
    fontSize: FS.FS16,
    fontFamily: FF[400],
    color: COLORS.GREY_TEXT,
  },
  addImg: {
    height: 30,
    width: 30
},
menuOptions: {
    width: 200,
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.LIGHT_GRAY,
    padding: 5,
    position: 'absolute',
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    minHeight: 40,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    // borderWidth:1
  },
  userDeleteTxt: {
    fontSize: FS.FS14,
    color: COLORS.ERROR_COLOR,
    fontFamily: FF[400],
    paddingHorizontal: 15,
    paddingVertical: 2,
    marginTop: 3
    // marginTop:5
  },
  // Land Card Styles
  landTagStyle: {
    paddingHorizontal: 13,
    paddingVertical: 5,
    borderRadius: 16,
    backgroundColor: COLORS.LIGHT_BLUE,
    borderColor: COLORS.BLUE_TEXT,
    borderWidth: 1,
  },
  landTagText: {
    fontSize: FS.FS16,
    fontFamily: FF[500],
    color: COLORS.BLUE_TEXT,
  },
  phoneContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  contactIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  whatsappIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.GREEN_TEXT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.LIGHT_GREEN,
    justifyContent: 'center',
    alignItems: 'center',
  },
  landInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  landInfoItem: {
    flex: 1,
  },
});

export default DeskStyles;