import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { SwText, SwStyleSheet, SwBadge, SwCard } from 'sw-react-native-ui';
import { Badge, Icon} from 'react-native-elements';

export class Violations extends React.Component {
  static navigationOptions = {
    title: 'Violations'.toUpperCase(),
  };

  state = {
    data: {
      items: [
        {
          id: 1,
          category: 'Lanscape',
          subCategory: 'Moving',  
          icon: 'check',
          iconStatus: 'success',
          createdDate: '02/11/2018'
        },
        {
          id: 2,
          category: 'Parking',
          subCategory: 'Boat',
          icon: 'close',
          iconStatus: 'error',
          createdDate: '02/11/2018'
        },
        {
          id: 3,
          category: 'Animal & Pet',
          subCategory: 'Dog',
          icon: 'check',
          iconStatus: 'success',
          createdDate: '02/11/2018'
        }
      ],
    },
  };

  renderStatItem = (item) => (
    <TouchableOpacity key={item.id}
        onPress={() => this.props.navigation.navigate('Violation', { id: item.id })}>
       <SwCard style={styles.card}>
       <Badge value={<Icon name={item.icon} />} status={item.iconStatus} textStyle={{ fontSize: 15 }} 
              badgeStyle={{width: 30, height:30, borderRadius: 300 }} 
              containerStyle={{ position: 'absolute', top: -10, right: -10,  }}/>
        <View style={styles.content}>
          <SwText swType='header2'>{`${item.category} - ${item.subCategory}`}</SwText>
          <View style={styles.detail}>           
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
