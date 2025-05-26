const transactions = [];

for(let i =1;i <=25;i++){
    transactions.push({
        id: `TXN${String(i).padStart(5, '0')}`,
        customer: `Customer ${i}`,
        amount: (Math.random() * 1000).toFixed(2),
        date: `2025-04-${String((i % 30) + 1).padStart(2, '0')}`,
        type: Math.random() < 0.5 ? "credit" : "debit"
    })
}

const tbody = document.getElementById('transactionTable').querySelector('tbody');
transactions.forEach((txn) => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${txn.id}</td>
    <td>${txn.customer}</td>
    <td>${txn.amount}</td>
    <td>${txn.date}</td>
    <td>${txn.type}</td>
    `;
    tbody.appendChild(row);
});

console.log(`Total transactions: ${transactions.length}`);
transactions.forEach((txn, index) => {
  console.log(`Transaction ${index + 1}:`, txn);
});