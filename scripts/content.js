chrome.runtime.onMessage.addListener((req,sender,res)=>{
    if(req.action!="getProblem"){
        return;
    }
    if(req.action=="getProblem"){
        if (!window.location.href.includes("/problems/")) {
            sendResponse({ error: "You aren't viewing a specific LeetCode problem right now!" });
            return true;
        }
        try{
        let question=document.querySelector('[data-track-load="description_content"]').innerText;
        res({problem:question});
        }
        catch(err){
            console.log(err);
        }
        return;
    }
})