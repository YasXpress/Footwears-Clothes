// Utility function to set element height dynamically
function setElementHeight(selector, offset = 0) {
  const element = document.querySelector(selector);
  if (element) {
      element.style.height = `${screen.height - offset}px`;
  }
}

// Utility function to show or hide elements
function toggleElementDisplay(selector, displayValue) {
  const element = document.querySelector(selector);
  if (element) {
      element.style.display = displayValue;
  }
}

// Utility function to set z-index based on condition
function setZIndexBasedOnCondition(condition, element1, element2) {
  const elem1 = document.querySelector(element1);
  const elem2 = document.querySelector(element2);
  if (elem1 && elem2) {
      if (condition) {
          elem1.style.zIndex = 1;
          elem2.style.zIndex = 0;
      } else {
          elem1.style.zIndex = 0;
          elem2.style.zIndex = 1;
      }
  }
}

// Set initial heights for various elements
setInterval(()=>{
  setElementHeight('.MCD', 142);
  setElementHeight('.DIC_D_C', 142);
  setElementHeight('.A_MCD_MAIN', 60 + 142);
  setElementHeight('.A_MCD_MAIN_SBD', 100 + 142);
  setElementHeight('.SUB_PD_M', 105 + 142);
  setElementHeight('.ADD_PD_M', 105 + 142);
},100)

// SUB_PD_M scroll handling
setInterval(() => {
  const isScrolled = document.querySelector('.H').scrollTop !== 0;
  const ctStatus = localStorage.getItem('CT') === 'true';
  
  // Adjust visibility and height based on scroll and 'CT' status
  if (isScrolled || ctStatus) {
      toggleElementDisplay('.MCD_TC_Phone', 'none');
      toggleElementDisplay('.MCD_TC_CNL', 'none');
      setElementHeight('.MCD_B', 50 + 142);
      setElementHeight('.H', 50 + 142);
      setElementHeight('.C', 50 + 142);
  } else {
      toggleElementDisplay('.MCD_TC_Phone', 'flex');
      toggleElementDisplay('.MCD_TC_CNL', 'flex');
      setElementHeight('.MCD_B', 137 + 142);
      setElementHeight('.H', 137 + 142);
      setElementHeight('.C', 137 + 142);
  }

  // Toggle z-index based on CT status
  setZIndexBasedOnCondition(ctStatus, '.C', '.H');

  // Show admin section based on localStorage
  if (localStorage.getItem("ADMIN") === "true") {
      document.querySelector('.A_MCD').style.display = "block";
      localStorage.setItem("userOrder", " ");
  } else {
      document.querySelector('.A_MCD').style.display = "none";
  }
}, 100);

// Toggle between A and M sections
document.querySelectorAll('.MA_B').forEach((e) => {
  e.addEventListener('click', () => {
      const dataDashedId = e.dataset.id;
      const isA = dataDashedId === 'A';
      const isM = dataDashedId === 'M';

      document.querySelector('.A').style.display = isA ? 'flex' : 'none';
      document.querySelector('.M').style.display = isM ? 'flex' : 'none';
  });
});

// Handle CALA page visibility based on user information
setInterval(() => {
  const userNP = localStorage.getItem("user_NP");
  const calaPage = document.querySelector('.CALA_page_B');
  const caButton = document.querySelector('.CA');

  if (userNP === null) {
      calaPage.style.display = 'block';
  } else {
      calaPage.style.display = 'none';
      caButton.innerText = userNP.split('/')[0];
  }
}, 100);

// Validate and save user data for CALA page
document.querySelector('.CALA_page_Button').addEventListener('click', () => {
  const ipcValue = document.querySelector('.IPC').value;
  const ipValue = document.querySelector('.IP').value;
  
  if (ipValue !== "" && ipcValue.length === 10 || ipcValue.length === 11) {
      const phoneNumber = ipcValue.length === 11 ? `+234${ipcValue.slice(1)}` : `+234${ipcValue}`;
      

      if (ipValue.toLowerCase() === "yasxpress" && ipcValue === "09162820838") {
          localStorage.setItem("ADMIN", 'true');
          
          localStorage.setItem("Contact_WA","")
          localStorage.setItem("userName","")
          localStorage.setItem("userOrder","")
          localStorage.setItem("userPhoneNumber","")
          localStorage.setItem("orderSet","")

          document.querySelector('.IPC').value = "";
          document.querySelector('.IP').value = "";

      } else {
          localStorage.setItem("ADMIN", 'false');
          localStorage.setItem("user_NP", `${ipValue}/${phoneNumber}`);

          document.querySelector('.IPC').value = "";
          document.querySelector('.IP').value = "";
      }
  } else {
      // Invalid input handling
      document.querySelector('.IP').style.outline = ipValue !== "" ? "2px solid green" : "2px solid red";
      document.querySelector('.IPC').style.outline = ipcValue.length === 10 || ipcValue.length === 11 ? "2px solid green" : "2px solid red";
  }
});






