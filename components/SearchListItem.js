import { StyleSheet, Text, Image, View } from 'react-native'
import React from 'react'

const SearchListItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.Image} source={{ uri: item.image_url }} />
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.subTitle}>
        {item.name}
      </Text>
      <Text style={styles.review}>
        {item.rating} Stars, {item.review_count} Reviews
      </Text>
    </View>
  )
}

export default SearchListItem

const styles = StyleSheet.create({
  container: { width: 250, marginRight: 20, marginBottom: 20 },
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
