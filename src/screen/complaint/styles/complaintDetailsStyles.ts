import { StyleSheet } from 'react-native';
import { COLORS, FF, FS } from '../../../constants';

const complaintDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG_GREY,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 16,
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontFamily: FF[500],
    fontSize: FS.FS16,
    color: COLORS.GREY_TEXT,
    textAlign: 'center',
  },
  emptySubText: {
    fontFamily: FF[400],
    fontSize: FS.FS14,
    color: COLORS.LIGHT_GRAY,
    textAlign: 'center',
    marginTop: 8,
  },

  // Header Section
  headerSection: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    marginBottom: 12,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconTitleRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  categoryIconLarge: {
    fontSize: 48,
    marginRight: 16,
  },
  titleColumn: {
    flex: 1,
  },
  complaintTitle: {
    fontFamily: FF[700],
    fontSize: FS.FS20,
    color: COLORS.BLACK_TEXT,
    marginBottom: 6,
  },
  categoryText: {
    fontFamily: FF[500],
    fontSize: FS.FS14,
    color: COLORS.GREY_TEXT,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  priorityText: {
    fontFamily: FF[700],
    fontSize: FS.FS11,
    letterSpacing: 0.5,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 8,
  },
  statusText: {
    fontFamily: FF[700],
    fontSize: FS.FS11,
    letterSpacing: 0.5,
  },
  escalationWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  escalationIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  escalationText: {
    flex: 1,
    fontFamily: FF[600],
    fontSize: FS.FS13,
    color: '#C62828',
  },

  // Section
  section: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontFamily: FF[700],
    fontSize: FS.FS16,
    color: COLORS.BLACK_TEXT,
    marginBottom: 12,
  },
  descriptionText: {
    fontFamily: FF[400],
    fontSize: FS.FS14,
    color: COLORS.GREY_TEXT,
    lineHeight: 22,
  },

  // Timeline
  timelineContainer: {
    paddingLeft: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
    position: 'relative',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E65100',
    marginRight: 16,
    marginTop: 4,
  },
  timelineDotBlue: {
    backgroundColor: '#1565C0',
  },
  timelineDotGreen: {
    backgroundColor: '#2E7D32',
  },
  timelineContent: {
    flex: 1,
  },
  timelineLabel: {
    fontFamily: FF[600],
    fontSize: FS.FS14,
    color: COLORS.BLACK_TEXT,
    marginBottom: 4,
  },
  timelineDate: {
    fontFamily: FF[500],
    fontSize: FS.FS13,
    color: COLORS.GREY_TEXT,
    marginBottom: 2,
  },
  timelineSubtext: {
    fontFamily: FF[400],
    fontSize: FS.FS12,
    color: COLORS.LIGHT_GRAY,
  },

  // Resolution
  resolutionCard: {
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2E7D32',
  },
  resolutionText: {
    fontFamily: FF[400],
    fontSize: FS.FS14,
    color: '#1B5E20',
    lineHeight: 20,
  },

  // Attachments
  attachmentsContainer: {
    flexDirection: 'column',
  },
  attachmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  attachmentIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  attachmentText: {
    flex: 1,
    fontFamily: FF[400],
    fontSize: FS.FS13,
    color: COLORS.BLACK_TEXT,
  },

  // Action Section
  actionSection: {
    marginTop: 8,
    marginBottom: 12,
  },
  changeStatusButton: {
    backgroundColor: COLORS.DARK_BLUE,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: COLORS.DARK_BLUE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  changeStatusButtonText: {
    fontFamily: FF[600],
    fontSize: FS.FS15,
    color: COLORS.WHITE,
    letterSpacing: 0.5,
  },

  bottomSpacer: {
    height: 20,
  },
});

export default complaintDetailsStyles;
