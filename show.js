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

var db = firebase.firestore()
//上述為google firebase提供


const listPanel = document.getElementById('area-lists')
const dataPanel = document.getElementById('data - Panel')

const freezer1 = [] //4度冰箱
const freezer2 = [] //-20冰箱
const freezer3 = [] //-80冰箱
const dryingBox = [] //乾燥箱
const liquidNitrogen = [] //液態氮桶

let freezer4 = [{
  area: "-80°C冰箱",
  date: "2019-08-08",
  location: "BOX255",
  name: "Eco72I",
  price: "1520",
  quantity: "2",
  resourse: "Thermo",
  user: "Eva",
}]

getDocToArray('4°C冰箱', freezer1)
getDocToArray('-20°C冰箱', freezer2)
getDocToArray('-80°C冰箱', freezer3)
getDocToArray('藥品乾燥箱', dryingBox)
getDocToArray('液態氮桶', liquidNitrogen)


var $table = $('#table')

function creatSortingTable(data) {
  $(function () {
    $('#table').bootstrapTable({
      data: data
    })
  })
}




//監聽list, 更動active項目, 取得類型ID, 傳入filterByGenres
listPanel.addEventListener('click', (event) => {
  if (event.target.classList.contains('list-group-item')) {
    areaActive(event)
    let areaId = event.target.dataset['areaid']
    console.log(areaId)

  }
})

//實現左側清單加上消除active的class
function areaActive(event) {
  let areaArray = document.querySelectorAll('.list-group-item')
  for (let i = 0; i < areaArray.length; i++) {
    areaArray[i].classList.remove('active')
  }
  event.target.classList.add('active')
}


//把collection的doc寫入array中
function getDocToArray(collectionName, arrayName) {
  db.collection(collectionName).get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // console.log(doc.id, " => ", doc.data())
      arrayName.push(doc.data())
    });
  });
}