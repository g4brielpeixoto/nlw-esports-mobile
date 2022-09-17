import { ImageBackground, StyleSheet } from 'react-native'
import backgroundImage from '../assets/background-galaxy.png'
import { THEME } from '../theme'

interface Props {
  children: React.ReactNode
}

export function Background({ children }: Props) {
  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.container}
      defaultSource={backgroundImage}
    >
      {children}
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.BACKGROUND_800
  }
})
