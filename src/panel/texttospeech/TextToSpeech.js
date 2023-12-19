import React, { useEffect, useState } from 'react'

import { speak } from './textToSpeechController'
import {
  disableTextToSpeech,
  enableTextToSpeech
} from './textToSpeechDispatcher'
import { useGlobalState } from '../config'

export function TextToSpeechDisabledPanel() {
  // eslint-disable-next-line no-unused-vars
  const [_, setLastReceivedMessage] = useGlobalState('lastreceivedmessage')

  return (
    <button
      type='button'
      className="items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-full focus:outline-none ml-4"
      aria-label='start-speech'
      onClick={() => {
        setLastReceivedMessage('')
        enableTextToSpeech()
      }}
      title='Click to Enable Speech'
    >
      {' '}
      <i className='fa-solid fa-volume-xmark fa-2x' />
    </button>
  )
}
export function TextToSpeechEnabledPanel() {
  const [lastreceivedmessage] = useGlobalState('lastreceivedmessage')

  useEffect(() => {
    const handler = speak(lastreceivedmessage)
    return () => {
      handler.cancel()
    }
  }, [lastreceivedmessage])
//flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full focus:outline-none
  //items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-full focus:outline-none
  return (
    <button
      type='button'
      className="items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-full focus:outline-none ml-4"
      aria-label='stop-speech'
      onClick={() => disableTextToSpeech()}
      title='Click to Disable Speech'
    >
      <i className='fa-solid fa-volume-high fa-2x' />
    </button>
  )
}

export function TextToSpeech() {
  const [texttospeech] = useGlobalState('texttospeech')
  const [enableSpeech, setEnableSpeech] = useState(false)

  useEffect(() => {
    setEnableSpeech(texttospeech.enabled)
  }, [texttospeech])

  return (
    <>
      {enableSpeech ? (
        <TextToSpeechEnabledPanel />
      ) : (
        <TextToSpeechDisabledPanel />
      )}
    </>
  )
}
