import { StyleSheet } from "react-native";
import { COLORS, FF, FS } from "../../../constants";

const HomeStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    menuItem: {
        alignItems: 'center',
        paddingVertical: 10,
        width: '25%',
        alignContent: 'center',
        marginBottom: 12,
    },
    menuIcon: {
        height: 50,
        width: 50,
    },
    menuLabel: {
        fontSize: FS.FS11,
        fontFamily: FF[500],
        color: COLORS.BLACK,
        marginTop: 6,
        textAlign: 'center',
    },
    menuGrid: {
        paddingHorizontal: 8,
    },
    header: {
        paddingTop: 40,
        paddingBottom: 20,
    },
    headerTitle: {
        fontSize: FS.FS22,
        color: COLORS.BLACK,
        fontFamily: FF[600],
    },
    headerSubtitle: {
        fontSize: FS.FS14,
        color: COLORS.GREY_TEXT,
        fontFamily: FF[400],
        marginTop: 4,
    },
    noticeCard: {
        backgroundColor: '#FFF3E0',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        borderLeftWidth: 4,
    },
    noticeCardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    noticeCardContent: {
        flex: 1,
    },
    noticeLabel: {
        fontSize: 12,
        color: COLORS.GREY_TEXT,
        marginBottom: 4,
    },
    noticeTitle: {
        fontSize: 16,
        fontFamily: FF[600],
        color: COLORS.BLACK,
        marginBottom: 4,
    },
    noticeDate: {
        fontSize: 12,
        color: COLORS.GREY_TEXT,
    },
    noticeArrow: {
        width: 20,
        height: 20,
        tintColor: COLORS.GREY_TEXT,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: FS.FS18,
        fontFamily: FF[600],
        color: COLORS.BLACK,
        marginBottom: 16,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    statsCard: {
        backgroundColor: COLORS.WHITE,
        borderRadius: 12,
        padding: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    statRowLast: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
    },
    statLabel: {
        fontSize: 14,
        color: COLORS.GREY_TEXT,
        fontFamily: FF[400],
    },
    statValueRed: {
        fontSize: 16,
        color: '#F44336',
        fontFamily: FF[600],
    },
    statValueOrange: {
        fontSize: 16,
        color: '#FF9800',
        fontFamily: FF[600],
    },
    statValueGreen: {
        fontSize: 16,
        color: '#4CAF50',
        fontFamily: FF[600],
    },
});

export default HomeStyles;