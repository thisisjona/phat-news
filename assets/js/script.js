let countryBtn = $('#countryBtn');

countryBtn.empty();



countryBtn.append('<option selected="true" disabled>Choose Country</option>');
countryBtn.prop('selectedIndex', 0);
// gets country info and flag images
$(function (){

  const $countryName = $('#countryName');
  $.ajax({
    type: 'GET',
    url: 'https://restcountries.com/v3.1/all',
    success: function(country) {
  
      $.each(country, function(i, country){
        $countryName.append('<option>' + country.name.common + country.flag +'</option>');
      });
    }
  });
});



// const countryData = 'https://restcountries.com/v3.1'

// $.getJSON(countryData, function(name) {
//   $.each(name, );
// });

// // submit user info
// let userInfo ="";

// // let submitUserInfo = function(){
//   $('#loginBtn').click(function(){
//     let user = $('#userName').val('text');
//     return user;
//   })
//  console.log(userName);
  




// let loginBtn = $('loginBtn');

// $('dropdown-menu').hide();


// // function that allows a user to save their name and country to display on page
// function signIn(){
// // listens for event to toggle modal for page
// $('countries').selectMenu();

// }
// $('loginBtn').click(function(){
//   $('#modal-cta').removeClass('is-active');
// });