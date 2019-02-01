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
      items: [
        {
          name: 'Balance',
          screen: 'AccountSummary',
          value: '$4,512',
          icon: 'money',
          background: 'rgb(134, 19, 136)'
        },
        {
          name: 'Arc/Arb',
          screen: 'Architecturals',
          value: '4',
          icon: 'legal',
          background: 'rgb(59, 157, 214)'
        },
        {
          name: 'Work Orders',
          screen: 'WorkOrders',
          value: '12',
          icon: 'wrench',
          background: 'rgb(255, 127, 29)'
        },
        {
          name: 'Violations',
          screen: 'Violations',
          value: '5',
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
    <TouchableOpacity onPress={() => {this.gotoScreen(item.screen) }} key={item.screen}>
      <View style={[styles.container, { backgroundColor: item.background }]} >
        <View>
          <SwText swType='header2' style={styles.name}>{item.name}</SwText>
          <SwText swType='secondary1' style={styles.value}>{item.value}</SwText>
        </View>
        <Icon name={item.icon} size={50} style={styles.icon} />
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
  container: {
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
  },
  name: {
    color: 'white',
  },
}));
