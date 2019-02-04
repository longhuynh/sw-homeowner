import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {SwText, SwTextInput, SwAvoidKeyboard, SwTabSet, SwTab, SwStyleSheet} from 'sw-react-native-ui';
import { data } from '../../data/DataProvider';
import { Avatar, GradientButton } from '../../components/index';
import { UnitInfo } from './tab/UnitInfo';
import { MailingInfo } from './tab/MailingInfo';

export class ProfileSettingsV2 extends React.Component {
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
          <SwTabSet style={styles.container}>
            <SwTab title='UNIT INFO' swType='header6 primary'>
              <UnitInfo />
            </SwTab>
            <SwTab title='MAILING INFO' swType='header6 primary'>
              <MailingInfo />
            </SwTab>
          </SwTabSet>
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
