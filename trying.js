import { GoogleGenerativeAI } from "@google/generative-ai";
async function analyzePdf(file){
// if(file.type!=='application/pdf'){
// console.log(readOfficeFile(file))
// }
const API = import.meta.env.VITE_APP_GOOGLE_API_KEY
const genAI = new GoogleGenerativeAI(`${API}`);

const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });


const response = await fetch(`http://localhost:3000/read-file/${file.name}`)
try{
if(!response.ok) {
    throw new Error("File Nott Found")
}
    const data = await response.json()
    const raw = data.content;
    const result = await model.generateContent([
    {
        inlineData: {
            data: raw,
            mimeType: "text/plain",
        },
    },
    `Extract all the chapters and sub-chapters from the provided course outline in the order they are listed. For each chapter, include the number before the topic, but if there is no number before a topic, skip it. The chapters should be numbered sequentially, and for sub-chapters, use a hierarchical numbering system (e.g., 1.1, 1.2, 2.1, etc.). Do not indent the topics or use any asterisks for marking the chapters and sub-chapters. ENSURE that each number is followed by a dot and then the name of the topic or subtopic (e.g., "1. Introduction", "1.1. Overview", "1.1.1. Subptopi", etc.). Leave the instruction just give me the answer`,

]);
const answer = result.response.text()
return answer;
}
catch (error){
    console.log("API Request failed:", error)
    return {error:'Failed to fetch data. Please try again later'}
}

}


export default analyzePdf;