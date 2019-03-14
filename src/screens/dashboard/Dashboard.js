import React from 'react';
import { View, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import { SwText, SwStyleSheet } from 'sw-react-native-ui';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Avatar } from '../../components/avatar/Avatar';
import NavigationType from '../../config/navigation/NavigationType';
import { Badge } from 'react-native-elements';
import { PageNames } from '../../config/AppConstants';
import { DashboardServiceInstance } from '../../services/DashboardService';
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
    const query = this.props.navigation.getParam('query', '');
    this.bindData(query);
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
      console.log(JSON.stringify(unit));

      await AsyncStorage.setItem(DbStorageKey.SelectedUnit, JSON.stringify(unit));

      const query = nextProps.navigation.state.params.query;
      this.shouldUpdate = true;

      this.bindData(query);
    }

    return this.shouldUpdate;
  }

  componentWillUpdate() {
    this.shouldUpdate = false;
  }

  async bindData(query) {
    if(query == undefined || query == '')
      return;

    await DashboardServiceInstance.getDashboard(query)
      .then(response => {
        if (response != null || response != undefined) {
          const dataValue = Object.values(response);
          const parsedData = JSON.parse(dataValue);

          const items = this.generateData(parsedData);
          this.setState({ items: items });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  state = {
    items: []
  };

  generateData(parsedData) {
    let items = [];
    items.push({
      name: 'Balance',
      screen: 'AccountSummary',
      value: parsedData.Balance,
      icon: 'dollar-sign',
      background: 'rgb(134, 19, 136)'
    });
    items.push({
      name: 'Arc/Arb',
      screen: 'Architecturals',
      value: parsedData.ActiveArchitecturalCount,
      icon: 'hammer',
      background: 'rgb(59, 157, 214)'
    });
    items.push({
      name: 'Work Orders',
      screen: 'WorkOrders',
      value: parsedData.ActiveWorkOrderCount,
      icon: 'wrench',
      background: 'rgb(255, 127, 29)'
    });
    items.push({
      name: 'Violations',
      screen: 'Violations',
      value: parsedData.ActiveViolationCount,
      icon: 'exclamation-triangle',
      background: 'rgb(102, 188, 69)'
    });
    return items;
  }

  gotoScreen(screen) {
    this.props.navigation.navigate(screen);
  }

  static onNavigationTitlePressed = (navigation) => {
    navigation.navigate(PageNames.UnitOwners);
  };

  static onNavigationAvatarPressed = (navigation) => {
    navigation.navigate(PageNames.Profile);
  };

  static renderNavigationTitle = (navigation, ownerFullName, address, numberOfUnit) => {
    if(numberOfUnit == undefined || numberOfUnit == 0)
      return <View />;
    
    return ( 
    <TouchableOpacity onPress={() => Dashboard.onNavigationTitlePressed(navigation)}>
      <View style={styles.header}>
        <SwText swType='header5'>{ownerFullName}</SwText>
        <SwText swType='secondary2 secondaryColor'>{address}</SwText>
      </View>     
      <Badge value={numberOfUnit} status="success" textStyle={{ fontSize: 15 }}
        badgeStyle={{ width: 20, height: 20, borderRadius: 300 }}
        containerStyle={{ position: 'absolute', top: -5, right: -15 }} />      
    </TouchableOpacity>
  )}

  static renderNavigationAvatar = (navigation) => (
    <TouchableOpacity onPress={() => Dashboard.onNavigationAvatarPressed(navigation)}>
      <Avatar style={styles.avatar} swType='small' img={require('../../data/img/avatars/no-avatar.png')} />
    </TouchableOpacity>
  );

  renderStatItem = (item) => (
    <TouchableOpacity onPress={() => { this.gotoScreen(item.screen) }} key={item.screen}>
      <View style={[styles.container, { backgroundColor: item.background }]} >
        <View>
          <SwText swType='header3' style={styles.name}>{item.name}</SwText>
          <SwText swType='secondary1' style={styles.value}>{item.value}</SwText>
        </View>
        <FontAwesome5 name={item.icon} size={50} style={styles.icon} />
      </View>
    </TouchableOpacity>
  );

  render = () => {
    return (
      <ScrollView style={styles.screen}>
        <View style={styles.items} >
          {this.state.items.map(this.renderStatItem)}
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
  header: {
    alignItems: 'center',
  },
  avatar: {
    marginLeft: 20,
  },
  items: {
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  container: {
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
