import React from 'react';
import { View, ScrollView, RefreshControl, TouchableOpacity, AsyncStorage } from 'react-native';
import { SwText, SwStyleSheet, SwBadge, SwCard } from 'sw-react-native-ui';
import { Badge, Icon} from 'react-native-elements';
import { ArcService } from '../../services/ArcService';
import { DbStorageKey } from '../../services/storageKey';
import { PageNames } from '../../config/AppConstants';
import { jsonItemsBuilder } from '../../services/jsonBuilder';

const moment = require('moment');

export class Architecturals extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return ({
      headerTitle: Architecturals.renderNavigationTitle()
    });
  };

  constructor(props) {
    super(props);

    this.arcService = new ArcService();

    this.state = {
      query: '',
      refreshing: false,
      items: [],
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

    await this.arcService.getAll(query)
      .then(response => {        
        console.log(response);
        if (response != null && response != undefined) {
          const dataValue = Object.values(response);
          const items = JSON.parse(dataValue);
          this.setState({ items: items });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  navigateToArc(item){
    const id = item.ProjectIdEncrypted;

    const pairs = [
      { name: 'ProjectIdEncrypted', value: id },
      { name: 'AssociationIdEncrypted', value: this.state.unit.AssociationIdEncrypted }
    ];

    const query = jsonItemsBuilder(pairs);
    
    this.props.navigation.navigate(PageNames.Architectural, {
      name: item.ProjectTitle,
      query: query, 
      id: id
    });
  }

  refreshData() {
    this.setState({ refreshing: true })
    this.bindData(this.state.query);
    this.setState({ refreshing: false });
  }

  static renderNavigationTitle = () => {
    return (
      <View>
        <View style={styles.header}>
          <SwText swType='header4 center'>ARC/ARB</SwText>
          <SwText swType='secondary2 secondaryColor center'>Overview</SwText>
        </View>
      </View>
    )
  }

  renderStatItem = (item) => (
    <TouchableOpacity 
      key={item.ProjectIdEncrypted}
      onPress={() => this.navigateToArc(item)}>
       <SwCard style={styles.itemContainer}>
       {/* <Badge value={<Icon name={item.icon} />} status={item.iconStatus} textStyle={{ fontSize: 15  }}
          badgeStyle={{ width: 30, height: 30, borderRadius: 300 }}
          containerStyle={{ position: 'absolute', top: -10, right: -10, }} /> */}
        <View style={styles.content}>
          <SwText numberOfLines={1} swType='header2'>{`${item.ProjectTitle}`}</SwText>
          <View style={styles.detail}>
            <SwText swType='secondary2'>{item.ProjectStatus}</SwText>
            <View style={styles.date}>
              <SwText style={{ textAlign: 'right' }} swType='secondary2'>{moment(new Date(item.CreatedDate)).format('MM/DD/YYYY')}</SwText>
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
