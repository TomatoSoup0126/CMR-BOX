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
  db.collection("movies").doc("新世紀福爾摩斯").set({
    name: "新世紀福爾摩斯",
    date: "2010",
    desctiption: "本劇改編自阿瑟·柯南·道爾爵士家喻戶曉的推理小說，一位脾氣古怪的大偵探在現代倫敦的街頭悄悄巡行，四處搜尋線索。",
    actors: ["班尼迪克·康柏拜區", "馬丁·費曼"]
  });

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

