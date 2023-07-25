import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import LottieView from 'lottie-react-native';
import animationData from '../assets/animation/lottie.json';

const SplashScreen = ({ navigation, route}) => {
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const setTabBarVisible = route.params.setTabBarVisible;
  useEffect(() => {
    const loadAnimation = async () => {
      try {
        setAnimationLoaded(true);
      } catch (error) {
        console.error('Error loading animation:', error);
        // Handle the error here if necessary
      }
    };

    loadAnimation();
  }, []);

  const handleAnimationFinish = () => {
    // Animation has finished, navigate to MainScreen
    setTabBarVisible(); // Call the function to set tabBarVisible to false
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      {animationLoaded ? (
        <LottieView
          source={animationData}
          autoPlay
          loop={false}
          style={styles.animation}
          onAnimationFinish={handleAnimationFinish}
        />
      ) : (
        <ActivityIndicator size="large" color="blue" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
