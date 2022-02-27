import { StyleSheet, Platform } from 'react-native';

const CommonStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
});

const appTheme = { CommonStyles };

export default appTheme;
