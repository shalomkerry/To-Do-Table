import { useEffect, useState } from 'react'
import './App.css'
import useListStore from './store/useListStore';
import GetFile from './components/Folder';
import List_Projects from './components/Projects';

function App() {

  return(
    <>
    <GetFile/>
    </>
  )
}
export default App