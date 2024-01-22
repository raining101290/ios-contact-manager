import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native'
import React from 'react'
const { width } = Dimensions.get('window')

const ListScreen = () => {
  const imageMap = {
    '1.jpg': require('../assets/photos/1.jpg'),
    '2.jpg': require('../assets/photos/2.jpg'),
    '3.jpg': require('../assets/photos/3.jpg'),
    '4.jpg': require('../assets/photos/4.jpg'),
    '5.jpg': require('../assets/photos/5.jpg'),
    // Add more images as needed
  }
  const data = [
    {
      id: 1,
      title: 'Title of the item',
      photo: '1.jpg',
    },
    {
      id: 2,
      title: 'Title of the item',
      photo: '2.jpg',
    },
    {
      id: 3,
      title: 'Title of the item',
      photo: '3.jpg',
    },
    {
      id: 4,
      title: 'Title of the item',
      photo: '4.jpg',
    },
    {
      id: 5,
      title: 'Title of the item',
      photo: '5.jpg',
    },
  ]
  const ThumbCard = ({ title, photo }) => (
    <View style={styles.item}>
      <Image style={styles.image} source={imageMap[photo]} />
      <Text style={styles.title}>{title}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ThumbCard title={item.title} photo={item.photo} key={item.id} />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={true}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  item: { flex: 1, marginBottom: 20 },
  image: { aspectRatio: 16 / 9, width: '80%' },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
})
export default ListScreen
