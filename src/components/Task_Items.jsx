import ListItems from "./List_Items";
import useListStore from "../store/useListStore";

function ToC({item,projectName}){
    return<>
       <ol className="todo_list">
        <h2>{projectName}</h2>
        
        {item?(

            item?.map((elem,index)=>(
                <ListItems key={index} item={elem} projectName={projectName}/>
            )
        )
        ):(
            <p>Insert Some things you want to get through</p>
        )
    }

    </ol>
    </>
}
export default ToC