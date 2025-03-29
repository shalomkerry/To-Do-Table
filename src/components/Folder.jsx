import { useState } from "react"
import analyzePdf from "../../trying"

function GetFile(){
  const [selectedFile,setFile] = useState(null);
  const [fileName, setFileName] = useState()
  const [fileContent, setFileContent] = useState()

  const onFileChange = (event)=>{
    event.preventDefault()
    setFile(event.target.files[0])

  }
  const  onFileUpload = async (e)=>{
    e.preventDefault()
    if(!selectedFile){
      alert('please select a file first')
      return
    }
    const formData = new FormData()
    formData.append('file',selectedFile)

    const uploadResponse = await fetch('http://localhost:3000/upload',{
      method:"POST",
      body:formData
    })
    const uploadData = await uploadResponse.json()
    const fileResponse = analyzePdf(selectedFile)
  }
  const fileData = ()=>{
    if(selectedFile){
      return(
        <div>
          <h1>{selectedFile.name}</h1>
        </div>
      )
    }
    return <h2>Select a file please</h2>
  }
  return <>
  <form onSubmit={onFileUpload}>
   <input type="file" onChange={(e)=>onFileChange (e)} /> 
   <button type="submit">Submit</button>
  </form> 
  {fileData()}
  </>
}
export default GetFile