var userFormEl = document.querySelector("#user-form");
var countryInputEl = document.querySelector("#country");//country
var NFLinputEl = document.querySelector("nflNews")
var newsFeedEl = document.querySelector("#newsFeed"); //news feed cards container
var newsContainEl = document.querySelector("#newsContainer")//news feed container
let sportsArr=[];
let countryArr=[{name:"america", id:"us"},{name:"argentina", id:"ar"},{name:"australia", id:"au"},{name:"austria", id:"at"},{name:"belgium", id:"be"},{name:"brazil", id:"br"},{name:"bulgaria", id:"bg"},{name:"canada", id:"ca"},{name:"china", id:"cn"},{name:"columbia", id:"co"},{name:"cuba", id:"cu"},{name:"czech republic", id:"cz"},{name:"egypt", id:"eg"},{name:"france", id:"fr"},{name:"germany", id:"de"},{name:"greece", id:"gr"},{name:"hong kong", id:"hk"},{name:"hungary", id:"hu"},{name:"india", id:"in"},{name:"indonesia", id:"id"},{name:"ireland", id:"ie"},{name:"israel", id:"il"},{name:"italy", id:"it"},{name:"japan", id:"jp"},{name:"latvia", id:"lv"},{name:"lithuania", id:"lt"},{name:"malaysia", id:"my"},{name:"mexico", id:"mx"},{name:"morocco", id:"ma"},{name:"netherlands", id:"nl"},{name:"new zealand", id:"nz"},{name:"nigeria", id:"ng"},{name:"norway", id:"no"},{name:"philippines", id:"ph"},{name:"poland", id:"pl"},{name:"portugal", id:"pt"},{name:"romania", id:"ro"},{name:"russia", id:"ru"},{name:"saudi arabia", id:"sa"},{name:"serbia", id:"rs"},{name:"singapore", id:"sg"},{name:"slovakia", id:"sk"},{name:"slovenia", id:"si"},{name:"south africa", id:"za"},{name:"south korea", id:"kr"},{name:"sweden", id:"se"},{name:"switzerland", id:"ch"},{name:"taiwan", id:"tw"},{name:"thailand", id:"th"},{name:"turkey", id:"tr"},{name:"uae", id:"ae"},{name:"ukraine", id:"ua"},{name:"united kingdom", id:"gb"},{name:"united states", id:"us"},{name:"venezuela", id:"ve"}];
let countryBtn = $('#countryBtn');
let settingBtn = $('#check-in');
let userCard = $('#user-card');
var initialCountry=""

//Jonathan's Work
var ctaForm = $("#cta-form");
var ctaModal = $("#modal-cta");
var loginBtn = $("#loginBtn");


countryBtn.empty();
countryBtn.append('<option selected="true" disabled>Choose Country</option>');

countryBtn.prop('selectedIndex', 0);

 // gets country info and flag images
$(function (){

   const $countryName = $('#countryName');
   $.ajax({
     type: 'GET',
     url: 'https://restcountries.com/v3.1/all',
     success: function(countryF) {
       console.log(countryF);
       
       $.each(countryF, function(i, countryF){
         $countryName.append('<option>' + countryF.name.common + countryF.flag +'</option>');
       });
       
      }
      
    });
 });

$(function() {
  let localUsers = JSON.parse(window.localStorage.getItem("users")) || [];
  if (localUsers.length == 0){
    return undefined;
  }else{
  recentUser = localUsers.pop("name");
  userCard.replaceWith("<button>Welcome back, " + recentUser.name + "!<br>"  + recentUser.country + "   </>");
  settingBtn.addClass('is-hidden');
  }
})





 //Jonathan's Work
function nameSubmit (event){
  event.preventDefault();
  var duplicateBoolean = false;
  var localUsers = JSON.parse(window.localStorage.getItem("users")) || [];
  var userName = $(this).find("#userName").val().trim();
  var countryName = $(this).find("#countryName").val();
  //ensure there are no duplicate users and create local storage user info
  localUsers.map(function(users){
    if(userName === users.name && countryName === users.country){
      duplicateBoolean = true;
      return false;
    };
  })
  // once a username is unique, create object for user info
  if(!duplicateBoolean){
    var newUserObj = {
      name: userName,
      country: countryName,
    };
    localUsers.push(newUserObj);
    window.localStorage.setItem("users", JSON.stringify(localUsers));
    //append users.name and users.country  to header  
    let userCard = $("#user-card");   
    userCard.replaceWith("<div>Hey " + userName + ", <br>from "  + countryName + "</div>");
    ctaModal.removeClass("is-active");
    userCard.addClass('button');
  };
}

