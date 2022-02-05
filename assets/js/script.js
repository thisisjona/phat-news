var userFormEl = document.querySelector("#user-form");
var countryInputEl = document.querySelector("#country");//country 
let sportsArr=[];
let countryArr=[{name:"America", id:"us"}]

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

