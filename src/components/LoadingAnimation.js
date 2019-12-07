import React, {useState, useEffect} from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default LoadingAnimationComponent = props => {
  const [animationValue, setAnimatedValue] = useState(new Animated.Value(0));
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [Loaded, setLoaded] = useState(false);
  console.log('the props is ', props);

  const triggerAnimation = () => {
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.in(Easing.exp),
    }).start(() => onAnimationCompleted());
  };

  const onAnimationCompleted = () => {
    setAnimationCompleted(true);
    props.onLoadingFinish();
  };

  
  useEffect(() => {
    console.log('the value of the prop is', props.Loaded);

    if (props.Loaded !== Loaded) {
      setLoaded(props.Loaded);
      console.log('we are here');
      triggerAnimation();
    }
  }, [props.Loaded]);

  const renderAnimatedComponent = () => {
    const opacity = animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });
    const transform = [
      {
        scale: animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.5],
        }),
      },
    ];

    return (
      <Animated.View style={[styles.container, {opacity}]}>
        <Animated.Image
          source={props.img}
          style={[styles.image, {transform}]}
        />
      </Animated.View>
    );
  };

  return animationCompleted ? null : renderAnimatedComponent();
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: undefined,
    height: undefined,
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
});
