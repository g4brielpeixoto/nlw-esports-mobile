import { useEffect, useState } from 'react'
import { Image, TouchableOpacity, View, StyleSheet, FlatList, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'

import { Background } from '../components/Background'
import { GameParams } from '../@types/navigation'
import logoImage from '../assets/logo-nlw-esports.png'

import { THEME } from '../theme'
import { Heading } from '../components/Heading'
import { DuoCard, DuoCardProps } from '../components/DuoCard'
import { SmileyXEyes } from 'phosphor-react-native'

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([])
  const route = useRoute()
  const game = route.params as GameParams
  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  useEffect(() => {
    fetch(`http://192.168.1.132:3333/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => setDuos(data))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo name="chevron-thin-left" color={THEME.COLORS.CAPTION_300} size={20} />
          </TouchableOpacity>

          <Image source={logoImage} style={styles.logo} />
          <View style={styles.right} />
        </View>

        <Image source={{ uri: game.bannerUrl }} style={styles.cover} resizeMode="cover" />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <DuoCard data={item} onConnect={() => {}} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={duos.length === 0 ? styles.containerEmpty : styles.contentList}
          style={styles.containerList}
          ListEmptyComponent={() => (
            <View style={styles.emptyListContainer}>
              <SmileyXEyes color={THEME.COLORS.CAPTION_300} size={80} />
              <Text style={styles.emptyListText}>Nenhum anúncio publicado</Text>
            </View>
          )}
        />
      </SafeAreaView>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    marginTop: 28,
    justifyContent: 'space-between'
  },
  logo: {
    width: 72,
    height: 40
  },
  right: {
    width: 20,
    height: 20
  },
  cover: {
    width: 311,
    height: 160,
    borderRadius: 8,
    marginTop: 32
  },
  containerList: {
    width: '100%'
  },
  contentList: {
    paddingLeft: 32,
    paddingRight: 64,
    alignItems: 'flex-start'
  },
  emptyListText: {
    marginTop: 16,
    color: THEME.COLORS.CAPTION_300,
    fontSize: THEME.FONT_SIZE.SM,
    fontFamily: THEME.FONT_FAMILY.REGULAR
  },
  containerEmpty: {
    flex: 1,
    marginTop: 40
  },
  emptyListContainer: {
    flex: 1,
    alignItems: 'center'
  }
})
