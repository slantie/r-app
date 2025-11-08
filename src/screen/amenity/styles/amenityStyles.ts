import { StyleSheet } from 'react-native';
import { COLORS, FF, FS } from '../../../constants';

const amenityStyles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
    backgroundColor: COLORS.BG_GREY,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: COLORS.DARK_BLUE,
  },
  tabText: {
    fontFamily: FF[500],
    fontSize: FS.FS14,
    color: COLORS.GREY_TEXT,
  },
  activeTabText: {
    fontFamily: FF[600],
    color: COLORS.DARK_BLUE,
  },
  tabBadge: {
    fontFamily: FF[700],
    fontSize: FS.FS12,
    color: COLORS.WHITE,
    backgroundColor: '#F44336',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontFamily: FF[500],
    fontSize: FS.FS14,
    color: COLORS.GREY_TEXT,
  },

  // Amenity Card Styles
  amenityCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  amenityHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  amenityIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  amenityIcon: {
    fontSize: 28,
  },
  amenityInfo: {
    flex: 1,
    marginRight: 8,
  },
  amenityName: {
    fontFamily: FF[600],
    fontSize: FS.FS16,
    color: COLORS.BLACK_TEXT,
    marginBottom: 4,
  },
  amenityDescription: {
    fontFamily: FF[400],
    fontSize: FS.FS13,
    color: COLORS.GREY_TEXT,
    lineHeight: 18,
  },
  availableBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  availableText: {
    fontFamily: FF[600],
    fontSize: FS.FS11,
    color: '#4CAF50',
  },
  unavailableBadge: {
    backgroundColor: '#FFEBEE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  unavailableText: {
    fontFamily: FF[600],
    fontSize: FS.FS11,
    color: '#F44336',
  },
  amenityDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  detailText: {
    fontFamily: FF[400],
    fontSize: FS.FS12,
    color: COLORS.GREY_TEXT,
  },
  bookButton: {
    backgroundColor: COLORS.DARK_BLUE,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    fontFamily: FF[600],
    fontSize: FS.FS14,
    color: COLORS.WHITE,
  },

  // Booking Card Styles
  bookingCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookingHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  bookingIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bookingIcon: {
    fontSize: 24,
  },
  bookingInfo: {
    flex: 1,
    marginRight: 8,
  },
  bookingAmenityName: {
    fontFamily: FF[600],
    fontSize: FS.FS15,
    color: COLORS.BLACK_TEXT,
    marginBottom: 4,
  },
  bookingDate: {
    fontFamily: FF[400],
    fontSize: FS.FS13,
    color: COLORS.GREY_TEXT,
    marginBottom: 2,
  },
  bookingTime: {
    fontFamily: FF[400],
    fontSize: FS.FS13,
    color: COLORS.GREY_TEXT,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusUpcoming: {
    backgroundColor: '#E3F2FD',
  },
  statusCompleted: {
    backgroundColor: '#E8F5E9',
  },
  statusCancelled: {
    backgroundColor: '#FFEBEE',
  },
  statusText: {
    fontFamily: FF[600],
    fontSize: FS.FS11,
  },
  bookingFooter: {
    gap: 8,
  },
  bookingDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookingDetailLabel: {
    fontFamily: FF[400],
    fontSize: FS.FS13,
    color: COLORS.GREY_TEXT,
  },
  bookingDetailValue: {
    fontFamily: FF[500],
    fontSize: FS.FS13,
    color: COLORS.BLACK_TEXT,
  },
  bookingAmountValue: {
    fontFamily: FF[700],
    fontSize: FS.FS15,
    color: COLORS.DARK_BLUE,
  },

  // Empty State Styles
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
    fontFamily: FF[600],
    fontSize: FS.FS16,
    color: COLORS.BLACK_TEXT,
    marginBottom: 8,
  },
  emptySubText: {
    fontFamily: FF[400],
    fontSize: FS.FS14,
    color: COLORS.GREY_TEXT,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});

export default amenityStyles;
