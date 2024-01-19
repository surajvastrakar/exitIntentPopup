  // CSS styles for the popup
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

    #eipoverlay *{
      margin:0px;
      padding:0px;
      box-sizing:border-box;
    }
   #eipoverlay {
    box-sizing:border-box;
    font-family: 'Poppins', sans-serif;
     position: fixed;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     background-color: rgba(0, 0, 0, 0.9);
     display: none;
     justify-content: center;
     align-items: center;
     z-index: 9999999999;
   }

   #eipoverlay #popup-container {
     position: relative;
     background-color: #fdd503;
     width: 55%;
     padding-left:40px;
   }
   #eipoverlay #popup-heading{
     padding:20px 15px;
     text-align:center;
   }
   #eipoverlay #popup-heading h2{
     font-size:17px;
     font-weight:900;
   }

   #eipoverlay #modal{
     display:flex;
   }
   #eipoverlay #modal-content{
     width:55%;
     display:flex;
     flex-direction:column;
     justify-content:center;
     align-items:center;

   }
   #eipoverlay #modal-banner{
     width:45%;
     display:flex;
     justify-content:center;
     align-items:center;
   }
   #eipoverlay #popup-close {
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
   #eipoverlay form{
     width:100%;
   }
   #eipoverlay input[type="text"],
   #eipoverlay input[type="email"] {
     width: 100%;
     display:block;
     padding: 15px;
     border:2px solid #8080803b;
   }

   #eipoverlay #submit-btn {
     padding: 15px;
     background-color: #000;
     color: #fff;
     border: none;
     cursor: pointer;
     display:block;
     width:100%;
   }

   #eipoverlay #checkbox-label {
     display: block;
     font-size:12px;
   }
   #eipoverlay #checkbox{
     vertical-align: middle;
   }
   #eipoverlay #policy{
     font-size:12px;
     text-align:center;
     display:block;
     margin-top:10px;
     margin-bottom:20px;
     color:black;
   }
   #eipoverlay .error-message{
      font-size:10px;
      margin-bottom:10px;
      color:red;
   }
   #eipoverlay #checkbox-error{
    font-size:10px;
    margin-bottom: 20px;
    color:red;
   }
   @media screen and (max-width:992px){
    #eipoverlay  #modal-banner{
       display:none;
     }
     #eipoverlay  #modal-content{
       width:100%;
     }
     #eipoverlay #popup-container{
       padding:10px 20px;
     }
   }
   @media screen and (max-width:768px){

    #eipoverlay #popup-container{
       width:90%;
     }
     #eipoverlay #popup-heading h2{
     font-size:15px;
    }
   }
  `;

  // Create the overlay and popup elements
  const overlay = document.createElement("div");
  overlay.id = "eipoverlay";
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
           
           <input type="text" id="name" placeholder="your name" >
           <p class="error-message"></p>
          
           <input type="email" id="email" placeholder="email address">
           <p class="error-message"></p>
          
           <label id="checkbox-label">
             <input type="checkbox" id="checkbox">
             Check this box to receive monthly newsletter.
           </label>
           <p class="error-message" id="checkbox-error"></p>

           <button type="submit" id="submit-btn">SIGN UP</button>
           <a href="#" id="policy">PRIVACY POLICY</a>
         </form>

       </div>

       <div id="modal-banner">
           <img src="https://useruploads.visualwebsiteoptimizer.com/useruploads/176372/images/339bf06d957c32e3b61f79b563f229af_offerx500.png" alt="sale" width="100%">
       </div>
     </div>
   </div>
  `;

  // Create style element elements
  const styleElement = document.createElement("style");
  styleElement.textContent = styles;

  // Add the overlay and styles to the document
  document.body.appendChild(overlay);
  document.head.appendChild(styleElement);

  // function to show popup
  const showPopup = () => {
    if (
      document.cookie.indexOf("popupSubmitted=true") === -1 &&
      document.cookie.indexOf("popupClosed=true") === -1
    ) {
      overlay.style.display = "flex";
    }
  };

  // function to hide popup
  const hidePopup = () => {
    overlay.style.display = "none";
  };

  //function to show error messages
  const setErrorMessage = (elem, msg) => {
    if (elem.type === "checkbox") {
      checkboxError.textContent = msg;
    } else {
      elem.nextElementSibling.textContent = msg;
    }
  };

  // closing the popup on click of close icon
  document.getElementById("popup-close").onclick = () => {
    hidePopup();
    document.cookie = "popupClosed=true";
  };

  // form validation
  const form = document.getElementById("popup-form");
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const checkbox = document.getElementById("checkbox");
  const checkboxError = document.getElementById("checkbox-error");

  const validateName = (elem) => {
    value = elem.value.trim();
    if (value === "") {
      setErrorMessage(name, "Name is required");
    } else if (!/^[a-zA-Z ]+$/.test(value)) {
      setErrorMessage(name, "Name can only contains letters and spaces");
    } else {
      setErrorMessage(name, "");
      return true;
    }
  };

  const validateEmail = (elem) => {
    value = elem.value.trim();
    if (value === "") {
      setErrorMessage(email, "Email is required");
    } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(value)) {
      setErrorMessage(email, "Invalid email format");
    } else {
      setErrorMessage(email, "");
      return true;
    }
  };

  const validateCheckbox = (elem) => {
    if (!elem.checked) {
      setErrorMessage(checkbox, "You must check the checkbox");
    } else {
      setErrorMessage(checkbox, "");
      return true;
    }
  };

  // show/hide error messages
  name.onkeyup = () => validateName(name);
  email.onkeyup = () => validateEmail(email);
  checkbox.onchange = () => validateCheckbox(checkbox);

  // handling the form submission
  form.onsubmit = (event) => {
    event.preventDefault();

    let isValid =
      validateName(name) && validateEmail(email) && validateCheckbox(checkbox);

    if (isValid) {
      hidePopup();

      // resetting values
      name.value = null;
      email.value = null;
      checkbox.checked = null;

      // setting cookie
      document.cookie = "popupSubmitted=true";

      alert("Form submitted successfully. Thankyou!");
    } else {
      validateName(name);
      validateEmail(email);
      validateCheckbox(checkbox);
    }
  };

  // popup display logic based on screensizes
  if (window.matchMedia("(min-width:1025px)").matches) {
    document.addEventListener("mouseleave", (event) => {
      if (event.clientY <= 0) {
        showPopup();
      }
    });
  } else if (window.matchMedia("(max-width:1024px)").matches) {
    setTimeout(showPopup, 5000);
  }
