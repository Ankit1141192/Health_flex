import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      const storedName = await AsyncStorage.getItem('name');
      const storedDuration = await AsyncStorage.getItem('duration');
      const storedCategory = await AsyncStorage.getItem('category');

      if (storedName) setName(storedName);
      if (storedDuration) {
        setDuration(storedDuration);
        const seconds = parseInt(storedDuration);
        if (!isNaN(seconds)) setTimeLeft(seconds);
      }
      if (storedCategory) setCategory(storedCategory);
    };

    loadData();
    return () => clearInterval(intervalRef.current);
  }, []);

  const saveToHistory = async () => {
    const existing = await AsyncStorage.getItem('timerHistory');
    const history = existing ? JSON.parse(existing) : [];

    const newEntry = {
      name,
      category,
      duration,
      completedAt: new Date().toISOString(),
    };

    await AsyncStorage.setItem('timerHistory', JSON.stringify([newEntry, ...history]));
  };

  const startCountdown = () => {
    if (intervalRef.current !== null || timeLeft <= 0) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          saveToHistory();
          Alert.alert(
            'Great Job!',
            `Well done, ${name}! You completed the ${category} task.`
          );
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const pauseCountdown = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const resetCountdown = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    const seconds = parseInt(duration);
    if (!isNaN(seconds)) setTimeLeft(seconds);
  };

  const handleSubmit = async () => {
    if (!name || !duration || !category) {
      Alert.alert('Missing Info', 'Please fill in all fields.');
      return;
    }

    const seconds = parseInt(duration);
    if (isNaN(seconds)) {
      Alert.alert('Invalid Duration', 'Please enter a number for duration.');
      return;
    }

    await AsyncStorage.setItem('name', name);
    await AsyncStorage.setItem('duration', duration);
    await AsyncStorage.setItem('category', category);

    setTimeLeft(seconds);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsEditMode(false);
  };

  const formatTime = (totalSeconds) => {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <View style={styles.container}>
      {!isEditMode && (
        <Pressable
          style={styles.settingsIcon}
          onPress={() => setIsEditMode(true)}
        >
          <Ionicons name="create-outline" size={28} color="#333" />
        </Pressable>
      )}

      {isEditMode ? (
        <>
          <Text style={styles.text}>StopWatch App</Text>
          <TextInput
            placeholder="Name"
            style={styles.input}
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Duration (in seconds)"
            style={styles.input}
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={duration}
            onChangeText={setDuration}
          />
          <TextInput
            placeholder="Category"
            style={styles.input}
            placeholderTextColor="#888"
            value={category}
            onChangeText={setCategory}
          />
          <Pressable onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.buttonText}>Submit</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={styles.text}>StopWatch App</Text>
          <Text style={styles.timeText}>{formatTime(timeLeft)}</Text>

          <View style={styles.buttonContainer}>
            <Pressable
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
              onPress={startCountdown}
            >
              <Text style={styles.buttonText}>Start</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
              onPress={pauseCountdown}
            >
              <Text style={styles.buttonText}>Pause</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
              onPress={resetCountdown}
            >
              <Text style={styles.buttonText}>Reset</Text>
            </Pressable>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.label}>Name: <Text style={styles.value}>{name}</Text></Text>
            <Text style={styles.label}>Category: <Text style={styles.value}>{category}</Text></Text>
            <Text style={styles.label}>Duration: <Text style={styles.value}>{duration} seconds</Text></Text>
          </View>
        </>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#f0f4f8',
  },
  input: {
    width: '100%',
    height: 48,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    color: '#333',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#28a745',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
    width: 100,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  timeText: {
    fontSize: 48,
    marginVertical: 24,
    fontWeight: 'bold',
    color: '#222',
  },
  dataContainer: {
    alignItems: 'flex-start',
    marginTop:20,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    marginBottom: 4,
  },
  value: {
    fontWeight: '400',
    color: '#666',
  },
  settingsIcon: {
    position: 'absolute',
    top: 330,
    right: 20,
    zIndex: 10,
  },
  text:{
    fontSize: 25,
    color: '#666',
    fontWeight:"bold"
  }
});