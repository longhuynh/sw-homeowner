import React from 'react';
import { ScrollView, View, StyleSheet, AsyncStorage } from 'react-native';
import { SwText, SwButton, SwStyleSheet } from 'sw-react-native-ui';
import NavigationType from '../../config/navigation/NavigationType';
import { PageNames } from '../../config/AppConstants';
import { Icon } from 'react-native-elements';
import { DbStorageKey } from '../../services/storageKey';
import { jsonItemsBuilder } from '../../services/jsonBuilder';

export class UnitOwners extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };

  static navigationOptions = {
    title: 'Change Owner Units'.toUpperCase(),
  };

  constructor(props) {
    super(props);
  }

  state = {
    dimensions: undefined,
    unitOwners: []
  };

  async componentWillMount(){   
    const unitOwners = await AsyncStorage.getItem(DbStorageKey.UnitOwners);   
    this.setState({unitOwners: JSON.parse(unitOwners) });
  }

  onContainerLayout = (event) => {
    if (this.state.height) {
      return;
    }
    const dimensions = event.nativeEvent.layout;
    this.setState({ dimensions });
  };

  renderItems = () => this.state.unitOwners.map(this.renderItem);

  renderItem = (unit) => (
    <SwButton
      swType='tile'
      style={{ height: this.state.dimensions.width / 3, width: this.state.dimensions.width / 3 }}
      key={unit.IdEncrypted}
      onPress={() => this.onItemPressed(unit)}>
      <Icon name='home' size={30} type='font-awesome' color='#3bd555'/>
      <SwText swType='primary small center'>{unit.OwnerFirstName} {unit.OwnerLastName}</SwText>
      <SwText swType='small center'>{unit.UnitAddress}</SwText>
    </SwButton>
  );

  onItemPressed = async (unit) => {
    const ownerFullName = `${unit.OwnerFirstName} ${unit.OwnerLastName}`;
    const pairs = [
      {name: 'UnitIdEncrypted', value: unit.IdEncrypted},
      {name: 'AssociationIdEncrypted', value: unit.AssociationIdEncrypted},
      {name: 'ManagementIdEncrypted', value: unit.ManagementIdEncrypted}
    ];

    const dashboardQuery = jsonItemsBuilder(pairs);

    const navigationParams = {
      unitIdEncrypted: unit.IdEncrypted,
      ownerFullName: ownerFullName, 
      address: unit.UnitAddress,
      numberOfUnit: this.state.unitOwners.length,
      dashboardQuery: dashboardQuery
    };

    this.props.navigation.navigate(PageNames.Dashboard, navigationParams);
  };

  render() {
    const unitOwners = this.state.dimensions === undefined ? <View /> : this.renderItems();

    return (
      <ScrollView
        style={styles.root}
        onLayout={this.onContainerLayout}
        contentContainerStyle={styles.rootContainer}>
        {unitOwners}
      </ScrollView>
    );
  }
}

const styles = SwStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
  },
  rootContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  icon: {
    color: theme.colors.primary
  },
  empty: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
  },
  icon: {
    marginBottom: 16,
  },
}));
