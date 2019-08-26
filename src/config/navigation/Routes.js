import _ from 'lodash';
import * as Screens from '../../screens';
import {PageNames} from '../AppConstants';

export const MainRoutes = [
  {
    id: PageNames.Login,
    title: 'Login',
    description: '',
    screen: Screens.Login,
    children: [],
  },
  {
    id: PageNames.Dashboard,
    title: 'Dashboard',
    screen: Screens.Dashboard,
    children: [],
  },
  {
    id: 'UnitOwners',
    title: 'UnitOwners',
    screen: Screens.UnitOwners,
    children: [],
  },
  {
    id: 'AccountMenu',
    title: 'Account',
    screen: Screens.AccountSummary,
    children: [
      {
        id: PageNames.AccountSummary,
        title: 'Account',
        description: 'Summary',
        screen: Screens.AccountSummary,
        children: [],
      },     
      {
        id: PageNames.AccountPayment,
        title: 'Account',
        description: 'Payment',
        screen: Screens.AccountPayment,
        children: [],
      },   
    ],
  },
  {
    id: 'ViolationMenu',
    title: 'Violation',
    screen: Screens.Violations,
    children: [
      {
        id: PageNames.Violations,
        title: 'Violations',
        description: 'Overview',
        screen: Screens.Violations,
        children: [],
      },     
      {
        id: PageNames.Violation,
        title: 'Violation Detail',
        description: 'Detail',
        screen: Screens.Violation,
        children: [],
      },   
      {
        id: PageNames.ViolationMap,
        title: 'Map',
        description: 'Map',
        screen: Screens.ViolationMap,
        children: [],
      },   
    ],
  },
  {
    id: 'WorkOrderMenu',
    title: 'Work Orders',
    screen: Screens.WorkOrders,
    children: [
      {
        id: PageNames.WorkOrders,
        title: 'Work Order',
        description: 'Overview',
        screen: Screens.WorkOrders,
        children: [],
      },     
      {
        id: PageNames.WorkOrder,
        title: 'Work Order Detail',
        description: 'Detail',
        screen: Screens.WorkOrder,
        children: [],
      },       
      {
        id: PageNames.WorkOrderMap,
        title: 'Map',
        description: 'Map',
        screen: Screens.WorkOrderMap,
        children: [],
      },   
    ],
  },
  {
    id: 'ArchitecturalMenu',
    title: 'Architecturals',
    screen: Screens.Architecturals,
    children: [
      {
        id: PageNames.Architecturals,
        title: 'Arc/Arb',
        description: 'Overview',
        screen: Screens.Architecturals,
        children: [],
      },     
      {
        id: PageNames.Architectural,
        title: 'Arc/Arb Detail',
        description: 'Detail',
        screen: Screens.Architectural,
        children: [],
      }, 
      {
        id: PageNames.ArchitecturalStatus,
        title: 'Status',
        description: 'Status',
        screen: Screens.ArchitecturalStatus,
        children: [],
      },     
    ],
  },
  {
    id: 'SocialMenu',
    title: 'Social',
    screen: Screens.Profile,
    children: [
      {
        id: PageNames.Profile,
        title: 'Profile',
        description: 'Detail',
        screen: Screens.Profile,
        children: [],
      },
      {
        id: PageNames.ProfileSettings,
        title: 'Profile Settings',
        screen: Screens.ProfileSettings,
        children: [],
      },
      {
        id: 'Notifications',
        title: 'Notifications',
        screen: Screens.Notifications,
        children: [],
      },
      {
        id: 'Contacts',
        title: 'Contacts',
        screen: Screens.Contacts,
        children: [],
      },
      {
        id: 'Feed',
        title: 'Feed',
        screen: Screens.Feed,
        children: [],
      },
    ],
  },
  {
    id: 'MessagingMenu',
    title: 'Messages',
    screen: Screens.Messages,
    children: [
      {
        id: 'Chat',
        title: 'Chat',
        screen: Screens.Chat,
        children: [],
      },
      {
        id: 'ChatList',
        title: 'Chat List',
        screen: Screens.ChatList,
        children: [],
      },
      {
        id: PageNames.Comments,
        title: 'Comments',
        screen: Screens.Comments,
        children: [],
      },
      {
        id: PageNames.Messages,
        title: 'Messages',
        screen: Screens.Messages,
        children: [],
      },
    ],
  },
  {
    id: PageNames.Documents,
    title: 'Documents',
    screen: Screens.Documents,
    children: [],
  },
  {
    id: PageNames.DocumentViewer,
    title: 'Document Viewer',
    screen: Screens.DocumentViewer,
    children: [],
  },
  {
    id: PageNames.Settings,
    title: 'Settings',
    screen: Screens.Settings,
    children: [],
  },
  {
    id: PageNames.Themes,
    title: 'Themes',
    screen: Screens.Themes,
    children: [],
  },
  {
    id: 'Cards',
    title: 'Cards',
    screen: Screens.Cards,
    children: [],
  },
];
