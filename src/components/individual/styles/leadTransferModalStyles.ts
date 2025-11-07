import { StyleSheet } from "react-native";
import { COLORS, FF, FS } from "../../../constants";

const LeadTransferModalStyles = StyleSheet.create({
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
      optionContainer:{
        // borderWidth:1,
        // backgroundColor:COLORS.BG_GREY,
        // padding:16,
        borderRadius:20
      },
      questionText: {
        fontSize: FS.FS16,
        fontFamily: FF[500],
        color: COLORS.BLACK_TEXT,
        // marginBottom: 20,
        textAlign: 'left',
        paddingHorizontal: 16,
        // paddingVertical: 12,
        // borderWidth: 1,
        // borderColor: COLORS.BLUE_TEXT,
        // borderRadius: 8,
        // backgroundColor: COLORS.WHITE,
      },
      optionsContainer: {
        // marginTop: 16,
        // padding: 16,
        // borderWidth: 1,
        borderColor: COLORS.LIGHT_BLUE,
        // borderStyle: 'dashed',
        borderRadius: 8,
        flexDirection: 'row',
        // backgroundColor: COLORS.LIGHT_BLUE,
      },
      optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        // borderWidth:1,
        width:'30%',
        paddingVertical:16,
        marginLeft:15
        // marginBottom: 16,
      },
      radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.GREY_TEXT,
        backgroundColor: COLORS.WHITE,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
      },
      radioButtonSelected: {
        borderColor: COLORS.BLACK_TEXT,
        backgroundColor: COLORS.WHITE,
      },
      radioButtonInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: COLORS.BLACK_TEXT,
      },
      optionLabel: {
        fontSize: FS.FS14,
        fontFamily: FF[400],
        color: COLORS.GREY_TEXT,
        // flex: 1,
      },
      optionLabelSelected: {
        color: COLORS.BLACK_TEXT,
        fontFamily: FF[500],
      },
      formContainer: {
        // marginTop: 24,
      },
      fieldContainer: {
        marginBottom: 16,
      },
      fieldLabel: {
        fontSize: FS.FS14,
        fontFamily: FF[400],
        color: COLORS.GREY_TEXT,
        marginBottom: 8,
      },
      textArea: {
        minHeight: 80,
        textAlignVertical: 'top',
      },
      submitButtonContainer: {
        marginTop: 32,
        alignItems: 'center',
      },
});

export default LeadTransferModalStyles;