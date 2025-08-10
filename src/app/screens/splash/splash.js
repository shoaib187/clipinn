import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { AppNavigator } from '../../navigators/appNavigator/appNavigator';
import { wp } from '../../../components/constants/responsiveSize';
// import { COLORS } from '../../../components/constants/colors';
const LOGO_WIDTH = wp(40);
export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    const init = async () => {
      // Scale in
      await new Promise(res => {
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start(() => res());
      });

      // Small pause
      await new Promise(res => setTimeout(res, 2000));

      // Fade + scale out
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1.5,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        RNBootSplash.hide({ fade: true });
        setShowSplash(false); // <-- remove splash from view hierarchy
      });
    };

    init();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <StatusBar
        translucent={true}
        backgroundColor={COLORS.white}
        animated
        barStyle={'dark-content'}
        showHideTransition={'fade'}
      /> */}
      <AppNavigator />
      {/* splash screen */}
      {showSplash && (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            styles.splashContainer,
            {
              opacity: fadeAnim,
              // transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Animated.Image
            source={require('../../../../assets/png/simple.png')}
            style={[styles.logo, { transform: [{ scale: scaleAnim }] }]}
          />
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: LOGO_WIDTH,
    height: LOGO_WIDTH,
    resizeMode: 'contain',
  },
});
