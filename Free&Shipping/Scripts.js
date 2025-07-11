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
            elem1.style.zIndex = 2;
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
        //localStorage.setItem("userOrder", " ");
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


        if(document.querySelector('.CA').innerText === 'Create New Account'){
          document.querySelector('.CA').style.animationName = 'L_sign';
        }
    });
  });
  
  // Handle CALA page visibility based on user information
  setInterval(() => {
    const userNP = localStorage.getItem("user_NP");
    const calaPage = document.querySelector('.CALA_page_B');
    const caButton = document.querySelector('.CA');
  
    if (userNP !== null) {
        calaPage.style.display = 'none';
        caButton.innerText = userNP.split('/')[0];
    } 
  }, 100);
  
  //    set all product first
  if (localStorage.getItem("Product_C") === null) {
    localStorage.setItem("Product_C","A")
  }

  // Validate and save user data for CALA page
  document.querySelector('.CALA_page_Button').addEventListener('click', () => {
    const ipcValue = document.querySelector('.IPC').value;
    const ipValue = document.querySelector('.IP').value;
    
    if (ipValue !== "" && ipcValue.length === 10 || ipcValue.length === 11) {
        const phoneNumber = ipcValue.length === 11 ? `+234${ipcValue.slice(1)}` : `+234${ipcValue}`;
        
  
        if (ipValue.toLowerCase() === "yasxpress" && ipcValue === "09162820838") {
            localStorage.setItem("ADMIN", 'true');
            localStorage.setItem("Product_C",'A')
            
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
            localStorage.setItem("Product_C",'A')
  
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

        window.location.reload();
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
  
  
  
//Create New Account Button
  setInterval(()=>{
    document.querySelector('.CA').addEventListener('click',()=>{
      if(document.querySelector('.CA').innerText === 'Create New Account'){
        document.querySelector('.CALA_page_B').style.display = 'block';
        document.querySelector('.CA').style.animationName = '';

      }else {
        document.querySelector('.A').style.display = 'none';
      }

    })
  },2000)
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  



/**/
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import{getDatabase,set,ref,remove,update,child,onValue}from'https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js';


const firebaseConfig = {
  apiKey: "AIzaSyBmzsiveIceDQSbSrO-phCB1WmqksjsCVc",
  authDomain: "yasxpress-f9bfc.firebaseapp.com",
  databaseURL: "https://yasxpress-f9bfc-default-rtdb.firebaseio.com",
  projectId: "yasxpress-f9bfc",
  storageBucket: "yasxpress-f9bfc.firebasestorage.app",
  messagingSenderId: "846222157126",
  appId: "1:846222157126:web:1e890c791fc4f0912db147",
  measurementId: "G-PMFSKE339V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getDatabase();










  
  
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
        /**/
      set(ref(db, `UI/${phoneNumber}`), {
        userName,
        phoneNumber,
        order: "",
        view:"F"
      }).then(() => {
        setLocalStorage("hasAccount", 'false');
      });
      
    }
  };






  // Set Interval for UI handling
  setInterval(handleUIUpdate, 100);
  /**/
  // Handle UI data when fetched
  let UI = [{
    order: "",
    phoneNumber: "",
    userName: "",
    view:""
  }];
  



  

  

  
  /**/
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

        const userNP = getLocalStorage('user_NP');
        if(item.phoneNumber === userNP.split('/')[1]){
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
        }
    });
  }
  
  // Main function to update the UI based on the current state
  const updateUI = () => {
    if (UI.length === 0) return;
  
    const userNP = getLocalStorage('user_NP');
    if (!userNP) return;
  
    const [userName, phoneNumber] = userNP.split('/');
    if (!userName || !phoneNumber || getLocalStorage('ADMIN') === 'true') return;
  
  
    

    /*
    let hasAccount = 'false'; // Default to 'false'
  
    UI.forEach((item) => {
        if (item.phoneNumber === phoneNumber) {
            hasAccount = 'true';
  
            if (item.order !== getLocalStorage('orderSet')) {
                const orderSet = getLocalStorage('orderSet') || '';
                if (localStorage.getItem('alreadyUpload') === 'true' || orderSet) {
                    
                    // Update order in the database
                    update(ref(db, `UI/${phoneNumber}`), {
                        userName,
                        phoneNumber,
                        order: orderSet,
                        view:"F"
                    });
                    
                } else if(localStorage.getItem('EmptyOrder') !== 'T') { //
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
  */





    let hasAccount = 'false'; // Default

    const matchedUser = UI.find(item => item.phoneNumber === phoneNumber);

    if (matchedUser) {
        hasAccount = 'true';

        const currentOrder = getLocalStorage('orderSet');
        if (matchedUser.order !== currentOrder) {
            const orderSet = currentOrder || '';
            const alreadyUpload = localStorage.getItem('alreadyUpload') === 'true';

            if (alreadyUpload || orderSet) {
                /**/
                // Update order in the database
                update(ref(db, `UI/${phoneNumber}`), {
                    userName,
                    phoneNumber,
                    order: orderSet,
                    view: "F"
                });
               
            } else if (localStorage.getItem('EmptyOrder') !== 'T') {
                localStorage.setItem('alreadyUpload', 'true');
                processUI(UI); // Save order details to localStorage
            }
        }
    }

    // Only set 'hasAccount' in localStorage if it's still 'false'
    if (hasAccount === 'false') {
        setLocalStorage('hasAccount', 'true');
    }





  };
  
  // Run the updateUI function periodically (every 100ms)
  setInterval(updateUI, 100);
  
  
  
  
  
  
  
  
  
  
  
  
  
  /* */
  // Fetch product IDs
  let productID = [{productID:"0"}];
  

  
  
  const fetchProductID = () => {
    /**/
    
    
  };
  
  setInterval(fetchProductID, 100);
  /**/
  onValue(ref(db, "productID"), (snapshot) => {
    productID = [];
    productID.push(snapshot.val());
  });
  

  // Add product function
  document.querySelector('.ADD_PD_MCB').addEventListener("click", () => {
    const productNameInput = document.querySelector('.ADD_PD_MC_PNI');
    const productPriceInput = document.querySelector('.ADD_PD_MC_PPI');
    const productCountInput = document.querySelector('.ADD_PD_MC_PLCI');
    const productCategoryInput = document.querySelector('.ADD_PD_MC_PLCC');
  
    const productName = productNameInput.value;
    const productPrice = productPriceInput.value;
    const productCount = productCountInput.value || 0;
    const productCategory = productCategoryInput.value;
  
    const AT = productPrice.length > 0 && productPrice.length > 0 && productCount.length > 0 && productCategory.length > 0 ;
  
  
    if ( AT && productPrice.length > 0) {
      setLocalStorage("product_N", productName);
      setLocalStorage("product_P", productPrice);
      setLocalStorage("product_LCount", productCount);
      setLocalStorage("product_CG", productCategory);
  
      productNameInput.style.outline = "2px solid transparent";
      productPriceInput.style.outline = "2px solid transparent";
      productCountInput.style.outline = "2px solid transparent";
      productCategoryInput.style.outline = "2px solid transparent";
  
      productNameInput.value = "";
      productPriceInput.value = "";
      productCountInput.value = "";
      productCategoryInput.value = "";
  
      document.querySelector('.ADD_PD_MC_I').style.backgroundImage = `url('')`;

        /**/
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
          lc: getLocalStorage("product_LCount"),
          c: getLocalStorage("product_CG")
        }).then(() => {
          clearLocalStorage("product_I");
          clearLocalStorage("product_N");
          clearLocalStorage("product_P");
          clearLocalStorage("product_LCount");
          clearLocalStorage("product_CG");
        }).catch((error) => {
          console.error("Error adding product: ", error);
        });
      });
      
    }
  
  });
  
  
  
  
  
  
  
  
  
  

  
  
  
  /**/
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

  /**/
  // Securely handle data from Firebase database
  onValue(ref(db, "PI"), (snapshot) => {
      handlePIData(snapshot);
  }, (error) => {
      console.error("Error with onValue listener:", error);
  });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // Use constants for fixed values
  const LIKE_ICON_UNLIKE = "none";//none
  const LIKE_ICON_LIKE = "block";//block
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
      } else if (localStorage.getItem(`likeIcon${product.id}`) === 'unlike' || localStorage.getItem(`likeIcon${product.id}`) === null) {
          likeIcon_unlike = LIKE_ICON_LIKE;
          likeIcon_like = LIKE_ICON_UNLIKE;
      }
  
      return { likeIcon_unlike, likeIcon_like, likeCount };
  };
  
  
  
  
  
  
  // Function to update product view
  const updateProductView = (product, likeIcon_unlike, likeIcon_like, likeCount, price, priceDiscount) => {
    
      PTC_H += `
          <div class="HPCD">
              <div class="HPCD_T">
                  <p class="HPCD_T_N">new</p>
                  <div class="HPCD_T_CI">
                      <span class="HPCD_T_C HPCD_T_C${product.id}" data-like-count="${product.lc}">${likeCount}</span>
                      <p class="HPCD_T_IB HPCD_T_IB${product.c} HPCD_T_IB${product.id}" style="display: ${likeIcon_unlike};" data-i="${product.i}" data-n="${product.n}" data-p="${product.p}" data-id="${product.id}" data-lc="${product.lc}"></p>
                      <p class="HPCD_T_IC HPCD_T_IC${product.c} HPCD_T_IC${product.id}" style="display: ${likeIcon_like};" data-i="${product.i}" data-n="${product.n}" data-p="${product.p}" data-id="${product.id}" data-lc="${product.lc}"></p>
                  </div>
              </div>
              <div class="HPCD_I HPCD_I${product.c}" style="background-image: url('${product.i}');" data-i="${product.i}" data-n="${product.n}" data-p="${product.p}" data-id="${product.id}" data-lc="${product.lc}">
                  <img src="${product.i}" class="Img_FC">
              </div>
              <div class="HPCD_N">${product.n}</div>
              <p class="HPCD_P">&#8358 ${price}</p>
              <p class="HPCD_PD">&#8358 ${priceDiscount}</p>
              <div class="HPCD_AC${product.c} HPCD_AC" data-id="${product.id}" data-price="${product.p}">
                  <p class="HPCD_AC_I"></p> Add to cart
              </div>
              <div class="HPCD_IS">
                  <p class="HPCD_IS_I"></p> In stock
              </div>
          </div>
      `;
      
      Delete_p += `
          <div class="SUB_PD_MPC" style="background-image: url('${product.i}');">
              <p class="SUB_PD_MPC_D${product.c} SUB_PD_MPC_D" data-id="${product.id}"></p>
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

      if(document.querySelector('.CA').innerText === 'Create New Account'){
        document.querySelector('.CA').style.animationName = 'L_sign';
      }
  };
  
  // Event listener for "Remove from Cart"
  const handleRemoveFromCart = (e) => {
      let dataDashed_Id = e.dataset.id;
        /**/
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
            if (localStorage.getItem("Product_C") === `${product.c}`.toLocaleUpperCase() || localStorage.getItem("Product_C") === "A") {//
                let { likeIcon_unlike, likeIcon_like, likeCount } = handleLikeStatus(product);
                let price = formatPrices(product.p);
                let priceDiscountFormat = Math.round(Number(product.p) + (Number(product.p)*0.1));
                let priceDiscount = formatPrices(priceDiscountFormat.toString());
                
                updateProductView(product, likeIcon_unlike, likeIcon_like, likeCount, price,priceDiscount);
            }
        });

        





        // Update the DOM
        HElement.innerHTML = PTC_H;
        SUB_PD_MElement.innerHTML = Delete_p;
        
        
        if(HElement.innerHTML !== ""){
          localStorage.setItem('DL', 'T');// don't remove
        }
        
  











        // Class selectors for different "Add to Cart" buttons
        const buttonClasses_HPCD_AC = ['HPCD_ACS', 'HPCD_ACC', 'HPCD_ACP', 'HPCD_ACW'];

        /**
         * Attach click event listener to all buttons of specified classes
         * When clicked, each button calls handleAddToCart with its element reference
         */
        buttonClasses_HPCD_AC.forEach(className => {
          document.querySelectorAll(`.${className}`).forEach(e => {
            e.addEventListener('click', () => handleAddToCart(e));
            
          });
        });





        


        // Class selectors for different "Remove from Cart" buttons
        const buttonClasses_SUB_PD_MPC_D = ['SUB_PD_MPC_DS', 'SUB_PD_MPC_DC', 'SUB_PD_MPC_DP', 'SUB_PD_MPC_DW'];

        /**
         * Attach click event listener to all buttons of specified classes
         * When clicked, each button calls handleRemoveFromCart with its element reference
         */
        buttonClasses_SUB_PD_MPC_D.forEach(className => {
          document.querySelectorAll(`.${className}`).forEach(e => {
            e.addEventListener('click', () => handleRemoveFromCart(e));
          });
        });









        // Class selectors for Like functionality
        const buttonClasses_HPCD_T_IB = ['HPCD_T_IBS', 'HPCD_T_IBC', 'HPCD_T_IBP', 'HPCD_T_IBW'];

        // Event listeners for Like functionality
        buttonClasses_HPCD_T_IB.forEach(className => {
          document.querySelectorAll(`.${className}`).forEach(e => {
            e.addEventListener('click', () => {
              let dataDashed_Id = e.dataset.id;
              let dataDashed_lc=e.dataset.lc;
              document.querySelector(`.HPCD_T_IC${dataDashed_Id}`).style.display = "block";
              document.querySelector(`.HPCD_T_IB${dataDashed_Id}`).style.display = "none";
              localStorage.setItem(`likeIcon${dataDashed_Id}`, 'like');
              /**/
              // Update the like count
              update(ref(getDatabase(), `${PRODUCT_PREFIX}${dataDashed_Id}`), {
                  lc: Number(dataDashed_lc) + 1
              });
                 
            });
          });
        });






        // Class selectors for Unlike functionality
        const buttonClasses_HPCD_T_IC = ['HPCD_T_ICS', 'HPCD_T_ICC', 'HPCD_T_ICP', 'HPCD_T_ICW'];

        // Event listeners for Unlike functionality
        buttonClasses_HPCD_T_IC.forEach(className => {
          document.querySelectorAll(`.${className}`).forEach(e => {
            e.addEventListener('click', () => {
              let dataDashed_Id = e.dataset.id;
              let dataDashed_lc=e.dataset.lc;
              document.querySelector(`.HPCD_T_IC${dataDashed_Id}`).style.display = "none";
              document.querySelector(`.HPCD_T_IB${dataDashed_Id}`).style.display = "block";
              localStorage.setItem(`likeIcon${dataDashed_Id}`, 'unlike');
              /**/
              // Update the like count
              update(ref(getDatabase(), `${PRODUCT_PREFIX}${dataDashed_Id}`), {
                  lc: Number(dataDashed_lc) - 1
              });
                  
            });
          });
        });





        




        // Class selectors for Display product functionality
        const buttonClasses_HPCD_I = ['HPCD_IS', 'HPCD_IC', 'HPCD_IP', 'HPCD_IW'];

        // Event listeners for Display product functionality
        buttonClasses_HPCD_I.forEach(className => {
          document.querySelectorAll(`.${className}`).forEach(e => {
            e.addEventListener('click', () => {
              let dataDashed_Id = e.dataset.id;
              let dataDashed_lc=e.dataset.lc;
              let dataDashed_i=e.dataset.i;
              let dataDashed_n=e.dataset.n;
              let dataDashed_p=formatPrices(e.dataset.p);
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
        });



    
        document.querySelectorAll('.MCD_TCB_Value').forEach((e) => {
            e.addEventListener('click', () => {
                let dataDashed_Id = e.dataset.id;
                
                localStorage.setItem("Product_C",dataDashed_Id)
                document.querySelector('.BecauseOFLodding_I').style.display = "none";
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
              },3000)
  
          }else{
              document.querySelector('.BecauseOFLodding_I').style.display = "none";
          }
      });
  
      
  }, 1000);
  
  
  
  
  
  
  
  
  
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
                      <p class="CPCD_B_R_A CPCD_B_R_A${item.c}" data-id="${item.id}" data-price="${item.p}">+</p>
                      <p class="CPCD_B_R_Q CPCD_B_R_Q${item.id}">${quantity}</p>
                      <p class="CPCD_B_R_S CPCD_B_R_S${item.c}" data-id="${item.id}" data-price="${item.p}">-</p>
                  </div>
                  <p class="CPCD_B_RT CPCD_B_RT${item.id}">Total: &#8358 ${totalPrice}</p>
              </div>
          </div>
      `;
  };
  

  // Function to update cart display
  const updateCartDisplay = (cartContent , quantity , paymentCard , paymentTotal) => {
    const payment_card =`
    <div class="payment-card-div">
    <div class="payment-card">
        <h2>Confirm Your Payment</h2>
        ${paymentCard}
        <div class="total-section">
        Total: ₦${formatPrice(paymentTotal.toFixed(2))}
        </div>

        <div class="account-box">
        <strong>Account Name:</strong> Yahaya Sa’ad Abdullahi
        <strong>Bank:</strong> Opay
        <strong>Account Number:</strong> 9162820838
        </div>

        <a class="whatsapp-button" href="https://wa.me/+2349162820838" target="_blank">
        <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp"/>
        Confirm via WhatsApp
        </a>
    </div>
    </div>`;

    if(cartContent === '<div class="CPCD_T">Shopping Cart</div>'){
      document.querySelector('.C').innerHTML = cartContent + '<div class="Empty_C"></div>' + payment_card;
    }else{
      document.querySelector('.C').innerHTML = cartContent+ payment_card;
    }
  
    document.querySelector('.CC').innerText = quantity;
  };















  // Event listeners for quantity updates
  const addQuantityEventListeners = () => {

    // Class selectors for CPCD_B_R_A buttons
        const buttonClasses_CPCD_B_R_A = ['CPCD_B_R_AS', 'CPCD_B_R_AC', 'CPCD_B_R_AP', 'CPCD_B_R_AW'];

        buttonClasses_CPCD_B_R_A.forEach(className => {
          document.querySelectorAll(`.${className}`).forEach(item => {
            item.addEventListener('click', (e) => {
              const id = e.target.dataset.id;
              const price = e.target.dataset.price;
              const quantity = updateLocalStorage(id);
              const totalPrice = formatPrice(price * quantity);
              document.querySelector(`.CPCD_B_R_Q${id}`).innerText = quantity;
              document.querySelector(`.CPCD_B_RT${id}`).innerHTML = `Total: &#8358 ${totalPrice}`;
              //updateCartDisplay(document.querySelector('.C').innerHTML);
            });
          });
        });


        // Class selectors for CPCD_B_R_S buttons
        const buttonClasses_CPCD_B_R_S = ['CPCD_B_R_SS', 'CPCD_B_R_SC', 'CPCD_B_R_SP', 'CPCD_B_R_SW'];

        buttonClasses_CPCD_B_R_S.forEach(className => {
          document.querySelectorAll(`.${className}`).forEach(item => {
            item.addEventListener('click', (e) => {
              const id = e.target.dataset.id;
              const price = e.target.dataset.price;
              let quantity = parseInt(document.querySelector(`.CPCD_B_R_Q${id}`).innerText);
  
              if (quantity > 1) {
                  quantity--;
                  updateLocalStorage(id, quantity);
                  localStorage.setItem('EmptyOrder','F');
              } else {
                  localStorage.removeItem(`CI${id}`);
                  localStorage.setItem('EmptyOrder','T');
              }
              const totalPrice = formatPrice(price * quantity);
              document.querySelector(`.CPCD_B_R_Q${id}`).innerText = quantity;
              document.querySelector(`.CPCD_B_RT${id}`).innerHTML = `Total: &#8358 ${totalPrice}`;
              //updateCartDisplay(document.querySelector('.C').innerHTML);
            });
          });
        });



  };













  // Main function to handle the cart and local storage logic
  const updateShoppingCart = () => {
      let cartContent = '<div class="CPCD_T">Shopping Cart</div>';
      let cartIds = [];
      let cartTotal = 0;
      let orderSet = "";
      let paymentCard = "";
      let paymentTotal = 0;

  
      
  
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


                  paymentCard += `
                  <div class="product-row">
                    <div class="product-name">${currentItem.n}</div>
                    <div class="product-qty">Qty: ${quantity}</div>
                    <div class="product-subtotal">₦ ${formatPrice(currentItem.p * quantity)}</div>
                  </div>`;

                  paymentTotal += currentItem.p * quantity;
  
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
          
  
          updateCartDisplay(cartContent, cartTotal, paymentCard, paymentTotal);
          addQuantityEventListeners();
      }
  };
  
  // Running the interval to check and update cart regularly
  setInterval(() => {
      updateShoppingCart();
  }, 1000);
  
  
  
  
  
  
  


  
  document.querySelector('.LO_D').addEventListener('click', () => {
      try {
        // Clear user and admin data from localStorage
        removeLocalStorageItems(['ADMIN', 'user_NP','alreadyUpload','EmptyOrder']);
        
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

      window.location.reload();
    }
    
  
  
  
  
  
  
  
  

  

  
  
  
  




  const formatCurrency = (price) => {
    return new Intl.NumberFormat('en-NG').format(price);
  };
  
  const updateAdminSession = () => {
    sessionStorage.setItem("ADMIN_C_I", UI.length);
    sessionStorage.setItem("ADMIN_U_I", UI.length);
  };
  
  updateAdminSession();
  
  let ADMIN_PTC_H = '';
  let ADMIN_PTC_Order = '';
  
  const renderUserList = () => {
    const index = Number(sessionStorage.getItem("ADMIN_U_I")) - 1;
    sessionStorage.setItem("ADMIN_U_I", index);
  
    const user = UI[index];
    const redDot = user.view === 'F' ? `<span class="red_D"></span>` : '';
  
    ADMIN_PTC_H += `
      <div class="A_MCD_MAIN_FC" 
        data-user-name="${user.userName}"
        data-user-order="${user.order}"
        data-user-phone-number="${user.phoneNumber}"
        data-d="${user.view}">
          <p class="A_MCD_MAIN_FI">${redDot}</p>
          <div class="A_MCD_MAIN_FNP">
              <p class="A_MCD_MAIN_FN">${user.userName}</p>
              <p class="A_MCD_MAIN_FP"><a href="tel:${user.phoneNumber}" class="A_MCD_MAIN_FP_A">${user.phoneNumber}</a></p>
          </div>
      </div>
    `;
  
    document.querySelector('.A_MCD_MAIN_F').innerHTML = ADMIN_PTC_H;
  
    document.querySelectorAll('.A_MCD_MAIN_FC').forEach(elem => {
      elem.addEventListener('click', () => {
        const { userName, userOrder, userPhoneNumber, d } = elem.dataset;
  
        localStorage.setItem("userName", userName);
        localStorage.setItem("userOrder", userOrder);
        localStorage.setItem("userPhoneNumber", userPhoneNumber);
        localStorage.setItem("Contact_WA", userPhoneNumber);
  
        document.querySelector('.A_MCD_MAIN_F').style.zIndex = 0;
        document.querySelector('.A_MCD_MAIN_S').style.zIndex = 1;
  
        if (d === 'F') {
          update(ref(db, `UI/${userPhoneNumber}`), {
            userName,
            phoneNumber: userPhoneNumber,
            order: userOrder,
            view: "T"
          });
          //sessionStorage.setItem("ADMIN_C_I", UI.length - 1);
        }
      });
    });
  };
  
  const renderOrderDetails = () => {
    const phone = localStorage.getItem("userPhoneNumber");
    if (sessionStorage.getItem("userPhoneNumber") === phone) return;
  
    sessionStorage.setItem("userPhoneNumber", phone);
  
    const orderItems = localStorage.getItem("userOrder")?.split(',') || [];
    const userName = localStorage.getItem("userName");
  
    ADMIN_PTC_Order = `<div class="A_MCD_MAIN_SBD_WB"></div>`;
  
    orderItems.forEach(order => {
      const [id, quantity] = order.split('/').map(Number);
  
      const product = PI.find(p => Number(p.id) === id);
      if (!product) return;
  
      const price = formatCurrency(product.p);
      const total = formatCurrency(product.p * quantity);
  
      ADMIN_PTC_Order += `
        <div class="A_MCD_MAIN_SBD_B">
          <div class="A_MCD_MAIN_SBD_B_L">
            <div class="A_MCD_MAIN_SBD_B_LI HPCD_I" style="background-image: url('${product.i}');" data-i="${product.i}" data-n="${product.n}" data-p="${product.p}">
              <img src="${product.i}" class="Img_FC">
            </div>
          </div>
          <div class="A_MCD_MAIN_SBD_B_R">
            <p class="A_MCD_MAIN_SBD_B_RN">${product.n}</p>
            <p class="A_MCD_MAIN_SBD_B_RP"><b>subtotal:</b> &#8358 ${price}</p>
            <p class="A_MCD_MAIN_SBD_B_RQ"><b>quantity:</b> ${quantity}</p>
            <p class="A_MCD_MAIN_SBD_B_RT">Total: &#8358 ${total}</p>
          </div>
        </div>
      `;
    });
  
    document.querySelector('.A_MCD_MAIN_SBD').innerHTML = ADMIN_PTC_Order;
    document.querySelector('.A_MCD_MAIN_STD').innerHTML = `
      <p class="A_MCD_MAIN_STD_I"></p>
      order by <p class="A_MCD_MAIN_STD_UN">${userName}</p>
    `;
  
    document.querySelector('.A_MCD_MAIN_SBD_WB').addEventListener('click', () => {
      const phoneNumber = localStorage.getItem("Contact_WA");
      if (phoneNumber) window.open(`https://wa.me/${phoneNumber}`, "_blank").focus();
    });
  };
  
  const deleteUser = () => {
    const phoneNumber = localStorage.getItem("Contact_WA");
    if (!phoneNumber) return;
    remove(ref(db, `UI/${phoneNumber}`));
    sessionStorage.setItem("ADMIN_C_I", UI.length - 1);
    document.querySelector('.A_MCD_MAIN_S').style.display='none';
  };
  
  document.querySelector('.A_MCD_D').addEventListener('click', deleteUser);
  
  setInterval(() => {
    const isAdmin = localStorage.getItem("ADMIN") === "true";
    const currentIndex = sessionStorage.getItem("ADMIN_C_I");
  
    if (isAdmin && UI.length && UI[0]?.userName) {
      if (Number(currentIndex) !== UI.length) {
        updateAdminSession();
        ADMIN_PTC_H = '';
      }
  
      if (Number(sessionStorage.getItem("ADMIN_U_I")) !== 0) {
        renderUserList();
      }
  
      renderOrderDetails();
    }
  }, 1000);
  
  
  








  // Help Center / Contact Us
  document.querySelector('.HC_D').addEventListener('click', () => {
    const phoneNumber = "+2349162820838";
    const url = `https://wa.me/${phoneNumber}`;
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
const LoddingIcon = [
    {
        LI:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK8AAACxCAIAAAA9LHrJAAAAAXNSR0IArs4c6QAAAANzQklUCAgI2+FP4AAAIABJREFUeJxUvemWG1euLBwBJMkaNFmWx/7Off/nuqfb1mCNVaoqkgnE9yOQVN9ey71sqYrM3Lk3EIgIIKle1U1mAwQAIgQRKCpECFArAmopmFKLIAkBQUgAKEAQKRQQEdCqiGgKDUASkQigW8GQ/zxEUAQliYyWSEFBFSNbDQAQGCEBENAQATIItUSAoCAwSEACQw1CIERSBAG1fxikWpIIRIYgNZhgEalexQxgPoeURML/B6jJEEVRLdBX5M+XIBJqMAIN+cZQQDCIBqEmIQQJtgA0SQEU/MPzxegmgoR8R/6eZAMJdhUjRIW4qtPPQgTgm8xklwCQ0V0EGSTZvYIJP70SAvPxDKkJUVUIqYAk2iuuINsLQD9IAoRajLlCwrtBEAQSQIiNnn8HutUEwYAuT1AtSIggNc/V6w2SikaBXl20BERAABDoRhKa76IgX2wCAsmYT6L8u2tVnU/ruc7riq7z2mB3t/fz+bQuS/7+rz8B0hfdqKq3f/8HZERkZsaCiMxckhELg7EsmZkIhvcYgZ6nhbkhegu2N47vrXsuLOagAVIHwsdAYAS7GmQIAkHvQSFmZ192pCQGJYFAz1or1N5kABoMgFSJ4Yej9oH1VhOESi6AfIrgU1NaWsW5DMzG7RZA74IGgvPFoVC3Hx22HwlsB0RoCBAZ6G6QydbsiYD/nl6vLjCD7OrIFAX0rIsINBoMhtQhtRIZXp3ZQwSYnFgmEejzeT09PpzWc61rrSVCrQyuUHBZgGbs96kWuAOCCxxLJAhiJFu5LBHJYDeqqs4npmoVI2YxhWWJZcll2V9f3+Syy/A9gcpmA1Q3mH5wQBMiAWWwHE8ABVPsBgIMCS0EAyiIUnhzAxRIB6eA7z68/l7oLlCkGkGi/azp8ILwU0J3kUGEItgSO5AKoQAkUGSqxZwliYYoQQAK3C5GQTZAtIguRQDRwOx5MYiWUEKCzjGl0lwuW0T4tApgs4nwqYjuZgRJX6vXZDtNVHSACkARhLoVKXXEQjZEgqVaz+fj0/F8PJ7r3NVkkIqIiMx9divABJ3OknDiSUbuQLXg0w0WtAicgxJMpohYYlH3Ek5M3QJDtep0qtPx+/dvdwhGLvv9cnV1dXW44bIACi0AJuTMh7LQYkoCEJC84+cYiZFUNxRMUFKD3uwguiRuAZho5xWpCQaobjKqegkIgYk+cNQWAAaZDUEVsx6g5NsRiC4GW1gCECf1X3ZuS2g6Xfi7QbJbE8edJ/xXTj5+4PPjDnMQCIcqKUIS0GhGoIWIIKBgS0E5hIY4X6FsCMYrAhghIlJoSefz+fH73ePTsbsgLLmLzNjtUkCwuyWjm5ZCasXcP0lFCFCtICVCbTARPsUtJUsKeh1m5zmCCETHsiCVknqHANbu0+l8PB6/1OfYLddXVzfXt3HYcctsQAtNBNvPWKUkKrY8iVgoASQTtVKhgNcRRCGcGSAF1dhOF/wB898ZaADVnJulApICrGbnfJwotASC9DOJoAYGaRG8o9SGg4YYpCY0ymAHATIBqQ0x1P5C4ySvHRGavW10aATqbCYxIrq7S0ynAxKOy+okq9sf3GoyiW4MXgRRWrWenp6+3X2ttSJzyUDuqbigoZZYImEEGh1kKBs9u51EAmAjASEw6EhJCd77xiB+Tt6NSKAhRHdlLNWNDWIysESqI4HKFvD08Pjw/SEzr6+vD9fX+91eTKK5YQQRGZRCHBTUvQKpIKuRPj/sNoiQMwTRYDgVMLyxoQYpI1EBDGDJQVzwhpAaMXFt0KJ3ALo7EJB60jyRy5xmgaQExiwD4PjYxuySgAAQkYCqpwQQEcGg1LEhHZFoifLhpxNZeDGgCArRWmOWWSDVFQ4apCZGgks64j09Ptw/3J2Pxwb2u33GLpKC16NdnIjIiFJDEjoZhSKLHYATdqDVqECw2DmIXlJIZDLgZ9COUdQAk24XTLvMVkMi6XvzMZ1iAcwgGAhW1cPj4/3dXWTe3txe3z6PILnhTko/aiMYlISfeQEAgoyGgpPPGowJm4BkaDKIwXdGXNJEXKB0aNuGdOLwmWx1M0BEE0FpnmYvcnEEEgUE5CdPocNlEOXFCXQHOTEhhSYUYhv2z8fMPwE2VoeUxmUFabgqdBh5B9Tw3zq3UL4biqz1fH93f3x67K5A5LLfBSKyW92AihFGKx0yZvEpSUBdHPzcnIKs0CCjqWoFIgDvcTUYCjGCDCZYvim1kD6BmNrA8RPSViVDjOxugb2VNxFk7rDsute773f39/eHw+Hm2fPD1Q6REgIhCSz1FIvw+SZoZCQCXVKSQm5xvtWXPQEGhGAIW7HaUrgaYWILKhIZQaKgJIEFEFou9GU0IoJagNWlEIziu0iKSkRvVEJTAQLBdu53zgqg/XlkAt2tdC3qbdqJgNDsgUMQKbWRW1ACWyIYoe6Jbgw0u9b7718fH07dlctydX3TvXaJiC6DGsGINKi+MBWNphKlJmKrOqFuhkMqXdtAklwvdfnZDmGyFSqOsQjQC5dTpm3FHQTnyYZiAB1EoVtMTQpHRB722cT56fTp6W3ur2+vr66fPQcD2dDiYwpH9drqQfK/nkg7lyKhonfwRnv4JwFOfRRDPZg4YMP5w3siAlstbJ6I0VVmP4QK5EKkK0ZRUpNsMkAJMaCWAFRCTpiCAwibwRIT6OoIGoQhKhDdW66WGi6ZCHT/oFocJBCKUgfTYL5Vd1+/PDw8NLlflj13q3pdV0ELYXynRhsABqhsrcygUSNBpFRzPCJU5RClLgKT0DDZSFAapk8cKWWWmgp6VXsr2pzVShlsmTpQRALRDbCNkim0oZxjiYNPIw6H0FK1fv329e7+/tmz51c3N5lJRlcz56FO5bgxehQU3uqzEysN3zZ0rylMLhnfdIDYOTDZXACgRsChhYb93ZEJae11yUWNoSBImgPZuI8iqJLYYMbE00mRmkAVhEKQuQ5fMUJED2ESW12RTmIukVQgMTVTm9GcKHf39cv9/R3J5bAnyRaiY4WojCiBkrnOCxFV6oisalFL5mQ6b3eEGkyqusu0CVwn1Q+m4cL3DJnj4OaoRQVYwXBpQjKN8mZXstYy00hX6JPnhl4FGsyJKVCLu91h2Xed6+vXz58/f/6f//k/TTE418ZoyQld7dSB4Y8GZBgVDa6CYohjtsm4MF5NRed/xdoWzAcACZfigAEkJCSWqdyMklwGdnXLt5UCmUEuIMq/5gsJRqQUgywn/nMu0Y9wuC/XxYRaoVl1X5RTb03+8GOB9Onjpwzu9wc0tVarBowyJHLY061EgUpAq7oyg6WWWoZhCCWEDKZjHBEZXoUGAkiTE/TGpatyZHr1+8K/zDkYorZLVYY7nYvZv8HG8+MgGGKYuVOvU3h3R6CrVDJ99erVy40nbIPT6vZhd6lDDMG2pYKGITtM+qJRaghlDh4EwjHSnFBLVK8CxdxqfYSZYIGRYJguNh6JyR8wXbWx5pRGBRCFCD+MOa6Sy1LHJydUl2JR6gGVXlHCbGXApAk2vl/Da1tcMAka+ee//lzX/rG7RJQABQCVs998ugtJMpJEdDUXGtJ1lwnbBmqtEslkRHWb4zSgMLZ1XMA86EZ3A2s1WpEUiuFIDC6JIIKRDEQEq5sMNgl0rSafpe7uriITgBhSl2/XfAq41pqRz569cjiqCUjMDDPbIfVWfmzkd88pgMT2KjJinsrEixDYKmFIpAAZKYjq9r43cSIpvYN6NBYE5d1gDGMKhhKo6iGL5zoJqVFDInTHxB310DhqIdDediBbhTTntkKUcnZVwxwdmcEYsC7TRdrvr24Oh/X4FCRIRNRWpQ/YmPRYw6d1dxknjWrgT77cNZLotatQFRbdursbkarRWTqmTgwSEQQjc1mgFp0lga5Sl6rRcrhaawC5ImqYCgQD6giX6w3z+K4eoUYRQWA9n1+8/tnPHM1AIAIRH969K2trQcJaSA+bOrc4qTy890fzGFhoeSeYxnBkbETnFO3dGsDOKQgugJgMRAeCHF7QrOmwHWQgiTmj3irhUhAxhYkw/+745cPruofmTkGMiFhTAhBYCHI9n//9f//v8elo5REQu0W8fP167UZJUgYzIpndkljtwoaRoVZVEYLxV1BdGqVrFBKDYQXCtXqkuqxH9dpcElQDMVFrS1pqo3sjqt5EteASHNKA6l2yuv3sM5LmWOQsZB0oW5pc5PQhYuF5PV/d3O6W3cTOVBAQHr9/+/5w//H938eHR8nCAgaGbsSHdFEiWhLUvnBzxRDYLQlterGrSy2qAxpOpDt8tZwCweUU2RPfHfyntOoGyrGAGklKokYYcULddoM6ADK1cR0uy2fnDQ7m8NTewQyCd3d3H96/JfX5yz8ahZdqUopcnt88O66PEVGGP8PHRKbrhjKDsMskg22oDcZCBFzpllyGi0FLzJu6ZoVXkAvoMCEh0PhSLYiZ8xRbgLqVYQWFDfTGPeSSYKjU6u4BRADQbdYvfEqCUhtW1mmtWn/66SUgE2WjCkifPn+9vXnGXD798+Hjpw/ziUPdeTNpS6toNCIRJJ1SNBdlpoc9+yMiGN1oGJrOCnSVScVWIxjcQVArQLJr40x9ClyhCtbmKWPNOTfskSbEDWKsdO0dAAMR6M6YZMygXEEjAJ5Pp3d//+fbly+5LPv9zXrW94d7MEVgcRjG81cvyehzAeguR0Y/zmyC0WhAK9rmCaZZ3vLO4aQrl7CbEDUlESF0rZmpoRamdNgwFmgVUiXMPsV4LkxytpnHyZQjEVlRcnlo68WU61XraKRSEuvp/OLFT4xlVEkCCpBfv3yGGsEE99fXx8fju7/+fXz8TqQZRDTCdc7QVIH5XLaTMYlAKEa6DGHTpBhTjoYVEybNHvcIpO3yOBAAybBvwYGnTdWHt0C38clk+EUMtCkYDoYm58sNGIQe5OtlJhWZCfL+7v7du7eIvL69zSVy4dXV7v7rvbrR0WV4oEC+ev7qVE9zIxs2k4luikK5NmU0ISnB4LJVh21Y3fTdosVV+sEoAzRt4p8QY/T/KT7WhqX1AJotmXiE0BGDXBtQlbeJ2fhe5+w6lJp8dqYikojzui5L3t4+Q/WQeiVGdJ8fHr7vDwdTGiSuDnvulnfv3n/99oXBYCCh7rYYh0tFN5gkg1KPb6h7cntMpWhjDgWjaedl2aogAIG1fVjCoG5z8jSMmlRdZfHJMcQJkSh0AxWmRKYuT8m4V+abxjejglX0iG69f//X18//HA6HXHao1qSnBPvzl8+RG3fYEHTz/Hku+7XOw5rOY3ROHEnTINTZutFdhYbKj04BREdraocgQ8RYiqKHr3V1gh4rkpEXTfxnRLdCYToBDXVsRipfEkmWNxkFsFttwt7lB8CMpk8Pzue6ffEiMmTuN8SIRn/852NgTrCFxW4sudze3H779vX9h/fS6pMbkdZGrA756YfYpakDMUWcj9VGaKa2lMtJTVPgjSMl2G3WqzfSG6AVU0gSkZEmjjtylrHw35FzKwJl3ZBCEjGslx9DCliOjw/v/v5frX11uAm7y4Iumrpr2eXTw/c6F9NPoYWS+tWr13U+AVCYZ3fmFgvqDivXzQQCGZEgkbRJofpC6bmglkkzhiOKusXFWXTD5RCHYm2mzTlFhsRgKqAY/tGcgNOC2Ikepd5Uj1iOujkYG0Dkcjyfb2/3z26eGc31MENxPh2PT8fl6qAJF84EOq/d0O31Ta/rf/76q84nYjHHBWxCpRkuKtJFhKPe6trSUAKC7GcxNWDuUqNVB3JoMyKkUDhohB1PP4Q7mmae3JEESum/tqw2eSsiyGqiAy3JsncHMvZUfL/79M/HjxHL7nDwqapqVY1xIoLICH768tG1R3CQ09XV1eFwezo/haK7WuPwQoTpteHkTft0g6quDBJYMrU5MMigE4wFCgIRmaFS01Yii2ohKDIQUeXvCkHmUR0djbS5uZEEQRkR6tj+xsXzPFKiTR6sde71/OzFK9P/Wq1IUtDnjx93+yXGfmH1SwSWDKjXdd3tD7tlef/u7cP9V4QurqjhKUgQ3XZzBIfYxQVyjgzR7S1vWIQQiSq1jDjDCSDMaLbNR7pEEuu8jpmW2IkI85+b6G+oLhGdHMhgVZ0MBdT//PP+65evh/2eGaoxCZKKXGyvIFCl3e5wenx8enqM4QqH9fr59ZteqyaWGPY53LuKn6LwIp7YsQSgWpx82a1yTGUyGYw0YpYdNG31j5BaWNcWtESOHhkIhXEhMaY+oYWWiplhDTZUGrLbh06FIYyiEXk6HZ8/e7Hs9mq0v5xB8u7rl1JnLLIhEoSlJeMAf2tV5rLslg+fPn3++AnOgabfHNihGDueBvlMITq1a0lWn2IECudT5Bhg5SUAbDaBQoUNJLiejTTpQSE2+qCCI+mT3Zv0gWZA3SRDLIGK7Na7d38/PR33h+s5mOqmZBdgF1zsS5kdEbtl//nTJ0FgbsaQZsbLVz8/PT0uyIxET5ltXlYlwcKcrRjMgPVJA1ouuSy7Frr7vFYdj48PT+fHh9PT0/l8rtPJdRTC1KeEQtf5dHx6ejg9ndfT+XQ8nc+Pta4iMna5RCKtsors3pR6jcSgSTsYyRMisrtzt3v5009wNZsZFnRU99/udrudyRIyhNWZwDhspDUSUkTcXF8/Pj58+OfdiDBbbR+KzUYCrw3IkRJgpoSIRWgHe47xJ8SoueKIyAhyrXOYhZiEPq4rH8OxOY1cbIzu9DaSdLfGIDOaF6ioOr99+zaSu2U/jI6NdLb9NacEGZg6tfHTw8OLly+ePf9JWJ0sIgnh7d9/KWKfu2aHvBEEW4cNcZgmVYQCQy1Sqq5eq01G5T6W3eHKDyKWBMDgLveT9lz+RHdVASyuWruqzqcuPT09rXVuKpBLRjC5IGCD/5yIiLDbobrClP3U1To/HV++fn3z7Bm7ZR0LJPj144eH0+N+d0VYgp864OIY0iTNBoEageB4PkXil9/+lUyhqyvNO5l5aZ/yBn6I85jF9mMfSwIvTyAXbDfC0inaYrn/32ibHPfWkDbUXJajdBuWbMFxKDghGMenp3/++bDslsicAq+15Tp6s0WEqgV0RE7cR699Op/+/J9/EVndEepCZjzc3336/PmwvyK3GtCVrbxIQAS7hGj1+bxmRC4JcNkth6urq2XhshtCQJffBlCrGFIggF6BZLiq2GqwgFnoUKn61E/Hx+Pp6Xxezd5E5rLbJWWbWcOW5miM0YaZfToj+PPvv6dUXRG2NC3r8fj+/dv91dWcVBFSJEsNsdULWQ72zgETM5SxnE/Hgn7/5Y/cL2j3JPhZIIxcp/w08Te60cVciczujoliXvqxTLJrJWgvxHgn5mCaqQI1O100y5amQB2fzdr7OUlxPH7/8P7d4XCTEdVt8kaYjo0wnoXr49H/aduXxODx6fHFi5fPnr/ASJ9gBISP79+tqiX3oA+kBAUzMqTWej5VBxhL3uyvd9dXy25JBhAXyw4dfs0+oROcizKmGCbVXIbC8ElqImOpqoz0uaDYVJ2O358eTsen9WllWhzdRVI9aj3UyEDr4fvDb3/+vj9cq4vBSdDUxw//nM7nXSa864dtLFwcBLpw/9NdICEyTN2eno6gfv7t18OyB9ltc+xogVJgHLkTtg3Zm02hCpk+G23MWW2Hldh1xrDIY+uxtzoiSVV3RgIXFspAvSEbWelSywj/8fj48f2H3dU+GGGJfossQXUECwoX5B2R7nLS5pMDo+tca7/59dfc7dCufYmM09PT+/dvDzdX0WFZxMVS92iUtzc3edhfXd1w9tvQJINzNn9f0JS5U4NE+sqNUQxJuNXiYwmchhivJtIZNAixoVpPx6en73f3a1eSuRwsewDB4Ho653735s0vgkGJq7d8+v79n0//3FzdFIruWIKqLfdE97Cma/cul0ncFp2bo68tsR7XXs8///rr4XBl5pRaxs5rnxf8lAwl5U0PpNfAj5FoMlpodYJUtdhoIUPVQzsGtDaHqJkiY5IBNrnQrCN3BjnHx4cP/3w4HK5iJO8NAQ2jvcUXhlCyoVSOUrLTQGwiTufjYX/1+uc3QKtly53Ir58/P3y/Oxyum6L6dC6od7urZ8+eXR2umcY1gKDuJmOUFD/WYuS4Gl09T84RwTKjYadBwI0u7V6QGBZ4A6em9MK5HVJbyEef1vP9129Px7PUu90SsUh9fHr8489/cdkZMVBEBIh3f/2HZOTOWdQtIlYGumWrK0GbRnPkoTG15zSeAOC6ntb19OaX3w9XN2Mx0mzVKQhAdc9Kj98RQBNpWNhTFFvlEKtXbo+4KbZ/BhJayNwabzAqaK1r5sINmBoEnM9P796+2y27ZVlaaK3BBCNUiPB9cKjKAmIJasgRBNltCn1K53U9//brH7FLCFUVROROVe/e/yWwq5N58+zZzfXtslvGiNUNbtbu0X8RllQ1oFUXd5ZNGGMHtUdV2PoBtMnGmMwrmHBsjUXQIJvj7RzqgA5A6/3D4/3dV3RX97Nnz1/99No1VIRFAH758unu7v7m+loTBIzCNq8UqFZkGGFbS4BlaLsOQdGUNjN4Xs/r6fT7H38sy0ECUINS2ZCDPNU/oqlrjHYFiMGIwlhXvF8GJrLBENI0BTOzhS4N3y9CsezSgqnJsAiu5/O7v9/ud7vdfgHkxq5IQrWOGjZgxTWHj1VDMJWPdjPXFAoZRH758olT6IcYLSDz9vb2fDz/9Orlr7/9/uLli2W/tBq1ypWeBKRs0rYfbQovU2b2aPv0KBjB0YJj0nOMAjUC3vwL/CtDjmDQfgyLYxBlMR1oxvLs9tlvv/3x/PnLAJ8/fwWxe41RDth1fri7P+wPtpsNgiNl6boJyam5u7q6EWBY32ds8LkVGVB3927Z7Xb79+8/nNeTRjqzM0sYFwIztxy/YeS4cOlD4XADrF1TAFqZSY4VBjBo2CqRRoQv145bUWSq8favf3PJw+5Q6ymWRVVedDt5akw3RiS8MEUMqHwIRiiZSo8k8fj4+Pvvf+ZusS+C3chFrVrPy35vMdGUmMUYSaIxBWVTdbiFZONjYJelUbJsRLaoE3DPJLZK3Fh6qJ/xCmvciY4xCgakVViSblNxAB+vSgSIrvEuZ7DBTEEfP344Pz3tdlcNS+ZsFSPUEAV3ZQQb9gF75RiBbkTIFnpt8usmSkRV13r67c//z+IkEWKZOnX40fQl6JL3XNY7qXKEFwTa4rhGxq6t1wyMofXtm1x8vc4OFs4pvH/7b0Tul4PKAnQPTRGpam2Ck7ksTfnLWEJuDZuyFwxbbqw/97Lsvnz93Gu57C2gq0gu+12rWrXVRibObcpCC1oLCZoPc5P8JkYM4z0LNCQtxmYq/qCww4wPMI5ViGDIIWaKb9m6QvuIyhLi5HtK5rbt1kO1oiE8PT4dHx8O++vLJ1WX3JxrC3mYa2himEOIEahuCxOaxxIO/szUKkgRS2a+++vfo+APObRVl5K90ppKgCPhTnWt1jRQhkKZDuEBS9tQe8TBRmEM8Q2My0CrQeXXr59qrcN+V30WFbG7FDQkGqoysmtbEhFmCaWa7rCB/0Psu+wEI3JZHu4fzudjAK0yR6teVWduEcTZetQaR/XwOXJusFeEGUSGujWJyka8mFYw3+yUlr6Q2pg3YSqjGq6SbiEdfo9AR4BCCqVWx5AaSjeSABFELu7LePj+VR1NWYzpnk6nGEFAc3jR6s6g1TCzCE5NDcFW4WR1QRXL8ErLsiPjn3dvTZYMeB8m0+UrIgSwunrOxdjh3N/d6Oi2/8UQxnFII77AzuzeeKctFeUC8Pv93f3d3dXN9UjuAFjDZUAiIq1jGM9piAv3d3oCgtwISSDclxeEAuvap+P3N29eHw7Xcykaw6IiR2b1ni8XTzC9PMZQtDpoasLUzLSs+zwgsNmUxBbd9sSNlQSzBTYohgPatLR48axpNxhdGGkajMwIIthrTXxuTBeg2ywaP/305tntzfnpSavpwKR36vjvPTSBUuaSVWJja1R2n4zZzbCRIXNxWgKJ7mrt9rtzrV8+fxRiZpLYqrA1TrvZeJOU2OoI/9cmbHYX3KgQpoQAEl2aJYv/p8fTQgjjfK4Pb/+z2x+2YwqpnG9h0sfkKEza28e8AKu4UApq7fbvhtiAOylL6j5JfP3q5/3h2j4Ew3cABpuBbKxsG5W4zfuY1C5xuNchUkkPLrFtlZMxsHm7OYfHjOKkYbqDysMOJOugW/71M0lY7Lm0Y8CtbAaY7K5BbE7PQgRQodDT09O3zx/Wxv7qwFLHoKCR7Kf7AbEEysLGNs0iPD4jGPYUGVrGECQtBJPx8PT9p1c/3zx7ri4HMMFnrTO4+TwREXAkYCAIiCWqC0MIeF1d+Vs9DmwwwzHLFikC7/7+q6XdbuclH+feiCVbr8M0v4U8NMjTE36Q1cELM2VXHXg8Hnf73es3byKSksedIMbNemHrHX6IgVtuC+qtcXSKPfY2iqSp9DlQbfzcUDImoHkBUWgzIi6rtTE3Ng5gk+DNbI22192YPml6CTZmEEiqYDdZzNaUGN395dPHp8eH3W4f1lT9862LX2toPglgROhHt82QOFshvWGgNgpgQ+tx/f2337lb0LWV9p6MYOQ4hBcabXxhvO2WbATbixHTcDan2mWK710X2xy/ffl0rlr2O8Mx2Rckt4hU1YRT4jKzYRY+PKBk2qwwzSOqQEA8Hp+e3d6++fW3YKI0rFQokET6WMacT8a4thQxzthNyhvjYCDNaplzhqX/oOvLUQgZ9pg4kNh+AgF1oSsGfZuYiIsaDqRmwge4UQ5eJxtuLC/0ROn0OgPdVHdG/vTm15evfj6ta1VFpqUFhrVEbKQJjWnt+TBA5XT7249nqiYG3U7bJXOX7/95R4+/iAl/rrkNbkb6Drs4MR4h10U+GaXpRoyNIdjGGGHSKgTgdD5+u7/b7w+uGG2HJ4sgAAAgAElEQVSPYDIjWqiyF1sNaJKdL5uhKF0gLoXGKIy7tft0fvr5zZsXP/3kZIfEdP6I3SUnR8FliEpdrjEN6hVGcyzvSYyvpd2ZPnjMGKjdg4Gh/l0AMZTR6F43T7i7BTayySMvnF0bBYyxdhoHxyCLi6rHNtibcOiwOgY9QCoCz54/++X1L+d1PZ+ODteS1GtXjxbobASd1zMAMidbUihbQMSEWDYyDsVOZWad1/u7ux9neQRq01JeGrFHOUJ4UEhTdZ5NokFR7buQmKnhugdTsvnu/V/V2u92EtwBhgz20JzhPSQIysx1LUAezNBQRHaXt6N9mZlxOq2hevPL77HboXujQnRBsTEs44RyB54SkJ5QZFF1CuqisilSHFafG8PoPZrWI+bZ0qHB2gc4yurA0Y2KNg0B0LXfhOvhKcMlgFHWtL67j20KB7cRe67A1jgJKRgKANXrh/cfVOv++qarAEBlE6d6RuFtlnP2SMzJTRWb6wJIeVTJ5L/Welp//9cfW0O//xdSbYKoY0GbRyRoJ4u559YYuhlIhyRJaMWMFCHA++/fjuv5ar9TtdntCIZMLCvcIzCUBLvddZQ9PawuH8ltLERGnE/rQvzyx5+57KiSI9PEaUlI0lHWyHo4bntbmjZf2ksEQWQqO2CzYMT0Tyny8ltV1v6zMF2dfoCeCYSt1iDkNplNaNmchGZJ6K8lWI7lc2vd6jI+oEGvs3u4ocGQmUByOtmUufz6+29kPj1+DzP+zJnT4FFQ3g7DhdIgicGhc0KcCWH0UYEQiIydUl++fJldOaxZ0UFMsVkgXX6EccK0yErCKoq2GY/VnBCjZloZ1+PT129fbg/XluKE/+oIACPQNZBum1DmAn0aSzKWvoD6QDDO62lZ8uff/gxGywPy6Opwko17TzXC4/iUW9vBJiMDkMrcCaDGinlOP1qDVUVceHqnvg6mt22Pr+QSflzRmVTXVlFBMHQcUXQw8DYmz0ewY/skg+laZx2MH906xRbKcWud8p6//vGv/dXVw8ODVElQOapfpMvXrV1BowFqDKm2HjUYzB6Weez+S+y+fv7y9HBv7UFTZ24DB2PTBaoaEFp98UUyHGY8O8pjIrwDh4qQHh4f16djretGb2MEC0PcZmSYEx881egqBRcupmWCGGPgTGzcvfnllyDK/ZOa4srHwr1TaoT5Hg8yEZQxw09U6Cl5ZW5m65y0rG0cZqIT07+r6RXkxlm5R1neYg7huaFgTv+i45GTmIdIKdRDbJIQurspsJNj891IMte9ZXuRs/42VMPDhQQVIvrnN79e769Pp7PpXG95lhCeamZ/amyVxGioMuJgNAurbI+mWLV2r69e/3S4ugaanGYMN52Zs4GAbkaOTkmyeg04sWE4FjkUOheq5SmwAvL4cPfx8xdV7a4Ojg8bbB+H+ijD3SSIZGgtLElVb/7zTubp/HQ4XL3+6deJ1APrMJ1ldpqAMRNPtTWYYnrZTUO2mLD5dsbTbvMYPawKWIHcEPWEXCKU0xM/6MFhRtFVyBFzgAtX6rJLw5ttNMam9s3lAuNQIjajyRaeL1QNKSo6mttUGKOeVmemK/Uvnz99v7+7vrperfBbJMP2aFzAbPa0cbz59BS4hBrreq5eb25uX758mbFz56/gXripMw3KGh3IRnlQn9mn1a20RIPZ5lA4xLsfsEisxZj27+93d9++fi311X6PTI53Sxnp6s7163TfBLHWUFuZqDqtp6ur29c/v3Zh0Sr3lRDwhCqMR8NG/3Kfa8hnJjbtC5ezLy+6RrGE4OfsTeMa0+Wuxn8lbyQrJKqOGG9nz2wSzrwVYPTl2saZjTFnS+kme1uIbK3ujR64ynS4a++42NyK0SonLPpOY9QD/8OPHz88PT4cDgcnrJiHRrfW2nLggpGi8oIgVec+no7XV4cXL17vDwehQ91bG2iEumcepQlGT0BuKjxppVd2r374k1q8D0nIVlhHd2hqLoRCEej+9u3Lt69f9sshD/uhTDVqzuRgsqsx7fQRADOOD8f9Vf785newNgXMbGb/V3KbP3XanpGRc/jgspBDMm2gnVs+ByO0EQUzeUYI64MO4SoN8jEDak7BqcXi0XCquIQHw4fQ0DgT6AHDgwhTk1sKHWqtL5+t4YwAgFXOZiStrM3hny6ynYBPH989PRwPhysy1GvTD7P441N8wFWNSFbrfDom8OqnN9e3NwBqXT1OijMA0pcQ6N64j1lj0D1kbYBWmjJ4OgaG53FxY7ecnG2AC2GQSaFq/fT54+npuOz2S+6V5V7WUYbDMqzhboB1PlcGf/n9Dx8fsbcoDmCjPS+83pxv888uemwHmnmfgANpyN4PJznHuflFcFoGA+HqdYCDembkdCsoRkpFhse2+PFPE96sHDfism0n1vZhY4ZwNLVzpT1ncrxApg14Wb3JQwbJsRlxzK0lPJsY8fnjh6eHx931taoTUEKjiwLdE/IiQJzXtda+vb16+ern6QiuaiHpNATQvNkgaW5z+ABERPdqPhggW2vXsDcz1G1QFjy3pbVanGyzCBHVSjPmkQAenx6/fflSp6fd9TUxctFsXXVwKXQwzqejyD9+/Z2ZrXVzA0d32S2w5WFt3kDX5PZR4sc4Y9JnGoa/uowrtZgexGrfx5SFdil52ojgsaS6IDHEjNXTuBbdGhKzONbSTN1s81TJKUqBzUZjJqI3bkWUx8iVZzheoMgWwyZnQZeZjg5cbZrdRMf7d2/Pdb7a7cGomYqrjWhW5G5d63R8Ohx2P71+syx7Y3S4q3KrhKwFdevb3Zdnty+WpB+lIwUwuYLuRuxetfm+Jg61SsgQI49PT+/fvf3tjz/3u70mCHJUHY+TIjMTwP393bfPn8DY3+xRw1ECAJsRtfb5fP711193+6t2TTRQ310IsZ34ydO2hE3N7jFB0kTqjUckZor7KmUGquQGjAlpI+Jt69ItZsxomx/44JKcZkDnBtn0I81wKi2zax6Y+ONPsSE9uknGZU0PqBxyiCOeDeAYKmkz12gTiH12JwsQ0F9//ZW5ZGZvR5sTsPq0rpRe/fT65vYZbPnT6sF95KyYu2/O6/nTh49Pjw+//vrrze2t5hhkt9zi7/7PBtm1GpUo/su1bV0j+M+7D+fTw1o6XN28+fUX0+alcgUSMQ2KSASXrvr48cPxfFpyWSLBKFSSIJ++P/z08y+3Nzetsj99KESAm7PZf6rRVIYs4ITmeUQCI9hdGTtphS4F14DHIS29DfxSDYwtYeb6dW8AzD3O3m7GI0FsApJvK4BygYnp1Wvhv/JQIFBSyMM9emNqBkJf4D/M6XrI6Q9MFDOUYXamtUK/zAAtZpzX9cPbv5bdgUlIyViral3P1S9ePHvx/GVEGD5s6GR71AAYXX1//+3z12+7/T5agn7//U9QYG86IolsvzdDze6CBcweUmeGE+eynk8f3v19OFwpYj0eq/r29vbVq9cYZUg97gB/thAL0A/fH77dfZGwW3YCMuP4+HS4Prz++RfgMlplq8z8XOBTNhIa55hQ7BAVW2iPMfKOjmKPmDOSidzM7qIE5vQbbzne8YXaNgF9qDVAy7d/KUK6wNwSQFzWBkNgbXZb79DY3kTidqTIqLWZHJirIc034spzFnxPMaU9te0yc7ANjj4Wu6fH+3/++XR1vWezVMfz+XrZv3rzy5ILOGMtwjKsrO04qfF8On358vF0Pu93B/cnnp4efv75l/31NaBul7Uy7eeESFXNgeLcmgqmEf755+PxdDzs967VJB1PpySfv3x1e3NtDr175VhFB9Qxoqr++fh+fTpfXV+ta6n1+7/+cC3HMTJTbvxWQyEbF2Im2fpdBXPQ4QtVR3I7lwiqOxC9cZJqTwdIVM3uSFs9x5sykhN92KPRMy5hdp4VUysfPoSlGkAKoHol044Hk0e6aCmYUBIMXbiSiehjC9/KNXFEeXMnTdoUF2IHrOU5a/Q0WxNQfPr04fHp0TL0m9e/LFdXHN3PtsX2sZiO+mB1ffn8+fvD/X63LHHwpsng6Xxacvfm198EO7CjZ1wsG2CDo5RsKHd4tMj1fP77778O+4NfPcGWkoFlrePpdL46HF6++mm/c6NPcSNYxmbIYOPr/Zf7r19Ptf7P//yfXHYjxrhZFcEf0wVcQ84ijWaIyR09eqs284znXHvrzCiqMXZarJBAZ5P4LzYXGAMWiGg727A5GGYcP0DauIuJNbPtuCXrBhObjcePThDDPSJjqJoxUoPct81qZDbK5HREcEYJe9dvLCMuAE9rKRgR5zq/++vv25vbl69/noKkK4kZJBI5LkOEuu/vvt59+5q5i2TGYi+bHdkAzufjm1/+2O8PboyGGwo0A+9ZtUL2etFmMKs7nz9//n7//erqSuMj8aPzq2Z4Oh4JXV09e/nqOZlGf1PCAi5+BB6PT+fT8fmL5wMqSTTa5yDoaWOuHhGDGEi5yDBIUK8xJCZxccbEUDWSNt+PQ3G6fXAQiekPu5mHJJVD2ti1nNIHoFb65V4059eb12WrR60kXYgZWlxfOaIQgW2vb8PgGZf54Rpk5y1AjIHJUXmAzLQUb6JGAO0COLiTVkYAIa3VXrscvgogQ43j08PHzx/Rvez2sQSFmhk0c1Yz+XQ8HZb9619+AUwB0y/LmsWvWmeFPZp4W4q//vrfJTN3e9RlzId1SvM6EcHT8YiqZy9ePH/xygviel1gzFAld8N3d4+0tfkk7BfAAO8Lv7dxWIBf5zL9T4Ma7CPVMBq0o8+6uoCInLS+kQFb87D3mwWK/tHArPEFgADGyMfxPvkbe+PzjSGs8fkKEo5NBeRcFMcQ5RwVM1Cx3WWFJrIGSA5woi1NQzl7rrAbHuUXBdgvMIgYHttREX4lnWXyALSu69cvnx6fjrvdLnODOd4sPfa+VhHqxnld//jjz8zsMqDGxu2Vx9MkxywBI62Hx0cVlt1O7W4ls8/hQZcY0li7w27Z7+/v7t7/9dfT030LgdgGnAfJWquwNtqDSwV1NQbE2yszRiiaOzABynF+SuPMkZOxBIGRhCjFuHE540ysvjoReWTONGV7z8yEuKkIenq7rHZx69O8DNsAAb8mjK5Btb1ISzbdOK+2hyt5Z3YHMG2+M5YO0gzvAdMvs/JpNsts1sLLSaCg1uq3LZidt5u9TMF2g8I2Eg8djag6f/70z9u3/zmfz1dXh6E7XLW0YQh6QE4KuewWAg/3d4DC4ghAIFhUUF01brwJUUJ8eP+u18r9Au9Sm6yHQZ2MGFNKEahunc+n/e7q51/eZC52zsETv4fq0DZVzqyFW/WH6GsgggQ9uT5mkovQHH7Dc844HM38kQiJ6S4+gfJ0SAtWfoXWxIghvU0Pjui8IcApK0YpNr2nyXkXMRo946e65FHUKoAbSJW/lB54MrrJRnRw8Aqcnwioe/h2Xn7TDfLorswo4y8pInqGvYX5DHNDjjvfvnx+eLhvcbfLzJBjvyuLdssjN8Z9U0HItbrr9Mcf/4OAqpjRYnp+e7XGrj9rGuu6ntanZb9QiFwC9uUOxESXbZYes0J0IDNzv79S1du//vP54z+z4gmPQ/P1d8NvghtkIsg8NsYN4eFFYQutVXorGPQuJSyUy/nUTkd78ebMb53ulrS2J2ITYVzEAkFufcU2+ZdDs3jwpCGix6pye6mD8VY11R4aiAuP4GrFMclvm5yVmh0w03i2+siA1tTuaGk9yoY4eCvGVRdVfj0UZIdVMMgIPH5/+Pvf/3v//TGX/WG/B1nYrMR+VUISzLFDu7koSKBaS3ItndajGCY+PYOBMS8bY9vXG4Tw+P27GhgUU1sSxeYY3fRjwue/IYtyuVuur66Op6e///3v+/s7waq729DcwbYa8/gREBkzzs6J5VLXc0g8D5G2wp5gaJsoj9EymBOvEHDzCScSXMDYSC/Tm+kqgLGNqvB+NGNAG/o0rALAtAHMuGabeeswMb37w0FodLe22CddgsPUMZAolTeh2l0QhGcJcswK/qKpUiGytzrIdWSpA9C7t+/evX+37JbDIQ2xqZh02ACiCfnlBdOn57ZYNRBJkctu9/Xr1xkw6jvmuJIn/m4tWPr+9H2/O9igjykaOaKE7SQR7fIamqKKI9sKkbkUOhc7BTwxzCNHtypv2sO3vh0LFN2EbKvDxlQ6Xg4ebGzjyMJwCuypZJp+PQo3yoPWGwzfXEtAU0O7eLWCmRP1umgnCrZKY8Jb9/idJFUjGDEVAFrS9LJ5tqHIrRtqvMjYzBIc2xaFmVBw2ZO+rEskG+CyFd/Tfm+3eoSx7vXV1W63zDizeRMcR45kAEqGVAsM3FOb5TXCw4UV5HquWleOpW8q8OjqCb8qRKyn6vOaubjkBtJRe63C9HJg9KvJlluqp4yQz6fTq1evrq5u2Cr7tzVYaNIktmeNCREuc4yS/PkzYGsqSdqwznl5mocs0xFa6K2E3A7ihdIwUTqLSlpMmv0h70gXtxtA3EhoAWBXNTjqBYO7rMuQQIHcGAI5yyAgRliBMkIaK6PrnM1vFeMFD8/DFukDuk3vnYKb+EGcYo4ErGs9f/kqkOtpJYiMacMCWGPkk5Q/RmM6Qolid6dajVx21evD0/0Enon+bjujQJUI4OHx+0QxDhCmR8xn1BwUbOBeQc7m7cED9ond3D73uv5I97Rh2stnNiYiUg6VbmgIDjdgJnm2hrp73lvww8YA9EyAJfLSCQWKvTlmtSWlvpibo4MdBgVb+CFUUPcFBw51AY5pjNjIypnVKG7q3w+GhXLTQI9WNm026B+YhL5viGXWK8BIAz4zbkbOW1k6/PcmbI0CQalAvXj1cu21AcywDoutHhzJlmqtUgONpLuTTL82IzMBLfvd/d2DIDK31nUEy3cTEUnh4fvDsuwtEqiHn/BZyUwQvXqWDLsb3Ze+ZVCM6FNd31xnLJh3qUpVYntYUNjLb28t2/MKmoL9nhK6ba40HFNNY/vWNbMF3KGFhgc0pWcgJLTz8AidGuOkvUrRoqcIx9R+xAb6OGgRo1aXTBsb3ZLoDjtyah3GBRtxAZGe0zNBb1wKUy5MFrD9jrCFrK0bokmtRmzdzj1GTUzX8ty6kyhAjAB4c/tst1tqXd2hTw0d5wapEDOT2MIpMLKq+0qlVoei+oxxFopuxrI9R/TA9LOqpmTDvNlYpn2hrhnxjKFJFvf7D1foDmv085cvnUhmCBlDfbG+B/yeR3BsnzOybgyczRkPwDlyvjAzVoNyuzeIJmf/VLWZoF5bZK1+wfw2K0+bTrxVHgZDjJyaeiLqdElZVvYZg3fquK/GXiCqq7i9IWaLxOHeHW8CR9Dp7WoXOm2f7mjYjgPspsjFuDGHo51qXoKqJgE65FgpqxZxe/us1tImlG5li+TX/VDbS3ekFlXpV8VIHghna+Ld/T10+T5ERIxhFHx8PG4EDixqE9srIpy3B0PXMHatIGv1nIZYT8f9fr/kHoA6sREU7h0zgFJNtw7YjbIrbVK1Jqw6vTjqchSVIQ1Gfmq/fGDCCXPeDY3Lu1cIYbM+G2BscaBR1la8vJpA7vzpdi6/y8xjG+B3sjmzMEchpN97Fp7NLCLnOHtbaESMrrnbMeKit/LMfd3aOv9ZQET2NmtItslYaR4yZk4cuhkRjdvbm/B4Lmyd14pLIutSr87Srpaj/CJAxzQRwJJxOh4dHAWG612/KRat4+NjLhkJsAmUbMfUTDuaw94bzzbivEukCKytly9eY5DdhXFtZGqaMqRw246tIhj/CBSJIVOD7feqjepMl2wGfSaxGDkM3uCeuSHHEnDubeSgwRlOAYoISZFj4gQQsUw0CvLS8g9tXKXaLdZ0e0c0Y0spaJlp3JxlIC3qaCvxOXDHz+VSH0CsKYjl1+xAvbHYIhcfH9vxZ46QPGnCZFxH7g6H69N6ln+dBEp+M6lrnqRzQ2yHm1QANd2hCubpeByKrqe1P9zX1eBpPTK93cPKHIOxDWuftzgP8Ga3X/43HYqn02m33+V+Z/g60BICwyqz+YrJcKblw8a5QE9EG5wqGGBupOoIwI5NvXU5tWrU/Em3GxRBu6V5hoprwwOElT6o/d4x0tvE89L9wqcpN5LuvFfwMv5gTFLhegQTVLjJG8ZA2nYk6IRPWMPPHAxTXevq40kNRzqbVbIqDm4z4NRSbWllbNtmriU9e/5cakb0uFuJeZEKMyKg7iJRc6XySwaXNKaLJReo1zqZq3OWGtliPR+rykpsQFudQG2MsCJoE7U9MRk+FmQEl3Wtm+uDi16PKNIo9kOpTOXNYV2g7oYXEEG7Oknzg2KZwEgSkSBD88plMKho+wm2JwIx1gaSm1/SXrXUbDpfvHeYIpNOCpjayWWHceHoKf6ULX3DBaKk9OEeqiVmAKXJtXkfmRnO4SS3uc7abA2IDEZN5ycUHs/GFsrZqgfbRgYU4OIYNLvSziUEqN1+l8uy1jmDaaNEZEnz6mExGWpsro2YeVRtkGCkp8eHJ9Nbao8zAqU+Hp/IXBiMECLmTROXBignrmF9Yaa02yxC1ZrkzbPnELoKWAdOmec1UttIQtcGViLm1e8XKM+w83ab1SEPhJPXWOYM2qN27ICaScgYrnsazKfUb7S6yhTVWNSbkiLy/6fqzaN9TbOysGfv/X2/M9yh7q3p1tANNIg4IErTNnQjSFSwGTpOiRJcqCGiUSZxwXJBRKIu1BhQxDYi3bASQUkiEAmEbqK0Ak0XtLqQpLuzkiWh566qW7fqjmf4fe/eT/549nsuqT9q1bp17jm/833vsPcz7Uac++ghVSarv5qFXFczjRG1TpN82FeTNC+bl4ukud5fJYAPSv1nTVxHHTsbUe+2hZMfaDunIDdowTsCbqYxOnCzkNbFPA4Pj8YYMJlD9cpK/tiG9syS3Wd1GxU0N43881jP9qcU6xRSGjhgfn5y6hEJZCahkbS9vgXetbnYIJWzi00Md/dkLQe78KUrBlojzRMSaqj2wgRbDO9bTU9j9v7V7AetlbQURd5wAtEKalRX/sLbtHEBL0U76BAyQIfmPP+z6xCrXy/2ylaQ+ewsOm9gyh+K1RB+49eZshrM/l+3Z1x4bgUc5ZCZQa2AZiNr3ahLc9cM8L7ZOx+h29aEEW6ZSSa6dqAhGozRVqRdunQMIudoXQGsMCYrwrt/1n5rCQDbCG6AY3HPbSMJ80rlRdKMzLGF62ADK9X+eje5dPiQho/mFh0GTCM5qmrLw4OjBkH0BtAqA2NX54L124TouujVB4lcFKSkD8+Loq6dC8SUeQncVAWMcH25lpCI2ILIMhXQKiagOEjNVvDGDfqOaYAVE/ic9cT8x81NCuT+H4q0VCXpk93RUaXPBsBhFgs4YacucLrbg3s5WCmEXAYh4eCzYg60VrEHpkIpB1YVlApQ4Ny6HiweTMmNm3FTWyx3lDreMfP5JMmkyHfS3LJq2r1drnTLrA4JR7lb+BoAdLFJ/PmwC6NJfk7CrGTRdxweHTVZicbFwb4uJm2tDlL+ATRsIgutd2kUaNUwMe//UvWL0DOtbIISJhZCsKFdLGILSjDoJjC6ZIeaZSQMllN9Nr8XgG7/9JAwJVYkiSHCpijHu2j3vi71t00vqt3tQOvKJowdfdgYbMYmeR+BpQWnlqh3imrWEs3DBhuszATWWpNtKszN1oNd1aaKvHLoUr+AolEEawldRGzYEKR31Egl9tteb1rzyev8/JRu8MgqpAsMsD42vHJMia1igjRpzqDps6hYl3XdCYHtF2lth+XsvGI2xC1m7s0ACl9uZB5QHLTGxKBhR+notK3MrahgykJKJMHGWKZL54JOmIkFYLd2aKVcx9fpEKCRSW9dhUuuQmu+wsKlQw0gCHNdTL0kFa+HiUFqgWmvEfOO6zKnOxoziA+l1q4wB4BUgcqJ8PSSs5kl2DiBOwJpVUkY7ejoeCTNrKxc45o1axPQUFrV8mbMAotNXVYhy8wibGxjlt6EmZ/vN20xsTGAkL+oSmUbd2dDh6NGWlGv29wy82A9gK4WNa/wi2hbQczzmFVUXpG0C21Bpk8L9uw8ae5zmRc90EQx0EiEhUu0n4J6qrht2347G+f73JJWNRRIYKYQHdPych1uVvPP2aPawy4EB92Msf8C+lQqSqADM6ML+VdbLEA1YKRXbTnUZlI9ScvHZpkBwX0qkucgWpIdc6mW1WfFrgpasdPeqDJg9MVjQQ0Yd4cHGh4ctpi6LD14N1sWXiwywB0W0tZ1Wqubw31sm7lZxAIzos7PzyKiUo9D0jBLpknvG1IP9EmiW5GZE/ap3W6HlvNrWV/A1YKOzKXvEMo+tU3apirpdb7pkXEAwYggnFaQQFT6AHdIrkq3sC0HMDyWiHVZFgntGgRBlgbaEJoQjcxyBJyIshRirzBwAEQKUhyZ5qjchx+6JWk0t3KPZJLGKcSizrscY3XQF3Jk0S0CkJLBw5npTla/Z7gwABMsx5lyPyuiGfxWHRSJNiIJ+FVjqVuboOtoCYSJh5n+z7a+C+q0FoDRWFmLZiyxsVZCmXXS2tVi2neVpoAZYt57kHDXNDsygMLIXKKN7BN4KdJ2h4cT86OSTshitiyc6iZF/TRgM7WyVtA4xE5gpMwFYqsF/smqDpR7sKrTMwNMrLudytmx7UeOMAc9dqG0xvAQuWvsOGdvpa8mwRsIo6ACH5VBeIQgjmVxQepFjWoewKJQJCMYasWYg+sSOco9zWN1A5AjfXGgaSpRqDULJ53AM4GBmOLpib/z1ym5G9ppXHQ6iw2WFOqgSs1i3W3jfFlW0IA0n5MsBZ5yuOqucF0voSHgZiguHtu2l/hoAS05yAoPJN1D9w7BcK8CnS3UcZhGkJm3axqoLHd3LRHrToNTcgzNdHZDzeVgVM5oZz/NihCsZvb157Ih66Tpsy8a3dQyyVxiIevt/+tPfvff/3s/885/VROEVutlWiQAACAASURBVGbi5StXPu+Nb/iv/+q3f+ZnvW5ddrSwyqyaqVhab7p+HIXVdwRzjI9++EPvfNfP3rt1x5b1i77w9/zGT/tNcCv62J9H7CIAZxbDosCIwaRHGOKnf/od//At/91TT9+4f/fev3//e//tL73n8PA4lWre2uSefvDryHHNYJrwsU4Harams0qhKyq5BzuTqDvGIh2JCvhBxOm5+RIt76m+2i3cqhZfEgaW08xXqkG2WeQAmVmjYglj1enJg5dfeXndHXrXtdXe87BOEPO2EzqlxlDUaLnZ+TaOj3ePXHtcpbj89nUhHNIyMlHgXVMApjQFwKoYbigvzwZfhQb20NaL+94MLvUMk/IBP/fcc5/3eb8rUx2khUWRZemtMO3FcXSw+/Gf/Mnf8wW/txV5jKmBVnZimXulwfEDb3vr137Nnz/fcjaX4tL9S970pT/2v/zougQNmcPNZ/qHk8kcFofb/vz4+HKxZ3k/8ejjL966SRI1WpNpnkxDWM8qFbjaeLHRjAkPAT26Q7QPiDILVcIKq9Vdg4n1u8eDBye3X7m1OziQQEswv24hFulYbBk5QvY4pluYoao8Aob9+f6JGzfWWJxm27aBcCcDLZgxwgNlBTIEaehUKB3rBC4ybdfYmcmlX334dRVgrnzKlntpHQCW888wXTT9IxuzrGyEHwWEKe0aGwpWJjf2t33rt77xjW/MZDjMEGG0Ud4IDBvG8XA/Pd9/0Rd+0Vf+ya8wb30CW0DXWIRqm9d+xmd89Z/5s9tGmK2LravADlTVT779J3YHu+dvPq+CqrIoIKsS0pMYP//zP7eYl4+OdFl89KPPA8gcZTrVUUgDGl9U5wtjTqeJWlrrkMWO4dYK0LmvvokGmnmIftfWAXGwW7s5UnSFNWIqFMGIkSOiJd4WIagghMeyiKxtT9gCJVh58CHFJv2VJha6a1G3z9mrpUTJBha5LC5bhLzwLlCDBgER2udsmbUYWuvWX8oelwjPJoPbvjp0FixUa1tobK3Bvuqr/sQ//sc/pF9NyglVWItVdlwz9KYa6KP/8D/9n178+Mf/5Tt/lkwbYCjWNc3Dg6/7Hb/9V977XkDrH1vvcEkhzOlEPv3Us7rKi8ksmcMiwPD3v+/97/k3/84cJ2enRX7/W9+2HkZlaWgp9E2UwdGLgN1+Q+w0jKUpFCqP2/ZThMSo7WGRSGSCtWj3Bqx8WdzBQQh/LNcl3/y7W0pw2W8FBkdHY8LcQd/G2Bncyvb7zcU3l7pglLGyPUjtNylCbiaFdVgHdgGw9cAB9ZIOI5ZWD2l3aQX4pK8gQLmjl/tYgDHLJp/XTer0AYJVleIM3fBD/+SHtBTQaguo3ETVSLCYZCU9zByjwfoC8DP/6uf+0l/8JkNgmdSQu0d84AP/4Vd+5X2zCO5/hwUmUVlIQROf+mmfCsUqkmER4cDq5m/4nNej8TUcH+6+6k//5yUGSoKIpjSk6u0bteufRj8L06LW2Btgrbya0kqO7i3FkrrrhGvhPhCxjEql8rNvbRgsa1Rl0OmuAzcADQ5tEUCBgtQERYzt3AHQERcclZk3XEPvBUdY5gbHEuEUclLGWsK7KTIx4NVwNEFmh41lqUspKd9hsz6kiSwwJ7yhORbNlaCrsBLEguzA9z/5lX8S/RvzIjKEwG/7jN/y9p/4iXe8/af+6Q/+4Cd9wrOVkzQQPQ048Lf/7nc9eHC3bbNI9S3f+Be+iaBZLMsC4DWf8PQrt29uuT85O/0jf/g/ufj+BP7D//MfPvbxj8EiHTAMchj/9U//zL0HJ27QZIN//XPvAhxjKkh1Lcz2svEuaeZMaFnBTJoZAPQAnNbCNZj+P2DOxSfFbxfcn+tOMHNXYpV4ZgVKOQ3ruliHfUkdiE69UmGEkrkvtz0MNrbthRc+vixruMvqVj0K15Vg7obuLCygeYGdoCCYeDxx4+mZsUC2Aa1ZI845jTa7J2sBP4iKORmhK8sZxzC/rKBA2vDtfFj4EssX/K7f/fPv/rllXXKMNvoCZvj5d/38G9/4uzDLMha+9x/8g6/9hm8wV6GKix/05jd98Y//1P82EVKvysceuXrnwckSngSrXnz+hSduPLmdna+HBwUcruvIcfER3/0Lz73hDZ9zvt/vDlYl2h/slsw096x69LHrN1+8ZagsRkhu0FcEMs0XdrutTy5IQaeK0dGPWpysTuVYCE5vv0o6yPZHdJC4nvXdu7dPHtxfY61uQYXNyIDa2SCV6bZoSKsbhthgszG23bpef/wJh3ERHiZ0G9kxCUogkwJfxffY4FZW1XYomJeLPrKergpZikMVb83UlAZY2Hhvqcgryh01g2IkRGTRLiSIjDBj+WIRntv+5979czRktsxSD/XXPvBrb3jj54K1bWfb2LZtX2V/7uu//iv/+B9v6rL6CZrhJ3/6Hef7M3Pbckged7I/98axC8Djjz9WLAXdiU+eFxcA3Lx1U0wiQAt+4zd83aYRTigAH/7gB9V3xEP/cVfWGsgiA0+Jze6sbd3jYkvR75YQCVdMa+iajV2KMGHDplOxbnDPAt0hiBomStsMc1QQaZbY+oafG9TgrNyqquBMjipfzMt87mbDxG7JcIvFCJNpGnQkw83cMmuJnTQBmFla7pVDGInlPMpFrqGqsgE1oC1bM2qUQE9vYRcJSVgWE/3+3/aP3mZAuEvnuTrg9mm/8Te8+tWfAGKfuayHZrash8QA6wd+4H9Y1uiRBe2iNxI/+qM/1u+etsC2UUUbrAUGYKvN4WenJzDfRnq/rk6u2863eSt65f7vveUtmK67P/af/qHjS1eA8nAltxqUx86+3GduVXi4R2cWspXWsxDvF9/sgHrLec0IY9Z4Pp9W4ocXr6qRUonpmgxg5U5389zYfK1ZAjmyheRSXFWFgrQ0wqSQo8osmKxCObOSrJHaioRlVgk7SimWIJGJUbX4JJ0cso7kEouqVuH1Rsm0qBOU02gHWqFJeqPmKpcj+sooQ8Ti/r1v+14I7wISyDIUf/RHfkwKaY91ajwZEUb6Lr792/5KVe1iJTouheDb3vrWHLmsB6yR7teuPwpwdR90AGOfaTw+vkRioe3HpobZ3AC89rN+uwHrsgD4ii//SgCtCiZ++Id/hD25JCaaKImf4udlw4JJ0yyitEjX+QmgOu1E0TuAgGpd8SLEm6stRlhnuRuQBlQsnpnJsY2tRuUYo8bYatQYNbYcCl8bW2WNse1H5ZY5chsjK7OSpYqNxfP9eWbllmPbxthveT62sW3n+/0YY+TIbT+286qRuW37/fk4Pcvz0/22VaWBbuwZFDAD3OHmHtG8i9y+EZ2xBwBtNJn2//a8qLSgQTmuHros090r873vfa8aG1ofRuH+W37Lp8uosli3pyi6xygi68/8l38OwJD/ExBU9bM/+y4AlXm+7Y38ki9+E2BjpOi5649e+9Vf/TV9yt/4Wz9VLyYiqhDur3rmE1mDtNsvv/w//8g/AzByD+D7/sFb6EosCJqZe2scSxKcFkdD9GXD/2r4Uk2c4yEgALAKlWjHLtolnOJ2ZXCKJrncSHggOArl4QKzZGIstwgsoq2s1V/i7mig4m5pJkesZWbW3rFay29mi6ebyYiEh9YzoEoPZKbH0qKgCBb9Is5QSgzIzFJhnQ08Ez6QUqO71ByNyKv1nR2eoe8sGpYx9rEsZ+dnl44u6f+qsQyzo0uXXn7lFbcg0uZEEfQGG46Vntq7E0o3Orw4ctBsOzs5OLp8/8H9K5evAFjWZWwKKXuoYHDzzlQFvupPf9X3f9/bRAf+hk96za998AOxi22fjxwf3bp335SsBkcXeq1FNvcuvCHV6ZTmtDWtu0ydkWSZhYrF6Rqi8HzZG3U1NDImptpmlNbUuphLfB2qffVgL/6iaPEu6fsWYwuvzBDLzhe3xZYlPJYQJRhLLOGxLLvVYlmXdV2XZZ1fsdt5LMuy+qIUVmbJ+SiuVprlDLN+4Rf9eO8KTF6FbSvtU6MpL7Cm03KoXr17955uYHMJUTDIy5cvG6tquLu3Y7ApxsDOHMYlljAopgUGOIRI6rkGiMuXLv+tv/EdAMY2zBjTkw4iTHlhILC6f98//EeapPf+9/3yr37wA7Vg2xLAe/+v98uHmtUFck5BH1xUkz4726jfdSKkHpB1Do3GeilbvzNFVRY0YNTBJWyvcP8jBL8l6H1Hia13lBNWqXQIVZyyLLaKGRIYyEkIF25DEmmsJAdqG7mvGjmqxqjcs0b27TKKWdJODcE9abRCubeQQT9IHXC5MWlkz/y2Ikt6K82gRIOrMFUWaj5E5KNVY1Vk4fmPvwBe9GBdOb3+s1/vsSYwFaGCd0AjvcyEGoNA9qEj0aOwy4h1J+rmL33Lt375H/sKXf99qcAgMQVRwGNPPHbrzsu+GMqr8rd9xusAW+ggXvdZn/WqT/gkA93CYzFW9W2mElwTOTvlaHIuZPTL6W3auorkYm4OD5LJau7b4ObVxrFSIckGJiW9NaCKVUwClckaxVEs1qgirCpLOy8p23MxB4R3CLOak+3NUapeMFjlxo4ycPeCoQtHKBWDLfnSx4smNqrQ6Dky08wS7bOWYtaAVrWomJKsocoM1fibB0AlZ6GRByuui8Pr5O5tSD1s6GYW9rrX/U5qbINw2yJC7YkBuVWihtD4xdxdNkzCEObuFcGRG0ei+E/+xx967hd+9nM/+7OXdemTATDYpctH//s7furF529eOb6seQZ/46/9VbLWnY8sAO9+7jkIy1OdWcIW46K11pUtC4Nw9hSv0zMcMFQyOVBUxqfy85SeTktAeITUtzZFvda+XMDMs99LKVaBXCSkJhxuWbIBSlRzEbQOKNekiSUuBggwUOADlgVVymqYGJh3lHOHpInQBmBWyS6HJOJvqZDkLI7FCJpyWKy3rLwDncSl1tOoOWZEuYOdmYWm9lVr+37bA/BIaJ4GCPCZp29IrWMoGQslI3MabfEcHn6w253vt2E1MyZabG+IrOGxmNXGXLG8/nM+/12/+Is5xou3Xrj1wovXrl2/8fQz67ojwJEwAHxw//yvfMd3gMiRAL7h679uXVeqyhqJCFuqRiHKDJljR5fIx8uLRLTuD+7INLV2sNbiunxJsntlm+HAaPUYzaMDjppPgvWkuzJ2VANk5IG1lahAs8ULmAJuYLoSJfDRJWIAF8mZJw5kJP1C603CLFUNohnM7p4bdwXQwA6qHhr0jKJilIIZhszSeDERoZ1MJCjOaaGDolsFtVVT3+hlJGs/9oC0NEViicjk/uychIYdQqrq8kSNJpXoZpevXLl3/0HQ80JZRGZmK8HSDVwNlRzb+e7gMJZ4+sazT994VuXWyM0KsYR6zC/8wt/nBVpUZazr3/l73wMwRy5hsOiGBqo9sQsV72nFCoBwSRyKrBmHorsAVQNQ5BFIhMPNUVnmHUzkIoqNkpmJ9M/2XDirBjcVTwRp4gH7hKoStExLTSZRUQvp9ZwuNdCCgRdufsSXnXLSaE5WGRe0W7cr0iozJOky7mTGwe789OzKlUeuXb+OKiS5iIopow1Wx+SINLOphFH74xdTp1pzokZTTocyzUGDm5fwOGCRyq7xcnl47N6D+25WnWihJ6BFCaYwUS5LEOCs8bWUmcQqQHEzC4GGsS5jnMOXyr0hkCMdB+uu3LLS3D/4//7qc7/43Bq+ZRrsn/+zHzFg207X9RiFj3z4g9/31rf+0i+956Mf+tC1xx9985f+gT/0R/7gJ3/Kpy6+VCYkmu1w+wsgn24hnMVCl7/YPAIsWTRUUgmTUsK8NkmlAEHhDuP87Pnnnz84OpBuu2YNy8rwqNkGjpEebpTYouujMgbixjNPLzSc78fKsIVoj4oCYWeChQj61sZVAb4s8uFbQ85l5lh0EAADHmYegA5EoiPyrScWieTuOoiNwlK/bDO1nDC+AcsSMLt05bIDYxRkNliWMbZ3P/dLonlbJDObNHU3VRux65OryYHOglQxwSrEmv1wt8BSi4PYrUcwsiJgSdbYdrtDGj/90387gC0LwPHx8Zf9gf+4yHU9fnD//JM/6akXb93GbJLt//Zf+IXnvuUvf+vl46OPfeRjl69cSWEKZsgSVuexsKqkBJsSkIeGZ3eXKLole7MtVA9JjZrVq3c0YuDuIYm3d+xmUDPFDHS3smVtVGfFYmDR3DxzaErvYm67g90S0cd16dmlWyS4uJOhKgBZfrAzzcLwiHDsdszRBQagkdAhR6DEzKJV1TA7oHhS1UY+qz3TfGGftZs2T7CGM9CYvT3zqlcLr1Z5U2OY4R1v/2l3M3hlSgwhi3O3Jh4gXnj+JuZ1KVwQBgtZ5OYxLdBTH9NAFRky53j57qCM3/3df/fk7Cwskgngfb/yf6jqOdvOHrlyOcV6e6xLsDYLzz2y6t79B1euPfKe55573es/R4C6oDNzV0C6xcy2JVgGZW+rOJwtUFiPrIBP8ThZkJKDAafZGCOW0EmjaSPtxms83IoVi5uaMm17czcLQxZ2684k+X3xhY8tscAXVNPewvCbbJDTzghjeAyUYEN32297t3jyyRvlRFWv1kZY//8qKPWNvUOt/xiCZ9hSbKBZch0UZpXlbkks4WM/1oPdBSikf5ZY9mNvxH7bdquOWqgeSXJZlv22HWisryAtWLLCsI2hN2Bt7czwUDk7A1oMiuRDwa2KSyxdITk+5/Wf/dxzz4G25/b4tUfu3TsNBK1nedEQ1BhiA5EsAOfnZ8t6UOM8YiVT5aGFSw+qM6DRJZPWdSbLO2k+Q1j6d9eljzbxABYP7t+5c+fu4W6hxilPmEdOa/0lt9A6KG3VzgT3sd9iiSdu3Gi7WaEZU10VYksbTIfRCSfNRlWYuyFZWZydPZhSlKhCCCky5AumnqsGxfdFpck03YH1w5d1/+EiMsDMXQENBLAux7tV+wXobm7kuP3KKw3nkEPmUSEwCSY+9tEPQbNIxYeZAfjk13zyBN8aKxP40rrLbgwroWOQoL/5TV8EYLdbtGvf+c5/LR7qO//W37h37zQCBfGEeP0bPuuv//W/9rm/+42jWFUWFgHz+Oqv/mqwCBYH3C3cfZpQdRpOLFhMhE5oqDjWFcIWDQlBnKKZedOmHO8K8COITOo9mrl1OAXDLBtQbschGjZsCUg0iFEkZobWNBUFC7DFvVOIHJlZLFHWbujC0E2qQ2vfX2dXqrwFzBI1G5MWRbn6VJrqP15seB0ftBkIaOFj2xazL/nSL4NcpyoE3AF881/8C+VcIsyXJYI9Ntl9tyLs27/t2w3dppQmaAOvf8Nnm3tt5wTaf6S7umMFy4AxNvWjBvvwRz/69n/xTgDbNsL8y//YHz06OpT97jv++t8EsLgjAsAPfP/3/+K7f+kv/1ff9q/+5Tt/+Id/6GBZ5Ghk5Q//0D8pcllWt0VzmCQV0Hs28TNku9YhHWsboVv0Y11uV/VYJSpMxAzgluUWsr4CQcgLpPeZs3RHkUG4jpwWZBvIxQ1pVlUvPv/xgoTIQihagOLuzBIK4m0eTAAdUGoA63zbnnrqmSUWBUf0OT69cw0qFKhQ7zST5A49/6xvcxTMmQJNo/sftypqWgwSCP+VX/53n/W610cPydSRxsPD9fTBWcHNRmV7re+fnl86PNrvT4+Pr6DR6JZWE/w3//Y9r/3M11ZlRExlUZdGkgeJRhn7LZYDMxxdPjo7OVvW3dj2Syynp6fLGoJvlliyGF4Fu3p8fPveHcBHlhvNl9e85jUf/MAHrNkFjG1EeOaIJZqbccE6SqhlKBg5BTNdID6gJmw2LinOmiVBUiHcAd68dSvHfl12rFSevFq2AiWsUIOq/0JpfrSTFbGcnp1dvnJ07epjEk55WLiEsMTSHuTAxdEEH0VJhHsLiziBY2hFC1rQKd8CdcXGoA8Dd3gsOgRZZUjNd+zVrQFDk5BqLa87gLByXxZ3/x2f+drdusspppbr/exsfN7nfx6tzBZaIMLdr146DrennnmV3pmWgkBqAz7zd7zOO4S2oVItlJrWXZ35WSDqp9/+k2cnZwBy2wP4iZ/4sWVdzk7PSIyxz8rGIcmNo6QtEOuUdX7yAEAsoUNY809S49615mA6uiwE9pRTw6jYNSwMpcAgE1Y9Q2UqHK0jNhBWY4MqPmmVqDBMQZSQjFr0cvf6Hu7uFgaEcbccQKPAPKJEVbiDHDkMRuREZ4son8dm58pMy6WFjW0vHmpawvrqZamVmiTRdN2YqBwBuNat7Kz5O7G3SdwqYyKEqLLg3/Vd34XZfkAgO/iuX3j3l33Jl52dnYQDsEy88LEXHnn02t3bd9Ra6IuTBPDW7/s+GJO5rDv2wHgqh957nXsYas/d4VKFL/7SNy+xegTNL1259KYvfjOrumlt274+SdQ+AYdhf3KuXJ+Xb982NGpZvZFq9YB3LpUyGfqBVWmKeZ+tTmqcXDsUzR6mqTZ8qEFkOii2HOY61NR8oMkcQobTKk2/7Xodlay0pj5kEHInLJbIkRaLzmeY9qzyu4URGIDFhdfQZ9UtCdfp+ZnoOEygytHr1hXowZYBN3TpEN/fFZNKOXYUBitb9y3whOagm23bfqn62q/72qPDXVkns2CqhN7xjrcfHV36lE/5lDf9vt/3xGPXn3r2mft3HqAvrgr3xR3ww4P1T/0XX+UtRStXDmVNvVBVByGUWZQhvuZr/ywRzE2A3kc+8jERwQdHh0UsEZg9MZFn2/i7f+c7CR4c7QC85S3fs99v3TsCl48vLR5ZBIKZld04oedZGOVCdMsStWByJOttkNX6QihXA0xeLLFRexBhVu1R08lDui09ZkoNS6fLaFej8xLktHXJoOr+vTt37tzdHRzKeNmoXY89QZLhUcWqYeFuppm7XZmNXNaD648/1nonY5j16SS6Sj0QG4ls9bAqN4WP9pR02TXQri5rxKoKXOzhLx/xwsc/+KpXf5K6lwtD1bJ45gSeAbelOGYVA5OFCTg9fbDuDtviwgLMzauG+cRUikV6rFZ17+z06qXLAFbHKPz+L/79b/+pd1A8YdFtsbA//Af/0D//8R9fl3Ubm37Y8dXj17/2de973/tv3nwJgJsvO9+fjz/1J/7U2/7770cxJF2sdDcqb0KMhDQQahFahGB4WO6AYEmDKKLHZmNufnby4Natlw4OD630vgTTV4Hu8k+bSfzlPWVVGLhib8ZWTz/zNMyNVefb/taLL6wHhwBZqQTJnnuFKBKVytosXnT7aR6WGEgDn7zxNOBgipSTAduA1FxZWYIVsIohWZ8KhZr3jzo9kGah6ejaCMUKd9VVYnDd4//85X//mb/zdRoYqmIT3aK6m20jzR+25rvduo3B4oc+/KFnn3l2RpCa25iBOzMgQabkIpcw4DWf+Ikf+NCHl7AsI+v8/Gy3O5DD32Fj7CMitzo42BFdD7p7dZSILp2gZkoAOQYCtaU4UlK1sQEBjqK50L+JWEA4hB6m4kvbhCIpSNHgFgKub7/88snJ6e5gNcVL11xDkueDmNkw7NQsCFmJwPn5nubPPPUMFBSwRAg4N5r7AriihtQdu5lH9NxFpoV5uFlokFu477fMShWQwlflwBW2DDODl4maLEivMKUWwjB1j7Vu3Eo3uMjxPixEY7M/w2977We+773vXdf1Qr0dYTTPrG0kzFAWhIcbsN9v169evXXzpVe96tVUOV0JL1qUG0xzz5ujgxkDIH/5Pe/54Ic+rMdO1vd89/esu4Nt7M0QMFStvnDkEsv73/fei+LaCKcfHuzUb2SlksV+4V0/7+GVjMVbh2BmCOveKEwGipafg1RinINA0khrHb7APGXKSP1Elp2cnkSEuugONQb0OiWv6btd6WrOTCJM5TyJZVlU/3iZEvM8c7T0ACSKIUSkW6HMIhkeOdJYYZ5QVEK48cGDkwtoD6GHYi29ItWgKibVZrmg7DFlbbODL9LgLKOlJiZXEyWaDFBu4sqRuX3ab/7N9+/d+fNf8zUi1zM5xwXrFGEClXWwxDd/0ze+8NKt649dLwxX0IA6uCpvsG02FSYfn4/K177xc9i1Jx65fPR13/B1UJevqSqsJH0JWn7ab/qtr9y6+Ymv+gSPtVjFOjvfJ1FbAnjk2tU7t19+w+e+ESh3oZVepEsMAILFootybApfB6qVPOlugkWUUVswVMnfKkdoYcBsTu5QZKxPxL0oPwVZZHgLrS4c47q9F1tkSXWhfuu6Au35hDGW4KhueGzeXJS0z6qw1RCpUchl3Z2fnIIwRKeUAMTQYmpV0zy4Jx0rQVjDxZPFECAinmC0sDRMh5wWphhzwUS73fqW7/n7o7Yf/Mc/+Hv/oy+4/ui13bp6wAyXLx2/+c1f+jP/8l/cPTv5b/7b71LWcCP/DWvNktba58AJ6rnZt3zzNyOxrstTN55ws5/5mZ9FYdQ2nxbdxerAzOh17fpjv/bBX33x4x/+3n/49/+zL/+jb3j97/yyL3nTd37X3/748x+7/fKdS5cfUXL53PGaP+k9A6cfR5GW6FBOiLYvAy0i1Irp9FccMefeM9j+bM8sQ+QoiNyvh9w9Yt5hZtm2PF0Vil9DVu2WgNTuOfbmcf/evbt37hwcHiQlbQEAj572RHTDINFmrzWwkyhQ+2175plnTQJ9bX+dKez7YLZhnNSkPVwcUjHYjHoS6NqJyT4rQWsPf2tkNBGNNC6+6LF6dJPaNlHxIETVpuZCzvw+IBVq1BIsKOPR3HWGyy0vIaXguKpqg3ArxoTAkVkaRK1eSUIVm3UBWIDD0kxzKVXQK9BdVyBhYfN2l37ZDTSvGmGRmMNYTfmDRCNK3TCZ2Su3Xzm5f3p4uEtFpeje0klTNHjVIOCL4nbalQNNA4GfnJ48dePGweERc7i24OHRMU1f0PLLZOXoNsjNNaEXVYkia2MBoEaYACD3+02PvN+7blzT2ocQiOmqaohVfxMnEwAAIABJREFUaxu6BksfHWQjE7KNV1VRDa/0DZILqtrmYmtVbWNf3BdSAqEeNZm1H/uqAVsAA83obkagLGzaqARKu7FJcQ+OMXJs28ixNwzh/27m5kG4KjeQLL3KQKjx56jczpBjVGbuc5wzqzDUNiiDS4WJdH40gy0AOsNVJ7e2H9Pdkp3mjD4bUhhz+cWZ6oSd7/ex82KPRPDGfsRkAEYPDSvU767lIHdGkIgIX3aEKoo25gsAoCgTGlY3RN8TLPHF6J8PBJxkuAJ/PTwe3LtLElazv9SGD5ik2W5mkE1YByzKQVgAcMfIApjSCoq8mx4sbUeU9Jtm7spzCFtkMXNH+FpZrGQxx0jJAUW5QQHvrYjsq6sRR3bhKoqmiCpflsXDXQOxhXul8lAmJdsleyoWDSWNGQPLekhDONzXZdlx8ZBy1yDxAAw0Imq+rOJI3RnGNJO+tmUA4Y7QRDcjB8rggZopeaSZVW7jfAjX0UUqk1L1lawiCm4hVDrUysvrYCRrcQ9piNw6Yjc81nUZ27goAwsSLFQl6T1Xwkw+k5aEJ2WtsXA/Oz8zlFUPpoKKCqPRlCV+UXiLxTZ4FZhFklnLKnsxwh01AU0D3TUaYdYd2stC4UZ/o2UxsZodMtY7T1RbZ98rdRbVE7pRHo2GdAWp4qqPd4SAW3eGWRm8zMDKIg2LPtB0zBEJhYoQ0/EJoA3ORrVNlWhhwowEE2W7hDJCYABdWrn233Tj7KZuytVcwBpaAoiT0xN4hQvazF5SaPJezg2ZBpVflyIaFHMDG7mtB4fuTXJ60Sr3ZnZweKQAjRqp3sLJPnnUNWu0yuz7zRezMK+qsvCsOjvbU4vJnITHw6wvXNQNmh4s7DV6mKpofuFllTWJTSk2XAD9BX3XNgMDH97SmOUIiqX7RIdT36QmWFO5aUVYGSuzFVFEA756iLDqoRwqEFRaLjAgvJU76NfZMKslS6pRc6W0akWEoFbAJkLIRFddjSn1VYtQujiUTNgxUNbO5v5cLYdEJ+YYUScPTiKWpkMtcj4bpnKDtP8LpMNDeXUSH8AJVFasC4Eyr0wHymwBcHRwWJWaWgmHLaBEcN5yF3W07L53qqSq3/Qu4t7dOwZxH9p/XXbq3RSVtGdEh1wi0xWKCbt4bf3NhZtKAwH3ZRYk+qIOzQ1J/2c4tZItl8lQCQlDk1BzSADU11q4ROJsLbHSLqsKTfybE47FOtTEjVJkZouDGyTCTEYztCAEMIXxaI5Ih3fOkSMho65IClykGZPN4ojhJYuo3HzWYToWpVdi0YqwGGMb24hl0e0sp4NILBGF5iZMyGwK6MLdGECY6SA7Ojgy0pCKuTCiQCzLwRrLlJQB5SanDi3cZd0HoARGGhRfZqDm1vq67vf7rM3MerwRaYEyIMI0xrcQhKAFoh0+hMAWTMREpwknGMBOFSKqpxBMz4k0AaZ85NkEWLXvYJ6XRPMnOgP8191VnJeXWXdC0qxL6AwjkehCMwldB51+1z1z8znWfRinPzmVmVVEM0PzdRZSYjQ0XSUbJRpZ6o9bAGmxcJ4+AqKdCoxVsmzdvXcP3mFi5mYdh6vT01hZSoUu9i1YEAnaxR3Ll1jXXfP4UtBp0KIFDg4OtkrtO43cKGMyCeYoyexEShnBsj6DYHOuJE8fnMynr4NOr5fmC81oExXrA1oAsqF52b4X+37tC0/zW1MMWDZ2nJIQI7OqJQJSTGq3Vz/gfmMtEgRgzItV0mAZdMEQaK+m2FXxk2aN3+l6RNcZIKCq0i2zm2kV7X0IqTZmE/sqllX3iVc2FqK5EgMGU2Vvp2hYkwamC1GVJXsUr2YNonh28mCJIPvuSgNHi/G0un3C8/0F6KgnI8x8v9/W9cBkJiThcJnwVG+s62pJCzkH51BUM7OYdLX3KifgtsQi/6G+3Xqw3rt/V5hCEg1rsqEBZ7V5qOHNPt6sCSuas9yJyW/2O9CcLc3fMA2cN4AtKRf9IWEx+nDR9U1WThlmszvWwYQwmeZbhuX6BsLNJtGuTqA0uVqVnK7EatpTBUHfDPDqNPUO3DTormx0s+c84OElG9ILzsvKooaOG00Msos6yVTOAyI22qJGf3D/HuDLEuZIGhRkFX5R27KoCfRAY8BWXDqoU9VyHR4d910Ey3ZVzakhh5cuw41jRgZU2cVpbU5QBQQCavOyUvp+dRFuUVX7s5NZljngiCCMliLQ+lRGs+Z28XITMpco3UprRqBCb2UzqFSy6RrSA3fdly3BnFZEuOg7VVUlY+C8FlpHpCcCK2qa33xwesVweUf7paO5l4vsMtNjmZy8CczT3AhYF2vtQgfL1cjpJUHKR5XkYnYslujSUCAe6Kb+3LU80WC1vmHev/9gWaIIzSKEpiKUxj417kn2rqlKsmKJpERGyCqHHR4dUaEXbmHmSnJwdwPDfVl85N4k4TGdyf2I1HLRoGDYi56xhyoQMMRycOeVl43AjO+2klhmgUKb+6DSGVY0Oeao+nHS77rQzdxjzkQzXRGNT8EdEuX1qiHYoQI915x0Mvs16RErOb/VN91LWIfStBzU4EJDaEirKoYSO/WZRG3RZlJFd/N6iz3owmap2gUrinVhuVbLA+/vp1xItYdVFw2gjkQQOeH0+YjYF86DB/dhFcuC7Nld5l5lbOoe5qbmvWsM1V/VeChhBe52B4vGXU40zF3Ivo4v88NLl0oSfpXpFjGNGu0271uoN0pPQ5o37LrEluPk7EQpD9UqZTA3FmfGq+oDU0UA9uDiSgYElMEVViA1lytSWfZelk4BWlj3NfIw6/22pAiEq6tECXvSm2bbiq0fFBqU0Ok0a3+9xbBw10Uu57IiiHRUlrQF+hVqDLScxI0tJ3ez1j5DWEExCx5qAcTpE3Ncl/DQCTEKrxPaqT6aUykiH+uD+w88FhQRPjvdEuup/gQwdw1FLQtfltX7RGwAL/fj8PhA7XhvjNJxqLkVbgZcOj4exUyBGA0iWbdP5g3SaH9z5AAnWdr9IZJ85aWXIOkKG/9zD2sdtezUaXOXlyoDLSe5v12B2q0t9w5D7/FR2peNKuqTocsg9Z9oxZXONOloaOJyoFYSFKOInpChBl7yDdKYczClBmm76VhDQ4nNwMB1EsM8tPXbutInfsM8LmuMWRP0peBVmgariORTEREXOFtz+A4oiwVdbtIMt196eX9+vouYmP+FDQFCb2av23dfjlJ8n+zePmP6Lh0fG5Wj0efxcvGxZWtZ3A93u6wRsWQBqPAl2Uox+Xeg3hVOL2HvAprOt5GZx0eXHrl2XSePJE5Chlgl+A3sCoJuEDPiNt8YaBJiABIoSjtqreTBXJDswaFtL4foQWksves9ZrdlarGq1f1dWs0gG2FhDiTYtmaJAEXANanfyALQE0YNrZNCr8jZHllNHyC8u1Mzkw6o2hxtEAujwTJ0XwppZdU3gRpStfE9v8P6ORgKR5cvbzlOz8/NfLfbqdJsUFXxNdbxESDNhUnrOAoEWDVGrcvqthLZLSkNAauRE/aVxsZOT05eeuXFo93xRG07i0qNDATxJRpBBtxtv2215cHBwfXrjy27naoIwSld0PcSmo+vV221DaiUYYmZvw2afMWWasR6vVwUlE1fZDUoK4hSEQp6HU2Oq9RjO3e0AwBe+Pe7GdOn9R7OU6M8dCqJ6s6ysJrEIFhVF+Mg+ynRZlfTL1Qrrb+BCkqfQ9D0LynVrAknZbQ7Ibs0QUvq3O6GQHogmoUX8uzk9M6tVwq5Ozzs0tdR2VinqCEhYIXqJEY0NXh2fvboY48fH19C5+8pPMoWuJRIlnOQze5g59M6AYB6RpzFmVLfvH+5/Thn5m53cOWJRw8Pjs1N3JNKsT7/hVT5bDSqy2hFp3T8IIoMm/AemXLsREPBOREiEM6iO5JYFCij88oVDGmegjACs7DodD+9qOoWQO4mfcRCNS6lnJoFuHCLATLIpUuTTMy59YKJ29egw9CEF1qHTylIVkxpsaWhqjesWxMdQRclA6VYEsER2t+Nq2r5sZKjPPz46PLhs0d379y+d+/u6r6sB4VwJ8xpydk/Vw2zkLPbabSsRIQfHR6pZmtvmhrEygG9sdl3wvz2Ky+dnZ6t64EiJbuUMl11BSh5KLexLbFcu/bo4dGxiozeiezbnFjMNXFVBk0p9lESixa0Er2sGmHUBzFetJByJ+Ki0SQbjJSPA/K5TsJ/YgKp1rnR6YdqWpvCi4tzAwYgKd9kyuTPeYPo/NcMeSo6VmuqelnZBfiHsKbg4GGgG7IdpkCTKCYiAqEqv7Ob5PdcKPFxdcFkbZUwEoV0eNcyNf+aycNrVfnizRe2bb/G6uvSbWUY+zCjoDDV1mF2dnZ26fLVR65db0BI8ju1FmyANxt/AQx1+fLVnu5rsAmnX8xZMLP92Gfl9evXn3762aOjY6IeToKz2TpYyO7XuE2wH40Sborl0vWZfICqMrRTAUMHBkTjutZkR4GhPSZJtrpDvziP5eOK1meq3PapVNFWdxPCAOv7Xu70h6cFoBxPYampVdrdEUyBHZxnpYMwKUpUR6tvKtBd1ovG26vvSX1OrczKqqIExjq25fW2npYAKkytU5Ia6pDmzWT49/AbTz31+BOPF2w7O9OVYd2+zs+TJTtGEmRdvnoJQpLNoAcuqKXG3qwJTjVfCAdw84UXsnJdVpkzYQQimTVy5Lh65erVRx5pgFRdnJmRmRJdQeFz9x/c3Z/vH330cQ1hsfI0mqohWFXpvJZ9Cl1liA/uAEESM+XNHLDolChDp0z0ISTRnQrinuNqYvzRkYaQVpDWFchFFxP6kfrEakHMtK4bwymlTZhazBau09A3vglCcniC4UqANAaQFT03q7PHZgPJnvjS3JegmZlp0cWM9KAJuLufPDg5Ob332GM30H2bKiOoHTaCHmQ9uHf3zu07Hna4HubDSqabIHffzs7Wg4NHn7jhLCooobMaqUWdQDFp4TTtKIfZ6YPTl1+5eXh41OuRvp2fb1kHhwfXrz267lYZ2iRFkDuQCIfRyi22sd29c/vBg/tMPv3sq9d1scryRnvMDHCywi4eRp8gE7ppnEVYjY4nPXv9gnp+MAPnhARHP9Xsqr1vm/7mfatjlsSdSCDEm0C070ivoTlFDcZqqEgfykzBRR1tAGj/NR2pfUP9drobLkBLLQDzQA2FQqK8GZkaul8uGqwpDeyq+8Mf/mBmHSzrtccePTw6MrkMSnM9QKNDVAgSde/O7QcnJ+HhS0wkVeUYTk4f3Hjmmd2602tAUcJ2EGRalgLWpVUvgRYC/l966UWCS6yZdX52sq67q9ceOTo8wkMRnypxTObBFalx+/bte3fvesRud8AcY4ynXvUqb4QBYMcioLH/jiiTSbRBWDNzZrZXhzYThvq8nu13TdElVQ8p6BMKE1MOVB/owmOs7c4OBamrmrQaaaGSSOUnq+DkQC22kEmaL1KJ0tuRDGsMy8ys8mJaE60HpvR5B60qtecq/o01SS0yw4OZFR7N7KOxVwIeMLzy0s2z8/N1XYsY5+e7g8Nrjz26xgqQmofdgJyOUDfg3r079x/cr6xlWcLlCePYcl3i8SefpNoxe1hLmWv2WG4wq5KhWySBeZjBH9y7d+vllw8P1jHy0uUrV65dVXqXTm4RjwQK5W5Gp+Hk/unde6/kyN3BqsRs0sY43y2Hjz35OCSsnBRDI2sttxMIo55MAwB7NILWqaoqef6LFRIQGLr1wuQMxZPBYDJ0pr6lphPDtUOFTBBexpjtZXePPvORobu/e3i9m9k/TmSnmSeAlR4LSwE8NctSnYY2SxZv8xJQSW8Okw+PMcNsbkTj0iz256cv3Xx+tzsqh8G9eLqdGXl0dHz90cclty15BWvo0g8YzIt1/87tu/fuRsSy7sz8/PT0iRtPLushbXg6HZ30aG50oqxq6Bm6e8+JV3PoAeCFj33YY3ns8SdiWbUzGpPvp1Jezjax7O/evrU/35Zl9WU1IX99QfvZ2em1a9cuX7lKptZQP1s6Q4azqoYSNY88rFWaXVRq5oW+oayrc/n2RS6Np541mGYBvfmmUIzGNp11Leky1hKuoZSlqh7lvlSlPIii4vTJdImpbcKsKWVM4sSv+9hjZc9Zby8j2TpVA826ohQJAtcoLxV0FJRqk5f9yEc+dLDb2WRAJvOJ820P4urVq5euXJVBgDqgVG27hrbb2J+9dOulsZU5jo6Orz/26GykJN4uOerbxqujRgWObmPdv6URmBwWK3SxmY2EOQJWs41086y6+8qtk/sntiy73TpxJj27CdCR5/vzJx9/Ynd4LH7JJi/cR2PLCWlmmg3Kdg0SHVYliM4HGYp40OUEb02HvmOVh7cANqBYQJdCRVrbzpfFtD2ybQDd7ru5tqcEMY3LdF9JJTS2oKIZgSY20fvfrEhRZ4Lc53MuqRo471kYHKbAWJWiAHQjpoLVzF568YVt2w52ispWUrY+mZuhsvb784jl8SefWJcDtLJFMJsADXNYFe4/uPvyrZeeffbVse5QA05RnqotVdnAYVWjx+2oLlOnpcO7iW1WXZx4AvMVlkAr3r5z+/6Du7A4WHfN67iWg7Rhnb1RAGuMfT1548ll3RVGNG8mjheL+nabegv9KIHRZjCnzDeqBTvvSP1ae1TU+7I7E3YBLzEA0cPPms5T7aLAUj231koJ31D/yKS7oawu8FG3GRROwEsIRNEjijnlZtWfAbOpEVDS2BdpsDCjfpt+K+zy09TNqMq5+8rL9x/cOz46FF/DedB2IWWRiowcY+zH4fHh9Ucfs1gMRGdNKbgVC6JM8LH3rD3dlAaXU1ZHMF1VpKDSmiAt0CYz4IKsoZRMivtxsh6c3r93+04Zl+VQrJwwzQ7x0gtc0GCIAxa57UeOp59+tWoA8RbdH3TKFRVwl+hjAQVFsk+oFIDTej45bZpAxM7pPcBoKQjFGzT0ZOpju0chDbOZeShZ7X7PuybVr9uhMA5PVOuizSqrz4ypX1aEuu6GbmX0hqvMLKGxn0Y3juHLWpl9LF7kcfQFJv1i3D+7e/vWSwcHl6WNaLkxLvgc3ThtZKfZ+f7MBq5cu3b16tVuA6raWakSzdXnOlOaz0ANWLDyQpRr5BRal2pd65kKlWELW+MLLUYdhefnZ6+8/FKO3K2rhbt7jqLpeLSq6iKWmmEn/6EZ6PDz/dmyrI8/eaNBmskVqNLGhIPdMCXPQnch6EkmKlOF2XWGTjmzKtB6WGwvSLDcLH0yMZ38XaRrwnX3EQ/5irlLRX0nGBMebXMwEnK/saVdGvkmxqQV3bMPMpoJS+6H3WnU1mGP6NrWAARsSIni4aen57de+vju4Cg8ikOou+B0nZnEnIBR1YEE5mCdnp4f7JZHHnn04OhoHq41kT0zK2vBkKmXrq7Z2d+7Zlx9GVDl/St5Y8M6v1zUJfa53XvlldOTB77uliUM3RYKPy4getR0YxQ6VbuLEU5bfn52uhzunnzyhpQowhTo7NGmojc1468gxHpytjKq0jQ2oiFajbU00CrTHC3QVZGE9mwBzWJQZ3ijpfp53rK3CdWIXhINYaIpGqj1bo9VB8DMLCvDF6AmM9e4so72QFcOfYO03kdUi85N6RHTzehwxP78/ObN53fLDhGlVALr2+SiodHbUXaRDiqDFRjAto3kWNaDxx57zGKJltNxHn6JQhaXxQHLTAtz9gAYyxxdIkgMyNZgat9CDjgjmbdefDm3s4LtdisVQKVxakU2rNv4X4dTwJV0qaB5ORXJcovt/HzZ7R57/AnAwIde0T6yeHGdWx9ZqmdcUX8EvKpcD4OckGRvAFfEicS1+osxJwRoXfTiatcNKZ/EBTJuDWAWGf3zmOXh7LgR7ai50hWjoDICIEMqh7CZtd17hn2e6FqetV6LDbWs4dv+/OaLL8QSS6wiMFxojosRd7IsNEODbswes95XDZtJx36/Z9Xl48uXrl5ZlkW39STyH+YTg6WMVSB7MlIbP/rfFxsE+g6yCiP9wckDizg4PNRlYgCdRdTFs22MUP03iolE/29zXbdZLNay2+3Pzm698qKK9vYdCLalLvoyowVg0aPS2l6hN1AG8eA1PYMOo5wDVPeIZKboJyRL0mZV/9MHDU3fa81G53eb6b6qQl0corEsqq6k06Fkb5re5IYCM50mf5C5y5k4QwQsO4i7GwNd4EzSlKzXMNz+7PTmCx8/ODhY1530KaYMBq1QmViFUjCFtoNW1lRMN9ugle3WddmtL9++dXZ6CnMTjt8LuOENLRGismNewtnut65jZ3QIVZk198fyxZ688eTIIf2WdBxe/RpVAQr+bJJIK1YEKwW6FcBVySHA4fHh2cn5Sy/d1M9tplsDNRyyU8ha6a0UhJCuxmlcu0GBCpRSD8UGRbq/1G0NN1gH61PpRsLkCflFTJ4a61sIpenx3qijAZkDzW8oA8IbnCIblJXqbTqjtVk5gXOn+bxt1f/0UA3tgcXNYtuPWzdfXNcDSvjq0WYDSfjnQVTZoewWKqXRJg+iRR1qu+EcdfWR65evXjUOM88Lbcd8KHIVFWnVilEJMKJJblSh9Hv1HDySkECJx4eXjg6Ozs73xklGa+v13ELpz2g9ZbVjwSxmJ06ae7IqWWQWjg6PTs9OXrp5szAeskahchCiixHm0evMxLgpdEa9yASGjbPggHnHMwhEBjX3AdCW7yatK9eeOGfWVnBc0LZdiHoh2GPOtciI2UCp8CLY9jwDU8FzHFnVwku0wFPHRAdumheiU/5B4OTswceffz6WJZYF882XmcFTlmGT2kjFg3kEaIQyjfR05Q4mzJNVNf6/pq5tu60jVxaAvUndJd/tZM7/f9hcEseO49iyRG42UOeh0HTmYdaaTJYtkd1ooG6oGq9eviKNZUmiTFRG0zZZLWFC+zJ7G5S3Sl4YjEBrNzNBaS0NMcBx/+p1BFIpSe7CAwqNT+tcVCXU1Wmyze6smtbBLBwFsi4vLk/b6dPHTyVs3FebEXTzeUBKOWdls5WSTVejWc//4j5VgqbKQZ5oZI+e9lNK0z6/EGINyqghUkCZ8JhzjLPAST104oeZOib9LCI35l+p6rAEQn+7l5kwerHnmm5o5/HH8PT1ry+fP+32ayy7bN1vu7B1VNUnCUKRkcn0/te5aVKwVp8LMzts2+3dnbS2evDkp4W7dqfB+nCIc6cUfpRYsD9S636hkRJYC//JIpBh9urN+207ar9MsGt2gKFpjQx3Xyd+R2FtiK6T5tqE2T0BWLW7vCjmHx9/27buZ3uJbE8b3hH6VAiHaWeXsjMgPssaZaCJ+peLOE06awdnHnt6HwhJkX526f2+FyBut7EouLU7ml1g3aIKih4rkMjU4Fpo8ZKOcu/ikVOruiE/d4smrDFIfv38+ev3b/vd1dLS1OpdPz6J8n8ctFiQxrmhtFdZrOrcq1XsMDuNsd8td3cvIOBFsWu6fzm6wKpftk4l0c8u5dqAtZNOdlYKFeluUvVOwAx3y3p/93A4POtZrBqcjYzmQz3DesHabqhREUUW3IUz+YR1mWO3rmR++uN/j4/f9ItLgeDFM93h4iitkV1QvqmzgI1sDo+SW3ZLJMWPsYmtn8XeXQsjBY+rfxCeITy3y4mhIzp7yXtJGdi3GsZwqTK1qFhfiXeegX53VSU3Z8oOqNawMvPTH789H4/7i6sJJVjHGBFQUDRtDAk8C7DsZAp1ITA3h2exvJOaARZHbuPVq/cwgo21eCMtcDhcq8yZqYUlIUPdRJ+ywUoArYnynoA0JzZUNxNfKfx829b9TpidpOFwz0y3kGjEfb7cGpF0yWXlVY3vM9qQBKu203Z5cfHw8jXN3RL/UHByTjjdh6nolVJhDApZaHWBfmiV5qTPYVslf85zk2Bsv5VbFFI/1AwCmIM2nOo4m1NB61/UhNQ5ENwV4GxnLMsgGKCxNenIzAjfnp/+/Pqnwfa7tWTVddkzq41JYp9awdRCPdhcVI9mxydGoruLMH8+PN3f39/ePlA7z+WPmIPohPtSsIcBWfQweYgtx8nmRGAezALJ0LAnmJmdF9nDpzBg/u+3/yyIWBfJcEDA6B42GxCh2N3tu00wCecP+h9ZUihqCQPzdHLD1c3d3d092gQpPcl5x0+jPIAKqbzx1hdRrYL2mU5nA2HIcrf5DvdmrS7BzS+KNlHLZ/14TrmE0ehirWho2TAVAmrx82A1DEkq2VWKi7PdoR9C/vH54zgelt3F4q6aKaR+fkrNIIGoYkRUUrZe0WXMpNPky1OD3uNlHI6HdVnevP0gMFT/5eFCGfqMOtpdEYFKXaLOQ9BDolm2LHVIWVL14tz8oJHAKV+3OG3Hj7//fnmxp7scOKaY0qkK10vRoQCaf4jZt59jCfoKFVOUr5vXqON2vNrvHt6+c1ohJ2PWrWWh3EgL6x1OJBiyzjuqyjyQpS+9tAxLOgSVe5RZUOYJ9trGVkPJyVXd7/Y5HMlFu+HOiha1Aj5vWlo7zrx+LgAuwaBWbbwy2vN2+Pr5M5nL/sJ/wrTNyGqRqvVHwrPFRB2Ytl1MRb1cB7BmSuDm4zS20+nDr/9aIkqB0JMpc4RuQSvURFkrwBWYrVS5WRv29GmYHOWC9UhLkGUsU3apKiwJ1rLbPzy8eHp+FiytL8rd5QWI0M2P6odCPhIZihwsgfXdeZXcD21F9iV2y+LrakAL+eewQzQ4JUiMU0vSqlXNyAYIq4a3qEdTcxc6GpxMub71WrFS0kgElRglXaaQZIb1Y1vF0uL2QHc/DhChHcXKmpcBXoMErKxUyWjfHr99/O2/sazr7rIPsSZZTgSlnMoq8zY+CHyts5NIff1U47vgIYLwqjodt7fv3i4R8mtbC3vp7sSAjWbF+gksaBGCElb0B1YLLjXXeNeXaV0zDRyGEoaEhsT0+13d3t3c3x8Pz1Q2V3XrYd1M9CAEdHz6IMPeAAAah0lEQVSCLlL1ohEnWF4CbWLpLxjgaTsC8fDilehSb5q+54UWE0y4GpR9AposaTLhooSPQ885zJv5I9V7i4Vio0s91Iq2FY6lHVRWUppJyduSMj/nWLVIToCPKgJT41sRSEUVtX7+dn8TvhN9BOVQmfUEQhoNQYdXsVgKi86kTILd/FeDc2ohzYwiKSqPz8f7l6/2+0uQBe2+VdiBKv+0qxsyczrVBBH5pD5MiIO0lGVs97XUtqTBo8WD4kjZ3W2JWzA+3L9c9/vt+UjSPBRSI3lCt4DToXZ+91Qb1U6YdmCB2rBBi0pUnl68foABqOaGwseWh8PRFZpvU01QRNNL060Jsxke1LNMzRajCJRPtkA/WiO+dJKo5uOt6UaVyV7BTSNnklfnv1gfJRLKdFGwu8Ebjj8/iETmydZ4+eplji0ru6PBeaKRE3wBkFno3YAGYygRXdzKIg0qACKZo2JZwDoet/3V5c3dbREl7bXREQ2ikVARY2UxrB3pegjmV2PUFtNCWuifGehhs1s2PX6zY7PJnZmH1GeZZnz39kOssZ0OmoBnz6cguCIYvhq8yxuJ9h21i7GyAT0UAhhj219dr+tesGmXUOD747fPn37/668vmQOI0FPcyzcaX7SJxHc2INnhYGZsF4+6OvWuBZzh+wZkLHTI4O69q9hKIXlmtGn4bLVH6XHlrEmsUe79oh6O26gxW3qEG5jXlzfLsmMOeEuDZZzs7oFFcI1AQEYLwFgc4plZHF3qCCuHhxdzO2yx+us3r0mSm1oJr9DIzQCbaQCJgM/boZGfc6rTg5uw1vxDuVDFQrI65tqLVFZj8/yKXsJ8GmkA3r3/gIqxDTMzX1RWrGXtAEvBHpz4i/r/6HFBGqKC28iTG16+eK1PoYhiAlG5HZ+P+4uL4+Hw+eMff/31Z+YgJalxdiXrlBwxFU47z4E1OjJHY6BUhGM0QwrD3Hcxq5pX+3P1PbPvijpdPaScGQ76jxbB+OKkn47bn58+/fHxv3//+Qlsb3ppm5LVw4uXVWajpFKxQnopNsh6Y9QZ6ujBOnwRMKJZD2bhCoblOJW5vX33f8KXfKKivbnJ4Nl2HgPCYy6DKUAbzZrb10G0yiHz0Xw8+xsTHQMX60abmj5HCkLqZQLuPROU/fbbf9x83e362rQGZY73KEMU01sDcbZGdLY0wrbn59vb25v7hyYhyGh54KdRY1kXdVA5Tizudrvr6+vLy+vz3SdbGAijsDI4jGHOrPSzeEfua/YyYoMBxV4UYQ0qtODd0foQ+dNaXid1rd42oRPqQb4/fn368YMjLcIDeRovX765uLyiaYlmGheE//nnp+Ph6eLiKkuRB5rPVXS8Mqc8IFA5FQZWrKrypvXLbRljy6oPHz7AA4qDgafwtValCIhXdphLn1+cZuhG2qUuVkhXnmY/nIbIPHmEYVocoMD+tiDLXSi1J85WuUZZjKz//vvfse6WdRE32jS1JoKkqVzWfHTE6Eyx3RgnAu/f/QrjGBnRANnx+fjnX39crBdSdniEOfKUing1j+vru4uriyVWO7uv2GFYnXvQef8EzhIM/dyG5BTYzlaKVkatpjKo80+FtlRlmMNcznFhE0Vux+OPx8dtOxS4rqt8G27L4EDm27cfzD05HF6Vviwc+fH3//m6RoR14B1BkwpQWWQ9DpLu0UCvlfui0reYHUZWHt+++WVd96YkiUa7popV/tYBMyAafWfSFiOAKpMflF7tfqNVbk3/waVVUIvgs19V12KGZJm73GZ9/Yze6fmCg1HF3/73n4hV8a6CGdSHo+t4SR1vM9uBcyvoadtevXq9v7wqJlquE4B9/OMjbHovfYIO/X161qiRo3K37nYX+8uLy3W3FxYk5A3U2Bl0cWfqqualR3Pu/esguilsd47456XRB0DdsaMqcTz8+PH0dDyeYHQrW/ZLuBUkgzYYEIfD9/u7+9v7Bw1TLpLL8O3rXz8eH/fa96rnh+Wx6EuVlp9FDxddZWacsnB3G2OMkW/fvFv3e7Jo5dVRZXp81PhnaTtxd1Y9FDomD6e/vLndImyMk4uN5Vxba4aChSOTHTmjJhRtJSkCZR4Ny0tr5QGmeZxO49PH32zxddn1wzefH5zBs2ppoNHUzo8xFo/X796jEu1hcjN/fvzx5e+vu3W1ifcCXT47McHMYFWjiplZI2O3W3fLfre7vLgMXztkYb6D+kk4WVvRoaCrzHRbMCvXRPm6LakcI8fT048cp20bBLSGEzD3CNPyt/nLGgJRmcfT9v79L0rs0myuhXv/+fe/d8u6xpKoKjm74bLlNrzSu8adxTCWQPWq4mk7vXv/Yd3t2rtsU3MEUJPYlK3D/bzFur1CxE/qqVio8OjixByjagmXmG8+IQogoOCcCOsxV5cl2/43McpoVBVS4Xht449PH83hy9riGfXcRISj9YpEWixRTKMdT8/v3nxY1p3W/NE0ndTvv/3mEUuEMGh1l5p3oFaPTtLDG+wEWRyZVRlwOpZYwm2/v7rY7+gWHi1sVMfgRLZkUIWg6LRkjiLHKbfTIU85KiuzshWP5hZLiPfXrvuafYuaEDiYCEeZ5Rhh/vrde3R9gBcs4vHx25+f/7y8uBLESYmTAZvdtvYrSWuIvjcoju00Pnz4EOvOOEiTrN8gsT+89yxIfkJEP+5ZOi5an9TUTVLrNEsjhlUOBSuYCQ7rUdMAmTJrZC+qQBvf9aGbDnmTOGiDXPfsNur0+eMfOWp/tWfpfEsIEe5sh0N3HdxO4+Li8uHFC1ANKUmPsC9fvjwdHi/WizkST1bHUcmfB1LPZQOxIocYESztM6gu/ZXKn1hXz6LH8ubtO2cSTqZ51MiPv/9GpWcD6D7fWxeweFVFLLPapq5KY70AtGqk9ElFcejfDLPD9vzq1bvdxWWv/lJkGOyP3/5bhnXZVQ+anUJRM+0UDYbRaQx7fn5eLN7/8otrlcakPqb4bFpqTPC8iaARN1o6OBTGpqcaUBs5hSNusGBIGMLsXRkd52QN8KWIOXaOO6Ch1PvTAGCO4GS2WKwldm/e/RprPD8fVMu982alyBKg6DQ/jQLs4cXLlqZUmVksdhqnp6fH/bpvCE2ug/iJgsnw3ycCQBVYSgwNM6bAEl+WZV3Wdb/uLvexj91upQeBHBuI8mZfRYInGe7Lxbquy7rbrbvdsluX3d4Wxz+5Jyb4c4xGVT+AKaKUSZh7zW9nXXZ///3VrNyjDXpmAF6+eTtOp8ry3m6o3UQwSEDaY5yZF+z56Wn1eP+vX92jaScY4Jaj/dGYRVcXhLB+Cs9PLBpk04cmUSw6oMMMrkyYqi4P6vnaLQZSIXgeZ6XGzBvRiGgmlWtRsg5hwDqCEfbuwy83t3fPh6Ow+CLdPNXXm8GIqpHj/u6u517aefHMX1++7Na18Rk9/MWae9P7VDZbjFENL+rPSaS2pclBp9nMaGFuzsXM3ZZ1p9DfErtOGrCuYW7RLnsI8WClkEizVZoJzI6sP3UBNs2IEVomxIr2R6bBcoxvf3899yAyk6/Lbr+/GHkEYAMOD1PfKtDY+syR2/FweXn1/td/ySM0P3vApHSWpfaMuMxp7qcXvjqWkpIamNAliZY0ljfw2hOEJemS8BjMNIpzwCQLAQhW0qdOqAY7SkaOkU4bYCVYzJQd++Hhxf3d3XbYjtsWFlBmaZv9fNTYr7urm9v2IxiwELTn4/PpdHBvdqGdLMKNepVp9zGQeEvUQ2cx0BGZlVZVYrHUOBd7HYE5rcaA9fCiUO1mD731PtJyU3owhfsi0VLGantSi26KDRnBzOESSrSxFDRYeMSPb99lNZCoVef41evXI1lJWxXjLp5O8QNULTk8P9883L15885QmcMaf21OxRSxaZSpCQ3ktL6xEXL2uhAXFoUW3gAiNdTv9KJFEUrS9kNwJLMMlBWI+hMdhmjijzQEJTXX8yVsvD877RXTMjve3d+/f/8B4PF4bBVUi5VqjPHw8iWaHSyyHAuNXz5/XpaV9IKWJdk0Ter6mZ6y1jUp25x1BmpAevSa2Y5EgAZ3awuaqYQ2De1yRdJyiqX0Ts5HgQ3XAGSem0U26ayyb32wpMOxsNZEkw54LYvT4q+/vihdycWQVYWvDw8Px8OTuGyXvLCTJHDajqfj8eXr1w+3L0QEu8n/Sae4W71Wal5pmI5o+YXIYjFnd92hh+ZmSI0A/YuoBnpzJ6VOFDLtezTEaXBymDnpimuKOSQgOF8O6KkAFPQtzU3fC/0csdt9+OX/dvvd8/FQhJmXcTseH+5erOsKZt8hoMy+f/tmZu5LH65lifDi/CP1eJulOEuaLSHCyidjoIvXqNbsOzLH9MzRLVC9a6B5PoLQBQIrjWjdMzRSt+a5zXu0McPsNdLp4IvkBNlZgE32SzOP3S4Oz0+VJ0dI8KZbeXdztyy9n7mswh2OLJ6OB3O8+/Dr9fUN50Zya42i7sWJlpyhnV0xu6PtUdLlpLJQSGA2Wyj7k5L6HXRF6E3tt3c5DnlFKrv0GU3eaJSkX0nZnwxwtToGY4HlDrfFgPIZt6BCM0jWMMObN+9ePNxvx+PplEyzJW5vbwGMPqT0WOs0vn/7vqw7mLmQjSx1mrrMor10KXQToVVL0+Xf/CiBE5qua7O37lHpk1J3Y640H5ny6HqchLyHT5G0z79C276Z7YdwHRWbOv5W5UiPLwxXX5tJdOMe8eXzn5g9vFVKyPTw8HJkqXAXa2y5PR+uH168f/9ruMt+0ze/E00E2ixui56cah1vu8ALZSZZN+XQQijOxEiVETe3uXul0Xyvc1Rzf4Xq9GNyC+htp6rTNdVLBKo8IDEqzIBRYPU0p7+xrO1r6msLltc3dx/e/+Kox8e/X714LUhTrZMyHL5+/WJWoXKDHsWhZIwGlA201EVwPVV1rgWZ3Ul4GJYWt+hrknVzZBaqQ/dtQiHm0mA4nMWsDI/Q+2MChKb9Snu8oO6RPeCFQZ0cExBiofcaora8m2hfYtm27en5WflIEH9J319er0uM0yD49PS8rOuv//rl7vqezcYVFedLsA8YzYJgpnQ9kp2SLJ9x6ziLNUhNlVKyTCK7WOoYZ/jEmTqCXmajEEkytdOJ8jqa0TyZCDObu4vmZKdKrK05pmI+uaiGOQyQ1Kdg5LLG63fvX758td/toYE0C0C4HZ6ej9thWXdiSMmiKfqjKbmc5d/7cOov0d9kc0UsSNRcOAhBEOxDG7HzyatochBuJKSzYysNIzM5vOEP72A56x6sgQDMCLdpRTJf0BfcCasiC0EjzMpZA2ER8f37V7H/Jjkk0mEPDy8Ph8fj4fDmzdvXb9+6r6Ylzzb1RSLcLVA9cEgvo1c5q2gufQPktgoxYVC1Q49I56/NiapOagQNRWpvU8GAwXSglZpUmF8zVdMJCSFpLtvx9LGXpo6psevRS74ImZxFAxKMgvbv+v3dC2UERrOJTvL716/hoT2NlLa68WQ7b5yiuEOCWS4RpnmNMtd8600BdVYaGhwBZCAppjeL27i2dmOgw4atikuLiGFmslcYCtrQ0JH4VFhh6q4qJKlgjix2GKdNOkyhAD2K17Isx+14ePxxdXNdreh2INfd/u27Xy8u9hErqgZLnTPA9poDrahWk6hPhh2r79EM/jzW9DSiKgJTtWoWDHZoHoEe0ro78taFEPrJAwgF8sc0S7NNJJyrpyR66A0lHU6iUJxCoxihk5g5WuJQcsA4UGK/ZPFTjJfI1zL7/vffo7js9jqtQGMq0ii4a5mjvkYjaOHJiu7e2qs4OKQZPAsdRGxktXasgQW0wgY//3E7D8yQkvRZL7uWAdMsG9Qx65dLpDPLNKyvktmdBcCAwIwp3qRbUTCIf3v8Tpp5CDMDzVjXN9cRCyvhDJ+gEQmj9nnSjKY1FooL8A60MKvKSbo2kVRGmltmzwMNRfBnYfem/+GCdPQRmGJdxH6nZkpJG1QR+pD3jMr29cxXRfUKDjZoLbho4rUSN5ZUi5zELeaA0JUZxI+nH9vYcpzk+FPzBiOydxG4RX+9aiAKYV6G1BIgFT2GtzKfbm0E6D5QflJAP0JnwzVNZLCsJivYv2PHEECkfNGYHfmmbHCZeKnYKM1sbQXSQ0TMIbWVR0UjHRbLwhrf//qCnsVND2IVxzgRrETRjTFdltNnxiZCBf7MMMpildEl8AHLFG3MfmHVy8HOu9U6ykpXDPOt0f8hIwphCycNpdG/uWx9mNLYa0xH20PpUizYFJ/y3JA2yagOxohQUwrRrilPm7lZyAZjwPsPH169enMap+PxmDm8zGJ1c3OHFd2oaEtDmXXqQ9+6Fr11omerdY2srMoh8723maoaxZygdttmRCujKFOIu8f0hshCZaC5ZZ2tEyKP6QihVEnqO4OeGdFYKlCN9FD9pwHbNp63Zz3hhM1WDksEoKypLNE6mlLmvV6i9S591VWgW6GrJ6mEvHRB0EdRk+Ms/FO8g34w+nouMESZTAcan3XQ0epjO/+PlijoVorLSeEPBRKYgQ+9N+4sD5jvp7rZLvSENB1F0CnBjvnt7c311eXTjx9///33Cdt+tzOLsh42S49k9zEOo2s5ZIRTLIvgJBfav3Tnr6VVUvzoKucMPpPAvqeDZrTRSlIB+jHHLszphlrx2G1HhwuyoMgfEC0JcelnhCnRwqu4HbccY7/bvX/zfn+5/+ndEAxu/af2owUUyj3mdCAYoMxDkoM+YXoXNTALEfDWW3Y7aYSHWg23lhBYkeGiVPutYS06cc11Uk4HAQoKLuoUHNUjs0jSihZVRUSICjMPZa/oYPaxVHqhk2UKlOpmFjC26UBTfjuXFN8XcXN7e3l98/j49fu376TvL1bzRROvSwmizJXzpDGVd5IKmh7PONu6WrQmQ6A3+ZQzNKJnFrL7TFqYoWgBU4W0kA5Q/aKCSGcd7FdDt8vZafboGEhWhFXxVHU6bVZjF/sXr19fXt+iUMLPGs+XgLJQ7ZkkSksfOJ9XAE7XXlEPI3q7fGPiRaKIMAdHsbeIddXW0gV3aFlwCC9ml2v1aGa2qL/R1yS8SV/YKK7iRXTvVZC9glFCYzo6oLuwTLgXIHd6kd3KV3aQPyZ/CrqSraTbU23XqGs+e0+Pu/uXNze3h8Ph+7fH7fi0RKzrCsLNE+kmQTVdHkN9m9P7YyHSk0WG2anK04kSSk/3mv2U6DdRxp1nIKRZsiHVSoZEpJjko7V6nOh0Fg325fLhV6nEF2w7nU6n4bCb66ub2zvf7YTQyjzdArBzK0tTfIW6JIehOjIRzYmUW2hvFjqFqJ04FkZG6/kMBlfBbOMrnCEJNqJnXswlLAml9rMW6Exz9srQVVHM6TSUTiLM0mEJ1y0F+7KSymI3kNU7WND23nAXpdP9BcgoUFo/I8s9tAOyJPn9h2YibHd1vV5f3z0+fv/x+GM7HpPYratLMdxtADurSv2xBSuFWjEVGCsGKM2W/u16aQzMyspLvgrvY1Qor0WDDFvdkt0Nt7DOUlHkfQKjww0McCywgueWp3yuGruLi1cvX15d3wqfULcP5aM6aiicJwlKQNZRiWUYxWBDDQqFaLNreXhfONBlk9SkaSqypfn4p4ZRoFNb9mb6OVtWaAUP5eVimeuIpcZSz8i2wIre68HAyDT3VH6jTocOmzcq7vp3MAV3WRD7KaF4P72oore/VK23TIFqupKE+5qV7mBt4ELDzc3t9c3N6TSevv99OBzzdPLw8HB3mZhF5NeU0STp2eLTcnMLQ1jj1eqqSy9xeckjJp4vi0sT5i3eIarkXWNZ+84NCaxmOVELFV0iTzlyFGu/rvf399cX1xbtKjMDa+hRSkncstBNkPW4WsprkMBQSeUV6Jh8d0fqHAtIrgJ619XUfKhHyzK3lNW2tz9ADSSGdjCRRIUyNDwKKdh3CZOXto1p6M7v7HqZ7woBD/jUkbspgEjQp6uhS7pJWlhZ8GgYH0ZY6GOUuksuMnZXXmEhZtR65eCAwRgwS1JCLhh2y7K+fPVAbtv2+Pj9eDiOcWLCFo+IJcyFk7BCmsnqmRnuSlU1h1RN7GJV3dVYw5UgyioQVQmYWacimMyQXkJdfPHewepLjlMlTzXCzZe4u767vr6OZRVjQKMxob+qGnWIM5jaojkpuukROU7/iL6DtYBAwjhaRPu9ihYRFAelX2YaelnuAF2yer00pvMg2YyekvSft4NtfFn0wE+M1wvZrLDE/QKrQUz3tCZMNKyjGiqwYphFslBw4WOQ/bBJzwkRm8Eqh7vWOTIQNAOyClHoK6gpC1Byho6f1PBlttvvX+4vCGyHH8fn43baxjg9n0q0kJuJamSvZ0BVufXTVciwxZHSfbGdEYDWzxtXW7qIscdpoR++CP6lsbIk36wqRvj11fVuv+4ur84LZgTGyKqgGih8n658pEF3p9nctW1t0SiHmzuZVpCtAfrMOumsdAYk68k6Z1TT1Sr1lwEEiNRNrSlcMlZTzr1et9PMON3ei8Ztbd0ih75cKX3ks2rpuEYqp1p4GEyZ7xEUsMPAGTQyO5sp9E0IVKsplveIxrwpKqYxDVZqo5gEKXpwCiY5sfDOXmhI8/DdxfXu4poAOA7Px3HcDsfjyJNkcB6Ogrn5ElJ+N96otaRzCy9p0zKYZpGooGcRTKNnZcn1pq8XZouvscTFerm73O2WiLVJjka3JicIN2pUVQ0Q0lLpcAvtre2IsCqLQBZhiLmkw1QZre2iUDwMqrK/SD20ijSRxMeMlR1/mKBTOcDe2rc5KIAI1cOCgal0BkPl4oZSxyaBrulMNUoiwE5jKmFKeJv+ZsCdSDSNSxIm049unLvPMAMRCk066adluTAfLQHQOC27Q7/tsM6kIzB1Aw19wB0jh5Lywo0Wl1fXdnl1C60fRebIMY7bBtZ2GqftBIPRJVfZttrtVzZW1rNFFU/HQyyRLehyFlb3dRfrso81lnW3LIuYYf0gamMts2LBaC2NEuIlLakyIV1u8ymURF7mvRYpTmQOHYBr3uEbempVnsOlGWejfzk18P2BtBNMhIReZPXMVqyfeTW664ChCm6tO3QW3P8fcgzK16kOOtUAAAAASUVORK5CYII="
    },
    {
        LI:"data:image/png;base64,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"
    },
    {
        LI:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALAAAACzCAIAAACmQQGnAAAAAXNSR0IArs4c6QAAAANzQklUCAgI2+FP4AAAIABJREFUeJxUvWmsZel1HbbW3ufeN9RcXT1UV7O7OUiRrHAQaUkUYUkWrQGSIssOogxIEFj5pSSCgESWISOJAMeZECc2EsOZrNgZAAWIgwjQYMmyLFIyJVGwSVMDaZEim+zu6u6q6pqr3nTv2Xvlx/rOK4YEyO5337v3nPN9395rr7X2vtQ8gxAkgJFQqxURgigUOhAERFAQKQEQAUBUNDqCEhsdEeiWEAyFJISoAGZpAruBiVSjKZChbgYlAmh0gARFQSKIABqC1IxEVyOCFAQAUDMC4AyxQRAhFRhR1REUlEQR0c1IMiCBkEgKDaiRBAgIIBogAbUUkZIAkgJ8ryWATHRBECBURLbGGwQpNUSRQUJdUpANBtBSkqCqESl0VFWkgABABlBESCTREP0Z4LgICRJIAiJDEig2EegWQQbBVgG+zyDGW/hPMyCQkAB4KUFJkVD79xoMkuyaCQKoniMmqSJCJATiqy5O9L4hAATo58fqjiBJCQRKHQCYksIPXgIAQhKZUItkAwm1XyLAAID20+/2UjQZQoeWD2sg2GoG0CCjJAItIQQxEF1zTpNv3g+6kKEGo6oPZxxtT24enTzqPNxUia8/PPyWZ86+78q5oqJLJBnbzcm8OZnWu5Cm1dStXIUvFAj4lhoEmwUsNy8IogRQEVi2EkQRUAMgApRASn4OTKLUIfiOx8cEoIZIqJ88eAYBqEscR5IAva27BF+SAuOY+egs1yAAEaGW35cKoL2YyxtqGtuDipwgkNHyNg0vJESQ3iHsGhuMgZZf8dOgIHXQR7EJSiUwQIClDm8wnzpABZIgu2uJQNGQf+jHBZDykx0HaGxMBEixKJQ6OElzMMCYYgUUCzN4b3Py2qPjzz3uzz84fvXBfKv44KTvn2xXaEw5aUr2p248/GsfwvueOdeSjxVCh4dHt27c2N3foyRBUEwxxYqBnZ31ar3OXK/W6yQDIYpIsaCxQBgBd1yr6PBKBCGfbghFpAC24yCCAapFqBrjjI+giRFNuxsRiPBfkWDQUVmMgFqCgAjvo3H8IxBAd0S2FCPQEGoRQIgACpHdmEQxIhTLvkdIHSPwsCg2FUKBUAZbPhMC4DAmoBoZABnRamjEMsYS9xCCQmrId+4YiBGZoebYMupkNseL8vs4drOavlRIUIuJFVZoiZzJxyebP364/fStw9++e/CV47jx+OhIuZribOrCNJ1Z4+qZeOHczi6giL1V7EAHOv+ucxPQy0MKADur1XpntbO70xK6A6iGuufu7Xbb8yMQkbEKxmpnZ3+9uz4zrVakDzCB9pu1b3eEyCYmR8pGR0wgHPDjSXARBcTYDIA4juhIdoHonslARnq92jstoZJPXACS4CcdFAqgCKajvjMxMjrJbj9mMlQdiSkwMovUQArVfvwtjqxLRrcYwpKDVD0SLiAixCW7dxOQlozs/TUi+rJ/JEMHNhAOOM1JLIrICOfAJqUmKTIgKma1fwtEkCGi4/52/ie3H//mzcefvrt59WC7aSCmi3t5MeKbnjo3rbQHliCiRLRmKiCxNzP8FDeOeF0CwQpM1RId4yuYYGRK0tQpEis48XXX5vjk+Ojoge4xcnd/b3dnZ293L9draIn9gNgtZLC7GY6AxmpwFm2A8ukHSbUwoqREqhs+8wMiUKS6gBAlyMd/SWgCQwIjJKK7A8lUl+RcLzEJqR176VDcoiAqpuYIc4gAOpTeRQgsOaxlZBQRLREtBZ20w4eYJDTw3oAfGhmtm/CLBLhsDJ3m3aZC4ykM4MBwHgm/VULVERCmBJhi1/zm4fbjNw5/6a37n7y7mefpwl4+td5596Xds4k1FI0t5yBU+ZBzKINQFzLQOmlFIAStOde20YBRDds7PsCm0AM1n6KGnAChDdCQOU2T163QPDk4Ojo4vKO7uzvr3d29s2fPTtMaQSJCJSlAFOSUKuebkRrlcwKiGxkGRhmp7giq1UJEqqozg6BPilAO1QPtRTiH5sj2I0FLC/iQCLbAAmLuyvDbkBQRlKYAqhRxWkZ0g8GEGiBIZI7PawBCMwKSMHCGgbUkEgS7mjGuZsFVHIkjWoIaAXX6EhWigqERMhtIqhtkQ9FCQMhoIKeuGxv94usPfv7Vgz862Ep8Znf6wMVz53eQEMC5MM99zGh2IACu0BClGZGRFNBkgugZygYxIbyHnfmJ8YTJgO+UHUJB5FwVYrOJCLC7DfjIYGDa2YWknnvuBw8ePXz4IHO1u7974cKlKRPxBKOTTUIIqU+rm2AQUBItJNBeDorQguKRkZBaSHYtHwxIiiAoGWeJ9EfRgFxsiAnVUmEEgIx0imcBMe56kuSILKd8ZaAln0xIHTBiJcZ2VYuuLUdEcMwwhmpmuKYYoGSp80ZcA5QAMnq8S0Cq7owlLIgVpLRBT4hkADqZ+Ws3Hv4fX3rwmbvHR+TVM+sPXN4/m4oVtyfzPHMjdGRyG1MCPTHQ6JrnYIKIVKtJUgyqO5EMUWJpCgmGf4oB4kgKxLYqGAYXPodMplJQaSYS9E5ybpgbiClCmevuVnc/fnzw+NHBtMpz586ePXshAhRaQZcREYKgIg0Dk3Dp1sEcK1dzRKjZagx87yJZrY6YTmGZ5BwLLNicoqgWvFvI7O4B7Iw3q0kiHV+A1jR2rCIAKp2ogObI+5AW8BgLDJCCGLtC4yfd3lhUdzBdQ5KQRvSo7kAworsJOPeNcl8qQxbF6aqsI1h4G/0zf3D75958cP3R9uUL595/5czZmINZ0HGx5yKcrbcJaM5iEVnRiFhx2i6l7MiDEowUXPZ2UKz268a2QIwtrtbYTmBDUI9I1ktl7suXAiFUYHJulomW4BSrKSdCc893b9+9f/fB2bPnLl44x2nl9NqoQEgBsuV7EchkdjdEYWamahAdRhbdzUw6UaMHAmhERlBCw6Wnc7MQ6QSuBhAuYWmugbEAUIhKUBMYUJOBVmMAShZndhDBEBCEvElcl4XaWwItUqigY1qAihFFUVBq7FwzRwuihJpkS2wgI8hTzAOF91O8cXTyX/+z2z93exut95zZ/c7n984l58YW07ZUaAaoIBqJ0I6gnCCE2OgVVSJTbIGMCKArTHyhyShgEpiUSLRxtZ5U2KPowwAW0kijiExoICOiRf9fGEmbgIlAQ6h5BqaIjNXu3krS48cPHz2+v17tPXXlqfV6J5nyO6AYE0H1DEQLMV4KQkhjfmKeGZkRQtPnxlANGjWtC7oUl0Kwvc4QCmS71tcojWspfHynDWHSADNjx2NZ1ZAi8kno74VpMQSC1BEBtgY4NjYVnFIYiKbrSBGAC1bHMEaEj1JQwFwkFWInAsBrh/Nf+8M7v/Tqw/3d/JOXds4lA0LrUNi0pqCS1QrGir0RZJ7GpGEQxWS3UOqJU6moORQlKlEtRHRrAhRA9V4CQkkmQuni3Xu4IRYjuyXNE6dGdVWQciApTZEtLLyVzF1WdUZ2KqWWGFKDkXt7e3PP283mzTde393bv3Tp0s7uXvi0SqIi0kzb6dJJTYa6iBh4zrVom0wSBvgj2qyfoSAQWgI6SSBM0HoFBSkiuwsMxwnjjQljw0A+3Tr9h5Bx5aBLSpSQLkWDoa5RVADdDZBxuiZw5hHEYPq+TJmIcuECuMDsaqYzULzy6PBnPn/n7715sNqZvvnq/sXkpnSsChiGcQpfBBqSuiJRvVo57okZXUKgNZ7TrAo2kDMHo5bkjCbCUJmBIsBIqlsxKF4i6NAaoqQExewoLryJKzBDHDVIjlRNp9iYUSxmBqi5zXpVlcjYXe80VvNmc/PNt6ad9YXzF/bPnTH/BoQUCid/Y7ZB+EiSkJGk19Xcvi8oKBaQgYa3xLLWZpobzFHhecXb0Y/RrcjAwopPkEx9xCh8mm06Ib0DGa1yijWGosxSMIwal9AlIloDOgxGatD+MbZOq09pT7g6bQZZ3cGq+HP/8IvXj9Y/+J4LK6K6Hs8OXNGjGoGARmvunMIUa4TUpnvYbKgj0jV9BF0iBgCg2HCFIJY0kzuUcqluVYyEBk1rWq4HP4RxaNqsciikNn5eeOSgE46p6QD8P92CMNH1ITPCWkhkrHd2BDx69IjdZ86daYpKP1+1BASjQQwwZ8ZGQhkDLYSX8zer5zAryBQgKY1YW2QqW4qxi0vGwq5OmDpdJ4lhJj58gJ7g7RRbapa6ERFtbrGgouuCcp3A7pZUbHQ3pTDClLcSyMGd+eWFumZ3wDRdh3KaGTvZf/vb3nl+v04286b0WGGyb5KpcLDQNSdS6XREY0Q1goikGhERPU4M4SVzhSM2G4RCjaYpNdW2B1o2QjOXOyhUadHxRhQQ27uaZESXUAIYEU7i/s2MmHvuLgVFIVQ4fVelqDTd3ACm1eqZa9caRKHVo1CwOsGGimjrZaQiA81uxbheQ7oULMj5ThrsiBwnlT4xbHVXGYrIBb5g7r3lzdChDhhvIDRwC2SuwrgqYOnPKKnZrVmtwbiJREQATCUZYJqqMgHuhEb1TCoiEqC6TMtkRQPqDm1aoZpV3/Ls2T/74vl/eu9oDzK6SaLBML8aShLYJhetRghhCiz8GCA2BHYEUepGZmqp2Ey2SoiGIuce+txpHRJoLTmjFRHRpQiKbAnRPjIqqR37IoC5C6APsYC5i8xpmlQa4kVE0FfAhlgjtx4dHl68cCERUAcVSA6FJ6KcfygE1YOAcqonCdftQKspNbo6gk1aaaTaYA6AQporiMmSG0kwYqisIvJUCBsyNwM9Y6xySIwg5WBlqWUpcKWIGJS9oalkVk/dgFQSOhkjfbliHgK6KEBZpELbE/70792oRhaynNNSxH/5/hdWjdeOaiKlAqLNcpoNFqQk2TFWDuTcArzbZLSHQhVEboW5mwhEWxVBMhMMUm1xaG1WDKaATFCBLKEgTTmCaA6CKBjhcpNBlQQmw7ms25UzIjhXDRmHGKrTwFHjP9vNhowLFy+CgKIxqgAQt2/d7mwyFYQFILO87ahPaR6lcpBeL8MfqyEMkdaSq2YUGmydZnfBQnc3kEP8DELs7oEDZcEJVBeiu1sh8pTD872YFxu6HYS2gD100SDIgAlZ1FJtGn8z0JoDSK0R//z24z/9K1/8q79359VHJ5waUzPDFNuZnf7JDzz9z++d7CZmug4Oc0OSlF4rTqcEhBQKhNMUZ7CgiCRR0jQypWm7AKXuUYdDDQqcxaG1abARLa+pKToORQZsSF10XYUcHMco2/w3QX86nmRfCGZ/AdTsuEJA87y9/PRTZKgFVEBQkHx47/69B7ffeOONzcnxsDqIzmbMOL1YQz4BaEM8tMSIBlC2g5BARCCYySCqisGhW8DhvOxiCWMUIMw0IASr+wG2IoJCO7oSYI5oYPqrIRATwwyu5TKhJaDbzN2wljhYq2qWMIlV81/59PXv/PjN3l1//dNn/5PP3IU0IbNn3yE6/p13X3zxzPr3727PBnqu6B7rBEAxGdY623EQtM6zgx0vlIrB5KD+QCYSwNyW4oAGhYkIVSgBezRclsFPcpTn7FKrSHUyENELxPTpr25JVvVcSXd3q8YOHAdlwLbIACIU2+OTab1z7ux5AB2tCOecqvnevQfnzl6aIt64fv3+3TsCAmF8B4FLCWU7i1pgtJWBiK4SxASlrqFCefklJUN2orApoa0OOHp1LHS6A0OSYAc6gFC3NTYXUq5DnZxczABiL5YZy1WyZSECCqot0zfBbERmMPOw8IMfe+N//srj73z+zPsv7H7w8s7H7x798uuHVGyDkZE1G+79V998+dXDoyMmJzVVanUH2ODWRatpKSGAIMKfbxARJvJa5qu7bWCaaCm6oyuAHHmHxyBQswgyGTAuk5hsy8aBoA0xS6BAC61uNBJkhlzedaOKyy4gIdJx1NvGFdHcXTU/9+xzgLqWgM4AePvWrUCTCObu7u7de3duvfVWB4O0oCgwGKMQGUSOoEapuxhTgMDA6xGhGnYM0GYeoE1T0jGEzFEimSVc2FyLro0YryAAWHrx8xHIxsL1QeMGLdonbNwBCaZoBhoNdjTZAP/xjbvv//uvXD/afv+18/voo9Iu+XXnd//yZ25Xb1etQhen7gLwkStnP/rU+p/dPjzDHLfgiggilatRGrcCjLZeN4U3o/NxA5ii2IqpUVYaRinAYFJk2JxiJ4csU48q0xYMB1IxCCapmkOmGgiCGUwqKJmfEBkxJaHuBqLL2TYWRXMQ05vN8f7Zs8ypIQUYSSTA46Ojg8OD9d7+kPqIM2cunJxsvvLlL23nDYahjzb5mS8HEmhBkbTa4P8QTW/DNs0GtuGDJVVruS5yy4BX7J47Imw1MiYADGPVMeLDsGCAHP8QC4cPccAUr5jrEydpEGg0oUSj87/77M0f/vjN5/dW3/LM/lFxngH1ofKlM6vHqP/2s7fBYFsqjlKL+BsffsdG9cbJNhFTa3agg0KTSqTADpZ69oGBWt1sMTCZOmyxeYq0G15z2duo1gQxEr5gJyxTQES6YlSXuqtANAMCg4y2ONlSV0O9YjZaotTDyWY6wxX2ItlYrKreivOVZ57NgBlvqb033759Y71ajXBSxrm9s7+7s1q/9uqrjx89wqAVCfbiMRmI02qL0X5JNK4EYvLHC2nPLEir06e80QiIiAgySqUlAJEBkjFolobaXMywANkIQKvqLiBk6OstyC72UF2VZDCzij/2yS//5597+B3Xzn/NuTzcKtWKEKXaSP3eS7v/4x89fOvgOKBmkymypGf3V3/hxfOffXQyJSo4jd2dFRXBZgDRDqFFLnnSEG8LCawmVDED0ETsBc9nnF/l+YkXpjy7yr2MdcB8QCwULkaQABQRTIv5i29HaHUQoJRh6TxLSluEYCepMowGSVoss8EggtpsN1cuXolwYeLkB4CPHj2ctxWrtSAvARpqqTFNsb979u23b7596y3BwWrYUkQzZdZoIbVxIWxdxBAZh5USTR8bQYq25VFkEDHiwXT6FDJosqK9A8xTDvvusGWZeWYMcV4qEtm0FNuBSVGmiNjiVJv5X/2t1z91V99z7fyq63EhBQGFCuWafVJ1OacLe/lTn37773z7ixNQvQ07fDJ+6r3P/t+vPXj10fzy2eloaH1NsVoZEGmBpbuDhnTZjSmwsk4dUscMzT0dzjqY68GmuvXgZD5ogJxCr9x5/IePL/xrpA0YDhLJaTvPMa2mKanOCIgFWcMFGQoBtfjVzLaVEEFn1lqqogBL9qo1ye1mXkWevXjZnqwYYDC7defOzZ2d/YmcbTL2yxCBaiVjf+/swaOHN/r61avPw7C3KhgFoJWBxTQjtcLEIFrq5NQ1C0SbQo92SG/Zd27+yaXiRAoKQV2DOBhSZgjNUWMa0JfYEkXZZ9MOEpE0wxfDyNONjlgdnmy+/zeuXz/B97yw3mzqRJxSCFTHQFqJqaeTWe+9vP6ltx5/+s3Db3r+jGICQkm2VpN++n1X/71P3b52YaW5TRY2kNOoyENUoxglJJKs1SpSROeDzfZB1YPj+bBjq5N91OXdfPncztOZ79zn5Z185szOs/urB8f6mvMToM4IDc1328eC5u3J9tgKv0jENDVzMsK0OIsOW39VTWZAgLpdlguWoRSIaqtWqt48dfWqA4xUjLBEcfvtG8EpMi2Y2q5gnCIjOHarz549f3h4+OWvfPnlF9/JECKG3Y4EoZ5NRMdI8R1BRUhFJmF3neiNkU8cDOjBxzHENn8iDHLG7IuGsVEtaxdhubytg7ufwAk3hGKz2Am2ookp4s7ByXf/2ivH691vvrxTm5YbNNQEhhdbASiCM3o/+Pn7m5w3H/vBrw2wRoHfiVDzu3/1lQeID51ZPeBwZ6FQqZWiAyjsAAwq47h152C+t93eqXkPeHFv/4OXdt9zfvrglf2X9nM/czX1ghqxWCTQgCUxqiMSA7hB6ioB83Yzb7cnR0fH282mzG5OqyliZVRoHwMdSHPIEAFJrXFaXKBua07m1eevkrQBhASQJ0dHb914Y29v33uIwVbFCKYgWkoM+ZURPNnMXdtrL7wjp5VZQVhUHhxYiWm2PTIxridMm9n1CIGOWkM183sLDG5PNtPEwnCSDfZeo/2gAUHJtIC7PEsjSHvthzJHslpgZOD1x8d/6h+9dn69+8HzOxt1tTKGEWtobHbPohWcgHkbuYtfv37wn73/8l94z6XqJlZSIZCIz97ZfsfHvvTdL5xfVc8wGxIkg0xURt7b9p3tfOtgu6l41/n8Fy/uf/e1sx++uHtpNxptoW0AbZX9H03k4A8ziOaoWIRIn1CYIfa+GZBQrXneHh0dnhycbLYn23kTOQUzVzlFyM4/iWEfoij2XAhmTg0dHh6+cO2F9c7K/R9a7Hyvv/4ahdXOSjVYHnobmH4sO3AGSiKAiO1cvT26+vw71ju7XR3AqXfbm5FAtxl+m6Rnh6ihSnjPRaq61BlJ6wQEW6Vyb9MQV0Ic9hZGdXFkEpQYwdH54ju3latNZ2Szk/n5uwc/8PE3r5zbfe/5PDxpBIlyUlsRs9nLgHOq/TMdmBoP5/r8w/lT/9JL+8nj4i7UqM5p6vrx373+C3fq+y7t3usOIKeYQMy4NeuVR0cPt/r6vdW/8p6L33ftzNX9XA1ne8jU4tyd5mKjUdPg3E06WRxjO2JJDPRCPDGgGQtTY6IfCwoUGkebo+Ojo6PDw+12A8SUU67S9UUNjC5IwWBMJ0eHq9295557pgXY4M5OxsHjx2/fuLV7do/w0x7WjqGuCeMqARDBVJXIjOlke1zz5vlr79jZWVuvHMGCsAFpASCL0XZh/0PVGfaugwAKLjfMic69DYbBAUZPiRaZYmBm448gmiHrmdaWW00LRVRX5OqLD44++itfef7ymfefWx1s5g6ymXlK4kuMXHwWTSt0nFtTYqf4O3cP/vy1s//ph55pSV0rpuuZg40+9EtfeOfl8y/tA3M8nvvVo/n6wcm5Ff+Nq2f/ra956uq5WNG0LhfetFsmZ2dxSojBpo3jw+BPhqrGsxtMs0loeyOocD+SO4dE2KcatmeOYNk9Vx88fvDw4aPabnOK1bQbSS0GO0a2uueTqy+8NLod3XQ2hRqvv/aVabWaGC6PezjQNcwGbS9DhLNMUuOIRgS327nnzbPXXthZ70jFwVoOH5J1z/FfGJvS3mAmQiwoGI5rHLCFrNo++ZuBOJbkEUtR5Ip30WUYgrL97FpAKCqRf3z/6KMfv35tb/cDF6aHWygaDSStK02M2WYLqqRVpGXwALug5BR8dFK/9/aD3/7edz93fqe60CBWjCb6b33hzk9/9u6fvXbhjx9ubx2evHM3fuzrLn7vC0+tp8F6VKG1nSLIyYyAebKBi9kFhjAELPjiaJO7o7y7JdySKTc62MxUsPxDu9AwlAUJSQ4mnQzwZHPy8P7dg8MjEqvVDtNuw9gcHl+8cvH82UtiaXYKmJi4f+/evbt398/sazxvuv4CG8NaEoLY4rA/+OIpNBERWfPm6PDopXe/e8pUtc0YT5KGgmib2wbBMm6s7dIcdjY3WPitu2cAMOgbwnhHBMYfqY23/HAxgkiXGMlhTuxQ3trMH/rFV66d3f3GC/GgCDZmyKbBYKjISSiB3RVIe7sQLCGqmRBjnfj0raP3X1j/n9/2AkwCY4ouJLTBv/DzX3qt+/uf3v/Rd535nhcuMlNolvvM2tw5E12GeEyAS+gLRLkfdPgJqUDXnEzR9pOBoHpo2t2nDogMoNQQ/WRCZQ2XGPUST//Vxsp79+49fviIqmm1iwz15tlnX8jM7tm/ksEuvP7ql1c7e7ayj+hERI8E38v5dJyyyKI2J2a+lCTm7XazmV98+cWM1eJX9l5PtJUKchqds+OmQJJVPVrN0tn1dEPoFHef6nbmModH1mdQQ02yWwRgTKo5O7V+sDn5yD949cLO+hvOT8ciqn2kumAFhoEqMVgaJi0h6G5eIH0IwRXmA6x+481Hv/wdz3/js2dn1UquaCag/98vP7i5wb/78lntTA1SpdH75coZGGb/QTm6kmnDt4rIaArd7mkmo6oyoqQc6ZKuo04z92hIW2Lj0r9mn51J5MFJtxYWpicnQkgHjx89fvTw4aNHV5999tyFy0LV3JFhi/3t2zcPDw53d3cHAhiUJdEp9XBV8rRRRMFoLC5Hc6aO68Rms5nn7QsvvjRN0ygM2vRWM0Km0BEjUTPUYgSGK7h9IgxTONdMAzAOxVDQ4hpeMr87Wh0gGDM6MTxZSB7P9dGPvXG43X7w0v527jmUpOaF5xbUyOyyxX6crszxIDvcUWeThrSK+P3HtT44+p0/9+5iTIK9ZXTACjUKRUURGaDPwBSQe0siACe7ULehtw09gGwCCLqqGoFCQ0u1xJQhdw7kwGPevcqSpsUJYezmfGS5Sb08UPcWjeugoHt37128cD4iy8UthEjN82uvvbqzsxt0SZ7O8CYypghrVmaQ7UEaGUMSlYimtJR1EmvezvP2hRdfjkypRhV8io5sYBiCoCKWzCmURXeM3rlIsxHhosb2C+MLjTbAoCXjHuED0xD73WVX//pvvn7jYPu+i3tVPZNTZxeGi7sARgZrkHL2gQ+UaYeyWDNZBQbILOHrd6f7ws/88aMJ2GoThGJudXO77eJMpcAVjBFMkyE6HMOGb2EUxzRf3EC5DcTldGpoF2KRDcg9a2F7ZYMs2q070BVst3J3UhigN9ueO0dMmqMZEkOXsxguX7qIzFaRFRyGu5s33spM5nD1lUxzWQ5Ala0EIzbDHbktmLc+3RqL/E5omlZkvHX9dXUFQk+kDu8GX2A65EBSd3V1t5WuwaSMR8ivajrudjHQgkbrplTNRRodTaoqm1z//U/f+uTd/o6n97uxZa8CxfKDd3cJNZfKdIYgNKnChNMd0owVOKWqQHCi9tY8RvyHn3zl0eHxlKkGaiIi7Xgj2BloX03AJq9OeuLt9r/8AAAgAElEQVSFdVazYGq0fafo6B6RV5RQpmiIGI+byJzaXt0cJotFah5Bp1te+7bRAzBlKzKWfnj38ASGr8yyN4WIJGm3yOP7D0+Oj3bWa1RTQyMko7pEZQ6VHEGGz6xi7IKuKpDz0L4jYGN+g1iv1+q6eeMGxhsaI9tVbgjYQ2Yrh5bgZCuWmdeEEC1Jw7pVw064gHOTbQKnCQh7vxVZADOR8b/98f2f/8r973jhTGEGxZkY2IiApghEUxkRq2CoE0F3Z9SoiBssqsAtosmdSY9m/T+vPXrn3s7v/dCfOLe/Hu2jmBGtQBCZBBslzyZpe7rdfWjjKCF0l++K4ZtKLknJ9IetZ7YsQHZ0wctDFAQPQoGKlghGLb5Y7T2xhl57DVg0mrg19+IOKF+ZJSWElbLD40NjBgzvzCj5InNAt2ka3iRbOeyXIAKMIICJQ7JvCF3B8JCIXO8cHB7cvv02fJvh0RAx4hyHzX0ZhUHahoHJdbWRfkmnsMnBkU62NJEOjBYAbxKCUCD+6a1HP/gbN/7kU3tP7+G4hsUbS0MemwH5x2k3vEZaokCm5/+48kFBwJlp/eWDo88+3vz411z6j/7EBeVaUndPET2o0ZbEwbh5ZEU4OY3BE+6biqHBLn6/cdo9KWPpXZdAy31W9gNQWrUq9ShHEey5IgNsYjL7A6iKSX+UrWzmEBomKa2G2vY3QMBQDWqxJx8ePr59620G1+u1GF3F8ZxHm20vga7HyiS6I9loR67FbkMPgXD8YhDE0eODp5957uz5czCZNLpIy7TKIJo9T6h4OqxmYWG6pF4+eXRzY/QFLbYOVyBgo6BmrB9XffMvfOnqmZ33nOPBSYx85ikjbnFxEwUldUbMAqCkGyRZqKm5Jdjd4jpjJ/nJu0fbzeZ//6arH37+nCJLQs0+U82G9Vg9KXxANqxz2urR7nIeUMrCrgcnFAZkXhg7jMfgQzh2xuDLFl5/mZYF9zYQ8PQt4wadDmUYVGJbjuc4PKYCB04ZRLVxnR8pcu7trRs3jo+P9s+ctSMy3PiqJUTbvzOqAc92UGR09Vg8ZvUcdANKn87nQvP46PE7XnrXarWSZmM9ie5AxYC2ywAGt98DtkiwaruseJgFgxVdtxpI476HnKqAiPiXP/7lzz2cP3Ll7GFrDOLySIxFHIylzd07PieUPBbHKqpxfW/FM9mN6ZNvH7y0lz/3ne88t1YrGkqP13GEcgHMQdd7goQs6mGEZBE2ztmYMLb8Evy4/ABLRWoizvWjy6eea5rSC3HK8LV3jRtNOHpuF8cou+dM/4l1gzFDIdzpbxyCRY8c8XZBw4gm7r19++HDB+ud1ZQ7QMHjl2iwaeWFT9o2LXe5bU7KKeUiK2M4f1BQZHCz2YC49uJLIc9zgoiQpIZlCiNpg6Nyw27Tcw6WCsTJ0Ru4DZwUXh72eLRq4r/53K2P395++Mr+kXclR71MtxGdItUO2dMamGdARFegKdrT0OKlxHHnr7/56E89vf8Pvuflc2tWQd2n9DbHNoj/n+xmb0iP9RYVOQRe2M8kmZaTfSphKW/Jisscg6+CGGAjMnvJkX74suMBzdO0Oyo/P6RipG1yA/Px1B81uByDwTC6RMQpTU6om43LV648/fxzm5Ptdj4CplKPOSIt//noJenhhAzSDYHM7G2ZzZxrBoUuIM3PrNareTvfvXMbVKDltmgboBgSbdz3vyLpHgMzurPGISyELaanjc4gOKMCZHObTMUXHp589z985ZufPX9hwqZNudIzpRhyr8yirMZorZZZJMagOC27xNnkjeP5d+4c/sWvufST738awxsCNhlgGebk6MxayuLTynrELVeByySE9nLbfUYbgOUxi3Z/caTnlADVKA8EMI3gHDGIUbYb11ml7e7kBNZQ9MiFomNrGYBgcs/2pLEA7qIJc584tS9I6GImwZOj45u33iK5Xu0utwcunoYeE5ysK4mIRpG5ECK+RZvcyEEmE+yjR4fPvXBtd38PXimnyjHewIDhVAA1sBhTjUS0PVt+0gOBtiFJ+hROQEb9yCdefWo/L029aXmGwZgzOJhf979yUBaIkLpawmT6N23azN3Aayfb37lz9Nc/cOUn3/80EFUd5MTRy95pIrhsN7XXZEh4I6hZ3HP/z7jHcAQAq40hRlY3ddcyHrCmKUa6DEC4kbPsbrYRzTG6ukfid7iz0QynzfghoW0pjWFAGaO3YhnM0bYywW8NqFWQ2CYNAWFnb+/5F15k8/jkaKFQ0FVa2iKx1ENxSonVGBABklOq0WICAfd2NhHrvb2bN292g/TIPLjHZQRIgMPNzyX8uMU7Bglvmtm2LnQzWh75CSpDjR/71N0vPsZ3PnfupLu4eDs9SCRHK6wMYJpuhQpEBoEo0UwBGruJLx/17986+jsfeebffPdTzUCJmW1bIhpAMsdopFHmoaKdjaI51DaZV/DEI4GDrtHgwGKYxlUu4jJSoyHIB66RjuNaXCyo9pyDJ/hj9KMNqOW94W42Qe5eGrQeWmPNiWXAioWUWNDPZKA6eDG7ktFSTzk9/+JL0zSdnJwYeA1SLwbNWm7bxbC2Ilhu2/XFJSOGDXZoFRG7Ozubk5Obb70he645unyM/BfyU1wEdg/vcJEGOzpaDDNi4WK9xSaV6gYePD7plf7xG0cnhf2YY7mlGaNpEITLPU/TnJsboHI0h5u23Zvy9ZP6wsPD/+u7XvyB588rCr0tFtHZbhD3LKoKVNjeMngTOng7Jowyrdp6oKcsQeQ4s/aOjwdAjF4yLLI0xjPo7sUdgeg27gIWspNBMkmSucDBAKJKkPMM9QSzxkCVJOR2KIuA7nNGo9zYuaDZwSKru2oO4rmr11Y5nWyOAmQEyty418r7zy0OEx1+RxHgbkpASCKDTW0328cHj/bPnDl/4QLFbqKHiiahjMRPh+HZJhhkd2m4n+ymNj6KRqXCHjmbHpxTXjvs/+Izb/3Cm8fvOJNfe2GdoU3VVklpmgJiNzvcWtLtw9LNQDOisTPh7eP+1O2Dn/325z/69E5z1XATPF0OR8foAbLIG7FkcIyBGCm3Eo8BT9AiAo2QQQRGOy0pj0Kw1qAR6odGQ8hVkelcIw6o22aEZaoSNRKO1AoQYdcIe2g6X+VqMWAKT9QYgtXYXItwOMK8UWcMQujJT0gpbrz52nbe7u6doVi9FT0P2fXZGFU7Yh+WR+DpWXSPDo43m6AuXn763PlzANGFgW6HKdJWulHDDxbcqbVaaOMH84jqtnPLvKlUQEPTFgpgigbiD24++o//6OEnbh1/w/mdd5/JrWorZqRNV4st1xb3Tk6I6o690KMZv/nWo//lW57+oZcvttjqhDQmLQxGfdwlT2vHZS4rShizLcbLGG43yUwBFoXC9UMHqKZQHMEMIwdBCmhGTOFTMrKqhiQbA5zJicMt92Na2+mKnvIc/i2OGX+jkvV9kEYxrT6l7vy+EQv8ai5MT6EigiXduP7aVrW3v6cSGqWOMFe5yCujmLLahTHhhHF8fKTShQvnL1x+arQGdA08xQlL+HQPDQZ+JrtH5/d2u8nMMQAOiCQLzR6TKMUSiJmxqjHirzMySKh+/rXHf+kP7hyezB9++uxTa92vmNXTIKiaYJFTyS3ZK0nEr7758Cff+9xPfO0FIOauKfCEOFhgInqpBEeeNTRwt5yPuazADpYSnlp1WjyPkHD6sB1IgrQ/8UmhQrjRv4kIjyki6KbzwVizgCRK4FJk+zq1MBoMLEOyh450Kj9BANoIwiYoAFRVR3o+2JgANUYS+A/bk2D6rRtv9LbXu+uxo3vML7FQO/adDd2BBrebTVftrHefeubKtFphUJmLHluthJM6gkCgesyvxBjCxgh2bYeFajwmAYuBvz0fzAPzJnOxUSWJ6VmQON7yb/zh2//9F+9f2N/5xvM7e1EnjZmYZLGQCW7VEHZX+K0bR3/6mXM/85Er4IRCR49bWwBcxGLmsyDljeBT5oBGlvvmsLRFqwFFTpLHRg6LBI0aPBi6ObokmIC6a4wVsXtEXMhJy5XjCNtb7iaoQUho0JujxYUDOtNjqZYP7sHdu+jtBRrLC2MSjQ7ezlMRY9IMYnEzC5HzPL/5xuvBabWzZg9vaINpqhoBFRCYiLlOjk5ilRcvXz535txisUV5g7sHdWVxXZb8NY4DzKkbaYlg93YpEU0ZLNNV1eqsIDSvMqFGz3NMhh2BwXaSBPqtg/knPnX7t24fvnh2591ncibnAs0hkIlYZf/+gxOWPvm9L2fmDEzDONUL46LBHmD4b5cQ/1U+Dp+0QRZ7jjoLnRyJXIAjglWL8lhoiMzT2pELz9itWEawuvix1So8g3hJt08O4wDp3jNUiRmOHKYy/e6nJAYkZKAWo/kAEuYzCRSHlPOEQ/UMTSfCCJC53Wyuv/7aer0zrad5rvDAFyMNuWFZ25NNd5+/ePHipUvevJasly0MAgYhDx48OH/23JhvN0wj43n7sUYwhhFAULAVHnTlg4CJq66//JnbH/7lL9042iJzYkJlyRVCl+ZCa7p6Zu9nv/35n/mW59j9sVuH905qL8ZZsCvlzQPefTT/4kevZUZ3h6qkKPl7JABomX0IISMXkSFMBzDsA/FzOGVYjBgWO2APFOfSQZA7aH1EEqcPntaVw4Ts4Bw1NqHaHjUzKUH/Yiy5ZRBxhptjFpWHVzqJLciHGBLpIlvL85ZcTo6GqMH2PHGnoBTWYkdNXav16tmrV7eb466aPPUPsC8yiPloe3x8vHNm79qL77h4+SkArRosLZ0lFQxEzpvtzTdv3nrrzXsPHigWND06i0BytEVKrCoOusQan2kbSR2cNqhv+PlX7h9vL6f+7a995i++96ld6wxChQLD5iwTMcTJZvs/fOngb372zpl1f+jpc9VaoR82P3Hr8G9+8MoPv/NSo6M9hb+tJi2bcxnc6b3JZrDLVm8ux1qEu3nHsvRpWCGk0QE6gmFD7PTche6WRcGGX8IID4ugEbEsF5e230W39fJGV3my0VB4hBjNCi5aMfg0W4dGSb/obZ4k1CH2ElifVIz2+XnaIOAe/lqEkwBx9+6dh/fv7e2flXoMjYNOjk+66tmrz+3vnwEIdLW9PeDpacmgcPvtm48ePcxpWk3ro6Ojd77r3XjyaT049uVH7NoOG9Cg+hdyuIOT/qfP3/nrn7330XdcuHm4+cydg8t7+aPvuvIj7z43TcPfd9K0WOFBGs1VCjePtv/BP7n+sTeOv+GZMy9dWn/ijcOPXJn+7rc+32ZqRrqOZI/hVhDEsO9t6EROkKeohu1mu4U+chhY5LMRT5YSj0MJG0P7rHO2kN7G7TjSzcXIB9IDmVzo2ExqV+Kpd3DUPkN55hJSBtQnPW3UOrvZ8kX7XjbIqF+ZDjULinYqpHv3I5KLPQJYCkTo5ptvnWy2u3u7Erab7Txvzp09c+mpKxnZgLlAV0nhCENCeHTw8P6d29vC3s5uTtndh8ePLl+6cvHiJZhvGUYL0fMXG+yaMTLSUgYjWsiI7VYf/Puff+fF/aemSeQaun7Uf/Tw+J1n+ie+7soPvHgeSC9MYc5e1SSACQgRm/p7r9//q1+4d/Oerl6K3/2ud0yrNdqTkWIg/kZaXrbL010ICKrIBOo0fMBLZSwxuGgt7SWdnE7npY3txtO/4ai8rd0ZIGlQHV/dkhAgMlqlxukAUzdNw/Prw/Yfee6vAC0DoDFqjR74Zgk53Q1/3VTS8xQxClv6K6Ws1jGGxAORy9BAuhtrNEFGd11//fXI7J5X6/XlS5d39vZ9kuzLJgzTycwWaj6+efPm9mS7Xu9M6+wy4RK1neft9sWXX2bEqG2G8tGLwO0SetRYviYwmtL/+sr9h4rnVqutasb2cfXzZ+LbntkXVj/yu2//0K9f/9yDQ2vRxNSsELJb6qjSOn/4XRd/589c+9oL+Etf/9ROpFQJLr2FbvsbOVnFMr8vCYUISw4mg+XpFrD2x+H4hCkiBnIQmacte4K6RkyUI7Pb9Zdv8zAPAIVnyXudA5bxXTx6WkUPlYJBd97TbI4rPlO5gcHhmyEb6lOwB6yjUuiFC4Yn+igWsQqCqiIGavCUyfG9ExpyWUPM6fLlp45Oji8/deXZ566t9/YxxI5e5PEmksm56u7tm9dfe71Lu/u7OQBvtdDoaUqh7j94gHF8xsHQmIhDVm+H2x6G5zWLE3nc+tZfeOWZi7svrKdNbUeqQQaRoU3z8w83tw+O/vxL5//K+565sLsaeMwxkqfAJ6srKdd5wDCRjAZ+DhPwEgU0XNouLarob21w4IV78K1rWfET1OGGH7l/Rh6yu8CR1kJO2tFrROD5bBoaURos2sEyFlXNyOEOESRblXxaugEPfRZO7S6DiTQ2AGxlgPGKWbcl9wkIRLOpU1cVRHpuOOeujGy74ujBUk5hIWjebqbV7viyBi2fah6HFHF8eHDrxs2i9tdnmHBv4OBcxrC1mLvQ/cI7XrRHodwE5IaVkr+rxqGVY4IrAMVvvHH/NnB1HdsRI6fkyuijZwT5gcurb332/K/fOP6OX3n1b3/+5nbb0Z2RAosGAT7X8BdoKNBgteNpEESPLywBx6RTtHVTCO2RlwsH6TlIg2ocyzdGfMBRTw6v47vp5O+WgetkjPAyWgcYVrSAAKpHD5q5PMOEUawOITAT5qvDA7EHI7H4ICj5kC0cKcSIMazUQ6DGjWiMERRNjlIeZjP6zNwTBXfYqaPdvtMU7ZVdrXeAssOTdo6Poie2Nd96640bN27ENO3v7YuztTfbjBwCxWAwIzfz5ujwkJa3c/F2dSOa1TOXvWzCrwmWvvcfvXZMfd3ezpEJHC53RDQ6nUIj1skHx9s/uHfy4n7+1Pue/a7n91icAyRRpQGR3KAFPKnrkXL0xji4wyzrLRL00BhbwjQoiWUNnlQd6CH2OAMOUnmAUJ261UZBWYZOjh3lyVEG0O5YfVKSjyMHLWjEsPJJX+qTUoRjxrGIruWbhoZxwZoLh4ps3mOpcxZqw8S7ifYREUYpM3aScfbC0D3x54GNpf/zwYMH9+/dJbCzu4YRFQQ/lHaAAXxhRAjbeZsxXb12jYAsUiwUa3iFDSk9wmESP/vg6IsPN9f2pkoDUQCcImD2sEVkBydoU9jbjY9ePd/BH/3kV37419743P3tRKQ8Jxfp0GDmty1HYsz2HrWkBBfsg+Fnt/kHe741YE4PLnChjWH/pq8u2IvfzvssBm3gR+mv8+AotIwB/a5isCvGrDiQTFMffv8YldeQUcd2MnUAiurR9gFL8hwimoSy4Az4m/fcpeYvZIx0yBjs+7AFm7HqcXE+DIS/lZRPFDyMYYNMNI8Pj65ff/Xunbvr3Z2dvX1iIT1FXxEHk2VbFIxdVjurzeZ4c3zk9Yi2aVNLRBtI31UQwf67X7h/YW86v5o2hWgMx0GLw2cVTTW4FRI9lQ7n+eX9nY9efer1ub73E6//+G+/fuOwMK1jjGTwszOMXYgo2RqBoWm3tZ9AWzrXci4cV3g6neLUCmfEuXQcOJCAYvX4/hMDTaccjhM5Cr5R6DLGl58Z03TT6MvVKpb4pNAyn86HrMc37UCn7XyAlqH+g5VKOqyIHRpN2Q0qPPNxtt/HH9Cen2eHFSh7UkfBMi7b8a/paQyx2W5vvf3WG29cJ6a9vR3Iq+SancPnJBERGac3PgZZIjKnh48ejRQ86DF/O0Fb2YGZiYw82PYn3j5+8fzOtjF3FUIhwp2UIt2VqVRPEUVsmbnKAlr8+jOrP3N592ff3H7fr35hWy3O7oMIBCLgSDg0x16Ufg+gGJZowyu/Qi5fcgiFOyAwHCGSbG2RlpZtby0M971G/DitA4UCZNZkHDcHqCCZSQE5HG+mqajxlZP03Df8f1S9ebhteVUdOuaca+1zbl8d1UBBlQUUCEYjQWliR2MXY4wNJHzYv/fybGJDFDEijYYYhYBEeSGJeUkMMclLFLAhxhCaqIj0oNKDUFhFU929dbtz9l6/Ocf7Y8x1ypyvvq/uV3XOuXuv/WvmHHM0bm6mBqExsT5T+jehAccEDSGZhwl00dy6Y250TVg5Kiu0js3JBI2FFNWCNFsZukryKEAOI/Cz99zzqU/++ViW48dPxLQmF+foOl1GER4hYMSwpr0qyLUcFlNcunxpdc/n6kSnM4I1aoWrwP/12UtnR103W1ZGzG40eh/3cK4Wr9bNNAKWlQVcQMaEPatr9vyXv/TBG7elS8XGTqSjcqii7qt1PZ6LqB4Tx4rm0qje1Js12271YasbCPqEs1SX1seKw9yTzb5TvJeIEejbf72tuS4wa9BSd0kBiMY+9Jp7kqyzxdaPloKwdeYK1WDvTPVGjZSJQNScmwBEp7PowFSj0haTYLirG9JsPJmopFpfbRWaAZNbbOZWE5UfQe1mDK3SKnWlBUhTBDOkhUdWTtNcmduDSyiu6LWgWfaRbAoJIv/bpy6e3jjoZfJ2EDhkYGgGRgfShPDUaltoxnlwE/bei+Pzj81fdsPJ0Xwxgzur/wSyWOaWqedwRKl3wNqcMVU769hTfKRA7T4UUQEBxPLFR8CsaPD23kEWiiFVlYl3EOyQYFEKmhXV8x+2tReIpl6Z1KBHY9DG540md1zvS6cPCO/lpu7cIXkIcjXjkqa0wCo09LdWHFiZ3kbh/xR9tDRvdYRYiNSUxUirM1dftXf8xG67iPBRIk30MAaFcoMm7HJS7GMSthIuWaxpmi9euGRuMTXQZi3Hp4VZYXHz+5Z60z2Xbj6x2TGd9IQFzKlfjz7Lw7zMxYrW9rIlbQpwqc9s8zmPvmK4YayAG6llCsJ8aqh08tI8vq8H2DrXUfkv1LMxJ4EnKhwc7cm9sr10NvuRM7uJ97YSQChJd7W0XZ1zUddkAW1W4bo9KBynT65um7H2I+oPKcdrdLuuU2slPskKntVXpW4ucSl86kJAvPOG5sy8wRiBdklUFjB1gYFVbgCYbGAIo5254kzWbpAWmJoC115CFAY9mjTULQqcTGbRBY34FPOlS5er47u7KHPdq2y/Qb7+0xfOF67dzElUVVKhFmrX09wVIc4jpYaZfIbmCfvm7z+/PHxjj79u34GYaOJ8ZgoMMDcwXSZELAmZTYD5yv7Q8L6LOe1ZrLM7IZWy0QarKlxsHBWdxSbhNp7QH9BanK+/TkZIrKpq5CWt5BjW9zkIs/bmFMu5uhiQkxKPUBPxoNQAd7Fja9NkXRaDorgKlqZxNWjSiL8IWAmMMAOVj2jSN1J2wuqawq2gWG4Y94+f3Js2Y9myQEeYs3nw1Ea38Cqp+PqBmYW6Yx3OmzlgdeniRTYEq+6LMPXemAG+/tOHV8yzfKoHffVWo00W8EEGm5KlQeJEel/VluRtl+qHP/8M5DVJ7TEX7W5FBOTIAO0VFnugbZY1utc3wTtqJ10+OUL0QMqVCLTwFm53FdmAVd+kwqeEGQlfl/Lcmk8fFg6RjWSZoG3RSurGOgSF3T8wDZNt/So3UVdfbSBi65kiAx+9S65HpKN4pNRo0mU7CzN9LT8hR5vGQaLnXCjSKtcsaBKE085ccWVJokkj6WExuUhdaQSFiCOzpmmScsRMty2qRjGnab58+RJgOp1o9BWVYxgOKt9z/uDG41bMCsyTzsMgDIM0TOiBC2iZsESaaWizcXzyoB64V99w09WAkUmgL0x2Xqmmx5UF726tNxQAINxpoV6/UQF9wGRLVFM3dLiZSNQIrGCOFFqw1gh1p9DXjZpemJmXW+iErmyFvwAsLSX0n/t3tgCnbHWjQuqCMDSw1eeHKhx2AO/RwdYuTgqDFF+LKIIefdeUweDV26Nb6z7PrKFZAqxE11TwQrIAHDtxwizGoEjUTOWiW2vneFQyWbEiVlMLDeAjWPCIZbftG0kztZWtBgB/em7ccbA8YG9/mwZ4VpZccmm0zNLnhVXRVCbfFcImGO0v7jt42kNPTViJI2UaLxKV7R1OkCETVQ8QjM7m6PKg67oGYfoB8X7Dm/4+wDxIq2JWaubcduA6MZuIVCXhDsnm6Yr64gSxxlv3Mu01q8tAm5tafNQtpGbOK9sxgqKU1AqOeP80GsYWBhr6Jp0qMv6klZ6IwRBrJrvOa4MwuwZDa8VDQ3M0ksU17YQGO33y+NhuDR1wldo6Xt0Aq7kIAyqLClIUk65Gi8Vz1LIcCo3wIxXccAfqLbffd8znPUtyRDGUFMFW8zi63gi9dHMYw4DwKeJwpM/45gdfBUOxnPAoIL2nhSFcHn1seOfAcNUyNyzGLuu1JLx5JNoZXW2sWI2hvFEBzTfWKU7DwzC4NRrgorVI6k7h+rrRwrAiwrWikw08uxGdurz2YgAxdWd6/wrtRYPuO/U/tLL0Y6a+TxWzigCXbYwWc9MRVP2Yr2RONOZl3Wne/1+q7exx5sqrYKhadMJYCacRDbrZ72srUGbuFhL8uKsPn8i6dOEym/BFL2JUuSFhb73r0g2bKSldX1pVyBLcMblHaNbRVTT6pKBnxcBth8utJze3HJtE+fd+/dE1btX61MytOiqQbO8bOYPx/tPWlfXBKiKl9+ySZGXmaXEiigZTtHypK+1bXquKKmepHPR0g07nzmMzHgnllCcMyMmnuk9zd8EDjfrx6JiHbHHQtp2QsJT6PjMzN5ZipEGzcrItAfpSKNHNevQkqgrUmKJhag/pKGuth9FImtdKE7TY3zuWQyIyCw/RZGjMUlkq0ruKUrJGf4eQB8c0T7vtoVDe9iIzwOEXd/mJA1x1DEsvbYPZrscDzGKOfhJ6G1lV0mm5m+FTF+qZt1yBKZTNmWhGc1/jYsQrVUXbns2rdwvQq1DsAtMcDAhSMTTn0NyqEkfCQ72QtqqXQlLndqsljQCR0l2KHGYM9L2qa2cdpVQl28a3G80jbkVW+w7QzOjdBzTlgTTFmxpgHmuUbrcbNGgyAN0mcAgAACAASURBVNJUesMNijxZVTF0N1/ZsIK9YOpZxMgpc1OIDCGks281GbmZ8fRVZ0YOHZOpfkLDo/5kDBCAVFWwmJLyEFY5S7fN4bLrZai/QgOuD9+3XFhwZjJlqwoTcbMZ5hbRxZnQXHrB6NT5R7uwG5vg1z7oVB+XKwalndZ9PburQLdskqb15W5uEW5mLipzyyZ10ndbYRENIvbOUn9SfRZ3JdQx4mLkrXJ87/YYCsDh2vxZl5QOac0MYKWwarTLV0epqDVjwynSsXqiKCOn5uaCdGeAJEfbS8HU/Ojl9mbrSrrhKt2PaDiu31HfSfoGhn6mby6DUeMS398c95gq0wEWw0yTX5O62kFUMoXCV4nqgRS8ivLJahm7sVOtpbWZAP/w3oNwbGSh5EzqNBSJoXpcyOQqcPOpmElitrz9MB9xOs5MKsyyhzUuHbe5m0cYTfwsbUvpQnuKqIOn+w1CHCEBQSsNyYxrMNWa0uAuh41qWw5KSzG5waxyfZ5DIEtZCRms9hKnGUvlrRGh6te0khwFVxhq1xwump3hKDlR3UYARrgDRiRpKLklqQzq/wFj1Rr/pgmFGh+QRFWxKuF9ZGovqVFQO+pNDBFapouVau/K3E4cP7EsC0Q2UOXZ6LhVUjEXU0zrbV8EO51OoKrPhweHunQU8hwg33fXwaljc9DKEolVnlJlpSRXTXzXyw8sp2GiZcQdB/nkG05TFAhEsdIwZAPXhWQ1zOltnQVUDyjFGoAxZaqgwy5WPolUhislscrC6a0DgM2m2DgwlzbgFchMKyBR9Nn7nuqe7Ii82Xg4ys2xZlCLDgup3dGNW197iksoqpvvkqeJ5wDbAdjco6xcfGwNtbt81Jmleab6IgEKZq1R6sPI3JtukzoVVC7U0djHqDud8hU8cfKU1pxN1uhpl+kNAXvYqOyjFjBN4PrD9AhuDw/0WlsWvk376IXDa6barn2wWZqyZoUEOdC3PFMyBnI20LBkTllff+NxYfprQ6/lLhyV0kGHuvwS1OQuigGpzepTuJsGqyZpVFOpzA3y6OutxmQxUYoPBphVMYcIesARqBUW3QR2H0mxMQRN+DoNSglSxZ1SWenVFhsaCuvJtu+K7pC2dmOhp5LCmFSKMI1IN08SCLivdAyDTtsWxdDE8QBppXhWOKjo4PYR4BrY2xUpodQv6qqk+2Z/4+4jBzNFWg8AGL30BN4INO06Rp6+RFmS5rEsqUtZVbTft+O9Y5za31TR19qqSU7teSj8RCRk0yRywI2853I94Pj0iGP7evZCct2EN6p/cyJ155sIzeo0hSZijbAnWXJFjlqBPjXo2aV26VMgVXWIFtUil/W26kJfoNLKlRdfu4fvrBq5VGYuI0eNMaoYSD1zE37r5hLNHDk7GMwIGQz2rGrQDXLqQXMIHE6DRw8qXBPdTGHW7V/m1Iy7qeJdMlhEaM+bhTenQb2VIHdTaw5Ux2qt0IlbbPY2VWU+u4GBNqfUyeQQi2GFbrssjTCgHKvykzRiGuRk+OjlXVbM7lVZHi2FH0gvR9CYyQifTBJKl2tl1bKJ+c7d7tGnQhaGRw1AVZmblWfDjYFeoWygmWt33Y2Zij96j65zqapKt4k17MjHDix3U85WgcxhKoDNbdKUT2RZd2cWkYhJoHcYirUk9+Y5KOto4RaakMOhjPY2glDIqRY0qjPF2f5EBoOlFSx8IiqT5rVaqQswbQ5fQea1ydJcVnSCxMKqwXlattvNNMOdsXo1yk0PtT4XQ6bamh7wVw/iDCbi9ckTJy5dvDRv0hDGdmRXlBI1vqq/1ADpBjM2hAIndjl2sbc3BQDUR89tCbjlUIlsDlZMU3KlhxkIzdpgGE5P+Bye5MUcX3XDFeg2hKSzQVIpwAW29yhH7nu6c2HmdKBtjUuXZo3JZ7rNMQMzAGAqYra+tdcV1CXjETokpjLKC8PDQEWXBAnpk3Y5Npv9vQDQDYHBdtsDs3CPyb0oOjXEeRP1jFnNCaKoh+izHGCEA6M4mU1G+ASAQyq0dHVmjVKXwW0yjmExVWUgfHYbBotjx/bkIksITR/hRiZwNCz2dSKqNxtNJBFFbqS57e3vh8v7b02mkY9nX8md9okq8xDwr9gPqD/bYrvbznv7E40G++iFsTGb6TvdnBwqHyEGmNHchO6SWaWQZBA2UDnqS646BmAU5vAqOkMOSmFEmDwv6wiza6Bfk+9kjwYZCKDcfWReOH/uWT/2E7fc9ODMnKZNMQ11eLjo0CvYZDZYZnSPT972yR/8+z/w+Mc9gSy5alARR7JBbDaTxTQT/I3/8l9e9HM/9773/UkfxIBmqCdOnHnmM5/+vOe94LoHXg+YeWeowD1lZw7DgIUpD0gK12RNHmssoBPlrom6jVQ0tJlZloWzMjEpxB4O3HHHJz74kY/ecO0Nt33iE9dcfc2XPvGJuZTP4WyHQPSB2tx/OQZKuGAGb4dUiBk2zZtpM5cEdyWFp5spM2Ky6uSaFRiHuWuSH4pSg2+X3SnCqoaZf+8ffepP7qsvvmq6MDhDFIAecLNnhWy7ff1f13a0S6xPnDt8w9ffctUcSy6ThjYNlR5d3LouIKmaloSLqMKCQm6wGgHAzOP7v+/v/Yt/+Sv437/cvXG8FeZlt2D2+Y+49QMf+tB2u92bNuWyhtC4hMvuMOY9d3/Nb/7Gt/ztb1PVhlo9SU3D9EapYHzsY/7qG974+8dPnFQAT0OnqiJ7QC3bOTpiuxz++3/z7/7fX/lX733/+yvz5MlTt9760O/7gR/4zmd+B8w9PFMoqhUSFsyRI+d5Y/AzZ06ev3hJb+1FP/OC5z7/hduDA59ns9WgSS/L5dLUuKet1G1VMTSv4hQG4q677jo4ONjbbEamkFdbWd2NXiTNPWsos95c9swAPMdus7d/zbXXOcyK/Nxlnpw8y6K0GYw9/AqzyWHwqacDzbB15R9cGHXd/nTFOuJv2putqhUdXkefqBkqqVmz6U+B0uQ1V9zeAXzytk8BOHZsb46YNnOETzE54PM8z3PMMU9TzPNmb97s7QP80i/5ayTMkbV0Q4CuCHyzcfev+5qv1WoQHQU9HGn6qr7kWvrOd7/3zJnTv/iyFyuhr1Z4osEygEBlGf1d73jb/t6xv/f93/+2d79nu90tI8+eO/f2t7/re777/9g/deJP3vsuFiJkEgIrt0qPWSXkd3znt5+/eGlvcndccer0c5/3gmRt9jbuLqsvPS2iJWwtIoge+R2dtE46RmUBfuzYsaqRQLhPCnmqpLoJvWaPYkaEOn1StaKabdvtFhdPYyk7tyx7YYlW8/VICDSUYlkUDm+OwaSmPcZp5nbLm05PNoUbAF/rVmEJJoaM6GkQqOLyLqfIsABWbyslMDSy9kdveSuAcbhkZi2jsipH0mrJ3OVYcowxlrHbLrtlAXDs5AlaIYlJZKmm/hEV8Mc+5ov/x+tfD03YRb1yyuRjimmeW447xtCxFbCf+ImffM5P/PhaOmlk4TBjsqrM/cMf+eBjH/d4AA6bfIopPFyr2R3L4fKYL3nc29/6Ft2UI1NOCyN30zTdffe9/+HXfg3AdlQV3vyHb8pCjQVmxqxQyEp7EK3kPTRMJUCphJE7SbiSIri32Yg/SZgCm498hYtwt8zF5Dgv+Mu64iDoc2SOQjloB1kHi89I+c8liyYPdhMB082VhW2JcPcswj2t0i5nPWjjZiwMYQ7GVCtRuYjiajr4AOrTFuQkEnxjaqKAoEcr5MWLFwEsrOo9CsDILBGq0GSKmDxkci8k04BqwVI3yu4/8exnv+s971W5IBqB3NgLoGHksizCsIGuPqFP4sUveekb3vjfIyJzgCpa5c03Z/KvPPqLtMQJjho5RDQuuFdhbw4SX/6VX9XrnY1aTjHR7VG3PgzAZm8G8NBbbv0rX/gYc0RMYwzTZMeQlT22EAZwRIdjn3wam5jJpt5Bm6Z5mmZUrd0EfAWxowf+mtyXtHqtAFOvnsai8O86LBySJyJUuUhnF45YaUEkUXTYEKkhAENMjrAt6kH7ewASU5XRTLEChXIPKyJCvFhzcYY66Q+adsHun3+14J4HB9vOIv5LX2Xcm+ZwU/CEuyMsR2YSwCc/+SkzC0M0vxmVgPnHP/axl7z0pTjqTrTdk3D/6qc86V/9i3/1a6/61Z967j88ffqY/u6IPhSMcLOvfurXV21j2iOaxzeSbvUv/vkrRqUGXQROnzrz9ne++/yFe9/6trfshwPYLglgZD7/Bc8T61PHrNF///fffPe5cxG+2y4A3vved3il6u7wqGLQrUFPGWIRBUY37Q0uCJywo2KjmqIprrmuS50pUFvdvB+RNAgrDGYVWmgpi6UsWiX/7J7LT/uD27/kuhNZg5jCWGS5R9IdaY5qebKtbg4S2u0H/+jOw5f/tau++sYrBzBVlqFNtjShls+C2dEoR0WOdcOxuiA0YqnRUHzggx989KMfLYcGDd+y6od/+Idf9HP/+J1//I4TJ08e35+NHEW3Kabp4qXzN91007XXX585XG18T5Ls0Y965Ic+8hELk9mEXsMc0+fu+uyVV16dYGgUMpZnPP3pv/7a166vUuW3Z9aLXvizz33+Ty+VkzupjAzecN21d959Vt9o7hcvnDt2/DhJs+kjH/voIx7+SAst8XzYLTd/+GMfRTlpFgnEvL/J7YjwrPoHP/asl7z4pa0q9vvdeJtdy6O9oqmNa2e1J6tY5K4eWa8k7rnrzsuXLs17G8rKqM38e9oMbyhXVYjSHbJSWqfD7fa6G66f6DgHplXAh4VoOmkWIxlego9dW90qqc/RARgv1xjkA/YVYAGAne3XW92gcU8LwpuPuvYcTaGD3C5AA8YYtudvf+vbYJjmebfblTHCULj55ptOnTj5FV/x5e4rCU65k73326BYs8ulcvK4997PfegjH2meP9q6GcS5C2ePHztRVeHcLTlHTPP0n/7r/1ff+q2v/q3fuf9MYoXh51/8T37yeT85RVRWGCq8cjl//oIBMHfDXsxmm4LvDi5Ne5tbH/pwGJg1mSfxmc/dDUwlOI3xM//ohWM3AhhATP7in//5zBFTM9aaH1Ve3vwd0lhlsgHuPjPhkzB8M0NaKw/6mvDM2hgZcrIqM2eIeaLPVtq7da/SwydWu8lX1WTgwYJpmt1qr8kV7lXunm5lPlFND1cEvxg2ClP4sAnYXX0ssIJ9Ah+T69NSSpMI8Ob3o0idsNQqz47wopsHgNf85m+uY0/0FAf4si//8qxx/vLFvc1Mn2yMeW8fo8qQY4lp8phMijlRTomXvuyXIJSvp2MA8T3f/Z2bvWPLGGDRpk1MZczdEvP0X1792s3ePkvMXbJQwKXLB/fee+4BV1+dI30qx3zx8iIX5wjLUYexzHuTAUVOYRBpA0DExDhx4vjCmt1JXt5efuELfhZAAsh69atfCyjXrUdXUN6kwWlV7RntEWxtjBNsqUxZc+FM2syUbHyePNzbY9C6319PPHMC0QePqcMQZdPkFhJV5STvunx473a5e8E92zq7rfu2dWHwvsSlJQ93u/Pbwwvb7dltnj3YnV229yUPB3fkUnl+1BI4iQnCjGnSoZlhLRh6fKaDa13G7T4Ik0m1miuwlsmj0v7nG14PqD8FgBwJ+GMf81gznD556vj+8RPTfOz4cQ9zY1jMe3uTh4FweATMIqJYv/ALP28muT96CGj4xZf9ortN4dO8cV2pWQgrVET86I/8fYqi2mc1AH/pS16C1ZSuisf3N9uRgFelmdVSS26TtSxZjN32sA+YrFF11ZWng82f+Oa/+Y1YGRo3P/imv/W3vqkJ8rWyc9rMnz1dFshMZnVD0BHJCWmLRRAvdkoJzBi2XXZZo3Isuc0aI0dmZo5luyyZS9aSVVWWGJlVY6lljMyqpRZthPzXHzn7D999541nNoMeVkjLGkMFC8vCLcsdQ80jfXDQwidc3uZ9B8ttT3vUVXsh95EmxJbg0nbGKHbIRdvHdG0uYL4Q4eIrARFR1BqnJrcMY9YNN1z/idv+/I5P3v7u9/3pdQ+44tZHfv61115rFkDtljEZbHLISorIZEyxPTjYP358LQnEJ+DkseS2aBR2yAo7mrGZm9111z3XXX+doJ+W4hSuvvL03fecLTCzwsxj+sJHP/pPP/CBo4Lj1lse/oGPfcAqFuaXfvEX/8mf/tnRvfODP/D9v/yKf07Dxz74/kc86gumiMos4PbP3H7DAx4IS1i0z6ucZkQMBWTv3KgzGCs/G5VmEzA0vF+JmLCkTXHp0oV77rwrYrKIJUcI1vXm4bXkvfHOthnQQ4Nb7saVV18JVu52u/NLbbd5sF12u93Bdlw+2B3sdhe24+Kyu7Qbl3bj0i4vbJcL2+XCbnfuYHfv4eF92+2dlw4/cM85clSOYmaOzFG5q1wyR42RubAya6kclSNzsDJzydIfRtXCStbIsWy3hyR3h5e1ZGJtM8ygw8/XegEwC3vqU550+x23J4vkshzmMrKWzGW7OyTrkx//uL5VZcY8B4AbHnQ9yRo5dsuy6GVU5VI5ciwkd9sDXWsClISUREyjX/BycLgl+Xv/4/dWTtPRC/LYm/C/fRmAuz/32aoief111/R/dv/Gb/ymqhrcklm1ZI7KrBxVSWblUnpuy1I1mJm1ZGZxjLFULVVj5ODIylG5VO2qSm+hyMpURCSrKpNVrFGVVYo4raocHdFYVamvsVvGWFiJHElmcgyOoqhRg6z1n1FVrCQHuSPz/n/aS71YyyAzR+ZSOapG1pK16HWMXHIsI5eq5FhKDXuOGkuOJcdSteRYaoyROzL/4M1vwooj3v9cgZh98ujB/l/6+pvf8A1jGSxmDh2Vh4eHrPqPv/oqrQZ92zQHYN/zPd9d5G53OJYlx5I5llzGGMWxLFuykrl+avrB5v+PKpLLdjvGbtkdkvyiv/JFOnvMBbb1aw1zAFM4gB/8kR8iK2t53X/77fX1eriNMXLUsl1YHIc7rYDKrKzMJXNHJqsyszIzlxwLmVmjSg9w5LLUGDlGZY6xy1zIzFyqmBQLoZJZzOrPMbUU1s+usiq1/piVWVo+VW5eWUAaR43MGjXKl9K2zSW1nWop7Cp2iYXcjdppdycXclei0tvK7qKmWivH2lqyifvdAwkq+cnNUO6yIkmS/t73vAdHN+26MlyXZhev2ItJH5gFfud1r7vimqsuH1w0sxpVhdmjYH/2/j9B40xwIJeE4corr1FD5B6ifcUqmMhMwIRqwCBkFqA5Nh6GUo5GeEzTBOKd73rHmStO6a6rFArgxsa+RtaND3zgK17+S3oX3/A3vvFocb3qP/5aRIDpEWNkbJSeUURKQ62RuYYMKqPMrEZC/Hc3sGy6H3NW3HENuZVX1gCT1dEzyMxMkqwEqnRkNPxGnRqoqiWzEizX0ukUNcnSihzMzFZEk24Q/B1VljkBkzssgwUOXwMSm2aviLAmFSrFpgWPPYgWTaaKst7R9L7gE8z4kU/8ed8OFtaQm7hBOZZEgeHbHC2CS0TYxfPnr776ajOfYjaZTBvPH1xGF7FeBo8A+aAH3YBaBUrmZqFxClp+V1Zd+qqD9TAUdjVggapCouXAGZOfvffci372hfrIiZYju00AXvkvX/kXd9wh4sG3P/M7dMubmQWf8XeeQYIRFpjmKKELvjGfYFFuMK/KZm1yZW6bWTSj1BBUUkp23E6EwbxQlkqXoLbRSOSRnJEGRMMDoyRnZZLyYRQbiJzES5u1eulRVVHugWYG2Arv0UHOMIbI+G4BxwwHMdpBgq2FY9dkLYb1STHaVWZWQjLQrDBwlHsUUUWf7O1vf7d2pqIFAaxqeW8Nf5bHxBq992FGHh7unvtTP/2Pf+5nq4ZbGHhwuEPDHAVGuCfr1KnTyTzCgNUgJwmTywVwJObTkHqFhsiMyXcLAWLA2g03nvu8Fzznp37qIx/88Nve/rYadd3113/5k77yzKnTWiVVuHzpvv/0n/6zaUpBvOWNb6oqcwS8MhMMRxqsygLW0hFZqDh6EHSkfWiXEjP1jLLlJtbZb9I8LMzYPaf5ZIAmGtkCYAsQmKF5jlDOxjypAKaqrFw0JiCzkjXIZO6SI1VPVDF1gS3MZC4LR+ao2l3O4lgGs4b+i26ypWpUZo6lOFResDJHFxkqMDN3lVlMVo5lV8wiT548thYPfuONN/yHf/+qe87ec3i43S3Lbmzf+IY3nDpx/P4KwgAg1h84uHSRrGXZVdX3ff/3H30DAJ8cwL//1X/L4sHBJTK7zh0jx8hctocHKm4aD25SfP+4ttJu7EjWGFlj5G4s27HsNO4imSOrskYWx6ilikze9JAHOeBTAHjQDdeTlVWZI5ehAN1kMavIXMbYHlY/7lHcZaWKg+pCcGQuKtWLozhK1WKOzCVzqBbMLj2GqsaszDHWuj7XIjJZOWrJyqFab0nVdFNZ/dZfXH7B2z/zhdeeCKsluYAGS3JCGGpBThbJqWrQ4WAhatCdLL7z3ku/+7W3fMGZ/Qx2HlnbJjpRq5FNu0WxtybbZqttmNrABIm3vOVNFy8eTFN87dd8zS//0stv/ryHW3fYyMrw+aue/OTzFy9+7ZOe8vo3v0nSIxoqMU1eVb/8S7/84z/xbJTZZKdOat00gUH01XvP3ktFgRTBDjg1d5RMKewo3bvnaYL+VxqzVRUHwbCJ1na4VZW7HV30JTjN20sj/+Atb7ntU3cAQKZ5vPu9767ibtnubfY4eeW478LZD3/44w+95fOuuPLqeQrUZtSiX26rlquHAKp15P3tDiCzlKXQTBgC8Itnz91112c3+/t9rBfF0VmnIH3kqqCjVTNx6ObcHm6vuvrqSXPij1/enrm8gXGXKW81CzPfjcJsTgzW4uFL1QTONqrgs02c7ltqt9sC+03cA0gWEEhAzFcRSd2MnmgOMKrFaiUhV8l3frsbP/asZ73kn/5Tc5cum5m7pY0TC7nZzDT77296w9VXXXP27L0AMDDHNHKQeNnLX/bsn3wOvQCcOXlG94ymGL7x3Nln7/hs13ZmzeDRSkS0NU8KxWpdmeSekwA0Z5FTtK6vOWyqpTZ7VWlhVj21hjmNT33yUwCbJyyDT37SV1577Q0ENpvN5YOLz/i7z/zt1/2OQ2oZuNnXf8Pf+K3XvjYirMyYg5BmSsoN70vTYO2A1iQdj2rbOYdIxvKKUK0QcirpxS3zQ6GVbga6IlWKI2JjWQmfYHjU6b2HXbF366nZzRYMgxRvvYWzNwucCLMh5g/dMjeb6bO7k5VyLTcRZLX9qzTHtPW44FqRwNDyfBrM4bByFUr5lKc+9SlP/erMJcBcsszmyac5+mByS6MVivW6173miU/8SiQMWHLoYL/zrrszc54iwUc84pb1UqEBNgqO17/xDS+qPGK0W8O6ihmhwXfjskZt8JWKSmw2s6RvVgZ3zx4Y+TqfW9nZ7Kwm1ljin/3iL+xGAhxpAP7b7/4umGbx/7zilT/0wz/UN9H6Eot83e+8Lqb5j9/6R4997OOKNc9z1XAY5YqtOqLHHS1iOrJyaDwQMOY0bSyiV703O8bQ1XsLx63Qqn7h5ZO5b6Yp3CbCrca27NKSe9O0pSP7dDEr92i+jRlG+eSAjZFzVLI47PIy7jg8fCxOlSFEL7FChczxraxMCHWXkd5oLDpyRpYwRSLbdbloYxnY+BRThKKSKKdFceg4POJLvvTxslEaVU3qhzUXuRBuT37S18AwuS0JAKMI4H3vex+AiEnMcYidiKLbstQmKAVOf07d8+HYieM0sAoh97lCOxp1UsuRVT6t755pquf+1E8DjMly8MUvefFmswHx/vf/qVaDeC4+x9glgZgmwxiJxz/xiYeHB3vzvMuxkfW62NVtVXO/OgM0JOlcRxZlmLQEAZNUVma3PbqXHQKCHGazmcAHc2TAWTVqQG5Hp2aj2wGBLCMVWmmBqafUTsCL0yR3CJticjeGR2F2fPoyAVj5atIDkWxAlJWr5W0uHSFNB2Dm5U1M4bpBc6EbfHMsPFgc221Zj/bhlVwMFhYOqx1hltmeaEQTKzLLHFXjzJVXwW1ZMsKanGUYQxW5Lbul54mqwtFd7rve8Y4GTwoExEm/5WEPs1ZzRpPHjRR92QgTxQwUudbM3H/kR5+1yzHvb3Iw9qZn/dCPANgtuy9+7ON0QZAoYuwaB8sxSFks4Rl/9+9kWpvsNalN9C5dEyv1Nqx1p/08A0DVEPHFO1XEIEWCBUUiMcC8euRkcDFupfv0KcKNdeWenQkfdJs4PGi1Bl1P4umGnI6K7nJqRME8EVMc29idS4KZQXOXowwNcuYwCfY0piKER4TgiYL1apaLZbhxniYUdrvxq//u3504efy66691OGIyEIzAVDnKHbAtF9GXNytyqfG36FUjM2a76syVeiBgBTSxqt/8zde4wWwym5q+bF65zBEAnvvTzwPWLahFRHzjN/xNAFacQ5R4A8wtajUGKYSZjCVA+sHBwS//0i8BWA53Drz5f75+2psB/PEf//FyeGAR2jSPeOStVUXWdnd4080PbrNl4jWv+S2zMc9TFwfVx6sGsOzhM1BCU2wteYliLmkWJmUa5JYXRVpmwLMkLGtNDGABD3mnGWCrw9Ke21UbXFzKgKiyMjDJUETADE+rgJUfeeyJ+WDFPBF+9yV5kbi4nkqip8A3M4CKt2bnloAAXQ6iLpH/YJXxIx/66NO+7VtvedhD9/c33/u937vbLWfPnT97771FbHeHrNzttsixO9xi5O+/8c0gwqbeYwYAm3mKyYvD3Ql/6cteBoLW5Ep9wt/1Xd+VuWw20257OJLLsmQOPdes8Yd/9PvipgGreRLwoz/2D/S4y5AgZSdpGUJByoxl5lXqqnDrwx5q8DkcwM0PvfnL/vpXVhLgG97wegCzIniAD77//TqhprA/eNOb2AEh7rDdUiix6NwaOGbrPAAAIABJREFUoDAR8OOItGwiuqqgNJiX1ch03Zo9I0PJGk2mMiITmBAOTdLa80g9TUyTy/v6mv3NNscEM4c5JpjRBq3IZLutghisEMAIBnNUnXD8+cVtwRSTFX6/zbxZSBppOhx0uvZB0W9EB9oYw+G/+NKX/vprXn3H7Z8CEFNM02zAQx58I2vZP3bCpmmzt++b/b3NXG5Pf/q3ARg1lGqiw/bxT3giy8CQCuA7nvlMoJ1qtBwmtwsXLz/7x3+84PM8T5M3Gw8Ot89/5KM677TUJ0QVHnzj9fv7J2iwSeipqksZpdTRO5LIsYp/9ifvvv3TnwFqqQLw3ne9l2YjRxXf+Y53qzSJdhCKpcZuodvmmhseBFW+gQK34xDOxm5lMdO6FrEZDZ1G33N6qzRwWZaqdI9kdxYlUnCzIEnC1SkTRp3S+qX6NGi6yN3tphPTQVpaQzBD+k0xUR0wy+IcbsDOemmpVT69N3/2AJeXpQCI3kPTbpL0DaL1rRCR9cxWGkfx9hFhmePnf+GfABiJadItUwQuHxwc29v83u/9LjKzloODyx//xMdPHNscHG7X8a8oMATwguc/382YKe+BmKZn//iPoWuM+0vLl/+zV3zf9/1fZsiRMW3M/LZPfWp/b++jH/0o1i/2VBxve+tb3VnLImNlPVaLPhVYCZdskBEWZo/90ifY+iu+/el/99SZM1wWR5nhqquvBjCq8eas3eSyk8QfvvHNAOa9uT0pRgGKVF5vLveeiDscDpltA628NQMxDpeAgeUo62rTw9zc26nEHdFSGTVGkJHLGmIWm1kv1T7v1P5ut4jI5FzRGCcgo0qE2+Ey3G0iTLEciJE86X4x69OXhgEiwHJ9zQZdeC6Mud1gtAwhN7JMZqEmnx08deVVf/3LHgdgDNKtslUxS+Lrvu5v+DzP097x4yce/rBbD3fZ1HQdd+5m9oVf9Kgv/6qvRBDwgksb+uKX/NPJSHO3mBBH6/JXfuVfR0w3P+TGr3vqU2688caH3nLLbqTo7PoWHcyPftQjb7jxZhAeXk2+FZkDJTzYvaqyaGQlXv2aVy/Lbp5DC/BV//FVADFNNs2AP+5LHqvTRZ/wK1/5K1WByUcu3/L0bzFgt92pbD956jT6DO2pBQrKNRGlyCKITHbzIFHc4fZw6IN1J6QF7LqZVQZnsnc5jqZ3pQEeKiPCEbYsu2maf/u2e//+u+9+0nUnlrRyesLk/8OVQpluAQOzE1gYbsVxwjf/67MXn/8FVz3j4VdZsVjSQEvdJlkxWlC9piZ1FXSEDTfXsgpjLPv7x2CYxEnXogKmQMGKbkyYeUVi2FqSyp7mwtmzx06fDsMouhULo2pvnv/845946MMfJo6DVRXpHY+Fo9dBrPG9AIBjm72D3Xazie12ASzHEhGAVUmF2oAL1paTLNVJgiuEDP7bf/Nvv/O7v8uArAoPWO12ube/D5Zb6PjZm6Zrrr32zns+N3YN94TbyRPHz52/uNpqA3oKxaLFZIVCuZp1pcMXh4ItP/vpT49cYlK60fqYmT5NMpBxyBkzPISB6A2QYXm4TPvz9dc/0MXWfsTpE+4cWS6jFujobzWL1WpzBTkkpRcMqIpiXrXZ/NG5Q0cRkjjCYBHSURSVsQXSJq50ufWCM81i+4UBm735N37jv4IYY+xNMxtBxpD/d6UQwrTRTcOafPqZT99x/IrTrRZyuocBm2nOqs972C0f/rP361s9HCs4CMDDoyW5MNoEGBDAwW57/Pj+p27/C1EJLEJuv2qyOgtOYadtReBGe+Hzn69jucDjx/e//bu+S/Npc4zcCuD6e9/7fwIAUwrzbY3PfO6zyzZJTG4Asvj2d7xLyi2gPRXkcOFOsKxWTC1Rfeq6BsK7ZSexsmrN5jXC1VoErGjhc9s7aahgBUfAErmZZwOdVsNw06npis3euYQ7HSX3dyfDLaYVfSHAFP2/3LKSVkW7ct8/cUG+t5FWSQCl+Gw3a7M1BWeIswehlQFQAbZVpdAUlH3zt3zLa1/96zBsx9IfFcxWstTkDbv2oVy8/roHHF6+fN3117OsNBUXQ9UAMGJaxu7WRz/qttv+fH9/fwwZDckTwTJLAhACYA2AQAKnjp+899x9D7jmBjdDtqk5/7K8c60ShngGju1u+zP/6EXzHPMUID72kY+bm1eSMIvWJAGv/Jf//Mlf9WR1pz7HsWPHGm+Dj4LP8cpXvPLhj3hEW6uTplgoc7d2gYVJ2VdmEmDrhdhYdrIAoMtcc23rTFMPEbOZSgSFoeqIOE2zrIoImPlMC9ZexIOP8fLISRcjO/KH4DIyW67ZQWTFyQxgzIjFeMVsH7+43LUVLhD6uxG64EEXlZW+sjlauye6ztoK0cOMxcGqb/rmbz137t5HP/IRQrKIlt/BMGpI5ZXEqTMn/ut/ftUdn7lzs79P0JkWRJS1o620+wy3rHrwjTeev3D+uc99TmsbfPUjlL+BthgA4B+/6IXnLp2b55k5SrwVpsgmq3k1BIcXRbGcYX7TQ24EMJY83C2P+eIvuv5BD0Qt3Y9VmnuOQg33eMObXv/yl790Nq8lDy8dqtaB1RWnTnzu9tu/7wf/b1Kz+NGdI9kRCq1hUOyX00iYVwPgly9dFDti5R91KweJ+GTl4uaCGkhTZpfs6mjhvrd/jDAbu4HZovw577n9dz6zfdyVexeTSi4TfSS7uFTT2EeFS2UIp+M46o13Hr7kMVf/7YecWV/8ipJ1uds8b03uNfySR5GQn0JJNw9xeqxvnoPLh8/+8R/99V9/zX3nzzpsGbXZm296yM1Pe9q3/MiPPOuqq6+kTVajgVXJ9GTlKJf06lZcrjAGgyFZv/vbv/2yf/aL73nne++7dAmszTxd+4Drnvrkp3z3d3/nE77iK+RK0Fc3SFq09Q+NfaFqQkPCij5N73nPu7/sCU+48poHXDh39nCM+86f39tsqobhCDRwUwMPKy394h+/5Q9f/erfuP7a6x78kBu/7WnPmDZTLjVNaGGTfrB65saVqi5kxwBWYnII1Df7zGfuWJZlb95kyvOxZ3RFfQOZ7aCj1kwwZVutkofb7YMe8pA5ZsuxK8Nk8Z8/ed9z3vO5r77+9LnMjexozJJl5uJcSJF1NLQSwT8nP0m8/b7Lf/2KE694wvVsj58V6CN1qa4anbYdtfvnSz0bN3VUa5WWyWkT1iQRSI7ezryh1WXFqhzuoemQRiWSs7AyXBaVkPDLAAuvzAgnZPFHo4GDbkx6TK3/zEX5P94ylAFF+ckfKbveduGNFiCKqflIS2gre76o4bV7OyAK3QZyyZgnjbYNNAStRpYlYkIWpkkemDrmCzAWLZxZZlaaT6EpR04bqE9/6jaPmGVyDgNSmg0FGFOuP5k+u0R+YV4sa8cRAHzgjQ8m4LAwdxj+2pn9Kf0wa7Y+orthbWBUy0ltuJlxmJyrbAA3HNv703sv7yrNfHTuSPvy2arck6ZzNay6/8RWoaa6LrWMw+Y5SCxjN5bBGoaCdbxWgciRu90qdYVOK735Ish00/QdZkywJcRlLNZStdtmpkwhyicgzI1jVI0aiwFo0yJDKYFK+4OosphgTTZcfeoHaMsYY7fjMsYYBqp5bxCwevjWH3Fhmrxy7LZbJneL+Dm7cPfwosUU8v1NanbfFyAk6In7Eb6jru3g8kVmOlyKSKIUUrCODhJgYTEXB4tVKMXCmdFijN282deJKB9YAnbzmb3Te7iUiPYUabdwQslVdHNQv4OAhTAl5gK7ZjPdtsP77jwgqmQR2Xi5q+9qPMqALOqo0JXsvfn1Ww0GpoghYE0WUwTNKlFZyxggK5FwMVrdY9XJt4MtWSKfhi5dqpwTGoNpCgv3aQ+GylyysCysqkFYuCmGZiZRKdu9tZqGSf+r9N9OA+pEFjOEFafNpvNj18zFWiVXYki0K3+Q8Jhi3tvAEJPHFL7Z6O63/segIDYdBWyxlRmgfr4V7AoQ48HFy76ZpnluGLjYdDiWVP+63SUpbiq0s03BgCXH/t4s+NPLLGEFzmFfdNX+nbutZj4y3HUzD8gG1FVQGuGC0d0iYGGsk+TpPfyH2y56VUQ3mgCM2fWCOlljybGVkqK1YKeLC5nmuKz+QaIk+6RuSc7TxPAwm0OXj95ceccwNx7cDTiN5glktjtFVpJebHcwM0xeFgYCQVBOJrq3ASSo5S84j9DGkC8hYMaAG138SDnjTBGmxDAAqOi6BeIWU8dsQU6xVUVYUDpLdulAMtNQyTILCzmaitpS5t4Wq1Wlh0ivysuHB+E+crmfHcFuSdxApVq4efjITNLCNVHXZRDmx0+fImlBR1WUpPh8/Jn53K6ACkRV0bKAylJpI3aZmy1EhHdQBhPEzvB5xzevv+O+y4sZzLH60B6B1tYyTSXiEO14ratZFl66YteywiIQ4cIzNJIhZFApZViV+qqO5NCl4QamoWDlxUK42wQLc4YYWiEDVkjfEQopiR4XY33JmETCPqoJoVquhzAeIVi+EVNxh8KdRUvhNT08WNElkWVV7QpznMiwIrw4QLrwpimo5D1x88tgXllEex9TLK4eJ9GAC/ed51LhU2th5WF3BAtRKrQSL3yabHJtSUrWwKzNZp5EBElzD0Pb8OHx1508OBxdDbobIkXMCZ3+5fRkThAVUdaqZoal6srNZkv7rb+42zqYWje8gUwUoJCBtXPS/dNXbAejdOKZIs3VqtQ68zCoyA+36DAMX5+OC05SFWbkRMoAVb6DDgcdXh0xgNViEFbM4igoDXloGxrgQnJi0lDX+uZdqylY5TAYjrLKZePO4jo7MG0BFcuqkVTqS3VBufFNkNcF3C2KVqXwhnby6epBp4xwS9m0suk18CB44fyFeTMDPokTauZu2m9S7MjxVeUt62hxwkgzH7Xb2zu+FgKyaV35rw+74sSpjd87sPHakaiazdwttbsZaRk26VKq4vBaWLvU1TQefHrvX3/ksoW1O5Om4rCwqEIPa1lGhjB41yitTweqAyFgnmg7fR2kLGHvTFHHzCzWmL/GaVgk16QipopiU4vfeL53tWHQXczQ/AU6KyYAYUGTCy/EpW45JDtnwcys6OaVCsLrkQogUJMASkQJa94b29SsSSFW9FDGVlYu0oIXy4VQWSOPTTTTjRlN9vOW0RtXf7aDw8PdbjdvpqpVRVBMInQt6D6mrcP/9dBiqvzJqqXqxMnjoGKu11wLweInNv4FV+x99tI4FrNblLeRfekIcoZNbkUcOf45YIpzzaoHH9t86HB5y+3njcjKSUZ86i7Du7u2oG5UtYQwIAWdCXwBUCindw+DxhXMQ4vbLKrk/F1FpceXpDWducwOjQVpJq6vjgoo64ksZpobFEqoamfF7NaYBlUpVuyX2v+GQSEb3TkDJsDKXGbjXalpLVJAp7jRaGdByu3TAPMwFw+tQFSlauzMEmSmWbeeNvoJeUnxFlbg2XvvnqZpsI8+WFd9BCqLKxLoMgdpJ6aVu0aTMdDe3jGzmszo0ccy4JKLfN0NJ+482A3YHoqMBVWwYorjxDX5pMylD3P5DhuTdnzGjcfnX/jQ2UKFOaWYlWn5qusCBcQ1xAXoOBG6qS0szivK5CUP2NGbkRS6IsStMSFe7eXIhm5ZyUz0VRNg4zkkrBT10z6LtVrmS/GIQvMpraEnrVIk171WUuDDpFFEG/+YEZV9GvXy6duqTZ5wZGmYPGodcARCq6zVz/W7qW4RQIF83W1APgSVgOdu7A4Ppnk2IA1sbznKiEF+WIJ7Sobe0L5oa2Y3LGN38sRxt5BNqpEKcXM3Ogn3pzzw9FQ8uwyDT4YozGaTwjZNYy7rD607JIMp7tkPF9xyan7Lud177rpoHrBKzcFtVa27qoZEyRndc72bGw9WTFcBFF+pit1EAVK1EdC61I8UWpwh33xQ9pAh0/sG9mBYh7RBcyZ6smPBdW1CAJdZs5AoOzRq7CGUySDEeMXdek9rkMRV9iAQEHZkdsLeuKu/mhpKlcD9iYs4YjJCKGV3ONYGVExNSktW1Hs04O5773afZKZpICyx8iN0FjkwysLWyFXxMdEG6DCrzBMnT5aTqMEk1yXMUs9QNxybP+/U3h1b7pklSY8igSOjZeM6mYcBqTR7wlmjRo0Tk9902p//nrusBhGxpq+2Sb0yiDQlJslykN7RpwbQSaXb9PTmaIPp05dsgqp4RQ5Uadtbu+cRxRZWiKWuwg6ZJbxq1SnokZW7m09QnVjU+NNYDmExRxg2CaTBaGHtqe3utSIo9KbgqmZQUYQiwpqPpI+074ijThjCmcwMXQfIY1tlhCVghcqBBrdUevsY4+DixXme1CG7xglcLeokzy9IMwSkxJtwg4Zi7pll7nv7x00MGJ/M1mVtRseEhMG/6UHH7rzvMOYy+RIDgElnAXWe0DLQMoWbB00s5kr+1eN7/39Tbxqr63qWh13X/bzft8a9156nc/Y+k32MJ45takxawAESA40EoVRtWpVWFKklSSVCSdOBpGnUErVqmkSiVdQ2SIhOKB3CD4ZWdsxg4xpqjLEdHDzsM+/57GnttdY3vM999cd1v+vYEsI6Pmeftb7vfZ/nuq/p/r2Hyz95ZL8Cj6kQmmWz3JOmcNwm7de8Si0ZfjkiJJOTAOBVkYxWrRFJMhoQdQqV1zWKKhBQtHEqx0S4ftxD45Tt9OJDRvZRSkf6GbQL2Xs2nb3wZm+HICICgV6nBI3HScqh7DpsfHIX82NdQhQjlKpqRFJeTSvvkqhFdzQDEJE52ksznU5vx739jj18+KC1Rrb0Cj+zfeEB3rOLnYSFcVUFVoUykVqtl7vbOy2a72cbC0LpFXWEUpEI/Mi1vXHAg0WfDRTUki7vMdfRTKJ723Yhqp6BzYYWXK21vdHet7f7o7/18qqPDuiWVmNKFRTRIjoY4VhmUaz+H4WqtlSd6347fdF2Xy7lCaih1DbaYiuioQIhtq/DkrWz5tPrXl9ioPuiNtKzigT2hKMIE1HkVa51rnRRlT9h0hu9UJgfdVJkTH67lpCqcbIomXqvnHAXVUslTPW4Z0eRHlJsbXOzZ3jE7kgC6+Xi3lu3q2vB67oNRcs6Mb3mxrGguZOcYAsUbBjH3D1taxZAIUI1u0GVDhY68qnd2bft7by6P85mrRTDIoUZE0WP3m0+N9kiYey5EYx5vLZYvzmOrz3pX7v5GKj+BaBYQG+NyUyLncnSIXyX0y17KhZzmssNJSf5GWSbPntrf9PWFHmXMmQDqcL//hbyce6mIsL6golYawJGIgID6Sr20og5vcyJ9NqFGoaC8EpBQznP/7Y7+3qoQgEE2FI5WSA9VU7njnnvVmsgi9c8Xn1czABsp7DO1WIGkK1dOHu5Zx4dHa7HbIyw5wtpQwzCHd7dln8yUt3ZJPv0V+txvjlszLc0yVN+q6Yxm+h+2HqC7cef3bqxXI0jhCZl7x0QqXXJGgIjhVEckZKY2B6Gt5b61K3HX7m7/PffceLmX3jx/U/tqdBOIWXBwK32sntGzMzygUNgcvRFlcdfhwJE814SCwzdh0Npb8oweYnJ1EZ20WxEF7Ijwo8KCaZ//hp6soiqeqFUz6tNiCy6cQLPIh2eUWaaNO2YAMlENzgaTHnKDwrIYGROx5tqeLJfo07HAKb6g4LYvtgk0zElt0+kyNDizLkzzz733N7e3vpocbRcpBKtVU1j+dQABMcxJ5ufy7QkgX29XO2dOOnl0eYyzYGwjyu2wWkQ0csQhpX6h37t6xe3N1/YbIdJW4xhGdjTvbzOcpwrNiIOpD+8f/hw2X/ihb3/+L1ndjfmOW0cImfKkf7MZIqRVfgQx8YXG9QoEZWy+yZeAuWjQJ1mYAQ8CR/r5sXhGZqypP56po4hXhQ4rY/W13jR6zUHYbpS1JB9WkxETSlxidHoLzcG5JhsbRoLJ9rdnEEazojHe60Nfr21xDdjtJolayGqeUhNP49TT5qOCkoW2JJkdrRGiWP2OzdvLBdHw3y2MdtIqPzJLPJddfvWKRjkmLlaHj333AuMJu+PrybRDCDUExCb6OXHWs+Jf+3qia8/Wm4Ms163qNqxPxJIdCp3GnsMX3yy/OTN/e86t/35P/fcz33owu7mbNQ4WmCEiSakvPMhp0iRhF7Fg7atcurtHjApQtPvb9xRuzSNjGrpY2BiAOqdsugeqbXJ47c5pSI5PHYJBmbNA9N0mFeLkEN+iWFyBNmbZMwJVsQqoAzEMI2G6aXYVv6EpAPl1Zpa/yGiFT1gzaeyCn5b6FGmSgjhkiWfkS7E8zPpgTaa61j6rLXLV69efvppMA4Pj/rYjaC9yw++fona70NJGsdxZ3sHbNRklrGpl42Z3d4oq0EeCUjcXo4f/rXXP3x2OLExLFc5J9IEaFc27bShM//Z4/Vr+8vvPr3xsy+de//ZbYg9FUg0aJ0xzFK9VztPb4AUFSMiGMheP3KdA2aXUxAjomf1DGp6DswH1Jfqr9uMfAcbXLJrkt9VjtX6EBO17MOItWaSFuDTGMyK0TRpRhIuCfR3RiDJNplcILUaw3uHG8WzkEWBokKFdRRByebfrYAkgUCkxooXTzSo+VH1dURLoDbQB72ismeP1lAL4sy9JtRIIEPAo0f3H9x/K8SNzW0v9plMi6wFB0Eqjw6Prj7/3LzNhCnFM72GQWcfa5kIiW7x6NLG7GOX5t94vNjoimiWoxOYD3FimN1erj/1xuHmOP7iRy798vdee//Z7VSMPZPJxjEjlYkeMZsFD0fAAatC0yaoGa5FCm/hCJGhCLYatQOVCq0T2cDi7Q9eCTPFXtrjA9dsKi0k2BdTXVk1JYa8+rlOmWo3Y6B+BEYzyvSqmKxTpsYBT5PFPnuXaRVyN1PXHqqzDDV1YSkGr6BV/dxI1mcRjk9E8NiWA2W0QZwAhGk4xpj58ivXDx48ABujBbxmxG83iR6B06dPX33mue3t7cPFk9VqjGgBLxjMKHzD5XK1e3JvPszy7T0gPgATEjPXyBIu06+ih96urx/m93/i+gf2Nk9tDk+Uc2I7+NYaX3iw2FL+zItnf+xbzjamFMIoEhmNueoC+jxmiOhdf+sLN/6Xr93/wx965+7mLKHBm31YFlFlRkQeaw0TWVyXfRCe6+whs6ZomskDZ6C2SNISXukOLlpuPgSmkdoTKIoJ8eavaq8p+bBulg5AOY3+HkP89U6q4QRojpsB0MsxU1jdNfaGdakeNUAxq1suLFJjOrPglLLPOMd4U74UfGIr487dm/tPnhDYGIYLF5+azQe6n1rTunr/HgxBy4PD27fvjFpvbmz7J3Gdtcijw6Nr156Zb2z09YhGStEqRyOIPXvxb3WXWBRQQ2Pwx3/3zc89OPrImU00HiS/8ODo8GD9b75w8j98z4XdzSEhoUc3d5eJENYDCDT1/vE3Dv7qF+/eWy+4mv3gM9v/8NsuaQ6lBTujAzgyY7rx2H1AhdBJ9vQWcyjFZgLSRTiK0qUMaPyQyN5/g9kI88OltoSFhIoeqb4JKh3/CtQJjBA7S7uIAj1+IrxIzf3yE8It2ZQkkQmEkIxW46dXCFjIKsV54iCNgb0e0XpDFX7UJJTH/ChJIA6ePLl1440TJ/bUsDhcjOPq9N7pU+fOurp88k44YmhmhUrdv3dvf/9RRJvNZxKHiKPFYmNzfvnKUyqXRA/3COhYncvRt0f1grjSrhkD87VH+bFP3Xz3XlsdHX3+0fq7Luz9N99x7urGDMAICH2WXKMNkavsQ7bW0IlP33zyN//o3h/vL6/uzL/1/G5fLH/79uF/9oELP/7CXlbyqNFQ2Z8aMfnB/Rfts3BhXpOO5w4DPDdCcKKHkJmIBmR4DCpxkaXlMCPDHW1k9FwTrS52ONUY1cxRAIE1XCPenhhrXCm9E5OYITLsJ/N0jLrTXOFddSsWAxvd3jBImowyk0puS1AVXZPhGiCj0RYx9v7aq9fns41oA9QRQ88cVwtK5y5d2t4+EShXiYDGyLLfNUCr1fr2rTeXy+X29nYM7fDg4Omrz8xn86TswCxslCkGE8xxrYkQybrVXSlAP+s//qk3f/HNxXef2/p77z/5wYs7rNhdN+RGRCDHriECyC886H/7i7c+efPwXedOPLeFeWtjjtvAjTE/d2fxm99z8Z3n9mqHsoPB9tKxbJQWLRmQKGYNPVkfffNhi4IDXrZhCJAQp/gaS+sRADb4+FZPs7rWkVy2g3If1Ow0IVhgchx4HYQBCZ1K9NVtS6MfClBIdlSsVNPxUjwYhCk4RxRDlXLJA+vOAeB6ST/JqDk5wAwFb964sV4dbWxsHutTNiaP675cLDe2Ni9fvtKGIdWRxqFZlmaI0ZR6vP/wrbv3Fkfrs+dPX7x4RRgLVNc47mXb/tz7WBxtJNOM+jQaBwe0T984+IWXH/zChy/EfCN7ZlNlRIixd5DzaCBfO1r97Oduf+LO4bnt2UsnN3bAw1RnMrmGTrT21cV6/6h/9gevbbbw46Qpilbgdurf8JfqMSFJ9I6hEbUc1wqzoHS2zt+yEXRQvQsEauJindn+wlG0bopOC8UUBUR9eZ7Xs4bUukjLa0sUDCwqyRufNdmhq1+odszg+GLy9igGq6k1yaDcYiZErb1QQL1oE9tHVMroW/duP3z4eHd32zBlIkoAgC0oHB0d9eynz509tXfaN1qkKvd5vJKC7Ov+6qsvP33tmY3ZrAt0zxdrhZivVzLYc8Tbt6U5ZkBW3qI1FqWKtdTYBWRvPu/YGQN1mPrbn7/1Sy8f7G3G+/a29xoPQ0djn9d1W1/EdvCzbx0+c2LrVz76dGOyoqKAx470NCYAmRktnACZDPDyM4sIMrPbh1aVT6bsLZFHAb6h57pFba0WGD1yyADVPQKEame111xVA08pQ9W4CoZKU6pUiigquhLHaiHqaSpi0Vz+NHmG1Cd6rejRKEosWQuU0m+1YH9PuSvzsRYwAAAgAElEQVQQQcT+k0e3b9ze2dkx1nbNoG8tC1AQ2xDrcb1aLlsbLpy/sLW95Q8tlQGKXUJ45bAKYBXv1UF7UQomIzPprlKiRCCQ7pMrOI7MaAWBi+aJ7CtEtBgE/aOvPfxbX7r3EPrI6a3zO7EYY2nXbiiIUfVQeJCcR/7WzYPvv3bqH/xzl8AcoZYF7i1/mVILTs59WlOy0BE+1b0d3KSTsrOqW1ESczTTjyV7BTsqsEDnxxz9gM0ZjGSi+5CyJ8r4gcHsWSmSLCq6xhbQPYHStPDhWORoNSMbwJrU9zJEMFK9Mepig6oTyLoX/ePBF2SgIbg4PHrz1Ve2d3c5a+odxn3g2BWNmSU/lYycXK3XuV7NtzYuXrzcZvPpyDWasMhZe5+jDjAfFFEmHI95yrXUWNxY6WaybSm7YlCl8MXpmCSaoN969fF/9dWHX3h09J7TW8/vtEXKpFQ05OgN2RTqQA70jtiMPMzhMzcf/uR7zv6N954HsILmyY56QaOuPb/Zx42mQrXLTSSW/0/TdDqhPL/OSomeZoGaXSaycjL4pIqB8KuGMuta8gKmK/jYeK36GVCjcenNlMb6SWJin/3IRJPjYmTP3sL9ap1+ZGqmwXQmTqCh8MEgoo+r69df2d7Z8vXlsaz+O5h18NCqpJPhAWbXalxAPHlq79SZM+4Yy6JzbG4d652nU8Slj0y4urSMYDLVfXUJoILRK+gckQrS5QmKMb5+tPiP/uDub99dvHBq4z0nNoA8GHOwTGOPpvcDCdGiA0PPPrB1JLjZ8kD4vRsHf+ndZ/7qu8+wFX0QEXb1M8NSRV3A/rcajftXKKqi3kJOjDTDIdKkjhE/aubvXp+sNqm1LRoyp+l3EsWOywVNhBV/ldGma2s687NALSKILEkFx6I9SngNH7ZE7ap0cS7DvGbUPxB+FCqMCCIwrvprr12fzzaGWZU9hP8fEWT3XWBNMkqmKIwEtNbG1Xo1rloMFy5e2tzaBEqrK61xMgHW+z+Zbhx0Yh9X9JVTywpU4AqU5J7ISGbrieHW49V//pW7v/7G4dn57AOn2wAuECt0puYcSjoVUmwNPatsFVNpjdfVbzU+SX7qxv5fetfJv/Huc5rTfcg4fs8L7Bhvq9BVWVbCzaWaeKGwpcWv2PHLZqxARGs91TTd8T4IyyProwfKbNHKcUVmpX6YY6cbs2TiCBO2EMho0bvCV52RkAreRhg6+Gy0O7eIaden2EJjnvv4eKtFbWQf883XX4k2tDaTukX16VTMRAsC6miE5wFW25B6cJDQm6JD45i5Huc7OxfOnR1ilkov8JGT0aovvECYatRmd9GqV8RaJDQTOB1irKifoo8f/cRrn719+G+8eHEWOuh9NXYihjB86YxZqkcQHd2p9WRG+lNy8N7odaPxsOO3bzz6y+86+9dfOgu2hMog7femJ2e+dJRdrU0f/DEHMLFYbjcRaQs7KgMVie4z3UNjAdMsHaVnNoKIRJfQAgLUyYHqVeXko0Kg0uEw85HGnf6jwwzl21dX/U8GN34NaxDFJPYSBJIxWLGv16+LESTX6/Wbr70Wrc03NrJ31W1HA2RNdEkwOuRL2bx51+R8aNUqBhKIJ48fn9w7ceHSZRZUS3Eo2mXSkQSvqTXYtvMUBKPLv4b/pd1Hm8/DlDTjr3zfs+d3ZtefLKS+BmJQNGaEGjMKunUxm71o5CAiesnTZEMnRB2ldgL//FOnfv4rD3/2i/eotAskYEa5KRpc35LlxK8KHE4fuyl4X8ettSgzvJ1rYpb9zmEdTP9c8zWcg8OF4eu++iVlXimKtILQpeIiEu4J9/dvAdhHeX2lZBxbfQzR7QyqsWJKIbmQNFqmpqvd4nNzseEbr72WxHw+75mVIG1BsFtH8UlTjlFGs0BX+oqfao2ZYKAFIvu4ubV55vTZqRva0m5hfQeeClA6LsZKpPhxyYAHD2a1/pSnmsZo2U4P+MffeeWrjw5vLnOLBJwQdYt2qBtmp4TRb2U3C5QkGrEes9EGtbafeYLjn7m68z989fFPfe4Os5MtSSjYxmAGkJFQRTTK/jX2b2J+MHmtUSyZuUnS3UPTCWd73sR0s0opzDxFkYsNEJvRwTTzkMGqhkjfJr63aV+aWW9X+tfKIpFiVzpoa5hTvkrJ3WG1YtbYGaWCU4HVav3y9W+Q3NrYVhfS234McSa3ot8LJRAaJzfIFOd0uW09MxDI5fLw7IWzs80NMeULS5oCL56K5Q8oVSxA1K3rWzWC0wjlBdJ+6j0kBaLH8OHzJ/7Wt5777N2DVcdcSGRG0rsQQ0yGKNGp7GRS/p45Qi2aFNAojgEuMgbqz1/e/pXX9n/4d95c9lUokkBPex2VUaaGET6vGC1KeDAGcpJIrnoxElHphmYQCy42HxllvUS68Ff+kxqz0/X3dc6TUCg0jh48NRGkFc3Jjo46AVLEMNj7DxEtJ2xZKq2xDmy6l+PfnJ4UD5yLw4PXXrk+m8025htCtweMBqyuFPXbK6J2wnYEcxydgzb7pszWCoaxxdHR0YndvZ3NE0iod1tHEQ3R4hg4yC5OBqNZRRnHdcRxzrLIXy+RrRnXGR6F65Y8vf97n33912+vv/v8xtpKPsVe7rGx92HmcNXxT5vIClxqtPVQKc4iV8JGYN7id24dnd+KX/3ep88MLRGKrG4UJ3ptxw4/TM2AMcUYAG+X9kwSULdPM+B+ZtRgVxhbYKVU0qEmM4mA0AI9bYJUmV6KnvEwWp4+EhMo5fTmQp5y4BBNY4jwrVzGi0kzDLJ72DOsJQXev3f30f37w8bWbEbVkolj+F/ClyG5m8gS6SqY0rFAB6ZTgtLe6/WqI9fXnnmW0ZRrTTXtmGZtPwyoEYPVW4iM5oRBhPpk6U+wNXggU+lvtFjrqmTq733H0xcG/fHj5RaJDHZje99kyHIp+gV2DVkI0tr9L0LEZmOSTVgoF+v805e2F50f/NXrn7t7EEhf+alu3GSCqlsCJxRUkCY80IX6cH3TxfGh6UJTEu6HtZg7wPd9JXnk95manmxMkNF6toqaMQxxNVYVuic0aa4sYb6cBAkq2rRdrWPiQogIHivLBKQ7N28+fOv+fHtrGKKPaYXeNw0aIjBqcq7LnReeefxHTd009h3Rqf8Gab04unzlabKlEgynQ+UTp64sO0jIAjolTDHH0VeqZTd+E5J/mwaaRnJFMJENDXx9f/2R/+f6B87tXBjiUGiZLWJMxUytc0S9Fc2Uf/ca5mDtIsHEyZORo6Kx77b2tSf9n+0vfur5kz/z/outURijNzZJHRqEqm/VxAQVSsvBOIGo+ib4XplsDIICTW6owzHZ5OsSx0mB8sKV+FSnAtIc22S6nD4jGwgMXxyjn4Sp40iwULoR3CEohksL/RdXq8XNN28l+tbmpt1XKK80JyHEx7a1J1rTl6YlDcfnnhcUilK2kIJPHh+cuXjh7MnTRQya2CxKvnBhETkTNmGJQajYlB+rGi9M4bJEBki+LO3y9JCC1NUTs//uQ+d+79b+IrSpXEPrzKFJvWUwGUBGA9I0VZ2PElsCZLc4YfpKPdAe9XjnTvuOc1t//xsP/5XffOXe43VTY7Mh065ruvHYTFSZFBReKuiOWRW/q2ktICCXp4xKQUVlGOCJQLi4w80VHlunlI2cZ6bAVO/q8MjjsgXUxQ31mt0gwQlfpDoJJnJaBU5THWKwCXjw8MGrr76iwOZ8q8PMVaTcf+8DSMEWtYQkAmpTy0Bd76BZccj7doyX2uH+wcm9k2dPnRanylhOA69bDE3rVVYKGQADrYititNKls/pSQxl2tOk0BiO+kHMYOtggj/y3NmfevHMx288WQ+xGXXPuDWosSdc25VTw4KPtHozhyQRa4/oaJk5Uz5a40zwR586cbvzpd+4/t//8V1XN4gtpeo8dFiURShKrlMCfNMY+YH2tKeQ4Wx243DsbkW43KWnekYMzCj1Zgp2N697rqnFeNsLAJJMlxxYSShvtCUMqmB4DHW/GcqluQRmMNfLV17+xltv3dnc3tnY3Eh09Ex6E1udz13Fimb22rGUk+rhl5qIKF5mKuhRDLFYLWfz2YULl1ETJahsALziEVHqDANoGaok1eRRhqZFhPL7a+YYrBRJ+lnpZFfA+A0KdDRKfRT1sx84/7GL25+6dThstCamHUkIZCMwSl0cux9s1lHjaz0UdGCiT8+tWtOK8WTMD52aXTk5+w/+6K3DcYVGcR1qtsiBLcFERDlkWpiUKsik9GLiANVpFIzjFSfFUqdEZEyD5ZQAkj8QQb13a5Lwitw+pUTQ6L8nQQ3H34lqYG1WIyD3FxjfIFrUiavkbJap2WxzYxg0TrlCx4FFThHgY6Rhw000q6QZLM8nnOJ1HRg0zObrxRqZl688baxDRqgK1HPUhGwFAjkKWTYGgwoVrRcud2Rm9lIMj/kJvxz+oKPTjSwg1Dqk5uK/aP/TR668Y3f26TuHsxmbRhlqQ6jRTv61hijy+vjPHHunFw708s83cOw5G/hgjTce5ae+99r2bN57J6Coi8i8QFWwSlDPjM5uRqhc9cEqzUtricyGMq9pAuwMBTs9pHrURRE+Mn9FLyJgxBBlqxO7/FSJrqjjRFKb0wRRjwS7OPiSdFwL7uxVXL12dbVY9hQcsSbBKgQshcKPbCimXD4gBLtj036XeUxtkYz1erlaLy5eujzM5lY/pC4axXs5VVcWZzt9s9UFGGUfFCTjJTKaM4IFW+009rJUY05bIR3jTnfB2/w8DrP269979VTmFx6s5nAlRHfPz5g9gIFiYMw4bl+wjtSihTvMAolIoROzYIP+8O7yh69uvnRho4OB1l0ECK5B5jrIjHWXf9MI952EcvTbwmmq8jXnqYdSwr0RqLHLaCEK8jeSEZHQpI3JxjgT0VCFEmukiF62vqrUshxsHQ5jdiAiETBHE5gW3YqazTb2Tu4cHR4EZ6qGiWr9VrrYlg3U5PGGKFFjDzo05mPYx4nvFh0cPDlz9vzmzo4qL2Emzf9FAFxfZBNMFXUL9LvDqjyXGGqm0xJKx0CEbtOlqdGp7g2kNdwM355IlyH1zO0WH/+B5w+PVl/aHzcroa1Ab4ox1XxBo7cWcuACxfaksrnLoE5ORMStRd5bHv7cBy8ioqv3pga73vgv/+bLP/G7bx6seqANNE2KbAE1djJ47IICyvdmyra8IceenSIHItDM/hpsZ/aG5j82UP3AKX/m0wDqvY+q9lMXyhX8BogItCFagHcOF//gi7d/9cvX2ZcmaVLpa+LshYsprPuyHl5ZP4mI5pYPkFFSozjQTVS+6L2jihOXrIijw4PTZy6c3jsjeOcJgapG1zQvs2BvfTj+MiuCmOtwTUCLYKWDKKBXdMlTM90KOHG+PbsBV7gT0r7hLHSfp2fDJ3/whfur1VcfL7cHOrUwkGytZ0aLkRhX8hFnycNjs9LdgwiiSYH47L3FX3vvlfPb0YG5vIQpAX3twfKf3Fp+/N74Pf/3a3/nD2/eXfRgNhTcH61LdqbUiFpI6E8jR7n/FcloI0YvEFUHZW9UGqhGMKugCMXRuYfo2B0UzX+DkGPJyRCVQLgSLQDhlUerX/zK3b/7pbuvLfoC7c6tWyiKzByHhoizZ8+slyPJqoxMpnrChKqL2T3wx9TDBSJaM92ZaR8fYnFwcPLkyfMXzqnJ5DgCChOvAf+tOclu9VD7DUWN5Yz0/dGTOa7Toy5sS/Pfgw60ir8Zbr19StkOqMm1qBpJskV74+H4p3/zlfM7m+/ZGRZYj2ozgyKqqIMcghJ62gcCK4hpCuXELL76OA9Wi9/9gWfnQ1tLg5XukLL94CfeeHO9/M6z228erL6+v+zUnz23+W+/68K3nprHgIqMZhcCGgODWC4r9Q42m5knx65fJMJxwkZW1MM3ZIbC7EFVHMP3ZaJ7PFXLGAPwvW+WMrns45fvLz59a//2wWp3a9ibz9etncx8T97/9nde5XybqhRzRGTmq69cb4xhmKUJVNvyodaKNQtGSkCyNZTs7xtELQDG0cH+9s7upctPg0L3upuCA2bqwuZvmdsFy67nS9PutMIIdO9YX4+u8Ku71lOOz1pbyjTFJvx4mZlvVSf/9qXqfyTi9ceHf+6fvL69NX/v7myVmWQqGgRmgDlZm72BuFvVFhKYDW3d83du7P/Ch8/9wLPn0NWpBvQc28D//fr+T/y/d37k2ZNSF7kRfNTxtQeLx+u8ujP/0Wsnfvjpnad2Z2HXUj3ICSAzwRahALs/k+QAjMiwH7pMPawfxUdDoqfa0AQqx+BQo58ZD7QWzJoNsep67dHRH97b/+PHq4NRl7bmJ2eziOw9lwywXV3vv/9kvPDsVWaO6s0LoYOHT/bfeP3myZM7foGzFi+LjC41EM1MbBRgA5yP9jLp5dHRbD6/cu2qrVM+2rMMURapRzpxnx0Rx4dDwD5cMuw1kB/QIJm9T0Z0nxEZ0QqAlo5bKLpPKz0trSVYRWkIkcocQyBmiPvL1fd+/Eaif/js1tGYOD5zgmA0pP1fVg8IAJEaT27Mfu/OwaXWfuP7r2TMvIvXhqUx8e2/+vXTW5vPbM0OkTMoGJGcDf2h4vHB+vUn6wX0jhPDx66c+P5LO+8+szMrYUYTwEQfE+iMgfX2uOgKx4ZeKjJSHS4dQKC8u1I2lz00HWuhwkH2V+8/+aP7h197PB4mtmc8vTHbbZJiVKyRpCiu0PfE53P5p547N9vdRaY0NvuJkjdvvrE8Wm1ub/Y+2h/q1wOZfrNbG3ofOY3Fw2BaX0eLxXw2XH76Wph6SjkA1xplo44RdfUxZ3CoN6T8ijIgLsm0hk+V67pcHd/E4fbsQ2sQEwh1cQrTFV1cJHcRJaVyEKEEB7b93j/6a19fY/bBsxtIrVyzFpIM8ALKtLUPIjXTsED+7u3Hn/y+5951arOn1BVDSL2x/fyXbv/9bzz+nksnDnoPQexNjcGEGmMTSuL+Qm+sx3sH6xz7tRPz77i092fPtvef2tjbnm82023TM+Kh24H0RimZA8LFERq7FGjZomGqFCFKrYmDvnr9wdErh3njYPXqwbqn5g2n5sPO0Ni8JSbG7tmIkaKwoqj15SFeisMX3vF8B6OPQlP2NszG9fqVV65vbu+SytFl/QRVQMU/J46PLnucdHR0tLO1cfnpa9M1NjWSFviucqwpuxal6PlJtj4l8dgnI9NcwUz2PkYwO6pxp8ZiqndGg+SRXwSnUAMm+xlQ5q0SJpz+cSwRse79X/r0G1++t/iuSztBPQZnHS1SYGP0OjQQPTKwhf7pO4c/9OzOf/2By0kk6rwk9dZy/PCvX//g6e3doZrXRTVhpdrOCFLIOTAbGqGDMe8tcPdo9SjHXOviJp8/sfnOk8N7T269eGrjwvZsbxg2psrDOmK17hpadIojTApECoscl+t+88ny/uHyzaO8cbg6TByNORs4G+YnW2xtRAhd6qM64XYflEcRHQhlKA7Qz7V8vh+8dOXUzukLgd6r3QBq7e6dGwePn2xvbY8y+3fcnilX+tYHS7sD4ujwye7u7sVLTwlJacwcwuzQOEVuAO+CtHxUPIYJb/lKKoTBt0/vzIzW2Pva+mltoncc3B49QBV6RTGMogmPGJiqFe/JIpETRiORWoNDdPY2/lufvvHx26uPXtzaIZ4gQxyQ3mZnq2HHsIPx9YVuP1l+5l98fndWMlBHp1qTfuwzb3zurfV3Xdx4MsYAdSbE3nMYGmGpD42xSq+VRgvOaM1Ji9SDVT9Y696qH/V1Y2Cd57bb2XmbN13b3vzG/vKHnt77d148XQJEtCD+5N7jf/Ty4905H49jdi6FmLfdiNnQtsk5xBZ0KyuxdnbHli/vvSMGuTwdtNE61VOng//C8Ojq8++IWUNfgYMBmsSXr399Ppu1WVO51EPpPpnWwgmZCHAc14ujxam9E2cvXZ6Ix+MhEmXMSYKKcF3c8XiKYiNgA3A6I2lQYE0ix3QBpbUUrxsgxbTnfpJAaWnYl4Rd+IGiTwY3LbHaxO2LNvjInhGB9kvfefU//aP7//BPbn34wsnz83aUqxEtNJoKDIlaI4YvP3zyd186uzsYHw/MVWgA+aXHB5944/Gfefrscszo2Qf/FjKqTUhE61xHlVkCXHcuOQZEjRHt4jww1wu7TdgYFUc9+3r1JLEY25e7PnP38NoOEadz3UFm9mixv1y9drj41u3dMzEMgS0Sra0zKWBgtwcABDNgdC2IY45mD3JUD6TQEGOoCUNwBJ/E8AaG3Ttvnn3qWrAhu9rglPf58xfu3L611XZ8q9XGMpDoLqIJoI/rw8XhhYuXT+3toTtBnhUi8mwU5s2b2z9lWTXd8TfdOujAsZGIJPrYozVIHBqkgX5P61ihlBVZtnQ9ZvdISgAN7lSyWNRcKJAVH6upTVW7UNo7Au2/eOnke7bx01+8/Y7tzfednB8lFwKUQ2tj9u3Gf7q/fHFn9heePw1GH9cteiU1+vgz/9+9Z05ubQSPxhQVaOVYFkaoeYhq5eWBvcuuKJHIloqlph76VERutx6tnRqa1rG31d5azp/dngPKiNaqjvbkfOP89mxvaKvUWloFOXY1dAhrC1tOxsbURQCKI9NDrIv6IsTMkMToyRZYEm/w1PlHt06eXWxsbtYXBEH9xN7ew0ePVsujza2dzLELg1cTRQsqoi0Pj1a5unLl6u7uriA0odTMtDWmRgi2hANq3ZvbxBC6tUUSVEspQt1JC4CtbigK/nMwiQKm5YAwl+/NQwoez2MeXdyV7DZyr2qRmTWkyEaCytEgLmNECvGvv/PMx7/vmUdjfurOQTbtTF7MFrkvvbm/+Ln3n7alAI09M2MW0P/6ysMv7ed7z2wu+wrswVaZYKD4SSIT7BlM1+i4P9yDrQAhGdnIxg4ioXWydx6ttFIejuNKsQKRtagJVABrKdVWUJ+SUUlWnyyhxgRGIAOaImJj1YYEotVeQ7WOqWmT2dSHvr7f+ZY2H966mYDUkCNbvW5XrlxZj6kciRiqbib9LR8eHYzE09ee293dAbp0LKcEe6SXFVnKrW4U2awPEuhuEy6FHnYHR21qEhhOLDqzaFZMlMKF8lbVpInK1xRLMVGW5nGD7gjjMHHOUZti6f/ZHdBloBpTPcf3ndr5/R+89s7T25+88WR/pZ05iD6P+OMH4w9dPvmdT52SRqH6mwbF4Zg/908ffOspSy4kBgHSqExGS3v50MXIoLKCkXV7Of8CSeHpz7sjBoEMVEdrzy6lBjaEbHQCmHKtJZyP8z2dUKDbAQZ0Ra00J+p4arXAwBKJdcAsE21KxTVzbHyLmw+Wy4P9h9EmzV4JqLXhzNnTi8Oj4241xEzS/sGTzY2N5599ZnNjXs5rJFSnAssyZbELiNLFbW42PV/OXKiYqUngLCIuYTbMzp6wHITomBRwD+Waxgil1QB355qE6lVKh46KPJebRiQUY+GdihAOYLJ19e1h/o8/evmvfMuZz9w6+MaTfno23B7bar36Lz98DlViHpA0BHP11z9/t4NPbc7HNdmhsCpZG1YcnACrP8ReKCY6k8wqBppYf79rIGUmlwEOqcCsRTDHjqnfqxqVo6W61j3duB8toJ5Ahv0ZlfvuJn0r8RWlm6qsZ2JnUeiG9iB2M99o80fa3H9wz9hZx/041LkzF6K19bgiI1rr6/VieXTx/PlLV64CoRQld2pU36cqTickshtDsDIZZdeeaEl/QbQB3b0nk6E7IyLAhDl7ZbmlSdY4iwp9efSeZhVk3S5BUm4Gss0dxrqZCiUyW9CuYE4VaEOqpTLXAf61957/v77nyq1l/8SNx79/9+Cn33fxxHwQ+sjoUBMa+JUH+X/ePPjgqTmgREarMq7j3zTQU8lUdL8VDLFbV2DL1JjysmEx4ei7Um4my7TAyFQjRgkdAhvQEMxsLeyxYOPgtsSIiLCMw+lqzXBVGaYumVKzAUbFo2lpWHakSF0dnV/V5sFCh3fvgrWgQlDvmczT58+Py2VPLQ6P1uPqqStX9/bOAtmVQvpornS4qk09BEaw2SAUsEtSHWKKY+/u6EmzAwJtrnJbnl+vtLHfeYCIrDz0ZBS1Q9RGAiBr3Pd8BzilRpEqpU9Ci8n6JVHoaq3UFaUpeDPf7JLYP3J2+/Pf//wHTm/s5PInn99LxFivpwPR+ptfuvPszuzUTizc5UBCHHsCpERx3TUjOyCLz0pRw8AAM6VANNp4H2oFddHKaV9ibERq9AqC8EdWPtssk4zcy+Js8GhhPWVJSMcmPtYrlGAHBqoMcYRc2BtJ5Vgaec6Gvo/ZLezsHzxeLo688A7T8Xpi92Rr3H/y4OSpU88+98LGxpatoFGSsyoJ5LHBXKMz6YIzW6whk5bxh9ZoPdZliWVgSE1iWyDYKiICcEC5SkGhHJbFLsASPgZWi5MbXdxUY/Pn9FO5jcU/BWQCsYhzlC3PNBpasHeB3Jrxf/vuZx4vVzkQ6DNlN4cM/h+v3vvcw8VHL+2sFmrR2KWsBa0jehPa4MEn7G+0C10Ju0cCYKYibJNcgw0iWyIbJQ1AVxXaVurWr0mdkCw9UQAqnB/dzS9kg4oTFqIFOmbiKDDsqzBqAYJZyKN1SOjNLl9ykLry9RzOadh6fHu2+awVhVSoZ2vtwsUrKZ3Y3Ya7tmIyzWjy58lyBCIpl/GpHJNq04K0DrqtsAqpp0weWm2YreY9E5QaCxuiOhartVq0plcAgiKBLhGsAuLjs0TFqAZdiV+EYdn94m0NQWA3WIE9i9GCpLp65MmtWVNvXWtC6Tk3fv7Lj1/a2xg66JwxAGaD5tFmDLYhU0mMXqDg3RK9Bg5Lk+7RcWwhNHoDG40GMUpi0SVKqPvUZ8uqmfDHKw0DGGkPq5DKTlXxS88wnkN37q0Wwokdyai1mK1R6IGYRTMOD6pn2+G4r3YrtvrDw/3D/adOYVsAAAwgSURBVEAjsg2gqOw7u9u7J7ZtA56eSbaIsD1mYqVNCJqrrriMWzmo6aKub7CjdC9786I1TOtOM22D0hD1D0Sk2FqZCpVThNIBBwM5An4iRYLZc0ojm263xlZFSf7LKPEeDr1FoCMc+6Tg/mmC3oCWti3b1M2f+Mzt15d5ZXdrDGaoc0xHiipbQ+ZIYMZBhrsFyMNFdVFKm59HdCUGqz/Tr6VIPwciPVPZq5moJT1AGWTSnVJG7+F6D5HJaXYXFU3hvvkEIyx+WEUEiAaFyy4lSL2ziTmCMeTLyzgYtvvd2713qdphLEVPXLMxgr+Zml6CA+rBrcYOgnAyFVnGI5oEEAoWkBFjJoAxR4vUFkXsoCrbBwBpeqSSyY7pP4FA0ImraZ4NeU73diMAqkVOFUzixJNPW18ShFppaZSZ+ca3qXoiBjFa7doke3ae3xln0CdvPLw/Yi5ucYieXenTaZSEISm3GDIawCRWmdOtmqXshAvixNH+V1vCRKYYXszXcyxY7P1wkCdALxIXitnx79e8qEQSWvfYVuXR2aFobt2R19eUvap3hFoLgyPIlvTeyZ2OJ8IfHM32F7x//y2imd8jitlIx4dg4SkmiAppJFqdAGR2yItzyylUQq65VGn01zmpejljK/ZZSXpXDFirbTJ95ELVnVPNZQTKFEIqEsdeTIY9vqaPiXqWCUBp7/Q3vYx1W/Rqq6jVkWM994kEMtl9HAOBTg7973zo6c/98As/dm3rtfuPP3n/4N5yPDmbbQ9tlh71EUzfYoiUkshQziswz2k1svydGoAj7CZ3/12EtwiKUkOqiWg1KZpZsQMX7F3pZRrhOIc9QUpkmxRnsLpoBgnZlZnlEuiOaLCrN7MWANHmEYvU9cXqwWJ5X/3slQvnL5wDO+iriWjmO8owD2Rnokpbv2l9kI/MVvAWaUApqZkIirDaXWsho4YGYUqWuMtCAlynqhapQaV9F+hE6VRFZRg3+B/ziNLqE4+qzJG6DRR+knTcAsao3SRyzU80QsjabBW0bOYQZ5Y/DVAfxxND/CcvXfnL787/9utv/fI3nnz+/pMX93bOb892I1bJcRTCOUxG45QEoZDNG+p7D0aKQyCDmSMwuOIrAyNc3taDUzQn7dTucDscEN0lEeGAxNybfUW4Ll0KrwIKjtlbRPRQqDWOnWJUfWGT7X+Ds4iNA+Oo91sHiySfO3PiB85vXTq5VUN7dzkOj4frEqtRVgEDg+Lt0Ke5yEt4muupaHMUshWgAUtxYy3GLJTvlT8gWRxm0n2JkoaSJsQSNm19CrBXJYCdUChrO5yfpL6pujrLWn+8l9lBB5LqVUjMVnnVZkbAli23hGTJ7ED9+j0V1N5W/Oz7L/yV9174pa/c+x9f2f/y4/XFTTy7NT8714gYW2PP7EmqJ4eB61Sqd6CRa/NpY59FAyMrNFPCWCNTbOxQg6LNkJLYso+sojsi0CE6NzIggQFyxWvdvWCkBrjQr0PsoxukVLxu74FhiBgSS+je46MHIzbUP3T+xA88dXJ3ax5K9N6hgfKFVyDYd7lbhIoxnv6f38/JyOC6VhMLrv9xtsxYlLWTkhjA/nYiRmnwYZStAOiSOgmBoXxy2UXZyzDF3ewnMf4DGpU9q2nYIc2Quj8Z9w5VQmVSyACT7F06nj98YPXCbhThK8kkBcbMFoPfmZTYY3vAX3zPuZ988czHbx78z68/+dSdg5a4tDu/vM3N0Jxt3Znsq+ym8WZkdlPmHCPWZLgeNdJsDFLdE7MayWCuc02mbWljhZMy4Z32mUyiIZXRmhJgBpW1HKqONlMEVKoN2UfGvKEhRvTHS9xdLJR5dXvjo1c2v+PCiY1h7pllYscFNqQCRttZbjnab0v7Cyw2W0Aosx/hqcNb7FMdbGbdWkBoHqmLhzO+n1RKuCQ72PwbqJxRSA2sIKSYkWUJLq7F7FWGJuk0oszs9UB7OGa1Q9ZCFI83Pmgc3kCRca76Nxi3m7u5MqZcTKnBnDGmLu8hs0ePbC0+du3Ex57aebDWL7/y6FdeefCFe0sB57aHixvzUzO7Qto6+1pBrTVG4yT2EC2CXtTLMYjMVty/WhcrUZ8xOZ4DTBkKdNsMi/tKeQ5FMQMOfiFrtzMU6m1glx6v+/2jvhp1agPffm7vT13YempnZsYotQZcZWXbEqd9JxXOq+KpLrjzz72hxreT+WCysVbnrgmPygBPFaQddmKU7TXg/atCVKrBHETNiikb4QYjgwIINdqUMOv3vQUhd5PDPaz+uz1/sdzJaka8KJ7MXuUSWQojtdFtr43qiEZVOjuz823Pcx15UCg7wD5DG7Mrk8PsdONf/JbT/+67Tr960H/l5fu/cfvwS/ePuri3HRfacHYjdmaZbabU2Os7pZJQqs5Cyg2yYoKDEBgtnUenupJoZZeyHtVNxviENuigGpVVYaihrMvqisfj+GCpo+Vydza8a2/+bWe3Xjy1M28UPdR0ko2htGxt9C7AF6jzHwoqxeYD37DQO/uKK1LJRsegYEKGgrN0sMXVQR0iFOH9WwAYg41+DHTJW845tRMGYwgQ4XUT9W/KPHZeEl6La+198jNPMa7yXzmnkLBVxlpDl4f3mqZZ3RyT3QZQXyuGAAxajPlqTwIJBNHJydM32FCXPav7pD23Gz/9vnM//V7eXevTrz74xO2j33u8+pP9kcT5rdmp2caZjdgIzBt6Z7Tm9EciHMPonQjOUkrMhqGWyXtgQlZjIZWARvXBJuWgFE0BxyOUwXXHw9STxfrxKgmdafjIqe0PnD91bXdriKLqVFe7WoRGJdP1pVmA4DhxXZ+43LfnDKfh/FTjan4wJNuwOA15YrBLYbGaylHlgglf4Qig044PvyXTR8sW0YWAp/EcnFRwVqh+espNJzLAyUTzmt4kSDekB5B17lPhg7S4SbO9BMwdouBcWRlqbGniCIzGNCpOOJtLH6IJKXp7AEMd0ZzhCAxSwjABQOD8RvzQi2f//DuQxPVHiz+4t/jMneXvP3jy8sO1hnljnpjPTs/GHWJr4NaG2sAYmeQIbVHbAzc0WjUUnURhG9jUZgEk0Qa0WQ49hLFr1bUec5XjozGXYh/XpzZmV7eHd1/eeffe1qm5i3nCToHerYD7Ah+EzgjzBkEyq2IncexZBv1WRMjiIQXXxsJtFcdMYYcIXyQ+2FsglRPF7i6RKUCR9GhdMlRxJI3Re49ojUqFn8ehXuESn1RUW9aiCAbtA5meuHQNYMQgTG7bTE5EeXlgnfpwArui1iW3EC6tLG+OVSEy1NPOAriN28OKbxca5iZqhSOIQCqpGNHNIQ0U+I5T2+88Nf9Xn8dal+4uln905/DrT1ZfO+gv74+vHiwPhUXn5tDmkbPgTouzm8Pddd5ZAd5WYKWYOupxf7W6czT0zFXm2FdroPecBQbG9sZwuum9Z7bPz+Idp7b3NocZVBojlL5AMyE0M27y3s5kWkLzOVRUSsGGFFugZ7KTA1yEaI4GVQRmNAG4wiTr+YDndfbURDO5pMJpAk5+uWMYwASC4eqEaN6VhGjWaW0ZKUOUv1QDP4T/gs8AT6DT8llwKFHDreqhWj8tKao73g2K8qnP4wm4oiag6wqQylY9mF7bMFV51t6OjEbI00q9GkQimsgGf7rpkOWI6Dlq2uv01PbsqedOAYlkJx6u+o2j9Sv7q+tH/fajozsrPRx77+Ojg4P1YouBlfqsBHTdOOiPlsvFeGJno50f2rl5bkec2d44vzGc2sTJ+XxmplBWMDNFTI52So0BhvVpCdXrAw/aOWG0sJIc04tnZiBYReETKeiHxZQw1f2BwKoTBTl1AdLwltEdBLLUXAOeX6IqDSWbPLFMsDFIdEi9tYGpEZqmgwr2Fk3FzNTUwgDiuMkGEtBcQ+NxwjcF/a+Y2NLm7mirAzLHUDizMrcwH1HlYqY+/et6LVw9pTyOzHeoFspPRjlUk1AfjRRDg1r30BRjAyElorlkZVJphZ6p5HC/j8PIMxsN2bssBudKXKy5M6i1KZlTBx9KJmcvlXFK6aIe+OmkLC3F/y6RcbwrG8fF8oKLYhktM0sQTLFFQnIJh/+I8vVP7W1D6S9mFRgOGRZNUa3VAFjehCBL9BNYy2bdUgRr2BizZBzy/wctAQUkYLgpBQAAAABJRU5ErkJggg=="
    },
    {
        LI:"data:image/png;base64,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"
    },
    {
        LI:"data:image/png;base64,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"
}];
        
const LI = document.querySelector('.FPC_LG');
const fpcElement = document.querySelector('.FPC');
const FPC_LG = document.querySelector('.FPC_LG');
const FPC_CD = document.querySelector('.FPC_CD');
const FPC_TX = document.querySelector('.FPC_TX');

// Initial display setup
fpcElement.style.display = 'block';

let LIC = 0; // Use numeric state to track image steps
const loadingIcons = LoddingIcon.map(icon => icon.LI);

// Function to update background image in sequence
const updateLoadingIcon = () => {
  // Avoid unnecessary timeout nesting
  if (LIC < loadingIcons.length) {
    LI.style.backgroundImage = `url('${loadingIcons[LIC]}')`;
    LIC++;
  }
};

// Function to handle the display based on screen size
const handleDeviceDisplay = () => {
  if (productID[0].productID !== "0" && localStorage.getItem('DL') === 'T') {
    
    localStorage.setItem('DL', 'F'); // don't remove it.

    if (window.innerWidth > 1200) {
      FPC_LG.style.display = 'none';
      FPC_CD.style.display = 'block';
      FPC_TX.style.display = 'block';
      fpcElement.style.display = 'block';
    } else {
      LI.style.backgroundImage = `url('${loadingIcons[4]}')`;
      setTimeout(() => {
        FPC_LG.style.display = 'block';
        FPC_CD.style.display = 'none';
        FPC_TX.style.display = 'none';
        fpcElement.style.display = 'none';
      }, 2000); // Adjust timeout as needed
    }
  }
};

// Update loading icon every 2 seconds
let iconInterval = setInterval(() => {
  updateLoadingIcon();
}, 2000); // Adjust interval time if needed

// Check and update display at the start
setInterval(() => {
    handleDeviceDisplay();
}, 1000);





