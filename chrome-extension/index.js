let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
let leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    
    renderLeads(myLeads)
}

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    renderLeads(myLeads)
})
// const tabs = [
//     {url: "https://www.linkedin.com/in/per-harald-borgen/"}
// ]
tabBtn.addEventListener("click",()=>{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        renderLeads(myLeads)
        
    })
    
})
deleteBtn.addEventListener("dblclick",()=>{
    localStorage.clear()
    myLeads = []
   renderLeads(myLeads)
    

})

function renderLeads(arr) {
    let listItems = ""
    for (let i = 0; i < arr.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${arr[i]}'>
                    ${arr[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems  
}
