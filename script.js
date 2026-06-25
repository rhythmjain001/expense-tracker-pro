let transactions =
JSON.parse(localStorage.getItem("transactions")) || [];

let chart;

updateUI();

function addTransaction(){

    let description =
    document.getElementById("description").value;

    let amount =
    Number(document.getElementById("amount").value);

    let type =
    document.getElementById("type").value;

    if(description === "" || amount <= 0){

        alert("Please fill all fields");
        return;
    }

    let transaction = {
        description,
        amount,
        type
    };

    transactions.push(transaction);

    saveData();

    updateUI();

    document.getElementById("description").value="";
    document.getElementById("amount").value="";
}

function deleteTransaction(index){

    transactions.splice(index,1);

    saveData();

    updateUI();
}

function saveData(){

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

function updateUI(){

    let list =
    document.getElementById("transactionList");

    list.innerHTML="";

    let balance = 0;
    let income = 0;
    let expense = 0;

    transactions.forEach((transaction,index)=>{

        if(transaction.type==="income"){

            balance += transaction.amount;
            income += transaction.amount;
        }

        else{

            balance -= transaction.amount;
            expense += transaction.amount;
        }

        let li =
        document.createElement("li");

        li.innerHTML = `
<div class="transaction-info">
    <span>💳</span>

    <span>
        ${transaction.description}
    </span>

    <span class="badge">
        ${transaction.type}
    </span>
</div>

<div>
    ₹${transaction.amount}

    <button
    class="delete-btn"
    onclick="deleteTransaction(${index})">
    ❌
    </button>
</div>
`;
        list.appendChild(li);
    });

    document.getElementById("balance")
    .innerText = `₹${balance}`;

    document.getElementById("income")
    .innerText = `₹${income}`;

    document.getElementById("expense")
    .innerText = `₹${expense}`;

    updateChart(income,expense);
}

function updateChart(income,expense){

    const ctx =
    document.getElementById("expenseChart");

    if(chart){
        chart.destroy();
    }

    chart = new Chart(ctx,{

        type:'pie',

        data:{

            labels:['Income','Expense'],

            datasets:[{

                data:[income,expense],

                backgroundColor:[
                    '#4CAF50',
                    '#f44336'
                ]
            }]
        }
    });
}

function toggleDarkMode(){

    document.body.classList.toggle("dark");
}