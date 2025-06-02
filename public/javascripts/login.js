import AuthLogic, { loginGoogle } from './authLogic.js'
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js"
import { app } from '/javascripts/firebase.js'

const authLogic = new AuthLogic()//사용자 정의 클래스
const auth = getAuth(app) //AuthLogic생성자 함수 선언된 전변

// 로그인이 확일될경우 바로 생성하기
const userId = localStorage.getItem('userId')
if(userId){
  goToLink('list',userId)
}


//구글로그인
const loginBtnGoogle = async() =>{
    console.log('구글로그인클릭!!');
    try{
        const user = await loginGoogle(authLogic.auth, authLogic.googleProvider)
        localStorage.setItem("userId", user.uid)
        localStorage.setItem("email", user.email)
        if(user.uid){
            goToLink('list',user.uid)
        }
    }catch(error){
        console.error('구글로그인 실패',error);
    }
}

//카카오로그인
const loginBtnKakao = async() =>{
    console.log('카카오로그인클릭!!');
}

window.loginBtnGoogle = loginBtnGoogle
window.loginBtnKakao = loginBtnKakao