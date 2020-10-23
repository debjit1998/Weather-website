console.log("Client side javascript is loaded");



  const weatherForm = document.querySelector('form')
  const search=document.querySelector('input')
  weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    document.querySelector('#result').textContent="Loading..."
    document.querySelector('#error').textContent=""
    fetch('/weather?location='+location).then((response)=>{
      response.json().then((data)=>{
        if(data.error){
          document.querySelector('#error').textContent="Error: "+data.error;
          document.querySelector('#result').textContent=""
        }else{
          document.querySelector('#result').textContent="temperature: "+data.temperature
          document.querySelector('#error').textContent="feelslike: "+data.feelslike
        }
      })
  })
})
