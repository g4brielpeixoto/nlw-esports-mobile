import { useEffect, useState } from 'react'
import { Image, FlatList, StyleSheet } from 'react-native'

import LogoImage from '../assets/logo-nlw-esports.png'
import { Heading } from '../components/Heading'
import { GameCard, GameCardProps } from '../components/GameCard'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Background } from '../components/Background'
import { useNavigation } from '@react-navigation/native'

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([])
  const navigation = useNavigation()

  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate('game', { id, title, bannerUrl })
  }

  useEffect(() => {
    fetch('http://192.168.1.132:3333/games')
      .then(response => response.json())
      .then(data => setGames(data))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={LogoImage} style={styles.logo} resizeMode="stretch" />
        <Heading title="Encontre seu duo" subtitle="Selecione o game que deseja jogar" />

        <FlatList
          data={games}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <GameCard data={item} onPress={() => handleOpenGame(item)} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
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
  logo: {
    width: 214,
    height: 120,
    marginTop: 74,
    marginBottom: 24
  },
  contentList: {
    paddingLeft: 32,
    paddingRight: 64
  }
})
