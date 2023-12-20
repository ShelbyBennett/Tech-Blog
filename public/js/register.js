const registerHandler= async(e)=>{
    e.preventDefault()

    const username=document.querySelector("#name-input").value
    const password=document.querySelector("#pw-input").value

    const response =await fetch("/api/users/",{
        method:'POST',
        body:JSON.stringify({
            username:username,
            password:password
        }),
        headers: { 'Content-Type': 'application/json'}
    })

    if(response.ok){
        document.location.replace('/dashboard')
    }else{
        alert('Failed to Login')
    }
}

document
.querySelector(".register-form")
.addEventListener("submit", registerHandler)