(function() {
  // Utility function to safely access localStorage
  const safeLocalStorage = {
      get: (key) => {
          try {
              return localStorage.getItem(key);
          } catch (e) {
              console.warn(`Error accessing localStorage for key: ${key}`);
              return null;
          }
      },
      set: (key, value) => {
          try {
              localStorage.setItem(key, value);
          } catch (e) {
              console.warn(`Error setting localStorage for key: ${key}`);
          }
      },
      remove: (key) => {
          try {
              localStorage.removeItem(key);
          } catch (e) {
              console.warn(`Error removing localStorage for key: ${key}`);
          }
      }
  };

  // Function to toggle zIndex of elements
  function toggleZIndex(showElement, hideElement) {
      showElement.style.zIndex = 1;
      hideElement.style.zIndex = 0;
  }

  // Handle navigation between home and cart sections
  document.querySelector('.home').addEventListener('click', () => {
      toggleZIndex(document.querySelector('.H'), document.querySelector('.C'));
      safeLocalStorage.set('CT', 'false');
      document.querySelector('.A').style.display = 'none';

      document.querySelector('.footer').style.display = "none";
  });

  document.querySelector('.cart').addEventListener('click', () => {
      toggleZIndex(document.querySelector('.C'), document.querySelector('.H'));
      safeLocalStorage.set('CT', 'true');
      document.querySelector('.A').style.display = 'none';
  });

  // A_MCD_MAIN_STD_I click event handler with delegation
  document.addEventListener('click', (event) => {
      if (event.target.matches('.A_MCD_MAIN_STD_I')) {
          toggleZIndex(document.querySelector('.A_MCD_MAIN_F'), document.querySelector('.A_MCD_MAIN_S'));
      }
  });

  

  // Clear session/localStorage and reset UI on logout
  document.querySelector('.A_MCD_L').addEventListener('click', () => {
      ['ADMIN', 'user_NP', 'Contact_WA', 'userName', 'userOrder', 'userPhoneNumber', 'orderSet', 'product_I', 'product_LCount', 'product_N', 'product_P'].forEach(key => safeLocalStorage.remove(key));
      
      document.querySelector('.CA').innerText = "Create new account";
      toggleZIndex(document.querySelector('.H'), document.querySelector('.C'));
      safeLocalStorage.set('CT', 'false');
      
  });

  // Handle showing and hiding of Add/Remove Product sections
  document.querySelector('.A_MCD_S').addEventListener('click', () => {
      document.querySelector('.ADD_PD').style.display = "none";
      document.querySelector('.SUB_PD').style.display = "block";
  });

  document.querySelector('.A_MCD_A').addEventListener('click', () => {
      document.querySelector('.ADD_PD').style.display = "block";
      document.querySelector('.SUB_PD').style.display = "none";
  });

  // Handle closing of SUB_PD and ADD_PD sections
  document.querySelector('.SUB_PD_H').addEventListener('click', () => {
      document.querySelector('.SUB_PD').style.display = "none";
  });

  document.querySelector('.ADD_PD_H').addEventListener('click', () => {
      document.querySelector('.ADD_PD').style.display = "none";
  });

  // Handle DIC_BACK click event with delegation
  document.addEventListener('click', (event) => {
      if (event.target.matches('.DIC_BACK')) {
          document.querySelector('.DIC_D_C').style.display = "none";
      }
  });
})();






setInterval(()=>{

  var div = document.querySelector('.C');  // Replace with your div's ID
  div.addEventListener('scroll', function() {
      if (div.scrollTop + div.clientHeight === div.scrollHeight) {
          document.querySelector('.footer').style.display = "block";
      }else{
          document.querySelector('.footer').style.display = "none";
      }
  });
  
},3000)



const _0x3a30a1=_0x49de;(function(_0x55060d,_0x41fb4c){const _0x1ebc11=_0x49de,_0x1f5561=_0x55060d();while(!![]){try{const _0x23d87d=-parseInt(_0x1ebc11(0x17a))/0x1+-parseInt(_0x1ebc11(0x17d))/0x2*(parseInt(_0x1ebc11(0x17c))/0x3)+-parseInt(_0x1ebc11(0x171))/0x4*(parseInt(_0x1ebc11(0x176))/0x5)+parseInt(_0x1ebc11(0x175))/0x6+-parseInt(_0x1ebc11(0x178))/0x7+parseInt(_0x1ebc11(0x182))/0x8*(parseInt(_0x1ebc11(0x17b))/0x9)+parseInt(_0x1ebc11(0x172))/0xa;if(_0x23d87d===_0x41fb4c)break;else _0x1f5561['push'](_0x1f5561['shift']());}catch(_0x20c5aa){_0x1f5561['push'](_0x1f5561['shift']());}}}(_0x46b4,0x90311));import{initializeApp}from'https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js';import{getAnalytics}from'https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js';function _0x49de(_0x117208,_0x1a4525){const _0x46b48f=_0x46b4();return _0x49de=function(_0x49de52,_0x201066){_0x49de52=_0x49de52-0x171;let _0x56cde6=_0x46b48f[_0x49de52];return _0x56cde6;},_0x49de(_0x117208,_0x1a4525);}import{getDatabase,set,ref,remove,update,child,onValue}from'https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js';function _0x46b4(){const _0x50cb1f=['22643230bECyyg','AIzaSyCAw54gL8LIHBc6o6vhSjC15Jx1vB3YvOM','207958975330','1074786ObTEwT','445bqVJCP','G-8LFBVXEMP6','33320pljRIX','1:207958975330:web:f5416907ee9bb1389a023b','916984vACmzr','36CTVpLp','2619xIqHNU','958kesPGV','https://examonline1-ff7fb-default-rtdb.firebaseio.com','examonline1-ff7fb.firebasestorage.app','examonline1-ff7fb','examonline1-ff7fb.firebaseapp.com','1080584zBllgq','47336bjHdXU'];_0x46b4=function(){return _0x50cb1f;};return _0x46b4();}const firebaseConfig={'apiKey':_0x3a30a1(0x173),'authDomain':_0x3a30a1(0x181),'databaseURL':_0x3a30a1(0x17e),'projectId':_0x3a30a1(0x180),'storageBucket':_0x3a30a1(0x17f),'messagingSenderId':_0x3a30a1(0x174),'appId':_0x3a30a1(0x179),'measurementId':_0x3a30a1(0x177)},app=initializeApp(firebaseConfig),analytics=getAnalytics(app),db=getDatabase();



