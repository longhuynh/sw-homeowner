import {
  StatusBar,
  StyleSheet,
} from 'react-native';
import { SwTheme } from 'sw-react-native-ui';
import { SwHomeOwnerTheme } from './Theme';
import { AvatarTypes } from '../components/avatar/types';
import { GradientButtonTypes } from '../components/gradient-button/types';
import { SwitchTypes } from '../components/switch/types';
import { SocialBarTypes } from '../components/social-bar/types';
import { scale, scaleVertical } from '../utils/scale';

export const bootstrap = () => {
  SwTheme.setTheme(SwHomeOwnerTheme, null);

  /*
   SwText types
   */

  SwTheme.setType('SwText', 'basic', {
    fontFamily: theme => theme.fonts.family.bold,
    backgroundColor: 'transparent',
  });

  SwTheme.setType('SwText', 'regular', {
    fontFamily: theme => theme.fonts.family.regular,
  });

  SwTheme.setType('SwText', 'light', {
    fontFamily: theme => theme.fonts.family.light,
  });

  SwTheme.setType('SwText', 'logo', {
    fontFamily: theme => theme.fonts.family.logo,
  });

  SwTheme.setType('SwText', 'moon', {
    fontFamily: 'Icomoon',
  });

  SwTheme.setType('SwText', 'awesome', {
    fontFamily: 'FontAwesome',
  });

  SwTheme.setType('SwText', 'hero', {
    fontSize: scale(33),
  });

  SwTheme.setType('SwText', 'menuIcon', {
    fontSize: 44,
  });

  // all font sizes
  Object.keys(SwTheme.current.fonts.sizes).forEach(key => {
    SwTheme.setType('SwText', key, {
      fontSize: theme => theme.fonts.sizes[key],
    });
  });

  // all text colors
  Object.keys(SwTheme.current.colors.text).forEach(key => {
    SwTheme.setType('SwText', `${key}Color`, {
      color: theme => theme.colors.text[key],
    });
  });

  // all text line heights
  Object.keys(SwTheme.current.fonts.lineHeights).forEach(key => {
    SwTheme.setType('SwText', `${key}Line`, {
      text: { lineHeight: theme => theme.fonts.lineHeights[key] },
    });
  });

  // theme text styles
  SwTheme.setType('SwText', 'header1', {
    fontSize: theme => theme.fonts.sizes.h1,
    fontFamily: theme => theme.fonts.family.bold,
  });
  SwTheme.setType('SwText', 'header2', {
    fontSize: theme => theme.fonts.sizes.h2,
    fontFamily: theme => theme.fonts.family.bold,
  });
  SwTheme.setType('SwText', 'header3', {
    fontSize: theme => theme.fonts.sizes.h3,
    fontFamily: theme => theme.fonts.family.bold,
  });
  SwTheme.setType('SwText', 'header4', {
    fontSize: theme => theme.fonts.sizes.h4,
    fontFamily: theme => theme.fonts.family.bold,
  });
  SwTheme.setType('SwText', 'header5', {
    fontSize: theme => theme.fonts.sizes.h5,
    fontFamily: theme => theme.fonts.family.bold,
  });
  SwTheme.setType('SwText', 'header6', {
    fontSize: theme => theme.fonts.sizes.h6,
    fontFamily: theme => theme.fonts.family.bold,
  });
  SwTheme.setType('SwText', 'secondary1', {
    fontSize: theme => theme.fonts.sizes.s1,
    fontFamily: theme => theme.fonts.family.light,
  });
  SwTheme.setType('SwText', 'secondary2', {
    fontSize: theme => theme.fonts.sizes.s2,
    fontFamily: theme => theme.fonts.family.light,
  });
  SwTheme.setType('SwText', 'secondary3', {
    fontSize: theme => theme.fonts.sizes.s3,
    fontFamily: theme => theme.fonts.family.regular,
  });
  SwTheme.setType('SwText', 'secondary4', {
    fontSize: theme => theme.fonts.sizes.s4,
    fontFamily: theme => theme.fonts.family.regular,
  });
  SwTheme.setType('SwText', 'secondary5', {
    fontSize: theme => theme.fonts.sizes.s5,
    fontFamily: theme => theme.fonts.family.light,
  });
  SwTheme.setType('SwText', 'secondary6', {
    fontSize: theme => theme.fonts.sizes.s6,
    fontFamily: theme => theme.fonts.family.light,
  });
  SwTheme.setType('SwText', 'secondary7', {
    fontSize: theme => theme.fonts.sizes.s7,
    fontFamily: theme => theme.fonts.family.regular,
  });
  SwTheme.setType('SwText', 'primary1', {
    fontSize: theme => theme.fonts.sizes.p1,
    fontFamily: theme => theme.fonts.family.light,
  });
  SwTheme.setType('SwText', 'primary2', {
    fontSize: theme => theme.fonts.sizes.p2,
    fontFamily: theme => theme.fonts.family.regular,
  });
  SwTheme.setType('SwText', 'primary3', {
    fontSize: theme => theme.fonts.sizes.p3,
    fontFamily: theme => theme.fonts.family.light,
  });
  SwTheme.setType('SwText', 'primary4', {
    fontSize: theme => theme.fonts.sizes.p4,
    fontFamily: theme => theme.fonts.family.regular,
  });

  SwTheme.setType('SwText', 'center', {
    text: {
      textAlign: 'center',
    },
  });

  SwTheme.setType('SwText', 'chat', {
    color: theme => theme.colors.chat.text,
  });
  /*
   SwButton types
   */

  SwTheme.setType('SwButton', 'basic', {
    container: {
      alignSelf: 'auto',
    },
  });

  SwTheme.setType('SwButton', 'square', {
    borderRadius: 3,
    backgroundColor: theme => theme.colors.button.back,
    container: {
      flexDirection: 'column',
      margin: 8,
    },
  });

  SwTheme.setType('SwButton', 'tile', {
    borderRadius: 0,
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderColor: theme => theme.colors.border.base,
    container: {
      flexDirection: 'column',
    },
  });

  SwTheme.setType('SwButton', 'link', {
    color: theme => theme.colors.primary,
  });

  SwTheme.setType('SwButton', 'contrast', {
    color: theme => theme.colors.text.base,
  });

  SwTheme.setType('SwButton', 'icon', {
    height: scale(56),
    width: scale(56),
    borderColor: theme => theme.colors.border.base,
    backgroundColor: theme => theme.colors.control.background,
    borderWidth: 1,
  });

  SwTheme.setType('SwButton', 'highlight', {
    backgroundColor: theme => theme.colors.button.highlight,
  });

  SwTheme.setType('SwButton', 'social', {
    height: scale(62),
    width: scale(62),
    borderRadius: scale(31),
    borderColor: theme => theme.colors.border.accent,
    borderWidth: 1,
    backgroundColor: theme => theme.colors.control.background,
  });
  /*
   SwModalImg types
   */

  SwTheme.setType('SwModalImg', 'basic', {
    img: {
      margin: 1.5,
    },
    modal: {
      backgroundColor: theme => theme.colors.screen.base,
    },
    footer: {
      backgroundColor: theme => theme.colors.screen.base,
      height: 50,
    },
    header: {
      backgroundColor: theme => theme.colors.screen.base,
      paddingBottom: 6,
    },
  });

  /*
   SwTextInput
   */

  SwTheme.setType('SwTextInput', 'basic', {
    input: {
      fontFamily: theme => theme.fonts.family.bold,
    },
    color: theme => theme.colors.text.base,
    backgroundColor: theme => theme.colors.control.background,
    labelColor: theme => theme.colors.input.label,
    placeholderTextColor: theme => theme.colors.input.placeholder,
  });

  SwTheme.setType('SwTextInput', 'rounded', {
    fontSize: theme => theme.fonts.sizes.h6,
    borderWidth: 1,
    underlineWidth: 1,
    placeholderTextColor: theme => theme.colors.input.text,
    input: {
      marginVertical: {
        ios: scaleVertical(15),
        android: scaleVertical(4),
      },
    },
  });


  SwTheme.setType('SwTextInput', 'right', {
    input: {
      textAlign: 'right',
      marginTop: {
        ios: scaleVertical(18),
        android: scaleVertical(11),
      },
    },
    label: {
      fontFamily: theme => theme.fonts.family.light,
    },
    container: {
      marginVertical: 4,
    },
    backgroundColor: 'transparent',
    labelFontSize: theme => theme.fonts.sizes.small,
  });

  SwTheme.setType('SwTextInput', 'row', {
    input: {
      marginVertical: 0,
      marginHorizontal: 0,
      marginTop: 0,
      paddingTop: {
        ios: 2,
        android: 0,
      },
      paddingBottom: 0,
      textAlignVertical: 'center',
      includeFontPadding: false,
      fontFamily: theme => theme.fonts.family.light,
      fontSize: theme => theme.fonts.sizes.small,
    },
    container: {
      flex: 1,
      backgroundColor: theme => theme.colors.input.background,
      marginVertical: 0,
      borderRadius: 20,
      paddingHorizontal: 16,
    },

  });

  SwTheme.setType('SwTextInput', 'iconRight', {
    label: {
      position: 'absolute',
      right: 0,
    },
    input: {
      marginRight: scale(46),
    },
  });

  SwTheme.setType('SwTextInput', 'sticker', {
    input: {
      marginHorizontal: 14,
    },
    container: {
      justifyContent: 'center',
      paddingHorizontal: 0,
    },
    label: {
      position: 'absolute',
      right: 0,
    },
  });

  /*
   SwCard types
   */

  SwTheme.setType('SwCard', 'basic', {
    container: {
      borderRadius: 3,
      backgroundColor: theme => theme.colors.control.background,
    },
    header: {
      justifyContent: 'flex-start',
      paddingVertical: 14,
    },
    content: {
      padding: 16,
    },
    footer: {
      paddingBottom: 20,
      paddingTop: 7.5,
      paddingHorizontal: 0,
    },
  });

  SwTheme.setType('SwCard', 'backImg', {
    container: {
      borderWidth: 0,
      borderRadius: 0,
    },
    img: {
      height: 225,
    },
    imgOverlay: {
      height: 225,
      backgroundColor: 'transparent',
    },
    content: {
      paddingHorizontal: 14,
    },
    footer: {
      paddingTop: 15,
      paddingBottom: 0,
      paddingVertical: 7.5,
      paddingHorizontal: 0,
    },
  });


  SwTheme.setType('SwCard', 'imgBlock', {
    img: {
      height: 235,
    },
    header: {
      padding: 0,
      paddingVertical: 13,
      paddingHorizontal: 16,
    },
    imgOverlay: {
      height: -1,
    },
    footer: {
      paddingTop: 18,
      paddingBottom: 15,
      paddingVertical: 0,
      paddingHorizontal: 0,
    },
  });

  SwTheme.setType('SwCard', 'horizontal', {
    container: {
      flexDirection: 'row',
      height: 110,
    },
    content: {
      flex: 1,
    },
    img: {
      height: null,
      flex: -1,
      width: 120,
    },
  });

  SwTheme.setType('SwCard', 'blog', {
    header: {
      paddingHorizontal: 16,
      paddingVertical: 0,
      paddingTop: 16,
    },
    content: {
      padding: 0,
      paddingVertical: 0,
      paddingTop: 12,
    },
    footer: {
      paddingHorizontal: 16,
      paddingTop: 15,
      paddingBottom: 16,
      alignItems: 'center',
    },
  });

  SwTheme.setType('SwCard', 'article', {
    container: {
      borderWidth: 0,
      backgroundColor: 'transparent',
    },
    header: {
      paddingVertical: 0,
      paddingTop: 20,
      paddingBottom: 16,
      justifyContent: 'space-between',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: theme => theme.colors.border.base,
    },
    content: {
      padding: 16,
      borderBottomWidth: 1,
      borderColor: theme => theme.colors.border.base,
    },
    footer: {
      paddingHorizontal: 14,
      paddingTop: 15,
      paddingBottom: 16,
      alignItems: 'center',
    },
  });

  SwTheme.setType('SwCard', 'credit', {
    container: {
      borderWidth: 0,
      borderRadius: 7,
    },
    header: {
      justifyContent: 'space-between',
      paddingHorizontal: 14,
      alignItems: 'center',
      paddingBottom: scaleVertical(46),
    },
    content: {
      alignItems: 'center',
      paddingVertical: 0,
    },
    footer: {
      paddingBottom: scaleVertical(14),
      paddingTop: scaleVertical(16),
      paddingHorizontal: 14,
      alignItems: 'flex-end',
    },
  });

  SwTheme.setType('SwPicker', 'highlight', {
    highlightBorderTopColor: theme => theme.colors.border.highlight,
    highlightBorderBottomColor: theme => theme.colors.border.highlight,
    windowBorderColor: theme => theme.colors.border.highlight,
  });

  /*
   Register components
   */

  SwTheme.registerComponent('Avatar', AvatarTypes);
  SwTheme.registerComponent('GradientButton', GradientButtonTypes);
  SwTheme.registerComponent('SwSwitch', SwitchTypes);
  SwTheme.registerComponent('SocialBar', SocialBarTypes);

  StatusBar.setBarStyle('dark-content', true);
};
