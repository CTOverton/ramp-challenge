import { useFlag } from '../hooks/useFlag.ts'
import { useEffect, useState } from 'react'

export const Flag = () => {
  const { flag, loading } = useFlag()
  const [characters, setCharacters] = useState<string[]>([])
  const [index, setIndex] = useState<number>(0)

  useEffect(() => {
    if (!loading && flag && index < flag.length) {
      const timer = setTimeout(() => {
        setCharacters((prevCharacters) => [...prevCharacters, flag[index]])
        setIndex((prevIndex) => prevIndex + 1)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [loading, characters, index, flag])

  if (loading) return <p>Loading...</p>

  return (
    <ul>
      {characters.map((character, index) => (
        <li key={index}>{character}</li>
      ))}
    </ul>
  )
}
