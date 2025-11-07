import { StyleSheet } from "react-native";
import { COLORS, FF, FS } from "../../../constants";

const feedbackStyle = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      // padding: 16,
    },
    section: {
      marginBottom: 24,
    },
    inputContainer: {
      marginBottom: 16,
    },
    inputLabel: {
      fontSize: FS.FS18,
      fontFamily:FF[400],
      color:COLORS.BLACK,
      marginTop:20
    },
    textInput: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 12,
      fontSize: 16,
      backgroundColor: '#fff',
      color: '#333',
      marginTop:24
    },
    messageInput: {
      height: 120,
      textAlignVertical: 'top',
    },
    uploadButton: {
      borderWidth: 1,
      borderColor: COLORS.BORDER_GREY,
      borderRadius: 8,
      borderStyle: 'dashed',
      paddingVertical: 16,
      paddingHorizontal: 12,
      backgroundColor: '#F9FAFB',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 12,
    },
    uploadButtonText: {
      fontSize: FS.FS16,
      fontFamily: FF[500],
      color: COLORS.GREY_TEXT,
    },
    imageNameContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ddd',
      backgroundColor: '#fff',
      paddingVertical: 12,
      paddingHorizontal: 12,
    },
    imageName: {
      flex: 1,
      fontSize: FS.FS14,
      fontFamily: FF[400],
      color: COLORS.BLACK,
      marginRight: 8,
    },
    removeImageButton: {
      // backgroundColor: '#FF4444',
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
    },
    removeImageText: {
      color: COLORS.BLACK,
      fontSize: FS.FS16,
      fontFamily: FF[600],
    },
    submitSection: {
      marginTop: 24,
      marginBottom: 32,
      alignItems:'center'
    },
  });

export default feedbackStyle;