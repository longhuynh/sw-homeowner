import React from 'react';
import { View, ScrollView, TouchableOpacity, AsyncStorage, RefreshControl } from 'react-native';
import { SwText, SwStyleSheet } from 'sw-react-native-ui';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Avatar } from '../../components/avatar/Avatar';
import NavigationType from '../../config/navigation/NavigationType';
import { Badge } from 'react-native-elements';
import { PageNames } from '../../config/AppConstants';
import { DashboardService } from '../../services/DashboardService';
import { DbStorageKey } from '../../services/storageKey';
import _ from 'lodash';

export class Dashboard extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };

  static navigationOptions = ({ navigation }) => {
    let ownerFullName = navigation.state.params ? navigation.state.params.ownerFullName : undefined;
    let address = navigation.state.params ? navigation.state.params.address : undefined;
    let numberOfUnit = navigation.state.params ? navigation.state.params.numberOfUnit : 0;

    return ({
      headerTitle: Dashboard.renderNavigationTitle(navigation, ownerFullName, address, numberOfUnit),
      headerLeft: Dashboard.renderNavigationAvatar(navigation),
    });
  };

  constructor(props) {
    super(props);
    const unit = this.props.navigation.getParam('unit', {});

    this.dashboardService = new DashboardService();

    this.state = {
      accountData: {},
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

    const ownersData = await AsyncStorage.getItem(DbStorageKey.UnitOwners);

    if (unitData == null)
      return false;

    let unit = JSON.parse(unitData);

    if (unit.IdEncrypted != unitIdEncrypted) {
      const owners = JSON.parse(ownersData);
      unit = _.find(owners, { IdEncrypted: unitIdEncrypted });

      this.setState({ unit: unit });      
      await AsyncStorage.setItem(DbStorageKey.SelectedUnit, JSON.stringify(unit));

      this.shouldUpdate = true;

      this.bindData();
    }

    return this.shouldUpdate;
  }

  componentWillUpdate() {
    this.shouldUpdate = false;
  }

  async componentDidMount() {
  }

  async bindData() {
    const unit = this.state.unit;
    await this.dashboardService.getDashboard(unit.IdEncrypted, unit.AssociationIdEncrypted)
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

  static onNavigationTitlePressed = (navigation) => {
    navigation.navigate(PageNames.UnitOwners);
  };

  static onNavigationAvatarPressed = (navigation) => {
    navigation.navigate(PageNames.Profile);
  };

  static renderNavigationTitle = (navigation, ownerFullName, address, numberOfUnit) => {
    if (numberOfUnit == undefined || numberOfUnit == 0)
      return <View />;

    return (
      <TouchableOpacity onPress={() => Dashboard.onNavigationTitlePressed(navigation)}>
        <View style={styles.header}>
          <SwText swType='header4 center'>{ownerFullName}</SwText>
          <SwText swType='secondary2 secondaryColor center'>{address}</SwText>
        </View>
        <Badge value={numberOfUnit} status="success" textStyle={{ fontSize: 15 }}
          badgeStyle={{ width: 20, height: 20, borderRadius: 300 }}
          containerStyle={{ position: 'absolute', top: -5, right: -15 }} />
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
