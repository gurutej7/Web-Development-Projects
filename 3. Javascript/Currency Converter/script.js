const baseUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"; // URL to fetch currency coversion via API

const dropDowns = document.querySelectorAll(".dropdown select");
const button = document.querySelector("button");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const finalMsg = document.querySelector(".msg");

// Adding all the currencycodes from the countryList as options to both from and to selects in the html
for(let select of dropDowns){
    for(currencyCode in countryList){
        let newOption = document.createElement("option");
        newOption.value = currencyCode;
        newOption.innerText = currencyCode;
        newOption.value = currencyCode;
        // By default values to keep selected
        if(select.name === "from" && currencyCode === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currencyCode === "INR"){
            newOption.selected = "selected";
        }

        select.append(newOption);

        select.addEventListener("change" , (event) =>{
            updateFlag(event.target); // target is used to know where the change has occured
        })
    }
}

const updateFlag = (element) =>{
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];

    let newSourceLink =`https://flagsapi.com/${countryCode}/flat/64.png`;

    // Image is in the above tag of select tag in html
    let image = element.parentElement.querySelector("img");

    image.src = newSourceLink;

}

const updateExchangeRate = async () =>{
    let enteredAmount = document.querySelector(".amount input"); // it is a element
    let amountValue = enteredAmount.value; // retrieving value from the input tag
    if(amountValue === "" || amountValue < 1){
        enteredAmount = 1;
        amountValue = "1";
        

    }

    const URL = `${baseUrl}/${fromCurrency.value.toLowerCase()}/${toCurrency.value.toLowerCase()}.json` // Custom URL based on user request
    // .value returns code in Capital letters but url consider lower case , so .toLowercase method is used

    let response = await fetch(URL); // json object of type promise is returned
    let usableData = await response.json();

    let exchangeRate = usableData[toCurrency.value.toLowerCase()];

    let finalAMount = amountValue * exchangeRate ;

    finalMsg.innerText = `${amountValue} ${fromCurrency.value}  =  ${finalAMount} ${toCurrency.value}` ;


}

button.addEventListener("click" ,(event) =>{
    event.preventDefault(); // Button in forms are automatically submitted (refreshed) when clicked 
    // Prevent default method is used to prevent this action from happening

    updateExchangeRate();
    
})

// When page is loaded for the first time
window.addEventListener("load", ()=>{
    updateExchangeRate();
})