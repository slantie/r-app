import AsyncStorage from '@react-native-async-storage/async-storage';

// Single database key for all app data
const DATABASE_KEY = '@shivalik_app_database';

// ==================== INTERFACES ====================

export interface Visitor {
  id: string;
  name: string;
  phone: string;
  purpose: string;
  expectedDate: string;
  expectedTime: string;
  status: 'pending' | 'approved' | 'active' | 'completed' | 'cancelled';
  vehicleNumber?: string;
  numberOfGuests: number;
  checkInTime?: string;
  checkOutTime?: string;
  createdAt: string;
}

export interface ParkingPass {
  id: string;
  vehicleNumber: string;
  vehicleType: 'car' | 'bike' | 'scooter' | 'other';
  vehicleBrand: string;
  vehicleModel: string;
  vehicleColor: string;
  ownerName: string;
  slotNumber?: string;
  passType: 'permanent' | 'temporary';
  status: 'active' | 'expired' | 'suspended';
  validFrom: string;
  validUntil?: string;
  createdAt: string;
}

export interface MaintenanceBill {
  id: string;
  month: string;
  year: number;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paidDate?: string;
  paymentMethod?: string;
  transactionId?: string;
  breakdown: {
    maintenance: number;
    waterCharges: number;
    electricityCharges?: number;
    parkingCharges?: number;
    other?: number;
  };
  createdAt: string;
}

export interface Complaint {
  id: string;
  category: 'plumbing' | 'electrical' | 'cleaning' | 'security' | 'other';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  attachments?: string[];
  submittedDate: string;
  resolvedDate?: string;
  assignedTo?: string;
  resolution?: string;
  createdAt: string;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  description: string;
  capacity: number;
  bookingFee: number;
  availableFrom: string;
  availableTo: string;
  advanceBookingDays: number;
  minBookingHours: number;
  maxBookingHours: number;
  rules: string[];
  images?: string[];
  isAvailable: boolean;
}

export interface AmenityBooking {
  id: string;
  amenityId: string;
  amenityName: string;
  amenityIcon: string;
  userId: string;
  date: string;
  timeSlot: string;
  duration: number; // in hours
  guestCount: number;
  totalAmount: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  bookingDate: string;
  specialInstructions?: string;
  qrCode?: string;
  createdAt: string;
}

export interface Notice {
  id: string;
  title: string;
  description: string;
  priority: 'urgent' | 'important' | 'normal';
  category: 'general' | 'maintenance' | 'event' | 'emergency';
  postedDate: string;
  validUntil?: string;
  attachments?: string[];
  postedBy: string;
  createdAt: string;
}

// ==================== DATABASE STRUCTURE ====================

interface AppDatabase {
  visitors: Visitor[];
  parking: ParkingPass[];
  maintenance: MaintenanceBill[];
  complaints: Complaint[];
  amenities: Amenity[];
  amenityBookings: AmenityBooking[];
  notices: Notice[];
  version: string;
  lastUpdated: string;
}

// ==================== INITIAL DATA ====================

