import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import SearchListItem from './SearchListItem'
import { useNavigation } from '@react-navigation/native'

const SearchList = ({ title, results }) => {
  const navigation = useNavigation()
  return (
    results.length > 0 && (
      <View>
        <Text style={styles.title}>{title}</Text>
        <FlatList
          data={results}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('Detail', { id: item.id })}
              >
                <SearchListItem item={item} />
              </TouchableOpacity>
            )
          }}
        />
      </View>
    )
  )
}

export default SearchList

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#42bd63',
  },
})
