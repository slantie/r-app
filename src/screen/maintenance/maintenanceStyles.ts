import { StyleSheet } from 'react-native';
import { COLORS, FF, FS } from '../../constants';

const maintenanceStyles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.BG_GREY 
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listContainer: { padding: 16 },
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
  
  card: {
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
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rowSpace: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 },
  month: { 
    fontFamily: FF[600],
    fontSize: FS.FS18, 
    color: COLORS.BLACK_TEXT, 
    marginBottom: 4 
  },
  amount: { 
    fontFamily: FF[700],
    fontSize: FS.FS20, 
    color: '#2E7D32' 
  },
  due: { 
    marginTop: 6, 
    fontFamily: FF[400],
    fontSize: FS.FS13, 
    color: COLORS.GREY_TEXT, 
  },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  paid: { backgroundColor: '#C8E6C9' },
  pending: { backgroundColor: '#FFE0B2' },
  overdue: { backgroundColor: '#FFCDD2' },
  statusText: { 
    fontFamily: FF[700],
    fontSize: FS.FS11, 
    color: '#333', 
    letterSpacing: 0.5 
  },
  actions: { flexDirection: 'row', alignItems: 'center' },
  detailsBtn: { 
    paddingHorizontal: 16, 
    paddingVertical: 10, 
    marginRight: 8, 
    backgroundColor: '#E0E0E0', 
    borderRadius: 8 
  },
  detailsBtnText: { 
    fontFamily: FF[600],
    fontSize: FS.FS14, 
    color: '#424242' 
  },
  payBtn: { 
    paddingHorizontal: 18, 
    paddingVertical: 10, 
    backgroundColor: COLORS.DARK_BLUE, 
    borderRadius: 8, 
    shadowColor: COLORS.DARK_BLUE, 
    shadowOpacity: 0.3, 
    shadowOffset: { width: 0, height: 2 }, 
    shadowRadius: 4,
    elevation: 2,
  },
  payBtnText: { 
    fontFamily: FF[600],
    fontSize: FS.FS14, 
    color: COLORS.WHITE 
  },
  empty: { textAlign: 'center', marginTop: 40, fontSize: 16, color: '#999' },
  
  // Details page
  detailsHeader: { marginBottom: 20, paddingTop: 8 },
  billTitle: { 
    fontFamily: FF[700],
    fontSize: FS.FS24, 
    color: COLORS.BLACK_TEXT, 
    marginBottom: 6 
  },
  billStatus: { 
    fontFamily: FF[500],
    fontSize: FS.FS15, 
    color: COLORS.GREY_TEXT, 
    marginTop: 4 
  },
  amountCard: { 
    backgroundColor: '#E3F2FD', 
    borderRadius: 16, 
    padding: 20, 
    marginBottom: 24, 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BBDEFB',
    shadowColor: COLORS.DARK_BLUE,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  amountLabel: { 
    fontFamily: FF[600],
    fontSize: FS.FS14, 
    color: '#1565C0', 
    marginBottom: 6, 
    letterSpacing: 0.5 
  },
  amountLarge: { 
    fontFamily: FF[700],
    fontSize: 40, 
    color: COLORS.DARK_BLUE, 
    letterSpacing: -1 
  },
  dueLabel: { 
    fontFamily: FF[700],
    fontSize: FS.FS13, 
    color: '#E53935', 
    marginTop: 10, 
    textTransform: 'uppercase', 
    letterSpacing: 0.5 
  },
  
  sectionTitle: { 
    fontFamily: FF[700],
    fontSize: FS.FS17, 
    color: COLORS.BLACK_TEXT, 
    marginBottom: 12, 
    marginTop: 8 
  },
  breakdownContainer: { 
    backgroundColor: COLORS.WHITE, 
    borderRadius: 12, 
    padding: 18, 
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },
  breakdownRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  breakdownLabel: { 
    fontFamily: FF[500],
    fontSize: FS.FS14, 
    color: COLORS.GREY_TEXT 
  },
  breakdownValue: { 
    fontFamily: FF[700],
    fontSize: FS.FS14, 
    color: COLORS.BLACK_TEXT 
  },
  divider: { height: 1, backgroundColor: '#EEEEEE', marginVertical: 4 },
  breakdownTotal: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 8, 
    paddingTop: 12, 
    borderTopWidth: 2, 
    borderTopColor: COLORS.DARK_BLUE 
  },
  breakdownTotalLabel: { 
    fontFamily: FF[700],
    fontSize: FS.FS16, 
    color: COLORS.BLACK_TEXT 
  },
  breakdownTotalValue: { 
    fontFamily: FF[700],
    fontSize: FS.FS20, 
    color: COLORS.DARK_BLUE 
  },
  
  paidInfo: { 
    backgroundColor: '#E8F5E9', 
    borderRadius: 12, 
    padding: 18, 
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#C8E6C9'
  },
  paidInfoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, paddingVertical: 4 },
  paidInfoLabel: { fontSize: 14, color: '#2E7D32', fontWeight: '600' },
  paidInfoValue: { fontSize: 14, fontWeight: '700', color: '#1B5E20' },
  paidBadge: { 
    alignSelf: 'flex-start', 
    backgroundColor: '#4CAF50', 
    paddingHorizontal: 14, 
    paddingVertical: 8, 
    borderRadius: 8, 
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#4CAF50',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  paidBadgeText: { color: '#fff', fontSize: 12, fontWeight: '700', letterSpacing: 1 },
  
  // Payment Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 20, paddingTop: 24, paddingBottom: 32, maxHeight: '85%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: '700', color: '#000' },
  closeButton: { padding: 4 },
  closeButtonText: { fontSize: 28, color: '#999', fontWeight: '300' },
  
  modalSection: { marginBottom: 24 },
  modalSectionTitle: { fontSize: 15, fontWeight: '700', color: '#000', marginBottom: 12 },
  
  paymentMethodCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, borderWidth: 2, borderColor: '#E0E0E0', marginBottom: 10 },
  paymentMethodSelected: { borderColor: '#1976D2', backgroundColor: '#E3F2FD' },
  paymentMethodIcon: { fontSize: 28, marginRight: 14 },
  paymentMethodInfo: { flex: 1 },
  paymentMethodName: { fontSize: 15, fontWeight: '600', color: '#000' },
  paymentMethodDesc: { fontSize: 12, color: '#666', marginTop: 2 },
  radioOuter: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#CCC', justifyContent: 'center', alignItems: 'center' },
  radioOuterSelected: { borderColor: '#1976D2' },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#1976D2' },
  
  billSummaryCard: { backgroundColor: '#F5F5F5', borderRadius: 12, padding: 16, marginBottom: 24 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryLabel: { fontSize: 14, color: '#666' },
  summaryValue: { fontSize: 14, fontWeight: '600', color: '#000' },
  summaryTotal: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 12, borderTopWidth: 1, borderTopColor: '#E0E0E0', marginTop: 4 },
  summaryTotalLabel: { fontSize: 16, fontWeight: '700', color: '#000' },
  summaryTotalValue: { fontSize: 18, fontWeight: '700', color: '#1976D2' },
  
  confirmButton: { backgroundColor: '#1976D2', borderRadius: 12, paddingVertical: 16, alignItems: 'center', elevation: 2, shadowColor: '#1976D2', shadowOpacity: 0.3, shadowOffset: { width: 0, height: 4 }, shadowRadius: 8 },
  confirmButtonDisabled: { backgroundColor: '#BDBDBD', elevation: 0, shadowOpacity: 0 },
  confirmButtonText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  
  processingContainer: { alignItems: 'center', paddingVertical: 32 },
  processingText: { fontSize: 16, color: '#666', marginTop: 16 },
  processingSubtext: { fontSize: 13, color: '#999', marginTop: 8, textAlign: 'center' },
});

export default maintenanceStyles;