const INITIAL_DATABASE: AppDatabase = {
  visitors: [
    {
      id: '1',
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      purpose: 'Family Visit',
      expectedDate: 'Nov 10, 2025',
      expectedTime: '4:00 PM',
      status: 'approved',
      numberOfGuests: 3,
      vehicleNumber: 'GJ01AB1234',
      createdAt: new Date('2025-11-07').toISOString(),
    },
    {
      id: '2',
      name: 'Priya Sharma',
      phone: '+91 98765 43211',
      purpose: 'Plumber',
      expectedDate: 'Nov 9, 2025',
      expectedTime: '11:00 AM',
      status: 'pending',
      numberOfGuests: 1,
      createdAt: new Date('2025-11-08').toISOString(),
    },
    {
      id: '3',
      name: 'Amit Patel',
      phone: '+91 98765 43212',
      purpose: 'Delivery',
      expectedDate: 'Nov 8, 2025',
      expectedTime: '2:30 PM',
      status: 'completed',
      numberOfGuests: 1,
      checkInTime: '2:35 PM',
      checkOutTime: '2:45 PM',
      createdAt: new Date('2025-11-06').toISOString(),
    },
    {
      id: '4',
      name: 'Sneha Desai',
      phone: '+91 98765 43213',
      purpose: 'Guest Visit',
      expectedDate: 'Nov 7, 2025',
      expectedTime: '6:00 PM',
      status: 'completed',
      numberOfGuests: 2,
      checkInTime: '6:10 PM',
      checkOutTime: '9:30 PM',
      createdAt: new Date('2025-11-05').toISOString(),
    },
  ],
  parking: [
    {
      id: '1',
      vehicleNumber: 'GJ01AB1234',
      vehicleType: 'car',
      vehicleBrand: 'Maruti Suzuki',
      vehicleModel: 'Swift',
      vehicleColor: 'White',
      ownerName: 'Slantie Hacks',
      slotNumber: 'A-101-1',
      passType: 'permanent',
      status: 'active',
      validFrom: 'Jan 1, 2025',
      createdAt: new Date('2025-01-01').toISOString(),
    },
    {
      id: '2',
      vehicleNumber: 'GJ05CD5678',
      vehicleType: 'bike',
      vehicleBrand: 'Honda',
      vehicleModel: 'Activa',
      vehicleColor: 'Black',
      ownerName: 'Slantie Hacks',
      slotNumber: 'A-101-2',
      passType: 'permanent',
      status: 'active',
      validFrom: 'Jan 1, 2025',
      createdAt: new Date('2025-01-01').toISOString(),
    },
    {
      id: '3',
      vehicleNumber: 'GJ12EF9012',
      vehicleType: 'car',
      vehicleBrand: 'Hyundai',
      vehicleModel: 'Creta',
      vehicleColor: 'Blue',
      ownerName: 'Guest',
      passType: 'temporary',
      status: 'active',
      validFrom: 'Nov 8, 2025',
      validUntil: 'Nov 10, 2025',
      createdAt: new Date('2025-11-08').toISOString(),
    },
  ],
  maintenance: [
    {
      id: '1',
      month: 'November',
      year: 2025,
      amount: 5000,
      dueDate: 'Nov 10, 2025',
      status: 'pending',
      breakdown: {
        maintenance: 3500,
        waterCharges: 800,
        electricityCharges: 500,
        parkingCharges: 200,
      },
      createdAt: new Date('2025-11-01').toISOString(),
    },
    {
      id: '2',
      month: 'October',
      year: 2025,
      amount: 4800,
      dueDate: 'Oct 10, 2025',
      status: 'paid',
      paidDate: 'Oct 8, 2025',
      paymentMethod: 'UPI',
      transactionId: 'TXN123456789',
      breakdown: {
        maintenance: 3500,
        waterCharges: 750,
        electricityCharges: 450,
        parkingCharges: 100,
      },
      createdAt: new Date('2025-10-01').toISOString(),
    },
  ],
  complaints: [
    {
      id: '1',
      category: 'plumbing',
      title: 'Leaking Tap in Kitchen',
      description: 'The kitchen tap has been leaking for 2 days. Water is dripping continuously.',
      priority: 'medium',
      status: 'in-progress',
      submittedDate: 'Nov 6, 2025',
      assignedTo: 'Maintenance Team',
      createdAt: new Date('2025-11-06').toISOString(),
    },
    {
      id: '2',
      category: 'electrical',
      title: 'Corridor Light Not Working',
      description: 'The light in the 4th floor corridor has been out for a week.',
      priority: 'low',
      status: 'resolved',
      submittedDate: 'Nov 1, 2025',
      resolvedDate: 'Nov 5, 2025',
      assignedTo: 'Electrician',
      resolution: 'Replaced bulb and checked wiring.',
      createdAt: new Date('2025-11-01').toISOString(),
    },
    {
      id: '3',
      category: 'security',
      title: 'Main Gate Intercom Not Working',
      description: 'The intercom system at the main gate has stopped functioning since yesterday. Guards cannot communicate with residents.',
      priority: 'urgent',
      status: 'open',
      submittedDate: 'Nov 8, 2025',
      createdAt: new Date('2025-11-08').toISOString(),
    },
    {
      id: '4',
      category: 'cleaning',
      title: 'Garbage Not Collected from 3rd Floor',
      description: 'The garbage has not been collected from the 3rd floor common area for the past 3 days. There is a bad smell.',
      priority: 'high',
      status: 'open',
      submittedDate: 'Nov 5, 2025',
      createdAt: new Date('2025-11-05').toISOString(),
    },
    {
      id: '5',
      category: 'plumbing',
      title: 'Toilet Flush Not Working',
      description: 'The flush mechanism in flat 402 guest bathroom is not working properly. Water keeps running.',
      priority: 'medium',
      status: 'resolved',
      submittedDate: 'Oct 28, 2025',
      resolvedDate: 'Nov 2, 2025',
      assignedTo: 'Plumber - Rajesh',
      resolution: 'Replaced flush valve and adjusted float mechanism.',
      createdAt: new Date('2025-10-28').toISOString(),
    },
  ],
  amenities: [
    {
      id: '1',
      name: 'Swimming Pool',
      icon: '🏊',
      description: 'Olympic-size swimming pool with separate sections for adults and children. Locker rooms and showers available.',
      capacity: 50,
      bookingFee: 300,
      availableFrom: '6:00 AM',
      availableTo: '9:00 PM',
      advanceBookingDays: 7,
      minBookingHours: 1,
      maxBookingHours: 3,
      rules: [
        'Swimming costume is mandatory',
        'Children under 12 must be accompanied by an adult',
        'No food or drinks near the pool',
        'Follow lifeguard instructions at all times',
      ],
      isAvailable: true,
    },
    {
      id: '2',
      name: 'Gymnasium',
      icon: '💪',
      description: 'Fully equipped modern gym with cardio machines, weights, and personal training available.',
      capacity: 25,
      bookingFee: 0,
      availableFrom: '5:00 AM',
      availableTo: '11:00 PM',
      advanceBookingDays: 3,
      minBookingHours: 1,
      maxBookingHours: 2,
      rules: [
        'Proper gym attire required',
        'Clean equipment after use',
        'Maximum 2 hours per session',
        'No outside trainers allowed',
      ],
      isAvailable: true,
    },
    {
      id: '3',
      name: 'Clubhouse',
      icon: '🏛️',
      description: 'Spacious air-conditioned hall perfect for parties, meetings, and events. Includes basic furniture and sound system.',
      capacity: 100,
      bookingFee: 2000,
      availableFrom: '9:00 AM',
      availableTo: '11:00 PM',
      advanceBookingDays: 30,
      minBookingHours: 4,
      maxBookingHours: 12,
      rules: [
        'Security deposit of ₹5000 required',
        'No loud music after 10:00 PM',
        'Venue must be cleaned before handover',
        'Damage to property will be charged',
        'Catering arrangements must be pre-approved',
      ],
      isAvailable: true,
    },
    {
      id: '4',
      name: 'Sports Court',
      icon: '🏀',
      description: 'Multi-purpose court for basketball, badminton, and volleyball. Equipment available on request.',
      capacity: 20,
      bookingFee: 200,
      availableFrom: '6:00 AM',
      availableTo: '10:00 PM',
      advanceBookingDays: 7,
      minBookingHours: 1,
      maxBookingHours: 3,
      rules: [
        'Sports shoes mandatory',
        'Book equipment 24 hours in advance',
        'Maximum 3 hours per booking',
        'Keep court clean',
      ],
      isAvailable: true,
    },
    {
      id: '5',
      name: 'Party Hall',
      icon: '🎉',
      description: 'Elegant hall for birthday parties and celebrations with catering facility and decoration support.',
      capacity: 75,
      bookingFee: 1500,
      availableFrom: '10:00 AM',
      availableTo: '11:00 PM',
      advanceBookingDays: 21,
      minBookingHours: 4,
      maxBookingHours: 10,
      rules: [
        'Advance booking required minimum 21 days',
        'Security deposit ₹3000',
        'Approved caterers list available',
        'Decorations must be removed after event',
        'No alcohol without prior permission',
      ],
      isAvailable: false,
    },
    {
      id: '6',
      name: 'Yoga & Meditation Room',
      icon: '🧘',
      description: 'Peaceful space for yoga, meditation, and wellness activities. Mats and props provided.',
      capacity: 15,
      bookingFee: 150,
      availableFrom: '6:00 AM',
      availableTo: '8:00 PM',
      advanceBookingDays: 5,
      minBookingHours: 1,
      maxBookingHours: 2,
      rules: [
        'Maintain silence',
        'Remove footwear before entering',
        'Bring your own mat (or use provided)',
        'Switch off mobile phones',
      ],
      isAvailable: true,
    },
  ],
  amenityBookings: [
    {
      id: '1',
      amenityId: '3',
      amenityName: 'Clubhouse',
      amenityIcon: '🏛️',
      userId: 'current-user-id',
      date: 'Nov 15, 2025',
      timeSlot: '6:00 PM - 10:00 PM',
      duration: 4,
      guestCount: 25,
      totalAmount: 8000,
      status: 'upcoming',
      bookingDate: 'Nov 5, 2025',
      specialInstructions: 'Birthday party, need DJ setup',
      qrCode: 'QR123456',
      createdAt: new Date('2025-11-05').toISOString(),
    },
    {
      id: '2',
      amenityId: '2',
      amenityName: 'Gymnasium',
      amenityIcon: '💪',
      userId: 'current-user-id',
      date: 'Nov 9, 2025',
      timeSlot: '6:00 AM - 7:00 AM',
      duration: 1,
      guestCount: 1,
      totalAmount: 0,
      status: 'upcoming',
      bookingDate: 'Nov 8, 2025',
      qrCode: 'QR123457',
      createdAt: new Date('2025-11-08').toISOString(),
    },
    {
      id: '3',
      amenityId: '1',
      amenityName: 'Swimming Pool',
      amenityIcon: '🏊',
      userId: 'current-user-id',
      date: 'Nov 6, 2025',
      timeSlot: '7:00 AM - 9:00 AM',
      duration: 2,
      guestCount: 3,
      totalAmount: 600,
      status: 'completed',
      bookingDate: 'Nov 1, 2025',
      qrCode: 'QR123458',
      createdAt: new Date('2025-11-01').toISOString(),
    },
  ],
  notices: [
    {
      id: '1',
      title: 'Water Supply Disruption Tomorrow',
      description: 'Water supply will be interrupted from 10 AM to 2 PM on Nov 9, 2025 for maintenance work.',
      priority: 'urgent',
      category: 'maintenance',
      postedDate: 'Nov 8, 2025',
      validUntil: 'Nov 9, 2025',
      postedBy: 'Society Management',
      createdAt: new Date('2025-11-08').toISOString(),
    },
    {
      id: '2',
      title: 'Diwali Celebration - Nov 12',
      description: 'Join us for Diwali celebration in the clubhouse. Snacks and entertainment arranged.',
      priority: 'normal',
      category: 'event',
      postedDate: 'Nov 5, 2025',
      validUntil: 'Nov 12, 2025',
      postedBy: 'Event Committee',
      createdAt: new Date('2025-11-05').toISOString(),
    },
  ],
  version: '1.0.0',
  lastUpdated: new Date().toISOString(),
};

