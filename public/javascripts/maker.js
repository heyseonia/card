import { getDatabase, push, ref, set } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-database.js";
import { app } from './firebase.js';

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

console.log(id);

const colorPicker = document.getElementById('color-picker');
let cardColor = ''
colorPicker.addEventListener('input', function () {
    console.log('Selected color:', this.value);
    cardColor = this.value
});

const preView = () => {
    const file = document.querySelector('#cardPhoto').files[0]; // file 선언!
    
    const userData = {
        uid: id,
        cardTit: document.querySelector('#cardTit').value,
        cardName: document.querySelector('#cardName').value,
        cardDir: document.querySelector('#cardDir').value,
        cardEmail: document.querySelector('#cardEmail').value,
        cardAdd: document.querySelector('#cardAdd').value,
        cardPhone: document.querySelector('#cardPhone').value,
        cardSns: document.querySelector('#cardSns').value,
        cardColor: cardColor,
        cardPhoto: '' // Base64 문자열로 채울 예정
    };

    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            userData.cardPhoto = reader.result; // Base64
            localStorage.setItem('previewData', JSON.stringify(userData));
            window.location.hash = 'preview'; // 이 시점에서 해시 변경
            toggleView(); // base64 변환 후 실행해야 이미지가 뜸
        };
        reader.readAsDataURL(file); 
    } else {
        localStorage.setItem('previewData', JSON.stringify(userData));
        window.location.hash = 'preview';
        toggleView();
    }
};


// 해시 기반으로 뷰를 토글하는 함수
function toggleView() {
    const hash = window.location.hash;
    const maker = document.querySelector('.maker');
    const preview = document.querySelector('.preview');

    if (hash === '#preview') {
        preview.classList.remove('none');
        maker.classList.add('none');

        // 미리보기 데이터 렌더링
        const data = JSON.parse(localStorage.getItem('previewData'));
        if (data) {
            document.querySelector('#viewTit').textContent = data.cardTit;
            document.querySelector('#viewName').textContent = data.cardName;
            document.querySelector('#viewDir').textContent = data.cardDir;
            document.querySelector('#viewEmail').textContent = data.cardEmail;
            document.querySelector('#viewPhone').textContent = data.cardPhone;
            document.querySelector('#viewAdd').textContent = data.cardAdd;
            document.querySelector('#viewSns').textContent = data.cardSns;
            cardColor = data.cardColor
            document.querySelector('.nameCardPreView').style.cssText = `background: linear-gradient(${data.cardColor} 30%, #fff 30%);`
            document.querySelectorAll('.text').forEach(el => {
                el.style.cssText = `color: ${data.cardColor};`;
            });
        
            // 이미지 렌더링
            const img = document.querySelector('#viewPhoto');
            if (img && data.cardPhoto) {
                img.src = data.cardPhoto;
            }
        }
    } else {
        preview.classList.add('none');
        maker.classList.remove('none');
    }
}

// 최초 페이지 로딩 시 해시에 따라 초기화
document.addEventListener('DOMContentLoaded', () => {
    toggleView();
});

// 해시가 바뀔 때마다 자동으로 화면 전환
window.addEventListener('hashchange', () => {
    toggleView();
});

// 버튼 이벤트 연결
const btnPreview = document.querySelector('#btnPreview');
if (btnPreview) {
    btnPreview.addEventListener('click', preView);
}

const db = getDatabase(app)

// maker confirm
const confirm = async(e) =>{
    e.preventDefault()
    const data = JSON.parse(localStorage.getItem('previewData'));
    const userData = {
        uid: id,
        cardTit: data.cardTit,
        cardName: data.cardName,
        cardDir: data.cardDir,
        cardEmail: data.cardEmail,
        cardAdd: data.cardAdd,
        cardPhone: data.cardPhone,
        cardSns: data.cardSns,
        cardPhoto: data.cardPhoto,
        cardColor: data.cardColor
    }
    try {
        const newCardRef = push(ref(db, `card/${id}/`)); // 고유 경로 생성
        await set(newCardRef, userData); 
        alert('명함이 생성되었습니다.');
        window.location.href = `/list?id=${id}`;
    } catch (error) {
        console.error('명함 생성 중 오류 발생:', error);
        alert('오류가 발생했습니다.');
    }
}

const btnConfirm = document.querySelector('#btnConfirm');
if (btnConfirm) {
    btnConfirm.addEventListener('click', confirm);
}