import { create } from "zustand";
const  useListStore = create((set)=>({
    projects :[],
    currentProject: {name:"",tasks:[]},
    
    setName:(name)=>
        set((state)=>({
            currentProject:{...state.currentProject,name},
        })),
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
                currentProject:{name:"",tasks:[]}
            }
        }),
}))
export default useListStore