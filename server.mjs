import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { error } from 'console';

const app = express()
const PORT  = 3000
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }})

const upload = multer({storage})

app.use(cors());

app.post('/upload',upload.single('file'),(req,res)=>{
    if(!req.file){
        return res.status(400).json({error:"No file Uploaded"})
    }
    res.json({
        messages:'File uploaded successfully',
        filename:req.file.originalname
    })
})

app.get("/read-file/:filename",(req,res)=>{
    const {filename} = req.params;
    const filePath = path.join(process.cwd(),'uploads',filename);
    if(!fs.existsSync(filePath)){

        return res.status(404).json({error:"File not found"})
    }

    fs.readFile(filePath,(err,data)=>{
        if(err){
            return res.status(500).json({error:'Error reading file'})
        }
        let base64pdf = Buffer.from(data).toString('base64');
       return res.json({content:base64pdf})
    })
})

app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`)
})