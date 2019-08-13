import React from 'react';
import { SwAvoidKeyboard, SwStyleSheet } from 'sw-react-native-ui';
import NavigationType from '../../config/navigation/NavigationType';
import { Input, Button } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { View, Text, Keyboard, ImageBackground, Dimensions, AsyncStorage } from 'react-native';
import { PageNames } from '../../config/AppConstants';
import { LoginService, CurrentUser } from '../../services/LoginService';
import { OwnerService } from '../../services/OwnerService';
import { DbStorageKey, AppStorageKey } from '../../services/storageKey';
import {ToastAndroid} from 'react-native';
import { HttpService } from '../../services/config';

const { width, height } = Dimensions.get('window');

export class Login extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };

  static navigationOptions = {
    header: null,
    drawerLockMode: 'locked-open'
  };

  constructor(props) {
    super(props);
    
    this.loginService = new LoginService();
    this.ownerService = new OwnerService();

    this.state = {
      username: 'smartwebssc',
      password: 'sc989',
      loginFailed: false,
      showLoading: false,
      hideTestFeature: true,
    };
  }

  componentDidMount() {

  }

  async submitLoginCredentials() {
    console.log(HttpService.baseUrl);
    if(this.state.username == 'SHOWDEMO' && this.state.password == 'DEMO654'){
      this.setState({
        hideTestFeature: false,
        username: '',
        password: ''
      });
    }
    else {
      await this.login();
    }   
  }

  async login() {
    await this.loginService.login(this.state.username, this.state.password)
      .then(async (response) => {
        this.setState({ showLoading: true });
        if (response != null) {
          this.setState({ loginFailed: false });
          console.log(CurrentUser);
          const unitOwners = this.ownerService.populateUnitOwners(response);
          await AsyncStorage.setItem(DbStorageKey.UnitOwners, JSON.stringify(unitOwners));
          await AsyncStorage.setItem(AppStorageKey.IsLogin, 'true');
          let navigationParams = {};
          if (unitOwners.length > 0) {
            const unit = unitOwners[0];
            await AsyncStorage.setItem(DbStorageKey.SelectedUnit, JSON.stringify(unit));
            const ownerFullName = `${unit.OwnerFirstName || ''} ${unit.OwnerLastName || ''}`;
            navigationParams = {
              unit: unit,
              unitIdEncrypted: unit.IdEncrypted,
              ownerFullName: ownerFullName,
              address: unit.UnitAddress,
              numberOfUnit: unitOwners.length
            };
          }
          this.setState({ showLoading: false });
          this.props.navigation.navigate(PageNames.Dashboard, navigationParams);
        }
        else {
          this.setState({ loginFailed: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({ showLoading: false });
  }

  getImageBackgroundSource = () => (
    require('../../assets/images/wallpaper_4.jpg')
  );

  onDevButtonPressed(){
    HttpService.switchToEnvironment('Dev');
  }

  onDemoButtonPressed(){
    HttpService.switchToEnvironment('Demo');
  }

  onProdButtonPressed(){
    HttpService.switchToEnvironment('Prod');
  }

  renderEnvironment = () => {
    return (
      <View style={styles.root}>
        {
          this.state.hideTestFeature ? (
            <View/>
          ) : (
            <View style={styles.environmentButtons}>      
            <Button
              title='Dev'
              clear
              activeOpacity={0.5}
              titleStyle={{ color: 'white', fontSize: 15 }}
              containerStyle={{ marginTop: -10 }}
              onPress={this.onDevButtonPressed}
            />
             <Button
              title='Demo'
              clear
              activeOpacity={0.5}
              titleStyle={{ color: 'white', fontSize: 15 }}
              containerStyle={{ marginTop: -10 }}
              onPress={this.onDemoButtonPressed}
            />
             <Button
              title='Prod'
              clear
              activeOpacity={0.5}
              titleStyle={{ color: 'white', fontSize: 15 }}
              containerStyle={{ marginTop: -10 }}
              onPress={this.onProdButtonPressed}
            />
          </View>
            )
        }
      </View>
    );
  }


  render = () => {
    const { username, password, showLoading } = this.state;

    return (
      <SwAvoidKeyboard
        style={styles.screen}
        onStartShouldSetResponder={() => true}
        onResponderRelease={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <ImageBackground source={this.getImageBackgroundSource()} style={styles.bgImage}>
            <View style={styles.loginView}>
              <View style={styles.loginTitle}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.welcomeText}>WELCOME TO</Text>
                </View>
                <View style={{ marginTop: -5 }}>
                  <Text style={styles.welcomeText}>YOUR HOME</Text>
                </View>
              </View>
              
              <View>{this.renderEnvironment()}</View>              

              <View style={styles.loginInput}>
                <Input
                  leftIcon={
                    <FontAwesome
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
                  ref={input => (this.usernameInput = input)}
                  onSubmitEditing={() => {
                    this.passwordInput.focus();
                  }}
                  blurOnSubmit={false}
                  placeholderTextColor='white'
                  errorStyle={{ textAlign: 'center', fontSize: 12 }}
                />
                <Input
                  leftIcon={
                    <FontAwesome
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
                  backgroundColor: 'transparent',
                  borderWidth: 2,
                  borderColor: 'white',
                  borderRadius: 30,
                }}
                containerStyle={{ marginVertical: 10 }}
                titleStyle={{ fontWeight: 'bold', color: 'white' }}
              />
              {/* <View style={styles.footerView}>
                <Text style={{ color: 'grey' }}>New here?</Text>
                <Button
                  title='Create an Account'
                  clear
                  activeOpacity={0.5}
                  titleStyle={{ color: 'white', fontSize: 15 }}
                  containerStyle={{ marginTop: -10 }}
                  onPress={() => console.log('Account created')}
                />
              </View> */}             
            </View>
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
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  content: {
    justifyContent: 'space-between',
  },
  environmentButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  login: {
    marginVertical: 20,
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: 24,
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
    width: width,
    height: height,
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