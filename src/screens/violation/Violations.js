import React from 'react';
import { View, ScrollView, RefreshControl, TouchableOpacity, AsyncStorage, ActivityIndicator } from 'react-native';
import { SwText, SwStyleSheet, SwBadge, SwCard } from 'sw-react-native-ui';
import { ViolationService } from '../../services/ViolationService';
import { DbStorageKey } from '../../services/storageKey';
import { PageNames } from '../../config/AppConstants';
import { CornerLabel } from '../../components/index';
import _ from 'lodash';

const moment = require('moment');

export class Violations extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return ({
      headerTitle: Violations.renderNavigationTitle()
    });
  };

  constructor(props) {
    super(props);

    this.violationService = new ViolationService();

    this.state = {
      showLoading: true,
      refreshing: false,
      items: [],
      unit: {}
    };
  }

  async componentWillMount() {
    const unitData = await AsyncStorage.getItem(DbStorageKey.SelectedUnit);
    const unit = JSON.parse(unitData);
    this.setState({ unit: unit });

    await this.bindData();
  }

  async bindData() {
    const unit = this.state.unit;

    await this.violationService.getAll(unit.AssociationIdEncrypted, unit.UnitIdEncrypted)
      .then(response => {
        if (response != null) {

          const items = response.GetUnitViolationsResult;
          this.setState({ items: items });
          console.log(items);
          this.setState({ showLoading: false });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ showLoading: false });
      });
  }

  navigateToViolation(item) {   
    this.props.navigation.navigate(PageNames.Violation, {
      name: item.ViolationType,
      associationIdEncrypted: this.state.unit.AssociationIdEncrypted,
      violationIdEncrypted: item.ViolationItemIdEncrypted
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
          <SwText swType='header4 center'>Violations</SwText>
          <SwText swType='secondary2 secondaryColor center'>Overview</SwText>
        </View>
      </View>
    )
  }

  renderItem = (item) => (
    <TouchableOpacity key={item.ViolationItemIdEncrypted}
      onPress={() => this.navigateToViolation(item)}>
      <SwCard style={styles.itemContainer}>
        <View style={styles.content}>
          <SwText swType='header4' numberOfLines={1}>{item.ViolationType}</SwText>
          <View style={styles.detail}>
            <SwText swType='secondary2'>{item.Stage}</SwText>
            <View style={styles.date}>
              <SwText style={{ textAlign: 'right' }} swType='secondary2'>{moment(new Date(item.ActivityCreatedDate)).format('MM/DD/YYYY')}</SwText>
            </View>
          </View>
        </View>
        <CornerLabel
          cornerRadius={54}
          alignment={'right'}
          style={{ backgroundColor: 'red', height: 24, }}
          textStyle={{ color: '#fff', fontSize: 12, }}>
          {item.OpenClosed}
        </CornerLabel>
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
      <View style={styles.root}>
        {
          this.state.showLoading ? (
            <ActivityIndicator size="large" color="#00ff00" marginVertical={100} />
          ) : (
              <ScrollView style={styles.screen} refreshControl={this.refreshControl()}>
                <View style={styles.container} >
                  {this.state.items.map(this.renderItem)}
                </View>
              </ScrollView>
            )
        }
      </View>
    );
  }
}

const styles = SwStyleSheet.create(theme => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.screen.base,
  },
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
    overflow: 'hidden'
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
