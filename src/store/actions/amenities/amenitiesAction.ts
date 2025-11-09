// Amenities Action Types
export const FETCH_AMENITIES = 'FETCH_AMENITIES';
export const FETCH_AMENITIES_SUCCESS = 'FETCH_AMENITIES_SUCCESS';
export const FETCH_AMENITIES_FAILURE = 'FETCH_AMENITIES_FAILURE';

export const FETCH_AMENITY_DETAILS = 'FETCH_AMENITY_DETAILS';
export const FETCH_AMENITY_DETAILS_SUCCESS = 'FETCH_AMENITY_DETAILS_SUCCESS';
export const FETCH_AMENITY_DETAILS_FAILURE = 'FETCH_AMENITY_DETAILS_FAILURE';

export const FETCH_AVAILABLE_SLOTS = 'FETCH_AVAILABLE_SLOTS';
export const FETCH_AVAILABLE_SLOTS_SUCCESS = 'FETCH_AVAILABLE_SLOTS_SUCCESS';
export const FETCH_AVAILABLE_SLOTS_FAILURE = 'FETCH_AVAILABLE_SLOTS_FAILURE';

export const BOOK_AMENITY_SLOT = 'BOOK_AMENITY_SLOT';
export const BOOK_AMENITY_SLOT_SUCCESS = 'BOOK_AMENITY_SLOT_SUCCESS';
export const BOOK_AMENITY_SLOT_FAILURE = 'BOOK_AMENITY_SLOT_FAILURE';

export const FETCH_MY_BOOKINGS = 'FETCH_MY_BOOKINGS';
export const FETCH_MY_BOOKINGS_SUCCESS = 'FETCH_MY_BOOKINGS_SUCCESS';
export const FETCH_MY_BOOKINGS_FAILURE = 'FETCH_MY_BOOKINGS_FAILURE';

export const CANCEL_BOOKING = 'CANCEL_BOOKING';
export const CANCEL_BOOKING_SUCCESS = 'CANCEL_BOOKING_SUCCESS';
export const CANCEL_BOOKING_FAILURE = 'CANCEL_BOOKING_FAILURE';

export const RESET_AMENITIES = 'RESET_AMENITIES';

// Action Creators
export const fetchAmenities = (buildingId: string) => ({
    type: FETCH_AMENITIES,
    payload: { buildingId }
});

export const fetchAmenitiesSuccess = (data: any) => ({
    type: FETCH_AMENITIES_SUCCESS,
    payload: data
});

export const fetchAmenitiesFailure = (error: string) => ({
    type: FETCH_AMENITIES_FAILURE,
    payload: error
});

export const fetchAmenityDetails = (id: string, date?: string) => ({
    type: FETCH_AMENITY_DETAILS,
    payload: { id, date }
});

export const fetchAmenityDetailsSuccess = (data: any) => ({
    type: FETCH_AMENITY_DETAILS_SUCCESS,
    payload: data
});

export const fetchAmenityDetailsFailure = (error: string) => ({
    type: FETCH_AMENITY_DETAILS_FAILURE,
    payload: error
});

export const fetchAvailableSlots = (amenityId: string, date: string) => ({
    type: FETCH_AVAILABLE_SLOTS,
    payload: { amenityId, date }
});

export const fetchAvailableSlotsSuccess = (data: any) => ({
    type: FETCH_AVAILABLE_SLOTS_SUCCESS,
    payload: data
});

export const fetchAvailableSlotsFailure = (error: string) => ({
    type: FETCH_AVAILABLE_SLOTS_FAILURE,
    payload: error
});

export const bookAmenitySlot = (amenityId: string, slotId: string, memberId: string, unitId: string, bookingDate: string) => ({
    type: BOOK_AMENITY_SLOT,
    payload: { amenityId, slotId, memberId, unitId, bookingDate }
});

export const bookAmenitySlotSuccess = (data: any) => ({
    type: BOOK_AMENITY_SLOT_SUCCESS,
    payload: data
});

export const bookAmenitySlotFailure = (error: string) => ({
    type: BOOK_AMENITY_SLOT_FAILURE,
    payload: error
});

export const fetchMyBookings = (userId: string) => ({
    type: FETCH_MY_BOOKINGS,
    payload: { userId }
});

export const fetchMyBookingsSuccess = (data: any) => ({
    type: FETCH_MY_BOOKINGS_SUCCESS,
    payload: data
});

export const fetchMyBookingsFailure = (error: string) => ({
    type: FETCH_MY_BOOKINGS_FAILURE,
    payload: error
});

export const cancelBooking = (bookingId: string) => ({
    type: CANCEL_BOOKING,
    payload: { bookingId }
});

export const cancelBookingSuccess = (data: any) => ({
    type: CANCEL_BOOKING_SUCCESS,
    payload: data
});

export const cancelBookingFailure = (error: string) => ({
    type: CANCEL_BOOKING_FAILURE,
    payload: error
});

export const resetAmenities = () => ({
    type: RESET_AMENITIES
});
