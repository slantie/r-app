import { StyleSheet } from "react-native";
import { COLORS, FF, FS } from "../../../constants";
// import { COLORS } from "../../constants";
// import { FF, FS } from "../../constants/fonts";

const ImagePickerBottomSheetStyles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    backgroundColor:"#f2f2f7",
    borderRadius: 16,
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 31,
    marginBottom: 20,
    marginHorizontal: 16
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: FS.FS16,
    fontFamily: FF[500],
    color: COLORS.BLACK,
    textAlign: "center",
  },
  closeButton: {
    fontSize: FS.FS20,
    fontFamily: FF[600],
    color: COLORS.BLACK,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_GREY,

  },
  optionText: {
    fontSize: FS.FS14,
    fontFamily: FF[500],
    color: COLORS.BLACK_TEXT,
  },
  optionIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  subContainer: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
    paddingHorizontal: 12
  }
});

export default ImagePickerBottomSheetStyles;