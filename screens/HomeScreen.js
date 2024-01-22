import {
  View,
  StyleSheet,
  Text,
  RefreshControl,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import * as Contacts from 'expo-contacts'
import { FlatList } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { EvilIcons } from '@expo/vector-icons'
import SearchBar from '../components/SearchBar'

const HomeScreen = ({ navigation }) => {
  const [contacts, setContacts] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [filteredContacts, setFilteredContacts] = useState([])
  //console.log(contacts[1])
  const handleInputChange = (text) => {
    setSearch(text)
  }
  //getting contacts from phone
  const getContacts = async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync()
      if (status === 'granted') {
        setSelectedItems([])
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        })
        if (data.length > 0) {
          const sortedContacts = data.sort((a, b) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
          )
          setContacts(sortedContacts)
          setFilteredContacts(sortedContacts)
        }
      } else {
        Alert.alert('Access Denied', `Access denied for contact deletion}`)
      }
    } catch (error) {
      setRefreshing(false) // Set refreshing to false after the refresh action
    } finally {
      setRefreshing(false) // Set refreshing to false after the refresh action
    }
  }

  useEffect(() => {
    getContacts()
  }, [])

  //Toggling the selection of
  const toggleSelection = (id) => {
    let updatedSelection = [...selectedItems]
    const index = updatedSelection.indexOf(id)
    if (index === -1) {
      updatedSelection.push(id)
    } else {
      updatedSelection.splice(index, 1)
    }
    setSelectedItems(updatedSelection)
    const isSelected = contacts.includes(id)
    if (isSelected) {
      setContacts(contacts.filter((itemId) => itemId !== id))
    } else {
      setContacts([...contacts, id])
    }
  }

  //handle Delete contacts
  const handleDelete = async () => {
    try {
      Alert.alert(
        'Confirm Deletion',
        `Are you sure you want to delete ${selectedItems.length} contact?`,
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: async () => {
              try {
                // Show progress indicator while deleting contacts
                const deletedIds = []
                for (const contactId of selectedItems) {
                  await Contacts.removeContactAsync(contactId)
                  deletedIds.push(contactId)
                }

                if (deletedIds.length > 0) {
                  Alert.alert(
                    'Delete',
                    `${deletedIds.length} Contacts Deleted.`,
                  )
                  setSelectedItems([])
                  // Refresh the contact list after deletion
                  getContacts() // Call the fetchContacts function to refresh the contact list
                } else {
                  Alert.alert(
                    'No Contacts Deleted',
                    'Selected contacts are already deleted or do not exist.',
                  )
                }
              } catch (error) {
                Alert.alert('Error', 'Failed to delete contacts')
              }
            },
          },
        ],
        { cancelable: false },
      )
    } catch (error) {
      Alert.alert('Error', 'Failed to delete contacts.')
    }
  }

  //handle refresh when pull down
  const onRefresh = async () => {
    setRefreshing(true)
    await getContacts() // Recall fetchContacts on pull-to-refresh
    setRefreshing(false)
  }

  //showing count in the title bar, when selecting contact
  useEffect(() => {
    navigation.setOptions({
      headerTitle: `My Contacts ${
        selectedItems.length > 0 ? selectedItems.length : ''
      }`,
    })
  }, [selectedItems, navigation])

  // Update header dynamatically based on selectedContacts length
  useEffect(() => {
    const headerRight = () => {
      if (selectedItems.length > 0) {
        return (
          <TouchableOpacity onPress={handleDelete} style={styles.headerRight}>
            <MaterialIcons name="delete-outline" size={32} color="red" />
          </TouchableOpacity>
        )
      } else {
        return null
      }
    }
    const headerLeft = () => {
      return (
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.headerLeft}
        >
          <EvilIcons name="navicon" size={40} color="black" />
        </TouchableOpacity>
      )
    }

    navigation.setOptions({
      headerRight: headerRight,
      headerLeft: headerLeft,
    })
  }, [selectedItems, navigation])

  useEffect(() => {
    if (search !== '') {
      setLoading(true)
      const filteredCon = contacts.filter((contact) => {
        return contact.name && contact.name.toLowerCase().includes(search)
      })
      setFilteredContacts(filteredCon)
      setLoading(false)
    } else {
      getContacts()
    }
  }, [search])

  const renderName = (item) => {
    return item?.name
  }
  const renderPhone = (item) => {
    return item?.phoneNumbers && item.phoneNumbers.length > 0
      ? item.phoneNumbers.map((item) => (
          <Text style={styles.number}>{item.number}</Text>
        ))
      : 'No phone number'
  }
  const renderType = (item) => {
    return item.contactType.charAt(0).toUpperCase() + item.contactType.slice(1)
  }
  const renderTotalCount = () => {
    return selectedItems?.length > 0
      ? `Selected ${selectedItems.length} contacts from ${filteredContacts.length} contacts`
      : `Found ${filteredContacts.length} contacts`
  }
  //rendering the item
  const renderItem = ({ item }) => {
    const isSelected = contacts.includes(item.id)

    return (
      <TouchableOpacity
        onPress={() => toggleSelection(item.id)}
        activeOpacity={0.1}
        style={[styles.item, isSelected ? styles.selectedItem : null]}
      >
        <View style={styles.avatar}>
          <Text style={styles.avtName}>{renderName(item).charAt(0)}</Text>
        </View>
        <View style={styles.contact}>
          <Text style={styles.name}>{renderName(item).toUpperCase()}</Text>
          {renderPhone(item)}
          {/* <Text style={styles.type}>{renderType(item)}</Text> */}
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://images.pexels.com/photos/18896479/pexels-photo-18896479/free-photo-of-outdoor-moody-portrait-photography-berlin-vintage-style.jpeg',
        }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={10}
      />
      <SearchBar
        search={search}
        setSearch={setSearch}
        handleSearch={handleInputChange}
        //handleSubmit={() => filterContacts(search)}
        loading={loading}
      />
      <View style={styles.paddingV}>
        <View style={styles.totalContact}>
          <Text>{renderTotalCount()}</Text>
        </View>
        <FlatList
          data={filteredContacts}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  headerLeft: { marginLeft: 10 },
  headerRight: { marginRight: 10 },
  paddingV: {
    flex: 1,
    paddingVertical: 0,
  },
  totalContact: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    marginHorizontal: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#1dd1a1',
    marginRight: 20,
    borderRadius: '50%',
  },
  avtName: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255, 1)',
    marginHorizontal: 15,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    shadowColor: '#333333',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
  contact: {
    borderRadius: 5,
  },
  selectedItem: {
    backgroundColor: 'rgba(255,255,255, 0.8)', // Change background color for selected item
  },
  name: { color: '#5f27cd', fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  number: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#333333',
    lineHeight: 20,
    paddingVertical: 5,
  },
  type: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#333333',
    fontStyle: 'italic',
  },
  text: {
    color: '#ffffff',
  },
})

export default HomeScreen
