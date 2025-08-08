import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { Image, StyleSheet, View } from 'react-native';
import HomePage from '../../screens/home/homePage/homePage';
import AttendanceHomePage from '../../screens/attendance/attendanceHomePage/attendanceHomePage';
import TaskHomePage from '../../screens/tasks/taskHomePage/taskHomePage';
import ChatHomePage from '../../screens/chats/chatHomePage/chatHomePage';
import { COLORS } from '../../../components/constants/colors';
import { wp } from '../../../components/constants/responsiveSize';
import { FONT } from '../../../components/constants/font';
import Home from '../../screens/home/homeMainPage/home';

const IconImage = ({ icon }) => {
  return <Image source={icon} style={styles.icon} />;
};

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          // tabBarShowLabel: false,
          tabBarStyle: {
            // position: 'absolute',
            backgroundColor: '#fff',
            height: 65,
            elevation: 0,
            paddingTop: 10,
          },
          tabBarLabelStyle: {
            color: COLORS.btnColor,
            fontFamily: FONT.PoppinsMedium,
            marginTop: 2,
          },
          tabBarIcon: ({ focused }) => {
            let iconName;

            switch (route.name) {
              case 'Home':
                iconName = focused
                  ? require('../../../../assets/png/tabIcons/home-active.png')
                  : require('../../../../assets/png/tabIcons/home-inactive.png');
                break;
              case 'Attendance':
                iconName = focused
                  ? require('../../../../assets/png/tabIcons/checklist-active.png')
                  : require('../../../../assets/png/tabIcons/checklist-inactive.png');
                break;
              case 'Tasks':
                iconName = focused
                  ? require('../../../../assets/png/tabIcons/home-active.png')
                  : require('../../../../assets/png/tabIcons/home-inactive.png');
                break;
              case 'Chats':
                iconName = focused
                  ? require('../../../../assets/png/tabIcons/home-active.png')
                  : require('../../../../assets/png/tabIcons/home-inactive.png');
                break;
              default:
                iconName = 'ellipse';
            }

            return (
              <>
                <LinearGradient
                  colors={
                    focused
                      ? [COLORS.bgColor, 'transparent']
                      : ['transparent', 'transparent']
                  }
                  style={styles.iconWrapper}
                />
                {focused && (
                  <View
                    style={{
                      position: 'absolute',
                      top: -15,
                      width: '70%',
                      height: 4,
                      backgroundColor: COLORS.btnColor,
                      borderRadius: 40,
                    }}
                  />
                )}
                <IconImage icon={iconName} />
              </>
            );
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Attendance" component={AttendanceHomePage} />
        <Tab.Screen name="Tasks" component={TaskHomePage} />
        <Tab.Screen name="Chats" component={ChatHomePage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export { TabNavigation };

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 10,
    borderRadius: 12,
    width: 30,
    height: 55,
    overflow: 'hidden',
    position: 'absolute',
    // top: -20,
  },
  icon: {
    width: wp(8),
    height: wp(8),
    resizeMode: 'contain',
  },
});
