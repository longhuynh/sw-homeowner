
import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator,  RefreshControl, Clipboard, Image, Share, Text } from 'react-native';
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
import { DocumentService } from '../../services/DocumentService';
import { CurrentUser } from '../../services/LoginService';
import { StorageService } from '../../services/StorageService';
import { HeaderBackButton } from 'react-navigation';

const moment = require('moment');

export class Documents extends React.Component {
  static navigationOptions = ({ navigation }) => {
    let pageName = navigation.state.params ? navigation.state.params.pageName : undefined;

    return ({
      headerTitle: 'Documents',
      headerLeft: Documents.renderNavigation(navigation, pageName),
    });
  };

  constructor(props) {
    super(props);
    const pageName = this.props.navigation.getParam('pageName', '');
    const referenceId = this.props.navigation.getParam('referenceId', '');
    const activityId = this.props.navigation.getParam('activityId', '');

    this.arcService = new ArcService();
    this.violationService = new ViolationService();
    this.workOrderService = new WorkOrderService();
    this.documentService = new DocumentService();

    const documents = this.documentService.getDocuments();

    this.state = {
      showLoading: false,
      refreshing: false,
      referenceId: referenceId,
      activityId: activityId,
      documents: documents,
      pageName: pageName
    };
  }
  
  async refreshData() {
    this.setState({ refreshing: true });

    const unit = StorageService.unit;

    switch (this.state.pageName) {
      case PageNames.Violation:
        await this.reloadViolationDocuments(unit.AssociationIdEncrypted);
        break;
      case PageNames.Architectural:
        await this.reloadArcDocuments(unit.AssociationIdEncrypted);
        break;
      case PageNames.WorkOrder:
      
        break;
      default:
        break;
    }   
    this.setState({ refreshing: false });
  }

  async uploadImageAsync(pickerResult) {
    //this.setState({ showLoading: true });

    let uri = pickerResult.uri;
    const uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    const maxWidth = 1024;
    const maxHeight = 1024;

    //TODO: Check on server.
    if (fileType == 'jpg')
      fileType = 'jpeg';

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
    const unit = StorageService.unit;

    switch (pageName) {
      case PageNames.Violation:
        await this.saveViolationDocument(formData, unit.AssociationIdEncrypted, this.state.activityId);
        break;
      case PageNames.Architectural:
        await this.saveArcDocument(formData, unit.AssociationIdEncrypted, this.state.referenceId);
        break;
      case PageNames.WorkOrder:
        await this.saveWoDocument(formData, this.state.referenceId);
        break;
      default:
        break;
    }   
   
  }

  async reloadViolationDocuments(associationIdEncrypted){
    this.setState({ showLoading: true });

    await this.violationService.getViolationItemById(associationIdEncrypted, this.state.referenceId)
      .then(async (response) => {
        console.log(response)
        if(response != null){
          const violation = response.GetViolationItemByIdResult;
          const documents = this.violationService.getDocuments(violation);

          this.setState({ documents: documents });
          this.setState({ showLoading: false });

          this.documentService.setDocuments(documents);        
        }
      })
      .catch(error => {
        console.log(error);
      });
  }  

  async reloadArcDocuments(associationIdEncrypted){
    this.setState({ showLoading: true });

    await this.arcService.getProjectDetails(associationIdEncrypted, this.state.referenceId)
      .then(response => {
        console.log(response);
        if (response != null) {
          const data = response.GetProjectDetailsResult;
          const documents = this.arcService.mapToDocuments(data);

          this.setState({ documents: documents });
          this.setState({ showLoading: false });

          this.documentService.setDocuments(documents);
        }
      })
      .catch(error => {
        console.log(error);
      });

  }  

  async saveViolationDocument(formData, associationIdEncrypted, activityId) {
    await this.violationService.uploadPhoto(formData, associationIdEncrypted, 
        CurrentUser.UserIdEncrypted, activityId)
      .then(async (response) => {
        if(response.ok){
          await this.reloadViolationDocuments(associationIdEncrypted);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  async saveArcDocument(formData, associationIdEncrypted, projectIdEncrypted) {
    await this.arcService.uploadPhoto(formData, CurrentUser.UserIdEncrypted, projectIdEncrypted)
      .then(async (response) => {
        if(response.ok){
          await this.reloadArcDocuments(associationIdEncrypted)
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  async saveWoDocument(formData, workOrderIdEncypted) {
    await this.workOrderService.uploadPhoto(formData, CurrentUser.UserIdEncrypted, workOrderIdEncypted)
      .then(response => {

      })
      .catch(error => {
        console.log(error);
      });
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

  static renderNavigation = (navigation, pageName) => (
    <HeaderBackButton onPress={() => { navigation.navigate(pageName, {refresh: true});}}/>
  );

  extractItemKey = (item) => guid();

  renderSeparator = () => (
    <View style={styles.separator} />
  );

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.onViewFile(item)}>
      <View style={styles.itemContainer}>
        <View style={styles.content}>
          <View style={styles.contentHeader}>
            <SwText swType='header5' style={styles.link}> {item.Name} ({item.DocumentType})</SwText>
          </View>
          {this.renderItemDetail(item)}
        </View>
      </View>
    </TouchableOpacity>
  );

  renderItemDetail(item){
    if(item.CreatedByUser == null)
      return <SwText swType='primary3 mediumLine'>{moment(new Date(item.CreatedDate.toString())).format('MM/DD/YYYY')}</SwText>;

    return <SwText swType='primary3 mediumLine'>{moment(new Date(item.CreatedDate.toString())).format('MM/DD/YYYY')} ({item.CreatedByUser})</SwText>;
  }

  refreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={() => this.refreshData()} />
    )
  }  

  render = () => {
    if (this.state.showLoading)
      return (<ActivityIndicator size="large" color="#00ff00" marginVertical={100} />);

    return (
      <View style={styles.screen}>
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
          {this.state.showLoading ? (
            <ActivityIndicator size="large" color="#00ff00" />
          ) : (
            <FlatList refreshControl={this.refreshControl()}
              data={this.state.documents}
              extraData={this.state}
              ItemSeparatorComponent={this.renderSeparator}
              keyExtractor={this.extractItemKey}
              renderItem={this.renderItem}
            />
          )}
            </SwCard>
      </View>
    );
  }
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
