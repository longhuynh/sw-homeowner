import React from 'react';
import { View, Image, StatusBar, Platform } from 'react-native';
import { SwText, SwTheme, SwStyleSheet} from 'sw-react-native-ui';
import { SwDarkTheme } from '../../config/DarkTheme';
import { SwHomeOwnerTheme } from '../../config/Theme';
import { GradientButton } from '../../components/gradient-button/GradientButton';

export class Themes extends React.Component {
  static navigationOptions = {
    title: 'Theme'.toUpperCase(),
  };

  onLightThemeApplyButtonPressed = () => {
    StatusBar.setBarStyle('dark-content', true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(SwHomeOwnerTheme.colors.screen.base);
    }
    SwTheme.setTheme(SwHomeOwnerTheme);
  };

  onDarkThemeApplyButtonPressed = () => {
    StatusBar.setBarStyle('light-content', true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(SwDarkTheme.colors.screen.base);
    }
    SwTheme.setTheme(SwDarkTheme);
  };

  render = () => (
    <View style={styles.root}>
      <View style={styles.container}>
        <SwText>Light Theme</SwText>
        <Image style={styles.image} source={require('../../assets/images/lightThemeImage.png')} />
        <GradientButton
          text='APPLY'
          onPress={this.onLightThemeApplyButtonPressed}
        />
      </View>
      <View style={styles.container}>
        <SwText>Dark Theme</SwText>
        <Image style={styles.image} source={require('../../assets/images/darkThemeImage.png')} />
        <GradientButton
          text='APPLY'
          onPress={this.onDarkThemeApplyButtonPressed}
        />
      </View>
    </View>
  );
}

const styles = SwStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
    flex: 1,
    paddingHorizontal: 72,

  },
  image: {
    height: 160,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
}));
