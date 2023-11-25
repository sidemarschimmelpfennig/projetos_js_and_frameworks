
import React from 'react'
import {InputContainer} from './styles'

export default function ({value}) {
  return (
    <InputContainer>
    <input disabled value={value}/>
    </InputContainer>
  )
}
