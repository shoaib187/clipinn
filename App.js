// import { useState } from 'react';
// import Splash from './src/app/screens/splash/splash';
// import { AppNavigator } from './src/app/navigators/appNavigator/appNavigator';
// import AttendanceHistory from './src/app/screens/attendance/attendanceHistory/attendanceHistory';

// export default function App() {
//   // const [loading, setLoading] = useState(true);

//   // if (loading) {
//   //   return <Splash onFinish={() => setLoading(false)} />;
//   // }

//   return <AttendanceHistory />;
// }

import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useFrameProcessor,
} from 'react-native-vision-camera';
import { detectFaces } from 'react-native-vision-camera-face-detector';
import { Worklets } from 'react-native-worklets-core';

export default function App() {
  const device = useCameraDevice('front');

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      console.log('Camera permission:', status);
    })();
  }, []);

  const handleFacesDetection = Worklets.createRunOnJS(result => {
    console.log('detection result', result);
  });

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const result = detectFaces(frame, {
      landmarkMode: 'all',
      classificationMode: 'all',
      performanceMode: 'fast',
    });
    handleFacesDetection(result);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {!!device ? (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          frameProcessor={frameProcessor}
          isActive={true}
        />
      ) : (
        <Text>No Device</Text>
      )}
    </View>
  );
}