// ==================== DATABASE SERVICE ====================

class DatabaseService {
  // Initialize database with default data
  async initialize(): Promise<void> {
    try {
      const existing = await AsyncStorage.getItem(DATABASE_KEY);
      if (!existing) {
        await AsyncStorage.setItem(DATABASE_KEY, JSON.stringify(INITIAL_DATABASE));
        console.log('✅ Database initialized with default data');
      } else {
        console.log('✅ Database already exists');
      }
    } catch (error) {
      console.error('❌ Error initializing database:', error);
    }
  }

  // Get entire database
  private async getDatabase(): Promise<AppDatabase> {
    try {
      const data = await AsyncStorage.getItem(DATABASE_KEY);
      if (data) {
        return JSON.parse(data);
      }
      return INITIAL_DATABASE;
    } catch (error) {
      console.error('Error getting database:', error);
      return INITIAL_DATABASE;
    }
  }

  // Save entire database
  private async saveDatabase(database: AppDatabase): Promise<void> {
    try {
      database.lastUpdated = new Date().toISOString();
      await AsyncStorage.setItem(DATABASE_KEY, JSON.stringify(database));
    } catch (error) {
      console.error('Error saving database:', error);
      throw error;
    }
  }

  // ==================== VISITOR OPERATIONS ====================

