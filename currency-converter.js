const Axios = require("axios");

const getExchangeRate = async (from, to) => {
    const response = await Axios.get('http://data.fixer.io/api/latest?access_key=a2ab0d3fe47da5db6d49dcff6bd5073f&format=1')
    const euro = 1 / response.data.rates[from]
    const rate = euro * response.data.rates[to]
    return rate;
}

const getCountries = async (currencyCode) => {
    const response = await Axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
    return response.data.map(country => country.name)
}

// const convertCurrency = (from, to, amount) => {
//     let convertedAmount;
//     return getExchangeRate(from, to).then(rate => {
//         convertedAmount = (rate * amount).toFixed(2)
//         return getCountries(to)
//     }).then(countries => {
//         return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend these in the following countries ${countries}`
//     })
// }

const convertCurrency = async (from, to, amount) => {
    const rate = await getExchangeRate(from, to)
    const countries = await getCountries(to)
    const convertedAmount = (rate * amount).toFixed(2)
    return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend these in the following countries ${countries}`
}

convertCurrency('USD', 'INR', 25).then(message => {
    console.log(message)
})