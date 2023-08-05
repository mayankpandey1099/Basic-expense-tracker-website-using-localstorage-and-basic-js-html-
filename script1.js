document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expenseForm");
  const amountInput = document.getElementById("amount");
  const descriptionInput = document.getElementById("description");
  const categoryInput = document.getElementById("category");
  const expenseList = document.getElementById("expenseList");

  function renderExpenses() {
    expenseList.innerHTML = "";
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    expenses.forEach((expense, index) => {
      const item = document.createElement("div");
      item.innerHTML = `
                <p>Amount: ${expense.amount}</p>
                <p>Description: ${expense.description}</p>
                <p>Category: ${expense.category}</p>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
      expenseList.appendChild(item);
    });
  }

  function addExpense(amount, description, category) {
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push({ amount, description, category });
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderExpenses();
  }

  function deleteExpense(index) {
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderExpenses();
  }

  function editExpense(index, newAmount, newDescription, newCategory) {
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const expense = expenses[index];
    if (expense) {
      expense.amount = newAmount;
      expense.description = newDescription;
      expense.category = newCategory;
      localStorage.setItem("expenses", JSON.stringify(expenses));
      renderExpenses();
    }
  }

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const amount = amountInput.value;
    const description = descriptionInput.value;
    const category = categoryInput.value;
    addExpense(amount, description, category);
    amountInput.value = "";
    descriptionInput.value = "";
  });

  expenseList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const index = e.target.dataset.index;
      deleteExpense(index);
    } else if (e.target.classList.contains("edit-btn")) {
      const index = e.target.dataset.index;
      const expense = JSON.parse(localStorage.getItem("expenses"))[index];
      const newAmount = prompt("Enter new amount:", expense.amount);
      const newDescription = prompt(
        "Enter new description:",
        expense.description
      );
      const newCategory = prompt("Enter new category:", expense.category);
      editExpense(index, newAmount, newDescription, newCategory);
    }
  });

  // Render initial expenses
  renderExpenses();
});
