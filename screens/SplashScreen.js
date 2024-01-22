import React, { useEffect } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const SplashScreen = () => {
  const navigation = useNavigation()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home') //Replace 'Main' with your main screen name
    }, 3000) // 3000 milliseconds = 3 seconds

    return () => clearTimeout(timer)
  }, [navigation])

  return (
    <View style={styles.container}>
      {/* Your splash screen content */}
      {/* <Image source={require('../assets/foodpanda.webp')} style={styles.logo} /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Adjust the background color as needed
  },
  logo: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    // Add any additional styles for your logo or splash screen content
  },
})
SplashScreen.navigationOptions = {
  headerShown: false,
}
export default SplashScreen
