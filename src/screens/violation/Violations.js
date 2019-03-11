import React from 'react';
import { View, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import { SwText, SwStyleSheet, SwBadge, SwCard } from 'sw-react-native-ui';
import { Badge, Icon } from 'react-native-elements';
import { ViolationServiceInstance } from '../../services/ViolationService';
import { DbStorageKey } from '../../services/storageKey';
import { jsonItemsBuilder } from '../../services/jsonBuilder';

export class Violations extends React.Component {
  static navigationOptions = {
    title: 'Violations'.toUpperCase(),
  };

  async componentWillMount() {
    const unitData = await AsyncStorage.getItem(DbStorageKey.SelectedUnit);
    const unit = JSON.parse(unitData);

    const pairs = [
      { name: 'UnitIdEncrypted', value: unit.IdEncrypted },
      { name: 'AssociationIdEncrypted', value: unit.AssociationIdEncrypted },
      { name: 'ManagementIdEncrypted', value: unit.ManagementIdEncrypted }
    ];

    const query = jsonItemsBuilder(pairs);

    await ViolationServiceInstance.getAll(query)
      .then(response => {
        if (response != null || response != undefined) {
          const dataValue = Object.values(response);
          const parsedData = JSON.parse(dataValue);

          console.log(parsedData);
          // this.setState({ items: items });
        }
      })
      .catch(error => {
        console.error(error);
      })

  }

  state = {
    items: [
      {
        id: 1,
        category: 'Lanscape',
        subCategory: 'Moving',
        icon: 'check',
        status: 'Open',
        iconStatus: 'success',
        createdDate: '02/11/2018'
      },
      {
        id: 2,
        category: 'Parking',
        subCategory: 'Boat',
        status: 'Close',
        icon: 'close',
        iconStatus: 'error',
        createdDate: '02/11/2018'
      },
      {
        id: 3,
        category: 'Animal & Pet',
        subCategory: 'Dog',
        status: 'Open',
        icon: 'check',
        iconStatus: 'success',
        createdDate: '02/11/2018'
      }
    ],
  };

  renderStatItem = (item) => (
    <TouchableOpacity key={item.id}
      onPress={() => this.props.navigation.navigate('Violation', { id: item.id })}>
      <SwCard style={styles.card}>
        {/* <Badge value={<Icon name={item.icon} />} status={item.iconStatus} textStyle={{ fontSize: 15 }} 
              badgeStyle={{width: 30, height:30, borderRadius: 300 }} 
              containerStyle={{ position: 'absolute', top: -10, right: -10,  }}/> */}
        <View style={styles.content}>
          <SwText swType='header2'>{`${item.category} - ${item.subCategory}`}</SwText>
          <View style={styles.detail}>
            <SwText swType='secondary2'>{item.status}</SwText>
            <View style={styles.date}>
              <SwText style={{ textAlign: 'right' }} swType='secondary2'>{item.createdDate}</SwText>
            </View>
          </View>
        </View>
      </SwCard>
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
  items: {
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  card: {
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
    flexDirection: 'row'
  },
  date: {
    flex: 1
  },
}));
