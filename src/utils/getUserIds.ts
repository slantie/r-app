import { store } from '../store';

/**
 * Get user IDs from Redux state
 * This function retrieves the authenticated user's IDs from the Redux store
 * @returns Object containing unitId, memberId, and buildingId
 */
export const getUserIds = () => {
  const state = store.getState();
  const userDetail = state.userDetail?.userDetailData;

  // Extract IDs from user detail data
  // Adjust these paths based on your actual user data structure
  const unitId = userDetail?.unitId || userDetail?.unit?._id || null;
  const memberId = userDetail?.memberId || userDetail?._id || userDetail?.id || null;
  const buildingId = userDetail?.buildingId || userDetail?.building?._id || null;

  return {
    unitId,
    memberId,
    buildingId,
  };
};

/**
 * Check if user is authenticated and has required IDs
 * @returns boolean
 */
export const hasUserIds = (): boolean => {
  const { unitId, memberId } = getUserIds();
  return !!(unitId && memberId);
};

/**
 * Get a specific user ID
 * @param idType - Type of ID to retrieve ('unitId' | 'memberId' | 'buildingId')
 * @returns The requested ID or null
 */
export const getUserId = (idType: 'unitId' | 'memberId' | 'buildingId'): string | null => {
  const ids = getUserIds();
  return ids[idType];
};
