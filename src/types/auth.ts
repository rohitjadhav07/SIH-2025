export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organization: string;
  phone: string;
  address: string;
  licenseNumber?: string;
  certifications: string[];
  isVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  lastLogin?: Date;
  profileImage?: string;
}

export type UserRole = 
  | 'farmer' 
  | 'wild_collector' 
  | 'aggregator' 
  | 'processor' 
  | 'testing_lab' 
  | 'manufacturer' 
  | 'regulator' 
  | 'consumer' 
  | 'admin';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  organization: string;
  phone: string;
  address: string;
  licenseNumber?: string;
  certifications?: string[];
}

export interface RolePermissions {
  canCreateCollection: boolean;
  canViewAllCollections: boolean;
  canCreateProcessing: boolean;
  canViewProcessing: boolean;
  canCreateProducts: boolean;
  canViewProducts: boolean;
  canAccessDashboard: boolean;
  canManageUsers: boolean;
  canViewReports: boolean;
  canVerifyProducts: boolean;
}

export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  farmer: {
    canCreateCollection: true,
    canViewAllCollections: false,
    canCreateProcessing: false,
    canViewProcessing: false,
    canCreateProducts: false,
    canViewProducts: false,
    canAccessDashboard: true,
    canManageUsers: false,
    canViewReports: false,
    canVerifyProducts: false,
  },
  wild_collector: {
    canCreateCollection: true,
    canViewAllCollections: false,
    canCreateProcessing: false,
    canViewProcessing: false,
    canCreateProducts: false,
    canViewProducts: false,
    canAccessDashboard: true,
    canManageUsers: false,
    canViewReports: false,
    canVerifyProducts: false,
  },
  aggregator: {
    canCreateCollection: false,
    canViewAllCollections: true,
    canCreateProcessing: true,
    canViewProcessing: true,
    canCreateProducts: false,
    canViewProducts: true,
    canAccessDashboard: true,
    canManageUsers: false,
    canViewReports: true,
    canVerifyProducts: false,
  },
  processor: {
    canCreateCollection: false,
    canViewAllCollections: true,
    canCreateProcessing: true,
    canViewProcessing: true,
    canCreateProducts: false,
    canViewProducts: true,
    canAccessDashboard: true,
    canManageUsers: false,
    canViewReports: true,
    canVerifyProducts: false,
  },
  testing_lab: {
    canCreateCollection: false,
    canViewAllCollections: true,
    canCreateProcessing: true,
    canViewProcessing: true,
    canCreateProducts: false,
    canViewProducts: true,
    canAccessDashboard: true,
    canManageUsers: false,
    canViewReports: true,
    canVerifyProducts: true,
  },
  manufacturer: {
    canCreateCollection: false,
    canViewAllCollections: true,
    canCreateProcessing: true,
    canViewProcessing: true,
    canCreateProducts: true,
    canViewProducts: true,
    canAccessDashboard: true,
    canManageUsers: false,
    canViewReports: true,
    canVerifyProducts: true,
  },
  regulator: {
    canCreateCollection: false,
    canViewAllCollections: true,
    canCreateProcessing: false,
    canViewProcessing: true,
    canCreateProducts: false,
    canViewProducts: true,
    canAccessDashboard: true,
    canManageUsers: true,
    canViewReports: true,
    canVerifyProducts: true,
  },
  consumer: {
    canCreateCollection: false,
    canViewAllCollections: false,
    canCreateProcessing: false,
    canViewProcessing: false,
    canCreateProducts: false,
    canViewProducts: false,
    canAccessDashboard: false,
    canManageUsers: false,
    canViewReports: false,
    canVerifyProducts: true,
  },
  admin: {
    canCreateCollection: true,
    canViewAllCollections: true,
    canCreateProcessing: true,
    canViewProcessing: true,
    canCreateProducts: true,
    canViewProducts: true,
    canAccessDashboard: true,
    canManageUsers: true,
    canViewReports: true,
    canVerifyProducts: true,
  },
};