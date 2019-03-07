import React from 'react';
import { ScrollView, View, StyleSheet, AsyncStorage } from 'react-native';
import { SwText, SwButton, SwStyleSheet } from 'sw-react-native-ui';
import NavigationType from '../../config/navigation/NavigationType';
import { PageNames } from '../../config/AppConstants';
import { Icon } from 'react-native-elements';
import { DbStorageKey } from '../../services/storageKey';

export class Units extends React.Component {
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
    owners: []
  };

  async componentWillMount(){   
    const owners = await AsyncStorage.getItem(DbStorageKey.Owners);   
    this.setState({owners: JSON.parse(owners) });
  }

  onContainerLayout = (event) => {
    if (this.state.height) {
      return;
    }
    const dimensions = event.nativeEvent.layout;
    this.setState({ dimensions });
  };

  renderItems = () => this.state.owners.map(this.renderItem);

  renderItem = (owner) => (
    <SwButton
      swType='tile'
      style={{ height: this.state.dimensions.width / 3, width: this.state.dimensions.width / 3 }}
      key={owner.IdEncrypted}
      onPress={() => this.onItemPressed(owner)}>
      <Icon name='home' size={30} type='font-awesome' color='#3bd555'/>
      <SwText swType='primary small center'>{owner.OwnerFirstName} {owner.OwnerLastName}</SwText>
      <SwText swType='small center'>{owner.UnitAddress}</SwText>
    </SwButton>
  );

  onItemPressed = async (owner) => {
    const ownerFullName = `${owner.OwnerFirstName} ${owner.OwnerLastName}`;
    const dashboardQuery = {jsonItems: "[{\"queryName\":\"UnitIdEncrypted\",\"value\":\"" + owner.IdEncrypted + 
    "\"},{\"queryName\":\"AssociationIdEncrypted\",\"value\":\""+ owner.AssociationIdEncrypted +
    "\"},{\"queryName\":\"ManagementIdEncrypted\",\"value\":\""+ owner.ManagementIdEncrypted + "\"}]"}

    const navigationParams = {
      unitIdEncrypted: owner.IdEncrypted,
      ownerFullName: ownerFullName, 
      ownerFullName: ownerFullName, 
      address: owner.UnitAddress,
      dashboardQuery: dashboardQuery
    };

    this.props.navigation.navigate(PageNames.Dashboard, navigationParams);
  };

  render() {
    const owners = this.state.dimensions === undefined ? <View /> : this.renderItems();

    return (
      <ScrollView
        style={styles.root}
        onLayout={this.onContainerLayout}
        contentContainerStyle={styles.rootContainer}>
        {owners}
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
