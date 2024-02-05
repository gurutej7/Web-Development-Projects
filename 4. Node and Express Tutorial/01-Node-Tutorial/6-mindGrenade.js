// Example to show that , every file is a module , without using " modules.exports" , we can still be able to access it

let a = 10 ;
let b = 20 ;

const addValues = () => {
    console.log(`The sum of a and b is : ${a+b}`);
}

addValues();