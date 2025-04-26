
            const completeAllTasks = (tasks)=>{
                    return tasks.map((task)=>{
                        let updated = {...task,completed:true};
                        if(task.children && task.children.length>0){
                            updated.children = completeAllTasks(task.children)
                        }
                        return updated
                    }) 
                    }


            const uncompleteAllTasks = (tasks)=>{
                    return tasks.map((task)=>{
                        let updated = {...task,completed:false};
                        if(task.children && task.children.length>0){
                            updated.children = completeAllTasks(task.children)
                        }
                        return updated
                    }) 
                    }
import { create } from "zustand";

const loadTask=()=>{
    const savedProject = localStorage.getItem('project')
    return savedProject?JSON.parse(savedProject):[]
}
const  useListStore = create((set)=>({
    projects :loadTask(),
    currentProject: {id:'',name:"",tasks:[]},
    
    setName:(name)=>
        set((state)=>({
            currentProject:{...state.currentProject,name},
        })),

    setId:()=>
        set((state)=>{
        return{
            currentProject:{
                ...state.currentProject,
                id:Date.now()+Math.random(),
            },
}}),

    saveTaskList:(task)=>
        set((state)=>{
        return{
            currentProject:{
                ...state.currentProject,
                tasks:[...state.currentProject.tasks,task]
            },
        };   
        }),

    saveProjects:()=>
        set((state)=>{
            if(!state.currentProject.name.trim() || state.currentProject.length === 0)
                return state

            const updatedProject = [...state.projects,state.currentProject] 
            localStorage.setItem('project',JSON.stringify(updatedProject))
            
            return{
                projects:updatedProject,
                currentProject:{id:'',name:"",tasks:[]}
            }

        }


    ),

     toggleTaskCompletion: (projectId,taskId) =>
    set((state) => {

const updateTasks = (tasks)=>{
            return tasks.map((task)=>{
                if(task.id===taskId){
                const newCompleted = !task.completed
                const updateTask = {
                ...task,
                completed:newCompleted,
                }                    
                if(!newCompleted && (task.children &&task.children.length>0)){
                    updateTask.children = uncompleteAllTasks(task.children)
                    return updateTask
                }
                if(newCompleted && (task.children &&task.children.length>0)){
                   updateTask.children = completeAllTasks(task.children)
                   return updateTask
                }
               return updateTask                }

            if(task.children){
                const updatedChildren = updateTasks(task.children)
                let allCompleted = updatedChildren.every(child=>child.completed === true)
                if(allCompleted){

                    if(task.id===taskId){
                        task.completed = true
                    }
                }else if(!allCompleted){
                    if(task.id===taskId){
                    task.completed = false
                    }
                }
                return{
                    ...task,
                    children:updatedChildren,
                }
            }

                return task
            })
        }

        let updatedProjects = state.projects.map((project)=>{
            if(project.id===projectId){
                return {
                    ...project,
                    tasks:updateTasks(project.tasks)
                }
            }
            return project
        })
        localStorage.setItem('project',JSON.stringify(updatedProjects))
        return {projects:updatedProjects}
     }),

       deleteProject:(projectId)=>
        set((state)=>{
            const updatedProject = state.projects.filter((item)=>String(item.id)!==String(projectId)) 
            localStorage.setItem('project',JSON.stringify(updatedProject))

            return{
                projects:updatedProject,
            }
        }), 
        
        completeAll:(projectId)=>
            set((state)=>{

            const completeAllTasks = (tasks)=>{
                    return tasks.map((task)=>{
                        let updated = {...task,completed:true};
                        if(task.children && task.children.length>0){
                            updated.children = completeAllTasks(task.children)
                        }
                        return updated
                    }) 
                    }
               const updatedProject = state.projects.map((project)=>{
            return (String(project.id)===String(projectId)?
                    {
                        ...project,
                        tasks:completeAllTasks(project.tasks)
                        
                    }:project
                )})


                localStorage.setItem('project',JSON.stringify(updatedProject))
                return{
                    projects:updatedProject
                }
            }),


        resetAll:(projectId)=>
            set((state)=>{

            const resetTasks = (tasks)=>{
                return tasks.map((task)=>{
                    let updated = {...task,completed:false};
                    if(task.children&&task.children.length>0){
                        updated.children = resetTasks(task.children)
                    }
                    return updated
                })
            }
               const updatedProject = state.projects.map((project)=>{
    return (String(project.id)===String(projectId)?
                    {
                        
                        ...project,
                        tasks:resetTasks(project.tasks)
                    }:project
                )})
                localStorage.setItem('project',JSON.stringify(updatedProject))
                return{
                    projects:updatedProject
                }
            }),
        progress: '',

        setProgress: ()=>
            set((state)=>{
                state.progress
            }),
}))
export default useListStore