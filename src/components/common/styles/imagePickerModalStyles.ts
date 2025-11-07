import { StyleSheet } from 'react-native';
import { COLORS, FF, FS } from '../../../constants';

const ImagePickerModalStyles = StyleSheet.create({
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
  option: {
    backgroundColor: COLORS.BG_GREY,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  optionText: {
    fontSize: FS.FS16,
    fontFamily: FF[500],
    color: COLORS.BLACK_TEXT,
  },
  cancelButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginTop: 8,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: FS.FS16,
    fontFamily: FF[500],
    color: COLORS.GREY_TEXT,
  },
});

export default ImagePickerModalStyles;
