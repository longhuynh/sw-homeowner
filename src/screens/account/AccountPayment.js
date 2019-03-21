import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SwText, SwTextInput, SwStyleSheet } from 'sw-react-native-ui';
import { GradientButton } from '../../components/index';
import { PageNames } from '../../config/AppConstants';

export class AccountPayment extends React.Component {
  static navigationOptions = {
    title: 'Account Payment ',
  };

  state = {
    amountDue: '25.00',
    convenienceFee: '3.35',
    total: '28.35'
  };

  onAmountDueInputChanged = (text) => {
    this.setState({ amountDue: text });

    var total = parseFloat(text) + 3.35;
    this.setState({ total: total.toString() });
  };

  onSubmitButtonPressed = () => {
    this.props.navigation.navigate(PageNames.AccountSummary);
  };

  render = () => (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.section}>
          <View style={[styles.row, styles.heading]}>
            <SwText swType='header6 primary'>PAYMENT INFO</SwText>
          </View>
          <View style={styles.row}>
            <SwTextInput
              label='Amount Due'
              keyboardType='decimal-pad'
              returnKeyType='next'
              value={this.state.amountDue}
              swType='right clear'
              onChangeText={this.onAmountDueInputChanged}
            />
          </View>
          <View style={[styles.row, styles.bordered]}>
            <SwTextInput
              label='Convenience Fee'
              editable={false}
              returnKeyType='next'
              value={this.state.convenienceFee}
              swType='right clear'
            />
          </View>
          <View style={styles.row}>
            <SwTextInput
              label='Total'
              returnKeyType='next'
              editable={false}
              value={this.state.total}
              swType='right clear'
              autoCapitalize='none'
              autoCorrect={false}
            />
          </View>
        </View>

        <GradientButton
          swType='large'
          style={styles.button}
          text='SUBMIT'
          onPress={this.onSubmitButtonPressed} />
      </View>
    </View>
  );
}

const styles = SwStyleSheet.create(theme => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.screen.scroll,
  },
  container: {
    flex: 1,
    marginHorizontal: 17,
    marginVertical: 17,
    backgroundColor: theme.colors.screen.base,
  },
  bordered: {
    borderBottomWidth: 2,
    borderColor: theme.colors.border.base,
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
