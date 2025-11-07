import { StyleSheet } from "react-native";
import { COLORS, FS, FF } from "../../../constants";

const AddProjectLeadStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
        paddingHorizontal: 20,
        paddingTop: 24,
    },

    // Tab Styles
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 32,
        backgroundColor: COLORS.BG_GREY,
        borderRadius: 8,
        padding: 4,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 6,
    },
    activeTab: {
        backgroundColor: COLORS.WHITE,
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    tabText: {
        fontSize: FS.FS14,
        fontFamily: FF[500],
        color: COLORS.GREY_TEXT,
    },
    activeTabText: {
        color: COLORS.BLACK_TEXT,
        fontFamily: FF[600],
    },

    // Form Styles
    inputContainer: {
        marginBottom: 24,
    },

    // Radio Button Styles
    radioContainer: {
        marginBottom: 24,
    },
    radioLabel: {
        fontSize: FS.FS16,
        fontFamily: FF[400],
        color: COLORS.GREY_TEXT,
        marginBottom: 16,
    },
    radioGroup: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 32,
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

    // Button Styles
    buttonContainer: {
        // paddingVertical: 20,
        // paddingHorizontal: 20,
        // marginHorizontal: -20,
        // backgroundColor: COLORS.WHITE,
        // borderTopWidth: 1,
        // borderTopColor: COLORS.BORDER_GREY,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: COLORS.WHITE,
        alignItems: 'center',
    },
    step2ButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    backButton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderWidth: 1,
        borderColor: COLORS.BORDER_GREY,
        borderRadius: 8,
        marginRight: 12,
    },
    backButtonText: {
        fontSize: FS.FS16,
        fontFamily: FF[500],
        color: COLORS.BLACK_TEXT,
    },
    submitButtonWrapper: {
        flex: 1,
    },
    disclaimer: {
        fontSize: FS.FS12,
        fontFamily: FF[400],
        color: COLORS.GREY_TEXT,
        textAlign: 'center',
        lineHeight: 16,
        marginTop: 16,
    },

    // Error Text Styles
    errorText: {
        fontSize: FS.FS12,
        fontFamily: FF[400],
        color: COLORS.ERROR_COLOR,
        marginTop: 4,
        marginLeft: 4,
    },
});

export default AddProjectLeadStyles;