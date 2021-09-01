import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, Text, SafeAreaView } from 'react-native'
import { map } from 'lodash'

import { getNewsApi } from './src/api/news'
import { New } from './src/components/New'

const App = () => {
  const [news, setNews] = useState(null)

  useEffect(() => {
    getNewsApi().then((response) => {
      setNews(response)
    })
  }, [])

  if (!news) return null

  return (
    <SafeAreaView>
      <Text style={styles.title}>Últimas noticias</Text>
      <ScrollView style={styles.scrollNew}>
        {map(news, (data) => (
          <New key={data.id} data={data} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    paddingVertical: 10
  },
  scrollNew: {
    height: '100%'
  }
})
