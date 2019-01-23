import React from 'react';
import { SwAvoidKeyboard, SwStyleSheet} from 'sw-react-native-ui';
import { scaleVertical } from '../../utils/scale';
import NavigationType from '../../config/navigation/NavigationType';
import { Font } from 'expo';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, Keyboard, ImageBackground, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      username: '',
      password: '',
      loginFailed: false,
      showLoading: false,
    };
  }

  static propTypes = {
    navigation: NavigationType.isRequired,
  };

  static navigationOptions = {
    header: null,
  };

  async componentDidMount() {
    await Font.loadAsync({
      georgia: require('../../assets/fonts/Georgia.ttf'),
      regular: require('../../assets/fonts/Montserrat-Regular.ttf'),
      light: require('../../assets/fonts/Montserrat-Light.ttf'),
      bold: require('../../assets/fonts/Montserrat-Bold.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  submitLoginCredentials() {
    const { showLoading } = this.state;

    this.setState({
      showLoading: !showLoading,
    });
  
    this.props.navigation.navigate('Violation');
  }

  getImageBackgroundSource = () => (
      require('../../assets/images/wallpaper_4.jpg')
  );

  render = () => {
    const { username, password, showLoading } = this.state;

    return (
      <SwAvoidKeyboard
        style={styles.screen}
        onStartShouldSetResponder={() => true}
        onResponderRelease={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <ImageBackground source={this.getImageBackgroundSource()} style={styles.bgImage}>
          {this.state.fontLoaded ? (
            <View style={styles.loginView}>
              <View style={styles.loginTitle}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.welcomeText}>WELCOME TO</Text>
                </View>
                <View style={{ marginTop: -5 }}>
                  <Text style={styles.welcomeText}>YOUR HOME</Text>
                </View>
              </View>
              <View style={styles.loginInput}>
              <Input
                  leftIcon={
                    <Icon
                      name='user-o'
                      color='rgba(171, 189, 219, 1)'
                      size={25}
                    />
                  }
                  containerStyle={{ marginVertical: 10 }}
                  onChangeText={username => this.setState({ username })}
                  value={username}
                  inputStyle={{ marginLeft: 10, color: 'white' }}
                  keyboardAppearance='light'
                  placeholder='Username'
                  autoFocus={false}
                  autoCapitalize='none'
                  autoCorrect={false}
                  keyboardType='default'
                  returnKeyType='next'
                  ref={input => (this.emailInput = input)}
                  onSubmitEditing={() => {
                    this.passwordInput.focus();
                  }}
                  blurOnSubmit={false}
                  placeholderTextColor='white'
                  errorStyle={{ textAlign: 'center', fontSize: 12 }}
                />
                <Input
                  leftIcon={
                    <Icon
                      name='lock'
                      color='rgba(171, 189, 219, 1)'
                      size={25}
                    />
                  }
                  containerStyle={{ marginVertical: 10 }}
                  onChangeText={password => this.setState({ password })}
                  value={password}
                  inputStyle={{ marginLeft: 10, color: 'white' }}
                  secureTextEntry={true}
                  keyboardAppearance='light'
                  placeholder='Password'
                  autoCapitalize='none'
                  autoCorrect={false}
                  keyboardType='default'
                  returnKeyType='done'
                  ref={input => (this.passwordInput = input)}
                  blurOnSubmit={true}
                  placeholderTextColor='white'
                />
              </View>
              <Button
                title='LOG IN'
                activeOpacity={1}
                underlayColor='transparent'
                onPress={this.submitLoginCredentials.bind(this)}
                loading={showLoading}
                loadingProps={{ size: 'small', color: 'white' }}
                buttonStyle={{
                  height: 50,
                  width: 250,
                  backgroundColor: 'black',
                  borderWidth: 2,
                  borderColor: 'white',
                  borderRadius: 30,
                }}
                containerStyle={{ marginVertical: 10 }}
                titleStyle={{ fontWeight: 'bold', color: 'white' }}
              />
              <View style={styles.footerView}>
                {/* <Text style={{ color: 'grey' }}>New here?</Text>
                <Button
                  title='Create an Account'
                  clear
                  activeOpacity={0.5}
                  titleStyle={{ color: 'white', fontSize: 15 }}
                  containerStyle={{ marginTop: -10 }}
                  onPress={() => console.log('Account created')}
                /> */}
              </View>
            </View> 
            ) : (
              <Text>Loading...</Text>
            )}
          </ImageBackground>
        </View> 
      </SwAvoidKeyboard>
   );
  }
}

const styles = SwStyleSheet.create(theme => ({
  screen: {
    flex: 1,
    justifyContent: 'space-between'
  },
  header: {
    paddingBottom: scaleVertical(10),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  content: {
    justifyContent: 'space-between',
  },
  login: {
    marginVertical: 20,
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: scaleVertical(24),
    marginHorizontal: 24,
    justifyContent: 'space-around',
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    
  },
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginView: {
    marginTop: 150,
    backgroundColor: 'transparent',
    width: 250,
    height: 400,
  },
  loginTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    color: 'white',
    fontSize: 30
  },  
  loginInput: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerView: {
    marginTop: 20,
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {},
}));