// Helper function to get local storage values
const getLocalStorage = (key) => localStorage.getItem(key);

// Helper function to set local storage values
const setLocalStorage = (key, value) => localStorage.setItem(key, value);

// Helper function to clear local storage
const clearLocalStorage = (key) => localStorage.removeItem(key);







// Function to handle UI updates
const handleUIUpdate = () => {
  if (getLocalStorage("hasAccount") === 'true' && getLocalStorage("ADMIN") !== "true" && getLocalStorage('user_NP') !== null) {
    const [userName, phoneNumber] = getLocalStorage('user_NP').split('/');
    set(ref(db, `UI/${phoneNumber}`), {
      userName,
      phoneNumber,
      order: ""
    }).then(() => {
      setLocalStorage("hasAccount", 'false');
    });
  }
};

// Set Interval for UI handling
setInterval(handleUIUpdate, 100);

// Handle UI data when fetched
let UI = [{
  order: "",
  phoneNumber: "",
  userName: ""
}];



onValue(ref(db, "UI"), (snapshot) => {
  UI = [];
  snapshot.forEach((userDetail) => {
    UI.push(userDetail.val());
  });
});










// Function to safely save data to localStorage
function saveToLocalStorage(key, value) {
  try {
      const sanitizedKey = key.replace(/[^a-zA-Z0-9_]/g, '_'); // Only alphanumeric and underscores allowed
      const sanitizedValue = value ? value.trim() : '';
      if (sanitizedKey && sanitizedValue) {
          localStorage.setItem(sanitizedKey, sanitizedValue);
      } else {
          console.warn(`Invalid data: ${sanitizedKey}`);
      }
  } catch (error) {
      console.error('Error saving to localStorage:', error);
  }
}

// Function to process UI data and save order items to localStorage
function processUI(UI) {
  if (!Array.isArray(UI)) {
      console.error('Invalid UI data: Expected an array.');
      return;
  }

  // Loop through each UI element
  UI.forEach((item, index) => {
      if (!item?.order) {
          console.warn(`Skipping UI item at index ${index} due to missing 'order' property.`);
          return;
      }

      // Process each order part in 'order'
      item.order.split(',').forEach((part) => {
          if (part.includes('/')) {
              const [partId] = part.split('/');
              if (partId) {
                  saveToLocalStorage(`CI${partId}`, part); // Save part to localStorage
              } else {
                  console.warn(`Invalid part: ${part} at index ${index}`);
              }
          } else {
              console.warn(`Skipping invalid part: ${part} at index ${index}. Expected '/' separator.`);
          }
      });
  });
}

// Main function to update the UI based on the current state
const updateUI = () => {
  if (UI.length === 0) return;

  const userNP = getLocalStorage('user_NP');
  if (!userNP) return;

  const [userName, phoneNumber] = userNP.split('/');
  if (!userName || !phoneNumber || getLocalStorage('ADMIN') === 'true') return;

  let hasAccount = 'false'; // Default to 'false'

  UI.forEach((item) => {
      if (item.phoneNumber === phoneNumber) {
          hasAccount = 'true';

          if (item.order !== getLocalStorage('orderSet')) {
              const orderSet = getLocalStorage('orderSet') || '';
              if (orderSet || localStorage.getItem('alreadyUpload') === 'true') {
                  // Update order in the database
                  update(ref(db, `UI/${phoneNumber}`), {
                      userName,
                      phoneNumber,
                      order: orderSet
                  });
              } else {
                  localStorage.setItem('alreadyUpload', 'true');
                  processUI(UI); // Process UI to save order details to localStorage
              }
          }
      }
  });

  // Only set 'hasAccount' in localStorage if it's still 'false'
  if (hasAccount === 'false') {
      setLocalStorage('hasAccount', 'true');
  }
};

// Run the updateUI function periodically (every 100ms)
setInterval(updateUI, 100);














// Fetch product IDs
let productID = [];

const fetchProductID = () => {
  onValue(ref(db, "productID"), (snapshot) => {
    productID = [];
    productID.push(snapshot.val());
  });
};

setInterval(fetchProductID, 100);

// Add product function
document.querySelector('.ADD_PD_MCB').addEventListener("click", () => {
  const productNameInput = document.querySelector('.ADD_PD_MC_PNI');
  const productPriceInput = document.querySelector('.ADD_PD_MC_PPI');
  const productCountInput = document.querySelector('.ADD_PD_MC_PLCI');

  const productName = productNameInput.value;
  const productPrice = productPriceInput.value;
  const productCount = productCountInput.value || 0;

  if (productName.length > 0 && productPrice.length > 0) {
    setLocalStorage("product_N", productName);
    setLocalStorage("product_P", productPrice);
    setLocalStorage("product_LCount", productCount);

    productNameInput.style.outline = "2px solid transparent";
    productPriceInput.style.outline = "2px solid transparent";
    productNameInput.value = "";
    productPriceInput.value = "";
    document.querySelector('.ADD_PD_MC_I').style.backgroundImage = `url('')`;

    // Increment Product ID and add product
    update(ref(db, "productID"), {
      productID: productID[0].productID + 1
    }).then(() => {
      const currentProductID = productID[0].productID;
      set(ref(db, `PI/product_${currentProductID}`), {
        i: getLocalStorage("product_I"),
        n: getLocalStorage("product_N"),
        p: getLocalStorage("product_P"),
        id: currentProductID,
        lc: getLocalStorage("product_LCount")
      }).then(() => {
        clearLocalStorage("product_I");
        clearLocalStorage("product_N");
        clearLocalStorage("product_P");
        clearLocalStorage("product_LCount");
      }).catch((error) => {
        console.error("Error adding product: ", error);
      });
    });
  } else {
    // Handle invalid input by changing outline color
    if (productName.length === 0) {
      productNameInput.style.outline = "2px solid red";
      productPriceInput.style.outline = productPrice.length === 0 ? "2px solid red" : "2px solid green";
    } else {
      productNameInput.style.outline = "2px solid green";
      productPriceInput.style.outline = "2px solid red";
    }
  }
});





















