import React from 'react';
import { View, Image } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import { withSwTheme } from 'sw-react-native-ui';
import { AppRoutes } from './config/navigation/RoutesBuilder';
import * as Screens from './screens/index';
import { bootstrap } from './config/bootstrap';
import track from './config/analytics';
import { data } from './data/DataProvider';

bootstrap();
data.populateData();

const SwHomeOwnerApp = createStackNavigator({
  First: {
    screen: Screens.Login,
  },
  Home: {
    screen: createDrawerNavigator(
      {
        ...AppRoutes,
      },
      {
        contentComponent: (props) => {
          const SideMenu = withSwTheme(Screens.SideMenu);
          return <SideMenu {...props} />;
        },
      },
    ),
  },
}, {
  headerMode: 'none',
});

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default class App extends React.Component {
  state = {
    isLoaded: false,
  };

  componentWillMount() {
    this.loadAssets();
  }

  onNavigationStateChange = (previous, current) => {
    const screen = {
      current: this.getCurrentRouteName(current),
      previous: this.getCurrentRouteName(previous),
    };
    if (screen.previous !== screen.current) {
      track(screen.current);
    }
  };

  getCurrentRouteName = (navigation) => {
    const route = navigation.routes[navigation.index];
    return route.routes ? this.getCurrentRouteName(route) : route.routeName;
  };

  loadAssets = async () => {
    await Font.loadAsync({
      'MaterialIcons': require('./assets/fonts/MaterialIcons.ttf'),
      'FontAwesome': require('./assets/fonts/FontAwesome.ttf'),
      'Icomoon': require('./assets/fonts/Icomoon.ttf'),
      'Righteous-Regular': require('./assets/fonts/Righteous-Regular.ttf'),
      'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
      'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
      'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
      'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    });

    const imageAssets = cacheImages([
      require('./assets/images/bg_screen1.jpg'),
      require('./assets/images/bg_screen2.jpg'),
      require('./assets/images/bg_screen3.jpg'),
      require('./assets/images/bg_screen4.jpg'),
      require('./assets/images/wallpaper_1.jpg'),
      require('./assets/images/wallpaper_2.jpg'),
      require('./assets/images/wallpaper_3.jpg'),
      require('./assets/images/wallpaper_4.jpg')
    ]);

    const fontAssets = cacheFonts([FontAwesome.font, Ionicons.font]);

    await Promise.all([...imageAssets, ...fontAssets]);

    this.setState({ isLoaded: true });
  };

  renderLoading = () => (    
    <AppLoading />
  );

  renderApp = () => (
    <View style={{ flex: 1 }}>
      <SwHomeOwnerApp onNavigationStateChange={this.onNavigationStateChange} />
    </View>
  );

  render = () => (this.state.isLoaded ? this.renderApp() : this.renderLoading());
}

Expo.registerRootComponent(App);
