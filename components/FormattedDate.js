import { useState, useEffect } from 'react'

const FormattedDate = ({ date }) => {
  const [formattedDate, setFormattedDate] = useState('')

  useEffect(() => {
    setFormattedDate(new Date(date).toLocaleString())
  }, [date])

  return <span>{formattedDate}</span>
}

export default FormattedDate