// Define a constant for storing PI data.
const PI = [];

// Function to handle value changes securely and efficiently.
const handlePIData = (snapshot) => {
    try {
        // Clear the array only if you want to refresh the entire data.
        // If you need to update only modified records, you can merge the data instead.
        const updatedPI = [];

        snapshot.forEach((userDetail) => {
            // Ensure each userDetail has a valid value
            const userData = userDetail.val();
            if (userData && userData.i !== undefined) {
                updatedPI.push(userData);
            }
        });

        // Updating the global PI array with the new values securely.
        // If you need to use a state management solution (e.g., Redux, Context API), do that here.
        PI.length = 0; // Clear the array before pushing updated data.
        updatedPI.forEach(item => PI.push(item));

        // Optionally, log to check the data
        //console.log('Updated PI:', PI);

    } catch (error) {
        console.error("Error fetching PI data:", error);
    }
};

// Securely handle data from Firebase database
onValue(ref(db, "PI"), (snapshot) => {
    handlePIData(snapshot);
}, (error) => {
    console.error("Error with onValue listener:", error);
});

























/**/


// Use constants for fixed values
const LIKE_ICON_UNLIKE = "none";
const LIKE_ICON_LIKE = "block";
const PRODUCT_PREFIX = 'PI/product_';

// Caching the DOM elements for better performance
const HElement = document.querySelector('.H');
const SUB_PD_MElement = document.querySelector('.SUB_PD_M');
const AElement = document.querySelector('.A');
const DIC_D = document.querySelector('.DIC_D');


// Initializing sessionStorage and localStorage values
sessionStorage.setItem("C_I", PI.length);
sessionStorage.setItem("U_I", PI.length);
sessionStorage.setItem("CI", PI.length);

let PTC_H = '';
let Delete_p = '';

// Function to format large numbers (like likes or price)
const formatNumber = (number) => {
    if (number >= 1_000_000_000) return (number / 1_000_000_000).toFixed(2) + 'B';
    if (number >= 1_000_000) return (number / 1_000_000).toFixed(2) + 'M';
    if (number >= 1_000) return (number / 1_000).toFixed(2) + 'K';
    return number.toString();
};

