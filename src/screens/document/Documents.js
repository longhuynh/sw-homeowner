
import React from 'react';
import { View, ScrollView, FlatList, StyleSheet, Dimensions } from 'react-native';
import { SwText, SwStyleSheet, SwButton, SwCard, SwTheme } from 'sw-react-native-ui';
import Icon from 'react-native-vector-icons/FontAwesome';
import { scale, scaleVertical } from '../../utils/scale';


const screenHeight = Dimensions.get('window').height - 200;

export class Documents extends React.Component {
  static navigationOptions = {
    title: 'Document'.toUpperCase(),
  };

  constructor(props) {
    super(props);
    const workOrderId = this.props.navigation.getParam('id', 1);
  }

  data = [{
    id: 1,
    fileName: 'Word Order Form',
    format: 'PDF',
    userCreated: 'Home Owner',
    dateCreated: '6/3/2018',
    url: '',
  },
  {
    id: 2,
    fileName: 'Photo 1',
    format: 'png',
    userCreated: 'Jim Smith',
    dateCreated: '6/3/2018',
    url: '',
  },
  {
    id: 3,
    fileName: 'Photo 2',
    format: 'gif',
    userCreated: 'Jim Smith',
    dateCreated: '6/3/2018',
    url: '',
  },
  {
    id: 11,
    fileName: 'Word Order Form',
    format: 'PDF',
    userCreated: 'Home Owner',
    dateCreated: '6/3/2018',
    url: '',
  },
  {
    id: 21,
    fileName: 'Photo 1',
    format: 'png',
    userCreated: 'Jim Smith',
    dateCreated: '6/3/2018',
    url: '',
  },
  {
    id: 31,
    fileName: 'Photo 2',
    format: 'gif',
    userCreated: 'Jim Smith',
    dateCreated: '6/3/2018',
    url: '',
  }, {
    id: 12,
    fileName: 'Word Order Form',
    format: 'PDF',
    userCreated: 'Home Owner',
    dateCreated: '6/3/2018',
    url: '',
  },
  {
    id: 22,
    fileName: 'Photo 1',
    format: 'png',
    userCreated: 'Jim Smith',
    dateCreated: '6/3/2018',
    url: '',
  },
  {
    id: 32,
    fileName: 'Photo 2',
    format: 'gif',
    userCreated: 'Jim Smith',
    dateCreated: '6/3/2018',
    url: '',
  }, {
    id: 13,
    fileName: 'Word Order Form',
    format: 'PDF',
    userCreated: 'Home Owner',
    dateCreated: '6/3/2018',
    url: '',
  },
  {
    id: 23,
    fileName: 'Photo 1',
    format: 'png',
    userCreated: 'Jim Smith',
    dateCreated: '6/3/2018',
    url: '',
  },
  {
    id: 33,
    fileName: 'Photo 2',
    format: 'gif',
    userCreated: 'Jim Smith',
    dateCreated: '6/3/2018',
    url: '',
  },
  ];

  onCameraButtonPressed() {

  }

  onUploadButtonPressed() {

  }

  extractItemKey = (item) => `${item.id}`;

  renderSeparator = () => (
    <View style={styles.separator} />
  );

  renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <SwText swType='header5' style={styles.link}> {`${item.fileName}`} ({`${item.format}`})</SwText>
          <SwText swType='secondary4 hintColor'>
          </SwText>
        </View>
        <SwText swType='primary3 mediumLine'>{`${item.userCreated}`} ({`${item.userCreated}`})</SwText>
      </View>
    </View>
  );

  render = () => (
    <View style={styles.screen}>
      <View style={styles.container} >
        <SwCard style={styles.card}>
          <View style={styles.top}>
            <View style={styles.row}>
              <SwButton style={styles.circleButton} swType='icon circle' onPress={() => { this.onCameraButtonPressed() }}>
                <Icon name='camera' size={35} style={styles.icon} />
              </SwButton>
              <SwButton style={styles.circleButton} swType='icon circle' onPress={() => { this.onUploadButtonPressed() }}>
                <Icon name='upload' size={35} style={styles.icon} />
              </SwButton>
            </View>
          </View>

          <FlatList
            data={this.data}
            extraData={this.state}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={this.extractItemKey}
            renderItem={this.renderItem}
          />

        </SwCard>
      </View>
    </View>
  )
}

const styles = SwStyleSheet.create(theme => ({
  screen: {
    backgroundColor: theme.colors.screen.scroll,
    paddingHorizontal: 20,
  },
  link: {
    color: theme.colors.info
  },
  container: {
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  itemContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  card: {
    borderRadius: 3,
    height: scaleVertical(screenHeight),
    paddingHorizontal: 15,
  },
  header: {
    paddingVertical: 25,
  },
  section: {
    marginVertical: 25,
  },
  heading: {
    paddingBottom: 15,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 17.5,
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
  circleButton: {
    marginVertical: scale(20),
    marginRight: scale(20),
    alignSelf: 'center',
  },
  icon: {
    alignSelf: 'center',
    color: theme.colors.primary
  },
  top: {
    justifyContent: 'flex-start'
  }
}));
