import React, { useState } from 'react';
import { StyleSheet,Text,View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Question from './components/Question';

export default function App() {
  // Quiz data with questions, images, options, and correct answers
  const [quizData] = useState([
    {
      id: 1,
      question: 'What number is shown in the image?',
      imageSource: require('./img/number3.jpg'), 
      options: ['1', '2', '3'],
      correctAnswer: '3',
    },
    {
      id: 2,
      question: 'What number is shown in the image?',
      imageSource: require('./img/number12.jpg'), 
      options: ['12', '24', '36'],
      correctAnswer: '12',
    },
    {
      id: 3,
      question: 'What number is shown in the image?',
      imageSource: require('./img/number26.jpg'),
      options: ['20', '26', '25'],
      correctAnswer: '26',
    },
    {
      id: 4,
      question: 'What number is shown in the image?',
      imageSource: require('./img/number35.jpg'),
      options: ['15', '35', '45'],
      correctAnswer: '35',
    },
    {
      id: 5,
      question: 'What number is shown in the image?',
      imageSource: require('./img/number69.jpg'),
      options: ['21', '41', '69'],
      correctAnswer: '69',
    },
  ]);

  // State to track selected answers
  const [answers, setAnswers] = useState({});

  // Handle answer selection
  const handleAnswerChange = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    });
  };

  // Calculate score and show feedback
  const handleSubmit = () => {
    let correctCount = 0;
    
    quizData.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });

    // Dynamic feedback messages
    let feedbackMessage = '';
    const totalQuestions = quizData.length;
    const percentage = (correctCount / totalQuestions) * 100;

    if (percentage === 100) {
      feedbackMessage = 'Perfect! You got all answers correct!';
    } else if (percentage >= 66) {
      feedbackMessage = 'Well done! Great job!';
    } else if (percentage >= 33) {
      feedbackMessage = 'Good effort! Keep practicing!';
    } else {
      feedbackMessage = 'You can do better next time. Keep trying!';
    }

    Alert.alert(
      'Quiz Results',
      `You have ${correctCount} correct answer${correctCount !== 1 ? 's' : ''}!\n\n${feedbackMessage}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* App Header with Title and Icon */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Colour Blind Test</Text>
        </View>
      </View>

      {/* Scrollable Quiz Content */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {quizData.map((question) => (
          <View key={question.id} style={styles.questionWrapper}>
            <Question
              question={question.question}
              imageSource={question.imageSource}
              options={question.options}
              selectedValue={answers[question.id] || ''}
              onValueChange={(value) => handleAnswerChange(question.id, value)}
            />
          </View>
        ))}

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>SUBMIT ANSWERS</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#e0e0e0',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 15,
  },
  questionWrapper: {
    marginBottom: 30,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
