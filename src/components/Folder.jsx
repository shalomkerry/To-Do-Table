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

const [selectedFile,setFile] = useState(null);
const [fileName, setFileName] = useState()


let {projects,setName,saveTaskList,setId,saveProjects} = useListStore()

function handleSubmit(e){
  e.preventDefault()
  formatTaskList(userInput)
}

function formatTaskList(list){
const pattern = /^\s*([\d]+(?:[\.\-\)\:]\d+)*[\.])/g;

if(pattern.test(list)){
let arrayWords = list.split('\n').filter(x=>x!='').map(x=>x.trim())
let nums = []
let words = []
arrayWords.forEach(x=>{
    let patter = x.match(pattern)
    let wor  = x.match(/([^.\d])+/g)
    if(patter && wor){
nums.push(patter[0])
words.push(wor[0])
    }
})

let wholeArray = [] 

if(nums.length>0 && words.length>0){
for(let i = 0; i<nums.length;i++){
  let  result = {

  number:nums[i],
  word:words[i],
  length:nums[i].split('.').length,
  id:Date.now() + Math.random(),
  completed:false,
  }
wholeArray.push(result)
}

addItem(wholeArray)
setName(projectNameInput)
setId()
wholeArray.forEach(x=>{
  saveTaskList(x)
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
//checking if this part only gets added
export default GetFile