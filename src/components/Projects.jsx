import { useState,useEffect } from "react";
import useListStore from "../store/useListStore";
function List_Projects({projects}){
let {toggleTaskCompletion,deleteProject,completeAll,resetAll} = useListStore()
let {completed, setCompleted} = useState([])
let {progress, setProgress} = useState([])


const handleDelte = (projectID)=>{
  deleteProject(projectID)
}

// useEffect(()=>{
//   console.log(projects)
// },[projects])
return<>
    {projects && projects.length>0?    
    (<>

    {projects.map((project,id)=>(
      <div key={project.id}className='project' style={{marginTop:'2em'}}>
        <h2 >{projects[id].tasks.filter(x=>x.completed).length}/{projects[id].tasks.length}</h2>
        <h3 >{project.name}</h3>
      <button onClick={()=>completeAll(project.id)}>complete</button>

      <button onClick={()=>resetAll(project.id)}>reset</button>
      {project.tasks && project.tasks.length>0?
      project.tasks.map((item)=>
       <div key={item.id}> 
        {item.children && item.children.length>0?(
          <div>
          <li>
        <button  className={`todo_items_left ${item.completed? 'item_completed':''}`}onClick={()=>toggleTaskCompletion(project.id,item.id)}>
      <p>{item.number}{item.word}</p>
        </button>
      </li>
      {item.children.map((ele)=>
      <div key={ele.id}>
          <li>
        <button  className={`todo_items_left ${ele.completed? 'item_completed':''}`}onClick={()=>toggleTaskCompletion(project.id,ele.id)}>
      <p>{ele.number}{ele.word}</p>
        </button>
      </li>
        </div> 
      )}
          </div>
        ):(
        <div key={item.id}>
          <li >
        <button style={{marginLeft:`${item.depth * 20}px`}} className={`todo_items_left ${item.completed? 'item_completed':''}`}onClick={()=>toggleTaskCompletion(project.id,item.id)}>
      <p>{item.number}{item.word}</p>
        </button>
      </li>
        </div>
        )  
      }
      </div>
        )

      :<>You haven't Started Any projects yet</>

    }

      <button onClick={()=>handleDelte(project.id)}>Delete the Project</button>
      </div>
    ))}

    </>)
    :    
    (<>Nothing to see here</>)
    }
    </>
}
export default List_Projects