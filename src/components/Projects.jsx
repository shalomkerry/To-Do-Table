import { useState,useEffect } from "react";
import useListStore from "../store/useListStore";
function List_Projects({projects}){
let {toggleTaskCompletion,deleteProject,completeAll,resetAll} = useListStore()
let {completed, setCompleted} = useState([])
let {progress, setProgress} = useState([])


const handleDelte = (projectID)=>{
  deleteProject(projectID)
}

const handleToggle = (taskId)=>{
  let buttons = document.querySelectorAll(`.toggle-btn[data-task-id="${taskId}"]`)
  let allToggles = document.querySelectorAll(`.item-children[data-task-id="${taskId}"]`)

  allToggles.forEach(toggle=>{
    const isActive = toggle.classList.toggle('active');
    buttons.forEach(btn=>{
      btn.textContent =isActive ? 'Hide SubTopics':'Show SubTopics'
    })
  })
}

return<>
    {projects && projects.length>0?    
    (<>

    {projects.map((project,id)=>(
      <div key={project.id}className='project'>

        
        <div className="countProgress">
        <div className="projectNameContainer"><h3>{project.name}</h3></div>
        <div className="progressCounterContainer">
          <p>{projects[id].tasks.filter(x=>x.completed).length}/{projects[id].tasks.length}</p>
          </div>
        </div>
        
        <div id='myProgress'>
        <div className="myBar" style={{width:`${projects[id].tasks.filter(x=>x.completed).length*100/projects[id].tasks.length}%`}}>
            <p></p>
          </div>
        </div>
        <div className="buttons">
    <button onClick={()=>completeAll(project.id)} className='project-btn complete-btn'>complete</button>
    <button onClick={()=>resetAll(project.id)} className="project-btn reset-btn">reset</button>
    <button onClick={()=>handleDelte(project.id)} className="project-btn delete-btn">delete</button>
        </div>
      {project.tasks && project.tasks.length>0?
      project.tasks.map((item)=>
       <div className='todo-item' key={item.id}> 
        {item.children && item.children.length>0?(
          <div>
            <div className="list-item">
        <button  className='list-Button' onClick={()=>toggleTaskCompletion(project.id,item.id)}>
      <p className={` ${item.completed? 'item_completed':''} todo_items_left`}><span className={`change ${item.word.length>50?'break':''}`}>{item.number}{item.word}</span></p>
        </button>
        <button className= {`toggle-btn project-btn`} data-task-id={`${item.id}`} onClick={()=>handleToggle(item.id)}>Show Sub-topics</button>
            </div>
      <div className={`item-children `} data-task-id={`${item.id}`}>
      {item.children.map((ele)=>
       <div className="list-item">
       <button  className='list-Button' onClick={()=>toggleTaskCompletion(project.id,ele.id)}>
      <p className={`${ele.completed? 'item_completed':''} todo_items_left inner-children`}><span className="change">{ele.number}{ele.word}</span></p>
        </button>
        </div>
      )}
      </div>
          </div>
        ):(
    <div key={item.id}>
        <button style={{marginLeft:`${item.depth * 20}px`}} onClick={()=>toggleTaskCompletion(project.id,item.id)}>
      <p className={`todo_items_left ${item.completed? 'item_completed':''}`}><span className={`change ${item.word.length>20?'break':''}`}>
        {item.number}{item.word}
        </span></p>
        </button>
    </div>
        )  
      }
      </div>
        )

      :<>You haven't Started Any projects yet</>

    }
      </div>
    ))}

    </>)
    :    
    (<>Nothing to see here</>)
    }
    </>
}
export default List_Projects