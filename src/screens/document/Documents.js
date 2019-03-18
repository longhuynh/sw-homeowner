
import React from 'react';
import { View, FlatList, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator, Clipboard, Image, Share, Text  } from 'react-native';
import { SwText, SwStyleSheet, SwButton, SwCard } from 'sw-react-native-ui';
import { Badge } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ImagePicker, Permissions } from 'expo';
import { PageNames } from '../../config/AppConstants';
import { ApiConfig } from '../../services/config';
import { ViolationServiceInstance } from '../../services/ViolationService';
import { ArcServiceInstance } from '../../services/ArcService';
import { WorkOrderServiceInstance } from '../../services/WorkOrderService';

const screenHeight = Dimensions.get('window').height - 120;

export class Documents extends React.Component {
  static navigationOptions = {
    title: 'Documents'.toUpperCase(),
  };

  constructor(props) {
    super(props);
    const pageName = this.props.navigation.getParam('pageName', '');
    const referenceId = this.props.navigation.getParam('referenceId', '');

    this.state = {
      referenceId: referenceId,
      documents: [],
      pageName: pageName
    };

    this.bindData();
  }

  bindData = async () => {
    if(this.state.referenceId.trim() == ''){     
      return;
    }    
      
    const pageName = this.state.pageName;
   
    switch (pageName) {
      case PageNames.Violation:      
        await this.getViolationDocuments();
        break;
      case PageNames.Architectural:
        await this.getArcDocuments();
        break;
      case PageNames.WorkOrder:
        await this.getWoDocuments();
        break;
      default:
        break;
    }
  };

