
import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Clipboard, Image, Share, Text, AsyncStorage } from 'react-native';
import { SwText, SwStyleSheet, SwButton, SwCard } from 'sw-react-native-ui';
import { Badge } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as Permissions from 'expo-permissions';
import { PageNames } from '../../config/AppConstants';
import guid from '../../utils/guid';
import { HttpService } from '../../services/config';
import { ViolationService } from '../../services/ViolationService';
import { ArcService } from '../../services/ArcService';
import { WorkOrderService } from '../../services/WorkOrderService';
import { DbStorageKey } from '../../services/storageKey';
import { DocumentService } from '../../services/DocumentService';
import { CurrentUser } from '../../services/LoginService';

const moment = require('moment');

export class Documents extends React.Component {
  static navigationOptions = {
    title: 'Documents',
  };

  constructor(props) {
    super(props);
    const pageName = this.props.navigation.getParam('pageName', '');
    const referenceId = this.props.navigation.getParam('referenceId', '');
    const activityId = this.props.navigation.getParam('activityId', ''); 

    console.log(documents);

    this.arcService = new ArcService();
    this.violationService = new ViolationService();
    this.workOrderService = new WorkOrderService();
    this.documentService = new DocumentService();

    const documents = this.documentService.getDocuments();

    this.state = {
      referenceId: referenceId,
      activityId: activityId,
      documents: documents,
      pageName: pageName
    };
  }

  async uploadImageAsync(pickerResult) {
    let uri = pickerResult.uri;
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];

    const maxWidth = 1024;
    const maxHeight = 1024;

    if (pickerResult.width > maxWidth || pickerResult.height > maxHeight) {
      const ratio = maxWidth / pickerResult.width;

      const resizeImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: maxWidth, height: pickerResult.height * ratio } }],
        { format: fileType },
      );

      uri = resizeImage.uri;
    }

    let formData = new FormData();
    const fileNameWoExtension = `Doc_${moment().format('YYYYDDMMHHmmss')}`;

    formData.append('photo', {
      uri,
      name: `${fileNameWoExtension}.${fileType}`,
      type: `image/${fileType}`,
    });

    const pageName = this.state.pageName;
    const unitData = await AsyncStorage.getItem(DbStorageKey.SelectedUnit);
    const unit = JSON.parse(unitData);
    let uploadUrl = "";

    switch (pageName) {
      case PageNames.Violation:
        uploadUrl = await this.saveViolationDocument(formData, unit.AssociationIdEncrypted, 
              unit.UserIdEncrypted, this.state.activityId);
        break;
      case PageNames.Architectural:
        uploadUrl = await this.saveArcDocument(formData, unit.UserIdEncrypted, this.state.referenceId);
        break;
      case PageNames.WorkOrder:
        uploadUrl = await this.saveWoDocument(formData, unit.UserIdEncrypted, this.state.referenceId);
        break;
      default:
        break;
    }

    if(uploadUrl != ""){
      let documents = this.state.documents;
      documents.splice(0, 0, {
        IdEncrypted: guid(15),
        Name: fileNameWoExtension,
        Extension: fileType,
        Url: uploadUrl,
        CreatedDate: new Date(),
        CreatedByUser: `${CurrentUser.FirstName} ${CurrentUser.LastName}`
      });

      this.setState({documents: documents});
      this.documentService.setDocuments(documents);
    }
  }

  async saveViolationDocument(formData, associationIdEncrypted, userIdEncrypted, activityId) {
    let uploadUrl = "";

    await this.violationService.uploadPhoto(formData, associationIdEncrypted, userIdEncrypted, activityId)
      .then(response => {
        uploadUrl = response._bodyText;
      })
      .catch(error => {
        console.log(error);
      });

    return uploadUrl;
  }

  async saveArcDocument(formData, userIdEncrypted, projectIdEncrypted) {
    let uploadUrl = "";

    await this.arcService.uploadPhoto(formData, userIdEncrypted, projectIdEncrypted)
      .then(response => {
        uploadUrl = response._bodyText;
      })
      .catch(error => {
        console.log(error);
      });
    
    return uploadUrl;
  }

  async saveWoDocument(formData, userIdEncrypted, workOrderIdEncypted) {
    let uploadUrl = "";

    await this.workOrderService.uploadPhoto(formData, userIdEncrypted, workOrderIdEncypted)
      .then(response => {
        uploadUrl = response._bodyText;
      })
      .catch(error => {
        console.log(error);
      });
    
    return uploadUrl;
  }

  onViewFile(item) {
    const url = `${HttpService.baseUrl}${item.Url}`;
    this.props.navigation.navigate(PageNames.DocumentViewer, { url: url, extension: item.Extension });
  }

  maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
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
        uploadResponse = await this.uploadImageAsync(pickerResult);
        //uploadResult = await uploadResponse.json();

        //this.setState({ image: uploadResult.location });
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
          <SwText swType='primary3 mediumLine'>{moment(new Date(item.CreatedDate.toString())).format('MM/DD/YYYY')} ({item.CreatedByUser})</SwText>
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
