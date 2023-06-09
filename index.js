// CSS styles for the popup
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family: 'Roboto', sans-serif;
  }
  #overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  #popup-container {
    position: relative;
    background-color: #fed501;
    width: 55%;
    padding-left:40px;
  }
  #popup-heading{
    padding:20px 15px;
    text-align:center;
  }
  #popup-heading h2{
    font-size:17px;
    font-weight:900;
  }
  
  #modal{
    display:flex;
  }
  #modal-content{
    width:55%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

  }
  #modal-banner{
    width:45%;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  #popup-close {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 40px;
    color: #000;
    border: none;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    cursor: pointer;
  }
  form{
    width:100%;
  }
  input[type="text"],
  input[type="email"] {
    width: 100%;
    display:block;
    padding: 15px;
    margin-bottom: 10px;
    border:2px solid #8080803b;
  }

  #submit-btn {
    padding: 15px;
    background-color: #000;
    color: #fff;
    border: none;
    cursor: pointer;
    display:block;
    width:100%;
  }

  #checkbox-label {
    display: block;
    margin-bottom: 20px;
    font-size:12px;
  }
  #checkbox{
    vertical-align: middle;
  }
  #policy{
    font-size:12px;
    text-align:center;
    display:block;
    margin-top:10px;
    margin-bottom:20px;
  }
  @media screen and (max-width:992px){
    #modal-banner{
      display:none;
    }
    #modal-content{
      width:100%;
    }
    #popup-container{
      padding:10px 20px;
    }
  }
  @media screen and (max-width:768px){
    
    #popup-container{
      width:90%;
    }
    #popup-heading h2{
    font-size:15px;
   }
  }
`;

// Function to show the popup
function showPopup() {
  overlay.style.display = "flex";
  document.body.style.position = "fixed";
  document.body.style.top = `-${window.scrollY}px`;
}

// Function to hide the popup
function hidePopup() {
  overlay.style.display = "none";
  document.body.style.position = "";
  document.body.style.top = "";
}

// Function to handle form submission
function submitForm(event) {
  event.preventDefault();

  // Perform form validation
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const checkbox = checkboxInput.checked;
  if (name === "" || email === "") {
    alert("Please fill details in all fields.");
    return;
  }
  if (!checkbox) {
    alert("Please check the checkbox.");
    return;
  }

  // We can perform any additional logic or submit the form to the server
  // For this task, I just log the form data in console
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Checkbox:", checkbox);

  // Set the formSubmitted flag to true
  formSubmitted = true;

  // Create a cookie to indicate successful submission
  document.cookie = "popupSubmitted=true";

  // Hide the popup
  hidePopup();
}

// Function to set the popupClosed cookie
function setPopupClosedCookie() {
  document.cookie = "popupClosed=true";
}

// Check if the popup should be displayed
const shouldShowPopup = () => {
  return (
    !formSubmitted &&
    document.cookie.indexOf("popupSubmitted=true") === -1 &&
    document.cookie.indexOf("popupClosed=true") === -1
  );
};

// Create the overlay and popup elements
const overlay = document.createElement("div");
overlay.id = "overlay";
overlay.innerHTML = `
  <div id="popup-container">
    <span id="popup-close">&times;</span>
    <div id="modal">
      <div id="modal-content">
        <div id="popup-heading">
          <h2>GET $10 OFF WHEN YOU SIGN UP FOR</h2>
          <p>SAVINGS, NEWS, UPDATES AND MORE</p>
        </div>

        <form id="popup-form">
          
          <input type="text" id="name" placeholder="your name" required>

          
          <input type="email" id="email" placeholder="email address" required>

          <label id="checkbox-label">
            <input type="checkbox" id="checkbox">
            Check this box to receive monthly newsletter.
          </label>

          <button type="submit" id="submit-btn">SIGN UP</button>
          <a href="#" id="policy">PRIVACY POLICY</a>
        </form>
        
      </div>

      <div id="modal-banner">
          <img src="https://img.freepik.com/free-vector/attractive-black-friday-sale-yellow-background_1017-27927.jpg" alt="sale" width="100%">
      </div>
    </div> 
  </div>
`;

// Add the overlay and styles to the document
document.body.appendChild(overlay);

const styleElement = document.createElement("style");
styleElement.textContent = styles;
document.head.appendChild(styleElement);

// Variables to track form submission
let formSubmitted = false;

// Get form input elements
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const checkboxInput = document.getElementById("checkbox");

// Event listener for exit intent
if (window.matchMedia("(min-width:1025px)").matches) {
  document.addEventListener("mouseleave", function (event) {
    if (event.clientY <= 0 && shouldShowPopup()) {
      showPopup();
    }
  });
} else if (shouldShowPopup()) {
  setTimeout(showPopup, 5000);
}

// Event listener for form submission
document.getElementById("popup-form").addEventListener("submit", submitForm);

// Event listener to handle closing the popup by clicking outside the form for now I commented it but if you want to close the popup by clicking outside the form you can just uncomment below code
// overlay.addEventListener("click", function(event) {
//   if (event.target === overlay) {
//     hidePopup();
//     setPopupClosedCookie();
//   }
// });

// Event listener to handle closing the popup using the close button
document.getElementById("popup-close").addEventListener("click", function () {
  hidePopup();
  setPopupClosedCookie();
  return false;
});

// Hide the popup if any of the cookies are present
if (!shouldShowPopup()) {
  hidePopup();
}
