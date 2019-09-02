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
const dataPanel = document.getElementById('data-panel')
const searchInput = document.getElementById('search-input')
const searchButton = document.getElementById('search-Button')
var $table = $('#table')

const freezer1 = [] //4度冰箱
const freezer2 = [] //-20冰箱
const freezer3 = [] //-80冰箱
const dryingBox = [] //乾燥箱
const liquidNitrogen = [] //液態氮桶
const medicalCupboard = [] //藥品櫃
const hood = [] //化學抽風櫃
const cellFreezer = [] //細胞房冰箱



getDocToArray('4°C冰箱', freezer1)
getDocToArray('-20°C冰箱', freezer2)
getDocToArray('-80°C冰箱', freezer3)
getDocToArray('藥品乾燥箱', dryingBox)
getDocToArray('液態氮桶', liquidNitrogen)
getDocToArray('藥品櫃', medicalCupboard)
getDocToArray('化學抽風櫃', hood)
getDocToArray('細胞房冰箱', cellFreezer)


$(function () {
  console.log('延遲一秒')
  setTimeout('creatSortingTable(freezer1)', 1000); //延遲1秒
})




//監聽搜尋按鈕
searchButton.addEventListener('click', (event) => {
  let totalItem = freezer1.concat(freezer2, freezer3, dryingBox, liquidNitrogen, medicalCupboard) //合併所有項目供搜索

  clearTableContent('search') //清空原有欄位轉為搜尋用欄位
  let results = []

  const regex = new RegExp(searchInput.value, 'i') //無視大小寫的正規表達式

  results = totalItem.filter(totalItem => totalItem.name.match(regex)) //用filter寫入ture至result
  creatSortingTable(results) //渲染內容
})


//監聽list, 更動active項目, 取得類型ID, 傳入creatSortingTable
listPanel.addEventListener('click', (event) => {
  if (event.target.classList.contains('list-group-item')) {
    areaActive(event)
    let areaId = event.target.dataset['areaid']
    clearTableContent()

    switch (areaId) {
      case areaId = 'freezer1':
        console.log('freezer1!')
        creatSortingTable(freezer1)
        break;
      case areaId = 'freezer2':
        creatSortingTable(freezer2)
        break;
      case areaId = 'freezer3':
        creatSortingTable(freezer3)
        break;
      case areaId = 'dryingBox':
        creatSortingTable(dryingBox)
        break;
      case areaId = 'liquidNitrogen':
        creatSortingTable(liquidNitrogen)
        break;
      case areaId = 'medicalCupboard':
        creatSortingTable(medicalCupboard)
        break;
      case areaId = 'hood':
        creatSortingTable(hood)
        break;


      default:
        break;
    }

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

function creatSortingTable(data) {
  $(function () {
    $('#table').bootstrapTable({
      data: data
    })
  })
}

function clearTableContent(mode) { //搜尋模式要多area欄位
  if (mode === 'search') {
    let tableContent = `
           <table id="table" data-height="100%" data-sort-stable="true" data-show-columns="true" data-pagination="true"
            data-side-pagination="client" data-filter-control="true">
    <thead>
      <tr>
        <th data-field="name" data-sortable="true">名稱</th>
        <th data-field="serialNumber" data-sortable="true">流水號</th>
        <th data-field="date" data-sortable="true">日期</th>
        <th data-field="resourse" data-sortable="true">來源</th>
        <th data-field="price" data-sortable="true">價格</th>
        <th data-field="quantity" data-sortable="true">數量</th>
        <th data-field="area" data-sortable="true">區域</th>
        <th data-field="location" data-sortable="true">位置</th>
        <th data-field="user" data-sortable="true">登記人</th>
      </tr>
    </thead>
  </table>
`
    dataPanel.innerHTML = tableContent
  } else {
    let tableContent = `
           <table id="table" data-height="100%" data-sort-stable="true" data-show-columns="true" data-pagination="true"
            data-side-pagination="client" data-filter-control="true">
    <thead>
      <tr>
        <th data-field="name" data-sortable="true">名稱</th>
        <th data-field="serialNumber" data-sortable="true">流水號</th>
        <th data-field="date" data-sortable="true">日期</th>
        <th data-field="resourse" data-sortable="true">來源</th>
        <th data-field="price" data-sortable="true">價格</th>
        <th data-field="quantity" data-sortable="true">數量</th>
        <th data-field="location" data-sortable="true">位置</th>
        <th data-field="user" data-sortable="true">登記人</th>
      </tr>
    </thead>
  </table>
`
    dataPanel.innerHTML = tableContent
  }

}