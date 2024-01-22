import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import {
  Input,
  FormControl,
  Pressable,
  Stack,
  WarningOutlineIcon,
  Icon,
} from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'

const CustomText = (props) => {
  const {
    placeholder,
    label,
    size,
    variant,
    value,
    isInValid,
    isRequired,
    setText,
    startAdornment,
    endAdornment,
    type,
    backgroundColor,
  } = props
  const [show, setShow] = useState(false)
  const styles = StyleSheet.create({
    cont: {
      marginBottom: 15,
      backgroundColor: backgroundColor,
      borderRadius: 4,
    },
    input: {
      fontSize: 16,
      fontWeight: '600',
      height: 50,
      padding: 10,
    },
  })
  return (
    <FormControl isInValid w="100%" style={styles.cont}>
      <Stack space={4}>
        {label && <FormControl.Label>{label}</FormControl.Label>}
        <Input
          size={size}
          variant={variant ? variant : 'outline'}
          type={show ? 'text' : type ? type : 'text'}
          isRequired={isRequired}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder={placeholder}
          onChangeText={(text) => setText(text)}
          onEndEditing={() => {}}
          value={value}
          w="100%"
          style={styles.input}
          InputLeftElement={
            startAdornment && (
              <Pressable onPress={() => setShow(!show)}>
                <Icon
                  as={
                    <MaterialIcons
                      name={show ? 'visibility' : 'visibility-off'}
                    />
                  }
                  size={6}
                  ml="4"
                  color="muted.400"
                />
              </Pressable>
            )
          }
          InputRightElement={
            endAdornment && (
              <Pressable onPress={() => setShow(!show)}>
                <Icon
                  as={
                    <MaterialIcons
                      name={show ? 'visibility' : 'visibility-off'}
                    />
                  }
                  size={6}
                  mr="4"
                  color="muted.400"
                />
              </Pressable>
            )
          }
        />
        {isInValid && (
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Try different from previous passwords.
          </FormControl.ErrorMessage>
        )}
      </Stack>
    </FormControl>
  )
}

export default CustomText
