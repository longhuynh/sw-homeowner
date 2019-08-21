import React from 'react';
import { View, ScrollView, TouchableOpacity, AsyncStorage, RefreshControl } from 'react-native';
import { SwText, SwStyleSheet } from 'sw-react-native-ui';
import { FontAwesome5 } from '@expo/vector-icons';
import { Avatar } from '../../components/avatar/Avatar';
import { CornerLabel } from '../../components/CornerLabel';
import NavigationType from '../../config/navigation/NavigationType';
import { Badge } from 'react-native-elements';
import { PageNames } from '../../config/AppConstants';
import { DbStorageKey } from '../../services/storageKey';
import { UnitService } from '../../services/UnitService';
import _ from 'lodash';

export class Dashboard extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };

  static navigationOptions = ({ navigation }) => {
    let ownerFullName = navigation.state.params ? navigation.state.params.ownerFullName : undefined;
    let address = navigation.state.params ? navigation.state.params.address : undefined;
    let units = navigation.state.params ? navigation.state.params.units : [];

    console.log(units);

    return ({
      headerTitle: Dashboard.renderNavigationTitle(navigation, ownerFullName, address, units),
      headerLeft: Dashboard.renderNavigationAvatar(navigation),
    });
  };

  constructor(props) {
    super(props);
    const unit = this.props.navigation.getParam('unit', {});

    this.unitService = new UnitService();

    this.state = {
      accountData: {},
      selectedUnit: unit,
      unit: unit,
      refreshing: false,
      items: []
    };

    this.bindData();
  }

  shouldUpdate = false;

  async shouldComponentUpdate(nextProps) {
    const unitIdEncrypted = nextProps.navigation.state.params.unitIdEncrypted;

    const unitData = await AsyncStorage.getItem(DbStorageKey.SelectedUnit);
    let unit = JSON.parse(unitData);

    const unitJson = await AsyncStorage.getItem(DbStorageKey.Units);

    if (unitData == null)
      return false;   

    if (unit.UnitIdEncrypted != unitIdEncrypted) {
      const units = JSON.parse(unitJson);
      unit = _.find(units, { UnitIdEncrypted: unitIdEncrypted });

      this.setState({ unit: unit });      
      await AsyncStorage.setItem(DbStorageKey.SelectedUnit, JSON.stringify(unit));
      this.setState({selectedUnit: unit});

      this.shouldUpdate = true;

      this.bindData();
    }

    return this.shouldUpdate;
  }

  componentWillUpdate() {
    this.shouldUpdate = false;
  }

  async componentDidMount() {  }

  async bindData() {
    console.log("bindData");
    const unit = this.state.unit;
    await this.unitService.getUnitCounter(unit.AssociationIdEncrypted, unit.UnitIdEncrypted)
      .then(response => {
        if (response != null) {
          const items = this.generateData(response.GetUnitCountersResult);
          this.setState({ items: items });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  generateData(data) {
    let items = [];

    items.push({
      name: 'Recent Messages',
      screen: 'Messages',
      value: '2',
      icon: 'comment-dots',
      background: 'rgb(47, 130, 74)'
    });

    items.push({
      name: 'Balance',
      screen: 'AccountSummary',
      value: data.Balance || '$0.00',
      icon: 'dollar-sign',
      background: 'rgb(134, 19, 136)'
    });
    
    items.push({
      name: 'Arc/Arb',
      screen: 'Architecturals',
      value: data.ArcProjectsCount || 0,
      icon: 'hammer',
      background: 'rgb(59, 157, 214)'
    });
    
    items.push({
      name: 'Work Orders',
      screen: 'WorkOrders',
      value: data.WorkordersCount || 0,
      icon: 'wrench',
      background: 'rgb(255, 127, 29)'
    });
    
    items.push({
      name: 'Violations',
      screen: 'Violations',
      value: data.ViolationsCount || 0,
      icon: 'exclamation-triangle',
      background: 'rgb(102, 188, 69)'
    });
    return items;
  }

  navigateToScreen(screen) {
    this.props.navigation.navigate(screen, { unit: this.state.unit });
  }

  refreshData() {
    this.setState({ refreshing: true });
    this.bindData(this.state.query);
    this.setState({ refreshing: false });
  }

  static onNavigationTitlePressed = (navigation, units, ownerFullName) => {
    navigation.navigate(PageNames.UnitOwners, { units: units, ownerFullName: ownerFullName });
  };

  static onNavigationAvatarPressed = (navigation) => {
    navigation.navigate(PageNames.Profile);
  };

  static renderNavigationTitle = (navigation, ownerFullName, address, units) => {
    const numberOfUnit = units.length;
    if (numberOfUnit == undefined || numberOfUnit == 0)
      return <View />;

    return (
      <TouchableOpacity onPress={() => Dashboard.onNavigationTitlePressed(navigation, units, ownerFullName)}>
        <View style={styles.header}>
          <SwText swType='header4 center'>{ownerFullName}</SwText>
          <SwText swType='secondary2 secondaryColor center'>{address}</SwText>
        </View>
        <Badge value={numberOfUnit} status="success" textStyle={{ fontSize: 15 }}
          badgeStyle={{ width: 20, height: 20, borderRadius: 300 }}
          containerStyle={{ position: 'absolute', top: -7, right: -17 }} />
      </TouchableOpacity>
    )
  }

  static renderNavigationAvatar = (navigation) => (
    <TouchableOpacity onPress={() => Dashboard.onNavigationAvatarPressed(navigation)}>
      <Avatar style={styles.avatar} swType='small' img={require('../../data/img/avatars/no-avatar.png')} />
    </TouchableOpacity>
  );

  renderStatItem = (item) => (
    <TouchableOpacity onPress={() => { this.navigateToScreen(item.screen) }} key={item.screen}>
      <View style={[styles.item, { backgroundColor: item.background }]} >
        <View>
          <SwText swType='header3' style={styles.name}>{item.name}</SwText>
          <SwText swType='secondary1' style={styles.value}>{item.value}</SwText>
        </View>
        <FontAwesome5 name={item.icon} size={50} style={styles.icon} />     
      </View>
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
        <View style={styles.container}>
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
  header: {
    alignItems: 'center',
  },
  avatar: {
    marginLeft: 20,
  },
  container: {
    justifyContent: 'space-between',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 3,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 20
  },
  icon: {
    alignSelf: 'center',
    marginLeft: 10,
    color: 'white',
  },
  value: {
    color: 'white',
  },
  name: {
    color: 'white',
  },
}));
