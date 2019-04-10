import React from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import _ from 'lodash';
import { SwStyleSheet, SwText, SwTextInput } from 'sw-react-native-ui';
import { FontAwesome } from '../../assets/icons';
import NavigationType from '../../config/navigation/NavigationType';
import { Icon } from 'react-native-elements';
import { CurrentUnitOwners } from '../../services/OwnerService';
import { PageNames } from '../../config/AppConstants';


export class UnitOwners extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };

  static navigationOptions = {
    title: 'Change Owner Units',
  };

  constructor(props) {
    super(props);    

    const unitOwners = Object.values(CurrentUnitOwners);

    this.state = {
        original: unitOwners,
        filtered: unitOwners
    }  
  } 

  
  async componentWillMount() {

  }

  extractItemKey = (item) => `${item.IdEncrypted}`;

  onInputChanged = (event) => {
    const pattern = new RegExp(event.nativeEvent.text, 'i');
    const units = _.filter(this.state.original, unit => {
      const filterResult = {
        firstName: unit.OwnerFirstName.search(pattern),
        lastName: unit.OwnerLastName.search(pattern),
      };
      return filterResult.firstName !== -1 || filterResult.lastName !== -1 ? unit : undefined;
    });

    this.setState({
        original: this.state.original,
        filtered: units,
    });
  };

  onItemPressed = (unit) => {
    const ownerFullName = `${unit.OwnerFirstName || ''} ${unit.OwnerLastName || ''}`;

    const navigationParams = {
      unitIdEncrypted: unit.IdEncrypted,
      ownerFullName: ownerFullName,
      address: unit.UnitAddress,
      numberOfUnit: this.state.original.length
    };

    this.props.navigation.navigate(PageNames.Dashboard, navigationParams);
  };

  renderSeparator = () => (
    <View style={styles.separator} />
  );

  renderInputLabel = () => (
    <SwText swType='awesome'>{FontAwesome.search}</SwText>
  );

  renderHeader = () => (
    <View style={styles.searchContainer}>
      <SwTextInput
        autoCapitalize='none'
        autoCorrect={false}
        onChange={this.onInputChanged}
        label={this.renderInputLabel()}
        swType='row'
        placeholder='Search'
      />
    </View>
  );

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.onItemPressed(item)}>
        <View style={styles.container}>
          <Icon name='home' size={40} type='font-awesome' iconStyle={styles.icon} />
          <View style={styles.content}>
            <View style={styles.contentHeader}>
              <SwText swType='header5'>{`${item.OwnerFirstName} ${item.OwnerLastName}`}</SwText>
            </View>
            <SwText numberOfLines={2} swType='primary3 mediumLine'>
              {item.UnitAddress}
            </SwText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render = () => {
    return (
      <FlatList
        style={styles.root}
        data={this.state.filtered}
        extraData={this.state}
        ListHeaderComponent={this.renderHeader}
        ItemSeparatorComponent={this.renderSeparator}
        keyExtractor={this.extractItemKey}
        renderItem={this.renderItem}
      />
    )
  };
}

const styles = SwStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
  },
  searchContainer: {
    backgroundColor: theme.colors.screen.bold,
    paddingHorizontal: 16,
    paddingVertical: 10,
    height: 60,
    alignItems: 'center',
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingBottom: 12,
    paddingTop: 7,
    flexDirection: 'row',
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.border.base,
  },
  icon: {
    color: theme.colors.primary,
    paddingTop: 5,
  },
}));
