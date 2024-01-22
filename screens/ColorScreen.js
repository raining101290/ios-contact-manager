import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native'
import React, { useState } from 'react'
const { width } = Dimensions.get('window')

const ColorScreen = () => {
  const [colors, setColors] = useState([])
  const handlePress = (backgroundColor) => {
    Alert.alert('Alert', 'Selected Color: ' + backgroundColor)
  }
  const ColorCard = ({ color }) => (
    <TouchableOpacity onPress={() => handlePress(color)}>
      <View
        style={{
          width: width / 3,
          height: width / 3,
          backgroundColor: color,
        }}
      ></View>
    </TouchableOpacity>
  )
  const colorGen = () => {
    const red = Math.floor(Math.random() * 256)
    const blue = Math.floor(Math.random() * 256)
    const green = Math.floor(Math.random() * 256)
    return `rgb(${red}, ${blue}, ${green})`
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.bigBlue}
        onPress={() => setColors([...colors, colorGen()])}
      >
        <Text style={styles.text}>Generate Color</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bigBlue} onPress={() => setColors([])}>
        <Text style={styles.text}>Clear</Text>
      </TouchableOpacity>

      <FlatList
        data={colors}
        renderItem={({ item }) => <ColorCard color={item} />}
        keyExtractor={(item) => item}
        numColumns={3}
        showsVerticalScrollIndicator={true}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  bigBlue: {
    backgroundColor: '#1ba1e2',
    width: 200,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
})
export default ColorScreen
