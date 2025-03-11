import useListStore from "../store/useListStore";
import ToC from "./Task_Items";
function List_Projects({projects}){

return<>
<h2>Projects</h2>
{projects?(<>
    <h2>{projects.name}</h2>
    
    {projects.task.map((x)=>{
        return <>
        <ToC item={x.id}/> 
        </>
    })}
</>):<>We are</>}
</>
}