import React from 'react';
import { ScrollView, View, StyleSheet
} from 'react-native';
import { SwText, SwTextInput, SwAvoidKeyboard, SwTheme, SwStyleSheet} from 'sw-react-native-ui';
import { data } from '../../data/DataProvider';
import { Avatar, SocialSetting, GradientButton,
} from '../../components/index';
import { FontAwesome } from '../../assets/icons';

export class ProfileSettings extends React.Component {
  static navigationOptions = {
    title: 'Profile Settings'.toUpperCase(),
  };

  user = data.getUser();

  state = {
    firstName: this.user.firstName,
    lastName: this.user.lastName,
    email: this.user.email,
    country: this.user.country,
    phone: this.user.phone,
    address: this.user.address,
    city: this.user.city,
    state: this.user.state,
    zipcode: this.user.zipcode,
  };

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

  onAddressInputChanged = (text) => {
    this.setState({ address: text });
  };

  onCityInputChanged = (text) => {
    this.setState({ city: text });
  };

  onStateInputChanged = (text) => {
    this.setState({ state: text });
  };

  onZipCodeInputChanged = (text) => {
    this.setState({ zipcode: text });
  };

  render = () => (
    <ScrollView style={styles.root}>
      <SwAvoidKeyboard>
        <View style={styles.header}>
          <Avatar img={this.user.photo} swType='big' />
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
              value={this.state.address}
              swType='right clear'
              onChangeText={this.onAddressInputChanged}
            />
          </View>
          <View style={styles.row}>
            <SwTextInput
              label='City'
              returnKeyType='next'
              value={this.state.city}
              swType='right clear'
              onChangeText={this.onCityInputChanged}
            />
          </View>
          <View style={styles.row}>
            <SwTextInput
              label='State'
              returnKeyType='next'
              value={this.state.state}
              swType='right clear'
              onChangeText={this.onStateInputChanged}
            />
          </View>
          <View style={styles.row}>
            <SwTextInput
              label='Zip Code'
              returnKeyType='next'
              value={this.state.zipcode}              
              swType='right clear'
              onChangeText={this.onZipCodeInputChanged}
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
              value={this.state.address}
              swType='right clear'
              onChangeText={this.onAddressInputChanged}
            />
          </View>
          <View style={styles.row}>
            <SwTextInput
              label='City'
              returnKeyType='next'
              value={this.state.city}
              swType='right clear'
              onChangeText={this.onCityInputChanged}
            />
          </View>
          <View style={styles.row}>
            <SwTextInput
              label='State'
              returnKeyType='next'
              value={this.state.state}
              swType='right clear'
              onChangeText={this.onStateInputChanged}
            />
          </View>
          <View style={styles.row}>
            <SwTextInput
              label='Zip Code'
              returnKeyType='next'
              value={this.state.zipcode}              
              swType='right clear'
              onChangeText={this.onZipCodeInputChanged}
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
