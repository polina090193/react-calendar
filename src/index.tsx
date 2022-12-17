import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import './index.css'
import App from './App'

const container: HTMLElement = document.getElementById('root')

const root: ReactDOMClient.Root = ReactDOMClient.createRoot(container)

root.render(
    <App />
)