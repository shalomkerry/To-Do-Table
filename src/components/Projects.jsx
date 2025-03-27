import { useEffect } from "react";
import useListStore from "../store/useListStore";

function List_Projects({projects}){
let {toggleTaskCompletion,deleteProject,completeAll} = useListStore()
const handleDelte = (projectID)=>{
  deleteProject(projectID)
}
useEffect(()=>{
  console.log(deleteProject)
},[projects])
return<>

    {projects && projects.length>0?
    
    (<>
    {projects.map((project)=>(

      <div key={project.id}className='project' style={{marginTop:'2em'}}>
        <h3>{project.name}</h3>
      <button onClick={()=>completeAll(project.id)}>this</button>
      {project.tasks && project.tasks.length>0?
      project.tasks.map((item)=>
        <>
        
          <li key={item.id}>
        <button className={`todo_items_left ${item.completed? 'item_completed':''}`}onClick={()=>toggleTaskCompletion(project.id,item.id)}>
      <p >{item.number}{item.word}</p>
        </button>
      </li>

        </>)

      :<>nothing</>

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