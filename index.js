//catching required elements
const container = document.getElementById('container'),
  contentContainer = document.getElementById('content'),
  passwordContainer = document.getElementById('password'),
  getUserBtn = document.getElementById('getuser-btn'),
  key = document.getElementsByClassName('numbtn'),
  display = document.getElementById('pin'),
  resetBtn = document.querySelector('#btn #resetbtn'),
  confirmBtn = document.getElementById('confirmbtn'),
  errorspan = document.getElementById('errorspan');

contentContainer.style.display = 'none'; //by default hiding the content
let password = ""; //initilzing as empty to store input-value

//handling the resetting pin
const handleReset = () => {
  display.value = "";
  password = "";
}

//error-span styling
function stylingError() {
  errorspan.style.color = 'red';
  confirmBtn.disabled = true;
  setTimeout(() => {
    errorspan.innerHTML = null;
    confirmBtn.disabled = false;
  }, 5000);
}

//clear button functioning
resetBtn.onclick = () => {
  handleReset();
}

//taking care of clicking confirm button
confirmBtn.onclick = function () {
  if (display.value.length === 0 || display.value.length > 8) {
    handleReset();
    errorspan.innerText = 'Invalid PIN!!';
    stylingError();
    return;
  } if (password === '9211' || display.value === '9211') {
    contentContainer.style.display = 'block';
    passwordContainer.style.display = 'none';
  } else {
    handleReset();
    errorspan.innerText = 'Incorrect PIN';
    stylingError();
    return;
  }
}

//taking care of input values
function handleClick(e) {
  password += (e.target.attributes[0].value);
  display.value = password;
}

//listening event by looping through keys
for (let x = 0; x < key.length; x++) {
  key[x].addEventListener("click", handleClick);
};

//fetching data
const getUser = async () => {
  try {
    container.innerHTML = `<div><h2>Loading...</h2></div>`;
    let res = await fetch('https://randomuser.me/api/');
    let data = await res.json();
    const user = data.results[0];
    container.style.backgroundColor = 'white';
    appendUserData(user);
  } catch (error) {
    console.log(error);
    container.style.backgroundColor = 'white';
    container.innerHTML = `<h1>Oops!! Something went wrong...</h1>`;
  }
};

//appending data
const appendUserData = (user) => {
  container.innerHTML = null;

  container.innerHTML = `<div class="img-div">
    <img src=${user.picture.large} alt="user-img" />
</div>
<div class="details-div">
<div class="name">
  <h2>${user.name.title + ' ' + user.name.first + ' ' + user.name.last}</h2>
</div>
<div class="dob">
  <h3>${user.gender},</h3>
  <h3>${user.dob.age}</h3>
</div>
<div class="mail">
  <h4>Email : ${user.email}</h4>
  <h4>Cell : ${user.cell}</h4>
</div>
<div class="usepass">
  <h4>Username : ${user.login.username}</h4>
  <h4>Password : ${user.login.password}</h4>
</div>
<div class="street">
  <h4>Street : ${user.location.street.number + ' ' + user.location.street.name}</h4>
</div>
<div class="ctcode">
  <h4>City : ${user.location.city}</h4>
  <h4>Postcode : ${user.location.postcode}</h4>
</div>
<div class="stco">
  <h4>State : ${user.location.state}</h4>
  <h4>Country : ${user.location.country}</h4>
</div>
</div>`;
};

//listening event on get user-button
getUserBtn.addEventListener('click', getUser);