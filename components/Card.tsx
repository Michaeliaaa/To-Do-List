import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { deleteTodo, editTodo, toggleDone } from '../redux/actionCreators';
import { removeTodo } from '../database/operations';

export type TodoProps = {
  id: number;
  description: string;
  isCompleted: boolean;
};

export const Todo = ({id, description, isCompleted: completed}: TodoProps) => {
  const [editText, setEditText] = useState('Edit');
  const [todoDescription, setTodoDescription] = useState(description);

  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(deleteTodo(id));
  };

  const onToggle = () => {
    dispatch(toggleDone(id));
  };

  const onEdit = () => {
    dispatch(editTodo(id, todoDescription));

  };

  const textInputRef = useRef<TextInput>(null);

  const textDecoration = completed ? 'line-through' : 'none';

  const completedTodo = {
    backgroundColor: completed ? '#BB888B' : '#fff',
    opacity: completed ? 0.5 : 1.0,
  };

  const onFocus = () => {
    textInputRef.current?.focus();
    setEditText('Confirm');
  };

  const onBlur = () => {
    textInputRef.current?.blur();
    setEditText('Edit');
  };

  const isFocused = textInputRef.current?.isFocused();

  return (
    <View style={[styles.container, completedTodo]}>
      <View style={styles.leftItems}>
        <TouchableOpacity style={styles.checkbox} onPress={onToggle}>
          {completed && <Text style={styles.check}>✓ </Text>}
        </TouchableOpacity>
        <TextInput
          ref={textInputRef}
          style={[styles.itemText, {textDecorationLine: textDecoration}]}
          maxLength={100}
          value={todoDescription}
          onChangeText={setTodoDescription}
          onFocus={onFocus}
          onBlur={onBlur}
          onSubmitEditing={() => {
            onBlur();
            onEdit();
          }}
        />
      </View>
      <View style={styles.rightItems}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            if (isFocused) {
              onBlur();
              onEdit();
            } else {
              onFocus();
            }
          }}>
          <Text>{editText}</Text>
        </TouchableOpacity>
        {!isFocused && (
          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Text>Delete</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    opacity: 0.5,
  },
  leftItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  rightItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    right: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 5,
    marginRight: 15,
    padding: 5,
    backgroundColor: '#d3d3d3',
  },
  check: {
    fontSize: 16,
  },
  itemText: {
    maxWidth: '60%',
    minWidth: '60%',
  },
  editButton: {
    borderColor: '#32a852',
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
    marginRight: 15,
  },
  deleteButton: {
    borderColor: '#a83238',
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
    marginRight: 15,
  },
});
