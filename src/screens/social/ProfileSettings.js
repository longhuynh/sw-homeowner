import React from 'react';
import { ScrollView, View, StyleSheet, AsyncStorage} from 'react-native';
import { SwText, SwTextInput, SwAvoidKeyboard, SwTheme, SwStyleSheet} from 'sw-react-native-ui';
import { Avatar, GradientButton} from '../../components/index';
import { DbStorageKey } from '../../services/storageKey';

export class ProfileSettings extends React.Component {
  static navigationOptions = {
    title: 'Profile Settings'.toUpperCase(),
  };

  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      homePhone: '',
      mailingAddress: '',
      mailingCity: '',
      mailingState:'',
      mailingZipCode: '', 
      unitAddress: '',
      unitCity: '',
      unitState:'',
      unitZipCode: '', 
    };
  }

  async componentWillMount(){   
    const selectedUnit = await AsyncStorage.getItem(DbStorageKey.SelectedUnit);   
    const unit = JSON.parse(selectedUnit);
    this.updateState(unit);    
  }

  updateState(data){
    console.log(data);
    this.setState({
      firstName: data.OwnerFirstName,
      lastName: data.OwnerLastName,
      email: data.OwnerEmail,
      phone: data.CellPhone,
      homePhone: data.HomePhone,
      mailingAddress: data.MailingAddress,
      mailingCity: data.MailingCity,
      mailingState: data.MailingState,
      mailingZipCode: data.MailingZip,
      unitAddress: data.UnitAddress,
      unitCity: data.UnitCity,
      unitState: data.UnitState,
      unitZipCode: data.UnitZip,
    });
  }

  onFirstNameInputChanged = (text) => {
    this.setState({ firstName: text });
  };

  onLastNameInputChanged = (text) => {
    this.setState({ lastName: text });
  };

  onEmailInputChanged = (text) => {
    this.setState({ email: text });
  };

  onPhoneInputChanged = (text) => {
    this.setState({ phone: text });
  };

  onMailingAddressInputChanged = (text) => {
    this.setState({ mailingAddress: text });
  };

  onMailingCityInputChanged = (text) => {
    this.setState({ mailingCity: text });
  };

  onMailingStateInputChanged = (text) => {
    this.setState({ mailingState: text });
  };

  onMailingZipCodeInputChanged = (text) => {
    this.setState({ mailingZipCode: text });
  };

  onUnitAddressInputChanged = (text) => {
    this.setState({ unitAddress: text });
  };

  onUnitCityInputChanged = (text) => {
    this.setState({ unitCity: text });
  };

  onUnitStateInputChanged = (text) => {
    this.setState({ unitState: text });
  };

  onUnitZipCodeInputChanged = (text) => {
    this.setState({ unitZipCode: text });
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
              value=''
              onChangeText={this.onPhoneInputChanged}
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
              value={this.state.mailingZipCode}              
              swType='right clear'
              onChangeText={this.onMailingZipCodeInputChanged}
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
              value={this.state.mailingZipCode}              
              swType='right clear'
              onChangeText={this.onMailingZipCodeInputChanged}
            />
          </View>
        </View>
        <GradientButton swType='large' style={styles.button} text='SAVE' />
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
