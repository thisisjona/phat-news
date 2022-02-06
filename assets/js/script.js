var userFormEl = document.querySelector("#user-form");
var countryInputEl = document.querySelector("#country");//country
var NFLinputEl = document.querySelector("nflNews")
var newsFeedEl = document.querySelector("#newsFeed"); //news feed container
let sportsArr=[];
let countryArr=[{name:"America", id:"us"},{}]


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

// https://newsapi.org/v2/everything?q=tesla&from=2022-01-04&sortBy=publishedAt&apiKey=ade84378e67548e5b4ed1e45d4c09606
// https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=ade84378e67548e5b4ed1e45d4c09606

// fetch('https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=ade84378e67548e5b4ed1e45d4c09606')
// fetch('https://api.sportsdata.io/v3/nfl/scores/json/News?key=95bd4e03de4e4fe0916f0c77516e239c')
// .then(res=> res.json())
// .then(data => console.log(data));


// declares variables linked to HTML
// const body = document.querySelector('body div');
// const section = document.querySelector('body div section');


var NFLNews = function(){
// get data from server-side API and assign location 

// const NflApiUrl = 'https://api.sportsdata.io/v3/nfl/scores/json/News?key=95bd4e03de4e4fe0916f0c77516e239c';
// async function getNflNews() {
//   const response = await fetch(NflApiUrl);
//   const NFLdata = await response.json();
//   console.log(NFLdata);
  
// }

// getNflNews();



const article1 = document.querySelector('article');
fetch('https://api.sportsdata.io/v3/nfl/scores/json/News?key=95bd4e03de4e4fe0916f0c77516e239c')
.then(res => res.json())
.then(data => {
article1.innerText = data[0].Team;
article1.id = 'card-team';
article1.class = 'card-team';


// create dynamic element and assign data from API to it
const div = document.createElement('div');
div.id = 'card-title';
div.classname = 'card-title';
document.getElementsByTagName('article')[0].appendChild(div);
div.innerText = data[0].Title;


// create dynamic element and assign data from API to it
const innerDiv = document.createElement('div');
innerDiv.id = 'card-content'
innerDiv.classname = 'card-content';
div.appendChild(innerDiv);
innerDiv.innerText = data[0].Content;
});





// let a = document.createElement('a');
// var linkText = document.createTextNode("Link to Source");
// a.appendChild(linkText);
// a.title = "Link to Source";
// a.href = data[0].OriginalSourceUrl;
// document.article1.appendChild(a);





// get news
  var getFeaturedRepos = function(language) {
    var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";
  
    fetch(apiUrl).then(function(response) {
      if (response.ok) {
        console.log(response);
      } else {
        alert('Error: GitHub User Not Found');
      }
    });
}

//Sports new API
var getSportNews = function(country) {
    console.log(country)
    var countryId="";
    for(var i=0;i<countryArr.length;i++){
      if(country===countryArr[i].name){
        countryId=countryArr[i].id;
        console.log("this is the countryId:"+countryId)
      };
    }
    if(!countryId){
      console.log("no country found")
    }
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
    
    if (sportsArr.length === 0) {
      newsFeedEl.textContent = "no news found";
      return;
    }else{
      console.log("else statement ran")
      for(var i=0; i<sportsArr.length;i++){
        var newsTitle = sportsArr[i].title;
        //news link creation
        var newsEl = document.createElement("div");
        var newsTitleEl = document.createElement("a");
        newsEl.classList = "list-item flex-row justify-space-between align-center news-story";
        //set url
        newsTitleEl.setAttribute("href", sportsArr[i].url);
        var newsImg = document.createElement("div")
        newsImg.innerHTML = "<img src="+sportsArr[i].urlToImage+" alt='sports image' />"

        
        // newsTitleEl.classList = "flex-row align-center";

        if(newsTitle){
          newsTitleEl.innerHTML =
          "*** News title ***" + newsTitle;
        }else {
          statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
        // append container to the dom
        newsEl.appendChild(newsImg)
        newsEl.appendChild(newsTitleEl)
        newsFeedEl.appendChild(newsEl);
      }
    }
  }
  
  //Display news
  var displayRepos = function(repos, searchTerm) {

    // loop over repos
    for (var i = 0; i < repos.length; i++) {
      // format repo name
      var repoName = repos[i].owner.login + "/" + repos[i].name;
  
      // create a link for each repo
      var repoEl = document.createElement("a");
      repoEl.classList = "list-item flex-row justify-space-between align-center";
      //figure this part out
      repoEl.setAttribute("href", "./countrynews.html?repo=" + repoName);
  
      // create a span element to hold repository name
      var titleEl = document.createElement("span");
      titleEl.textContent = repoName;
  
      // append to container
      repoEl.appendChild(titleEl);
  
      // create a status element
      var statusEl = document.createElement("span");
      statusEl.classList = "flex-row align-center";
  
      // check if current repo has issues or not
      if (repos[i].open_issues_count > 0) {
        statusEl.innerHTML =
          "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
      } else {
        statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
      }
  
      // append to container
      repoEl.appendChild(statusEl);
  
      // append container to the dom
      repoContainerEl.appendChild(repoEl);
    }


    
  };




// add event listeners to forms
userFormEl.addEventListener("submit", formSubmitHandler);

// userFormEl.addEventListener("submit2",  NFLNews);