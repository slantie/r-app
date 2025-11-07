import { StyleSheet } from "react-native";
import { COLORS, FF, FS } from "../../../constants";

const AddLeadModalStyles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
      },
      container: {
        backgroundColor: COLORS.WHITE,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 34,
        minHeight: 250,
        maxHeight:'80%'
      },
      handle: {
        width: 40,
        height: 4,
        backgroundColor: COLORS.BORDER_GREY,
        borderRadius: 2,
        alignSelf: 'center',
        marginTop: 12,
        marginBottom: 8,
      },
      content: {
        paddingHorizontal: 24,
        paddingTop: 16,
      },
      title: {
        fontSize: FS.FS18,
        fontFamily: FF[600],
        color: COLORS.BLACK_TEXT,
        marginBottom: 24,
        textAlign: 'center',
      },
      optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
      },
      optionIcon: {
        width: 24,
        height: 24,
        marginRight: 15,
        resizeMode: 'contain',
      },
      optionText: {
        fontSize: FS.FS16,
        fontFamily: FF[400],
        color: COLORS.BLACK_TEXT,
        flex: 1,
      },
      divider: {
        height: 1,
        backgroundColor: COLORS.BORDER_GREY,
        marginVertical: 5,
      },
      optionContainer:{
        // borderWidth:1,
        backgroundColor:COLORS.BG_GREY,
        padding:16,
        borderRadius:20
      },
      // Radio Button Styles
      sectionContainer: {
        marginTop: 24,
        marginBottom: 16,
      },
      sectionTitle: {
        fontSize: FS.FS16,
        fontFamily: FF[600],
        color: COLORS.BLACK_TEXT,
        marginBottom: 16,
      },
      radioGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
      },
      radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 24,
        marginBottom: 12,
      },
      radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.BORDER_GREY,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
      },
      radioButtonInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: COLORS.BLACK_TEXT,
      },
      radioText: {
        fontSize: FS.FS14,
        fontFamily: FF[400],
        color: COLORS.BLACK_TEXT,
      },
});

export default AddLeadModalStyles;