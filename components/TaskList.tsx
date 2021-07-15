import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {TaskState} from '../redux/taskReducer';
import {Task} from './CardUI';

export const TaskList = () => {
  const tasks = useSelector<TaskState, TaskState['tasks']>(
    state => state.tasks,
  );

  return (
    <View style={styles.container}>
      <FlatList data={tasks} renderItem={({item}) => <Task {...item} />} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});