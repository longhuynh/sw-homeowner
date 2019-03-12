
import React from 'react';
import { View, Image, Dimensions} from 'react-native';
import { SwStyleSheet} from 'sw-react-native-ui';
import PDFReader from 'rn-pdf-reader-js';
import { Constants } from 'expo';

const {width, height} = Dimensions.get('window');
 
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
    <Image 
        source={{uri: 'https://www.noao.edu/outreach/press/pr01/images/horsehead_med_res.jpg'}}
        style={styles.content}

      />
  </View>
  )
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
