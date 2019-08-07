// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBk5c5PoaiWnNSB-U8ZFHTYsFefIl8hvYI",
  authDomain: "cmrlab.firebaseapp.com",
  databaseURL: "https://cmrlab.firebaseio.com",
  projectId: "cmrlab",
  storageBucket: "cmrlab.appspot.com",
  messagingSenderId: "41326528339",
  appId: "1:41326528339:web:8d9d011d3a527c65"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//上述為google firebase提供


const listPanel = document.getElementById('area-lists')
const freezer1 = [] //4度冰箱
const freezer2 = [] //-20冰箱
const freezer3 = [] //-80冰箱

var db = firebase.firestore()

getDocToArray('4°C冰箱', freezer1)
getDocToArray('-20°C冰箱', freezer2)
getDocToArray('-80°C冰箱', freezer3)

//監聽list, 更動active項目, 取得類型ID, 傳入filterByGenres
listPanel.addEventListener('click', (event) => {
  if (event.target.classList.contains('list-group-item')) {
    areaActive(event)
    let areaId = event.target.dataset['areaid']
    console.log(areaId)

  }
})


function areaActive(event) {
  let areaArray = document.querySelectorAll('.list-group-item')
  for (let i = 0; i < areaArray.length; i++) {
    areaArray[i].classList.remove('active')
  }
  event.target.classList.add('active')
}

function getDocToArray(collectionName, arrayName) {
  db.collection(collectionName).get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // console.log(doc.id, " => ", doc.data())
      arrayName.push(doc.data())
    });
  });
}