/**
 * DEPRECATED: This file is kept for backward compatibility
 * Please use database.ts for all data operations
 */

import Database, { Visitor } from './database';

export type { Visitor };

class VisitorStorageService {
  async initialize(): Promise<void> {
    return Database.initialize();
  }

  async getAllVisitors(): Promise<Visitor[]> {
    return Database.getAllVisitors();
  }

  async getVisitorById(id: string): Promise<Visitor | null> {
    return Database.getVisitorById(id);
  }

  async addVisitor(visitor: Omit<Visitor, 'id' | 'createdAt'>): Promise<Visitor> {
    return Database.addVisitor(visitor);
  }

  async updateVisitor(id: string, updates: Partial<Visitor>): Promise<boolean> {
    return Database.updateVisitor(id, updates);
  }

  async cancelVisitor(id: string): Promise<boolean> {
    return Database.cancelVisitor(id);
  }

  async deleteVisitor(id: string): Promise<boolean> {
    return Database.deleteVisitor(id);
  }

  async getUpcomingVisitors(): Promise<Visitor[]> {
    return Database.getUpcomingVisitors();
  }

  async getHistoryVisitors(): Promise<Visitor[]> {
    return Database.getHistoryVisitors();
  }

  async clearAll(): Promise<void> {
    return Database.clearAllData();
  }
}

export default new VisitorStorageService();
