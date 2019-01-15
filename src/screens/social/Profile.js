import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { SwText, SwTextInput, SwButton, SwTheme, SwStyleSheet } from 'sw-react-native-ui';
import { data } from '../../data/DataProvider';
import { Avatar, GradientButton } from '../../components/index';
import { FontIcons } from '../../assets/icons';
import { scale } from '../../utils/scale';

export class Profile extends React.Component {
  static navigationOptions = {
    title: 'Profile'.toUpperCase(),
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

  onEditButtonPressed = () => {
    this.props.navigation.navigate('ProfileSettings');
  };

  onChangeThemeButtonPressed = () => {
    this.props.navigation.navigate('Themes');
  };

  onLogoutButtonPressed = () => {
    this.props.navigation.navigate('Login');
  };

  render = () => (
    <ScrollView style={styles.root}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={styles.buttons}>
            <SwButton style={styles.circleButton} swType='icon circle' onPress={this.onEditButtonPressed} >
              <SwText swType='moon large primary'>{FontIcons.profile}</SwText>
            </SwButton>
          </View>
          <Avatar img={this.user.photo} swType='big' />
          <View style={styles.buttons}>
            <SwButton style={styles.circleButton} swType='icon circle' onPress={this.onChangeThemeButtonPressed}>
              <SwText swType='moon large primary'>{FontIcons.theme}</SwText>
            </SwButton>
          </View>
        </View>
      </View>
     
      <View style={styles.section}>
        <View style={[styles.row, styles.heading]}>
          <SwText swType='header6 primary'>INFO</SwText>
        </View>
        <View style={styles.row}>
          <SwTextInput
            label='First Name'
            returnKeyType='next'
            value={this.state.firstName}
            swType='right clear'
            editable={false}
            selectTextOnFocus={false}
            color='white'
          />
        </View>
        <View style={styles.row}>
          <SwTextInput
            label='Last Name'
            returnKeyType='next'
            value={this.state.lastName}
            swType='right clear'
            editable={false}
            selectTextOnFocus={false}
          />
        </View>
        <View style={styles.row}>
          <SwTextInput
            label='Email'
            returnKeyType='next'
            keyboardType='email-address'
            value={this.state.email}
            swType='right clear'
            editable={false}
            selectTextOnFocus={false}
          />
        </View>
        <View style={styles.row}>
          <SwTextInput
            label='Cell Phone'
            returnKeyType='next'
            keyboardType='phone-pad'
            value={this.state.phone}
            swType='right clear'
            editable={false}
            selectTextOnFocus={false}
          />
        </View>
        <View style={styles.row}>
          <SwTextInput
            label='Home Phone'
            returnKeyType='next'
            keyboardType='phone-pad'
            value='N/A'
            swType='right clear'
            editable={false}
            selectTextOnFocus={false}
          />
        </View>
      </View>
      <GradientButton swType='small' style={styles.logout} text='LOG OUT' onPress={this.onLogoutButtonPressed} />
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
  userInfo: {
    flexDirection: 'row',
    paddingVertical: 18,
  },
  bordered: {
    borderBottomWidth: 1,
    borderColor: theme.colors.border.base,
  },
  section: {
    marginVertical: 25,
  },
  heading: {
    paddingBottom: 12.5,
  },
  headerRow: {
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 17.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    alignItems: 'center',
  },
  buttons: {
    flex: 1,
  },
  circleButton: {
    marginTop: scale(27.5),
    alignSelf: 'center',
  },
  button: {
    alignSelf: 'center',
    width: scale(120),
    marginBottom: scale(16),
  },
  logout: {
    width: scale(120),
    marginRight: scale(20),
    marginBottom: scale(20),
    alignSelf: 'flex-end'
  },
}));
