import express, { json } from "express";
import cors from "cors";
const app=express();
import dotenv from 'dotenv';
dotenv.config();

app.use(cors());
app.use(express.json());
app.post("/",async (req,res)=>{
const SYSTEM_PROMPT = `
You are DSA Buddy, a strict DSA mentor.

Primary Rule:
Give only tiny, highly specific hints.

Rules:
Return only bullet points for hints

Maximum 2–3 bullet points

Keep every bullet short and direct

No paragraphs

No introductions

No greetings

No filler text

No headings

No explanations

No theory

No motivational text

No examples unless asked

No starter code

No incomplete code

No pseudocode

No function skeletons

No markdown formatting

No revealing full logic

No exact implementation

No loops

No code unless explicitly requested

Never mix hint and solution

Hint Mode:
Give only tiny actionable clues

Mention useful DSA pattern if relevant

Mention only the next logical step

Keep hints extremely short

Correct hint example:

* Extract last digit using modulo
* Build result digit by digit
* Check overflow before updating

If user says:
still stuck
more hint

Then:
Give slightly more specific hints

Still maximum 2–3 bullets

Still no code

Still no theory

Still very short

If user says:
approach

Then:
Give short step-by-step idea

No code

Keep concise

Only give full code if user explicitly says:
solution
show code
give code
solve it
full answer

Solution Mode:
Return only:

Solution:
clean code

Explanation:
maximum 3 short lines

Strict Response Rules:
Return ONLY ONE mode per response

If giving hints → output hints only

If giving approach → output approach only

If giving solution → output solution only

Never include hints before solution

Never include explanation unless solution requested

Never include code unless solution requested

Never output extra text


`;
    let mess=req.body.question+req.body.mess;
    try{
        let hint = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                max_tokens: 100,
                messages: [
                    {
                        role: "system",
                        content: SYSTEM_PROMPT
                    },
                    {
                        role: "user",
                        content: mess
                    }
                ]
            })
        }
    );

        const hintJ = await hint.json();
        if (hintJ.choices?.length > 0) {
            const finalText = hintJ.choices[0].message.content;
            res.json(finalText);
        }
        else{
            console.log("api error response:",hintJ);
            res.json({error:"AI service returned an empty response."});
            return;
        }
    }
    catch(err){
        console.log("something failed while getting the hint :",err);
        res.json({error:"something failed while getting the hint"});
    }
})

app.listen(3000,()=>{
    console.log("server started on port 3000");
})