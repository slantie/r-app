import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants";
import { FS, LH, FF } from "../../../constants/fonts";
import { width } from "../../../utils/responsiveStyle";

const OtpScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header:{
        alignItems:'center',
        marginTop:44
    },
    logo:{
        width:50,
        height:50,
        resizeMode:'contain',
        marginTop:'12%'
    },
    titleContainer:{
        marginTop:'15%',
        alignItems:'center',
        // flex:1
    },
    title:{
        fontSize: FS.FS22,
        fontFamily: FF[500],
        color: COLORS.BLACK,
        lineHeight: LH.LH28,
    },
    subtitle:{
            fontSize: FS.FS12,
            fontFamily: FF[300],
            color: COLORS.BLACK,
            lineHeight: LH.LH16,
            marginTop:8
    },
    mobileContainer:{
        flexDirection:'row',
        alignItems:'center',
        // justifyContent:'space-between',
        marginTop:'15%',
        paddingHorizontal:20,
        // borderWidth:1,
        justifyContent:'center',

        marginHorizontal:36
    },
    mobileText:{
        fontSize: FS.FS16,
        fontFamily: FF[400],
        color: COLORS.BLACK,
        lineHeight: LH.LH24,
    },
    editIcon:{
        width:20,
        height:20
    },
    otpCell: {
        // borderWidth: 1,
        height: 50,
        borderRadius: 10,
        width:width/6-20,
        marginHorizontal:5,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#F6F6F6'
    },
    otpCellText: {
        fontSize:FS.FS16,
        color:COLORS.BLACK,
        fontFamily:FF[400],
        textAlign:'center',
        lineHeight:LH.LH30,
    },
    timer:{
        fontSize:FS.FS14,
        color:COLORS.BLACK,
        fontFamily:FF[300],
        textAlign:'right',
        lineHeight:LH.LH16,
        marginTop:10,
marginRight:20

    },
    resendContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginTop:'10%'
    },
    resendText:{
        fontSize:FS.FS14,
        color:COLORS.BLACK,
        fontFamily:FF[300],
        lineHeight:LH.LH16,
        marginRight:10
    },
    resendButtonText:{
        fontSize:FS.FS14,
        color:COLORS.ERROR_COLOR,
        fontFamily:FF[600],
        lineHeight:LH.LH16,
        marginRight:10
    }


});

export default OtpScreenStyles;