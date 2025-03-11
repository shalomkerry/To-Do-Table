import useListStore from "../store/useListStore";

function ListItems({item}){
    
let {projects,currentProject,setName,saveTaskList,saveProjects} = useListStore()

    const completeTask = ()=>{
        
        console.log(item.id)
} 

    return <>
    {item?( <>

        <li id={item.id} style= {{marginLeft:`${item.length}em`}} className="todo_item">
            <button className="todo_items_left" onClick={completeTask} >
                
                {item.completed?
                <p style={{color:'blue'}}>{item.number}{item.word}</p>:
            <p>
                {item.number} {item.word}</p>
            }
            </button>

        </li>
        </>):<>something</>
    }

    </>
}
export default ListItems