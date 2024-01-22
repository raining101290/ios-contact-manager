import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from 'native-base'
import { Button } from 'native-base'

const CustomButton = ({
  onPress,
  variant,
  colorScheme,
  text,
  isDisabled,
  cssClass,
}) => {
  const { theme } = useTheme()

  const styles = StyleSheet.create({
    btnCont: {
      backgroundColor: theme.brand.primary.main,
      alignItems: 'center',
      padding: 10,
      borderRadius: 4,
    },
  })
  //variant: solid, subtle, outline, link, ghost, unstyled
  //colorScheme: primary, secondary, disabled
  return (
    <Button
      size="lg"
      colorScheme={colorScheme}
      variant={variant}
      onPress={onPress}
      isDisabled={isDisabled}
      style={cssClass}
    >
      {text}
    </Button>
  )
}

export default CustomButton
