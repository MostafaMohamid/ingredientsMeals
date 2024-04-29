$(function () {
  $("#Loading").fadeOut(1000);
  $("#side-nav").animate({ left: -sideWidth }, 500);
  $("body").css("overflow", "visible")

});
var mealsContainer = [];
/////api data
async function getDataFromApi() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s`
  );
  Data = await response.json();
  mealsContainer = Data.meals;
  displayMeals(mealsContainer);
}
getDataFromApi();
///////loading

///searh

function displayMeals(array) {
if(array ==null) {
console.log("hallo");
document.getElementById("rowData").innerHTML = "";

}
else{

var cartona = ``;
  for (let index = 0; index < array.length; index++) {
    cartona += ` 
    <a onclick="getMealDetails('${array[index].idMeal}')" class="card shadow-2xl relative cursor-pointer">
    <div  class=" h-full relative  overflow-hidden group  rounded-lg">
          <div class=" absolute -bottom-10 group-hover:top-0 left-0 w-full h-full group-hover:bg-[#f9f6f6a3] transition-all ease-in-out duration-500  ">
              <div id="card" class="w-full h-full   p-5   relative">
                  <div class="absolute bottom-[-100%] group-hover:bottom-24 text-white  text-left   transition-all ease-in-out duration-500 ">
                      <h2 class=" headiing text-2xl font-bold  text-black mb-0 pb-1 left-0	top-1/2	 ">${array[index].strMeal}</h2>
                  </div>
              </div>
          </div>
          <img src="${array[index].strMealThumb}" class="w-full z-0  h-full    object-fill example ">
      </div>
  </a>

`;
  }

  document.getElementById("rowData").innerHTML = cartona;

}
}

$("#Search").click(function () {
  
  $("#nav-toggle").removeClass("fa-xmark").addClass(" fa-bars");
  $("#side-nav").animate({ left: -sideWidth }, 500);


  if (document.getElementById("details")) {
    document.getElementById("details").innerHTML = ``;
  }
  document.getElementById("rowData").innerHTML = ``;
  document.getElementById("instructions").innerHTML = ``;
  document.getElementById("contactUs").innerHTML=``;


  document.getElementById(
    "Searchcontainer"
  ).innerHTML = ` <div class="container py-4  mx-auto flex gap-3 px-3">
 <div class="relative w-[100%]">
        <input onkeyup="searchByName(this.value)" type="searchByName" id="default-search" class="block w-full p-4 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-transparent focus:ring-blue-500 focus:border-blue-500 dark:bg-transparent	 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search By Name" required />
  </div>
  <div class="relative w-[100%]">
     
  <input onkeyup="searchByLetter(this.value)" type="searchByFirstLetter" id="default-search" class="block w-full p-4 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-transparent focus:ring-blue-500 focus:border-blue-500 dark:bg-transparent	 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search By First Letter" required maxlength="1" />
</div>

</div>`;
});

async function searchByLetter(letter) {

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  let data = await response.json();
  let meals = data.meals;
  console.log(meals);
  displayMeals(meals);
}
async function searchByName(name) {

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  let data = await response.json();
  let meals = data.meals;
  displayMeals(meals);
}

///// side-bar -fun
var sideWidth = $(".inner-side").innerWidth();
$("#nav-toggle").click(function () {
  if ($("#side-nav").css("left") == "0px") {
    $("#side-nav").animate({ left: -sideWidth }, 600);
    $("#nav-toggle").removeClass("fa-xmark").addClass(" fa-bars");
    $("#nav-ul").animate({ top: "500px" }, 1000);
  } else {
    $("#side-nav").animate({ left: "0px" }, 600);
    $("#nav-toggle").removeClass("fa-bars").addClass(" fa-xmark");

    $("#nav-ul").animate({ top: "0px" }, 1000);
    console.log("A7a fuckd");
  }
});
////instructions
async function getMealDetails(mealId) {

  let response =
    await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}
  `);
  let MealDeatails = await response.json();
  console.log(MealDeatails);
  displayInstruction(MealDeatails.meals);
}