$("#burger-icon").click(function(){
  $("#nav-menu").toggleClass("is-active");
})

settingBtn.click(function(){
  ctaModal.toggleClass('is-hidden is-active');
  
})

userCard.click(function(){
  ctaModal.toggleClass('is-hidden is-active');
})
  

//get form data
var formSubmitHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();
  // get value from input element
  var country = countryInputEl.value.trim();
  if (country) {
    getSportNews(country);
    // clear old content
    countryInputEl.value = "";
  } else {
    alert("Please enter a country");
  }
};

// NFL news card

// fetches the NFL api data and loops through to create a set length of articles to choose from with links to source
function getNFLnews(){
  fetch('https://api.sportsdata.io/v3/nfl/scores/json/News?key=95bd4e03de4e4fe0916f0c77516e239c')
  .then(res=> res.json())
  .then(data =>{
    console.log(data)
    let article1 = document.querySelector('#NFLNewsList');
    let HTMLcode1 ="";
    for (let i = 0; i < [10]; i++) {
      HTMLcode1 += `<p><a href="${data[i].OriginalSourceUrl}" target="blank">${data[i].Title}</a></p>`
    }
    article1.innerHTML = HTMLcode1; 
 });
}


// MLB news card

function getMLBnews(){
  fetch('https://api.sportsdata.io/v3/mlb/scores/json/News?key=08a1cba147d5478bbe5c54797ddab4a6')
  .then(res=> res.json())
  .then(data =>{
    console.log(data)
    let article2 = document.querySelector('#MLBNewsList');
    let HTMLcode2 ="";
    for (let i = 0; i < [10]; i++) {
      HTMLcode2 += `<p><a href="${data[i].OriginalSourceUrl}" target="blank">${data[i].Title}</a></p>`
    }
    article2.innerHTML = HTMLcode2;   
  });  
}
  


// NBA news card

function getNBAnews(){
  fetch('https://api.sportsdata.io/v3/nba/scores/json/News?key=0a630893821f48b795048de75b6ae458')
  .then(res=> res.json())
  .then(data =>{
    console.log(data)
    let article3 = document.querySelector('#NBANewsList');
    let HTMLcode3 ="";
    for (let i = 0; i < [10]; i++) {
      HTMLcode3 += `<p><a href="${data[i].OriginalSourceUrl}" target="blank">${data[i].Title}</a></p>`
    }
    article3.innerHTML = HTMLcode3; 
  });
}

// NHL news card

function getNHLnews(){
  fetch('https://api.sportsdata.io/v3/nhl/scores/json/News?key=dda38e7b64ec40808207644ce7c0ae61')
  .then(res=> res.json())
  .then(data =>{
    console.log(data)
    let article4 = document.querySelector('#NHLNewsList');
    let HTMLcode4 ="";
    for (let i = 0; i < [10]; i++) {
      HTMLcode4 += `<p><a href="${data[i].Url}" target="blank">${data[i].Title}</a></p>`
    }
    article4.innerHTML = HTMLcode4; 
  });
}




