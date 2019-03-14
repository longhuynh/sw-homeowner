import React from 'react';
import { View, ScrollView, RefreshControl, TouchableOpacity, AsyncStorage } from 'react-native';
import { SwText, SwStyleSheet, SwBadge, SwCard } from 'sw-react-native-ui';
import { Badge, Icon } from 'react-native-elements';
import { ViolationServiceInstance } from '../../services/ViolationService';
import { DbStorageKey } from '../../services/storageKey';
import { jsonItemsBuilder } from '../../services/jsonBuilder';
import { PageNames } from '../../config/AppConstants';

const moment = require('moment');

export class Violations extends React.Component {
  static navigationOptions = {
    title: 'Violations'.toUpperCase(),
  };

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      refreshing: false,
      items: [ ],
      unit: {}
    };
  }

  async componentWillMount() {
    const unitData = await AsyncStorage.getItem(DbStorageKey.SelectedUnit);
    const unit = JSON.parse(unitData);
    this.setState({unit: unit});

    const pairs = [
      { name: 'UnitIdEncrypted', value: unit.IdEncrypted },
      { name: 'AssociationIdEncrypted', value: unit.AssociationIdEncrypted }
    ];

    const query = jsonItemsBuilder(pairs);
    this.setState({query: query});

    await this.bindData(query);
  }

  async bindData(query) {
    if (query == undefined || query == '')
      return;

    console.log(query);  

    await ViolationServiceInstance.getAll(query)
      .then(response => {
        if (response != null && response != undefined) {
          const dataValue = Object.values(response);
          const items = JSON.parse(dataValue);
          this.setState({ items: items });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  navigateToViolation(id){
    const pairs = [
      { name: 'ViolationItemIdEncrypted', value: id },
      { name: 'AssociationIdEncrypted', value: this.state.unit.AssociationIdEncrypted }
    ];

    const query = jsonItemsBuilder(pairs);
    
    this.props.navigation.navigate(PageNames.Violation, { query: query, id: id })
  }

  refreshData() {
    this.setState({ refreshing: true })
    this.bindData(this.state.query);
    this.setState({ refreshing: false });
  }

  renderItem = (item) => (
    <TouchableOpacity key={item.ViolationItemIdEncrypted}
      onPress={() => this.navigateToViolation(item.ViolationItemIdEncrypted)}>
      <SwCard style={styles.itemContainer}>
        {/* <Badge value={<Icon name={item.icon} />} status={item.iconStatus} textStyle={{ fontSize: 15 }} 
              badgeStyle={{width: 30, height:30, borderRadius: 300 }} 
              containerStyle={{ position: 'absolute', top: -10, right: -10,  }}/> */}
        <View style={styles.content}>
          <SwText swType='header2' numberOfLines={1}>{item.ViolationType}</SwText>
          <View style={styles.detail}>
            <SwText swType='secondary2'>{item.OpenClosed}</SwText>
            <View style={styles.date}>
              <SwText style={{ textAlign: 'right' }} swType='secondary2'>{moment(new Date(item.ViolationCreatedDate)).format('MM/DD/YYYY')}</SwText>
            </View>
          </View>
        </View>
      </SwCard>
    </TouchableOpacity>
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
          {this.state.items.map(this.renderItem)}
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
    marginBottom: 20,
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
