import React from 'react';
import { ScrollView, View, StyleSheet} from 'react-native';
import { SwText, SwTextInput, SwAvoidKeyboard, SwStyleSheet} from 'sw-react-native-ui';
import { Avatar, GradientButton} from '../../components/index';
import { UnitService } from '../../services/UnitService';
import { CurrentUser } from '../../services/LoginService';
import { PageNames } from '../../config/AppConstants';
import { StorageService } from '../../services/StorageService';
import NavigationType from '../../config/navigation/NavigationType';

export class ProfileSettings extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };

  static navigationOptions = {
    title: 'Profile Settings',
  };

  constructor(props) {
    super(props);

    this.unitService = new UnitService();

    this.state = {
      profile: {},
      firstName: this.profile.Owner.OwnerFirstName,
      lastName: this.profile.Owner.OwnerLastName,
      email: this.profile.Owner.OwnerEmail,
      phone: this.profile.Owner.CellPhone1,
      homePhone: this.profile.Owner.NightPhone,
      mailingAddress: this.profile.Owner.MailingAddress,
      mailingCity: this.profile.Owner.MailingCity,
      mailingState: this.profile.Owner.MailingState,
      mailingZip: this.profile.Owner.MailingZip,
      unitAddress: this.profile.Unit.UnitAddress,
      unitCity: this.profile.Unit.UnitCity,
      unitState: this.profile.Unit.UnitState,
      unitZip: this.profile.Unit.UnitZip
    };
  }

  profile = StorageService.ownerUnitProfile;

  async componentWillMount(){ }
  
  onFirstNameInputChanged = (text) => {
    this.setState({ firstName: text });
    this.profile.Owner.OwnerFirstName = text;
  };

  onLastNameInputChanged = (text) => {
    this.setState({ lastName: text });
    this.profile.Owner.OwnerLastName = text;
  };

  onEmailInputChanged = (text) => {
    this.setState({ email: text });
    this.profile.Owner.OwnerEmail = text;
  };

  onPhoneInputChanged = (text) => {
    this.setState({ phone: text });
    this.profile.Owner.CellPhone1 = text;
  };

  onHomePhoneInputChanged = (text) => {
    this.setState({ homePhone: text });
    this.profile.Owner.NightPhone = text;
  };

  onMailingAddressInputChanged = (text) => {
    this.setState({ mailingAddress: text });
    this.profile.Owner.MailingAddress = text;
  };

  onMailingCityInputChanged = (text) => {
    this.setState({ mailingCity: text });
    this.profile.Owner.MailingCity = text;
  };

  onMailingStateInputChanged = (text) => {
    this.setState({ mailingState: text });
    this.profile.Owner.MailingState = text;
  };

  onMailingZipInputChanged = (text) => {
    this.setState({ mailingZip: text });
    this.profile.Owner.MailingZip = text;
  };

  onUnitAddressInputChanged = (text) => {
    this.setState({ unitAddress: text });
    this.profile.Unit.UnitAddress = text;
  };

  onUnitCityInputChanged = (text) => {
    this.setState({ unitCity: text });
    this.profile.Unit.unitCity = text;
  };

  onUnitStateInputChanged = (text) => {
    this.setState({ unitState: text });
    this.profile.Unit.UnitState = text;
  };

  onUnitZipInputChanged = (text) => {
    this.setState({ unitZip: text });
    this.profile.Unit.UnitZip = text;
  };

  onSaveButtonPressed = async () => {  
    await this.unitService.saveOwnerUnit(this.profile.Owner.AssociationIdEncrypted, 
                CurrentUser.ManagementIdEncrypted, CurrentUser.UserIdEncrypted, 
                this.profile.Owner, this.profile.Unit)
      .then(response => {
        console.log(response)
        if(response != null){
          StorageService.ownerUnitProfile = response.SaveOwnerUnitResult;
          this.props.navigation.navigate(PageNames.Profile, {refresh: true});
        }       
      })
      .catch(error => {
        console.log(error);
      });
  };

  render = () => (
    <ScrollView style={styles.root}>
      <SwAvoidKeyboard>
        <View style={styles.header}>
          <Avatar img={require('../../data/img/avatars/no-avatar.png')} swType='big' />
        </View>
        <View style={styles.section}>
          <View style={[styles.row, styles.heading]}>
            <SwText swType='header6 primary'>PROFILE INFO</SwText>
          </View>
          <View style={styles.row}>
            <SwTextInput
              label='First Name'
              returnKeyType='next'
              value={this.state.firstName}
              swType='right clear'
              onChangeText={this.onFirstNameInputChanged}
            />
          </View>
          <View style={styles.row}>
            <SwTextInput
              label='Last Name'
              returnKeyType='next'
              value={this.state.lastName}
              onChangeText={this.onLastNameInputChanged}
              swType='right clear'
            />
          </View>
          <View style={styles.row}>
            <SwTextInput
              label='Email'
              returnKeyType='next'
              keyboardType='email-address'
              value={this.state.email}
              onChangeText={this.onEmailInputChanged}
              swType='right clear'
              autoCapitalize='none'
              autoCorrect={false}
            />
          </View>
          <View style={styles.row}>
            <SwTextInput
              label='Cell Phone'
              returnKeyType='next'
              keyboardType='phone-pad'
              value={this.state.phone}
              onChangeText={this.onPhoneInputChanged}
              swType='right clear'
            />
          </View>
          <View style={styles.row}>
            <SwTextInput
              label='Home Phone'
              returnKeyType='next'
              keyboardType='phone-pad'
              value={this.state.homePhone}
              onChangeText={this.onHomePhoneInputChanged}
              swType='right clear'
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={[styles.row, styles.heading]}>
            <SwText swType='primary header6'>UNIT INFO</SwText>
          </View>
          <View style={styles.row}>
            <SwTextInput
              label='Address'
              returnKeyType='next'
              value={this.state.unitAddress}
              swType='right clear'
              onChangeText={this.onUnitAddressInputChanged}
            />
          </View>
          <View style={styles.row}>
            <SwTextInput
              label='City'
              returnKeyType='next'
              value={this.state.unitCity}
              swType='right clear'
              onChangeText={this.onUnitCityInputChanged}
            />
          </View>
          <View style={styles.row}>
            <SwTextInput
              label='State'
              returnKeyType='next'
              value={this.state.unitState}
              swType='right clear'
              onChangeText={this.onUnitStateInputChanged}
            />
          </View>
          <View style={styles.row}>
            <SwTextInput
              label='Zip Code'
              returnKeyType='next'
              value={this.state.unitZip}              
              swType='right clear'
              onChangeText={this.onUnitZipInputChanged}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={[styles.row, styles.heading]}>
            <SwText swType='primary header6'>MAILING INFO</SwText>
          </View>
          <View style={styles.row}>
            <SwTextInput
              label='Address'
              returnKeyType='next'
              value={this.state.mailingAddress}
              swType='right clear'
              onChangeText={this.onMailingAddressInputChanged}
            />
          </View>
          <View style={styles.row}>
            <SwTextInput
              label='City'
              returnKeyType='next'
              value={this.state.mailingCity}
              swType='right clear'
              onChangeText={this.onMailingCityInputChanged}
            />
          </View>
          <View style={styles.row}>
            <SwTextInput
              label='State'
              returnKeyType='next'
              value={this.state.mailingState}
              swType='right clear'
              onChangeText={this.onMailingStateInputChanged}
            />
          </View>
          <View style={styles.row}>
            <SwTextInput
              label='Zip Code'
              returnKeyType='next'
              value={this.state.mailingZip}              
              swType='right clear'
              onChangeText={this.onMailingZipInputChanged}
            />
          </View>
        </View>
        
        <GradientButton swType='large' style={styles.button} text='SAVE' onPress={this.onSaveButtonPressed} />
      </SwAvoidKeyboard>
    </ScrollView>
  );
}

const styles = SwStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
  },
  header: {
    backgroundColor: theme.colors.screen.neutral,
    paddingVertical: 25,
  },
  section: {
    marginVertical: 25,
  },
  heading: {
    paddingBottom: 12.5,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 17.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    alignItems: 'center',
  },
  button: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
}));
