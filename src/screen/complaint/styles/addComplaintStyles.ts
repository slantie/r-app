import { StyleSheet } from 'react-native';
import { COLORS, FF, FS } from '../../../constants';

const addComplaintStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG_GREY,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 16,
  },

  // Section
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontFamily: FF[600],
    fontSize: FS.FS15,
    color: COLORS.BLACK_TEXT,
    marginBottom: 12,
  },
  required: {
    color: '#C62828',
  },

  // Category Selection
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  categoryCard: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 12,
    margin: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryCardActive: {
    borderColor: COLORS.DARK_BLUE,
    backgroundColor: '#E3F2FD',
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryLabel: {
    fontFamily: FF[500],
    fontSize: FS.FS13,
    color: COLORS.GREY_TEXT,
    textAlign: 'center',
  },
  categoryLabelActive: {
    fontFamily: FF[600],
    color: COLORS.DARK_BLUE,
  },

  // Priority Selection
  priorityRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  priorityChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: COLORS.WHITE,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    margin: 4,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  priorityText: {
    fontFamily: FF[600],
    fontSize: FS.FS13,
    color: COLORS.GREY_TEXT,
  },

  // Input Fields
  input: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    padding: 14,
    fontFamily: FF[400],
    fontSize: FS.FS14,
    color: COLORS.BLACK_TEXT,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  textArea: {
    minHeight: 120,
    paddingTop: 14,
  },
  charCount: {
    fontFamily: FF[400],
    fontSize: FS.FS12,
    color: COLORS.LIGHT_GRAY,
    marginTop: 6,
    textAlign: 'right',
  },

  // Info Box
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    padding: 14,
    borderRadius: 10,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.DARK_BLUE,
  },
  infoIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontFamily: FF[400],
    fontSize: FS.FS13,
    color: '#1565C0',
    lineHeight: 19,
  },

  // Submit Button
  submitButton: {
    backgroundColor: COLORS.DARK_BLUE,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: COLORS.DARK_BLUE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitButtonDisabled: {
    backgroundColor: COLORS.LIGHT_GRAY,
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    fontFamily: FF[600],
    fontSize: FS.FS16,
    color: COLORS.WHITE,
    letterSpacing: 0.5,
  },

  bottomSpacer: {
    height: 24,
  },
});

export default addComplaintStyles;
