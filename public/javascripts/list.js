import { app } from '/javascripts/firebase.js'
import { getDatabase, onValue, ref } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-database.js"

const db = getDatabase(app)
const btnMaker = document.querySelector('#btnMaker')
const params = new URLSearchParams(window.location.search)
const id = params.get('id')

// 명함만들기
if (btnMaker) {
  btnMaker.addEventListener('click', () => {
    window.location.href = `/maker?id=${id}`;
  })
}

// db불러오기
onValue(ref(db, `card/${id}`), (snapshot) => {
  
  const list = document.querySelector('.nameCardList ul')

  let cards = [];

  snapshot.forEach(childSnapshot => {
    cards.push(childSnapshot);
  });

  cards.reverse().forEach(childSnapshot => {
    const card = childSnapshot.val();
    card.key = childSnapshot.key;
    cards.push(card);

    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `/view?id=${id}&key=${childSnapshot.key}`;
    a.textContent = card.cardTit || card.cardName || '카드네임이 없습니다.';
    li.appendChild(a);
    list.appendChild(li);
  });

})