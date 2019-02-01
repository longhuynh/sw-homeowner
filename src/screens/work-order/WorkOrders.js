import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { SwText, SwStyleSheet, SwBadge, SwCard } from 'sw-react-native-ui';
import { Badge, Icon } from 'react-native-elements';

export class WorkOrders extends React.Component {
  static navigationOptions = {
    title: 'Work Order'.toUpperCase(),
  };

  state = {
    data: {
      items: [
        {
          id: 1,
          category: 'Pool',
          subCategory: 'Cleaning',
          status: 'Assigned',
          icon: 'check',
          iconStatus: 'success',
          createdDate: '02/11/2018'
        },
        {
          id: 2,
          category: 'Pipe',
          subCategory: 'Repair',
          status: 'Closed',
          icon: 'close',
          iconStatus: 'error',
          createdDate: '02/11/2018'
        },
        {
          id: 3,
          category: 'Pool',
          subCategory: 'Cleaning',
          status: 'Assigned',
          icon: 'check',
          iconStatus: 'success',
          createdDate: '02/11/2018'
        },
        {
          id: 4,
          category: 'Pipe',
          subCategory: 'Repair',
          status: 'Closed',
          icon: 'close',
          iconStatus: 'error',
          createdDate: '02/11/2018'
        },
        {
          id: 5,
          category: 'Pool',
          subCategory: 'Cleaning',
          status: 'Assigned',
          icon: 'check',
          iconStatus: 'success',
          createdDate: '02/11/2018'
        },
        {
          id: 6,
          category: 'Pipe',
          subCategory: 'Repair',
          status: 'Closed',
          icon: 'close',
          iconStatus: 'error',
          createdDate: '02/11/2018'
        },
        {
          id: 7,
          category: 'Pool',
          subCategory: 'Cleaning',
          status: 'Assigned',
          icon: 'check',
          iconStatus: 'success',
          createdDate: '02/11/2018'
        }
      ],
    },
  };

  renderStatItem = (item) => (
    <TouchableOpacity key={item.id}
      onPress={() => this.props.navigation.navigate('WorkOrder', { id: item.id })}>
      <SwCard style={styles.card}>
        <Badge value={<Icon name={item.icon} />} status={item.iconStatus} textStyle={{ fontSize: 15 }}
          badgeStyle={{ width: 30, height: 30, borderRadius: 300 }}
          containerStyle={{ position: 'absolute', top: -10, right: -10, }} />
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
          {this.state.data.items.map(this.renderStatItem)}
        </View>
      </ScrollView>
    );
  }
}

const styles = SwStyleSheet.create(theme => ({
  screen: {
    backgroundColor: theme.colors.screen.scroll,
    paddingLeft: 20,
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
    marginRight: 20
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
