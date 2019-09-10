import React from 'react';
import { View, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { SwText, SwStyleSheet, SwBadge, SwCard } from 'sw-react-native-ui';
import { ArcService } from '../../services/ArcService';
import { PageNames } from '../../config/AppConstants';
import { StorageService } from '../../services/StorageService';

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
      refreshing: false,
      items: [],
      unit: StorageService.unit
    };
  }

  async componentWillMount() {
    await this.bindData();
  }

  async bindData() {
    const unit = this.state.unit;
    await this.arcService.getAll(unit.AssociationIdEncrypted, unit.UnitIdEncrypted)
      .then(response => {        
        console.log(response);
        if (response != null) {
          const items = response.GetUnitArcProjectsResult;
          this.setState({ items: items });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  navigateToArc(item){    
    this.props.navigation.navigate(PageNames.Architectural, {
      name: item.ProjectTitle,
      projectIdEncrypted: item.ProjectIdEncrypted, 
      associationIdEncrypted: this.state.unit.AssociationIdEncrypted
    });
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
          <SwText swType='header4 center'>Architecturals</SwText>
          <SwText swType='secondary2 header5 center'>Overview</SwText>
        </View>
      </View>
    )
  }

  renderStatItem = (item) => (
    <TouchableOpacity 
      key={item.ProjectIdEncrypted}
      onPress={() => this.navigateToArc(item)}>
       <SwCard style={styles.itemContainer}>
        <View style={styles.content}>
          <SwText numberOfLines={1} swType='header4'>{`${item.ProjectTitle}`}</SwText>
          <View style={styles.detail}>
            <SwText swType='secondary2 header5'>{item.ProjectStatus}</SwText>
            <View style={styles.date}>
              <SwText style={{ textAlign: 'right' }} swType='secondary2 header5'>
                {moment(new Date(item.CreatedDate)).format('MM/DD/YYYY')}
              </SwText>
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
    flexDirection: 'row',
    marginTop: 10
  },
  date: {
    flex: 1
  },
}));
