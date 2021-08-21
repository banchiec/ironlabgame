function sumArray(numbers) {
    let suma = 0
    // if (numbers) return 0
    for (i = 0; i < numbers.length; i++) {
        console.log(i)
        // console.log(suma)
        suma += numbers[i]
    }
    return suma
}
// console.log(sumArray([]))
function maxOfArray(numbers) {
    console.log("prueba")

    let mayor = 0
    let string = ""


    for (i = 0; i < numbers.length; i++) {
        if (numbers[i].length > mayor) {
            mayor = numbers[i].length
            string = numbers[i]
        }
    }
    return string
}

// stringsPrueba = ["ana", "mariana", "sofia", "Juan"]
// console.log(maxOfArray(stringsPrueba))

// function longestString(stringsPrueba) {

//     return stringsPrueba.reduce((acc, curr) => acc.firstName + curr.lastName)

// }
// const reductorSuma = {
//     firstName: "ana",
//     lastName: "Espinoza"
// }

// console.log(longestString(reductorSuma))

// reducida = stringsPrueba.sort(() => 0)


// console.log(reducida)



// function isExitString(stringsPrueba, nombre) {
//     for (i = 0; i < stringsPrueba.length; i++) {

//         if (stringsPrueba[i] === nombre) {
//             return true
//         } else {
//             return false
//         }
//     }
// }
// console.log(isExitString(stringsPrueba, "Elena"))

stringsPrueba = ["ana", "mariana", "Juan", "sofia", "Juan"]

function noRepet(stringsPrueba) {
    let igual = ""
    for (i = 0; i < stringsPrueba; i++) {
        if (stringsPrueba[i] === stringsPrueba[i + 1]) {
            igual = stringsPrueba[i]
        }
    }
    return igual
}
console.log(noRepet(stringsPrueba))










