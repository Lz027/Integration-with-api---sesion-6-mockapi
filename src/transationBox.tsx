import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export default function ExpandCollapseSimple() {
  const [expanded, setExpanded] = useState(false);
  const height = useSharedValue(100);

  const onToggle = () => {
    setExpanded((e) => !e);
    height.value = withTiming(!expanded ? 200 : 100, { duration: 300 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  return (
    <View style={styles.container}>
      <Button title="Toggle" onPress={onToggle} />
      <Animated.View style={[styles.box, animatedStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  box: { width: 160, height: 100, backgroundColor: 'skyblue', marginTop: 16, borderRadius: 12 },
});
