import { StyleSheet } from "react-native";
import COLORS from "../../../constants/colors";
import { FS, LH, FF } from "../../../constants/fonts";

const InformationCardStyles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.WHITE,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderLeftWidth: 2,
        borderLeftColor: COLORS.LIGHT_BLUE,
        shadowColor: COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        position: 'relative',
        overflow: 'hidden',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    projectTag: {
        backgroundColor: COLORS.LIGHT_GREEN,
        paddingHorizontal: 13,
        paddingVertical: 5,
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: COLORS.LIGHT_BORDER_GREEN,
    },
    projectTagText: {
        fontSize: FS.FS16,
        fontFamily: FF[500],
        color: COLORS.GREEN_TEXT,
        lineHeight: LH.LH16,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    actionButton: {
        width: 34,
        height: 32,
        borderRadius: 8,
        backgroundColor: COLORS.BG_GREY,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionIcon: {
        width: 16,
        height: 16,
        tintColor: COLORS.GREY_TEXT,
    },
    contactName: {
        fontSize: FS.FS20,
        fontFamily: FF[500],
        color: COLORS.BLACK_TEXT,
        marginBottom: 4,
        lineHeight: LH.LH27,
    },
    contactEmail: {
        fontSize: FS.FS14,
        fontFamily: FF[400],
        color: COLORS.GREY_TEXT,
        marginBottom: 8,
        lineHeight: LH.LH27,
    },
    phoneContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    phoneNumber: {
        fontSize: FS.FS14,
        fontFamily: FF[400],
        color: COLORS.BLACK_TEXT,
        lineHeight: LH.LH27,
    },
    phoneActions: {
        flexDirection: 'row',
        gap: 8,
    },
    phoneButton: {
        width: 39,
        height: 39,
        borderRadius: 20,
        backgroundColor: COLORS.BG_GREY,
        justifyContent: 'center',
        alignItems: 'center',
    },
    phoneIcon: {
        width: 16,
        height: 16,
        tintColor: COLORS.BLUE_TEXT,
    },
    sourceText: {
        fontSize: FS.FS14,
        fontFamily: FF[400],
        color: COLORS.GREY_TEXT,
        lineHeight: LH.LH27,
    },
});

export default InformationCardStyles;
