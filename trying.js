import { GoogleGenerativeAI } from "@google/generative-ai";
async function analyzePdf(file){
    console.log(file);
const genAI = new GoogleGenerativeAI("AIzaSyBiGHquYY_De4UHWijj5BuPJm3vnj9TMe4");

const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });

const response = await fetch(`http://localhost:3000/read-file/${file}`)
if(!response.ok) throw new Error("File Nott Found")
    const data = await response.json()
const base64pdf = data.content; 

const result = await model.generateContent([
    {
        inlineData: {
            data: base64pdf,
            mimeType: "application/pdf",
        },
    },
    'Get all the chapters and sub-chapters from these course Outline in the Order they have been listed us. I want the numbers before the name of the topic and if there are subtopics i want you to give them a form of 1.2 and so on. Dont use the Unit for the main numbers just use their number and dont use asterix or anything to mark them.',
]);
// console.log(result.response.text())
return result.response.text()

}
export default analyzePdf;