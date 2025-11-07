import { StyleSheet } from "react-native";
import { COLORS, FF, FS } from "../../../constants";

const ProfileStyles = StyleSheet.create({
    container: {
        flex: 1,

    },
    profileImage: {
        height: 55,
        width: 55
    },
    profileContainer: {
        padding: 12,
        backgroundColor: COLORS.BORDER_GREY,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 44,
        alignSelf: 'center',
    },
    cemera:{
        height:20,
        width:20,
        resizeMode:'contain'
    },
    setupProfile:{
        fontSize:FS.FS18,
       fontFamily:FF[500],
        color:COLORS.BLACK_TEXT
    },
    cameraIconContainer: {
        position: 'absolute',
        bottom: -10,
        right: -10,
        borderRadius: 50,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    selectedImageWrapper: {
        padding: 16,
        borderRadius: 100,
        alignSelf: 'center',
        marginTop: '10%',
    },
    selectedImage: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    editCameraIcon: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        borderRadius: 30,
        padding: 5,
    },
    smallCamera: {
        width: 25,
        height: 25,
    }
});

export default ProfileStyles;