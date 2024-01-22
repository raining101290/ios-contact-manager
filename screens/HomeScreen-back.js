import { View, StyleSheet, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import SearchBar from '../components/SearchBar'
import useSearch from '../hooks/useSearch'
import SearchList from '../components/SearchList'
const HomeScreen = () => {
  const [search, setSearch] = useState('')
  const [callSearchApi, results, totalCount, loading] = useSearch()
  const handleInputChange = (text) => {
    setSearch(text)
  }
  const filterSearchResult = (price) => {
    return results.filter((item) => item.price === price)
  }

  return (
    <View style={styles.container}>
      <SearchBar
        search={search}
        setSearch={setSearch}
        handleSearch={handleInputChange}
        handleSubmit={() => callSearchApi(search)}
        loading={loading}
      />
      <Text style={[styles.padding15, styles.resultCount]}>
        Showing {results.length} results from {totalCount}
      </Text>
      <ScrollView>
        <View style={styles.padding15}>
          <SearchList
            results={filterSearchResult('$')}
            title={'Cost Effective'}
          />
          <SearchList
            results={filterSearchResult('$$')}
            title={'Bit Pricier'}
          />
          <SearchList
            results={filterSearchResult('$$$')}
            title={'Big Spender'}
          />
          <SearchList
            results={filterSearchResult('$$$$')}
            title={'Expensive'}
          />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  padding15: { paddingHorizontal: 15 },
  resultCount: {
    marginVertical: 5,
    color: '#c2bebe',
  },
  bigBlue: {
    fontWeight: 'bold',
    fontSize: 30,
    backgroundColor: '#1ba1e2',
    width: 200,
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
  },
})

export default HomeScreen
