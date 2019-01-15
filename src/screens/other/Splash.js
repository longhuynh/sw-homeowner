import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SwText, SwTheme } from 'sw-react-native-ui';
import { StackActions, NavigationActions } from 'react-navigation';
import { ProgressBar } from '../../components/index';
import { SwHomeOwnerTheme } from '../../config/Theme';
import { scale, scaleVertical } from '../../utils/scale';
import NavigationType from '../../config/navigation/NavigationType';

const delay = 500;

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height - 15;

export class SplashScreen extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };
  state = {
    progress: 0,
  };

  componentDidMount() {
    StatusBar.setHidden(true, 'none');
    SwTheme.setTheme(SwHomeOwnerTheme);
    this.timer = setInterval(this.updateProgress, delay);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  updateProgress = () => {
    if (this.state.progress === 1) {
      clearInterval(this.timer);
      setTimeout(this.onLoaded, delay);
    } else {
      const randProgress = this.state.progress + (Math.random() * 0.5);
      this.setState({ progress: randProgress > 1 ? 1 : randProgress });
    }
  };

  onLoaded = () => {
    StatusBar.setHidden(false, 'slide');
    const toHome = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });
    this.props.navigation.dispatch(toHome);
  };

  render = () => (
    <View style={styles.container}>
      <View>
        <Image
          style={[styles.image, { width: Dimensions.get('window').width }]}
          source={require('../../assets/images/bg_screen1.jpg')}
        />
      </View>
      <ProgressBar
        color={SwTheme.current.colors.accent}
        style={styles.progress}
        progress={this.state.progress}
        width={scale(screenWidth)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: SwHomeOwnerTheme.colors.screen.base,
    justifyContent: 'space-between',
    flex: 1,
  },
  image: {
    resizeMode: 'cover',
    height: scaleVertical(screenHeight),
  },
  text: {
    alignItems: 'center',
  },
  appName: {
    fontSize: 24,
  },
  progress: {
    alignSelf: 'center',
    marginBottom: 0,
    backgroundColor: '#e5e5e5',
  },
});
