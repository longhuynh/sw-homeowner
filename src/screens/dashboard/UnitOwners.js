import React from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { SwStyleSheet, SwText, SwTextInput } from 'sw-react-native-ui';
import { FontAwesome } from '../../assets/icons';
import NavigationType from '../../config/navigation/NavigationType';
import { Icon } from 'react-native-elements';
import { PageNames } from '../../config/AppConstants';
import { UnitService } from '../../services/UnitService';
import _ from 'lodash';
import { StorageService } from '../../services/StorageService';

export class UnitOwners extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };

  static navigationOptions = {
    title: 'Change Unit',
  };

  constructor(props) {
    super(props);    

    const units = this.props.navigation.getParam('units', {});

    this.unitService = new UnitService();
    this.storageService = new StorageService();

    this.state = {
      original: units,
      filtered: units
    }  
  } 

  async componentWillMount() {

  }

  extractItemKey = (item) => `${item.UnitIdEncrypted}`;

  onInputChanged = (event) => {
    const pattern = new RegExp(event.nativeEvent.text, 'i');
    const units = _.filter(this.state.original, unit => {
      const filterResult = {
        address: unit.UnitAddress.search(pattern),
      };
      return filterResult.address !== -1 ? unit : undefined;
    });

    this.setState({
        original: this.state.original,
        filtered: units,
    });
  };

  async loadOwnerUnitDetails(unit) {
    await this.unitService.getOwnerUnitDetails(unit.UnitIdEncrypted)
      .then(async (response) => {       
       
        const profile = response.GetOwnerUnitDetailsResult;      
        console.log(profile);  

        this.storageService.setOwnerUnitProfile(profile); 

        const ownerFullName =  `${profile.Owner.OwnerFirstName || ''} ${profile.Owner.OwnerLastName || ''}`;

        const navigationParams = {
          unitIdEncrypted: unit.UnitIdEncrypted,
          ownerFullName: ownerFullName,
          address: unit.UnitAddress,
          units: this.state.original
        };
       
        this.props.navigation.navigate(PageNames.Dashboard, navigationParams);
      });
  }

  onItemPressed = async (unit) => {    
    await this.loadOwnerUnitDetails(unit);
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
              <SwText swType='header5'>{item.UnitAddress}</SwText>
            </View>
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
    paddingBottom: 10,
    paddingTop: 7,
    flexDirection: 'row',
  },
  content: {
    marginLeft: 16,
    marginTop: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
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
