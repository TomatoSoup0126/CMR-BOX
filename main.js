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
const itemName = document.getElementById('itemName')
const itemResourse = document.getElementById('itemResourse')
const itemPrice = document.getElementById('itemPrice')
const itemQuantity = document.getElementById('itemQuantity')
const itemArea = document.getElementById('itemArea')
const itemDetail = document.getElementById('itemDetail')
const userName = document.getElementById('userName')
const sumitBtn = document.getElementById('sumitBtn')

const inputArray = [itemName, itemResourse, itemPrice, itemQuantity, itemArea, itemDetail, userName]


const freezer1 = [] //4度冰箱
const freezer2 = [] //-20冰箱
const freezer3 = [] //-80冰箱

var db = firebase.firestore()

getDocToArray('4°C冰箱', freezer1)
getDocToArray('-20°C冰箱', freezer2)
getDocToArray('-80°C冰箱', freezer3)


sumitBtn.addEventListener('click', function () {
  if (inputCheck()) {
    alert('欄位有空白!')
  } else {

    storedata()
    for (let i = 0; i < inputArray.length; i++) {
      clearField(inputArray[i])
    }
  }
})

function storedata() {
  let serialNumberInStore = getSerialNumber()

  db.collection(itemArea.value).doc(itemName.value + '_' + serialNumberInStore).set({
    name: itemName.value,
    serialNumber: serialNumberInStore,
    date: getTodayDate(),
    resourse: itemResourse.value,
    price: itemPrice.value,
    quantity: itemQuantity.value,
    area: itemArea.value,
    location: itemDetail.value,
    user: userName.value
  })

  alert(`已寫入${itemName.value}`)

}

function getdata() {
  var docRef = db.collection("movies").doc("新世紀福爾摩斯");
  docRef.get().then(function (doc) {
    if (doc.exists) {
      console.log(doc)
      console.log(doc.data());
    } else {
      console.log("找不到文件");
    }
  })
    .catch(function (error) {
      console.log("提取文件時出錯:", error);
    });
}

function getDocToArray(collectionName, arrayName) {
  db.collection(collectionName).get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // console.log(doc.id, " => ", doc.data())
      arrayName.push(doc.data())
    });
  });
}


function print(text) {
  console.log(text)
}

function clearField(input) {
  input.value = ""
}

function inputCheck() {
  let inputValueArray = [itemName.value, itemResourse.value, itemPrice.value, itemQuantity.value, itemArea.value, itemDetail.value, userName.value]
  return inputValueArray.includes('')
}

function inputFakeData(num) {
  let serialNumberInStore = getSerialNumber()

  db.collection('-20°C冰箱').doc(`測試名稱${num}` + '_' + serialNumberInStore).set({
    name: `測試名稱${num}`,
    serialNumber: serialNumberInStore,
    date: getTodayDate(),
    resourse: `測試來源${num}`,
    price: `${num}`,
    quantity: `${num}`,
    area: '-20°C冰箱',
    location: `測試位置${num}`,
    user: `fakeSoup`
  })

}


function getTodayDate() {
  let fullDate = new Date()
  let yyyy = fullDate.getFullYear()
  let MM = (fullDate.getMonth() + 1) >= 10 ? (fullDate.getMonth() + 1) : ("0" + (fullDate.getMonth() + 1))
  let dd = fullDate.getDate() < 10 ? ("0" + fullDate.getDate()) : fullDate.getDate()
  let today = yyyy + "-" + MM + "-" + dd
  return today
}

function getSerialNumber() {
  let fullDate = new Date()
  let yy = fullDate.getFullYear()
  yy -= 2000
  let MM = (fullDate.getMonth() + 1) >= 10 ? (fullDate.getMonth() + 1) : ("0" + (fullDate.getMonth() + 1))
  let dd = fullDate.getDate() < 10 ? ("0" + fullDate.getDate()) : fullDate.getDate()
  let ss = fullDate.getMilliseconds()
  let serialNumber = yy + MM + dd + ss
  return serialNumber
}

