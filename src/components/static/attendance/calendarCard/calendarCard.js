import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';

export default function CalendarCard() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  // Sample attendance data
  const attendanceData = {
    '2025-07-01': {
      status: 'present',
      timeIn: '09:05 AM',
      timeOut: '06:15 PM',
    },
    '2025-07-02': {
      status: 'present',
      timeIn: '09:10 AM',
      timeOut: '06:20 PM',
    },
    '2025-07-03': { status: 'absent' },
    '2025-07-04': { status: 'weekend' },
    '2025-07-05': { status: 'weekend' },
    '2025-07-06': {
      status: 'present',
      timeIn: '09:00 AM',
      timeOut: '06:10 PM',
    },
    '2025-07-07': { status: 'late', timeIn: '10:30 AM', timeOut: '06:45 PM' },
    '2025-07-08': {
      status: 'present',
      timeIn: '09:15 AM',
      timeOut: '06:20 PM',
    },
    '2025-07-09': {
      status: 'half-day',
      timeIn: '09:00 AM',
      timeOut: '01:30 PM',
    },
    '2025-07-10': {
      status: 'present',
      timeIn: '08:55 AM',
      timeOut: '06:05 PM',
    },
  };

  // Generate marked dates for calendar
  const markedDates = {};
  Object.keys(attendanceData).forEach(date => {
    let dotColor = '';
    switch (attendanceData[date].status) {
      case 'present':
        dotColor = '#4CAF50';
        break;
      case 'absent':
        dotColor = '#F44336';
        break;
      case 'late':
        dotColor = '#FF9800';
        break;
      case 'half-day':
        dotColor = '#2196F3';
        break;
      case 'weekend':
        dotColor = '#9E9E9E';
        break;
    }
    markedDates[date] = {
      marked: true,
      dotColor,
      selected: date === selectedDate,
    };
  });
  markedDates[selectedDate] = { ...markedDates[selectedDate], selected: true };

  // Filter attendance for the selected month
  const monthlyAttendance = Object.entries(attendanceData)
    .filter(([date]) => {
      const [y, m] = date.split('-');
      return parseInt(m) === month && parseInt(y) === year;
    })
    .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA));

  const renderAttendanceItem = ({ item }) => {
    const [date, data] = item;
    const day = new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
    });

    return (
      <View style={styles.attendanceItem}>
        <View style={styles.dateColumn}>
          <Text style={styles.dateText}>{date.split('-')[2]}</Text>
          <Text style={styles.dayText}>{day}</Text>
        </View>

        <View style={styles.statusColumn}>
          <View
            style={[
              styles.statusIndicator,
              {
                backgroundColor:
                  data.status === 'present'
                    ? '#E8F5E9'
                    : data.status === 'absent'
                    ? '#FFEBEE'
                    : data.status === 'late'
                    ? '#FFF3E0'
                    : data.status === 'half-day'
                    ? '#E3F2FD'
                    : '#F5F5F5',
              },
            ]}
          >
            <Text
              style={{
                color:
                  data.status === 'present'
                    ? '#4CAF50'
                    : data.status === 'absent'
                    ? '#F44336'
                    : data.status === 'late'
                    ? '#FF9800'
                    : data.status === 'half-day'
                    ? '#2196F3'
                    : '#9E9E9E',
                textTransform: 'capitalize',
              }}
            >
              {data.status}
            </Text>
          </View>
        </View>

        <View style={styles.timeColumn}>
          {data.timeIn && <Text style={styles.timeText}>{data.timeIn}</Text>}
          {data.timeOut && <Text style={styles.timeText}>{data.timeOut}</Text>}
        </View>

        <View style={styles.hoursColumn}>
          {data.status === 'present' && (
            <Text style={styles.hoursText}>9h 10m</Text>
          )}
          {data.status === 'late' && (
            <Text style={styles.hoursText}>8h 15m</Text>
          )}
          {data.status === 'half-day' && (
            <Text style={styles.hoursText}>4h 30m</Text>
          )}
        </View>
      </View>
    );
  };
  return (
    <View style={styles.calendarContainer}>
      <Calendar
        current={selectedDate}
        onDayPress={day => setSelectedDate(day.dateString)}
        markedDates={markedDates}
        // markingType="multi-dot"
        onMonthChange={date => {
          setMonth(date.month);
          setYear(date.year);
        }}
        theme={{
          selectedDayBackgroundColor: '#3F51B5',
          todayTextColor: '#3F51B5',
          arrowColor: '#3F51B5',
          monthTextColor: '#3F51B5',
          textMonthFontWeight: 'bold',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  calendarContainer: {
    padding: 15,
    backgroundColor: '#fff',
    elevation: 2,
    marginBottom: 10,
  },
  dailyAttendance: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#212121',
  },
  dailyStats: {
    backgroundColor: '#fafafa',
    borderRadius: 10,
    padding: 15,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    marginBottom: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: '#f5f5f5',
  },
  statusText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  timeLabel: {
    marginLeft: 10,
    marginRight: 15,
    color: '#757575',
    width: 70,
  },
  timeValue: {
    fontWeight: '500',
    color: '#212121',
  },
  summaryRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  summaryText: {
    color: '#757575',
    fontStyle: 'italic',
  },
  noDataText: {
    color: '#9E9E9E',
    textAlign: 'center',
    padding: 20,
  },
  monthlyAttendance: {
    flex: 1,
    paddingHorizontal: 15,
  },
  attendanceList: {
    paddingBottom: 20,
  },
  attendanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  dateColumn: {
    width: 50,
    alignItems: 'center',
  },
  dateText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#212121',
  },
  dayText: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
  },
  statusColumn: {
    flex: 1,
    paddingHorizontal: 10,
  },
  statusIndicator: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  timeColumn: {
    width: 100,
  },
  timeText: {
    fontSize: 12,
    color: '#757575',
  },
  hoursColumn: {
    width: 70,
    alignItems: 'flex-end',
  },
  hoursText: {
    fontWeight: '500',
    color: '#212121',
  },
});
