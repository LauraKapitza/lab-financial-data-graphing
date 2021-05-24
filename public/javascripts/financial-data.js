const $input = document.querySelectorAll('input');
let startdate;
let enddate;

const apiUrlDefault = `http://api.coindesk.com/v1/bpi/historical/close.json`;

const getBitcoinData = (from, to) => {
    let apiUrl = apiUrlDefault
    if (from != undefined && to != undefined) {
        apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${from}&end=${to}`
    }
    axios.get(apiUrl)
    .then(response => {
        printTheChart(response.data)
    })
    .catch(err => console.log('An error has occured: ', err))
}

function printTheChart(bitcoinData) {
    //get the bitcpoin data
    const dailyBitcoinData = bitcoinData.bpi;
    
    //filter dates and prices
    const bitcoinDates = Object.keys(dailyBitcoinData);
    const bitcoinPrices = Object.values(dailyBitcoinData)

    //canvas
    const ctx = document.getElementById('bitcoin-chat').getContext('2d')
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: bitcoinDates,
            datasets: [
                {
                    label: 'Bitcoin Price Index',
                    backgroundColor: 'rgba(92, 89, 245, .6)',
                    borderColor: 'rgb(92, 89, 245)',
                    data: bitcoinPrices
                }
            ]
        },
    })
}

getBitcoinData()



//
// EVENT LISTENERS
//
$input.forEach(input => {
    input.addEventListener('input', (e) => {
        switch(e.target.name) {
            case 'date-start': 
                startdate = e.target.value;
                break;
            case 'date-end': 
                enddate = e.target.value; 
                break;
        }
        getBitcoinData(startdate, enddate);
    })
})