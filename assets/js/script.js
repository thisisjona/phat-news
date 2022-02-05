var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#futbol_team");//futbol team 

//get form data
var formSubmitHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var country = nameInputEl.value.trim();
     
  if (country) {
    getSportNews(country);

    // clear old content
    userFormEl.textContent = "";
    nameInputEl.value = "";
  } else {
    alert("Please enter a country");
  }
};

// https://newsapi.org/v2/everything?q=tesla&from=2022-01-04&sortBy=publishedAt&apiKey=ade84378e67548e5b4ed1e45d4c09606
// https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=ade84378e67548e5b4ed1e45d4c09606
let sportsArr=[];

//Sports new API
// var getSportNews = function() {
//     // format the github api url
//     var apiUrl = "https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=ade84378e67548e5b4ed1e45d4c09606";
//     // make a get request to url
//     fetch(apiUrl)
//       .then(function(response) {
//         response.json().then(function(data) {
//         console.log(data);
//         })
//       })
//   };
//   getSportNews();

fetch('https://api.sportsdata.io/v3/nfl/scores/json/News?key=95bd4e03de4e4fe0916f0c77516e239c')
.then(res=> res.json())
.then(data => console.log(data));

const body1 = document.querySelector('body');
const section1 = document.querySelector('body section');
const aside1 = document.querySelector('body section aside');
fetch('https://api.sportsdata.io/v3/nfl/scores/json/News?key=95bd4e03de4e4fe0916f0c77516e239c')
.then(res => res.json())
.then(data => {
aside1.innerText = data[0].Team;

const div1 = document.createElement('div');
div1.id = 'card-title';
div1.classname = 'card-title';
document.getElementsByTagName('aside')[0].appendChild(div1);
div1.innerText = data[0].Title;

const innerDiv = document.createElement('div');
innerDiv.id = 'card-content'
innerDiv.classname = 'card-content';
div1.appendChild(innerDiv);
innerDiv.innerText = data[0].Content;

});

// const body2 = document.querySelector('body');
// const section2 = document.querySelector('body section');
// const aside2 = document.querySelector('body section aside aside');
// fetch('https://api.sportsdata.io/v3/nfl/scores/json/News?key=95bd4e03de4e4fe0916f0c77516e239c')
// .then(res => res.json())
// .then(data => {
// aside2.innerText = data[1].Team;

// const div2 = document.createElement('div');
// div2.id = 'card-title';
// div2.classname = 'card-title';
// document.getElementsByTagName('aside')[1].appendChild(div2);
// div2.innerText = data[1].Title;

// const innerDiv = document.createElement('div');
// innerDiv.id = 'card-content'
// innerDiv.classname = 'card-content';
// div2.appendChild(innerDiv);
// innerDiv.innerText = data[1].Content;

// });

  // var getOtherNews = function() {
  //   // format the github api url
  //   var apiUrl = "https://api.sportsdata.io/v3/nfl/scores/json/News?key=95bd4e03de4e4fe0916f0c77516e239c";
  //   // make a get request to url
  //   fetch(apiUrl)
  //     .then(function(response) {
  //       response.json().then(function(data) {
  //       console.log(data);
  //       })
  //     })
  // };
  // getOtherNews();

  

   //   console.log(response)
      //   // request was successful
      //   if (response.ok) {
      //     console.log(response);
      //     response.json().then(function(data) {
      //       console.log(data);
      //       displayRepos(data, country);
      //     });
      //   } else {
      //     alert("Error: " + response.statusText);
      //   }
      // })
      // .catch(function(error) {
      //   alert("Unable to connect to GitHub");
      // });
  // //2nd API fetch
  // var getSportsWeather = function(user) {
  //   // format the github api url
  //   var apiUrl = "";
  
  //   // make a get request to url
  //   fetch(apiUrl)
  //     .then(function(response) {
  //       // request was successful
  //       if (response.ok) {
  //         console.log(response);
  //         response.json().then(function(data) {
  //           console.log(data);
  //           displayRepos(data, user);
  //         });
  //       } else {
  //         alert("Error: " + response.statusText);
  //       }
  //     })
  //     .catch(function(error) {
  //       alert("Unable to connect to GitHub");
  //     });
  // };

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
  };
  
  //Display news
  var displayRepos = function(repos, searchTerm) {
    // check if api returned any repos
    if (repos.length === 0) {
      repoContainerEl.textContent = "No repositories found.";
      return;
    }
  
    repoSearchTerm.textContent = searchTerm;
  
    // loop over repos
    for (var i = 0; i < repos.length; i++) {
      // format repo name
      var repoName = repos[i].owner.login + "/" + repos[i].name;
  
      // create a link for each repo
      var repoEl = document.createElement("a");
      repoEl.classList = "list-item flex-row justify-space-between align-center";
      repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);
  
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
// userFormEl.addEventListener("submit", formSubmitHandler);

