import React from 'react';
import AttendanceMainPage from '../attendanceMainPage/attendanceMainPage';
import { SafeAreaView } from 'react-native';

export default function AttendanceHomePage() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <AttendanceMainPage />
    </SafeAreaView>
  );
}
