import React from 'react';
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native';
import { SwText, SwTextInput, SwTabSet, SwTab, SwStyleSheet } from 'sw-react-native-ui';
import { Table, Row, Rows } from 'react-native-table-component';
import { GradientButton } from '../../components/index';
import { scale, scaleVertical } from '../../utils/scale';

const screenHeight = Dimensions.get('window').height - 350;

export class AccountSummary extends React.Component {
  static navigationOptions = {
    title: 'Account Summary'.toUpperCase(),
  };

  state = {
    balance: '25.00'
  };

  transactions = {
    columns: ['Date', 'Amount', 'Type', 'Description'],
    rows: [
      ['6/11/18', '$790.45', 'Charge', 'Semi Annual Assessment'],
      ['6/10/18', '$90.15', 'Credit', 'Early Payment'],   
      ['5/11/18', '$70.25', 'Reserve', 'Clubhouse'],
      ['5/10/18', '$90.15', 'Credit', 'Early Payment'],   
      ['4/11/18', '$70.25', 'Reserve', 'Clubhouse'],
      ['3/4/18', '$79.45', 'Charge', 'The homeowner request the credit since they help out the annual fund raising event']
    ]
  };

  callHistories = {
    columns: ['Date', 'Note'],
    rows: [
      ['6/11/18', 'Semi Annual Assessment'],
      ['6/1/18', 'Early Payment'],
      ['5/11/18', 'Clubhouse'],
      ['4/4/18', 'The homeowner request the credit since they help out the annual fund raising event']
    ]
  };

  onPayButtonPressed = () => {
    this.props.navigation.navigate('AccountPayment');
  };

  renderTransactions = () => (
    <View>
      <Table borderStyle={{ borderWidth: 2, borderColor: 'transparent' }}>
        <Row flexArr={[1, 1, 1, 2]} data={this.transactions.columns} style={styles.tableHeader} textStyle={styles.headerText} />
        <Rows flexArr={[1, 1, 1, 2]} data={this.transactions.rows} textStyle={styles.dataText} />
      </Table>
    </View>
  );

  renderCallHistories = () => (
    <View>
      <Table borderStyle={{ borderWidth: 2, borderColor: 'transparent' }}>
        <Row flexArr={[1, 4]} data={this.callHistories.columns} style={styles.tableHeader} textStyle={styles.headerText} />
        <Rows flexArr={[1, 4]} data={this.callHistories.rows} textStyle={styles.dataText} />
      </Table>
    </View>
  );

  render = () => (
    <View style={styles.root}>
      <View style={styles.container}>
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
          <ScrollView style={{height: screenHeight}}>
            <SwTabSet>
              <SwTab title='TRANSACTIONS' swType='header6 primary'>
                {this.renderTransactions()}
              </SwTab>
              <SwTab title='CALL HISTORY' swType='header6 primary'>
                {this.renderCallHistories()}
              </SwTab>
            </SwTabSet>    
          </ScrollView>
        </View>
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
  tableContainer: {
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
  tableHeader: {
    height: 40
  },
  headerText: {
    margin: 6,
    fontWeight: 'bold',
    color: theme.colors.text.base,
  },
  dataText: {
    margin: 6,
    color: theme.colors.text.base,
  },
}));
