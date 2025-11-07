import { StyleSheet } from "react-native";
import { COLORS, FF, FS, } from "../../../constants";

const HomeStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    menuItem: {
        alignItems: 'center',
        paddingVertical: 10,
        width: '33%',
        alignContent:'center',
    },
    menuIcon: {
        height: 70,
        width: 70,
    },
    menuLabel: {
        fontSize: FS.FS12,
        fontFamily: FF[500],
        color: COLORS.BLACK,
        marginTop: 8
    },
    menuGrid: {
    }
});

export default HomeStyles;