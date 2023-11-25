import React from 'react'
import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #FFBB33;

    display : flex;
    align-items : center;
    justify-content: center;}

`
export const Content = styled.div`
    background-color: #fff;
    max-width:300px ;
`

export const Row = styled.div`
    display:flex;
    flex-direction: row;
    justify-content : space-between;
    align-items : center;
`

export const Column = styled.div`
    display:flex;
    flex-direction: Column;
    justify-content : space-between;
    align-items : center;
`