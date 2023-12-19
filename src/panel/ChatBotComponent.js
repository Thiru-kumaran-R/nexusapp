import React, {useEffect, useState} from 'react'

import styles from './styles.module.css'
import { InputPanel } from './message/components/InputPanel'
import { MessageContainer } from './message/MessageContainer'
import { SpeechRecognizerAndTTSPanel } from './SpeechRecognizerAndTTSPanel'

import { useGlobalState } from './config'
import { addIncomingMessage } from './message/messageService'
// ChatBotComponent

// Options
/*
{
  speechRecognition: true,
  textToSpeech: true,
  textBox: true,
  textBoxPlaceholder: 'Type your message here',
  sendButton:{
    text: 'Send',
    className: 'send-button'
  },
  textBox:{
    className: 'text-box'
  }


  textBoxSubmitButtonClassName: 'chatbot__submit-button',



}

 */

const ThinkingAnimation = () => {

  const [loading, setLoading] = useGlobalState('loading')


  if(!loading) return (<></>)

  return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
  );
};

export const ChatBotComponent = ({ handleMessage, options }) => {
  const [config, setConfig] = useGlobalState('config')

  const [textToSpeechOptions, setTextToSpeechOptions] =
    useGlobalState('texttospeech')
  const [speechrecognitionOptions, setSpeechrecognitionOptions] =
    useGlobalState('speechrecognition')

  // speechrecognition.enabled

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim() === '') return; // Prevent sending empty messages
    setMessages([...messages, { text: input, sender: 'you' }]); // Dummy sender value
    setInput('');
  };

  const receiveMessage = (text) => {
    // This is a dummy function to simulate receiving a message and adding it to the state.
    // In a real application, this might be handled by a WebSocket receiving a message, for example.
    const message = { text, sender: 'them' }; // Dummy sender value
    setMessages([...messages, message]);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const callBackendAPI = async (text) => {
    if (handleMessage) {
      const response = await handleMessage({ data: text })
      console.log('callBackendAPI response', response)
      addIncomingMessage(response.text)
    } else {
      const response = await Promise.resolve({ text: 'echoing ' + text })
      addIncomingMessage(response.text)
    }

    // now add the response to incoming messages
  }

  useEffect(() => {
    const mergedOptions = { ...config, ...options }
    const formattedOptions = {
      ...mergedOptions,
      textToSpeech: String(mergedOptions.textToSpeech) === 'true',
      speechRecognition: String(mergedOptions.speechRecognition) === 'true'
    }

    setConfig(formattedOptions)

    setTextToSpeechOptions({
      ...textToSpeechOptions,
      enabled: formattedOptions.textToSpeech
    })
    setSpeechrecognitionOptions({
      ...speechrecognitionOptions,
      enabled: formattedOptions.speechRecognition
    })
  }, [options])


  return (
      <div className="flex flex-col h-screen w-full bg-white">
        {/* Chat header */}


        <div className="relative p-3 shadow flex items-center ">
            <SpeechRecognizerAndTTSPanel />


          <div className="text-lg font-bold text-gray-800 z-10">&nbsp;</div>
          <div className="flex space-x-3 absolute right-0 mr-4 opacity-0">
            <button className="flex items-center justify-center w-10 h-10"></button>
            <button className="flex items-center justify-center w-10 h-10"></button>
          </div>

          {/* Positioned floating buttons */}

        </div>


        {/*<div className="p-3 shadow text-center">*/}
        {/*  <div className="text-lg font-bold text-gray-800">Chat Room</div>*/}
        {/*</div>*/}
        <ThinkingAnimation />
        <div className="flex-1 overflow-y-auto p-3 space-y-4 mh-60" >

        <MessageContainer className={styles.messageContainer} />
      </div>
      <InputPanel onResponse={callBackendAPI} />
    </div>
  )


}
