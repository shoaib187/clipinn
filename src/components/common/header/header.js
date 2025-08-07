import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BackButton from '../button/backButton';

export default function Header({
  title,
  onPress,
  navigation,
  showIcon = false,
  showClearAll = false,
}) {
  const handleClearAll = () => {
    navigation.navigate('Notifications');
  };

  return (
    <View style={styles.header}>
      {/* Left: Back Button */}
      <View style={styles.sideContainer}>
        <BackButton navigation={navigation} onPress={onPress} />
      </View>

      {/* Center: Title */}
      <View style={styles.centerContainer}>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {title}
        </Text>
      </View>

      {/* Right: Clear All or Icon */}
      <TouchableOpacity style={styles.sideContainer} onPress={handleClearAll}>
        {showClearAll && <Text style={styles.clearAllText}>Mark all as read</Text>}
        {showIcon && <View />}
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: hp('7%'),
    paddingHorizontal: wp('4%'),
    position: 'relative',
  },
  sideContainer: {
    width: wp('20%'), // reserve equal width for both sides
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  centerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
  headerTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#000',
  },
  clearAllText: {
    fontSize: wp('4%'),
    color: '#007bff',
  },
});
