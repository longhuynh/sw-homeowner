
import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import { SwStyleSheet } from 'sw-react-native-ui';
import PDFReader from 'rn-pdf-reader-js';
import { Constants } from 'expo';

const { width, height } = Dimensions.get('window');

export class DocumentViewer extends React.Component {
  static navigationOptions = {
    title: 'Document Viewer'.toUpperCase(),
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
        <Image source={{ uri: this.state.url }} style={styles.content} />
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
    width: width,
    height: height
  }

}));
