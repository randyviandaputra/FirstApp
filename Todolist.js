import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';

const { height, width } = Dimensions.get('window');

class TodoList extends Component {
    state = {
        isCompleted: false
    };

    toggleItem = () => {
        this.setState(prevState => {
            return {
                isCompleted: !prevState.isCompleted
            }
        })
    }

  render() {
    const {isCompleted} = this.state;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.toggleItem}>
          <View style={[styles.circle, isCompleted ? styles.completeCircle : styles.incompleteCircle]} />
        </TouchableOpacity>
        <Text 
            style={[styles.text, isCompleted ? styles.strikeText : styles.unstrikeText]} 
            onPress={() => this.props.delete(this.props.index)}
        >
            {this.props.data}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: '#006699',
        // borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontWeight: '500',
        fontSize: 18,
        marginVertical: 20
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        // remove borderColor property from here
        borderWidth: 3,
        marginRight: 20
    },
    completeCircle: {
        borderColor: '#555'
    },
    incompleteCircle: {
        borderColor: '#006699'
    },
    strikeText: {
        color: '#666',
        textDecorationLine: 'line-through'
    },
    unstrikeText: {
        color: "#29323c"
    }
});

export default TodoList;