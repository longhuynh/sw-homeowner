import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { SwText, SwTextInput, SwButton, SwTheme, SwStyleSheet } from 'sw-react-native-ui';
import { data } from '../../data/DataProvider';
import { GradientButton } from '../../components/index';
import { scale } from '../../utils/scale';

export class AccountSummary extends React.Component {
  static navigationOptions = {
    title: 'Account Summary'.toUpperCase(),
  };

  user = data.getUser();

  state = {
    balance: '25.00'
  };

  onPayButtonPressed = () => {
    this.props.navigation.navigate('AccountPayment');
  };

  render = () => (
    <ScrollView style={styles.root}>
      <View style={styles.section}>
        <View style={[styles.row, styles.heading]}>
          <SwText swType='header6 primary'>BALANCE</SwText>
        </View>
        <View style={styles.row}>
          <SwTextInput
            label='Amount Due'
            returnKeyType='next'
            value={this.state.balance}
            swType='right clear'
            editable={false}
            selectTextOnFocus={false}
            color='white'
          />
        </View>
      </View>

      <GradientButton
        swType='small'
        style={styles.payButton}
        text='PAY'
        onPress={this.onPayButtonPressed}
      />

      <View style={styles.section}>
        <View style={[styles.row, styles.heading]}>
          <SwText swType='header6 primary'>TRANSACTIONS</SwText>
        </View>
      </View>

      <View style={styles.section}>
        <View style={[styles.row, styles.heading]}>
          <SwText swType='header6 primary'>CALL HISTORY</SwText>
        </View>
      </View>

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
  payButton: {
    width: scale(120),
    marginRight: scale(20),
    alignSelf: 'flex-end'
  },
}));
