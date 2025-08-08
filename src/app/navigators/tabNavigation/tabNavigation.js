import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, View } from 'react-native';
import HomePage from '../../screens/home/homePage/homePage';
import AttendanceHomePage from '../../screens/attendance/attendanceHomePage/attendanceHomePage';
import TaskHomePage from '../../screens/tasks/taskHomePage/taskHomePage';
import ChatHomePage from '../../screens/chats/chatHomePage/chatHomePage';
import { COLORS } from '../../../components/constants/colors';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            backgroundColor: '#fff',
            height: 60,
            elevation: 0,
          },
          tabBarLabelPosition: 'beside-icon',
          tabBarLabelStyle: { color: 'red' },
          tabBarIcon: ({ focused }) => {
            let iconName;

            switch (route.name) {
              case 'Home':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'Attendance':
                iconName = focused ? 'calendar' : 'calendar-outline';
                break;
              case 'Tasks':
                iconName = focused
                  ? 'checkmark-circle'
                  : 'checkmark-circle-outline';
                break;
              case 'Chats':
                iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
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
                      top: -16,
                      width: '70%',
                      height: 4,
                      backgroundColor: COLORS.btnColor,
                      borderRadius: 40,
                    }}
                  />
                )}
                <Icon
                  name={iconName}
                  size={24}
                  color={focused ? '#111' : '#999'}
                />
              </>
            );
          },
        })}
      >
        <Tab.Screen name="Home" component={HomePage} />
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
    padding: 10,
    borderRadius: 12,
    width: 30,
    height: 50,
    overflow: 'hidden',
    position: 'absolute',
    top: -20,
  },
});
