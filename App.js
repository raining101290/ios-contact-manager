import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AccessContextProvider from './context/AccessContext'
import HomeScreen from './screens/HomeScreen'
import ColorScreen from './screens/ColorScreen'
import { extendTheme, NativeBaseProvider } from 'native-base'
import { colorTheme } from './theme/index'
import { createDrawerNavigator } from '@react-navigation/drawer'

const Stack = createNativeStackNavigator()
const theme = extendTheme({ theme: colorTheme })

const App = () => {
  const Drawer = createDrawerNavigator()
  return (
    <NativeBaseProvider theme={theme}>
      <SafeAreaProvider>
        <AccessContextProvider>
          <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
              <Drawer.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'My Contacts' }}
              />
              <Drawer.Screen
                name="Color"
                component={ColorScreen}
                options={{ title: 'Deleted Contacts' }}
              />
              {/* Add other screens to the Drawer.Navigator */}
            </Drawer.Navigator>
            {/* <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Contacts++' }}
              />
            </Stack.Navigator> */}
          </NavigationContainer>
        </AccessContextProvider>
      </SafeAreaProvider>
    </NativeBaseProvider>
  )
}

export default App
