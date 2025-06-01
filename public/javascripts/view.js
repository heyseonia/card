import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-database.js";
import { app } from './firebase.js';

// const authLogic = new AuthLogic()//사용자 정의 클래스
// const auth = getAuth(app) //AuthLogic생성자 함수 선언된 전변

const db = getDatabase(app)

// maker confirm
const confirm = async(e) =>{
    e.preventDefault()
    const uid = localStorage.getItem('uid')
    const userData = {
        uid: uid,
        cardName: document.querySelector('#cardName').value,
        cardDir: document.querySelector('#cardDir').value,
        cardEmail: document.querySelector('#cardEmail').value,
        cardAdd: document.querySelector('#cardAdd').value,
        cardPhone: document.querySelector('#cardPhone').value,
        cardSns: document.querySelector('#cardSns').value,
        cardPhoto: document.querySelector('#cardPhoto').files[0]
    }
    try {
        await set(ref(db, `card/${uid}`), userData);
        alert('명함이 생성되었습니다.');
        window.location.href = `/view?id=${userId}`;
    } catch (error) {
        console.error('명함 생성 중 오류 발생:', error);
        alert('오류가 발생했습니다.');
    }
}

const btnConfirm = document.querySelector('#btnConfirm');
if (btnConfirm) {
    btnConfirm.addEventListener('click', confirm);
}

