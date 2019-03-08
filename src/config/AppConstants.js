import { Platform } from 'react-native';

export class UIConstants {
  static AppbarHeight = Platform.OS === 'ios' ? 44 : 56;
  static StatusbarHeight = Platform.OS === 'ios' ? 20 : 0;
  static HeaderHeight = UIConstants.AppbarHeight + UIConstants.StatusbarHeight;
}

export const PageNames = {
  Login: 'Login',
  Dashboard: 'Dashboard',
  UnitOwners: 'UnitOwners',
  AccountSummary: 'AccountSummary',
  AccountPayment: 'AccountPayment',
  Violations: 'Violations',
  Violation: 'Violation',
  ViolationMap: 'ViolationMap',
  WorkOrders: 'WorkOrders',
  WorkOrder: 'WorkOrder',
  WorkOrderMap: 'WorkOrderMap',
  Architecturals: 'Architecturals',
  Architectural: 'Architectural',
  ArchitecturalStatus: 'ArchitecturalStatus',
  Profile: 'Profile',
  ProfileSettings: 'ProfileSettings',
  Comments: 'Comments',
  Documents: 'Documents',
  DocumentViewer: 'DocumentViewer',
  Settings: 'Settings',
  Themes: 'Themes',    
};