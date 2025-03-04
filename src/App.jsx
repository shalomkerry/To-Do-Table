import { useState } from 'react'
import './App.css'


function App() {

function handleSubmit(e){
  e.preventDefault()
  console.log(task_list)
}

function formatTaskList(list){
  if(Array.isArray(list)){
  let finalList = [];
  for(let i of list){

    console.log(i,i.search(/\bg/))
      finalList.push(i)
  }
return finalList
  }
}

let trying = `1. Whetting Your Appetite
2. Using the Python Interpreter

    2.1. Invoking the Interpreter
        2.1.1. Argument Passing
        2.1.2. Interactive Mode
    2.2. The Interpreter and Its Environment
        2.2.1. Source Code Encoding

3. An Informal Introduction to Python

    3.1. Using Python as a Calculator
        3.1.1. Numbers
        3.1.2. Text
        3.1.3. Lists
    3.2. First Steps Towards Programming

4. More Control Flow Tools

    4.1. if Statements
    4.2. for Statements
    4.3. The range() Function
    4.4. break and continue Statements
    4.5. else Clauses on Loops
    4.6. pass Statements
    4.7. match Statements
    4.8. Defining Functions
    4.9. More on Defining Functions
        4.9.1. Default Argument Values
        4.9.2. Keyword Arguments
        4.9.3. Special parameters
            4.9.3.1. Positional-or-Keyword Arguments
            4.9.3.2. Positional-Only Parameters
            4.9.3.3. Keyword-Only Arguments
            4.9.3.4. Function Examples
            4.9.3.5. Recap
        4.9.4. Arbitrary Argument Lists
        4.9.5. Unpacking Argument Lists
        4.9.6. Lambda Expressions
        4.9.7. Documentation Strings
        4.9.8. Function Annotations
    4.10. Intermezzo: Coding Style
`

let finalList = trying.split('\n').filter(x=>x!='').map(x=>x.trim())
let result = {}
const pattern = /^\s*([\d]+(?:[\.\-\)\:]\d+)*[\.])/g;

finalList.forEach(x=>{
    let patter = x.match(pattern)[0]
result[patter] = x.match(/([^.\d])+/g)
})

let index = Object.keys(result);
let items = Object.values(result);

for(let i = 0; i<items.length;i++){
    console.log(index[i], items[i][0])
}
// console.log(finalList)
let [task_list,add_task_list] = useState('');

// console.log(formatTaskList(finalList))
  return(
    <>
    <div className='cube'>
      <div id='h1--background'>
        <h1>List Task</h1>
        </div>

        <form onSubmit={handleSubmit}>
         <label htmlFor="projectName">Enter Project Name:</label> 
         <input type="text" name='projectName' />
         <label htmlFor="textArea"></label>
          <textarea name="textArea" id="" value={task_list} onChange={(e)=>add_task_list(e.target.value)}   required></textarea>
          <input type="submit" />
        </form>

    </div>
    {
     finalList.map((x)=>(
     <>
     <li className=''>
     <button className='crossOff'></button> {x}
     </li>
     </>)) 
    }
    </>
  )
}

export default App
