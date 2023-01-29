
const container = document.getElementById('container');
const getUserBtn = document.getElementById('getuser-btn');


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

getUserBtn.addEventListener('click', getUser);