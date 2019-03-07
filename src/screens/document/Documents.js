
import React from 'react';
import { View, FlatList, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { SwText, SwStyleSheet, SwButton, SwCard } from 'sw-react-native-ui';
import { Badge} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import FileViewer from 'react-native-file-viewer';
import { FileSystem } from 'expo';

const screenHeight = Dimensions.get('window').height - 120;

export class Documents extends React.Component {
  static navigationOptions = {
    title: 'Documents'.toUpperCase(),
  };


  constructor(props) {
    super(props);
    const workOrderId = this.props.navigation.getParam('id', 1);

    this.state = {localFile: ''};
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
  },
  ];

  getLocalPath (url) {
    const filename = url.split('/').pop();
    return `${FileSystem.documentDirectory}${filename}`;
  } 

  onViewFile(item){
    // const url = 'https://www.ctvnews.ca/polopoly_fs/1.4037876!/httpImage/image.jpg_gen/derivatives/landscape_1020/image.jpg';
    // const localFile =  this.getLocalPath(url);

    // this.setState({
    //   localFile: localFile,
    //       });
    
    // Alert.alert(localFile);

    // FileSystem.downloadAsync(url, localFile)
    // .then((uri) => 
    // {
    //   setTimeout(() => { FileViewer.open(localFile);}, 5000)
     
    // })
    // .then(() => {
    // })
    // .catch(error => {

    // });
    this.props.navigation.navigate('DocumentViewer');
  }

  onCameraButtonPressed() {
    this.props.navigation.navigate('CameraExample');
  }

  onUploadButtonPressed() {

  }

  extractItemKey = (item) => `${item.id}`;

  renderSeparator = () => (
    <View style={styles.separator} />
  );

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.onViewFile(item)}>
    <View style={styles.itemContainer}>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <SwText swType='header5' style={styles.link}> {`${item.fileName}`} ({`${item.format}`})</SwText>
          <SwText swType='secondary4 hintColor'>
          <SwText swType='header5' style={styles.link}> {`${this.state.localFile}`}</SwText>
          </SwText>
        </View>
        <SwText swType='primary3 mediumLine'>{`${item.dateCreated}`} ({`${item.userCreated}`})</SwText>
      </View>
    </View>
    </TouchableOpacity>
  );

  render = () => (
    <View style={styles.screen}>
      <View style={styles.container} >     
        <SwCard style={styles.card}>
          <Badge value={this.data.length} status="success" textStyle={{ fontSize: 25 }} 
                badgeStyle={{width: 50, height:50, borderRadius: 300 }} 
                containerStyle={{ position: 'absolute', top: -15, right: -15 }}/>

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
    paddingLeft: 5,
    paddingRight: 5,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  card: {
    borderRadius: 3,
    height: screenHeight,
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
