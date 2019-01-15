import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableHighlight,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import {
  SwStyleSheet,
  SwTheme,
  SwText,
} from 'sw-react-native-ui';
import NavigationType from '../../config/navigation/NavigationType';

export class CategoryMenu extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
    })).isRequired,
  };

  onItemPressed = (item) => {
    const url = item.action || item.id;
    this.props.navigation.navigate(url);
  };

  extractItemKey = (item) => item.id;

  renderItem = ({ item }) => (
    <TouchableHighlight
      style={styles.item}
      underlayColor={SwTheme.current.colors.button.underlay}
      activeOpacity={1}
      onPress={() => this.onItemPressed(item)}>
      <View>
        <SwText>{item.title}</SwText>
      </View>
    </TouchableHighlight>
  );

  renderPlaceholder = () => (
    <View style={styles.emptyContainer}>
      <SwText swType='light subtitle'>Coming Soon...</SwText>
    </View>
  );

  renderList = () => (
    <FlatList
      style={styles.list}
      data={this.props.items}
      keyExtractor={this.extractItemKey}
      renderItem={this.renderItem}
    />
  );

  render = () => (this.props.items.length === 0 ? this.renderPlaceholder() : this.renderList());
}

const styles = SwStyleSheet.create(theme => ({
  item: {
    paddingVertical: 32.5,
    paddingHorizontal: 16.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
  },
  list: {
    backgroundColor: theme.colors.screen.base,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.screen.base,
  },
}));