// Function to format price
const formatPrices = (price) => {
    return price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Function to handle product like status
const handleLikeStatus = (product) => {
    let likeIcon_unlike = LIKE_ICON_UNLIKE;
    let likeIcon_like = LIKE_ICON_LIKE;
    let likeCount = formatNumber(product.lc);

    if (localStorage.getItem(`likeIcon${product.id}`) === 'like') {
        likeIcon_unlike = LIKE_ICON_UNLIKE;
        likeIcon_like = LIKE_ICON_LIKE;
    } else if (localStorage.getItem(`likeIcon${product.id}`) === 'unlike') {
        likeIcon_unlike = LIKE_ICON_LIKE;
        likeIcon_like = LIKE_ICON_UNLIKE;
    }

    return { likeIcon_unlike, likeIcon_like, likeCount };
};






// Function to update product view
const updateProductView = (product, likeIcon_unlike, likeIcon_like, likeCount, price) => {
    PTC_H += `
        <div class="HPCD">
            <div class="HPCD_T">
                <p class="HPCD_T_N">new</p>
                <div class="HPCD_T_CI">
                    <span class="HPCD_T_C HPCD_T_C${product.id}" data-like-count="${product.lc}">${likeCount}</span>
                    <p class="HPCD_T_IB HPCD_T_IB${product.id}" style="display: ${likeIcon_unlike};" data-i="${product.i}" data-n="${product.n}" data-p="${product.p}" data-id="${product.id}" data-lc="${product.lc}"></p>
                    <p class="HPCD_T_IC HPCD_T_IC${product.id}" style="display: ${likeIcon_like};" data-i="${product.i}" data-n="${product.n}" data-p="${product.p}" data-id="${product.id}" data-lc="${product.lc}"></p>
                </div>
            </div>
            <div class="HPCD_I" style="background-image: url('${product.i}');" data-i="${product.i}" data-n="${product.n}" data-p="${product.p}" data-id="${product.id}" data-lc="${product.lc}">
                <img src="${product.i}" class="Img_FC">
            </div>
            <div class="HPCD_N">${product.n}</div>
            <p class="HPCD_P">&#8358 ${price}</p>
            <div class="HPCD_AC" data-id="${product.id}" data-price="${product.p}">
                <p class="HPCD_AC_I"></p> Add to cart
            </div>
            <div class="HPCD_IS">
                <p class="HPCD_IS_I"></p> In stock
            </div>
        </div>
    `;
    
    Delete_p += `
        <div class="SUB_PD_MPC" style="background-image: url('${product.i}');">
            <p class="SUB_PD_MPC_D" data-id="${product.id}"></p>
            <img src="${product.i}" class="Img_FC HPCD_I" data-i="${product.i}" data-n="${product.n}" data-p="${product.p}" data-id="${product.id}" data-lc="${product.lc}">
        </div>
    `;

};

// Event listener for "Add to Cart"
const handleAddToCart = (e) => {
    let dataDashed_Id = e.dataset.id;
    let dataDashed_Price = e.dataset.price;

    if (localStorage.getItem("user_NP") !== null) {
        let cartItem = localStorage.getItem(`CI${dataDashed_Id}`);
        if (!cartItem) {
            localStorage.setItem(`CI${dataDashed_Id}`, `${dataDashed_Id}/1`);
        } else {
            let [id, quantity] = cartItem.split('/');
            localStorage.setItem(`CI${dataDashed_Id}`, `${id}/${parseInt(quantity) + 1}`);
        }
        localStorage.setItem("CCA_represh", 'true');
    } else {
        AElement.style.display = "block";
    }
};

// Event listener for "Remove from Cart"
const handleRemoveFromCart = (e) => {
    let dataDashed_Id = e.dataset.id;

    // Call Firebase API to remove product
    remove(ref(getDatabase(), `${PRODUCT_PREFIX}${dataDashed_Id}`))
        .then(() => {
            localStorage.setItem("CCA_represh", 'true');
            localStorage.setItem("reset_PI", 'true');
        });

    if (PI.length === 0) {
        HElement.innerHTML = '';
        SUB_PD_MElement.innerHTML = '';
    }
};






// Main loop to refresh the product view and cart
let deffrentArrangement = true;
setInterval(() => {
    if (PI.length !== 0 && PI[0].id !== 0) {
        // Check if we need to reset the session data
        if (sessionStorage.getItem("C_I") !== PI.length || localStorage.getItem("reset_PI") === 'true') {
            sessionStorage.setItem("C_I", PI.length);
            sessionStorage.setItem("U_I", PI.length);
            PTC_H = '';
            Delete_p = '';
            
            localStorage.removeItem("reset_PI");
            HElement.innerHTML = '';
            SUB_PD_MElement.innerHTML = '';
        }


        // Function to shuffle an array using the Fisher-Yates algorithm
      function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
          [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
        }
      }

      if(deffrentArrangement === true){
        shuffleArray(PI);
        deffrentArrangement = false;
      }
      

      
      
      // Iterate over all products
      PI.forEach((product, index) => {
          if (true) {//index !== 0
              let { likeIcon_unlike, likeIcon_like, likeCount } = handleLikeStatus(product);
              let price = formatPrices(product.p);
              updateProductView(product, likeIcon_unlike, likeIcon_like, likeCount, price);
          }
      });

      // Update the DOM
      HElement.innerHTML = PTC_H;
      SUB_PD_MElement.innerHTML = Delete_p;
      



        
        // Event listeners for "Add to Cart"
        document.querySelectorAll('.HPCD_AC').forEach((e) => {
            e.addEventListener('click', () => handleAddToCart(e));
        });

        // Event listeners for "Remove from Cart"
        document.querySelectorAll('.SUB_PD_MPC_D').forEach((e) => {
            e.addEventListener('click', () => handleRemoveFromCart(e));
        });

        // Event listeners for Like/Unlike functionality
        document.querySelectorAll('.HPCD_T_IB').forEach((e) => {
            e.addEventListener('click', () => {
                let dataDashed_Id = e.dataset.id;
                let dataDashed_lc=e.dataset.lc;
                document.querySelector(`.HPCD_T_IC${dataDashed_Id}`).style.display = "block";
                document.querySelector(`.HPCD_T_IB${dataDashed_Id}`).style.display = "none";
                localStorage.setItem(`likeIcon${dataDashed_Id}`, 'like');
                // Update the like count
                update(ref(getDatabase(), `${PRODUCT_PREFIX}${dataDashed_Id}`), {
                    lc: Number(dataDashed_lc) + 1
                });
            });
        });

        document.querySelectorAll('.HPCD_T_IC').forEach((e) => {
            e.addEventListener('click', () => {
                let dataDashed_Id = e.dataset.id;
                let dataDashed_lc=e.dataset.lc;
                document.querySelector(`.HPCD_T_IC${dataDashed_Id}`).style.display = "none";
                document.querySelector(`.HPCD_T_IB${dataDashed_Id}`).style.display = "block";
                localStorage.setItem(`likeIcon${dataDashed_Id}`, 'unlike');
                // Update the like count
                update(ref(getDatabase(), `${PRODUCT_PREFIX}${dataDashed_Id}`), {
                    lc: Number(dataDashed_lc) - 1
                });
            });
        });


        
        document.querySelectorAll('.HPCD_I').forEach((e) => {
            e.addEventListener('click', () => {
                let dataDashed_Id = e.dataset.id;
                let dataDashed_lc=e.dataset.lc;
                let dataDashed_i=e.dataset.i;
                let dataDashed_n=e.dataset.n;
                let dataDashed_p=e.dataset.p;
                let dataDashed_Q=e.dataset.q;
                    

                document.querySelector(".DIC_D").innerHTML=`
                <div class="DIC_I">
                    <p class="DIC_BACK"></p>
                    <img src="${dataDashed_i}" class="Img_FC">
                </div>
                <P class="DIC_N">${dataDashed_n}</P>
                <P class="DIC_P"> &#8358 ${dataDashed_p}</P>
                <div class="HPCD_IS">
                    <p class="HPCD_IS_I"></p> In stock
                </div>
                `;
                document.querySelector(".DIC_D_C").style.display="block";
            });
        });


    }



    var div = document.querySelector('.H');  // Replace with your div's ID
    div.addEventListener('scroll', function() {
        if (div.scrollTop + div.clientHeight === div.scrollHeight) {
        
            
            document.querySelector('.BecauseOFLodding_I').style.display = "block";

            setTimeout(()=>{
              deffrentArrangement = true;
              document.querySelector('.H').scrollTop = 1;
            },2000)

        }else{
            document.querySelector('.BecauseOFLodding_I').style.display = "none";
        }
    });


}, 100);












