import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { THEME } from '../theme'

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={THEME.COLORS.PRIMARY} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  }
})