  async getAllVisitors(): Promise<Visitor[]> {
    const db = await this.getDatabase();
    return db.visitors;
  }

  async getVisitorById(id: string): Promise<Visitor | null> {
    const visitors = await this.getAllVisitors();
    return visitors.find(v => v.id === id) || null;
  }

  async addVisitor(visitor: Omit<Visitor, 'id' | 'createdAt'>): Promise<Visitor> {
    const db = await this.getDatabase();
    const newVisitor: Visitor = {
      ...visitor,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    db.visitors.unshift(newVisitor);
    await this.saveDatabase(db);
    return newVisitor;
  }

  async updateVisitor(id: string, updates: Partial<Visitor>): Promise<boolean> {
    const db = await this.getDatabase();
    const index = db.visitors.findIndex(v => v.id === id);
    if (index === -1) return false;
    db.visitors[index] = { ...db.visitors[index], ...updates };
    await this.saveDatabase(db);
    return true;
  }

  async deleteVisitor(id: string): Promise<boolean> {
    const db = await this.getDatabase();
    db.visitors = db.visitors.filter(v => v.id !== id);
    await this.saveDatabase(db);
    return true;
  }

  async cancelVisitor(id: string): Promise<boolean> {
    return this.updateVisitor(id, { status: 'cancelled' });
  }

  async getUpcomingVisitors(): Promise<Visitor[]> {
    const visitors = await this.getAllVisitors();
    return visitors.filter(
      v => v.status === 'pending' || v.status === 'approved' || v.status === 'active'
    );
  }

  async getHistoryVisitors(): Promise<Visitor[]> {
    const visitors = await this.getAllVisitors();
    return visitors.filter(
      v => v.status === 'completed' || v.status === 'cancelled'
    );
  }

  // ==================== PARKING OPERATIONS ====================

  async getAllParkingPasses(): Promise<ParkingPass[]> {
    const db = await this.getDatabase();
    return db.parking;
  }

  async getParkingPassById(id: string): Promise<ParkingPass | null> {
    const passes = await this.getAllParkingPasses();
    return passes.find(p => p.id === id) || null;
  }

  async addParkingPass(pass: Omit<ParkingPass, 'id' | 'createdAt'>): Promise<ParkingPass> {
    const db = await this.getDatabase();
    const newPass: ParkingPass = {
      ...pass,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    db.parking.unshift(newPass);
    await this.saveDatabase(db);
    return newPass;
  }

  async updateParkingPass(id: string, updates: Partial<ParkingPass>): Promise<boolean> {
    const db = await this.getDatabase();
    const index = db.parking.findIndex(p => p.id === id);
    if (index === -1) return false;
    db.parking[index] = { ...db.parking[index], ...updates };
    await this.saveDatabase(db);
    return true;
  }

  async deleteParkingPass(id: string): Promise<boolean> {
    const db = await this.getDatabase();
    db.parking = db.parking.filter(p => p.id !== id);
    await this.saveDatabase(db);
    return true;
  }

  async getActiveParkingPasses(): Promise<ParkingPass[]> {
    const passes = await this.getAllParkingPasses();
    return passes.filter(p => p.status === 'active');
  }

  async getInactiveParkingPasses(): Promise<ParkingPass[]> {
    const passes = await this.getAllParkingPasses();
    return passes.filter(p => p.status === 'expired' || p.status === 'suspended');
  }

  // ==================== MAINTENANCE OPERATIONS ====================

  async getAllMaintenanceBills(): Promise<MaintenanceBill[]> {
    const db = await this.getDatabase();
    return db.maintenance;
  }

  async getMaintenanceBillById(id: string): Promise<MaintenanceBill | null> {
    const bills = await this.getAllMaintenanceBills();
    return bills.find(b => b.id === id) || null;
  }

  async addMaintenanceBill(bill: Omit<MaintenanceBill, 'id' | 'createdAt'>): Promise<MaintenanceBill> {
    const db = await this.getDatabase();
    const newBill: MaintenanceBill = {
      ...bill,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    db.maintenance.unshift(newBill);
    await this.saveDatabase(db);
    return newBill;
  }

  async updateMaintenanceBill(id: string, updates: Partial<MaintenanceBill>): Promise<boolean> {
    const db = await this.getDatabase();
    const index = db.maintenance.findIndex(b => b.id === id);
    if (index === -1) return false;
    db.maintenance[index] = { ...db.maintenance[index], ...updates };
    await this.saveDatabase(db);
    return true;
  }

  async getPendingBills(): Promise<MaintenanceBill[]> {
    const bills = await this.getAllMaintenanceBills();
    return bills.filter(b => b.status === 'pending' || b.status === 'overdue');
  }

  async getPaidBills(): Promise<MaintenanceBill[]> {
    const bills = await this.getAllMaintenanceBills();
    return bills.filter(b => b.status === 'paid');
  }

  // ==================== COMPLAINT OPERATIONS ====================

  async getAllComplaints(): Promise<Complaint[]> {
    const db = await this.getDatabase();
    return db.complaints;
  }

  async getComplaintById(id: string): Promise<Complaint | null> {
    const complaints = await this.getAllComplaints();
    return complaints.find(c => c.id === id) || null;
  }

  async addComplaint(complaint: Omit<Complaint, 'id' | 'createdAt'>): Promise<Complaint> {
    const db = await this.getDatabase();
    const newComplaint: Complaint = {
      ...complaint,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    db.complaints.unshift(newComplaint);
    await this.saveDatabase(db);
    return newComplaint;
  }

  async updateComplaint(id: string, updates: Partial<Complaint>): Promise<boolean> {
    const db = await this.getDatabase();
    const index = db.complaints.findIndex(c => c.id === id);
    if (index === -1) return false;
    db.complaints[index] = { ...db.complaints[index], ...updates };
    await this.saveDatabase(db);
    return true;
  }

  async deleteComplaint(id: string): Promise<boolean> {
    const db = await this.getDatabase();
    const index = db.complaints.findIndex(c => c.id === id);
    if (index === -1) return false;
    db.complaints.splice(index, 1);
    await this.saveDatabase(db);
    return true;
  }

  async getOpenComplaints(): Promise<Complaint[]> {
    const complaints = await this.getAllComplaints();
    return complaints.filter(c => c.status === 'open' || c.status === 'in-progress');
  }

  async getClosedComplaints(): Promise<Complaint[]> {
    const complaints = await this.getAllComplaints();
    return complaints.filter(c => c.status === 'resolved' || c.status === 'closed');
  }

  // ==================== AMENITY BOOKING OPERATIONS ====================

  async getAllAmenityBookings(): Promise<AmenityBooking[]> {
    const db = await this.getDatabase();
    return db.amenityBookings;
  }

  async getAmenityBookingById(id: string): Promise<AmenityBooking | null> {
    const bookings = await this.getAllAmenityBookings();
    return bookings.find(b => b.id === id) || null;
  }

  async addAmenityBooking(booking: Omit<AmenityBooking, 'id' | 'createdAt'>): Promise<AmenityBooking> {
    const db = await this.getDatabase();
    const newBooking: AmenityBooking = {
      ...booking,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    db.amenityBookings.unshift(newBooking);
    await this.saveDatabase(db);
    return newBooking;
  }

  async updateAmenityBooking(id: string, updates: Partial<AmenityBooking>): Promise<boolean> {
    const db = await this.getDatabase();
    const index = db.amenityBookings.findIndex(b => b.id === id);
    if (index === -1) return false;
    db.amenityBookings[index] = { ...db.amenityBookings[index], ...updates };
    await this.saveDatabase(db);
    return true;
  }

  async deleteAmenityBooking(id: string): Promise<boolean> {
    const db = await this.getDatabase();
    db.amenityBookings = db.amenityBookings.filter(b => b.id !== id);
    await this.saveDatabase(db);
    return true;
  }

  async getUpcomingBookings(): Promise<AmenityBooking[]> {
    const bookings = await this.getAllAmenityBookings();
    return bookings.filter(b => b.status === 'upcoming');
  }

  async getBookingsByUser(userId: string): Promise<AmenityBooking[]> {
    const bookings = await this.getAllAmenityBookings();
    return bookings.filter(b => b.userId === userId);
  }

  // ==================== AMENITY OPERATIONS ====================

  async getAllAmenities(): Promise<Amenity[]> {
    const db = await this.getDatabase();
    return db.amenities;
  }

  async getAmenityById(id: string): Promise<Amenity | null> {
    const amenities = await this.getAllAmenities();
    return amenities.find(a => a.id === id) || null;
  }

  async getAvailableAmenities(): Promise<Amenity[]> {
    const amenities = await this.getAllAmenities();
    return amenities.filter(a => a.isAvailable);
  }

  // ==================== NOTICE OPERATIONS ====================

  async getAllNotices(): Promise<Notice[]> {
    const db = await this.getDatabase();
    return db.notices;
  }

  async getNoticeById(id: string): Promise<Notice | null> {
    const notices = await this.getAllNotices();
    return notices.find(n => n.id === id) || null;
  }

  async addNotice(notice: Omit<Notice, 'id' | 'createdAt'>): Promise<Notice> {
    const db = await this.getDatabase();
    const newNotice: Notice = {
      ...notice,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    db.notices.unshift(newNotice);
    await this.saveDatabase(db);
    return newNotice;
  }

  async getActiveNotices(): Promise<Notice[]> {
    const notices = await this.getAllNotices();
    const now = new Date();
    return notices.filter(n => {
      if (!n.validUntil) return true;
      return new Date(n.validUntil) > now;
    });
  }

  // ==================== UTILITY OPERATIONS ====================

  async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.removeItem(DATABASE_KEY);
      console.log('✅ All data cleared');
    } catch (error) {
      console.error('❌ Error clearing data:', error);
    }
  }

  async resetToDefaults(): Promise<void> {
    try {
      await AsyncStorage.setItem(DATABASE_KEY, JSON.stringify(INITIAL_DATABASE));
      console.log('✅ Database reset to defaults');
    } catch (error) {
      console.error('❌ Error resetting database:', error);
    }
  }

  async exportDatabase(): Promise<AppDatabase> {
    return this.getDatabase();
  }

  async importDatabase(database: AppDatabase): Promise<void> {
    await this.saveDatabase(database);
  }
}

export default new DatabaseService();

// ==================== CONVENIENCE EXPORTS ====================
// Export commonly used methods as standalone functions for easier imports

const db = new DatabaseService();

// Amenity exports
export const getAllAmenities = () => db.getAllAmenities();
export const getAmenityById = (id: string) => db.getAmenityById(id);
export const getAvailableAmenities = () => db.getAvailableAmenities();

// Amenity Booking exports
export const getAllAmenityBookings = () => db.getAllAmenityBookings();
export const getBookingsByUser = (userId: string) => db.getBookingsByUser(userId);
export const addAmenityBooking = (booking: Omit<AmenityBooking, 'id' | 'createdAt'>) => db.addAmenityBooking(booking);
export const updateAmenityBooking = (id: string, updates: Partial<AmenityBooking>) => db.updateAmenityBooking(id, updates);
export const deleteAmenityBooking = (id: string) => db.deleteAmenityBooking(id);

// Complaint exports
export const getAllComplaints = () => db.getAllComplaints();
export const getComplaintById = (id: string) => db.getComplaintById(id);
export const addComplaint = (complaint: Omit<Complaint, 'id' | 'createdAt'>) => db.addComplaint(complaint);
export const updateComplaint = (id: string, updates: Partial<Complaint>) => db.updateComplaint(id, updates);
export const deleteComplaint = (id: string) => db.deleteComplaint(id);