/**/

// Function to format prices with commas
const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};



// Helper function to update local storage with new quantities
const updateLocalStorage = (id, quantity) => {
    const currentData = localStorage.getItem(`CI${id}`);
    const [productId, currentQuantity] = currentData ? currentData.split('/') : [id, 0];
    const newQuantity = quantity ? quantity : parseInt(currentQuantity) + 1;
    localStorage.setItem(`CI${id}`, `${productId}/${newQuantity}`);
    return newQuantity;
};

// Helper function to create item element for cart
const createCartItem = (item, quantity) => {
    const price = formatPrice(item.p);
    const totalPrice = formatPrice(item.p * quantity);
    return `
        <div class="CPCD_B">
            <div class="CPCD_B_L">
                <div class="CPCD_B_LI HPCD_I" style="background-image: url('${item.i}')"  data-i="${item.i}" data-n="${item.n}" data-p="${item.p}" data-id="${item.id}" data-lc="${item.lc}">
                    <img src="${item.i}" class="Img_FC">
                </div>
            </div>
            <div class="CPCD_B_R">
                <p class="CPCD_B_RN">${item.n}</p>
                <p class="CPCD_B_RP"> &#8358 ${price}</p>
                <div class="CPCD_B_RQ">
                    <p class="CPCD_B_R_A" data-id="${item.id}" data-price="${item.p}">+</p>
                    <p class="CPCD_B_R_Q CPCD_B_R_Q${item.id}">${quantity}</p>
                    <p class="CPCD_B_R_S" data-id="${item.id}" data-price="${item.p}">-</p>
                </div>
                <p class="CPCD_B_RT CPCD_B_RT${item.id}"> &#8358 ${totalPrice}</p>
            </div>
        </div>
    `;
};

// Function to update cart display
const updateCartDisplay = (cartContent , quantity) => {

  if(cartContent === '<div class="CPCD_T">Shopping Cart</div>'){
    document.querySelector('.C').innerHTML = cartContent + '<div class="Empty_C"></div>';
  }else{
    document.querySelector('.C').innerHTML = cartContent;
  }

  document.querySelector('.CC').innerText = quantity;
};

// Event listeners for quantity updates
const addQuantityEventListeners = () => {
    document.querySelectorAll('.CPCD_B_R_A').forEach(item => {
        item.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            const price = e.target.dataset.price;
            const quantity = updateLocalStorage(id);
            const totalPrice = formatPrice(price * quantity);
            document.querySelector(`.CPCD_B_R_Q${id}`).innerText = quantity;
            document.querySelector(`.CPCD_B_RT${id}`).innerHTML = `&#8358 ${totalPrice}`;
            //updateCartDisplay(document.querySelector('.C').innerHTML);
        });
    });

    document.querySelectorAll('.CPCD_B_R_S').forEach(item => {
        item.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            const price = e.target.dataset.price;
            let quantity = parseInt(document.querySelector(`.CPCD_B_R_Q${id}`).innerText);

            if (quantity > 1) {
                quantity--;
                updateLocalStorage(id, quantity);
            } else {
                localStorage.removeItem(`CI${id}`);
            }
            const totalPrice = formatPrice(price * quantity);
            document.querySelector(`.CPCD_B_R_Q${id}`).innerText = quantity;
            document.querySelector(`.CPCD_B_RT${id}`).innerHTML = `&#8358 ${totalPrice}`;
            //updateCartDisplay(document.querySelector('.C').innerHTML);
        });
    });
};

// Main function to handle the cart and local storage logic
const updateShoppingCart = () => {
    let cartContent = '<div class="CPCD_T">Shopping Cart</div>';
    let cartIds = [];
    let cartTotal = 0;
    let orderSet = "";

    

    // Initialize cart display
    if (PI.length > 0 && PI[0].id !== 0) {
        const cartIndex = sessionStorage.getItem("CI") || 0;
        if (localStorage.getItem("CCA_represh") === 'true') {
            localStorage.removeItem("CCA_represh");
            cartContent = '<div class="CPCD_T">Shopping Cart</div>';
            document.querySelector('.C').innerHTML = cartContent;
            document.querySelector('.CC').innerText = 0;
        }

        for (let i = 0; i < PI.length; i++) {
            const currentItem = PI[i];
            if (!cartIds.includes(currentItem.id) && localStorage.getItem(`CI${currentItem.id}`)) {
                cartIds.push(currentItem.id);
                const quantity = parseInt(localStorage.getItem(`CI${currentItem.id}`).split('/')[1]);
                cartContent += createCartItem(currentItem, quantity);
                cartTotal += quantity;

                if(i === 0){
                    orderSet += localStorage.getItem(`CI${currentItem.id}`);
                }else{
                    orderSet += "," + localStorage.getItem(`CI${currentItem.id}`);
                }
                
            }
        }

        if(orderSet !== getLocalStorage('orderSet')){
            localStorage.setItem('orderSet',orderSet)
        }
        

        updateCartDisplay(cartContent, cartTotal);
        addQuantityEventListeners();
    }
};

// Running the interval to check and update cart regularly
setInterval(() => {
    updateShoppingCart();
}, 100);



/**/














