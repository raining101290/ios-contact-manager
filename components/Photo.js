import { StyleSheet, Text, Image, View } from 'react-native'
import React from 'react'

const Photo = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.Image} source={{ uri: item }} />
    </View>
  )
}

export default Photo

const styles = StyleSheet.create({
  container: { marginRight: 20, marginBottom: 20 },
  Image: { width: 250, height: 150, borderRadius: 4 },
  subTitle: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  review: {
    color: '#6b6a6a',
  },
})
