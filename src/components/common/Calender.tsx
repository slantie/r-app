// CalendarModalPicker.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FF, FS } from '../../constants';

const { width: screenWidth } = Dimensions.get('window');

const months = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];
const years = Array.from({ length: 200 }, (_, i) => 1900 + i);

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (date: string) => void;
  initialDate?: string;
  minDate?: string;
  maxDate?: string;
};

const CalendarPicker = ({
  visible,
  onClose,
  onSelect,
  initialDate,
  minDate,
  maxDate,
}: Props) => {
  const ITEM_HEIGHT = 44;
  const VISIBLE_ROWS = 5;
  const PICKER_HEIGHT = ITEM_HEIGHT * VISIBLE_ROWS;
  const CENTER_PADDING = (PICKER_HEIGHT - ITEM_HEIGHT) / 2;

  const [selected, setSelected] = useState(initialDate || '');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [tempMonth, setTempMonth] = useState(new Date().getMonth());
  const [tempYear, setTempYear] = useState(new Date().getFullYear());

  const monthListRef = useRef<FlatList<string>>(null);
  const yearListRef = useRef<FlatList<number>>(null);

  useEffect(() => {
    setTempMonth(currentMonth.getMonth());
    setTempYear(currentMonth.getFullYear());
  }, [currentMonth]);

  useEffect(() => {
    if (!modalVisible) return;
    const timer = setTimeout(() => {
      const monthIndex = tempMonth;
      const yearIndex = years.indexOf(tempYear);

      monthListRef.current?.scrollToOffset({ offset: monthIndex * ITEM_HEIGHT, animated: false });
      if (yearIndex !== -1) {
        yearListRef.current?.scrollToOffset({ offset: yearIndex * ITEM_HEIGHT, animated: false });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [modalVisible, tempMonth, tempYear]);

  const formatMonthYear = (date: Date) =>
    date.toLocaleString('default', { month: 'long', year: 'numeric' });

  const formatLocalDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const getCenteredItemIndex = (scrollOffset: number) =>
    Math.round(scrollOffset / ITEM_HEIGHT);

  const onMonthMomentumEnd = (e: any) => {
    const idx = getCenteredItemIndex(e.nativeEvent.contentOffset.y);
    const clamped = Math.max(0, Math.min(idx, months.length - 1));
    setTempMonth(clamped);
    monthListRef.current?.scrollToOffset({ offset: clamped * ITEM_HEIGHT, animated: true });
  };

  const onYearMomentumEnd = (e: any) => {
    const idx = getCenteredItemIndex(e.nativeEvent.contentOffset.y);
    const clamped = Math.max(0, Math.min(idx, years.length - 1));
    setTempYear(years[clamped]);
    yearListRef.current?.scrollToOffset({ offset: clamped * ITEM_HEIGHT, animated: true });
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose} >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={{ paddingTop: 10, backgroundColor: COLORS.WHITE, borderRadius: 16, height: 360 }}>
            <Calendar
              key={currentMonth.toISOString()}
              dayComponent={modalVisible ? () => null : undefined}
              current={formatLocalDate(currentMonth)}
              onDayPress={day => setSelected(day.dateString)}
              minDate={minDate}
              maxDate={maxDate}
              markedDates={{
                [selected]: { selected: true, selectedColor: COLORS.DARK_BLUE },
              }}
              theme={{ todayTextColor: COLORS.DARK_BLUE, arrowColor: COLORS.DARK_BLUE }}
              hideExtraDays
              hideArrows
              renderHeader={() => (
                <View style={{ flexDirection: 'row', marginBottom: 10, width: screenWidth - 40 }}>
                  <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                    onPress={() => {
                      setTempMonth(currentMonth.getMonth());
                      setTempYear(currentMonth.getFullYear());
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.BLACK, marginRight: 10 }}>
                      {formatMonthYear(currentMonth)}
                    </Text>
                    <Text style={{ fontSize: 30, color: COLORS.DARK_BLUE, transform: [{ rotate: '-90deg' }] }}>
                      ‹
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />

            {modalVisible && (
              <View style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 60 }}>
                <View
                  style={{
                    width: screenWidth - 40,
                    height: PICKER_HEIGHT + 60,
                    borderRadius: 12,
                    backgroundColor: COLORS.WHITE,
                  }}
                >
                  <View style={{ height: PICKER_HEIGHT, overflow: 'hidden' }}>
                    <LinearGradient
                      pointerEvents="none"
                      colors={[COLORS.WHITE, '#ffffff30']}
                      style={{ position: 'absolute', top: 0, left: 0, right: 0, height: CENTER_PADDING + 20, zIndex: 2 }}
                    />
                    <LinearGradient
                      pointerEvents="none"
                      colors={[COLORS.WHITE, '#ffffff30']}
                      start={{ x: 0.5, y: 1 }}
                      end={{ x: 0.5, y: 0 }}
                      style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: CENTER_PADDING + 20, zIndex: 2 }}
                    />
                    <View
                      pointerEvents="none"
                      style={{
                        position: 'absolute',
                        top: CENTER_PADDING,
                        left: 0,
                        right: 0,
                        height: ITEM_HEIGHT,
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        borderColor: COLORS.DARK_BLUE,
                        backgroundColor: 'rgba(0, 123, 255, 0.1)',
                        zIndex: 1,
                      }}
                    />
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                      <FlatList
                        ref={monthListRef}
                        data={months}
                        keyExtractor={(_, i) => 'month' + i}
                        showsVerticalScrollIndicator={false}
                        getItemLayout={(_, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })}
                        snapToInterval={ITEM_HEIGHT}
                        decelerationRate="fast"
                        onMomentumScrollEnd={onMonthMomentumEnd}
                        contentContainerStyle={{ paddingTop: CENTER_PADDING, paddingBottom: CENTER_PADDING }}
                        renderItem={({ item, index }) => (
                          <View style={{ height: ITEM_HEIGHT, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: index === tempMonth ? COLORS.BLACK : '#999' }}>
                              {item}
                            </Text>
                          </View>
                        )}
                      />
                      <FlatList
                        ref={yearListRef}
                        data={years}
                        keyExtractor={(_, i) => 'year' + i}
                        showsVerticalScrollIndicator={false}
                        getItemLayout={(_, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })}
                        snapToInterval={ITEM_HEIGHT}
                        decelerationRate="fast"
                        onMomentumScrollEnd={onYearMomentumEnd}
                        contentContainerStyle={{ paddingTop: CENTER_PADDING, paddingBottom: CENTER_PADDING }}
                        renderItem={({ item }) => (
                          <View style={{ height: ITEM_HEIGHT, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: item === tempYear ? COLORS.BLACK : '#999' }}>
                              {item}
                            </Text>
                          </View>
                        )}
                      />
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderTopWidth: 0.5, borderTopColor: '#ddd' }}>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <Text style={{ fontSize: 16, color: '#FF3B30', fontWeight: '600' }}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        const newDate = new Date(tempYear, tempMonth, 1);
                        setCurrentMonth(newDate);
                        setModalVisible(false);
                      }}
                    >
                      <Text style={{ fontSize: 16, color: COLORS.DARK_BLUE, fontWeight: '600' }}>Done</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </View>
          <TouchableOpacity style={{   padding: 12,alignSelf:'flex-end',bottom:0,marginRight:20,paddingBottom:20}} onPress={() => {
            onSelect(selected);
            onClose();
          }}>
            <Text style={{ fontSize: FS.FS16, color: COLORS.DARK_BLUE, fontFamily:FF[500] }}>Done</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={() => {
              onSelect(selected);
              onClose();
            }}
            style={{ margin: 16, padding: 12, borderRadius: 12, backgroundColor: COLORS.DARK_BLUE }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.WHITE, textAlign: 'center' }}>
              Submit
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    elevation: 5,
    width: screenWidth - 40,
  },
});


export default CalendarPicker;