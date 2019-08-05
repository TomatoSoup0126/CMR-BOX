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

var db = firebase.firestore()

function storedata() {
  db.collection(itemArea.value).doc(itemName.value).set({
    name: itemName.value,
    date: itemDate.value,
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

function getFreezer1List() {
  db.collection("-20°C冰箱").get().then(function (querySnapshot) {
    console.log(querySnapshot)
    querySnapshot.forEach(function (doc) {
      console.log(doc.id, " => ", doc.data());
    });
  });
}



const itemName = document.getElementById('itemName')
const itemDate = document.getElementById('itemDate')
const itemResourse = document.getElementById('itemResourse')
const itemPrice = document.getElementById('itemPrice')
const itemQuantity = document.getElementById('itemQuantity')
const itemArea = document.getElementById('itemArea')
const itemDetail = document.getElementById('itemDetail')
const userName = document.getElementById('userName')
const sumitBtn = document.getElementById('sumitBtn')

const inputArray = [itemName, itemDate, itemResourse, itemPrice, itemQuantity, itemArea, itemDetail, userName]


sumitBtn.addEventListener('click', function () {
  if (inputCheck()) {
    alert('欄位有空白!')
  } else {
    for (let i = 0; i < inputArray.length; i++) {
      print(inputArray[i].value)
    }
    storedata()
    for (let i = 0; i < inputArray.length; i++) {
      clearField(inputArray[i])
    }
  }
})

function print(text) {
  console.log(text)
}

function clearField(input) {
  input.value = ""
}

function inputCheck() {
  let inputValueArray = [itemName.value, itemDate.value, itemResourse.value, itemPrice.value, itemQuantity.value, itemArea.value, itemDetail.value, userName.value]
  console.log(inputValueArray)
  console.log(inputValueArray.includes(''))
  return inputValueArray.includes('')
}