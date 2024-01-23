// Fetch API   ( Application Programming Interface)

/*
The Fetch API provides an interface for fetching (sending / receiving) resourses
It uses "Request" and "Response" objects
The "fetch()" method is used to fetch a resource(data).

fetching data from a api is an anynchronous work
fetch method returns a promise

let promise = fetch(url,[options])

*/

let baseURL = "https://cat-fact.herokuapp.com/facts" ;

const getFacts = async () =>{
    //If we do not mention the options in the fetch() , by default GET request is sent
    let response = await fetch(baseURL); // returns a response object which is a promise  object
    // response is in JSON format  (1st promise)
    // to covert JSON to js object .json() method is used ( returns 2nd promise)
    let usableData = await response.json();

    let para = document.querySelector("#fact");

    let index = Math.floor( Math.random()*5 );

    para.innerText = usableData[index].text;
}
// we can also do the above work using promise chaining also
// function getFacts(){
//     fetch(baseURL).then(response =>{
//         return response.json();
//     }).then(usableData =>{
//             let para = document.querySelector("#fact");
//             let index = Math.floor( Math.random()*5 );
//             para.innerText = usableData[index].text;

//     })
// }

// As compared to promise chaining , the code written using async and await is looking cleaner

let btn = document.querySelector("#btn");

btn.addEventListener("click" , () =>{
    getFacts();
})

/*

AJAX => is Asynchronous JS and XML
JSON => is Javascript Object Notation

json() => method returns a second promise that resolves with the result of parsing the response body text as JSON ,
 (Input is JSON , output is JS object)

*/
