var spinner=document.createElement("div"); 
spinner.setAttribute("id","cover-spin")
var spinnerText=document.createElement("p"); 
spinnerText.innerText = 'Загрузка...'

document.body.appendChild(spinner); 
spinner.appendChild(spinnerText)

function showSpinner() {
  spinner.style.display = 'block'
}

function hideSpinner() {
  spinner.style.display = 'none'
}
