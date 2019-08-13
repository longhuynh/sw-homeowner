import React from 'react';
import _ from 'lodash';
import { createStackNavigator } from 'react-navigation';
import { withSwTheme } from 'sw-react-native-ui';
import { NavBar } from '../../components/index';
import transition from './Transitions';
import { MainRoutes } from './Routes';

const main = {};
const flatRoutes = {};

const routeMapping = (route) => ({
  screen: withSwTheme(route.screen),
  title: route.title,
  desciption: route.desciption
});

(MainRoutes).forEach(route => {
  flatRoutes[route.id] = routeMapping(route);
  main[route.id] = routeMapping(route);
  route.children.forEach(nestedRoute => {
    flatRoutes[nestedRoute.id] = routeMapping(nestedRoute);
  });
});

const renderHeader = (navigation, props) => {
  const ThemedNavigationBar = withSwTheme(NavBar);
  return (
    <ThemedNavigationBar navigation={navigation} headerProps={props} />
  );
};

const DrawerRoutes = Object.keys(main).reduce((routes, name) => {
  const rawRoutes = routes;
  rawRoutes[name] = {
    name,
    screen: createStackNavigator(flatRoutes, {
      initialRouteName: name,
      headerMode: 'screen',
      cardStyle: { backgroundColor: 'transparent' },
      transitionConfig: transition,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false,
        header: (props) => renderHeader(navigation, props),
      }),
    }),
  };
  return rawRoutes;
}, {});

export const AppRoutes = DrawerRoutes;