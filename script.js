const transactions = [];

const firstNames = ["Alice", "Bob", "Charlie", "Diana", "Ethan", "Fiona", "George", "Hannah", "Ian", "Julia"];
const lastNames = ["Smith", "Johnson", "Brown", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin"];

function getRandomName() {
    const first = firstNames[Math.floor(Math.random() * firstNames.length)];
    const last = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${first} ${last}`;
}

for(let i =1;i <=25;i++){
    transactions.push({
        id: `TXN${Math.floor(10000 + Math.random() * 90000)}`,
        customer: getRandomName(),
        amount: (Math.random() * 1000).toFixed(2),
        date: `2025-04-${String((i % 30) + 1).padStart(2, '0')}`,
        type: Math.random() < 0.5 ? "Credit" : "Debit"
    })
}

const tbody = document.getElementById('transactionTable').querySelector('tbody');

function printTransactions(data) {
    tbody.innerHTML = '';
    data.forEach((txn, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${txn.id}</td>
        <td>${txn.customer}</td>
        <td>$${txn.amount}</td>
        <td>${txn.date}</td>
        <td>${txn.type}</td>
    `;
    tbody.appendChild(row);
    });
}

printTransactions(transactions);

function amountBubbleSort(array){
    const len = array.length;
    let isSwapped = false;
    console.log(array);
    for(let i=0;i < len-1 ; i++){
        for(let j=0;j < len-i-1 ; j++){ 
            if (parseFloat(array[j].amount) > parseFloat(array[j + 1].amount)){ 
                const temp = array[j];
                array[j] = array[j+1]
                array[j+1] = temp
                isSwapped = true;
            }
        }

        if(!isSwapped){
            break;
        }
    }
}

function dateBubbleSort(array){
    const len = array.length;
    let isSwapped = false;
    console.log(array);
    for(let i=0;i < len-1 ; i++){
        for(let j=0;j < len-i-1 ; j++){ 
            if (new Date(array[j].date) > new Date(array[j + 1].date)){ 
                const temp = array[j];
                array[j] = array[j+1]
                array[j+1] = temp
                isSwapped = true;
            }
        }

        if(!isSwapped){
            break;
        }
    }
}

function nameBubbleSort(array){
    const len = array.length;
    let isSwapped = false;
    console.log(array);
    for(let i=0;i < len-1 ; i++){
        for(let j=0;j < len-i-1 ; j++){ 
            if ((array[j].customer) > (array[j + 1].customer)){ 
                const temp = array[j];
                array[j] = array[j+1]
                array[j+1] = temp
                isSwapped = true;
            }
        }

        if(!isSwapped){
            break;
        }
    }
}

function amountMergeSort(array){
    
}

document.getElementById('sortSelect').addEventListener('change', function () {
  const value = this.value;

  if (value === "amountBubble") {
    amountBubbleSort(transactions);
  } else if (value === "dateBubble") {
    dateBubbleSort(transactions);
  } else if (value === "nameBubble") {
    nameBubbleSort(transactions);
//   } else if (value === "dateDesc") {
//     bubbleSortByDateDesc(transactions);
  }

  printTransactions(transactions);
});

