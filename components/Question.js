import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Question = ({ question, imageSource, options, selectedValue, onValueChange }) => {
  return (
    <View style={styles.questionContainer}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.questionText}>{question}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={styles.picker}
        >
          <Picker.Item label="Select the correct number" value="" />
          {options.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  questionContainer: {
    marginBottom: 30,
    padding: 15,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 10,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
  },
});

export default Question;

