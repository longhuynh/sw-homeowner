
import React from 'react';
import { View, FlatList, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { SwText, SwStyleSheet, SwButton, SwCard } from 'sw-react-native-ui';
import { Badge } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FileSystem } from 'expo';
import { PageNames } from '../../config/AppConstants';
import { ApiConfig } from '../../services/config';

const screenHeight = Dimensions.get('window').height - 120;

export class Documents extends React.Component {
  static navigationOptions = {
    title: 'Documents'.toUpperCase(),
  };

  constructor(props) {
    super(props);
    const documents = this.props.navigation.getParam('documents', []);

    this.state = {
      documents: documents
    }

    console.log(this.state.documents);
  }

  getLocalPath(url) {
    const filename = url.split('/').pop();
    return `${FileSystem.documentDirectory}${filename}`;
  }

  onViewFile(item) {
    const url = item.Url.replace('..', ApiConfig.baseUrl);
    this.props.navigation.navigate(PageNames.DocumentViewer, {url: url, extension: item.Extension} );
  }

  onCameraButtonPressed() {
    this.props.navigation.navigate(PageNames.SwCamera);
  }

  onUploadButtonPressed() {

  }

  extractItemKey = (item) => `${item.DocumentIdEncrypted}`;

  renderSeparator = () => (
    <View style={styles.separator} />
  );

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.onViewFile(item)}>
      <View style={styles.itemContainer}>
        <View style={styles.content}>
          <View style={styles.contentHeader}>
            <SwText swType='header5' style={styles.link}> {`${item.Text}`} ({`${item.Extension}`})</SwText>
          </View>
          <SwText swType='primary3 mediumLine'>{`${item.CreatedDate}`} (Long Huynh)</SwText>
        </View>
      </View>
    </TouchableOpacity>
  );

  render = () => (
    <View style={styles.screen} >
      <SwCard style={styles.container}>
        <Badge value={this.state.documents.length} status="success" textStyle={{ fontSize: 25 }}
          badgeStyle={{ width: 50, height: 50, borderRadius: 300 }}
          containerStyle={{ position: 'absolute', top: -15, right: -15 }} />

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
          data={this.state.documents}
          extraData={this.state}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={this.extractItemKey}
          renderItem={this.renderItem}
        />
      </SwCard>
    </View>
  )
}

const styles = SwStyleSheet.create(theme => ({
  screen: {
    flex: 1,
    marginVertical: 20,
    backgroundColor: theme.colors.screen.scroll,
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    borderRadius: 3,
    paddingHorizontal: 15,
    borderColor: theme.colors.border.card,
    backgroundColor: theme.colors.screen.base,
  },
  card: {
    borderRadius: 3,
    height: screenHeight,
    paddingHorizontal: 15,
  },
  link: {
    color: theme.colors.info
  },
  itemContainer: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    width: 65,
    height: 65,
    marginVertical: 20,
    marginRight: 20,
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
