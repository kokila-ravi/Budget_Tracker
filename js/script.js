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
  const budgetValue = parseFloat(budgetInputEl.value.trim());
  if (isNaN(budgetValue) || budgetValue <= 0) {
    errorMesgEl.innerHTML = "<p>Please Enter Budget Amount | More than 0</p>";
    errorMesgEl.classList.add("error");
  } else {
    errorMesgEl.innerHTML = "";
    errorMesgEl.classList.remove("error");
    budgetCardEl.textContent = budgetValue.toFixed(2); // Update budget display
    updateBalance(); // Update balance
  }
}

// Add Expense
function addExpense() {
  const expenseDesc = expenseDescEl.value.trim();
  const expenseAmount = parseFloat(expenseAmountEl.value.trim());

  if (expenseDesc === "" || isNaN(expenseAmount) || expenseAmount <= 0) {
    errorMesgEl.innerHTML = "<p>Please Enter Valid Expense Details</p>";
    errorMesgEl.classList.add("error");
  } else {
    errorMesgEl.innerHTML = "";
    errorMesgEl.classList.remove("error");

    const expenseItem = {
      id: itemId++,
      description: expenseDesc,
      amount: expenseAmount,
    };
    itemList.push(expenseItem); // Add expense to list
    addExpenseToTable(expenseItem); // Display expense in table
    updateExpenses(); // Update expenses total
    updateBalance(); // Update balance
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
            <button type="button" class="btn_delete" onclick="deleteExpense(${
              expenseItem.id
            })">Delete</button>
        </li>
    `;

  tblRecordEl.appendChild(expenseRow);
}

// Update Expenses
function updateExpenses() {
  const totalExpenses = itemList.reduce((sum, item) => sum + item.amount, 0);
  expensesCardEl.textContent = totalExpenses.toFixed(2); // Update expenses total display
}

// Update Balance
function updateBalance() {
  const budget = parseFloat(budgetCardEl.textContent.trim()) || 0; // Parse budget or default to 0
  const expenses = parseFloat(expensesCardEl.textContent.trim()) || 0; // Parse expenses or default to 0
  const balance = budget - expenses;

  if (budget > 0) {
    balanceCardEl.textContent = balance.toFixed(2); // Display formatted balance
    if (balance < 0) {
      errorMesgEl.innerHTML = "<p>Expenses exceed budget! Adjust accordingly.</p>";
      errorMesgEl.classList.add("error");
    } else {
      errorMesgEl.innerHTML = ""; // Clear error message
      errorMesgEl.classList.remove("error");
    }
  } else {
    balanceCardEl.textContent = "0.00"; // Set balance to 0 when budget is not set
    errorMesgEl.innerHTML = "<p>Please set the budget first and click calculate button.</p>";
    errorMesgEl.classList.add("error");
  }
}

// Delete Expense
function deleteExpense(id) {
  itemList = itemList.filter((item) => item.id !== id); // Remove expense by ID
  renderTable(); // Re-render table
  updateExpenses(); // Update expenses total
  updateBalance(); // Update balance
}

// Re-render the table after any change
function renderTable() {
  tblRecordEl.innerHTML = ""; // Clear table
  itemList.forEach(addExpenseToTable); // Re-add all expenses
}
