import React from 'react';
import { ScrollView, View, TouchableOpacity, StyleSheet} from 'react-native';
import { SwText, SwStyleSheet, SwTheme} from 'sw-react-native-ui';
import { HttpService } from '../../services/config';

export class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  state = {
    sendPush: true,
    shouldRefresh: false,
    other: false,
    environment: HttpService.environmentName
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

  render = () => (
    <ScrollView style={styles.container}>
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
        <View style={styles.row}>
          <TouchableOpacity style={styles.rowButton}>
            <SwText swType='header6'>Version 1.0.0 (Build 26) - {this.state.environment}</SwText>
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
