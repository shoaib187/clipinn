import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { wp } from '../../constants/responsiveSize';
import { FONT } from '../../constants/font';

export default function TabHeader({ navigation, style, textStyle }) {
  return (
    <View style={[styles.headerContainer, style]}>
      <View style={styles.headerContent}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1678286742832-26543bb49959?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHVzZXJ8ZW58MHx8MHx8fDA%3D',
          }}
          style={styles.profileImage}
        />
        <View>
          <Text style={[styles.userName, textStyle]}>John Doe</Text>
          <Text style={styles.userRole}>{'Front End Developer'}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
        ></TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.bellIcon}>
        <Ionicons name="notifications-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 9999,
    paddingHorizontal: 14,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  userName: {
    fontSize: wp(4.5),
    color: '#fff',
    fontFamily: FONT.PoppinsSemiBold,
    marginBottom: -6,
  },
  userRole: {
    color: '#ddd',
    fontSize: wp(3.5),
    fontFamily: FONT.PoppinsRegular,
    marginBottom: -4,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 25,
  },
  bellIcon: {
    width: wp(10),
    height: wp(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
