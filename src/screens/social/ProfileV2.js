import React from 'react';
import { ScrollView, View, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { SwText, SwTextInput, SwTheme, SwStyleSheet } from 'sw-react-native-ui';
import { data } from '../../data/DataProvider';
import { Avatar, GradientButton } from '../../components/index';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height - 80;

export class ProfileV2 extends React.Component {
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

  getImageBackgroundSource = () => (
    require('../../assets/images/bg_screen3.jpg')
  );

  onEditButtonPressed = () => {
    this.props.navigation.navigate('ProfileSettings');
  };

  onLogoutButtonPressed = () => {
    this.props.navigation.navigate('Login');
  };

  render = () => (
    <ScrollView style={styles.root}>
      <ImageBackground source={this.getImageBackgroundSource()} style={styles.bgImage}>
        <View style={styles.container} >
          <View style={styles.header}>
            <Avatar img={this.user.photo} swType='big' />
          </View>
          <GradientButton swType='small' style={styles.button} text='EDIT' onPress={this.onEditButtonPressed} />
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
                label='Phone'
                returnKeyType='next'
                keyboardType='phone-pad'
                value={this.state.phone}
                swType='right clear'
                editable={false}
                selectTextOnFocus={false}
              />
            </View>
          </View>
        </View>
        <GradientButton swType='small' style={styles.logout} text='LOG OUT' onPress={this.onLogoutButtonPressed} />
      </ImageBackground>
    </ScrollView>
  );
}

const styles = SwStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
  },
  container: {
    backgroundColor: 'transparent',
    opacity: 1,
    marginHorizontal: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'transparent',
    elevation: 4,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 1,
    shadowRadius: 10,
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
    alignSelf: 'center',
    width: 120,
    marginBottom: 16,
  },
  logout: {
    width: 120,
    marginRight: 20,
    marginBottom: 20,
    alignSelf: 'flex-end'
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
}));