function displayInstruction(arrayStr) {
  $("#Loading").fadeIn(500);
  document.getElementById("Searchcontainer").innerHTML = "";
  console.log(arrayStr[0].strIngredient1);
  let ingredients = ``;
  for (let i = 1; i <= 20; i++) {
    if (arrayStr[0][`strIngredient${i}`]) {
      ingredients += `
        <li class="bg-sky-300   p-2 rounded-md  font-medium" >
        ${arrayStr[0][`strMeasure${i}`]}

        ${arrayStr[0][`strIngredient${i}`]}
          
        </li>`;
    }
    console.log(ingredients);
  }
  console.log(ingredients);

  let cartona = ``;
  cartona += `<div class="lg:container lg:mx-auto ms-auto w-[80vw] mt-7">
  <div id="details"  class="grid-cols-2	  lg:flex-row flex-col   flex gap-6 align-center">
    <div class="lg:w-1/3 w-full self-start ">
    <div class="pl-10" >

        <img src="${arrayStr[0].strMealThumb}" alt="MealPhoto"class=" w-[90%]  lg:w-[90%] rounded-md" />
        <h2 class="font-semibold text-3xl text-white text-center lg:text-left"> ${arrayStr[0].strMeal}</h2>
        </div>

        </div>
    <div class="w-[80%]  lg:w-3/4 self-start ">
      <div class="Instructions">
<h2 class="text-white text-3xl">Instructions</h2>
<p class="text-white	">${arrayStr[0].strInstructions} </p>
      </div>
        <div class="details text-white">
        <div class=" my-2 flex 	flex-wrap	 content-center	 items-center	">  <h3 class="font-bold text-3xl">Area :</h3>  <span class="font-bold text-3xl pl-1 justify-self-center ">${arrayStr[0].strArea}</span></div>
        <div class=" mb-1 flex flex-wrap	 content-center	 items-center">  <h3 class="font-bold text-3xl">Category :</h3>  <span class=" font-bold text-3xl pl-1">${arrayStr[0].strCategory}</span></div>
       <h3 class="font-bold text-3xl mb-2">Recipes  : <br/> 
</h3>
      
      <ul class="flex flex-wrap gap-3">
         ${ingredients}


</ul>
      </div>
<div class="tags font-bold text-xl ">
<h3 class="my-4 text-white font-bold text-3xl">Tags :</h3> 
<a  target="_blank" href="${arrayStr[0].strYoutube}" class="bg-red-600 hover:bg-red-900   p-2 rounded-md mt-3 text-white" >Youtube
</a>
<a target="_blank" href="${arrayStr[0].strSource}"  class="bg-green-800  hover:bg-green-900  p-2 rounded-md mx-3 text-white" >Source
</a>
</div>
        </div>
    </div>
  </div>`;
  document.getElementById("instructions").innerHTML = cartona;
  document.getElementById("rowData").innerHTML =``;
  document.getElementById("contactUs").innerHTML=``;
  $("#Loading").fadeOut(1000);

}

//categories
$("#Category").click(function () {
  getCategories();
  $("#nav-toggle").removeClass("fa-xmark").addClass(" fa-bars");
  $("#side-nav").animate({ left: -sideWidth }, 500);
});
async function getCategories() {

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let Data = await response.json();

  displayCategories(Data.categories);
  $(function () {
    $("#Loading").fadeOut(1000);
    $("#side-nav").animate({ left: -sideWidth }, 500);
  });
}
function displayCategories(array) {
  $("#Loading").fadeIn(100);
  console.log(array);
  var cartona = ``;
  for (let index = 0; index < array.length; index++) {
    let trimmedDescription = array[index].strCategoryDescription
      .split(" ")
      .slice(0, 20)
      .join(" ");

    cartona += ` 
    <a onclick="getCategoryMeals('${array[index].strCategory}')" class="card shadow-2xl relative cursor-pointer">
    <div  class=" h-full relative  overflow-hidden group  rounded-lg">
          <div class=" absolute -bottom-10 group-hover:top-0 left-0 w-full h-full group-hover:bg-[#f9f6f6a3] transition-all ease-in-out duration-500  ">
              <div id="card" class="w-full h-full   p-5   relative">
                  <div class="absolute top-[100%] group-hover:top-[10px] text-white  text-left   transition-all ease-in-out duration-500 ">
                  <h2 class="text-center text-black font-bold text-2xl	 mx-auto"> ${array[index].strCategory}</h2>
                      <p class=" headiing text-l font-simibold  text-black mb-0 pb-1 left-0	top-0	 ">${trimmedDescription}</p>
                  </div>
              </div>
          </div>
          <img src="${array[index].strCategoryThumb}" class="w-full z-0  h-full    object-fill example ">
      </div>
  </a>

`;
  }

  document.getElementById("rowData").innerHTML = cartona;
  document.getElementById("instructions").innerHTML=``;
  document.getElementById("contactUs").innerHTML=``;
  document.getElementById("Searchcontainer").innerHTML=``;
  $("#Loading").fadeOut(1000);


}

async function getCategoryMeals(Category) {
  $("#side-nav").animate({ left: -sideWidth }, 500);
  let response =
    await fetch(`https:/www.themealdb.com/api/json/v1/1/filter.php?c=${Category}
  `);
  let Data = await response.json();
  displayMeals(Data.meals);

}
//Ingredients

