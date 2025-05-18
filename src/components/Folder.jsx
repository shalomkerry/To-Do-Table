import { useEffect, useState } from "react"
import analyzePdf from "../../trying.js"
import useListStore from "../store/useListStore"
import List_Projects from "./Projects"
function GetFile(){
let store = useListStore()
let [finalList,setFinalList] = useState([]);
let [projectName,setProjectName] = useState('')
let [userInput, setUserInput] = useState('')
let [projectNameInput,setProjectNameInput] = useState('')
let [isLoading, setLoading] = useState(false)
let [finished,setFinished] = useState(false)
let [error, setError] = useState(false)
let [typeOfError, setTypeOfError] = useState('')

const [selectedFile,setFile] = useState([]);
const [fileName, setFileName] = useState()


let {projects,setName,saveTaskList,setId,saveProjects} = useListStore()

function handleSubmit(e){
  e.preventDefault()
  formatTaskList(userInput)
}
useEffect(()=>{
// console.log(selectedFile)
},[selectedFile])

function formatTaskList(list){
const pattern = /^\s*([\d]+(?:[\.\-\)\:]\d+)*)/g;

 if(pattern.test(list)){
let arrayWords = list.split('\n').filter(x=>x!='').map(x=>x.trim())
let numbers = []
let words = []
arrayWords.forEach(x=>{
    let patter = x.match(pattern)
    let wor  = x.match(/([^.\d])+/g)
    
    if(patter && wor){
  numbers.push(patter[0])
  words.push(wor[0])
    }
})

let pack = [];
let subset = []
  for(let i = 0; i<numbers.length; i++){
    if(Number.isInteger(+numbers[i])){
      let result = {
        number:numbers[i],
        word:words[i],
        id:Date.now() + Math.random(),
      }
      pack.push(result)

    }
    else{
      let result = {
        number:numbers[i],
        word:words[i],
        depth:numbers[i].split('.').length-1,
        id:Date.now() + Math.random(),
        completed:false,
      }
    subset.push(result)
      }
}

let children = []

let wholeArray = [] 

    if(numbers.length>0 && words.length>0){
for(let j = 0; j<pack.length;j++){
let ones = subset.filter(x=>x.number.startsWith(`${pack[j].number}`))
    let nest = {
      number:pack[j].number,
      word:pack[j].word,
      completed:false,
      children:ones,
      id:Math.random(),
    }
    children.push(nest)
  }

addItem(children)
setName(projectNameInput)
setId()

children.forEach(x=>{
  saveTaskList(x)
  // x.children.length>0?x.children.map(j=>saveTaskList(j)):''
})

saveProjects()

setFinalList([])
}
}else{
  alert('insert a list with numbers and .')
}
  }

const addItem = (item)=>{
  
setFinalList((prev)=>[...prev,...item])
setProjectName(projectNameInput)
setUserInput('')
setProjectNameInput('')
}


  const onFileChange = (event)=>{
    event.preventDefault()
    let paragraph = document.querySelector('.preview-par')
    setFile(event.target.files[0])
    paragraph.textContent =`${event.target.files[0].name}` 
    console.log(event.target.files[0])
  }
  const  onFileUpload = async (e)=>{
    e.preventDefault()
    if(!selectedFile||selectedFile.length==0){
      alert('please select a file first')
      return
    }
    const formData = new FormData()
    formData.append('file',selectedFile)

  const uploadResponse = await fetch('http://localhost:3000/uploads',{ method:"POST",
      body:formData
    })
    const fileResponse = await analyzePdf(selectedFile)
    if(fileResponse && !fileResponse.error){
 let paragraph = document.querySelector('.preview-par') 
 paragraph.textContent = 'File Uploaded'
  setFile([])
 setTimeout(()=>{
  paragraph.textContent = 'No Files Selected'
  setLoading(false)
 },'1000')

    setUserInput(fileResponse)
    setFinished(true)
    }
else if(fileResponse.error){
  alert(`${fileResponse.error} yes`)
} 
else {

 let paragraph = document.querySelector('.preview-par') 
  setFile([])
 setTimeout(()=>{
  paragraph.textContent = 'No Files Selected'
  setLoading(false)
 },'100')
  alert('but there is no file')
  setTypeOfError(`Didn't get the file`)
}  
  }

  const fileData = ()=>{
    if(selectedFile){
      return(
        <div>
          <h1>{selectedFile.name}</h1>
        </div>
      )
    }
    return <p>Insert a course outline file (pdf only)</p>
  }


  return <>
  <div className='cube'>
      <div className='title--background'>
        <h1>Course Checklist</h1>
          <span>Create and manage your course content</span>
        </div>
        <div className="input--container">
      <form className='formInput' onSubmit={handleSubmit}>
         <label htmlFor="projectName" className='labelName'>Course Name</label> 
         <input type="text" className='inputName' name='projectName' required placeholder='Enter course name' value={projectNameInput} onChange={(e)=>setProjectNameInput(e.target.value)} autoComplete="off" />
         <label htmlFor="textArea" className='labelProject'>Course Content</label>
          <textarea name="textArea" className='inputList' id="" width='max-content' placeholder='Enter course content'height='max-content' value={userInput} onChange={(e)=>setUserInput(e.target.value)}  required></textarea>
          <button type="submit" className='submitBtn' >
        Add Checklist
          </button>
        </form>
  <form onSubmit={onFileUpload} className='secondForm'>
   <div className="fileInput">
    <label htmlFor="file_uploads" className="fileLabel">Insert Course Outline File (pdf,doc,docx files)</label>
    <input type="file" id='file_uploads' onChange={(e)=>onFileChange (e)} accept=".pdf,.docx,.doc" /> 
    <div className="preview">
    <p className="preview-par">No files selected</p>
    </div>
    </div> 


  {isLoading?<p className="status status-loading">Chapters Being Extracted</p>
:''}
  {error?<p className="status status-error">Error Loading file encountered</p>
  :''}
   <button type="submit" className='secondForm-submit'>Extract Outline
   </button>
  </form> 
        </div>
    </div>

<div className="separate"></div>
    <div className='projects'>
    {projects && projects.length>0?(
        <List_Projects projects={projects}/>
      
    )
    :    
    (<p>No project started yet</p>)
    }
    </div>
  </>
}
export default GetFile