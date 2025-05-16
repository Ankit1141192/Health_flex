import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Pressable,
  Text,
  Alert,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const loadData = async () => {
      setName(await AsyncStorage.getItem('name') || '');
      setDuration(await AsyncStorage.getItem('duration') || '');
      setCategory(await AsyncStorage.getItem('category') || '');
    };
    loadData();
  }, []);

  const handleSave = async () => {
    if (!name || !duration || !category) {
      Alert.alert('Missing Info', 'Please fill all fields');
      return;
    }

    await AsyncStorage.setItem('name', name);
    await AsyncStorage.setItem('duration', duration);
    await AsyncStorage.setItem('category', category);
    await AsyncStorage.setItem('isDataSubmitted', 'false');

    Alert.alert('Saved', 'Data updated');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Timer App</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Duration (seconds)" keyboardType="numeric" value={duration} onChangeText={setDuration} style={styles.input} />
      <TextInput placeholder="Category" value={category} onChangeText={setCategory} style={styles.input} />

      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 8,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
  },
  button: {
    backgroundColor: '#28a745',
    marginTop: 12,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  Text:{
    fontSize: 24,
    fontWeight: 'bold',

  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
