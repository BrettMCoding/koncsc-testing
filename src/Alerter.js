import React from 'react'
import { useAlert } from 'react-alert'

export default function Alerter(props) {
    const alert = useAlert()

  return (
    <button
      onClick={() => {
        alert.show("my naem jeff asdsadgfdesarfgdsgfsdhgffdsghfsghfdsghfdsgh")
      }}
    >
      Show Alert
    </button>
  )
}