$("#Ingredients").click(function () {
  
  console.log("clicked");
  getIngredients();
  $("#nav-toggle").removeClass("fa-xmark").addClass(" fa-bars");
  $("#side-nav").animate({ left: -sideWidth }, 500);
});

async function getIngredients() {
  
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let Data = await response.json();
  displayIngredients(Data.meals);
}
function displayIngredients(array) {
  $("#Loading").fadeIn(500);
  array = array.slice(0, 20);
  var cartona = ``;
  for (let index = 0; index < array.length; index++) {
    // console.log(array[index].strDescription);
    cartona += ` 
      <a onclick="getIngredient('${
        array[index].strIngredient
      }')" class="card shadow-2xl relative cursor-pointer">
      <div  class="  relative  overflow-hidden group  rounded-lg ">
            <div class="flex flex-col justify-center items-center	text-center "> 
            <i class="fa-solid fa-drumstick-bite fa-4x text-white" ></i>
               <h3 class="text-white text-3xl px-2">${
                 array[index].strIngredient
               }</h3>
               <p class="text-white px-2 ">${array[index].strDescription
                 .split(" ")
                 .slice(0, 20)
                 .join(" ")}</p>


            </div>
        </div>
    </a>
  
  `;
  }
  document.getElementById("rowData").innerHTML = cartona;
  document.getElementById("instructions").innerHTML=``;
  document.getElementById("contactUs").innerHTML=``;
  document.getElementById("Searchcontainer").innerHTML=``;
  $("#Loading").fadeOut(1000);


}
async function getIngredient(Ingredient) {
  $("#Loading").fadeIn(100);
  $("#Loading").fadeOut(1000);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredient}`
  );
  let Data = await response.json();
  displayMeals(Data.meals);
}

/////////Area
$("#Area").click(function () {
  $("#nav-toggle").removeClass("fa-xmark").addClass(" fa-bars");
  $("#side-nav").animate({ left: -sideWidth }, 500);
  getAreaList();
});
async function getAreaList() {
  


  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list

    `
  );
  let Data = await response.json();
  displayArea(Data.meals);
}

