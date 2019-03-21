
import React from 'react';
import { View, Image } from 'react-native';
import { SwStyleSheet } from 'sw-react-native-ui';
import PDFReader from 'rn-pdf-reader-js';
import ImageResizeMode from 'react-native/Libraries/Image/ImageResizeMode'

export class DocumentViewer extends React.Component {
  static navigationOptions = {
    title: 'Document Viewer',
  };

  

  constructor(props) {
    super(props);
    const url = this.props.navigation.getParam('url', '');
    const extension = this.props.navigation.getParam('extension', '');

    console.log(url);

    this.state = {
      url: url,
      extension: extension
    };
  }

  render = () => {
    if (this.state.extension == 'pdf')
      return (
        <View style={styles.container}>
          <PDFReader source={{ uri: this.state.url }} />
        </View>
      )

    return (
      <View style={styles.container}>
        <Image 
          source={{ uri: this.state.url, cache:true }} 
          resizeMode={ImageResizeMode.contain} 
          style={styles.content}/>
      </View>
    )
  }
}

const styles = SwStyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.screen.scroll,
  },
  content: { 
    flex: 1,

  }

}));
