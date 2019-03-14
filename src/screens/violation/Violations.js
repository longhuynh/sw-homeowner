import React from 'react';
import { View, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
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
      { name: 'AssociationIdEncrypted', value: unit.AssociationIdEncrypted },
      { name: 'ManagementIdEncrypted', value: unit.ManagementIdEncrypted }
    ];

    const query = jsonItemsBuilder(pairs);

    await ViolationServiceInstance.getAll(query)
      .then(response => {
        if (response != null || response != undefined) {
          const dataValue = Object.values(response);
          const items = JSON.parse(dataValue);
          this.setState({ items: items });
        }
      })
      .catch(error => {
        console.error(error);
      })
  }

  navigateToViolation(id){
    const pairs = [
      { name: 'ViolationItemIdEncrypted', value: id },
      { name: 'AssociationIdEncrypted', value: this.state.unit.AssociationIdEncrypted }
    ];

    const query = jsonItemsBuilder(pairs);
    
    this.props.navigation.navigate(PageNames.Violation, { query: query, id: id })
  }

  renderItem = (item) => (
    <TouchableOpacity key={item.ViolationItemIdEncrypted}
      onPress={() => this.navigateToViolation(item.ViolationItemIdEncrypted)}>
      <SwCard style={styles.card}>
        {/* <Badge value={<Icon name={item.icon} />} status={item.iconStatus} textStyle={{ fontSize: 15 }} 
              badgeStyle={{width: 30, height:30, borderRadius: 300 }} 
              containerStyle={{ position: 'absolute', top: -10, right: -10,  }}/> */}
        <View style={styles.content}>
          <SwText swType='header2'>{item.ViolationType}</SwText>
          <View style={styles.detail}>
            <SwText swType='secondary2'>{item.OpenClosed}</SwText>
            <View style={styles.date}>
              <SwText style={{ textAlign: 'right' }} swType='secondary2'>{item.ViolationCreatedDate}</SwText>
            </View>
          </View>
        </View>
      </SwCard>
    </TouchableOpacity>
  );

  render = () => {
    return (
      <ScrollView style={styles.screen}>
        <View style={styles.items} >
          {this.state.items.map(this.renderItem)}
        </View>
      </ScrollView>
    );
  }
}

const styles = SwStyleSheet.create(theme => ({
  screen: {
    backgroundColor: theme.colors.screen.scroll,
    paddingHorizontal: 20,
  },
  items: {
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  card: {
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
