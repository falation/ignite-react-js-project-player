import { Provider as ReduxProvier } from 'react-redux'

import { store } from './store'
import { Player } from './pages/Player'

export function App() {
  return (
    <ReduxProvier store={store}>
      <Player />
    </ReduxProvier>
  )
}