function displayArea(array) {
  $("#Loading").fadeIn(100);
  let cartona = ``;
  for (let index = 0; index < array.length; index++) {
    // console.log(array[index].strDescription);
    cartona += ` 
    <div class="container py-4  mx-auto  px-3">

    <a onclick="getSpasificArea('${array[index].strArea}')" class="card shadow-2xl relative cursor-pointer">
      <div  class="  relative  overflow-hidden group  rounded-lg ">
            <div class="flex flex-col justify-center items-center	 "> 
            <i class="fa-solid fa-house-laptop fa-4x text-white"></i>
            <h3 class="text-white text-3xl px-2">${array[index].strArea}</h3>


            </div>
        </div>
    </a>

  </div>
  
  `;
  }
  document.getElementById("rowData").innerHTML = cartona;
  document.getElementById("instructions").innerHTML=``;
  document.getElementById("contactUs").innerHTML=``;
  document.getElementById("Searchcontainer").innerHTML=``;
  $("#Loading").fadeOut(1000);


}
async function getSpasificArea(Area) {
  $("#Loading").fadeIn(100);
  $("#Loading").fadeOut(1000);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`
  );
  response = await response.json();
  console.log(Data[1]);
  displayMeals(Data.meals.slice(0, 20));
$("#Loading").fadeOut(500);
}

////////////////////////////////////
$("#ContactUs").click(function () {
  $("#nav-toggle").removeClass("fa-xmark").addClass(" fa-bars");
  $("#side-nav").animate({ left: -sideWidth }, 500);
  showContactForm();
});

function showContactForm() {

  document.getElementById(
    "contactUs"
  ).innerHTML = `    <div class="container w-[75%]  mx-auto translate-y-[50%]   items-center justify-center px-2">
  <div class="px-6 py-8 rounded shadow-md text-black w-full flex flex-col justify-center items-center">

    <ul class="flex flex-col w-full">
     
      <li class="flex  gap-2"> 
        <div class="input-Alert w-full">
          <input
                          onkeyup="validateInputs(this)"
 
          id="fullName"
          type="text"
          class="block border border-grey-light w-full p-3 rounded mb-1"
          name="fullname"
          placeholder="Full Name" />
          <div  class="Alert hidden p-4 mb-1  text-gray-800 rounded-lg bg-red-50 dark:bg-red-200 dark:text- text-center font-semibold text-l" role="alert">
            Special characters and numbers not allowed

          </div>
        </div>


        <div class="input-Alert w-full">
          <input
                          onkeyup="validateInputs(this)"
 
          id="Email"
          type="text"
          class="block border border-grey-light w-full p-3 rounded mb-1"
          name="email"
          placeholder="Email" />
          <div  class="Alert hidden p-4 mb-1 text-lg text-gray-800 rounded-lg bg-red-50 dark:bg-red-200 dark:text-black text-center" role="alert">
            Email not valid *exemple@yyy.zzz

          </div>

        </div>

      
  
      
      
      
      </li>
        <li class="flex gap-2">



          <div class="input-Alert w-full">
            <input
                            onkeyup="validateInputs(this)"
 
            id="phone"
            type="phone"
            class="block border border-grey-light w-full p-3 rounded mb-1"
            name="phone"
            placeholder="phone" />
            <div  class="Alert hidden p-4 mb-1 text-lg text-gray-800 rounded-lg bg-red-50 dark:bg-red-200 dark:text-black text-center" role="alert">
              Enter valid Phone Number

            </div>

          </div>

          <div class="input-Alert w-full">
            <input
                            onkeyup="validateInputs(this)"
 
            id="age"
            type="number"
            class="block border border-grey-light w-full p-3 rounded mb-1"
            name="EnterAge"
            placeholder="Enter Your Age" />
            <div  class="Alert hidden p-4 mb-1 text-lg text-gray-800 rounded-lg bg-red-50 dark:bg-red-200 dark:text-black text-center" role="alert">
              Enter valid age

            </div>

          </div>
</li>
        <li class="flex gap-2">
          <div class="input-Alert w-full">
            <input
                            onkeyup="validateInputs(this)"
 
            id="password"
            type="password"
            class="block border border-grey-light w-full p-3 rounded mb-1"
            name="password"
            placeholder="Password" />
            <div  class="Alert hidden p-4 mb-1 text-lg text-gray-800 rounded-lg bg-red-50 dark:bg-red-200 dark:text-black text-center" role="alert">
               Change a few things up and try submitting again.Enter valid password *Minimum eight characters, at least one letter and one number:*

            </div>

          </div>
          <div class="input-Alert w-full">
            <input
                            onkeyup="validateInputs(this)"
 
            id="repassword"
          type="password"
          class="block border border-grey-light w-full p-3 rounded mb-1"
          name="confirm_password"
          placeholder="Confirm Password" />
            <div  class="Alert hidden p-4 mb-1 text-lg text-gray-800 rounded-lg bg-red-50 dark:bg-red-200 dark:text-black text-center" role="alert">
              Enter valid repassword                
              </div>

          </div>
</li>
    </ul>
    <button
    id="btn"
    type="submit"
    class=" text-center py-3 px-3 rounded bg-red-700 text-white hover:bg-red-900 focus:outline-none my-1 disabled:bg-transparent	border border-red-800" disabled ;
>Create Account</button>
     
    

      
  </div>

 
</div>`;
document.getElementById("instructions").innerHTML=``;
document.getElementById("rowData").innerHTML=``;
document.getElementById("Searchcontainer").innerHTML=``;


}
var flag = 0;
function validateInputs(element) {
var nameInput=document.getElementById("fullName");
var emailInput=document.getElementById("Email");
var phoneInput=document.getElementById("phone");
var ageInput=document.getElementById("age");
var passwordInput=document.getElementById("password");
var repasswordInput=document.getElementById("repassword");

  console.log(element.value);
  let regex = {
    fullName: /^[A-Za-z\s][A-Za-z\s]{3,28}$/,
    Password: /^(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
    Email: /^[\w-\.]+@([\w-]+\.)+[\w\d-]{2,4}$/,
    phone: /^01[0125][0-9]{8}$/,
    age: /^([1-9]|[1-9][0-9]|100)$/,
    repassword:/^(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
  };
  
  if (regex[element.id].test(element.value)) {
    flag = 1;
    
    $(`#${element.id}`).next().removeClass("block").addClass("hidden");
  


} 
else
 {


    $(`#${element.id}`).next().removeClass("hidden").addClass("block");

    // element.nextElementSibling.classList.replace("hidden","block");
    // element.classList.remove("is-valid")
    // element.classList.add("is-invalid")
    flag = 0;
  }
  if ($(".Alert:not(.hidden)").length > 0) {

    
    $("#btn").attr("disabled", true);
  } else {
    {
      if (
        nameInput.value &&
        emailInput.value &&
        phoneInput.value &&
        ageInput.value &&
        passwordInput.value &&
        repasswordInput.value
      )

  {
    if (passwordInput.value ==
    repasswordInput.value)
{

  console.log("not");  
  $("#btn").removeAttr("disabled");
}
  
  }      
  
  
  }
  }
}