  async getViolationDocuments() {
    const idEncrypted = this.state.referenceId;

    await ViolationServiceInstance.getDocuments(idEncrypted)
      .then(response => {      
        this.generateData(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  async getArcDocuments() {
    const idEncrypted = this.state.referenceId;

    await ArcServiceInstance.getDocuments(idEncrypted)
      .then(response => {      
        this.generateData(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  async getWoDocuments() {
    const idEncrypted = this.state.referenceId;

    await WorkOrderServiceInstance.getDocuments(idEncrypted)
      .then(response => {      
        this.generateData(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
    
  generateData(response) {
    if (response != null && response != undefined) {
      const dataValue = Object.values(response);
      const documents = JSON.parse(dataValue);

      this.setState({ documents: documents });
    }
  }

  onSaveButtonPressed = async () => {
    if(this.state.comment.trim() == ''){
      Alert.alert('Please enter comment');
      return;
    }    
      
    const pageName = this.state.pageName;
    const unitData = await AsyncStorage.getItem(DbStorageKey.SelectedUnit);
    const unit = JSON.parse(unitData);
   
    switch (pageName) {
      case PageNames.Violation:      
        await this.saveViolationDocument(unit.UserIdEncrypted);
        break;
      case PageNames.Architectural:
        await this.saveArcDocument(unit.UserIdEncrypted);
        break;
      case PageNames.WorkOrder:
        await this.saveWoDocument(unit.UserIdEncrypted);
        break;
      default:
        break;
    }

    this.props.navigation.navigate(pageName, {refresh: true});
  };

  async saveViolationDocument(userIdEncrypted) {
    let savedDocument = null;

    const pairs = [
      { name: 'ViolationItemIdEncrypted', value: this.state.referenceId },
      { name: 'UserIdEncrypted', value: userIdEncrypted },
      { name: 'Note', value: this.state.comment }
    ];
    
    const jsonItems = jsonItemsBuilder(pairs);

    await ViolationServiceInstance.saveDocument(jsonItems)
      .then(response => {
        savedDocument = response;
        console.log(JSON.stringify(response));
      })
      .catch(error => {
        console.log(error);
      });

      return savedDocument;
  }

  async saveArcDocument(userIdEncrypted) {
    let savedDocument = null;

    const pairs = [
      { name: 'ProjectIdEncrypted', value: this.state.referenceId },
      { name: 'UserIdEncrypted', value: userIdEncrypted },
      { name: 'Note', value: this.state.comment }
    ];
    
    const jsonItems = jsonItemsBuilder(pairs);

    await ArcServiceInstance.saveDocument(jsonItems)
      .then(response => {
        savedDocument = response;
        console.log(JSON.stringify(response));
      })
      .catch(error => {
        console.log(error);
      });

      return savedDocument;
  }

  async saveWoDocument(userIdEncrypted) {
    let savedDocument = null;

    const pairs = [
      { name: 'WoIdEncrypted', value: this.state.referenceId },
      { name: 'UserIdEncrypted', value: userIdEncrypted },
      { name: 'Note', value: this.state.comment }
    ];
    
    const jsonItems = jsonItemsBuilder(pairs);

    await WorkOrderServiceInstance.saveDocument(jsonItems)
      .then(response => {
        savedDocument = response;
        console.log(JSON.stringify(response));
      })
      .catch(error => {
        console.log(error);
      });

      return savedDocument;
  }

  onViewFile(item) {
    const url = item.Url.replace('..', ApiConfig.baseUrl);
    this.props.navigation.navigate(PageNames.DocumentViewer, {url: url, extension: item.Extension} );
  }
  
  maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      );
    }
  };

  maybeRenderImage = () => {
    let { image } = this.state;

    if (!image) {
      return;
    }

    return (
      <View
        style={styles.maybeRenderContainer}>
        <View
          style={styles.maybeRenderImageContainer}>
          <Image source={{ uri: image }} style={styles.maybeRenderImage} />
        </View>

        <Text
          onPress={this.copyToClipboard}
          onLongPress={this.share}
          style={styles.maybeRenderImageText}>
          {image}
        </Text>
      </View>
    );
  };

  share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image,
    });
  };

  copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  };

  takePhoto = async () => {
    const { status: cameraPerm } = await Permissions.askAsync(Permissions.CAMERA);
    const { status: cameraRollPerm } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchCameraAsync();
      this.handleImagePicked(pickerResult);
    }
  };

  pickImage = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync();
      this.handleImagePicked(pickerResult);
    }
  };

  handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult.uri);
        //uploadResult = await uploadResponse.json();

        this.setState({ image: uploadResult.location });
      }
    } catch (e) {
      console.log({ e });
    } finally {
      this.setState({ uploading: false });
    }
  };

  extractItemKey = (item) => `${item.IdEncrypted}`;

  renderSeparator = () => (
    <View style={styles.separator} />
  );

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.onViewFile(item)}>
      <View style={styles.itemContainer}>
        <View style={styles.content}>
          <View style={styles.contentHeader}>
            <SwText swType='header5' style={styles.link}> {`${item.Name}`} ({`${item.Extension}`})</SwText>
          </View>
          <SwText swType='primary3 mediumLine'>{`${item.CreatedDate} (${item.CreatedByUser})`}</SwText>
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
            <SwButton style={styles.circleButton} swType='icon circle' onPress={() => { this.takePhoto() }}>
              <FontAwesome5 name='camera' size={35} style={styles.icon} />
            </SwButton>
            <SwButton style={styles.circleButton} swType='icon circle' onPress={() => { this.pickImage() }}>
              <FontAwesome5 name='upload' size={35} style={styles.icon} />
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

async function uploadImageAsync(uri) {
  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];

  console.log(uri);

  let formData = new FormData();
  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  await ViolationServiceInstance.uploadPhoto(formData, 'AwPQuMFIWBjXZ9n_Nw8', 'U1TZ-MhdSwzAFX805Go', 'ajSauOB8OT4EG7LCghE');
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
  },
  maybeRenderUploading: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
  },
  maybeRenderContainer: {
    borderRadius: 3,
    elevation: 2,
    marginTop: 30,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    width: 250,
  },
  maybeRenderImageContainer: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    overflow: 'hidden',
  },
  maybeRenderImage: {
    height: 250,
    width: 250,
  },
  maybeRenderImageText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  }
}));
