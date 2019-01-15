import React from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';
import {
  SwStyleSheet,
  SwText,
  SwTextInput,
} from 'sw-react-native-ui';
import { data } from '../../data/DataProvider';
import { Avatar } from '../../components/avatar/Avatar';
import { FontAwesome } from '../../assets/icons';
import NavigationType from '../../config/navigation/NavigationType';

export class Contacts extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };
  static navigationOptions = {
    title: 'Contacts'.toUpperCase(),
  };

  state = {
    data: {
      original: data.getUsers(),
      filtered: data.getUsers(),
    },
  };

  extractItemKey = (item) => `${item.id}`;

  onSearchInputChanged = (event) => {
    const pattern = new RegExp(event.nativeEvent.text, 'i');
    const contacts = _.filter(this.state.data.original, contact => {
      const filterResult = {
        firstName: contact.firstName.search(pattern),
        lastName: contact.lastName.search(pattern),
      };
      return filterResult.firstName !== -1 || filterResult.lastName !== -1 ? contact : undefined;
    });
    this.setState({
      data: {
        original: this.state.data.original,
        filtered: contacts,
      },
    });
  };

  onItemPressed = (item) => {
    this.props.navigation.navigate('ProfileV1', { id: item.id });
  };

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.onItemPressed(item)}>
      <View style={styles.container}>
        <Avatar swType='circle' style={styles.avatar} img={item.photo} />
        <SwText>{`${item.firstName} ${item.lastName}`}</SwText>
      </View>
    </TouchableOpacity>
  );

  renderSeparator = () => (
    <View style={styles.separator} />
  );

  renderHeaderLabel = () => (
    <SwText swType='awesome'>{FontAwesome.search}</SwText>
  );

  renderHeader = () => (
    <View style={styles.searchContainer}>
      <SwTextInput
        autoCapitalize='none'
        autoCorrect={false}
        onChange={this.onSearchInputChanged}
        label={this.renderHeaderLabel()}
        swType='row'
        placeholder='Search'
      />
    </View>
  );

  render = () => (
    <FlatList
      style={styles.root}
      data={this.state.data.filtered}
      renderItem={this.renderItem}
      ListHeaderComponent={this.renderHeader}
      ItemSeparatorComponent={this.renderSeparator}
      keyExtractor={this.extractItemKey}
      enableEmptySections
    />
  )
}

const styles = SwStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
  },
  searchContainer: {
    backgroundColor: theme.colors.screen.bold,
    paddingHorizontal: 16,
    paddingVertical: 10,
    height: 60,
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  avatar: {
    marginRight: 16,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.border.base,
  },
}));
