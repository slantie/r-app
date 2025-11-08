/**
 * DEPRECATED: This file is kept for backward compatibility
 * Please use database.ts for all data operations
 */

import Database, { ParkingPass } from './database';

export type { ParkingPass };

class ParkingStorageService {
  async initialize(): Promise<void> {
    return Database.initialize();
  }

  async getAllPasses(): Promise<ParkingPass[]> {
    return Database.getAllParkingPasses();
  }

  async getPassById(id: string): Promise<ParkingPass | null> {
    return Database.getParkingPassById(id);
  }

  async addPass(pass: Omit<ParkingPass, 'id' | 'createdAt'>): Promise<ParkingPass> {
    return Database.addParkingPass(pass);
  }

  async updatePass(id: string, updates: Partial<ParkingPass>): Promise<boolean> {
    return Database.updateParkingPass(id, updates);
  }

  async deletePass(id: string): Promise<boolean> {
    return Database.deleteParkingPass(id);
  }

  async getActivePasses(): Promise<ParkingPass[]> {
    return Database.getActiveParkingPasses();
  }

  async getInactivePasses(): Promise<ParkingPass[]> {
    return Database.getInactiveParkingPasses();
  }

  async clearAll(): Promise<void> {
    return Database.clearAllData();
  }
}

export default new ParkingStorageService();
