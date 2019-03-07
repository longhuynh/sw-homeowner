
import React from 'react';
import { View, WebView} from 'react-native';
import { SwStyleSheet} from 'sw-react-native-ui';
import PDFReader from 'rn-pdf-reader-js';
import { Constants } from 'expo';
 
export class DocumentViewer extends React.Component {
  static navigationOptions = {
    title: 'Document Viewer'.toUpperCase(),
  };

  constructor(props) {
    super(props);
    const workOrderId = this.props.navigation.getParam('id', 1);

    this.state = {localFile: ''};
  }

  

  render = () => (
    <View style={styles.container}>
    {/* <PDFReader
          source={{ uri: "http://gahp.net/wp-content/uploads/2017/09/sample.pdf" }}
        /> */}
    <WebView
        source={{uri: 'https://www.ctvnews.ca/polopoly_fs/1.4037876!/httpImage/image.jpg_gen/derivatives/landscape_1020/image.jpg'}}
        style={{marginTop: 20}}
      />
  </View>
  )
}

const styles = SwStyleSheet.create(theme => ({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
}));