document.querySelector('.LO_D').addEventListener('click', () => {
    try {
      // Clear user and admin data from localStorage
      removeLocalStorageItems(['ADMIN', 'user_NP','alreadyUpload']);
      
      // Reset account creation button text and hide modal
      document.querySelector('.CA').innerText = "Create new account";
      document.querySelector('.M').style.display = 'none';
  
      // Remove order data and reset UI layers
      removeLocalStorageItems(['orderSet']);
      resetUI();
  
      // Set specific flags to false
      localStorage.setItem('CT', 'false');
      localStorage.setItem('FPC', 'display');
  
      // Clear product-specific data in localStorage
      clearProductData();
  
      // Refresh the app by setting a flag
      localStorage.setItem('CCA_represh', 'true');
    } catch (error) {
      console.error("Error during logout:", error);
    }
  });
  
  // Helper function to remove multiple items from localStorage
  function removeLocalStorageItems(items) {
    items.forEach(item => {
      try {
        localStorage.removeItem(item);
      } catch (error) {
        console.error(`Error removing ${item} from localStorage:`, error);
      }
    });
  }
  
  // Helper function to reset UI state
  function resetUI() {
    const header = document.querySelector('.H');
    const content = document.querySelector('.C');
  
    if (header && content) {
      header.style.zIndex = 1;
      content.style.zIndex = 0;
    }
  }
  
  // Helper function to clear product-related localStorage data
  function clearProductData() {
    try {
      const productCount = productID[0]?.productID || 0; // Ensure productID is valid
      for (let i = 0; i < productCount + 1; i++) {
        //console.log(`Clearing product data for product ID: ${i}`);
        localStorage.removeItem(`CI${i}`);
        localStorage.removeItem(`likeIcon${i}`);
      }
    } catch (error) {
      console.error("Error clearing product data:", error);
    }
  }
  

































































  





//*ADMIN*/
sessionStorage.setItem("ADMIN_C_I",UI.length)//confirm index
sessionStorage.setItem("ADMIN_U_I",UI.length)//use index


let ADMIN_PTC_H=``;
let ADMIN_PTC_Order=``;
setInterval(()=>{

    if(localStorage.getItem("ADMIN")==="true" && UI.length != 0 && UI[0].userName !=""){

        //home
        if(sessionStorage.getItem("ADMIN_C_I") != UI.length){ 
            sessionStorage.setItem("ADMIN_C_I",UI.length)
            sessionStorage.setItem("ADMIN_U_I",UI.length)
            ADMIN_PTC_H=``;
        }
        

        if(sessionStorage.getItem("ADMIN_U_I") != 0){
            sessionStorage.setItem("ADMIN_U_I",sessionStorage.getItem("ADMIN_U_I")-1)


            //PTC_H
            ADMIN_PTC_H+=`
            <div class="A_MCD_MAIN_FC" 
            data-user-name="${UI[sessionStorage.getItem("ADMIN_U_I")].userName}";
            data-user-order="${UI[sessionStorage.getItem("ADMIN_U_I")].order}";
            data-user-phone-number="${UI[sessionStorage.getItem("ADMIN_U_I")].phoneNumber}";>
                <p class="A_MCD_MAIN_FI"></p>
                <div class="A_MCD_MAIN_FNP">
                    <p class="A_MCD_MAIN_FN">${UI[sessionStorage.getItem("ADMIN_U_I")].userName}</p>
                    <p class="A_MCD_MAIN_FP"><a href="tel:${UI[sessionStorage.getItem("ADMIN_U_I")].phoneNumber}" class="A_MCD_MAIN_FP_A">${UI[sessionStorage.getItem("ADMIN_U_I")].phoneNumber}</a></p>
                </div>
            </div>
            `;

            document.querySelector('.A_MCD_MAIN_F').innerHTML=ADMIN_PTC_H;


            const A_MCD_MAIN_FC=document.querySelectorAll('.A_MCD_MAIN_FC');
            A_MCD_MAIN_FC.forEach((e)=>{
                e.addEventListener('click',()=>{
                    let dataDashed_userName=e.dataset.userName;
                    let dataDashed_userOrder=e.dataset.userOrder;
                    let dataDashed_userPhoneNumber=e.dataset.userPhoneNumber;

                    localStorage.setItem("userName",dataDashed_userName)
                    localStorage.setItem("userOrder",dataDashed_userOrder)
                    localStorage.setItem("userPhoneNumber",dataDashed_userPhoneNumber)

                    document.querySelector('.A_MCD_MAIN_F').style.zIndex=0;
                    document.querySelector('.A_MCD_MAIN_S').style.zIndex=1;

                    //
                    localStorage.setItem("Contact_WA",dataDashed_userPhoneNumber)
                    
                })
            })
            
            
        }


        


        
        //A_MCD_MAIN_SBD
        if(localStorage.getItem("userPhoneNumber") != sessionStorage.getItem("userPhoneNumber")){

            

            sessionStorage.setItem("userPhoneNumber",localStorage.getItem("userPhoneNumber"))

            ADMIN_PTC_Order=`<div class="A_MCD_MAIN_SBD_WB"></div>`;

            for(let i=0;i<localStorage.getItem("userOrder").split(',').length;i++){
                let productId=Number(localStorage.getItem("userOrder").split(',')[i].split('/')[0]);
                let productQ=Number(localStorage.getItem("userOrder").split(',')[i].split('/')[1]);


                for(let i=0;i<PI.length;i++){
                    if(productId===Number(PI[i].id)){

                        //ADD COMMER TO PRICE
                        let price=`${PI[i].p}`;
                        let Totalprice=`${PI[i].p*productQ}`;

                        //price
                        if(price.length===4){
                            price=price.slice(0,1)+','+price.slice(1,4);
                        }else if(price.length===5){
                            price=price.slice(0,2)+','+price.slice(2,5);
                        }else if(price.length===6){
                            price=price.slice(0,3)+','+price.slice(3,6);
                        }else if(price.length===7){
                            price=price.slice(0,1)+','+price.slice(1,4)+','+price.slice(4,7);
                        }else if(price.length===8){
                            price=price.slice(0,2)+','+price.slice(2,5)+','+price.slice(5,8);
                        }else if(price.length===9){
                            price=price.slice(0,3)+','+price.slice(3,6)+','+price.slice(6,9);
                        }
                        //Totalprice
                        if(Totalprice.length===4){
                            Totalprice=Totalprice.slice(0,1)+','+Totalprice.slice(1,4);
                        }else if(Totalprice.length===5){
                            Totalprice=Totalprice.slice(0,2)+','+Totalprice.slice(2,5);
                        }else if(Totalprice.length===6){
                            Totalprice=Totalprice.slice(0,3)+','+Totalprice.slice(3,6);
                        }else if(price.length===7){
                            Totalprice=Totalprice.slice(0,1)+','+Totalprice.slice(1,4)+','+Totalprice.slice(4,7);
                        }else if(Totalprice.length===8){
                            Totalprice=Totalprice.slice(0,2)+','+Totalprice.slice(2,5)+','+Totalprice.slice(5,8);
                        }else if(Totalprice.length===9){
                            Totalprice=Totalprice.slice(0,3)+','+Totalprice.slice(3,6)+','+Totalprice.slice(6,9);
                        }

                        ADMIN_PTC_Order+=`
                        <div class="A_MCD_MAIN_SBD_B">
                            <div class="A_MCD_MAIN_SBD_B_L">
                                <div class="A_MCD_MAIN_SBD_B_LI HPCD_I" style="background-image: url('${PI[i].i}');" data-i="${PI[i].i}" data-n="${PI[i].n}" data-p="${PI[i].p}">
                                    <img src="${PI[i].i}" class="Img_FC">
                                </div>
                            </div>
                            <div class="A_MCD_MAIN_SBD_B_R">
                                <P class="A_MCD_MAIN_SBD_B_RN">${PI[i].n}</P>
                                <P class="A_MCD_MAIN_SBD_B_RP"><b>subtotal:</b> &#8358 ${price}</P>
                                <P class="A_MCD_MAIN_SBD_B_RQ"><b>quantity:</b> ${productQ}</P>
                                <P class="A_MCD_MAIN_SBD_B_RT">Total: &#8358 ${Totalprice}</P>
                            </div>
                        </div>
                        `;
                    }
                }
            }

            document.querySelector('.A_MCD_MAIN_SBD').innerHTML=ADMIN_PTC_Order;
            document.querySelector('.A_MCD_MAIN_STD').innerHTML=`
            <p class="A_MCD_MAIN_STD_I"></p>
            order by <p class="A_MCD_MAIN_STD_UN">${localStorage.getItem("userName")}</p>
            `;


            document.querySelector('.A_MCD_MAIN_SBD_WB').addEventListener('click',()=>{

                let phoneNumber=localStorage.getItem("Contact_WA");
                let url="https://wa.me/"+phoneNumber;
                window.open(url,"_blank").focus();

            })

        }

    }
})

















