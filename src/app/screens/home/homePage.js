import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const HomePage = () => {
  const [greeting, setGreeting] = useState('');
  const [activeCategory, setActiveCategory] = useState('Dashboard');
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(100);
  const scaleAnim = new Animated.Value(0.8);

  // Animation effects
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    return () => {
      fadeAnim.setValue(0);
      slideAnim.setValue(100);
      scaleAnim.setValue(0.8);
    };
  }, []);

  const categories = [
    { id: 'dashboard', name: 'Dashboard', icon: 'dashboard' },
    { id: 'attendance', name: 'Attendance', icon: 'fingerprint' },
    { id: 'leave', name: 'Leave', icon: 'beach-access' },
    { id: 'payroll', name: 'Payroll', icon: 'attach-money' },
    { id: 'projects', name: 'Projects', icon: 'work' },
    { id: 'performance', name: 'Performance', icon: 'star-rate' },
    { id: 'meetings', name: 'Meetings', icon: 'meeting-room' },
    { id: 'expenses', name: 'Expenses', icon: 'receipt' },
  ];

  const quickActions = [
    { id: 'punch', title: 'Punch In/Out', icon: 'touch-app', color: '#4CAF50' },
    {
      id: 'leave',
      title: 'Apply Leave',
      icon: 'flight-takeoff',
      color: '#FF9800',
    },
    { id: 'expense', title: 'Add Expense', icon: 'receipt', color: '#9C27B0' },
    {
      id: 'ticket',
      title: 'Raise Ticket',
      icon: 'help-outline',
      color: '#F44336',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'leave',
      title: 'Leave Approved',
      description: 'Your annual leave request has been approved',
      time: '2 hours ago',
      icon: 'check-circle',
      color: '#4CAF50',
    },
    {
      id: 2,
      type: 'payroll',
      title: 'Salary Credited',
      description: 'Salary for June has been credited to your account',
      time: '1 day ago',
      icon: 'account-balance-wallet',
      color: '#2196F3',
    },
    {
      id: 3,
      type: 'meeting',
      title: 'Team Meeting',
      description: 'Scheduled for tomorrow at 11:00 AM',
      time: '3 days ago',
      icon: 'event',
      color: '#FF9800',
    },
  ];

  const renderCategoryItem = item => (
    <TouchableOpacity
      key={item.id}
      onPress={() => setActiveCategory(item.name)}
      style={{
        alignItems: 'center',
        marginHorizontal: 10,
        opacity: activeCategory === item.name ? 1 : 0.6,
      }}
    >
      <Animated.View
        style={{
          transform: [
            {
              scale: activeCategory === item.name ? scaleAnim : 1,
            },
          ],
        }}
      >
        <View
          style={{
            backgroundColor:
              activeCategory === item.name ? '#3F51B5' : '#F5F5F5',
            width: 60,
            height: 60,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 5,
            elevation: 3,
          }}
        >
          <Icon
            name={item.icon}
            size={28}
            color={activeCategory === item.name ? 'white' : '#757575'}
          />
        </View>
      </Animated.View>
      <Text
        style={{
          color: activeCategory === item.name ? '#3F51B5' : '#757575',
          fontSize: 12,
        }}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#f7f9fc', '#e3f2fd']} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Header Section */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <View
            style={{
              padding: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View>
              <Text style={{ color: '#757575', fontSize: 14 }}>{greeting}</Text>
              <Text
                style={{ color: '#212121', fontSize: 22, fontWeight: 'bold' }}
              >
                John Doe
              </Text>
            </View>
            <TouchableOpacity>
              <Image
                source={{
                  uri: 'https://randomuser.me/api/portraits/men/1.jpg',
                }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  borderWidth: 2,
                  borderColor: '#3F51B5',
                }}
              />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Stats Cards */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            paddingHorizontal: 20,
            marginBottom: 20,
          }}
        >
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <LinearGradient
              colors={['#4CAF50', '#8BC34A']}
              style={{
                width: '48%',
                borderRadius: 12,
                padding: 15,
                // elevation: 3,
              }}
            >
              <Text style={{ color: 'white', fontSize: 14 }}>Attendance</Text>
              <Text
                style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}
              >
                95%
              </Text>
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>
                This month
              </Text>
            </LinearGradient>

            <LinearGradient
              colors={['#2196F3', '#64B5F6']}
              style={{
                width: '48%',
                borderRadius: 12,
                padding: 15,
                elevation: 3,
              }}
            >
              <Text style={{ color: 'white', fontSize: 14 }}>
                Leave Balance
              </Text>
              <Text
                style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}
              >
                12
              </Text>
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>
                Days remaining
              </Text>
            </LinearGradient>
          </View>
        </Animated.View>

        {/* Categories */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              paddingHorizontal: 20,
              fontSize: 16,
              fontWeight: 'bold',
              marginBottom: 10,
              color: '#212121',
            }}
          >
            Quick Access
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          >
            {categories.map(renderCategoryItem)}
          </ScrollView>
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            paddingHorizontal: 20,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              marginBottom: 15,
              color: '#212121',
            }}
          >
            Quick Actions
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            {quickActions.map(action => (
              <TouchableOpacity
                key={action.id}
                style={{
                  width: '48%',
                  backgroundColor: 'white',
                  borderRadius: 10,
                  padding: 15,
                  marginBottom: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                  elevation: 2,
                }}
              >
                <View
                  style={{
                    backgroundColor: action.color + '20',
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                  }}
                >
                  <Icon name={action.icon} size={20} color={action.color} />
                </View>
                <Text style={{ color: '#212121', fontWeight: '500' }}>
                  {action.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Recent Activities */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              marginBottom: 15,
              color: '#212121',
            }}
          >
            Recent Activities
          </Text>
          <View
            style={{ backgroundColor: 'white', borderRadius: 12, elevation: 2 }}
          >
            {recentActivities.map(activity => (
              <TouchableOpacity
                key={activity.id}
                style={{
                  padding: 15,
                  borderBottomWidth: 1,
                  borderBottomColor: '#f0f0f0',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    backgroundColor: activity.color + '20',
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                  }}
                >
                  <FontAwesome
                    name={activity.icon}
                    size={18}
                    color={activity.color}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: '#212121', fontWeight: '500' }}>
                    {activity.title}
                  </Text>
                  <Text style={{ color: '#757575', fontSize: 12 }}>
                    {activity.description}
                  </Text>
                </View>
                <Text style={{ color: '#9E9E9E', fontSize: 10 }}>
                  {activity.time}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={{ padding: 15, alignItems: 'center' }}>
              <Text style={{ color: '#3F51B5', fontWeight: '500' }}>
                View All Activities
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Upcoming Events */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            paddingHorizontal: 20,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              marginBottom: 15,
              color: '#212121',
            }}
          >
            Upcoming Events
          </Text>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 12,
              padding: 15,
              elevation: 2,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                backgroundColor: '#FF5722',
                width: 50,
                height: 50,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 15,
              }}
            >
              <Text
                style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}
              >
                15
              </Text>
              <Text style={{ color: 'white', fontSize: 10 }}>JUL</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#212121', fontWeight: '500' }}>
                Quarterly Review Meeting
              </Text>
              <Text style={{ color: '#757575', fontSize: 12 }}>
                10:00 AM - Conference Room
              </Text>
            </View>
            <Icon name="chevron-right" size={20} color="#9E9E9E" />
          </View>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
};

export default HomePage;
