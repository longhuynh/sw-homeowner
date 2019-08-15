import React from 'react';
import { ScrollView, View, StyleSheet, Alert, AsyncStorage } from 'react-native';
import { SwText, SwTextInput, SwButton, SwTheme, SwStyleSheet } from 'sw-react-native-ui';
import { Tooltip } from 'react-native-elements';
import { Avatar, GradientButton } from '../../components/index';
import { FontAwesome5 } from '@expo/vector-icons';
import { DbStorageKey } from '../../services/storageKey';
import { PageNames } from '../../config/AppConstants';

export class Profile extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  constructor(props) {
    super(props);
    console.log("Profile constructor");
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      homePhone: ''      
    };
  }

  async componentWillMount(){   
    const selectedUnit = await AsyncStorage.getItem(DbStorageKey.SelectedUnit);   
    const unit = JSON.parse(selectedUnit);
    this.fillProfileInfo(unit);    
  }

  fillProfileInfo(unit){
    this.setState({
      firstName: unit.OwnerFirstName,
      lastName: unit.OwnerLastName,
      email: unit.OwnerEmail,
      phone: unit.CellPhone,
      homePhone: unit.HomePhone
    });
  }
  

  onEditButtonPressed = () => {
    this.props.navigation.navigate(PageNames.ProfileSettings);
  };

  onChangeThemeButtonPressed = () => {
    this.props.navigation.navigate(PageNames.Dashboard);
  };

  onLogoutButtonPressed = () => {
    Alert.alert(
      'Are you sure? ', 
      'Do you want to log out ?',
      [
        {
          text: 'OK', 
          onPress: () => this.props.navigation.navigate(PageNames.Login)
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
   
  };

  render = () => (
    <ScrollView style={styles.root}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={styles.buttons}>
            <SwButton style={styles.circleButton} swType='icon circle' onPress={this.onEditButtonPressed} >
              <FontAwesome5 name='edit' size={22} style={styles.icon} />
            </SwButton>
          </View>
          <Avatar img={require('../../data/img/avatars/no-avatar.png')} swType='big' />
          <View style={styles.buttons}>
            <SwButton style={styles.circleButton} swType='icon circle' onPress={this.onChangeThemeButtonPressed}>
              <FontAwesome5 name='align-justify' size={22} style={styles.icon} />
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
            value={this.state.homePhone}
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
    marginTop: 27.5,
    alignSelf: 'center',
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
  icon: {
    color: theme.colors.primary
  },
}));
