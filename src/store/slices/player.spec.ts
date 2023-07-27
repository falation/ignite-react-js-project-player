import { describe, expect, it } from 'vitest'

import { player as reducer, play, PlayerState, next } from './player'

const exampleState: PlayerState = {
  isLoading: false,
  currentLessonIndex: 0,
  currentModuleIndex: 0,
  course: {
    id: 1,
    modules: [
      {
        id: 1,
        name: 'Iniciando com React',
        lessons: [
          { id: 'Jai8w6K_GnY', name: 'CSS Modules', duration: '13:45' },
          { id: 'w-DW4DhDfcw', name: 'Estilização do Post', duration: '10:05' },
          { id: 'D83-55LUdKE', name: 'Componente: Header', duration: '06:33' },
          { id: 'W_ATsETujaY', name: 'Componente: Sidebar', duration: '09:12' },
          { id: 'Pj8dPeameYo', name: 'CSS Global', duration: '03:23' },
          { id: '8KBq2vhwbac', name: 'Form de comentários', duration: '11:34' },
        ],
      },
      {
        id: 2,
        name: 'Estrutura da aplicação',
        lessons: [
          { id: 'gE48FQXRZ_o', name: 'Componente: Comment', duration: '13:45' },
          { id: 'Ng_Vk4tBl0g', name: 'Responsividade', duration: '10:05' },
          { id: 'h5JA3wfuW1k', name: 'Interações no JSX', duration: '06:33' },
          { id: '1G0vSTqWELg', name: 'Utilizando estado', duration: '09:12' },
        ],
      },
    ],
  }
}

describe('player slice', () => {
  it('should be able to play', () => {
    const state = reducer(exampleState, play([1, 2]))

    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(2)
  })

  it('should be able to play next video automatically', () => {
    const state = reducer(exampleState, next())

    expect(state.currentModuleIndex).toEqual(0)
    expect(state.currentLessonIndex).toEqual(1)
  })

  it('should be able to jump to the next module automatically', () => {
    const state = reducer({
      ...exampleState,
      currentLessonIndex: 5
    }, next())

    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(0)
  })

  it('should not update the current module and lesson index if there is no next lesson available', () => {
    const state = reducer({
      ...exampleState,
      currentLessonIndex: 3,
      currentModuleIndex: 1
    }, next())

    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(3)
  })
})
