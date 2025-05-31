let transactions = [];

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

const amountMerge = (left, right) => {
    const res = [];
    let l = 0, r = 0;

    while(l < left.length && r < right.length){
        if(parseFloat(left[l].amount) <= parseFloat(right[r].amount)){
            res.push(left[l]);
            l++;
        } else {
            res.push(right[r]);
            r++;
        }
    }

    while(l < left.length){
        res.push(left[l]);
        l++;
    }

    while(r < right.length){
        res.push(right[r]);
        r++;
    }

    return res;
}

function amountMergeSort(array) {
    if(array.length <= 1) return array;

    const mid = Math.floor(array.length / 2);
    const left = amountMergeSort(array.slice(0, mid));
    const right = amountMergeSort(array.slice(mid));

    return amountMerge(left, right);
}

const dateMerge = (left, right) => {
    const res = [];
    let l = 0, r = 0;

    while(l < left.length && r < right.length){
        if(new Date(left[l].date) <= new Date(right[r].date)){
            res.push(left[l]);
            l++;
        } else {
            res.push(right[r]);
            r++;
        }
    }

    while(l < left.length){
        res.push(left[l]);
        l++;
    }

    while(r < right.length){
        res.push(right[r]);
        r++;
    }

    return res;
}

function dateMergeSort(array) {
    if(array.length <= 1) return array;

    const mid = Math.floor(array.length / 2);
    const left = dateMergeSort(array.slice(0, mid));
    const right = dateMergeSort(array.slice(mid));

    return dateMerge(left, right);
}

const nameMerge = (left, right) => {
    const res = [];
    let l = 0, r = 0;

    while(l < left.length && r < right.length){
        if(left[l].customer.toLowerCase() <= right[l].customer.toLowerCase()){
            res.push(left[l]);
            l++;
        } else {
            res.push(right[r]);
            r++;
        }
    }

    while(l < left.length){
        res.push(left[l]);
        l++;
    }

    while(r < right.length){
        res.push(right[r]);
        r++;
    }

    return res;
}

function nameMergeSort(array) {
    if(array.length <= 1) return array;

    const mid = Math.floor(array.length / 2);
    const left = nameMergeSort(array.slice(0, mid));
    const right = nameMergeSort(array.slice(mid));

    return nameMerge(left, right);
}

document.getElementById('sortSelect').addEventListener('change', function () {
  const value = this.value;

  if (value === "amountBubble") {
    amountBubbleSort(transactions);
  } else if (value === "dateBubble") {
    dateBubbleSort(transactions);
  } else if (value === "nameBubble") {
    nameBubbleSort(transactions);
  } else if (value === "amountMerge") {
    transactions = amountMergeSort(transactions);
  } else if (value === "dateMerge") {
    transactions = dateMergeSort(transactions);
  } else if (value === "nameMerge") {
    transactions = nameMergeSort(transactions);
  }

  printTransactions(transactions);
});

function linearSearchByName(array, name) {
    name = name.toLowerCase();
    return array.filter(txn => txn.customer.toLowerCase().includes(name));
}

document.getElementById("searchNameBtn").addEventListener("click", function (e) {
    e.preventDefault();
    const name = document.getElementById("searchNameInput").value;

    if (!name) {
        alert("Please Enter Customer Name");
        return;
    }

    const results = linearSearchByName(transactions, name);

    if (results.length > 0) {
        const matches = results.map(txn => `"${txn.id}" with amount $${txn.amount}`).join(", ");
        alert(`Customer name "${name}" found in Customer with ID : ${matches}`);
    } else {
        alert(`"${name}" is not found`);
    }
});

function bubbleSortById(array) {
    const len = array.length;
    for (let i = 0; i < len - 1; i++) {
        let ifSwapped = false;
        for (let j = 0; j < len - i - 1; j++) {
            const id1 = parseInt(array[j].id.replace(/\D/g, ''));
            const id2 = parseInt(array[j + 1].id.replace(/\D/g, ''));

            if (id1 > id2) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                ifSwapped = true;
            }
        }
        if (!ifSwapped) break;
    }
    return array;
}

function binarySearchById(array, Id) {
    let low = 0;
    let high = array.length - 1;

    const idtoInt = parseInt(Id.replace(/\D/g, ''));

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        const midInt = parseInt(array[mid].id.replace(/\D/g, ''));

        if (midInt === idtoInt) {
            return array[mid];
        } else if (midInt < idtoInt) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return null;
}

document.getElementById("searchIDBtn").addEventListener("click", function(e) {
    e.preventDefault();

    const id = document.getElementById("searchIDInput").value.trim();
    if (!id) {
        alert("Please Enter Transaction ID");
        return;
    }

    // Sort first before searching
    bubbleSortById(transactions);

    const result = binarySearchById(transactions, id);

    if (result) {
        alert(`Transaction ID "${id}" is found for customer "${result.customer}" with amount $${result.amount}`);
    } else {
        alert(`Transaction ID "${id}" is not found`);
    }
});


