import React, { useState, useContext } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { setUser } = useContext(AuthContext);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const tempId = 'hello';
  const tempPassword = 'bob';

  const handleLogin = () => {
    if (id.toLowerCase() === tempId && password === tempPassword) {
      setUser({ id: tempId, name: 'Mr. Garner', email: tempId, avatar: 'https://asset-cdn.schoology.com/system/files/imagecache/profile_reg/pictures/picture-0df87436fe3b2eeed3a7f9c463821113_67867e4992ad5.jpg?1736867401' });
      Alert.alert('Logged in', 'Welcome, Mr. Garner');
      navigation.replace('Main');
    } else {
      Alert.alert('Login failed', `Invalid id or password. Try id: ${tempId} / password: ${tempPassword}`);
    }
  };

  return (
    <View style={[styles.container, { justifyContent: 'center' }] }>
      <View style={{ backgroundColor: '#fff', padding: 18, borderRadius: 8 }}>
        <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 8 }}>Sign in</Text>
        <TextInput placeholder="id" value={id} onChangeText={setId} style={{ borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 6, padding: 8, marginBottom: 8 }} />
        <TextInput placeholder="password" value={password} secureTextEntry onChangeText={setPassword} style={{ borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 6, padding: 8, marginBottom: 12 }} />
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <TouchableOpacity onPress={() => navigation.replace('Main')} style={{ marginRight: 12 }}>
            <Text style={{ color: '#666' }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogin} style={{ backgroundColor: '#f16513ff', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6 }}>
            <Text style={{ color: '#fff', fontWeight: '700' }}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
