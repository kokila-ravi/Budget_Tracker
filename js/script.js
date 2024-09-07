"use strict";

// DOM Elements
const errorMesgEl = document.querySelector(".error_message");
const budgetInputEl = document.querySelector(".budget_input");
const expenseDescEl = document.querySelector(".expenses_input");
const expenseAmountEl = document.querySelector(".expenses_amount");
const tblRecordEl = document.querySelector(".tbl_data");

const budgetCardEl = document.querySelector(".budget_card");
const expensesCardEl = document.querySelector(".expenses_card");
const balanceCardEl = document.querySelector(".balance_card");

let itemList = [];
let itemId = 0;

// Button events
function btnEvents() {
    const btnBudgetCal = document.querySelector("#btn_budget");
    const btnExpensesCal = document.querySelector("#btn_expenses");

    // Budget Event
    btnBudgetCal.addEventListener("click", (e) => {
        e.preventDefault();
        budgetFun();
    });

    // Expenses Event
    btnExpensesCal.addEventListener("click", (e) => {
        e.preventDefault();
        addExpense();
    });
}

// Initialize event listeners
document.addEventListener("DOMContentLoaded", btnEvents);

// Handle Budget Calculation
function budgetFun() {
    const budgetValue = parseFloat(budgetInputEl.value);
    if (isNaN(budgetValue) || budgetValue <= 0) {
        errorMesgEl.innerHTML = "<p>Please Enter Budget Amount | More than 0</p>";
        errorMesgEl.classList.add("error");
    } else {
        errorMesgEl.innerHTML = "";
        errorMesgEl.classList.remove("error");
        budgetCardEl.textContent = budgetValue.toFixed(2);
        updateBalance();
    }
}

// Add Expense
function addExpense() {
    const expenseDesc = expenseDescEl.value;
    const expenseAmount = parseFloat(expenseAmountEl.value);

    if (expenseDesc === '' || isNaN(expenseAmount) || expenseAmount <= 0) {
        errorMesgEl.innerHTML = "<p>Please Enter Valid Expense Details</p>";
        errorMesgEl.classList.add("error");
    } else {
        errorMesgEl.innerHTML = "";
        errorMesgEl.classList.remove("error");

        const expenseItem = {
            id: itemId++,
            description: expenseDesc,
            amount: expenseAmount
        };
        itemList.push(expenseItem);
        addExpenseToTable(expenseItem);
        updateExpenses();
        updateBalance();
    }
}

// Add Expense to Table
function addExpenseToTable(expenseItem) {
    const expenseRow = document.createElement("ul");
    expenseRow.classList.add("tbl_tr_content");

    expenseRow.innerHTML = `
        <li>${expenseItem.id + 1}</li>
        <li>${expenseItem.description}</li>
        <li><span>$</span>${expenseItem.amount.toFixed(2)}</li>
        <li>
            
            <button type="button" class="btn_delete" onclick="deleteExpense(${expenseItem.id})">Delete</button>
        </li>
    `;

    tblRecordEl.appendChild(expenseRow);
}

// Update Expenses
function updateExpenses() {
    const totalExpenses = itemList.reduce((sum, item) => sum + item.amount, 0);
    expensesCardEl.textContent = totalExpenses.toFixed(2);
}

// Update Balance
function updateBalance() {
    const budget = parseFloat(budgetCardEl.textContent);
    const expenses = parseFloat(expensesCardEl.textContent);
    const balance = budget - expenses;
    balanceCardEl.textContent = balance.toFixed(2);
}

// Delete Expense
function deleteExpense(id) {
    itemList = itemList.filter(item => item.id !== id);
    renderTable();
    updateExpenses();
    updateBalance();
}

// Edit Expense (Optional: Not implemented in detail)
function editExpense(id) {
    // Implement edit functionality here
}

// Re-render the table after any change
function renderTable() {
    tblRecordEl.innerHTML = "";
    itemList.forEach(addExpenseToTable);
}
