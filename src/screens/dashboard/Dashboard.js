import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { SwText, SwStyleSheet, SwTheme } from 'sw-react-native-ui';
import Icon from 'react-native-vector-icons/FontAwesome';

export class Dashboard extends React.Component {
  static navigationOptions = {
    title: 'Dashboard'.toUpperCase(),
  };

  state = {
    data: {
      statItems: [
        {
          name: 'Balance',
          screen: 'Account',
          value: '$4,512',
          icon: 'money',
          background: 'rgb(134, 19, 136)'
        },
        {
          name: 'Arc/ARB',
          screen: 'Account',
          value: '2,256',
          icon: 'legal',
          background: 'rgb(59, 157, 214)'
        },
        {
          name: 'Work Orders',
          screen: 'WorkOrderOverview',
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

  gotoScreen(screen) {
    this.props.navigation.navigate(screen);
  }


  renderStatItem = (item) => (
    <TouchableOpacity onPress={() => {this.gotoScreen(item.screen) }} key={item.name}>
      <View style={[styles.statItemContainer, { backgroundColor: item.background }]} >
        <View>
          <SwText swType='header2' style={styles.statItemValue}>{item.name}</SwText>
          <SwText swType='secondary3' style={styles.statItemName}>{item.value}</SwText>
        </View>
        <Icon name={item.icon} size={50} color='white' />
      </View>
    </TouchableOpacity>
  );

  render = () => {
    return (
      <ScrollView style={styles.screen}>
        <View style={styles.statItems} >
          {this.state.data.statItems.map(this.renderStatItem)}
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
  statItems: {
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  statItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 3,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 20
  },
  statItemIcon: {
    alignSelf: 'center',
    marginLeft: 10,
    color: 'white',
  },
  statItemValue: {
    color: 'white',
  },
  statItemName: {
    color: 'white',
  },
}));
