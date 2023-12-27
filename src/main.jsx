import React from 'react'
import { createRoot } from 'react-dom/client'
import App from "./App"
import "./index.css"

const mainRoot = document.getElementById("root");
createRoot(mainRoot).render(
  <App />
)
