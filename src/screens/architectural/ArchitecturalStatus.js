import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { SwText, SwStyleSheet, SwBadge, SwCard } from 'sw-react-native-ui';
import Icon from 'react-native-vector-icons/FontAwesome';

export class ArchitecturalStatus extends React.Component {
  static navigationOptions = {
    title: 'Status'.toUpperCase(),
  };

  state = {
    data: {
      items: [
        {
          id: 1,
          name: 'In Review',
          createdDate: '02/11/2018'
        },
        {
          id: 2,
          name: 'Approved',
          createdDate: '02/11/2018'
        },
        {
          id: 3,
          name: 'Declined',
          createdDate: '02/11/2018'
        },     
      ],
    },
  };

  renderStatItem = (item) => (
    <View key={item.id}>
       <SwCard style={styles.card} >
        <View style={styles.content}>
          <SwText swType='header2'>{`${item.name}`}</SwText>
          <View style={styles.detail}>
            <View style={styles.itemDate}>
              <SwText style={{ textAlign: 'right' }} swType='secondary2'>{item.createdDate}</SwText>
            </View>
          </View>
        </View>
      </SwCard>
    </View>
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
  itemDate: {
    flex: 1
  },
}));
