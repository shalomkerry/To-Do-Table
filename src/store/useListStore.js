import { create } from "zustand";
const  useListStore = create((set)=>({
    projects :[],
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
            return{
                
                projects:[...state.projects,state.currentProject],
                currentProject:{id:'',name:"",tasks:[]}
            }
        }),

     toggleTaskCompletion: (projectId,taskId) =>
    set((state) => ({
            projects:state.projects.map((project)=>
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
            ),
       deleteProject:(projectId)=>
        set((state)=>({
            projects:state.projects.filter((item)=>String(item.id)!==String(projectId))
        })) 
     })),

        completeAll:(projectId)=>
            set((state)=>({
                projects:state.projects.map((project)=>{
    return (String(project.id)===String(projectId)?
                    {
                        ...project,
                        tasks:project.tasks.map((task)=>({
                           ...task,completed:!task.completed
                        
                        })
                        )
                    }:project
                )})
            })),

}))
export default useListStore