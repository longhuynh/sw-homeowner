
import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { SwText, SwStyleSheet, SwBadge, SwCard } from 'sw-react-native-ui';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { PageNames } from '../../config/AppConstants';
import { ArcServiceInstance } from '../../services/ArcService';
import { Architecturals } from './Architecturals';

export class Architectural extends React.Component {
  static navigationOptions = {
    title: 'Arc/Arb Detail'.toUpperCase(),
  };

  constructor(props) {
    super(props);
    const query = this.props.navigation.getParam('query', '');
    const id = this.props.navigation.getParam('id', '');

    this.state = {
      query: query,
      id: id,
      items: [],
    };

    this.bindData(query);

    console.log(Architecturals.state);
  }

  async bindData(query) {
    if (query == undefined || query == '')
      return;

    await ArcServiceInstance.getArc(query)
      .then(response => {
        if (response != null && response != undefined) {
          const dataValue = Object.values(response);
          const parsedData = JSON.parse(dataValue);

          const items = this.generateData(parsedData);
          this.setState({ items: items });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  generateData(parsedData) {
    let items = [];
    items.push({
      name: 'Status',
      screen: 'ArchitecturalStatus',
      value: parsedData.Status || '',
      icon: 'star'
    });
    items.push({
      name: 'Pics/Docs',
      screen: 'Documents',
      value: parsedData.NumberOfDocuments.toString()  || '0',
      icon: 'file'
    });
    items.push({
      name: 'Comments',
      screen: 'Comments',
      value: parsedData.NumberOfComment.toString()  || '0',
      icon: 'comments'
    });

    return items;
  }

  navigateToScreen(screen) {
    this.props.navigation.navigate(screen, {
      pageName: PageNames.Architectural,
      referenceId: this.state.id
    });
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
