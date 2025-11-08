import { StyleSheet } from 'react-native';
import { COLORS, FF, FS } from '../../../constants';

const complaintStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG_GREY,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listContentEmpty: {
    flex: 1,
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

  // Tab Container
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 4,
    marginVertical: 16,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: COLORS.DARK_BLUE,
  },
  tabText: {
    fontFamily: FF[500],
    fontSize: FS.FS14,
    color: COLORS.GREY_TEXT,
  },
  activeTabText: {
    color: COLORS.WHITE,
    fontFamily: FF[600],
  },

  // Complaint Card
  complaintCard: {
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    marginRight: 8,
  },
  categoryIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  titleSection: {
    flex: 1,
  },
  complaintTitle: {
    fontFamily: FF[600],
    fontSize: FS.FS16,
    color: COLORS.BLACK_TEXT,
    marginBottom: 4,
  },
  categoryLabel: {
    fontFamily: FF[400],
    fontSize: FS.FS12,
    color: COLORS.GREY_TEXT,
  },

  // Priority Badge
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  priorityUrgent: {
    backgroundColor: '#FFEBEE',
  },
  priorityHigh: {
    backgroundColor: '#FFF3E0',
  },
  priorityMedium: {
    backgroundColor: '#E3F2FD',
  },
  priorityLow: {
    backgroundColor: '#F1F8E9',
  },
  priorityText: {
    fontFamily: FF[700],
    fontSize: FS.FS10,
    letterSpacing: 0.5,
  },
  priorityTextUrgent: {
    color: '#C62828',
  },
  priorityTextHigh: {
    color: '#E65100',
  },
  priorityTextMedium: {
    color: '#1565C0',
  },
  priorityTextLow: {
    color: '#558B2F',
  },

  // Description
  description: {
    fontFamily: FF[400],
    fontSize: FS.FS14,
    color: COLORS.GREY_TEXT,
    lineHeight: 20,
    marginBottom: 12,
  },

  // Meta Info
  metaInfo: {
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  metaLabel: {
    fontFamily: FF[400],
    fontSize: FS.FS13,
    color: COLORS.GREY_TEXT,
  },
  metaValue: {
    fontFamily: FF[500],
    fontSize: FS.FS13,
    color: COLORS.BLACK_TEXT,
  },

  // Card Footer
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
  },
  statusSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    flexWrap: 'wrap',
  },

  // Status Badge
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    marginRight: 8,
  },
  statusOpen: {
    backgroundColor: '#FFF3E0',
  },
  statusInProgress: {
    backgroundColor: '#E3F2FD',
  },
  statusResolved: {
    backgroundColor: '#E8F5E9',
  },
  statusClosed: {
    backgroundColor: '#F5F5F5',
  },
  statusText: {
    fontFamily: FF[600],
    fontSize: FS.FS11,
    letterSpacing: 0.3,
  },
  statusTextOpen: {
    color: '#E65100',
  },
  statusTextInProgress: {
    color: '#1565C0',
  },
  statusTextResolved: {
    color: '#2E7D32',
  },
  statusTextClosed: {
    color: '#616161',
  },

  // Escalation Badge
  escalationBadge: {
    backgroundColor: '#FFEBEE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  escalationText: {
    fontFamily: FF[600],
    fontSize: FS.FS11,
    color: '#C62828',
  },

  // Action Buttons
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  viewButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.DARK_BLUE,
    borderRadius: 8,
    marginLeft: 8,
  },
  viewButtonText: {
    fontFamily: FF[600],
    fontSize: FS.FS13,
    color: COLORS.WHITE,
  },
  deleteButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
    marginLeft: 8,
  },
  deleteButtonText: {
    fontFamily: FF[600],
    fontSize: FS.FS13,
    color: '#C62828',
  },

  // FAB Button
  fabButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.DARK_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  fabIcon: {
    fontSize: 28,
    color: COLORS.WHITE,
    fontFamily: FF[300],
  },
});

export default complaintStyles;
