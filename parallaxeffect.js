import React from 'react';
import { View, Text, Image, Animated } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useValue } from 'react-native-redash';

export default function ParallaxImage({ imageSource, title, description }) {
  const scrollY = useValue(0);

  const imageTranslateY = Animated.multiply(scrollY, -0.3);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <Animated.Image
          source={imageSource}
          style={{
            width: '100%',
            height: 300,
            transform: [{ translateY: imageTranslateY }],
          }}
          resizeMode="cover"
        />
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>
            {title}
          </Text>
          <Text style={{ fontSize: 16 }}>{description}</Text>
        </View>
      </ScrollView>
    </View>
  );
}
