// check if there's local storage color option
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);

  // remove active class from all colors list items
  document.querySelectorAll(".colors-list-li").forEach(element => {
    element.classList.remove("active");

    // add active class on element with data-color === local storage item
    if (element.dataset.color === mainColors) {
      // add active class
      element.classList.add("active");
    }
  });
}

// Random Background Option
let backgroundOption = true;

// variable to control the backgroundOption interval
let backgroundInterval;

// check if there is local storage random background item
let backgroundLocalItem = localStorage.getItem("background_option");

// check if random background local storage is not empty
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  // remove active class from all span
  document.querySelectorAll(".random-backgrounds span").forEach(element => {
    element.classList.remove("active");
  });

  if (backgroundLocalItem === true) {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

// Toggle Spin Class On Icon
document.querySelector(".toggle-settings .fa-gear").onclick = function() {
  //Toggle Class fa-spin for rotation on self
  this.classList.toggle("fa-spin");
  // toggle class open on main settings box
  document.querySelector(".setting-box").classList.toggle("open");
};

// switch colors
const colorsLi = document.querySelectorAll(".colors-list li");

// Loop on all list items
colorsLi.forEach(li => {
  // click on Every List Items
  li.addEventListener("click", e => {
    // set color on root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // set color on local storage
    localStorage.setItem("color_option", e.target.dataset.color);

    handleActive(e);

    // remove active class from all childrens
    e.target.parentElement.querySelectorAll(".active").forEach(element => {
      element.classList.remove("active");
    });

    // add active class on self
    e.target.classList.add("active");
  });
});

// switch Random Background option
const ranomBackE1 = document.querySelectorAll(".random-backgrounds span");

// Loop on all spans
ranomBackE1.forEach(span => {
  // click on Every  span
  span.addEventListener("click", e => {
    handleActive(e);

    // remove active class from all childrens
    e.target.parentElement.querySelectorAll(".active").forEach(element => {
      element.classList.remove("active");
    });

    // add active class on self
    e.target.classList.add("active");

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;

      randomizeImgs();

      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;

      clearInterval(backgroundInterval);

      localStorage.setItem("background_option", false);
    }
  });
});

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Get Array of Imgs
let imgsArray = [
  "travel02.jpg",
  "travel03.jpg",
  "travel04.jpg",
  "travel05.jpg"
];

// function to randomize imgs
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      // Change Background Image URL
      landingPage.style.backgroundImage =
        "url(imgs/" + imgsArray[randomNumber] + ")";
    }, 3000);
  }
}

randomizeImgs();

// select skills selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function allSkills() {
  // skills offset top
  let skillsOffsetTop = ourSkills.offsetTop;

  // skills outer height
  let skillsOuterHeight = ourSkills.offsetHeight;

  // window Height
  let windowHeight = this.innerHeight;

  // window scrollTop
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box  .skill-progress span"
    );

    allSkills.forEach(skill => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Create Popup with Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {
  img.addEventListener("click", e => {
    // create overlay elemet
    let overlay = document.createElement("div");

    // add class to overlay
    overlay.className = "popup-overlay";

    // Append overlay to the body
    document.body.appendChild(overlay);

    // create the popup
    let popupBox = document.createElement("div");

    // add class to the popupBox
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      //create heading
      let imgHeading = document.createElement("h3");

      // create text for heading
      let imgText = document.createTextNode(img.alt);

      // append the text to the heading
      imgHeading.appendChild(imgText);

      // append the heading to the popup Box
      popupBox.appendChild(imgHeading);
    }

    // create the image
    let popupImage = document.createElement("img");

    // set image source
    popupImage.src = img.src;

    // add image to popupBox
    popupBox.appendChild(popupImage);

    // append the popupBox to body
    document.body.appendChild(popupBox);

    //create the close span
    let closeButton = document.createElement("span");

    //create the close button text
    let closeButtonText = document.createTextNode("X");

    //append text to close button
    closeButton.appendChild(closeButtonText);

    // add class to close button
    closeButton.className = "close-button";

    // add close button to the popup box
    popupBox.appendChild(closeButton);
  });
});

// close popup
document.addEventListener("click", function(e) {
  if (e.target.className == "close-button") {
    //remove the current popup
    e.target.parentNode.remove();

    // remove the overlay
    document.querySelector(".popup-overlay").remove();
  }
});

const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".links a");

function scrollToSomewhere(elements) {
  elements.forEach(ele => {
    ele.addEventListener("click", e => {
      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth"
      });
    });
  });
}
scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);

// Handle Active State
function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach(element => {
    element.classList.remove("active");
  });

  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletscontainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach(span => {
    span.classList.remove("active");
  });

  if (bulletLocalItem === "block") {
    bulletscontainer.style.display = "block";

    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletscontainer.style.display = "none";

    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach(span => {
  span.addEventListener("click", e => {
    if (span.dataset.display === "show") {
      bulletscontainer.style.display = "block";

      localStorage.setItem("bullets_option", "block");
    } else {
      bulletscontainer.style.display = "none";

      localStorage.setItem("bullets_option", "none");
    }

    handleActive(e);
  });
});

// Reset button
document.querySelector(".reset-options").onclick = function() {
  localStorage.clear(); // clear all data
  localStorage.removeItem("color-option");
  localStorage.removeItem("background-option");

  window.location.reload(); // reload after clearing
};
