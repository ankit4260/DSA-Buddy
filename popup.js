const button=document.querySelector("#btn");
button.addEventListener("click",()=>{
    document.querySelector(".container").innerHTML="<h1>Loading...</h1>";
    let userMess=document.querySelector("#inp").value;
    document.querySelector("#inp").value="";

    chrome.tabs.query({active:true,currentWindow:true},tabs=>{
    chrome.tabs.sendMessage(tabs[0].id,{action:"getProblem"},async response => {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
            document.querySelector(".container").innerHTML = "<h1>Please refresh this tab once to link the extension.</h1>";
            return;
        } 
        if (response?.error) {
            document.querySelector(".container").innerText = response.error;
            return;
        }
        try{
            let hint=await fetch("http://localhost:3000/",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    question:response.problem,
                    mess:userMess
                })
            })
            let hintJ=await hint.json();
            let divEl=document.createElement("div")
            divEl.innerText=hintJ;
            document.querySelector(".container").innerHTML="";
            document.querySelector(".container").appendChild(divEl);
        }
        catch(err){
            console.log(err);
        }
        
    })
    })
}
)
