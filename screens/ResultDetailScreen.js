import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { getRestaurant } from '../axios/api'
import SearchListItem from '../components/SearchListItem'
import Photo from '../components/Photo'

const ResultDetailScreen = () => {
  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false)
  const route = useRoute()
  const { id } = route.params

  const callRestaurantDetail = (id) => {
    setLoading(true)
    getRestaurant({ id: id })
      .then((res) => {
        setResult(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
      })
  }

  useEffect(() => {
    callRestaurantDetail(id)
  }, [])

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingCont}>
          <View style={styles.placeholder} />
          <View style={styles.placeholder} />
          <View style={styles.placeholder} />
        </View>
      ) : (
        <>
          <View style={styles.info}>
            <View style={styles.shadowProp}>
              <Image style={styles.Image} source={{ uri: result.image_url }} />
            </View>
            <Text style={styles.title}>{result?.name}</Text>
            <Text style={styles.review}>
              {result.rating} Stars, {result.review_count} Reviews
            </Text>
            <Text>
              Open :
              <Text style={styles.boldText}>
                {result?.is_closed ? 'Closed' : 'Open'}
              </Text>
            </Text>
            <Text>
              Price: <Text style={styles.boldText}>{result.price}</Text>
            </Text>
          </View>
          <View style={styles.photos}>
            <Text style={styles.subtitle}>More photos</Text>
            <FlatList
              data={result.photos}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return <Photo item={item} />
              }}
            />
          </View>
        </>
      )}
    </View>
  )
}

export default ResultDetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingCont: { padding: 20 },
  boldText: { fontWeight: 'bold' },
  info: {
    alignItems: 'center',
  },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 20,
    marginLeft: 10,
  },
  photos: { marginLeft: 10 },
  Image: {
    width: 150,
    height: 100,
    marginVertical: 30,
    borderRadius: 10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: 5, height: 9 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  review: {
    color: '#6b6a6a',
  },
  placeholder: {
    height: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 10,
  },
})
