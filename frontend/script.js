
// 1. Select HTML elements
const transactionForm = document.getElementById("transactionForm");

const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const categoryInput = document.getElementById("category");

const totalBalance = document.getElementById("totalBalance");
const totalIncome = document.getElementById("totalIncome");
const totalExpenses = document.getElementById("totalExpenses");

const transactionsList = document.getElementById("transactionsList");


// 2. Sample financial data
let transactions = [
    {
        id: 1,
        description: "Shop Sales",
        amount: 100000,
        type: "income",
        category: "Sales"
    },
    {
        id: 2,
        description: "Stock Purchase",
        amount: 45000,
        type: "expense",
        category: "Stock"
    },
    {
        id: 3,
        description: "Transport",
        amount: 15000,
        type: "expense",
        category: "Transport"
    }
];


// 3. Format amounts as Rwandan francs
function formatMoney(amount) {
    return "RWF " + new Intl.NumberFormat("en-RW").format(amount);
}


// 4. Calculate and update dashboard totals
function updateDashboard() {

    const income = transactions
        .filter(transaction => transaction.type === "income")
        .reduce((total, transaction) => total + transaction.amount, 0);

    const expenses = transactions
        .filter(transaction => transaction.type === "expense")
        .reduce((total, transaction) => total + transaction.amount, 0);

    const balance = income - expenses;

    totalBalance.textContent = formatMoney(balance);
    totalIncome.textContent = formatMoney(income);
    totalExpenses.textContent = formatMoney(expenses);
}


// 5. Display transactions on the dashboard
function renderTransactions() {

    transactionsList.textContent = "";

    transactions.forEach(transaction => {

        const transactionElement = document.createElement("div");
        transactionElement.className = "transaction";

        const details = document.createElement("div");
        details.className = "transaction-details";

        const name = document.createElement("strong");
        name.textContent = transaction.description;

        const category = document.createElement("p");
        category.textContent = transaction.category;

        details.appendChild(name);
        details.appendChild(category);

        const amount = document.createElement("strong");

        if (transaction.type === "income") {
            amount.textContent = "+ " + formatMoney(transaction.amount);
            amount.className = "income";
        } else {
            amount.textContent = "- " + formatMoney(transaction.amount);
            amount.className = "expense";
        }

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.dataset.id = transaction.id;

        transactionElement.appendChild(details);
        transactionElement.appendChild(amount);
        transactionElement.appendChild(deleteButton);

        transactionsList.appendChild(transactionElement);
    });
}


// 6. Add a new transaction
transactionForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = Number(amountInput.value);
    const type = typeInput.value;
    const category = categoryInput.value;

    if (!description || !Number.isFinite(amount) || amount <= 0) {
        alert("Please enter a valid description and amount.");
        return;
    }

    const newTransaction = {
        id: Date.now(),
        description: description,
        amount: amount,
        type: type,
        category: category
    };

    transactions.push(newTransaction);

    updateDashboard();
    renderTransactions();

    transactionForm.reset();
});


// 7. Delete a transaction
transactionsList.addEventListener("click", function(event) {

    const deleteButton = event.target.closest("button[data-id]");

    if (!deleteButton) return;

    const transactionId = Number(deleteButton.dataset.id);

    transactions = transactions.filter(
        transaction => transaction.id !== transactionId
    );

    updateDashboard();
    renderTransactions();
});


// 8. Display initial data
updateDashboard();
renderTransactions();
