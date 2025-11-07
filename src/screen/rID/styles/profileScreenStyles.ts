import { StyleSheet } from "react-native";
import { COLORS, FF, FS, LH } from "../../../constants";

const ProfileScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
    },

      // Personal Details Styles
      personalDetailsContainer: {
        paddingHorizontal: 16,
        zIndex:999999,
        backgroundColor: COLORS.WHITE,
      },
      inputWrapper: {
        marginTop: 16,
      },
      firstInputWrapper: {
        // No margin top for first input
      },
      genderContainer: {
        marginTop: 16,
      },
      genderLabel: {
        fontSize: FS.FS14,
        fontFamily: FF[400],
        color: COLORS.GREY_TEXT,
        lineHeight: LH.LH20,
      },
      genderOptionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
      },
      genderOption: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      genderOptionFemale: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 16,
      },
      radioButton: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: COLORS.BLACK,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      radioButtonSelected: {
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: COLORS.BLACK,
      },
      genderText: {
        marginLeft: 8,
        fontSize: FS.FS14,
        fontFamily: FF[400],
        color: COLORS.BLACK,
      },
      dobContainer: {
        marginTop: 14,
      },
      dobButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.BORDER_GREY,
      },
      dobText: {
        fontSize: FS.FS16,
        fontFamily: FF[400],
        color: COLORS.GREY_TEXT,
        lineHeight: LH.LH20,
      },
      calendarIcon: {
        width: 20,
        height: 20,
      },
      nationalityContainer: {
        marginTop: 16,
      },
      nationalityButton: {
        paddingVertical: 14,
        paddingHorizontal:10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.BORDER_GREY,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      nationalityText: {
        fontSize: FS.FS16,
        fontFamily: FF[400],
        lineHeight: LH.LH20,
      },
      nationalityTextSelected: {
        color: COLORS.BLACK,
      },
      nationalityTextPlaceholder: {
        color: COLORS.GREY_TEXT,
      },
      dropdownArrow: {
        fontSize: 12,
        color: COLORS.GREY_TEXT,
      },
      submitButton: {
        marginTop: 16,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        alignSelf: 'center',
        paddingHorizontal: 50,
      },
      submitButtonText: {
        fontSize: FS.FS14,
        fontFamily: FF[400],
        // color: COLORS.IOS_BLUE,
        color: COLORS.BLACK
      },

      // Profile Image Styles
      profileImageSection: {
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: COLORS.WHITE,
      },
      profileImageContainer: {
        position: 'relative',
      },
      profileImageWrapper: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: COLORS.LIGHT_GRAY,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      },
      profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
      },
      profileImageDefault: {
        width: 80,
        height: 80,
      },
      cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: COLORS.WHITE,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: COLORS.LIGHT_GRAY,
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      cameraIcon: {
        width: 20,
        height: 20,
      },

      // Section Header Styles
      sectionHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 18,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.BORDER_GREY,
        backgroundColor: COLORS.WHITE,
      },
      sectionHeaderText: {
        fontSize: FS.FS15,
        fontFamily: FF[400],
        color: COLORS.BLACK,
      },
      sectionHeaderArrow: {
        fontSize: 18,
        color: COLORS.BLACK,
      },

      // Main Container Styles
      mainContainer: {
        backgroundColor: COLORS.WHITE,
        flex: 1,
        paddingHorizontal: 0,
      },
      keyboardAvoidingView: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
      },
      personalDetailsSection: {
        marginTop: 20,
        backgroundColor: COLORS.WHITE,
      },

      // Country Picker Modal Styles
      countryPickerModal: {
        height: "80%",
        backgroundColor: COLORS.WHITE,
      },
});

export default ProfileScreenStyles;