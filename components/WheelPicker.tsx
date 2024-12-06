import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  Easing,
  Animated,
  Modal,
  Pressable,
  Dimensions,
} from 'react-native';
import {Picker} from 'react-native-wheel-pick';

type WheelPickerProps = {
  value: any;
  onChange: (value: any) => void;
  options: {value: any; label: string}[];
  close: () => void;
};

function WheelPicker({
  value,
  onChange,
  options,
  close,
}: WheelPickerProps): JSX.Element {
  const slideFromBottomAnim = useRef(new Animated.Value(0)).current;
  const paddingLeft = 8;
  const paddingRight = 8;
  const windowWidth = Dimensions.get('window').width;
  const width = windowWidth - (paddingLeft + paddingRight);

  const handleClose = () => {
    Animated.timing(slideFromBottomAnim, {
      toValue: 0,
      duration: 100,
      easing: Easing.inOut(Easing.linear),
      useNativeDriver: true,
    }).start(close);
  };

  useEffect(() => {
    Animated.timing(slideFromBottomAnim, {
      toValue: 1,
      duration: 250,
      easing: Easing.out(Easing.circle),
      useNativeDriver: true,
    }).start();
  }, [slideFromBottomAnim]);

  return (
    <Modal visible transparent key="backdrop" animationType="fade">
      <Pressable style={styles.backdrop} onPress={handleClose} />
      <Animated.View
        style={[
          styles.pickerWrapper,
          {
            width,
            transform: [
              {
                translateY: slideFromBottomAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -200],
                }),
              },
            ],
            left: paddingLeft,
          },
        ]}>
        <Picker
          mode="dropdown"
          style={[styles.picker, {width}]}
          itemStyle={styles.itemStyle}
          textColor="white"
          selectedValue={value}
          isShowSelectBackground={false}
          isShowSelectLine={false}
          selectionColor="#FFFFFF00"
          selectBackgroundColor="#FFFFFF00"
          pickerData={options}
          onValueChange={onChange}
        />
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdropBlurModal: {
    backgroundColor: 'transparent',
  },
  backdropBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  pickerWrapper: {
    position: 'absolute',
    left: 0,
    bottom: -200,
    width: '100%',
    marginBottom: 32,
    borderRadius: 13,
    backgroundColor: 'rgb(24, 24, 24)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    paddingBottom: 10,
  },
  picker: {
    backgroundColor: 'transparent',
    height: 200,
    color: 'white',
  },
  itemStyle: {
    fontSize: 23,
    fontWeight: '600',
    color: 'white',
  },
});

export { WheelPicker };
