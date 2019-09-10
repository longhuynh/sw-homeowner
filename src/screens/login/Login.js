import React from 'react';
import { SwAvoidKeyboard, SwStyleSheet } from 'sw-react-native-ui';
import NavigationType from '../../config/navigation/NavigationType';
import { Input, Button } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { View, Text, Keyboard, ImageBackground, Dimensions } from 'react-native';
import { PageNames } from '../../config/AppConstants';
import { LoginService } from '../../services/LoginService';
import { HttpService } from '../../services/config';
import { UnitService } from '../../services/UnitService';
import { StorageService } from '../../services/StorageService';
const moment = require('moment');

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
    this.unitService = new UnitService();

    this.state = {
      username: 'TravisTesterton',
      password: '123456',
      // username: '',
      // password: ''
      loginFailed: false,
      showLoading: false,
      hideTestFeature: true,
      units: [],
      ownerFullName: ''
    };
  }

  componentDidMount() {

  }

  async submitLoginCredentials() {
    console.log(HttpService.baseUrl);

    if(this.state.username == '' || this.state.password == ''){
      alert('Please enter username and password.');
      return;
    }

    if (this.state.username == 'SHOWDEMO' && this.state.password == 'DEMO654') {
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

  async loadOwnerUnits(userIdEncrypted) {
    await this.unitService.getUnitsByUser(userIdEncrypted)
      .then(async (response) => {       
        const units = response.GetUnitsByUserResult;
        StorageService.units = units;

        if(units.length > 0){
          this.loadOwnerUnitDetails(units[0], userIdEncrypted);         
        }else{
          alert("No unit to manage")
        }

        this.setState({units: units});
      });
  }

  async loadOwnerUnitDetails(unit, userIdEncrypted) {
    await this.unitService.getOwnerUnitDetails(unit.UnitIdEncrypted)
      .then(async (response) => {       
        const profile = response.GetOwnerUnitDetailsResult;        
        StorageService.ownerUnitProfile = profile;
        StorageService.unit = unit;

        const ownerFullName =  `${profile.Owner.OwnerFirstName || ''} ${profile.Owner.OwnerLastName || ''}`;
        const navigationParams = {
          unitIdEncrypted: unit.UnitIdEncrypted,
          ownerFullName: ownerFullName,
          address: unit.UnitAddress,
          units: this.state.units
        };

        this.loadShortResidentUser(unit.AssociationIdEncrypted, userIdEncrypted);

        this.props.navigation.navigate(PageNames.Dashboard, navigationParams);        
      }) 
      .catch((error) => {
        console.log(error);
      });
  }

  async loadShortResidentUser(associationIdEncrypted, userIdEncrypted) {
    await this.loginService.getShortResidentUser(associationIdEncrypted, userIdEncrypted)
      .then(async (response) => {       
        console.log(response)
        if(response != null)
          HttpService.environmentName = response.GetShortResidentUserResult.Environment;
      }) 
      .catch((error) => {
        console.log(error);      
      });
  }

  async login() {
    this.setState({ showLoading: true });
    
    let now = moment(new Date()); 
   
    await this.loginService.login(this.state.username, this.state.password)
      .then(async (response) => {
        console.log(response);       
        if (response != null) {
          this.setState({ loginFailed: false });

          await this.loadOwnerUnits(response.UserIdEncrypted).then(r => {
            this.setState({ showLoading: false });
          });  

          let end = moment(new Date()); 
          let duration = moment.duration(end.diff(now));
          let seconds = duration.asMilliseconds();

          console.log(seconds);
        }
        else {
          let end = moment(new Date()); 
          let duration = moment.duration(end.diff(now));
          let seconds = duration.asSeconds();

          if(seconds >= 5){
            alert('Unable to contact Smartwebs servers.  Please try again later.');
          }else{
            this.setState({ loginFailed: true });
          }         
          this.setState({ showLoading: false });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ showLoading: false });
      });
  }

  getImageBackgroundSource = () => (
    require('../../assets/images/wallpaper.jpg')
  );

  onDevButtonPressed() {
    HttpService.switchToEnvironment('Dev');
  }

  onDemoButtonPressed() {
    HttpService.switchToEnvironment('Demo');
  }

  onProdButtonPressed() {
    HttpService.switchToEnvironment('Prod');
  }

  renderEnvironment = () => {
    return (
      <View style={styles.root}>
        {
          this.state.hideTestFeature ? (
            <View />
          ) : (
              <View style={styles.environmentButtons}>
                <Button
                  title='Dev'
                  clear
                  activeOpacity={0.5}
                  titleStyle={{ color: 'white', fontSize: 14 }}
                  buttonStyle={{ height: 35, width: 60, backgroundColor: 'transparent' }}
                  containerStyle={{ marginTop: -10 }}
                  onPress={this.onDevButtonPressed}
                />
                <Button
                  title='Demo'
                  clear
                  activeOpacity={0.5}
                  titleStyle={{ color: 'white', fontSize: 14 }}
                  buttonStyle={{ height: 35, width: 60, backgroundColor: 'transparent' }}
                  containerStyle={{ marginTop: -10 }}
                  onPress={this.onDemoButtonPressed}
                />
                <Button
                  title='Prod'                  
                  clear
                  activeOpacity={0.5}
                  titleStyle={{ color: 'white', fontSize: 14 }}
                  buttonStyle={{ height: 35, width: 60, backgroundColor: 'transparent' }}
                  containerStyle={{ marginTop: -10 }}
                  onPress={this.onProdButtonPressed}
                />
              </View>
            )
        }
      </View>
    );
  }

  renderError() {
    return (
      <View style={styles.root}>
        {
          this.state.loginFailed ? (
            <Text style={{ color: 'red' }}>Username or password incorrect.</Text>
          ):(
              <View />
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
                  leftIcon={<FontAwesome name='user-o' color='rgba(171, 189, 219, 1)' size={25} />}
                  containerStyle={{ marginVertical: 10 }}
                  onChangeText={username => this.setState({ username: username, loginFailed: false })}
                  value={username}
                  inputStyle={{ marginLeft: 10, color: 'white', fontSize: 15 }}
                  keyboardAppearance='light'
                  placeholder='Username'
                  autoFocus={false}
                  autoCapitalize='none'
                  autoCorrect={false}
                  keyboardType='default'
                  returnKeyType='next'
                  ref={input => (this.usernameInput = input)}
                  onSubmitEditing={() => { this.passwordInput.focus(); }}
                  blurOnSubmit={false}
                  placeholderTextColor='white'
                  errorStyle={{ textAlign: 'center', fontSize: 12 }}
                />
                <Input
                  leftIcon={<FontAwesome name='lock' color='rgba(171, 189, 219, 1)' size={25} />}
                  containerStyle={{ marginVertical: 10 }}
                  onChangeText={password => this.setState({ password: password, loginFailed: false })}
                  value={password}
                  inputStyle={{ marginLeft: 10, color: 'white', fontSize: 15 }}
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
                loadingProps={{ size: 'small', color: 'transparent' }}
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
              <View style={styles.footerView}>
                {this.renderError()}
              </View>
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