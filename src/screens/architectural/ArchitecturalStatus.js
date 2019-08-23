import React from 'react';
import { View, ScrollView } from 'react-native';
import { SwText, SwStyleSheet, SwCard } from 'sw-react-native-ui';
const moment = require('moment');

export class ArchitecturalStatus extends React.Component {
  static navigationOptions = {
    title: 'Status History',
  };

  constructor(props) {
    super(props);
    const projectHistories = this.props.navigation.getParam('projectHistories', '');

    console.log(projectHistories);

    this.state = {
      items: projectHistories,
    };
  }

  renderStatItem = (item) => (
    <View key={item.LastUpdatedDate}>
       <SwCard style={styles.card} >
        <View style={styles.content}>
          <SwText swType='header2'>{`${item.Status}`}</SwText>
          <View style={styles.detail}>
            <View style={styles.date}>
              <SwText style={{ textAlign: 'right' }} swType='secondary2'>{moment(new Date(item.LastUpdatedDate)).format('MM/DD/YY HH:mm A')}</SwText>
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
