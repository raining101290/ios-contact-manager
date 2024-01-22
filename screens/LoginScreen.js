import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'native-base'
import React, { useEffect, useState, useRef } from 'react'
import {
  View,
  ImageBackground,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native'
import { SvgUri } from 'react-native-svg'
import CustomText from '../components/input/CustomText'
import CustomButton from '../components/input/CustomButton'
import loginBackground from '../assets/login_background.png'
import { MotiView } from 'moti'

const LoginScreen = () => {
  const navigation = useNavigation()
  const [userName, setUserName] = useState('')
  const [isInValidUsrname, setIsInValidUsrname] = useState()
  const [password, setPassword] = useState('')
  const { theme } = useTheme()

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        // Here, you can perform any action you want when the keyboard is dismissed
      },
    )

    return () => {
      keyboardDidHideListener.remove()
    }
  }, [])

  const dismissKeyboard = () => {
    Keyboard.dismiss()
  }
  const handleLogin = () => {
    navigation.navigate('Home')
  }

  const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loginContainer: {
      flex: 1,
      width: '80%',
      justifyContent: 'center',
      height: 'auto',
    },
    logo: {
      fill: '#FFFFFF',
      width: 'auto',
      height: '50',
      marginTop: -100,
      marginBottom: 20,
    },
    textWhite: {
      color: '#FFFFFF',
    },
    fontM: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    search: {
      fontSize: 16,
      fontWeight: '600',
      backgroundColor: '#FFFFFF',
      height: 50,
      padding: 10,
      borderRadius: 4,
      marginBottom: 15,
    },
  })

  return (
    <ImageBackground
      source={loginBackground}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.loginContainer}>
          <MotiView
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
            }}
          />
          <SvgUri
            uri={'https://cdn.bongo-solutions.com/icons/bongo_white.svg'}
            style={styles.logo}
          />
          <CustomText
            placeholder="Email"
            setText={setUserName}
            isRequired={true}
            isInValid={isInValidUsrname}
            backgroundColor={theme.brand.white}
          />
          <CustomText
            placeholder="Password"
            type="password"
            setText={setUserName}
            endAdornment={true}
            isRequired={true}
            isInValid={isInValidUsrname}
            backgroundColor={theme.brand.white}
          />
          <CustomButton
            text={'Login'}
            colorScheme={'primary'}
            variant={'solid'}
            onPress={handleLogin}
          />
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  )
}

LoginScreen.navigationOptions = {
  headerShown: false,
}
export default LoginScreen
