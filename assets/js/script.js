var userFormEl = document.querySelector("#user-form");
var countryInputEl = document.querySelector("#country");//country
var NFLinputEl = document.querySelector("nflNews")
var newsFeedEl = document.querySelector("#newsFeed"); //news feed container
let sportsArr=[];
let NflArray = [];
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




const NflApiUrl = 'https://api.sportsdata.io/v3/nfl/scores/json/News?key=95bd4e03de4e4fe0916f0c77516e239c';
async function getNflNews() {
  const response = await fetch(NflApiUrl);
  const NflData = await response.json();
  NflArray = NflData;
  console.log(NflArray);
}

getNflNews();

// first card
// initial setup to attach the code to the article with id: first
let article1 = document.querySelector('#first');
fetch('https://api.sportsdata.io/v3/nfl/scores/json/News?key=95bd4e03de4e4fe0916f0c77516e239c')
.then(res => res.json())
.then(data => {
article1.innerText = data[0].Team;
article1.id = 'card-team';
article1.class = 'card-team';

// create dynamic element and assign data from API to it
let div = document.createElement('div');
div.id = 'card-title';
div.classname = 'card-title';
document.getElementsByTagName('article')[0].appendChild(div);
div.innerText = data[0].Title;

// create dynamic element and assign data from API to it
let innerDiv = document.createElement('div');
innerDiv.id = 'card-content';
innerDiv.classname = 'card-content';
div.appendChild(innerDiv);
innerDiv.innerText = data[0].Content;

// dynamic <br> element added
let newInnerDiv = document.createElement('p');
newInnerDiv.id = 'card-source';
newInnerDiv.classname = 'card-source';
innerDiv.appendChild(newInnerDiv);
newInnerDiv.innerHTML = '<br>';

// variables to allow link to be added from API fetch daat
let linkText = 'Link to Source';
let linkURL = data[0].OriginalSourceUrl

//  dynamic button with link to source page
// ---------------------------------------- would like to add a way to open in a new tab???
let newerInnerDiv = document.createElement('button');
newerInnerDiv.id = 'card-button';
newerInnerDiv.classname = 'card-button';
newInnerDiv.appendChild(newerInnerDiv);
newerInnerDiv.innerHTML = '' + linkText.link(linkURL);
});

// second card
// initial setup to attach the code to the article with id: second
let article2 = document.querySelector('#second');
fetch('https://api.sportsdata.io/v3/nfl/scores/json/News?key=95bd4e03de4e4fe0916f0c77516e239c')
.then(res => res.json())
.then(data => {
article2.innerText = data[1].Team;
article2.id = 'card-team';
article2.class = 'card-team';

// create dynamic element and assign data from API to it
let div = document.createElement('div');
div.id = 'card-title';
div.classname = 'card-title';
document.getElementsByTagName('article')[1].appendChild(div);
div.innerText = data[1].Title;

// create dynamic element and assign data from API to it
let innerDiv = document.createElement('div');
innerDiv.id = 'card-content';
innerDiv.classname = 'card-content';
div.appendChild(innerDiv);
innerDiv.innerText = data[1].Content;

// dynamic <br> element added
let newInnerDiv = document.createElement('p');
newInnerDiv.id = 'card-source';
newInnerDiv.classname = 'card-source';
innerDiv.appendChild(newInnerDiv);
newInnerDiv.innerHTML = '<br>';

// vars to allow dynamic button to link
let linkText = 'Link to Source';
let linkURL = data[1].OriginalSourceUrl

// dynamic button with link created
let newerInnerDiv = document.createElement('button');
newerInnerDiv.id = 'card-button';
newerInnerDiv.classname = 'card-button';
newInnerDiv.appendChild(newerInnerDiv);
newerInnerDiv.innerHTML = '' + linkText.link(linkURL);
});

// third card
// initial setup to attach the code to the article with id: third
let article3 = document.querySelector('#third');
fetch('https://api.sportsdata.io/v3/nfl/scores/json/News?key=95bd4e03de4e4fe0916f0c77516e239c')
.then(res => res.json())
.then(data => {
article3.innerText = data[2].Team;
article3.id = 'card-team';
article3.class = 'card-team';

// create dynamic element and assign data from API to it
let div = document.createElement('div');
div.id = 'card-title';
div.classname = 'card-title';
document.getElementsByTagName('article')[2].appendChild(div);
div.innerText = data[2].Title;

// create dynamic element and assign data from API to it
let innerDiv = document.createElement('div');
innerDiv.id = 'card-content';
innerDiv.classname = 'card-content';
div.appendChild(innerDiv);
innerDiv.innerText = data[2].Content;

// dynamic <br> element added
let newInnerDiv = document.createElement('p');
newInnerDiv.id = 'card-source';
newInnerDiv.classname = 'card-source';
innerDiv.appendChild(newInnerDiv);
newInnerDiv.innerHTML = '<br>';

// vars to allow link on dynamic button
let linkText = 'Link to Source';
let linkURL = data[2].OriginalSourceUrl

// dymanic button with link to source added
let newerInnerDiv = document.createElement('button');
newerInnerDiv.id = 'card-button';
newerInnerDiv.classname = 'card-button';
newInnerDiv.appendChild(newerInnerDiv);
newerInnerDiv.innerHTML = '' + linkText.link(linkURL);
});

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