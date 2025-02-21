import React, { useRef, useEffect } from "react";
import { View, Animated, Easing, StyleSheet } from "react-native";

const PremiumSkeleton = () => {
  const shimmerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnimation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const shimmerInterpolation = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["#e0e0e0", "#f5f5f5"],
  });

  return (
    <View style={styles.cardSkeleton}>
      <Animated.View
        style={[styles.skeletonText, { backgroundColor: shimmerInterpolation }]}
      />
      <Animated.View
        style={[styles.skeletonText, { backgroundColor: shimmerInterpolation }]}
      />
      <Animated.View
        style={[styles.skeletonText, { backgroundColor: shimmerInterpolation }]}
      />
      <Animated.View
        style={[
          styles.skeletonButton,
          { backgroundColor: shimmerInterpolation },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardSkeleton: {
    backgroundColor: "#ddd",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    width: 290,
    height: 380,
    marginBottom: 15,
  },
  skeletonText: {
    width: "80%",
    height: 20,
    borderRadius: 4,
    marginBottom: 10,
  },
  skeletonButton: {
    width: "50%",
    height: 30,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default PremiumSkeleton;
