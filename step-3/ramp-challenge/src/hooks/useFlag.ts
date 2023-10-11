import { useEffect, useState } from 'react'

export const useFlag = () => {
  const [loading, setLoading] = useState(false)
  const [flag, setFlag] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch(
      'https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/737562',
    )
      .then((res) => res.text())
      .then((data) => {
        console.log(data)
        setFlag(data)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return { loading, flag }
}
