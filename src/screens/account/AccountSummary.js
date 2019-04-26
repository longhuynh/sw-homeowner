import React from 'react';
import { ScrollView, View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { SwText, SwTextInput, SwTabSet, SwTab, SwStyleSheet } from 'sw-react-native-ui';
import { Table, Row, Rows } from 'react-native-table-component';
import { GradientButton } from '../../components/index';
import { PageNames } from '../../config/AppConstants';
import { AccountService } from '../../services/AccountService';

const screenHeight = Dimensions.get('window').height - 350;
const moment = require('moment');

export class AccountSummary extends React.Component {
  static navigationOptions = {
    title: 'Account Summary',
  };

  constructor(props) {
    super(props);

    this.accountService = new AccountService();

    const unit = this.props.navigation.getParam('unit', {});

    this.state = {
      balance: '',
      showLoading: true,
      unit: unit,
      transactionColumns: ['Date', 'Amount', 'Type', 'Description'],
      transactionData: [],
      callHistoryColumns: ['Date', 'Note'],
      callHistoryData: []
    };
  }

  async componentWillMount() {
    this.bindData();
  }

  async bindData() {
    const unit = this.state.unit;

    await this.accountService.getAccountSummary(unit.IdEncrypted, unit.AssociationIdEncrypted )
      .then(response => {
        if (response != null) {
          const r = response.GetAccountSummaryResult;
          const { transactionData, callHistoryData } = this.generateData(r);        

          this.setState({ balance: r.Balance.toString() });
          this.setState({ transactionData: transactionData });
          this.setState({ callHistoryData: callHistoryData });
          this.setState({ showLoading: false });
        } else {
          this.setState({ showLoading: false });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  generateData(data) {
    let transactionData = [];
    const transactionArray = data.Transactions || [];

    transactionArray.forEach(t => {
      let row = [];

      row.push(moment(t.Date).format('M/DD/YY'));
      row.push(`$${t.Amount}`);
      row.push(t.Type);
      row.push(t.Description);

      transactionData.push(row);
    });

    let callHistoryData = [];
    const callHistoryArray = data.CallHistory || [];

    callHistoryArray.forEach(t => {
      let row = [];

      row.push(moment(t.Date).format('M/DD/YY'));
      row.push(t.Note);

      callHistoryData.push(row);
    });

    return { transactionData, callHistoryData };
  }

  onPayButtonPressed = () => {
    this.props.navigation.navigate(PageNames.AccountPayment, { balance: this.state.balance });
  };

  renderTransactions = () => {
    return (
      <View>
        <Table borderStyle={{ borderWidth: 2, borderColor: 'transparent' }}>
          <Row flexArr={[4, 4, 4, 7]} data={this.state.transactionColumns} style={styles.tableHeader} textStyle={styles.headerText} />
          <Rows flexArr={[4, 4, 4, 7]} data={this.state.transactionData} textStyle={styles.dataText} />
        </Table>
      </View>
    )
  };

  renderCallHistories = () => {
    return (
      <View>
        <Table borderStyle={{ borderWidth: 2, borderColor: 'transparent' }}>
          <Row flexArr={[1, 4]} data={this.state.callHistoryColumns} style={styles.tableHeader} textStyle={styles.headerText} />
          <Rows flexArr={[1, 4]} data={this.state.callHistoryData} textStyle={styles.dataText} />
        </Table>
      </View>
    )
  };

  render = () => {
    return (
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
          {
            this.state.showLoading ? (
              <ActivityIndicator size="large" color="#00ff00" />
            ) : (
              <View style={styles.section}>
                <ScrollView style={styles.tabContainer}>
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
            )
          }
        </View>
      </View>
    )
  };
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
  tabContainer: {
    height: screenHeight,
    paddingHorizontal: 10
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
    marginTop: 27.5,
    alignSelf: 'center',
  },
  button: {
    alignSelf: 'center',
    width: 120,
    marginBottom: 16,
  },
  payButton: {
    width: 120,
    marginRight: 20,
    alignSelf: 'flex-end'
  },
  tableHeader: {
    height: 40
  },
  headerText: {
    fontWeight: 'bold',
    color: theme.colors.text.base,
  },
  dataText: {
    color: theme.colors.text.base,
  },
}));
