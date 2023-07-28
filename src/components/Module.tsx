import * as Collapsible from '@radix-ui/react-collapsible'
import { ChevronDown } from 'lucide-react'

import { useStore } from '../store'
import { Lesson } from './Lesson'

interface ModuleProps {
  lessonsAmount: number
  moduleIndex: number
  name: string
}

export function Module({ lessonsAmount, moduleIndex, name }: ModuleProps) {
  const { currentLessonIndex, currentModuleIndex, lessons, play } = useStore(store => {
    return {
      currentLessonIndex: store.currentModuleIndex,
      currentModuleIndex: store.currentLessonIndex,
      lessons: store.course?.modules[moduleIndex].lessons,
      play: store.play
    }
  })

  return (
    <Collapsible.Root className='group' defaultOpen={moduleIndex === 0}>
      <Collapsible.Trigger className='flex w-full items-center gap-3 bg-zinc-800 p-4'>
        <span className='flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs'>
          {moduleIndex + 1}
        </span>
        <div className='flex flex-col gap-1 text-left'>
          <strong className='text-sm'>{name}</strong>
          <span className='text-xs text-zinc-400'>{lessonsAmount} aulas</span>
        </div>
        <ChevronDown className='w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform' />
      </Collapsible.Trigger>

      <Collapsible.Content>
        <nav className='relative flex flex-col gap-4 p-6'>
          {lessons && lessons.map((lesson, lessonIndex) => {
            const isCurrent = currentModuleIndex === moduleIndex && currentLessonIndex === lessonIndex

            return (
              <Lesson
                key={lesson.id}
                duration={lesson.duration}
                name={lesson.name}
                isCurrent={isCurrent}
                onPlay={() => play([moduleIndex, lessonIndex])}
              />
            )
          })}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
