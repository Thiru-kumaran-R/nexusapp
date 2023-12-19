import { TextToSpeech } from './texttospeech/TextToSpeech'
import { SpeechRecognizer } from './speechrecognition/SpeechRecognizer'
import React, { useEffect, useState } from 'react'
import { useGlobalState } from './config'
import styles from './styles.module.css'

export function useSpeechData() {
  const [speechrecognition] = useGlobalState('speechrecognition')
  const [texttospeech] = useGlobalState('texttospeech')
  const [canSpeechRecognize, setCanSpeechRecognize] = useState(true)

  useEffect(() => {
    const canPauseRecognizing =
      texttospeech.enabled && speechrecognition.enabled && texttospeech.speaking
    setCanSpeechRecognize(!canPauseRecognizing)
  }, [speechrecognition, texttospeech])

  return [canSpeechRecognize]
}

//   <div class="relative p-3 shadow flex items-center justify-between">
//       <div class="flex space-x-3">
//       <button
//   type="button"
//   class="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full focus:outline-none"
//   aria-label="stop-speech"
//   title="Click to Disable Speech">
//       <i class="fa-solid fa-volume-high"></i>
// </button>
//   <button
//       type="button"
//       className="flex items-center justify-center w-10 h-10 bg-gray-300 text-white rounded-full focus:outline-none"
//       aria-label="start-listening"
//       title="Click to Enable Listening">
//     <i className="fa-solid fa-microphone-slash"></i>
//   </button>
// </div>
//   <div className="text-lg font-bold text-gray-800">Chat Room</div>
// </div>

export function SpeechRecognizerAndTTSPanel() {
  const [canSpeechRecognize] = useSpeechData()

  return (

      <div className="flex items-center p-4 shadow">
        <div className="space-x-4 ml-4">
      <TextToSpeech />
      {canSpeechRecognize && <SpeechRecognizer />}
        </div>
      </div>

  )
}
