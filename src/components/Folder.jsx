import { useState } from "react"
import analyzePdf from "../../trying"
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

const [selectedFile,setFile] = useState(null);
const [fileName, setFileName] = useState()


let {projects,setName,saveTaskList,setId,saveProjects} = useListStore()

function handleSubmit(e){
  e.preventDefault()
  formatTaskList(userInput)
}

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
      id:Date.now()+ Math.random()
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
    setFile(event.target.files[0])

  }
  const  onFileUpload = async (e)=>{

    e.preventDefault()
    setLoading(true)
    if(!selectedFile){
      alert('please select a file first')
      return
    }
    const formData = new FormData()
    formData.append('file',selectedFile)

    const uploadResponse = await fetch('http://localhost:3000/upload',{
      method:"POST",
      body:formData
    })
    const uploadData = await uploadResponse.json()
    const fileResponse = await analyzePdf(selectedFile)

    if(fileResponse){

    let name = selectedFile.name
      setProjectNameInput(`${name}`)
    setUserInput(fileResponse)
    setLoading(false)
    setFinished(true)
    }
  
else{

  setTypeOfError(`Didn't get the file`)
  setLoading(false)
  setError(true)
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
    return <h2>Select a file please</h2>
  }
  return <>
  <div className='cube'>
      <div id='h1--background'>
        <h1>List Task</h1>
        </div>

        <form onSubmit={handleSubmit}>
         <label htmlFor="projectName">Enter Project Name:</label> 
         <input type="text" name='projectName' value={projectNameInput} onChange={(e)=>setProjectNameInput(e.target.value)} />
         <label htmlFor="textArea"></label>
          <textarea name="textArea" id="" width='max-content' height='max-content' value={userInput} onChange={(e)=>setUserInput(e.target.value)}  required></textarea>
          <input type="submit" />
        </form>
    </div>

  <form onSubmit={onFileUpload}>
   <input type="file" onChange={(e)=>onFileChange (e)} /> 
   <button type="submit">Submit
   </button>
  <p>{isLoading?'file being processed':''}</p>
 <p>{finished?'Done':''}</p> 
 <p>{error?`Error Loading file encountered ${typeOfError}`:''}</p>
  </form> 
  {fileData()}


    <div className='main'>
    {projects && projects.length>0?
    (<>
    <List_Projects projects={projects}/>
    </>)
    :    
    (<>Nothing to see here</>)
    }
    </div>
  </>
}
export default GetFile