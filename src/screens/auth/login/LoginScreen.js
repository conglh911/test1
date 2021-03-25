/* eslint-disable global-require,import/no-unresolved */

import React from 'react';
import { ImageBackground, Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Thumbnail } from 'native-base';

import { moderateScale } from 'eoffice/utils/scaling';
import variables from 'eoffice/native-base-theme/variables/commonColor';
import LoginForm from './LoginForm.container';

const appIconSize = moderateScale(variables.deviceWidth * 0.27, -0.1);

const styles = StyleSheet.create({
  logo: {
    height: '10%',
    width: '50%',
    flexDirection: 'row',
    marginBottom: variables.isIphoneX ? 44 : 10,
  },
  appIcon: {
    width: appIconSize,
    height: appIconSize,
    position: 'absolute',
    left: (variables.deviceWidth - appIconSize) / 2,
    ...Platform.select({
      ios: {
        top: variables.isIphoneX ? appIconSize * 0.25 + 50 : appIconSize * 0.25 + 25,
      },
      android: {
        top: appIconSize * 0.25,
      },
    }),
  },
  viewContainer: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    marginBottom: 0,
    right: 0,
  },
  view: {
    marginTop: appIconSize * 0.78,
    width: variables.deviceWidth,
    height: moderateScale(variables.deviceHeight * 0.7, 0.05),
    ...Platform.select({
      ios: {
        marginTop: variables.isIphoneX ? appIconSize * 0.78 : appIconSize * 0.78 + 25,
      },
      android: {
        marginTop: appIconSize * 0.78,
      },
    }),
  },
  imageBg: { width: '100%', height: '100%' },
});
const LoginScreen = () => (
  <View style={styles.viewContainer}>
    <StatusBar barStyle="dark-content" backgroundColor="white" />
    <View style={styles.view}>
        <LoginForm />
    </View>
  </View>
);

export default LoginScreen;
