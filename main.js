let posts = document.querySelector(".posts")
let usersContainer = document.querySelector(".users")

getUsers()

function getFilteredPost(id) {
        let request = new XMLHttpRequest()
        request.open("GET",`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
        request.send();
        request.responseType = "json"
        request.onload = function () {
            if(request.status >= 200 && request.status <= 300) {
                let obj = request.response
                posts.innerHTML = ""
                obj.forEach((e) => {
                    let div = document.createElement("div")
                    let h3 = document.createElement("h3")
                    let p = document.createElement("p")
                    div.className = "post"
                    h3.innerHTML = e.title
                    p.innerHTML = e.body
                    div.appendChild(h3)
                    div.appendChild(p)
                    posts.appendChild(div)
                })
            } else {
                alert("API Not Nound")
            }
        }
}

function getUsers() {
        let request = new XMLHttpRequest()
        request.open("GET",`https://jsonplaceholder.typicode.com/users`)
        request.send();
        request.responseType = "json"
        request.onload = function () {
            if(request.status >= 200 && request.status <= 300) {
                let obj = request.response
                usersContainer.innerHTML = ""
                obj.forEach((e) => {
                    let div = document.createElement("div")
                    let h3 = document.createElement("h3")
                    let p = document.createElement("p")
                    div.className = "user-card"
                    div.setAttribute('data-userid', e.id);
                    h3.innerHTML = e.name
                    p.innerHTML = e.email
                    div.appendChild(h3)
                    div.appendChild(p)
                    usersContainer.appendChild(div)
                })
                let users = usersContainer.children
                for (let i = 0; i < users.length; i++) {
                    let user = users[i];
                    let userId = user.dataset.userid
                    user.addEventListener("click",function () {
                    getFilteredPost(userId);
                    for (let i = 0; i < users.length; i++) {
                        let user = users[i]
                        user.classList.remove("active")
                    }
                    user.classList.add("active")
                    })
                }
            } else {
                alert("API Not Nound")
            }
        }
}