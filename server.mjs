import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { error } from 'console';

const app = express()
const PORT  = 3000

app.use(cors());

app.get("/read-file/:filename",(req,res)=>{
    const {filename} = req.file.name;
    const filePath = path.join(process.cwd(),'uploads',filename);

    if(!fs.existsSync(filePath)){
        return res.status(404).json({error:"File not found"})
    }

    fs.readFile(filePath,'utf8',(err,data)=>{
        if(err){
            return res.status(500).json({error:'Error reading file'})
        }
        return res.json({content:data})
    })
})

app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`)
})