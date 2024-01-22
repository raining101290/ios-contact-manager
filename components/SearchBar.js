import {
  StyleSheet,
  TextInput,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
const SearchBar = ({
  search,
  setSearch,
  handleSearch,
  handleSubmit,
  loading,
}) => {
  return (
    <View style={styles.searchCont}>
      <Feather style={styles.searchIcon} name="search" size={40} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.search}
        placeholder="Search"
        value={search}
        onChangeText={handleSearch}
        //onEndEditing={handleSubmit}
      />
      {loading && <ActivityIndicator size="small" color="#626363" />}
      {search.length > 0 && (
        <TouchableOpacity onPress={() => setSearch('')}>
          <AntDesign name="closecircleo" size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  searchCont: {
    marginTop: 10,
    marginBottom: 0,
    paddingEnd: 10,
    backgroundColor: '#FFFFFF',
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    display: 'flex',
    flexDirection: 'row',
    borderColor: '#f0eeee',
    borderWidth: 1,
    alignItems: 'center',
  },
  searchIcon: {
    color: '#6b6a6a',
    alignSelf: 'center',
    marginHorizontal: 8,
  },
  search: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
})
export default SearchBar
