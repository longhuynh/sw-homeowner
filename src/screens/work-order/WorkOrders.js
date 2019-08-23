import React from 'react';
import { View, ScrollView, RefreshControl, TouchableOpacity, AsyncStorage } from 'react-native';
import { SwText, SwStyleSheet, SwBadge, SwCard } from 'sw-react-native-ui';
import { Badge, Icon } from 'react-native-elements';
import { DbStorageKey } from '../../services/storageKey';
import { PageNames } from '../../config/AppConstants';
import { WorkOrderService } from '../../services/WorkOrderService';
import { CornerLabel } from '../../components/index';

const moment = require('moment');

export class WorkOrders extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return ({
      headerTitle: WorkOrders.renderNavigationTitle()
    });
  };

  constructor(props) {
    super(props);

    this.workOrderService = new WorkOrderService();

    this.state = {
      refreshing: false,
      items: [],
      unit: {}
    };
  }

  async componentWillMount() {
    const unitData = await AsyncStorage.getItem(DbStorageKey.SelectedUnit);
    const unit = JSON.parse(unitData);
    this.setState({unit: unit});  

    await this.bindData();
  }

  async bindData() {
    const unit = this.state.unit;

    await this.workOrderService.getAll(unit.AssociationIdEncrypted, unit.UnitIdEncrypted)
      .then(response => {    
        console.log(response);
        if (response != null) {
          const items = response.GetUnitWorkordersResult;
          this.setState({ items: items });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  navigateToWorkOrder(workOrder){
    //this.props.navigation.navigate(PageNames.WorkOrder, { workOrder: workOrder});
  }

  refreshData() {
    this.setState({ refreshing: true })
    this.bindData();
    this.setState({ refreshing: false });
  }

  static renderNavigationTitle = () => {
    return (
      <View>
        <View style={styles.header}>
          <SwText swType='header4 center'>Work Orders</SwText>
          <SwText swType='secondary2 secondaryColor center'>Overview</SwText>
        </View>
      </View>
    )
  }

  renderStatItem = (item) => (
    // <TouchableOpacity key={item.IdEncrypted}
    //   onPress={() => this.props.navigation.navigate('WorkOrder', { workOrder: item })}>
      <SwCard style={styles.itemContainer} key={item.WoNumber}>
        {/* <Badge value={<Icon name={item.icon} />} status={item.iconStatus} textStyle={{ fontSize: 15 }}
          badgeStyle={{ width: 30, height: 30, borderRadius: 300 }}
          containerStyle={{ position: 'absolute', top: -10, right: -10, }} /> */}
        <View style={styles.content}>
          <SwText swType='header4'>{item.Name}</SwText>
          <View style={styles.detail}>
            <SwText swType='secondary2'>{item.WoStatusTypeName }</SwText>
            <View style={styles.date}>
            <SwText style={{ textAlign: 'right' }} swType='secondary2'>{moment(new Date(item.CreatedDate)).format('MM/DD/YYYY h:mm A')}</SwText>
            </View>
          </View>
        </View>
      </SwCard>
    // </TouchableOpacity>
  );

  refreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={() => this.refreshData()} />
    )
  }

  render = () => {
    return (
      <ScrollView style={styles.screen} refreshControl={this.refreshControl()}>
        <View style={styles.container} >
          {this.state.items.map(this.renderStatItem)}
        </View>
      </ScrollView>
    );
  }
}

const styles = SwStyleSheet.create(theme => ({
  screen: {
    backgroundColor: theme.colors.screen.scroll,
  },
  container: {
    justifyContent: 'space-between',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  itemContainer: {
    borderRadius: 3,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 20
  },
  content: {
    flex: 1,
    alignItems: 'stretch'
  },
  detail: {
    flexDirection: 'row'
  },
  date: {
    flex: 1
  },
}));
