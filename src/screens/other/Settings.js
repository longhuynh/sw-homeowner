import React from 'react';
import { ScrollView, View, TouchableOpacity, StyleSheet} from 'react-native';
import { SwText, SwStyleSheet, SwTheme} from 'sw-react-native-ui';
import { SwSwitch, FindFriends } from '../../components/index';
import { FontAwesome } from '../../assets/icons';

export class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings'.toUpperCase(),
  };

  state = {
    sendPush: true,
    shouldRefresh: false,
    other: false,
    twitterEnabled: true,
    googleEnabled: false,
    facebookEnabled: true,
  };

  onPushNotificationsSettingChanged = (value) => {
    this.setState({ sendPush: value });
  };

  onRefreshAutomaticallySettingChanged = (value) => {
    this.setState({ shouldRefresh: value });
  };

  onOtherSettingChanged = (value) => {
    this.setState({ other: value });
  };

  onFindFriendsTwitterButtonPressed = () => {
    this.setState({ twitterEnabled: !this.state.twitterEnabled });
  };

  onFindFriendsGoogleButtonPressed = () => {
    this.setState({ googleEnabled: !this.state.googleEnabled });
  };

  onFindFriendsFacebookButtonPressed = () => {
    this.setState({ facebookEnabled: !this.state.facebookEnabled });
  };

  render = () => (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <View style={[styles.row, styles.heading]}>
          <SwText swType='primary header6'>PROFILE SETTINGS</SwText>
        </View>
        <View style={styles.row}>
          <SwText swType='header6'>Send Push Notifications</SwText>
          <SwSwitch
            style={styles.switch}
            value={this.state.sendPush}
            name='Push'
            onValueChange={this.onPushNotificationsSettingChanged}
          />
        </View>
        <View style={styles.row}>
          <SwText swType='header6'>Refresh Automatically</SwText>
          <SwSwitch
            style={styles.switch}
            value={this.state.shouldRefresh}
            name='Refresh'
            onValueChange={this.onRefreshAutomaticallySettingChanged}
          />
        </View>
        <View style={styles.row}>
          <SwText swType='header6'>Other settings</SwText>
          <SwSwitch
            style={styles.switch}
            value={this.state.other}
            name='Other'
            onValueChange={this.onOtherSettingChanged}
          />
        </View>
      </View>
      {/* <View style={styles.section}>
        <View style={[styles.row, styles.heading]}>
          <SwText swType='primary header6'>FIND FRIENDS</SwText>
        </View>
        <View style={styles.row}>
          <FindFriends
            color={SwTheme.current.colors.twitter}
            text='Twitter'
            icon={FontAwesome.twitter}
            selected={this.state.twitterEnabled}
            onPress={this.onFindFriendsTwitterButtonPressed}
          />
        </View>
        <View style={styles.row}>
          <FindFriends
            color={SwTheme.current.colors.google}
            text='Google'
            icon={FontAwesome.google}
            selected={this.state.googleEnabled}
            onPress={this.onFindFriendsGoogleButtonPressed}
          />
        </View>
        <View style={styles.row}>
          <FindFriends
            color={SwTheme.current.colors.facebook}
            text='Facebook'
            icon={FontAwesome.facebook}
            selected={this.state.facebookEnabled}
            onPress={this.onFindFriendsFacebookButtonPressed}
          />
        </View>
      </View> */}
      <View style={styles.section}>
        <View style={[styles.row, styles.heading]}>
          <SwText swType='primary header6'>SUPPORT</SwText>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.rowButton}>
            <SwText swType='header6'>Help</SwText>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.rowButton}>
            <SwText swType='header6'>Privacy Policy</SwText>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.rowButton}>
            <SwText swType='header6'>Terms & Conditions</SwText>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = SwStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.base,
  },
  header: {
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
    justifyContent: 'space-between',
    paddingHorizontal: 17.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    alignItems: 'center',
  },
  rowButton: {
    flex: 1,
    paddingVertical: 24,
  },
  switch: {
    marginVertical: 14,
  },
}));
