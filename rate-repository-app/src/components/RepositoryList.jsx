import { FlatList, View, StyleSheet, Pressable, TextInput } from 'react-native'
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import { useNavigate } from 'react-router-native'
import { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { useDebounce } from 'use-debounce'
import { Searchbar } from 'react-native-paper'
import React from 'react'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    margin: 10,
    padding: 10,
    backgroundColor: 'pink',
    borderRadius: 5
  },
  input: {
    borderRadius: 5,
    backgroundColor: 'white'
  }
})

const ItemSeparator = () => <View style={styles.separator} />

export class RepositoryListContainer extends React.Component{ 
  Header =() => {
    const { order, setOrder, search, setSearch } = this.props

  return (
    <View style={styles.picker}>
      <Searchbar
        style={styles.input}
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
      />
      <Picker
        selectedValue={order}
        onValueChange={(itemValue) => setOrder(itemValue)}
        style = {{color: 'white'}}
      >
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </View>
    )
  }

    render () {
      const { repositories, navigate } = this.props
      const repositoryNodes = repositories
  ? repositories.edges.map(edge => edge.node)
  : []
    

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
      <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
        <RepositoryItem prop={item} />
      </Pressable> 
  )}
      keyExtractor={(prop) => prop.id}
      ListHeaderComponent={this.Header()}
    />
    )
  }
}

const RepositoryList = () => {
  const navigate = useNavigate()
  const [order, setOrder] = useState('latest')
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 500)

  const getOrder = () => {
    switch (order) {
      case 'highest':
        return {orderBy: 'RATING_AVERAGE', orderDirection: 'DESC'}
      case 'lowest':
        return {orderBy: 'RATING_AVERAGE', orderDirection: 'ASC'}
      case 'latest':
        return {orderBy: 'CREATED_AT', orderDirection: 'DESC'}
    }
  }
  const { repositories } = useRepositories({
  ...getOrder(), 
  searchKeyword: debouncedSearch})

  return <RepositoryListContainer repositories={repositories} navigate={navigate} search={search} setSearch={setSearch} order={order} setOrder={setOrder} />
}

export default RepositoryList