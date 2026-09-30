let budget = Number(localStorage.getItem("budget")) || 0;
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("budgetDisplay").innerText = budget;
    displayExpenses();
    updateSummary();
});

function setBudget() {
    const budgetInput = document.getElementById("budget").value;

    if (budgetInput === "" || Number(budgetInput) <= 0) {
        alert("Please enter a valid budget");
        return;
    }

    budget = Number(budgetInput);

    localStorage.setItem("budget", budget);

    document.getElementById("budgetDisplay").innerText = budget;
    document.getElementById("budget").value = "";

    updateSummary();
}

function addExpense() {
    const name = document.getElementById("expenseName").value.trim();
    const amount = Number(document.getElementById("expenseAmount").value);
    const category = document.getElementById("category").value;

    if (name === "" || amount <= 0) {
        alert("Please enter valid expense details");
        return;
    }

    const expense = {
        id: Date.now(),
        name: name,
        amount: amount,
        category: category
    };

    expenses.push(expense);

    saveExpenses();

    displayExpenses();
    updateSummary();

    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";
}

function deleteExpense(id) {
    expenses = expenses.filter(function (expense) {
        return expense.id !== id;
    });

    saveExpenses();

    displayExpenses();
    updateSummary();
}

function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function displayExpenses() {
    const expenseList = document.getElementById("expenseList");

    expenseList.innerHTML = "";

    if (expenses.length === 0) {
        expenseList.innerHTML = "<li>No expenses added yet</li>";
        return;
    }

    expenses.forEach(function (expense) {
        const li = document.createElement("li");

        li.innerHTML = `
            <span>
                ${expense.name} - ${expense.category} - ₹${expense.amount}
            </span>

            <button class="delete-btn" onclick="deleteExpense(${expense.id})">
                Delete
            </button>
        `;

        expenseList.appendChild(li);
    });
}

function updateSummary() {
    let totalExpense = 0;

    expenses.forEach(function (expense) {
        totalExpense += expense.amount;
    });

    const remaining = budget - totalExpense;

    document.getElementById("budgetDisplay").innerText = budget;
    document.getElementById("totalExpense").innerText = totalExpense;
    document.getElementById("remaining").innerText = remaining;
}