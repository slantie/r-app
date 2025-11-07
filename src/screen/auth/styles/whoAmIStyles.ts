import { StyleSheet } from "react-native";
import { COLORS, FF, FS } from "../../../constants";

const WhoAmIStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        height: 50,
        width: 50,
        resizeMode: 'contain'
    },
    logoContainer: {
        marginTop: '20%',
        alignSelf: 'center'
    },
    titleContainer:{
        marginTop:'15%',
        alignItems:'center'
    },
    title:{
        fontSize:FS.FS22,
        fontFamily:FF[500],
        color:COLORS.BLACK
    },
    subtitle:{
        fontSize:FS.FS12,
        fontFamily:FF[300],
        color:COLORS.BLACK,
        textAlign:'center',
        marginTop:10
    }
});

export default WhoAmIStyles;