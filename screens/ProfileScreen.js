import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.profilePhoto}
        source={require('../assets/imran.jpg')}
      />
      <Text style={styles.title}>S R Mohammad Imran</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#1ba1e2',
  },
  profilePhoto: {
    width: 200,
    height: 200,
    marginBottom: 30,
    borderRadius: 100,
  },
  title: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
})
export default ProfileScreen
