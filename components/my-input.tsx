import React from 'react';
import { KeyboardTypeOptions, StyleSheet } from 'react-native';
import { FloatingLabelInput } from 'react-native-floating-label-input';

interface IMyInputProp {
  value: string;
  label?: string;
  isPassword?: boolean;
  keyboardType?: KeyboardTypeOptions;
  onChange: (value: string) => void;
}

export const MyInput: React.FC<IMyInputProp> = ({
  value,
  label,
  isPassword = false,
  keyboardType = 'default',
  onChange,
}) => {
  const [isFocus, setIsFocus] = React.useState(false);

  return (
    <FloatingLabelInput
      customLabelStyles={{
        fontSizeBlurred: 16,
        fontSizeFocused: 14,
        topFocused: -20,
      }}
      isFocused={isFocus}
      label={label || ''}
      animationDuration={100}
      labelStyles={styles.label}
      inputStyles={styles.input}
      containerStyles={!isFocus ? styles.container : styles.containerFocus}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChangeText={onChange}
      value={value}
      isPassword={isPassword}
      keyboardType={keyboardType}
      darkTheme
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F3F3',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    border: 'none',
    height: 60,
    borderWidth: 2,
    borderColor: 'transparent',
  },

  containerFocus: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    border: 'none',
    height: 60,
    borderWidth: 2,
    borderColor: '#0261FE',
  },

  label: {
    paddingHorizontal: 5,
  },

  labelFocus: {
    marginLeft: 5,
    backgroundColor: '#fff',
  },

  input: {
    fontSize: 18,
    paddingHorizontal: 10,
    borderRadius: 8,
  },

  inputFocus: {
    fontSize: 18,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#0261FE',
  },
});
