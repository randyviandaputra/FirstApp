import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  StatusBar,
  View,
  Dimensions,
  TextInput,
  ScrollView,
  Button
} from 'react-native';
import TodoList from './Todolist';

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  
  state = {
    newTodoItem: '',
    listTodo: ['Work'],
  };

  onChangeInput = (value) => {
      this.setState({
        newTodoItem: value
      })
  }
  onAddTodo = () => {
    if (this.state.newTodoItem) {
      this.setState(prevState => {
        return {
          newTodoItem: '',
          listTodo: [...prevState.listTodo, prevState.newTodoItem]
        }
      })
    }
  }

  onItemDelete = (i) => {
    // alert(i)
    const newArray = this.state.listTodo.filter((item, index) => {
      return i !== index;
    });
    this.setState({
      listTodo: newArray
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar 
          barStyle="light-content"
          backgroundColor='#006699'
        />
        <Text style={styles.appTitle}>Simple Todo App</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={'Add todo ...'}
            value={this.state.newTodoItem}
            onChangeText={this.onChangeInput}
            placeholderTextColor={'#999'}
            returnKeyType={'done'}
            autoCorrect={false}
          />
          <Button
            style={styles.btnTodo}
            color='#006699'
            title="Add Todo"
            onPress={this.onAddTodo}
          />
          <ScrollView contentContainerStyle={styles.listContainer}>
            {
              this.state.listTodo.map((item, i) => (
                <TodoList data={item} key={i} index={i} delete={this.onItemDelete}/>
              ))
            }
          </ScrollView>
        </View>
      </View>
    );
  }
}

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#006699'
  },
  appTitle: {
    color: '#fff',
    fontSize: 36,
    marginTop: 60,
    marginBottom: 30,
    fontWeight: '300'
  },
  card: {
    backgroundColor: '#fff',
    flex: 1,
    width: width - 25,
    padding: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50,50,50)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 5,
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: '#006699',
    fontSize: 20
  },
  listContainer: {
    alignItems: 'center'
  },
  btnTodo: {
    left: 10
  }
});
