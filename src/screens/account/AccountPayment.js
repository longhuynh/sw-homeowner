import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { SwText, SwStyleSheet, SwTheme } from 'sw-react-native-ui';
import Icon from 'react-native-vector-icons/FontAwesome';

export class AccountPayment extends React.Component {
  static navigationOptions = {
    title: 'Account Payment'.toUpperCase(),
  };

  state = {
    data: {
      items: [
        {
          name: 'Balance',
          value: '$4,512',
          icon: 'money',
          background: 'rgb(134, 19, 136)'
        },
        {
          name: 'Arc/ARB',
          value: '2,256',
          icon: 'legal',
          background: 'rgb(59, 157, 214)'
        },
        {
          name: 'Work Orders',
          value: '1,124',
          icon: 'wrench',
          background: 'rgb(255, 127, 29)'
        },
        {
          name: 'Violations',
          value: '1,124',
          icon: 'warning',
          background: 'rgb(102, 188, 69)'
        }
      ],
    },
  };

  renderStatItem = (item) => (
    <TouchableOpacity onPress={() => { }} key={item.name}>
      <View style={[styles.itemContainer, { backgroundColor: item.background }]} >
        <View>
          <SwText swType='header2' style={styles.itemValue}>{item.name}</SwText>
          <SwText swType='secondary3' style={styles.itemName}>{item.value}</SwText>
        </View>
        <Icon name={item.icon} size={50} color='white' />
      </View>
    </TouchableOpacity>
  );

  render = () => {
    return (
      <ScrollView style={styles.screen}>
        <View style={styles.items} >
          {this.state.data.items.map(this.renderStatItem)}
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
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 3,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 20
  },
  itemIcon: {
    alignSelf: 'center',
    marginLeft: 10,
    color: 'white',
  },
  itemValue: {
    color: 'white',
  },
  itemName: {
    color: 'white',
  },
}));
