
import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { SwText, SwStyleSheet, SwBadge, SwCard } from 'sw-react-native-ui';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export class Architectural extends React.Component {
  static navigationOptions = {
    title: 'Arc/Arb Detail'.toUpperCase(),
  };

  constructor(props) {
    super(props);
    const architecturalId = this.props.navigation.getParam('id', 1);
  }

  state = {
    items: [
      {
        name: 'Status',
        screen: 'ArchitecturalStatus',
        value: 'In Review',
        icon: 'star'
      },
      {
        name: 'Pics/Docs',
        screen: 'Documents',
        value: '5',
        icon: 'file'
      },
      {
        name: 'Comments',
        screen: 'Comments',
        value: '12',
        icon: 'comments'
      }
    ],
  };

  navigateToScreen(screen) {
    this.props.navigation.navigate(screen);
  }

  renderStatItem = (item) => (
    <TouchableOpacity onPress={() => { this.navigateToScreen(item.screen) }} key={item.name}>
      <SwCard style={styles.card}>
        <View style={styles.content} >
          <View>
            <SwText swType='header2'>{item.name}</SwText>
            <SwText swType='secondary2'>{item.value}</SwText>
          </View>
          <FontAwesome5 name={item.icon} size={50} style={styles.icon} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detail: {
    flexDirection: 'row'
  },
  date: {
    flex: 1
  },
  icon: {
    alignSelf: 'center',
    marginLeft: 10,
    color: theme.colors.text.base
  }
}));
