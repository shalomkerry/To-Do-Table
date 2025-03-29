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
          let updatedProject = state.projects.map((project)=>
            project.id === projectId?
          {
                ...project,
            tasks:project.tasks.map((task)=>
                task.id==taskId?
                {
                ...task,completed:!task.completed
                }:task
                ),
            }
            :project
            )
            localStorage.setItem('project',JSON.stringify(updatedProject))
            return{
                projects:updatedProject
            }
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
               const updatedProject = state.projects.map((project)=>{
    return (String(project.id)===String(projectId)?
                    {
                        
                        ...project,
                        tasks:project.tasks.map((task)=>({
                           ...task,completed:true
                        })
                        )
                    }:project
                )})
                localStorage.setItem('project',JSON.stringify(updatedProject))
                return{
                    projects:updatedProject
                }
            }),


        uncompleteAll:(projectId)=>
            set((state)=>{
               const updatedProject = state.projects.map((project)=>{
    return (String(project.id)===String(projectId)?
                    {
                        
                        ...project,
                        tasks:project.tasks.map((task)=>({
                           ...task,completed:false
                        })
                        )
                    }:project
                )})
                localStorage.setItem('project',JSON.stringify(updatedProject))
                return{
                    projects:updatedProject
                }
            }),
}))
export default useListStore