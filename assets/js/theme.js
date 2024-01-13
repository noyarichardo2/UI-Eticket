$(document).ready(function() {
   
    $(document).on("click", function(e) {
       if ($(e.target).closest("#search_box_widget").length === 0) {
          $(".overlay-home").remove();
       }
    });
 
    $(".mob-menu span").click(function(){
        $(".main-menu").slideToggle();
    });
 
    // Depart
    var departDate = flatpickr("#date_ticket", {
       minDate: "today",
       dateFormat: "DD-MM-YYYY",
       defaultDate: "today",
       allowInput: false,
       altInput: true,
       altFormat: "D, j F-y",
       showMonths:2,
       "locale": "id",
    });
    // departDate.setDate(new Date());

 
 });
 
 
 function overlayBG() {
     // Overlay BG
    const searchBox = document.querySelector('#search_box_widget');
    var divBG = document.createElement('div');
     searchBox.addEventListener('click', function() {
        divBG.classList.add('overlay-home');
        document.body.appendChild(divBG); 
     });
 }
 
 
 function paxSelect() {
    
    const plusButtons = document.querySelectorAll('#plus-btn');
    const minusButtons = document.querySelectorAll('#minus-btn');
    var fieldInput = document.querySelectorAll('input[id="number-input"]');
    var getValue = document.getElementById('inputpax');
    var paxCount = document.querySelector('#paxnumb');
 
 
    var adultInput = document.querySelector('input[name="adult"]');
    var childInput = document.querySelector('input[name="child"]');
    var infantInput = document.querySelector('input[name="infant"]');
 
    plusButtons.forEach((button) => {
       button.addEventListener('click', () => {
          const numberInput = button.previousElementSibling;
          numberInput.value = parseInt(numberInput.value) + 1;
          const disabledMinusButtons = numberInput.previousElementSibling;
          disabledMinusButtons.disabled = false;
 
          const adultValue = Number(adultInput.value);
          const childValue = Number(childInput.value);
          const totalValue = adultValue + childValue;
          
          if (totalValue > 7 && childValue > 0) {
             childInput.value = Math.max(0, 7 - adultValue);
             const disabledPlusButtons = numberInput.nextElementSibling;
             disabledPlusButtons.disabled = true;
          }
          
          if (numberInput.value >= 7) {
             const disabledPlusButtons = numberInput.nextElementSibling;
             disabledPlusButtons.disabled = true;
          }
          if (numberInput.name === 'infant') {
             if (numberInput.value > 4) {
                numberInput.value = 4;
                const disabledPlusButtons = numberInput.nextElementSibling;
                disabledPlusButtons.disabled = true;
             }
    
             if (infantInput.value > adultInput.value) {
                infantInput.value = adultInput.value;
             }
          }
       
          updateTotal();
       });
    });
   
    minusButtons.forEach((button) => {
       button.addEventListener('click', () => {
          const numberInput = button.nextElementSibling;
          numberInput.value = parseInt(numberInput.value) - 1;
          const disabledPlusButtons = numberInput.nextElementSibling;
          disabledPlusButtons.disabled = false;
 
          if (numberInput.value < 1 ) {
             const disabledMinusButtons = numberInput.previousElementSibling;
             disabledMinusButtons.disabled = true;
          }
       
          if (numberInput.name === 'adult') {
             var adultInput = document.querySelector('input[name="adult"]');
             var infantInput = document.querySelector('input[name="infant"]');
    
             if (infantInput.value !== '') {
                infantInput.value = 0;
                // infantInput.value = Math.min(adultInput.value, 4);
              }
          }
          updateTotal();
       });
    });
 
    fieldInput.forEach((inputY) => {
    inputY.addEventListener('change', () => {
          updateTotal();
       });
    });
  
    function updateTotal() {
       let sum = 0;
       fieldInput.forEach((inputY) => {
          sum += parseInt(inputY.value);
       });
       var allTotal = getValue.value = sum;
       paxCount.textContent = allTotal;
    }
 
    
 }
 
 function cabinSelect() {
    let cabinF = document.getElementById("cabinflight");
    let checkF = document.querySelectorAll('.cabin_flight_option');
       for (let i = 0; i < checkF.length; i++) {
          checkF[i].addEventListener("change", function() {
          let nCheckF = "";
          for (let x = 0; x < checkF.length; x++) {
             if (checkF[x].checked) {
                if (nCheckF !== "") {
                   nCheckF += ", ";
                }
                nCheckF += checkF[x].value.trim();
             }
          }
          cabinF.textContent = nCheckF;
          // cabinF.textContent = nCheckF.trim();
       });
          
    }
 }
 
 function roomSelect() {
    var minusBtnRoom = document.querySelector('#minus-btn-room');
    var plusBtnRoom = document.querySelector('#plus-btn-room');
    var numberInputRoom = document.querySelector('#number-input-room');
 
    var minusBtnGuest = document.querySelector('#minus-btn-guest');
    var plusBtnGuest = document.querySelector('#plus-btn-guest');
    var numberInputGuest = document.querySelector('#number-input-guest');
 
 
    var fieldInputRoom = document.querySelector('#inputroom');
    var paxCountRoom = document.querySelector('#roomP');
 
    var fieldInputGuest = document.querySelector('#inputguest');
    var paxCountGuest = document.querySelector('#paxnumbhotel');
    
    minusBtnRoom.addEventListener('click', () => {
       fieldInputRoom.stepDown();
       paxCountRoom.textContent = fieldInputRoom.value;
       if (numberInputRoom.value > 0) {
          numberInputRoom.value--;
          plusBtnRoom.disabled = false;
       }
    });
    plusBtnRoom.addEventListener('click', () => {
       numberInputRoom.value++;
       fieldInputRoom.stepUp();
       paxCountRoom.textContent = fieldInputRoom.value;
       if (numberInputRoom.value >= 6) {
          plusBtnRoom.disabled = true;
       }
       
    });
 
    // ==========
    minusBtnGuest.addEventListener('click', () => {
       fieldInputGuest.stepDown();
       paxCountGuest.textContent = fieldInputGuest.value;
       if (numberInputGuest.value > 0) {
          numberInputGuest.value--;
          plusBtnGuest.disabled = false;
       }
    });
    plusBtnGuest.addEventListener('click', () => {
       numberInputGuest.value++;
       fieldInputGuest.stepUp();
       paxCountGuest.textContent = fieldInputGuest.value;
       if (numberInputGuest.value >= 6) {
          plusBtnGuest.disabled = true;
       }
       
    });
 }
 
 paxSelect();
 cabinSelect();
 roomSelect();
 
 function disableEnableDate() {
    const typeFlight = document.getElementById('ow_route');
    typeFlight.addEventListener('change', function() {
       const inputReturn = document.getElementsByClassName('date_return');
          if (typeFlight.checked) {
             for (let i = 0; i < inputReturn.length; i++) {
                inputReturn[i].disabled = true;
             }
          }
 
    });
    const typeFlightRT = document.getElementById('rt_route');
    typeFlightRT.addEventListener('change', function() {
       const enabledReturn = document.getElementsByClassName('date_return');
          if (typeFlightRT.checked) {
             for (let i = 0; i < enabledReturn.length; i++) {
                enabledReturn[i].disabled = false;
             }
          }
 
    });
 }
 
 overlayBG();
 disableEnableDate();
 
 function closeSearch(){
    var closeSearchWidget = document.getElementById("searchbox");
    closeSearchWidget.style.display = "none";
    var btnChange = document.getElementById("change_search_btn");
    btnChange.style.display = "block";
 }
 function toggleDivSearchBox() {
    var btnChange = document.getElementById("change_search_btn");
    btnChange.style.display = "none";
    var searchBoxAvail = document.getElementById("searchbox");
    if (searchBoxAvail.style.display === "none") {
       searchBoxAvail.style.display = "block";
    } else {
       searchBoxAvail.style.display = "block";
    }
  }
 
 
  function availSelectList() {
    const divAvail = document.querySelector('.flight_item');
    const checkAvail = document.getElementById('lion1');
    divAvail.addEventListener('click', () => {
      if (!checkAvail.checked) {
       checkAvail.checked = true;
      } else {
       checkAvail.checked = false;
      }
    }); 
  }
 
 
 let borderInput = document.querySelectorAll(".wrap_date_field, .select-text");
    borderInput.forEach(function(borderInputSelect) {
       
       borderInputSelect.addEventListener("click", function(e) {
          e.stopPropagation();
          borderInputSelect.classList.add("active");
       });
    
       document.addEventListener("click", function(e) {
          if (e.target !== borderInputSelect) {
             borderInputSelect.classList.remove("active");
          }
       });
 
 });
 
 
 
 //On mobile
 // if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
 //    window.location.href = "google.com";
 //    console.log("mobile_")
 // }