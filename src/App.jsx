import { useEffect, useState } from 'react'
import './App.css'
import ToC from './components/Task_Items';
import useListStore from './store/useListStore';

function App() {
let {projects,currentProject,setName,saveTaskList,setId,toggleTaskCompletion,saveProjects} = useListStore()
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
setId('one')
wholeArray.forEach(x=>{
  saveTaskList(x)
})
saveProjects()
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

let [finalList,setFinalList] = useState([]);
let [projectName,setProjectName] = useState('')

let [userInput, setUserInput] = useState('')
let [projectNameInput,setProjectNameInput] = useState('')

useEffect(()=>{
  console.log("Final list updated",finalList)
  console.log(projects)
},[finalList])
  return(
    <>
    <div className='cube'>
      <div id='h1--background'>
        <h1>List Task</h1>
        </div>

        <form onSubmit={handleSubmit}>
         <label htmlFor="projectName">Enter Project Name:</label> 
         <input type="text" name='projectName' value={projectNameInput} onChange={(e)=>setProjectNameInput(e.target.value)} />
         <label htmlFor="textArea"></label>
          <textarea name="textArea" id="" width='auto' height='auto' value={userInput} onChange={(e)=>setUserInput(e.target.value)}  required></textarea>
          <input type="submit" />
        </form>

    </div>
    <div className='main'>
  
    {projects && projects.length>0?
    (<>
    {projects.map((project)=>(
      <>
      <p>{project.name}     </p>
      {project.tasks.map((item)=>
      <>

      <li>
        <button onClick={()=>toggleTaskCompletion(project.id,item.id)}>
        {item.completed?
      <p style={{color:'blue'}}>{item.word}</p>  
      :<p>{item.word}</p>}
        </button>
      </li>
      </>
      )}

      </>
    ))}
    </>)
    :    
    (<>Nothing to see here</>)
    }
  
    </div>
    </>
  )
}
export default App