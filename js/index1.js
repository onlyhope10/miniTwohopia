// Primary Client-ID: XYT5T3yPOk1cO09fCRPeoJGqg2u8ct25prLl69N3dlI
// Secondary Client ID: F_AlrteKQ31bG2Gz9qt6eP94IkHZdOjnYQafFuuKFGc

const global = {
  currentPage: window.location.pathname,
};
const perPage = 15;
let currentPage = 1;

// ########## Dark Mode & localStorage

if (
  localStorage.getItem("color-theme") === "dark" ||
  (!("color-theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

let themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
let themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");

// Change the icons inside the button based on previous settings
if (
  localStorage.getItem("color-theme") === "dark" ||
  (!("color-theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  themeToggleLightIcon.classList.remove("hidden");
} else {
  themeToggleDarkIcon.classList.remove("hidden");
}

let themeToggleBtn = document.getElementById("theme-toggle");

themeToggleBtn.addEventListener("click", function () {
  // toggle icons inside button
  themeToggleDarkIcon.classList.toggle("hidden");
  themeToggleLightIcon.classList.toggle("hidden");

  // if set via local storage previously
  if (localStorage.getItem("color-theme")) {
    if (localStorage.getItem("color-theme") === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }

    // if NOT set via local storage previously
  } else {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
  }
});

const API_KEY = "XYT5T3yPOk1cO09fCRPeoJGqg2u8ct25prLl69N3dlI";
const API_URL = "https://api.unsplash.com";

// ########## Display Random Background

async function displayRandomBG() {
  const results = await fetchAPIRandom("/photos/random");
  console.log(results);
  const background = document.querySelector("#hero");
  background.style.background = `url(${results.urls.full})`;
  background.style.backgroundSize = "cover";
  background.style.backgroundPosition = "center";
  background.style.backgroundRepeat = "no-repeat";
  background.style.backgroundColor;
}

const downloadImg = (imgURL) => {
  dlName = "image.jpg";
  fetch(imgURL)
    .then((res) => res.blob())
    .then((file) => {
      console.log(file);
      const a = document.createElement("a");
      a.href = URL.createObjectURL(file);
      a.download = dlName;
      a.click();
    })
    .catch(() => alert("Failed to download the image!"));
};
// ########## Display Images

async function displayImages() {
  const results = await fetchAPIData("/photos");
  imagesWrapper = document.querySelector(".images");

  console.log(results);

  results.forEach((img) => {
    const modalId = `defaultModal${img.id}`;
    imagesWrapper.innerHTML += `
              <li class="card">
                <img
                  data-modal-target="${modalId}"
                  data-modal-toggle="${modalId}"
                  type="button"
                  src="${img.urls.regular}"
                  alt="img"
                />
                <div class="details">
                  <div class="photographer">
                    <a href="${img.user.links.html}">
                      <img
                        id="profile-image"
                        src="${img.user.profile_image.small}"
                        alt="img"
                        style="width: 30px"
                      />
                      <span class="hover:underline">${img.user.name}</span></a
                    >
                  </div>
                  <button onclick="downloadImg('${img.urls.regular}')"><i class="uil uil-import"></i></button>
                </div>
                <!-- Main modal -->
                <div
                  id="${modalId}"
                  tabindex="-1"
                  aria-hidden="true"
                  class="modalBackdrop flex items-center justify-center fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden md:inset-0 h-min"
                >
                  <div class="relative w-full max-w-2xl max-h-full my-12" id="modal-body">
                    <!-- Modal content -->
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      <!-- Modal header -->
                      <div
                        class="flex items-center justify-between px-4 pt-4 rounded-t dark:border-gray-600"
                      > <span id="modal-likes"><i class="fa-regular fa-heart fa-xl"> </i>  ${img.likes}</span>
                      <a href="https://www.instagram.com/${img.user.social.instagram_username}" class="ml-12">
                      <span id="modal-social">
                      <i class="fa-brands fa-instagram fa-xl"></i> ${img.user.social.instagram_username}
                      </span>
                      </a>
    
                      
                        <button
                          type="button"
                          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                          data-modal-hide="${modalId}"
                        >
                          <svg
                            class="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </button>
                      </div>
                      <!-- Modal body -->
                      <div class="p-4 space-y-6">
                        <img src="${img.urls.regular}" alt="img" class="rounded"  />
                        
                    </div>
    
                    <div
                      class="flex items-center justify-between px-4 pb-6 space-x-2 border-gray-200 rounded-b dark:border-gray-600"
                    id="modal-footer">
                    <div class="photographer">
                    <a href="${img.user.links.html}">
                      <img
                        id="profile-image"
                        src="${img.user.profile_image.small}"
                        alt="img"
                        style="width: 30px; height: 30px"
                      />
                    
                    <span
                      class="text-lg hover:border-b-gray-900 font-medium text-gray-900 dark:text-white"
                      >${img.user.name}</span
                    ></a>
                  </div>
                  <button onclick="downloadImg('${img.urls.regular}')"
                    class="text-black-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xl p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <i class="uil uil-import"></i>
                  </button>
                    </div>
                    
                  </div>
                </div>
              </li>
      
                `;
  });
  showAndHideModal();
}
function showAndHideModal() {
  const modalHideButtons = document.querySelectorAll("[data-modal-hide]");
  const displayImageModal = document.querySelectorAll("[data-modal-target]");

  modalHideButtons.forEach((button) => {
    button.addEventListener("click", hideModal);
  });

  displayImageModal.forEach((img) => {
    img.addEventListener("click", showModal);
  });
}

function hideModal() {
  const modalId = this.getAttribute("data-modal-hide");
  const modalElement = document.getElementById(modalId);
  modalElement.classList.add("hidden");
  modalElement.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "auto";
}

function showModal() {
  const imageId = this.getAttribute("data-modal-target");
  const modal = document.getElementById(imageId);
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

// ########## Load More Images

async function loadMoreImages() {
  currentPage++;
  await displayImages();
  showAndHideModal();
}

// ########## GET images from Unpslash API

async function fetchAPIData(endpoint, query) {
  const response = await fetch(
    `${API_URL}${endpoint}?page=${currentPage}&per_page=${perPage}&client_id=${API_KEY}`
  );
  const data = await response.json();

  return data;
}

// ########## GET a random image from Unpslash API

async function fetchAPIRandom(endpoint) {
  const response = await fetch(
    `${API_URL}${endpoint}?query=bright?orientation=landscape&client_id=${API_KEY}`
  );

  const data = await response.json();

  return data;
}

showAndHideModal();
displayImages();
displayRandomBG();

// ########## Event Listeners

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 6) {
    loadMoreImages();
  }
});
