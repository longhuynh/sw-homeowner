import _ from 'lodash';
import { FontIcons } from '../../assets/icons';
import * as Screens from '../../screens';

export const MainRoutes = [
  {
    id: 'Login',
    title: 'Login',
    description: '',
    icon: FontIcons.login,
    screen: Screens.Login,
    children: [],
  },
  {
    id: 'WorkOrderMenu',
    title: 'Work Orders',
    icon: FontIcons.article,
    screen: Screens.WorkOrders,
    children: [
      {
        id: 'WorkOrders',
        title: 'Work Order',
        description: 'Overview',
        screen: Screens.WorkOrders,
        children: [],
      },     
      {
        id: 'WorkOrder',
        title: 'Work Order Detail',
        description: 'Detail',
        screen: Screens.WorkOrder,
        children: [],
      },   
    ],
  },
  {
    id: 'SocialMenu',
    title: 'Social',
    icon: FontIcons.profile,
    screen: Screens.SocialMenu,
    children: [
      {
        id: 'Profile',
        title: 'Profile',
        description: 'Detail',
        screen: Screens.Profile,
        children: [],
      },
      {
        id: 'ProfileV2',
        title: 'Profile V2',
        description: 'Detail',
        screen: Screens.ProfileV2,
        children: [],
      },
      {
        id: 'ProfileSettings',
        title: 'Profile Settings',
        screen: Screens.ProfileSettings,
        children: [],
      },
      {
        id: 'ProfileSettingsV2',
        title: 'Profile Settings V2',
        screen: Screens.ProfileSettingsV2,
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
    id: 'ArticlesMenu',
    title: 'Articles',
    icon: FontIcons.article,
    screen: Screens.ArticleMenu,
    children: [
      {
        id: 'Articles',
        title: 'Article List',
        screen: Screens.Articles,
        children: [],
      },
      {
        id: 'Blogposts',
        title: 'Blogposts',
        screen: Screens.Blogposts,
        children: [],
      },
      {
        id: 'Article',
        title: 'Article View',
        screen: Screens.Article,
        children: [],
      },
    ],
  },
  {
    id: 'MessagingMenu',
    title: 'Messaging',
    icon: FontIcons.mail,
    screen: Screens.MessagingMenu,
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
        id: 'Comments',
        title: 'Comments',
        screen: Screens.Comments,
        children: [],
      },
    ],
  },
  {
    id: 'Dashboards',
    title: 'Dashboards',
    icon: FontIcons.dashboard,
    screen: Screens.Dashboard,
    children: [],
  },
  {
    id: 'NavigationMenu',
    icon: FontIcons.navigation,
    title: 'Navigation',
    screen: Screens.NavigationMenu,
    children: [
      {
        id: 'GridV1',
        title: 'Grid Menu V1',
        screen: Screens.GridV1,
        children: [],
      },
      {
        id: 'GridV2',
        title: 'Grid Menu V2',
        screen: Screens.GridV2,
        children: [],
      },
      {
        id: 'Side',
        title: 'Side Menu',
        action: 'DrawerOpen',
        screen: Screens.SideMenu,
        children: [],
      },
    ],
  },
  {
    id: 'Settings',
    title: 'Settings',
    icon: FontIcons.other,
    screen: Screens.Settings,
    children: [],
  },
  {
    id: 'Themes',
    title: 'Themes',
    icon: FontIcons.theme,
    screen: Screens.Themes,
    children: [],
  },
];

const menuRoutes = _.cloneDeep(MainRoutes);
menuRoutes.unshift({
  id: 'GridV2',
  title: 'Start',
  screen: Screens.GridV2,
  children: [],
});

export const MenuRoutes = menuRoutes;
