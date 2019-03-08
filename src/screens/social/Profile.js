import React from 'react';
import { ScrollView, View, StyleSheet, Alert, AsyncStorage } from 'react-native';
import { SwText, SwTextInput, SwButton, SwTheme, SwStyleSheet } from 'sw-react-native-ui';
import { Avatar, GradientButton } from '../../components/index';
import { FontIcons } from '../../assets/icons';
import { DbStorageKey } from '../../services/storageKey';

export class Profile extends React.Component {
  static navigationOptions = {
    title: 'Profile'.toUpperCase(),
  };

  constructor(props) {
    super(props);

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
    this.updateState(unit);    
  }

  updateState(data){
    console.log(data);
    this.setState({
      firstName: data.OwnerFirstName,
      lastName: data.OwnerLastName,
      email: data.OwnerEmail,
      phone: data.CellPhone,
      homePhone: data.HomePhone
    });
  }
  

  onEditButtonPressed = () => {
    this.props.navigation.navigate('ProfileSettings');
  };

  onChangeThemeButtonPressed = () => {
    this.props.navigation.navigate('Themes');
  };

  onLogoutButtonPressed = () => {
    Alert.alert(
      'Are you sure? ', 
      'Do you want to log out ?',
      [
        {
          text: 'OK', 
          onPress: () => this.props.navigation.navigate('Login')
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
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
              <SwText swType='moon large primary'>{FontIcons.profile}</SwText>
            </SwButton>
          </View>
          <Avatar img={require('../../data/img/avatars/no-avatar.png')} swType='big' />
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
}));
