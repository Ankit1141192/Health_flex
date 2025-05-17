import React, { useEffect, useState } from 'react';
import { View,SafeAreaView, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const HistoryScreen = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const stored = await AsyncStorage.getItem('timerHistory');
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  const clearData = async () => {
    try {
      await AsyncStorage.removeItem('timerHistory');
      setHistory([]);
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.duration}>
        <Ionicons name="time-outline" size={16} color="#555" /> Duration: {formatDuration(item.duration)}
      </Text>
      <Text style={styles.timestamp}>
        <Ionicons name="checkmark-done-outline" size={16} color="#4caf50" /> Completed at: {new Date(item.completedAt).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="time-outline" size={25} color="#555" style={styles.icons}/>
          <Text style={styles.title}> Recent</Text>
        </View>
        
        <Pressable onPress={clearData} style={styles.clearButton}>
          <Ionicons name="trash-outline" size={20} color="#d00" />
          <Text style={styles.clearText}> Clear Data</Text>
        </Pressable>
      </View>

      {history.length === 0 ? (
        <Text style={styles.emptyText}>No history yet.</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      )}
    </SafeAreaView>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f6',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft:{
    flexDirection: 'row',
    backgroundColor:"#0003",
    borderRadius:10,
    padding:7,
    gap:2,
  },
  icons:{
    position:"relative",
    top:3,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearText: {
    fontSize: 16,
    color: '#d00',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  duration: {
    fontSize: 15,
    color: '#444',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    marginTop: 40,
    fontSize: 16,
    textAlign: 'center',
    color: '#999',
  },
});
