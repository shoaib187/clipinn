import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../../components/constants/colors';
import { wp } from '../../../../components/constants/responsiveSize';
import { FONT } from '../../../../components/constants/font';
import CheckInButton from '../../../../components/common/checkInButton/checkInButton';

const { width, height } = Dimensions.get('window');
const ITEM_HEIGHT = height * 0.2;

export default function AttendanceMainPage() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const animatedHeight = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [ITEM_HEIGHT, 69],
    extrapolate: 'clamp',
  });
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <StatusBar
        translucent
        animated
        backgroundColor={COLORS.black}
        barStyle={'light-content'}
        showHideTransition={'fade'}
      />

      <Animated.View
        style={[
          styles.backdrop,
          { position: 'absolute', height: animatedHeight },
        ]}
      />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>Hey Shabiii,</Text>
            <Text style={styles.greeting}>
              Good Morning, Mark your Attendance!
            </Text>
          </View>
          <Image
            source={{
              uri: 'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
            }}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.timeAlign}>
          <Text style={styles.time}>09:00 AM</Text>
          <Text style={styles.date}>Oct 26, 2022 - Wednesday</Text>
          <CheckInButton />
        </View>

        {/* Check In / Check Out */}
        <View style={styles.checkRow}>
          <View style={styles.checkCard}>
            <Ionicons
              name="log-in-outline"
              size={38}
              color="#3AA272"
              style={styles.icon}
            />
            <Text style={styles.checkTime}>09:12</Text>
            <Text style={styles.checkLabel}>Check In</Text>
          </View>

          <View style={styles.checkCard}>
            <Ionicons
              name="log-out-outline"
              size={38}
              color="#E86A5D"
              style={styles.icon}
            />
            <Text style={styles.checkTime}>--:--</Text>
            <Text style={styles.checkLabel}>Check Out</Text>
          </View>

          <View style={styles.checkCard}>
            <Ionicons
              name="time-outline"
              size={38}
              color="#4D7EDC"
              style={styles.icon}
            />
            <Text style={styles.checkTime}>--:--</Text>
            <Text style={styles.checkLabel}>Total Hours</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
  },
  greeting: {
    fontSize: wp(4),
    color: '#777',
  },
  name: {
    fontSize: wp(6),
    marginBottom: -4,
    fontFamily: FONT.PoppinsSemiBold,
    color: '#fff',
  },
  profileImage: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(20),
    borderWidth: 2,
    borderColor: COLORS.slateColor,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  timeAlign: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    // marginTop: 30,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 12,
  },
  time: {
    fontFamily: FONT.PoppinsSemiBold,
    fontSize: wp(10),
    marginBottom: -10,
  },
  date: {
    fontFamily: FONT.PoppinsRegular,
    fontSize: wp(4),
    color: COLORS.paraColor,
    marginBottom: wp(14),
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkCard: {
    flex: 0.3,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  checkTime: {
    fontFamily: FONT.PoppinsMedium,
    marginVertical: 6,
  },
  checkLabel: {
    fontFamily: FONT.PoppinsRegular,
  },
  backdrop: {
    position: 'absolute',
    top: StatusBar.currentHeight || 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.black,
    // zIndex: 1,
    // justifyContent: 'center',
    paddingHorizontal: 14,
  },
});
