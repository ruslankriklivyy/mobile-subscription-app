import React from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';

interface IButtonProps {
  label?: string;
  icon?: any;
  customStyles?: any;
  labelStyles?: any;
  type?: string;
  onPress?: () => void;
}

const width = Dimensions.get('window').width;

export const Button: React.FC<IButtonProps> = ({
  label,
  icon,
  customStyles = {},
  labelStyles = {},
  onPress,
}) => {
  const transformAnim = React.useRef(new Animated.Value(0)).current;

  const startTransformAnim = () => {
    Animated.timing(transformAnim, {
      useNativeDriver: true,
      toValue: 6,
      duration: 100,
    }).start();
  };

  const endTransformAnim = () => {
    Animated.timing(transformAnim, {
      useNativeDriver: true,
      toValue: 0,
      duration: 100,
    }).start();
  };

  return (
    <Pressable
      onPressIn={startTransformAnim}
      onPressOut={() => {
        endTransformAnim();
        onPress && onPress();
      }}
    >
      <Animated.View
        style={[
          !icon ? styles.btn : styles.btnWithIcon,
          {
            ...customStyles,
            transform: [{ translateY: transformAnim }],
          },
        ]}
      >
        <Text style={{ ...styles.btnLabel, ...labelStyles }}>{label}</Text>
        {icon}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: width - 40,
    alignSelf: 'center',
    paddingVertical: 18,
    backgroundColor: '#0261FE',
    borderRadius: 8,
  },

  btnWithIcon: {
    flexDirection: 'row',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 300,
    borderColor: '#EBEDF1',
  },

  btnLabel: {
    fontWeight: '500',
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
  },
});
