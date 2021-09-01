import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Linking, Alert } from 'react-native'
import urlParse from 'url-parse'
import moment from 'moment'
import 'moment/locale/es'
import { InAppBrowser } from 'react-native-inappbrowser-reborn'

export const New = ({ data }) => {
  const { title, url, created_at: createdAt } = data

  const openUrl = async () => {
    try {
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#000',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#000',
          secondaryToolbarColor: 'white',
          navigationBarColor: 'black',
          navigationBarDividerColor: 'white',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right'
          },
          headers: {
            'my-custom-header': 'my custom header value'
          }
        })
      } else Linking.openURL(url)
    } catch (error) {
      Alert.alert(error.message)
    }
  }

  return (
    <TouchableOpacity onPress={openUrl} activeOpacity={0.8}>
      <View style={styles.new}>
        <Text style={styles.url}>{urlParse(url).host}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.time}>{moment(createdAt).startOf().fromNow()}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  new: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    padding: 20
  },
  url: {
    color: 'grey',
    paddingBottom: 5
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  time: {
    color: 'grey',
    paddingTop: 10
  }
})
