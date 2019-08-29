import React from 'react';
import { View, ScrollView, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { SwText, SwStyleSheet } from 'sw-react-native-ui';
import { FontAwesome5 } from '@expo/vector-icons';
import { Avatar } from '../../components/avatar/Avatar';
import NavigationType from '../../config/navigation/NavigationType';
import { Badge } from 'react-native-elements';
import { PageNames } from '../../config/AppConstants';
import { UnitService } from '../../services/UnitService';
import { CurrentUser } from '../../services/LoginService';
import _ from 'lodash';
import { StorageService } from '../../services/StorageService';

export class Dashboard extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };

  static navigationOptions = ({ navigation }) => {
    let ownerFullName = navigation.state.params ? navigation.state.params.ownerFullName : undefined;
    let address = navigation.state.params ? navigation.state.params.address : undefined;
    let units = navigation.state.params ? navigation.state.params.units : [];

    return ({
      headerTitle: Dashboard.renderNavigationTitle(navigation, ownerFullName, address, units),
      headerLeft: Dashboard.renderNavigationAvatar(navigation),
    });
  };

  constructor(props) {
    super(props);
    this.unitService = new UnitService();

    this.state = {
      accountData: {},
      refreshing: false,
      showLoading: true,
      messageCount: 0,
      messages: [],
      items: []
    };

    this.bindData();
  }

  hasUpdate = false;

  async shouldComponentUpdate(nextProps) {
    const unitIdEncrypted = nextProps.navigation.state.params.unitIdEncrypted;    
    let unit = StorageService.unit;        

    if (unit == null)
      return false;

    if (unit.UnitIdEncrypted != unitIdEncrypted) {
      const units = StorageService.units;
      unit = _.find(units, { UnitIdEncrypted: unitIdEncrypted });  
      StorageService.unit = unit;

      console.log("Unit was changed " + unit.UnitAddress);

      this.hasUpdate = true;  
      this.bindData();
    }

    return this.hasUpdate;
  }

  componentWillUpdate() {
    this.hasUpdate = false;
  }

  async componentDidMount() { }

  async bindData() {
    const unit = StorageService.unit;

    await this.loadMessages();

    await this.unitService.getUnitCounter(unit.AssociationIdEncrypted, unit.UnitIdEncrypted)
      .then(response => {
        console.log(response);
        if (response != null) {
          const items = this.generateData(response.GetUnitCountersResult);
          this.setState({ items: items });

          this.setState({ showLoading: false });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ showLoading: false });
      });
  }

  async loadMessages() {
    const unit = StorageService.unit;

    await this.unitService.getResidentIncomingNotes(unit.UnitIdEncrypted, CurrentUser.UserIdEncrypted)
      .then(response => {
        if (response != null) {
          const messages = response.GetResidentIncomingNotesResult;
          this.setState({ messages: messages });
          const messageCount = messages.ProjectNotes.length + messages.ServiceNotes.length + messages.ViolationNotes.length;
          this.setState({ messageCount: messageCount });
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
      value: this.state.messageCount,
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
    let params =  { };

    switch(screen){
      case 'Messages':
        params = { messages: this.state.messages };
        break;
      default:
        break;
    }   

    this.props.navigation.navigate(screen, params);
  }

  refreshData() {
    this.setState({ refreshing: true });
    this.bindData();
    this.setState({ refreshing: false });
  }

  static onNavigationTitlePressed = (navigation, units) => {
    navigation.navigate(PageNames.UnitOwners, { units: units});
  };

  static onNavigationAvatarPressed = (navigation) => {
    navigation.navigate(PageNames.Profile);
  };

  static renderNavigationTitle = (navigation, ownerFullName, address, units) => {
    const numberOfUnit = units.length;
    if (numberOfUnit == undefined || numberOfUnit == 0)
      return <View />;

    return (
      <TouchableOpacity onPress={() => Dashboard.onNavigationTitlePressed(navigation, units)}>
        <View style={styles.header}>
          <SwText swType='header4 center'>{ownerFullName}</SwText>
          <SwText swType='secondary2 center'>{address}</SwText>
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
    if (this.state.showLoading)
      return (<ActivityIndicator size="large" color="#00ff00" marginVertical={100} />);

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
    marginTop: 10
  },
  name: {
    color: 'white',
  },
}));