// Help Center / Contact Us
document.querySelector('.HC_D').addEventListener('click', () => {
  const phoneNumber = "+2349162820838";
  const url = `https://wa.me/${escapeHtml(phoneNumber)}`;
  window.open(url, "_blank").focus();
});

















document.querySelector('.ADD_PD_MC_IPI').addEventListener('change', (e) => {
    const files = e.target.files;

    // Check if a file was selected
    if (!files || files.length === 0) {
        console.error('No file selected.');
        return;
    }

    const file = files[0];

    // Validate the file type (only images allowed)
    if (!file.type.startsWith('image/')) {
        console.error('The selected file is not an image.');
        return;
    }

    // Create a new FileReader instance
    const picRender = new FileReader();

    picRender.onload = (event) => {
        // Validate the image data (just in case)
        const imageData = event.target.result;
        if (typeof imageData !== 'string' || !imageData.startsWith('data:image/')) {
            console.error('Invalid image data.');
            return;
        }

        // Store the image data securely in localStorage
        try {
            // Check if product_I already exists in localStorage
            if (localStorage.getItem('product_I')) {
                console.log('Product image already set.');
            }

            // Store image in localStorage
            localStorage.setItem('product_I', imageData);

            // Update the background image of the element
            const imageElement = document.querySelector('.ADD_PD_MC_I');
            if (imageElement) {
                imageElement.style.backgroundImage = `url('${imageData}')`;
            } else {
                console.error('Image element not found.');
            }
        } catch (error) {
            console.error('Error setting image to localStorage:', error);
        }
    };

    // Error handling for file reading process
    picRender.onerror = () => {
        console.error('Error reading the file.');
    };

    // Read the file as a Data URL (base64)
    picRender.readAsDataURL(file);
});


















// Handle FPC display timeout FIRST PAGE

  const fpcElement = document.querySelector('.FPC');

  const FPC_LG = document.querySelector('.FPC_LG');
  const FPC_CD = document.querySelector('.FPC_CD');
  const FPC_TX = document.querySelector('.FPC_TX');

  document.querySelector('.FPC').style.display = 'block';

  setInterval(() => {
    
    if (PI.length > 0 && PI[0].id !== 0) {
      
      if (screen.width > 1024) {

        FPC_LG.style.display = 'none';
        FPC_CD.style.display = 'block';
        FPC_TX.style.display = 'block';
        fpcElement.style.display = 'block';
        
      }else{
  
        FPC_LG.style.display = 'block';
        FPC_CD.style.display = 'none';
        FPC_TX.style.display = 'none';
        fpcElement.style.display = 'none';
  
      }

    }


  }, 100);




