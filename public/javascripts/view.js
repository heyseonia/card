import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-database.js";
import { app } from './firebase.js';

const db = getDatabase(app)
const params = new URLSearchParams(window.location.search)
const id = params.get('id')
const key = params.get('key')

onValue(ref(db, `card/${id}/${key}`), (snapshot) => {

    let contents = []
    contents = snapshot.val()
    console.log(contents);
    // 데이터바인딩
    document.querySelector('#viewTit').textContent = contents.cardTit || ''
    document.querySelector('#viewName').textContent = contents.cardName || ''
    document.querySelector('#viewDir').textContent = contents.cardDir || ''
    document.querySelector('#viewEmail').textContent = contents.cardEmail || ''
    document.querySelector('#viewEmail').href = 'mailto:'+contents.cardEmail || ''
    document.querySelector('#viewAdd').textContent = contents.cardAdd || ''
    document.querySelector('#viewAdd').href = 'https://www.google.co.kr/maps/place/'+contents.cardAdd || 'https://www.google.co.kr/maps/place/'
    document.querySelector('#viewPhone').textContent = contents.cardPhone || ''
    document.querySelector('#viewPhone').href = 'tel:'+contents.cardPhone || ''
    document.querySelector('#viewSns').textContent= contents.cardSns || ''
    document.querySelector('#viewSns').href = contents.cardSns
    document.querySelector('#viewPhoto').src = contents.cardPhoto || './images/user.png'
})

const btnList = document.querySelector('#btnList');
if (btnList) {
    btnList.addEventListener('click', ()=>{
        window.location.href = `/list?id=${id}`
    });
}

