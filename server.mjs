import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { error } from 'console';
import cron from 'node-cron'
import { fileURLToPath } from 'url';

const app = express()
const PORT  = 3000
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }})

const upload = multer({
    storage,
    limits:{fileSize:10 * 1024 * 1024}
})

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

// let __filename = fileURLToPath(import.meta.url)
// const __direname = path.dirname(__filename)

// let uploadsDir = path.join(__direname,'uploads')

// cron.schedule('* * * * * *',()=>{
//     fs.readdir(uploadsDir,(err,files)=>{
//         if(err) return console.error('Error reading directory', err)
//         files.forEach(file=>{
//     const filepath = path.join(uploadsDir,file)
//     fs.stat(filepath,(err,stats)=>{
//         if(err) return console.error('Error loading file',err)
//         const now = Date.now()
//         const age = now - stats.mtimeMs

//         if(age>24 * 60 * 60 * 1000){
//             fs.unlink(filepath,err=>{
//                 if(err) console.error('Error deleting file',err)
//                 else console.log(`Deleted ${file}`)
//             })
//         }
//     })
// })
//     })
// })

app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`)
})