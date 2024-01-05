const loginHandler= async(e)=>{
    e.preventDefault()

    const username=document.querySelector("#username-input").value
    const password=document.querySelector("#password-input").value

    const response =await fetch("/api/users/login",{
        method:'POST',
        body:JSON.stringify({
            username:username,
            password:password
        }),
        headers: { 'Content-Type': 'application/json'}
    })

    if(response.ok){
        console.log("response 200");
        document.location.replace('/dashboard')
    }else{
        alert('Failed to Login')
    }
}

document
.querySelector(".login-form")
.addEventListener("submit", loginHandler)