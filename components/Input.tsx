import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { addTodo } from '../redux/actionCreators';
import { insertTodo } from '../database/operations';
import uuid from 'react-native-uuid';

export const Input = () => {
  // declare a new state variable, which we'll call "todo"
  const [desc, setDesc] = useState('');
  const dispatch = useDispatch();

  const onSubmit = () => {
    if (desc === '') {
      Alert.alert('⚠️ Error adding todo ⚠️', 'Input cannot be empty!');
    } else {
      dispatch(addTodo(desc));
      let _id = uuid.v1()
      const todo = {id: _id, description: desc, isCompleted: false};
      console.log(`ID: ${todo.id} DESC: ${todo.description}`);
      insertTodo(todo);
    }
    setDesc('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={desc}
        onChangeText={updatedTodo => setDesc(updatedTodo)}
        placeholder="eg. Learn React"
      />
      <TouchableOpacity onPress={onSubmit}>
        <View style={styles.button}>
          <Text>➕</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-around',
  },
  input: {
    padding: 15,
    marginLeft: 10,
    width: 320,
    backgroundColor: 'white',
    borderRadius: 15,
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  button: {
    width: 40,
    height: 40,
    marginRight: 15,
    backgroundColor: '#F3B6B6',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
