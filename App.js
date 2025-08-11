import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { AppNavigator } from './src/app/navigators/appNavigator/appNavigator';
import Splash from './src/app/screens/splash/splash';

export default function App() {
  const device = useCameraDevice('front');
  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      console.log('Camera permission:', status);
    })();
  }, []);

  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Splash onFinish={() => setLoading(false)} />;
  }

  return (
    // <View style={{ flex: 1 }}>
    //   {device ? (
    //     <Camera
    //       style={StyleSheet.absoluteFill}
    //       device={device}
    //       isActive={true}
    //     />
    //   ) : (
    //     <Text>No camera device</Text>
    //   )}
    // </View>
    <AppNavigator />
  );
}

// https://www.pinterest.com/pin/19773685858814484/
