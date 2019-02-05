import React from 'react';
import { FlatList, View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { SwStyleSheet, SwText, SwTextInput, SwCard } from 'sw-react-native-ui';
import { data } from '../../data/DataProvider';
import NavigationType from '../../config/navigation/NavigationType';
import { GradientButton } from '../../components/index';

const screenHeight = Dimensions.get('window').height - 120;
const moment = require('moment');

export class Comments extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };

  static navigationOptions = {
    title: 'Comments'.toUpperCase(),
  };

  state = {
    comment: ''
  };

  constructor(props) {
    super(props);
    const postId = this.props.navigation.getParam('postId', 1);
    this.state = {
      data: data.getComments(postId),
    };
  }

  extractItemKey = (item) => `${item.id}`;

  onCommentInputChanged = (text) => {
    this.setState({ comment: text });
  };

  renderSeparator = () => (
    <View style={styles.separator} />
  );

  onSaveButtonPressed = () => {
    //this.props.navigation.navigate('Login');
  };

  renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <SwText swType='header5'>01/10/2019 ({`${item.user.firstName} ${item.user.lastName}`})</SwText>
          <SwText swType='secondary4 hintColor'>
          </SwText>
        </View>
        <SwText swType='primary3 mediumLine'>{item.text}</SwText>
      </View>
    </View>
  );

  render = () => (
    <ScrollView style={styles.screen}>
      <View style={styles.container} >
        <SwCard style={styles.card}>
          <View style={styles.comment}>
            <SwText swType='header5'>Add comment</SwText>
            <SwTextInput
              value={this.state.comment}
              swType='bordered'
              onChangeText={this.onCommentInputChanged}
              multiline={true}
              numberOfLines={4} />
          </View>

          <GradientButton swType='small' style={styles.saveButton} text='Save' onPress={this.onSaveButtonPressed} />

          <FlatList
            data={this.state.data}
            extraData={this.state}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={this.extractItemKey}
            renderItem={this.renderItem}
          />
        </SwCard>
      </View>
    </ScrollView>
  );
}

const styles = SwStyleSheet.create(theme => ({
  screen: {
    backgroundColor: theme.colors.screen.scroll,
    paddingHorizontal: 20,
  },
  container: {
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  card: {
    borderRadius: 3,
    height: screenHeight,
    paddingHorizontal: 15,
  },
  itemContainer: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  content: {
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.border.base,
  },
  comment: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  saveButton: {
    width: 120,
    marginTop: 10,
    marginRight: 20,
    marginBottom: 10,
    alignSelf: 'flex-end'
  },
}));
