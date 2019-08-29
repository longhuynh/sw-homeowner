
import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { SwText, SwStyleSheet, SwBadge, SwCard } from 'sw-react-native-ui';
import { FontAwesome5 } from '@expo/vector-icons';
import { PageNames } from '../../config/AppConstants';
import guid from '../../utils/guid';
import _ from 'lodash';
import { CommentService } from '../../services/CommentService';
import { ArcService } from '../../services/ArcService';
import { DocumentService } from '../../services/DocumentService';

export class Architectural extends React.Component {
  static navigationOptions = ({ navigation }) => {
    let name = navigation.state.params ? navigation.state.params.name : '';

    return ({
      headerTitle: Architectural.renderNavigationTitle(name)
    });
  };

  constructor(props) {
    super(props);
    const projectIdEncrypted = this.props.navigation.getParam('projectIdEncrypted', '');
    const associationIdEncrypted = this.props.navigation.getParam('associationIdEncrypted', '');

    this.arcService = new ArcService();
    this.commentService = new CommentService();
    this.documentService = new DocumentService();

    this.state = {
      projectIdEncrypted: projectIdEncrypted,
      associationIdEncrypted: associationIdEncrypted,
      items: [],
      projectHistories: [],
      comments: [],
      documents: []
    };

    this.bindData();
  }

  hasUpdate = false;

  async shouldComponentUpdate(nextProps) {
    let refresh = nextProps.navigation.state.params.refresh;
    
    if (refresh != undefined && refresh && !this.hasUpdate) {
      await this.bindData();
      this.hasUpdate = true;
      console.log("Refresh ...");
    }

    return this.hasUpdate;
  }


  async componentWillMount(){   
    await this.bindData();
  }

  async bindData() {   
    await this.arcService.getProjectDetails(this.state.associationIdEncrypted, this.state.projectIdEncrypted)
      .then(response => {  
        if (response != null) {
          const data = response.GetProjectDetailsResult;
          const items = this.generateData(data);
          this.setState({ items: items, projectHistories: data.ProjectHistory });       
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  generateData(data) {
    let items = [];
    const documents = this.arcService.mapToDocuments(data);
    this.documentService.setDocuments(documents);

    const comments = this.arcService.mapToComments(data);
    this.commentService.setComments(comments);

    this.setState({ 
      documents: documents,
      comments: comments 
    });

    items.push({
      name: 'Status',
      screen: 'ArchitecturalStatus',
      value: data.Project.Status || '',
      icon: 'star'
    });

    items.push({
      name: 'Pics/Docs',
      screen: 'Documents',
      value: documents.length.toString()  || '0',
      icon: 'file'
    });

    items.push({
      name: 'Comments',
      screen: 'Comments',
      value: comments.length.toString()  || '0',
      icon: 'comments'
    });

    return items;
  }

  navigateToScreen(screen) {
    if(screen == 'ArchitecturalStatus'){
      const projectHistories = _.reverse(_.sortBy(this.state.projectHistories, 'LastUpdatedDate'));
      this.props.navigation.navigate(screen, {projectHistories: projectHistories});
    }else{
      const params = {
        pageName: PageNames.Architectural,
        referenceId: this.state.projectIdEncrypted
      };
      
      this.props.navigation.navigate(screen, params);
    }
  }

  static renderNavigationTitle = (name) => {
    return (
      <View>
        <View style={styles.header}>
          <SwText swType='header4 center' numberOfLines={1}>{name}</SwText>
          <SwText swType='secondary2 center'>Detail</SwText>
        </View>
      </View>
    )
  }

  renderStatItem = (item) => (
    <TouchableOpacity onPress={() => { this.navigateToScreen(item.screen) }} key={item.name}>
      <SwCard style={styles.card}>
        <View style={styles.content} >
          <View>
            <SwText swType='header2'>{item.name}</SwText>
            <SwText swType='secondary2'>{item.value}</SwText>
          </View>
          <FontAwesome5 name={item.icon} size={50} style={styles.icon} />
        </View>
      </SwCard>
    </TouchableOpacity>
  );

  render = () => {
    return (
      <ScrollView style={styles.screen}>
        <View style={styles.items} >
          {this.state.items.map(this.renderStatItem)}
        </View>
      </ScrollView>
    );
  }
}

const styles = SwStyleSheet.create(theme => ({
  screen: {
    backgroundColor: theme.colors.screen.scroll,
    paddingHorizontal: 20,
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
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detail: {
    flexDirection: 'row'
  },
  date: {
    flex: 1
  },
  icon: {
    alignSelf: 'center',
    marginLeft: 10,
    color: theme.colors.text.base
  }
}));