//Initial load screen news
var getInitialNews = function(country) {

  // for loop populates stories from API
  for(var i = 0; i < countryArr.length ;i++){
    if(country.toLowerCase()===countryArr[i].name){
      countryId=countryArr[i].id;
      
    };
  }
  // error handling if no countryId
  if(!countryId){
    return false
  }
  // API call 
  else{
    // format the github api url
    var apiUrl = "https://newsapi.org/v2/top-headlines?country="+countryId+"&category=sports&apiKey=ade84378e67548e5b4ed1e45d4c09606";
    // make a get request to url
    fetch(apiUrl)
      .then(function(response) {
        //request was successful
        if(response.ok){
          response.json().then(function(data) {
          sportsArr=data.articles;
          console.log("sports array ", sportsArr)
          userFormEl.classList.add('hide');
          newsContainEl.classList.remove('hide');
          displayNews();

        });
        }else {
          alert("Error: " + response.statusText);
        }
      })
      .catch(function(error) {
        alert("Unable to connect to server");
      });
  }
};
//Sports new API Ethan's Code
var getSportNews = function(country) {
    console.log(country)
    var countryId="";
    // for loop populates stories from API
    for(var i = 0; i < countryArr.length ;i++){
      if(country.toLowerCase()===countryArr[i].name){
        countryId=countryArr[i].id;
        console.log("this is the countryId:"+countryId)
      };
    }
    // error handling if no countryId
    if(!countryId){
      return false
    }
    // API call 
    else{
      // format the github api url
      var apiUrl = "https://newsapi.org/v2/top-headlines?country="+countryId+"&category=sports&apiKey=ade84378e67548e5b4ed1e45d4c09606";
      // make a get request to url
      fetch(apiUrl)
        .then(function(response) {
          //request was successful
          if(response.ok){
            response.json().then(function(data) {
            sportsArr=[];
            sportsArr=data.articles;
            console.log("sports array ", sportsArr)
            userFormEl.classList.add('hide');
            newsContainEl.classList.remove('hide');
            displayNews();

          });
          }else {
            alert("Error: " + response.statusText);
          }
        })
        .catch(function(error) {
          alert("Unable to connect to server");
        });
    }
  };
  
  var displayNews = function() {
    console.log("displayNews function run")
    newsFeedEl.textContent = "";
    if (sportsArr.length === 0) {
      newsFeedEl.textContent = "no news found";
      return;
    }else{
      console.log("else statement ran")
      for(var i=0; i < sportsArr.length;i++){
        var newsTitle = sportsArr[i].title;
        //news Card creation
        var newsEl = document.createElement("div");
        newsEl.classList = "card news-story";
        //set url
        var newsTitleEl = document.createElement("a");
        newsTitleEl.classList = "";
        newsTitleEl.setAttribute("href", sportsArr[i].url);
        var newsImg = document.createElement("div")
        newsImg.innerHTML = "<a href='"+sportsArr[i].url+"'><img src='"+sportsArr[i].urlToImage+"' class='countryImg' alt='sports image' /></a>"
        

        
        if(newsTitle){
          newsTitleEl.innerHTML = newsTitle;
        }else {
          statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
        // append container to the dom
        newsEl.appendChild(newsTitleEl)
        newsEl.appendChild(newsImg)
        newsFeedEl.appendChild(newsEl);
      }
    }
  }

  var initialNews = function() {
    console.log("displayNews function run")
    
    if (sportsArr.length === 0) {
      newsFeedEl.textContent = "no news found";
      return;
    }
    else{
      console.log("else statement ran")
      for(var i=0; i < sportsArr.length;i++){
        var newsTitle = sportsArr[i].title;
        //news Card creation
        var newsEl = document.createElement("div");
        newsEl.classList = "card news-story";
        //set url
        var newsTitleEl = document.createElement("a");
        newsTitleEl.classList = "";
        newsTitleEl.setAttribute("href", sportsArr[i].url);
        var newsImg = document.createElement("div")
        newsImg.innerHTML = "<a href='"+sportsArr[i].url+"'><img src='"+sportsArr[i].urlToImage+"' class='countryImg' alt='sports image' /></a>"
        

        
        if(newsTitle){
          newsTitleEl.innerHTML = newsTitle;
        }else {
          statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
        // append container to the dom
        newsEl.appendChild(newsTitleEl)
        newsEl.appendChild(newsImg)
        newsFeedEl.appendChild(newsEl);
      }
    }
  }
  $('#newsCard').addClass('container box');
  
// add event listeners to forms
userFormEl.addEventListener("submit", formSubmitHandler);


//Jonathan's Work
ctaForm.on("submit", nameSubmit)

// USA pro leagues function calls
getNFLnews();
getMLBnews();
getNBAnews();
getNHLnews();
getInitialNews();