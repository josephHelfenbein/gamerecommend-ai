import OpenAI from "openai";
import { NextApiRequest, NextApiResponse } from 'next';
const openai = new OpenAI();

export default async function handler(
    req:NextApiRequest, res:NextApiResponse
) {
    const {prompt} = req.body;
    try{
        const result = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {role: "system", content: "Take in the user input as the name of a videogame. Give the top 5 videogames the user would like if they liked the input videogame, and put the results in JSON form. Please don't write any extra text. Make the JSON format be 'games', and each game have 'name' and 'reasons', the reasons being an array with exactly 5 strings. Don't include the leading and ending ```json and ```, just have the json in plaintext."},
                {role:"user", content:`${prompt}`},
            ],
        });
        res.status(200).json(result.choices[0].message.content);
    } catch(error){
        console.error('Error in API:', error);
        res.status(500).json({message:'An error occured while processing the request.', error: error});
    }
}