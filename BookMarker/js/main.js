//listen for the form
document.getElementById('myForm').addEventListener('submit',saveBookmark);
function saveBookmark(e) {
  //get form values
  var siteName = document.getElementById('siteName').value;
  var siteURL = document.getElementById('siteURL').value;
  if (!validateform(siteName,siteURL)) {
    return false;
  }
  var bookmark = {
    name: siteName,
    url: siteURL
  }
  /*
  //local storage test
  localStorage.setItem('key','value');
  console.log(localStorage.getItem('key'));
  localStorage.removeItem('key');
  console.log(localStorage.getItem('key'));*/

  //test if bookmarks is null
  if (localStorage.getItem('bookmarks') === null) {
    //intitialise array
    var bookmarks =[];
    //add to arrays
    bookmarks.push(bookmark);
    //set to local storage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
  }else {
    //get bookmarks from localStorage
    var bookmarks =JSON.parse(localStorage.getItem('bookmarks'));
    //add bookm to array
    bookmarks.push(bookmark);
    //reset to localStorage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
  }
  //re fetchbookmarks
  fetchbookmarks();
  //prevent form from submitting
  e.preventDefault();
}
//clear form
document.getElementById('myForm').reset();
//re fetchbookmarks
fetchbookmarks();
//delete bookmarks
function deletebookmark(url) {
  //fetch bookmarks
  var bookmarks =JSON.parse(localStorage.getItem('bookmarks'));
  //loop through bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    if(bookmarks[i].url == url){
      //remove from array
      bookmarks.splice(i,1);
    }
  }
  //reset to localStorage
  localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
  //re fetchbookmarks
  fetchbookmarks();
}

  //fetch bookmarks
function fetchbookmarks() {
  var bookmarks =JSON.parse(localStorage.getItem('bookmarks'));

  //get output id
  var bookmarksResults = document.getElementById('bookmarksResults');

  //build output

  bookmarksResults.innerHTML = "";
  for (var i = 0;i<bookmarks.length;i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;
    bookmarksResults.innerHTML +='<div class="well well-lg">'+
                                '<h3>'+name+'</h3>'+
                                '<a class="btn btn-info" target="_blank" href="'+url+'">Visit</a>' +
                                '<a onclick="deletebookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>' +
                                '</div>';
  }
}
function validateform(siteName,siteURL) {
  if (!siteName || !siteURL) {
    alert("Please fill in the form ");
    return false;
  }
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);
  if(!siteURL.match(regex)){
    alert("Please fill in the form with a valid URL");
    return false;
  }

  return true;
}
