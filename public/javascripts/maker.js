import AuthLogic, { logout } from "./authLogic.js"
import { getAuth } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js"
import { app } from '/javascripts/firebase.js'

const authLogic = new AuthLogic()//사용자 정의 클래스
const auth = getAuth(app) //AuthLogic생성자 함수 선언된 전변

const logoutBtn = document.querySelector('#logout')
logoutBtn.addEventListener('click', async()=>{
    await logout(authLogic.getUserAuth())
    window.localStorage.clear()
    window.location.href= '/'
})