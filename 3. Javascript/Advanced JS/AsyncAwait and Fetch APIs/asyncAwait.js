// async await >> promise chains >> callback hell

// Synchronous - blocking code
// Asynchronus - Non-Blocking code

const getData = (dataId) =>{
    return new Promise((resolve,reject) => {
        setTimeout( () =>{
            console.log("data" , dataId);
            resolve("success");
        },2000); // 2000ms = 2sec
    });
}

// Async- await
async function getAllData(){
    console.log("getting data1...");
    await getData(1);
    console.log("getting data2...");
    await getData(2);
    console.log("getting data3...");
    await getData(3);
}
// Doing Async and await with out extra Function

// IIFE => Immediatetly Invoked Function Expression
// Refer MDN docs

// Promises Chain
// getData(1).then((res) =>{
//     console.log("getting data2...");
//     return getData(2);
// }).then((res) => {
//     console.log("getting data3...");
//     return getData(3);
// }).then((res) =>{
//     console.log(res);
// })



// Callback hell
// getData(1, () =>{
//     console.log("getting data2....");
//     getData(2, () =>{
//         console.log("getting data3....");
//         getData(3, () =>{
//             console.log("getting data4...");
//             getData(4);
//         })
//     })
// })