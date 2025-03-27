import { useState } from "react"
import analyzePdf from "../../trying"

function GetFile(){
  const [selectedFile,setFile] = useState(null);

  const onFileChange = (event)=>{
    event.preventDefault()
    setFile(event.target.files[0])
  }
  const onFileUpload = (e)=>{
    e.preventDefault()
    if(!selectedFile){
      alert('please select a file first')
      return
    }

    const formData = new FormData()
    formData.append('myfile',selectedFile,selectedFile.name)
    
  }
  const fileData = ()=>{
    if(selectedFile){
      return(
        <div>
          <h1>{selectedFile.name}</h1>
          <p>{selectedFile.type}</p>
        </div>
      )
    }
    return <h2>Select a file please</h2>
  }
  return <>
  <form onSubmit={onFileUpload}>
   <input type="file" onChange={(e)=>onFileChange(e)} /> 
   <button type="submit">Submit</button>
  </form> 
  {fileData()}
  </>
}
export default GetFile