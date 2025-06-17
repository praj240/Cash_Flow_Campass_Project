document.getElementById("themeColor").addEventListener("input", (e) => {
document.documentElement.style.setProperty('--theme-color', e.target.value);
});
document.getElementById("financeForm").addEventListener("submit", function (e) {
e.preventDefault();
calculateFinancialHealth();
});
function calculateFinancialHealth() {
const income = +document.getElementById("income").value;
const education = +document.getElementById("education").value;
const houseRent = +document.getElementById("houseRent").value;
const transportCost = +document.getElementById("transportCost").value;
const foodCost = +document.getElementById("foodCost").value;
const extraCashflow = +document.getElementById("extraCashflow").value || 0;
const debt = extraCashflow < 0 ? -extraCashflow : 0;
const gain = extraCashflow > 0 ? extraCashflow : 0;
const totalExpenses = education + houseRent + transportCost + foodCost + debt;
const netCashflow = income - totalExpenses + gain;
const savingsRate = ((netCashflow / income) * 100).toFixed(2);
document.getElementById("savingsBar").value = savingsRate;
let category = "Poor";
const entryDate = document.getElementById("entryDate").value || new
Date().toLocaleDateString();
if (netCashflow > 0.3 * income) category = "Excellent";
else if (netCashflow > 0.1 * income) category = "Good";
else if (netCashflow > 0) category = "Average";
document.getElementById("result").textContent =
`📅 Entry Date: ${entryDate} | 💸 Net Cashflow: ₹${netCashflow.toFixed(2)} | Status: 
${category}`;
localStorage.setItem("financeData", JSON.stringify({
income, education, houseRent, transportCost, foodCost, extraCashflow
}));
drawCharts(income, education, houseRent, transportCost, foodCost, debt, netCashflow);
showImprovementStrategy(category, netCashflow, income);
showInvestmentSuggestions(category, netCashflow);
showAdvice(income, education, houseRent, transportCost, foodCost, netCashflow);
document.querySelector(".charts").scrollIntoView({ behavior: "smooth" });
}
function drawCharts(income, education, houseRent, transportCost, foodCost, debt, 
netCashflow) {
const expCtx = document.getElementById("expenseChart").getContext("2d");
const netCtx = document.getElementById("netChart").getContext("2d");
if (window.expChart) window.expChart.destroy();
if (window.nChart) window.nChart.destroy();
window.expChart = new Chart(expCtx, {
type: "pie",
data: {
labels: ["Education", "Rent", "Transport", "Food", "Debt"],
datasets: [{
data: [education, houseRent, transportCost, foodCost, debt],
backgroundColor: ["#007bff", "#ffc107", "#28a745", "#dc3545", "#6c757d"]
}]
},
options: {
plugins: {
title: { display: true, text: "📊 Expense Breakdown" }
}
}
});
window.nChart = new Chart(netCtx, {
type: "bar",
data: {
labels: ["Income", "Net Cashflow"],
datasets: [{
label: "₹ Amount",
data: [income, netCashflow],
backgroundColor: ["#17a2b8", "#6610f2"]
}]
},
options: {
plugins: {
title: { display: true, text: "📈 Income vs Savings" }
}
}
});
}
function showImprovementStrategy(category, netCashflow, income) {
const el = document.getElementById("improvementStrategy");
let html = "<h3>📈 Improvement Strategy</h3>";
if (category === "Poor") {
html += "<p>Focus on cutting down costs and increasing income. Aim for 10% savings rate.</p>";
} else if (category === "Average") {
html += "<p>Reduce unnecessary expenses and focus on increasing your income to move to 'Good' health.</p>";
html += `<p>Target Net Cashflow increase by: ₹${(income * 0.2 -
netCashflow).toFixed(2)}</p>`;
} else if (category === "Good") {
html += "<p>Focus on steady growth in savings and investments. Aim for 30% savings rate to move to 'Excellent'.</p>";
html += `<p>Target Net Cashflow increase by: ₹${(income * 0.3 -
netCashflow).toFixed(2)}</p>`;
} else if (category === "Excellent") {
html += "<p>Optimize your investments to increase Net Cashflow by 4%. Focus on strategic growth.</p>";
html += `<p>Target Net Cashflow increase by: ₹${(netCashflow * 0.04).toFixed(2)}</p>`;
}
el.innerHTML = html;
}
function showInvestmentSuggestions(category, netCashflow) {
const el = document.getElementById("investmentSuggestions");
let html = "<h3>📌 Investment Suggestions</h3><ul>";
const smallCap = netCashflow * 0.30;
const midCap = netCashflow * 0.25;
const largeCap = netCashflow * 0.20;
const gold = netCashflow * 0.10;
const bonds = netCashflow * 0.15;
if (category === "Excellent") {
html += `<li>💰 Invest ₹${smallCap.toFixed(2)} (${(smallCap / netCashflow *
100).toFixed(2)}%) in Small Cap Stocks</li>`;
html += `<li>💰 Invest ₹${midCap.toFixed(2)} (${(midCap / netCashflow *
100).toFixed(2)}%) in Mid Cap Stocks</li>`;
html += `<li>💰 Invest ₹${largeCap.toFixed(2)} (${(largeCap / netCashflow *
100).toFixed(2)}%) in Large Cap Stocks</li>`;
html += `<li>💰 Invest ₹${gold.toFixed(2)} (${(gold / netCashflow * 100).toFixed(2)}%) 
in Gold</li>`;
html += `<li>💰 Invest ₹${bonds.toFixed(2)} (${(bonds / netCashflow *
100).toFixed(2)}%) in Government Bonds</li>`;
} else if (category === "Good") {
html += `<li>💰 Invest ₹${smallCap.toFixed(2)} (${(smallCap / netCashflow *
100).toFixed(2)}%) in Small Cap Stocks</li>`;
html += `<li>💰 Invest ₹${midCap.toFixed(2)} (${(midCap / netCashflow *
100).toFixed(2)}%) in Mid Cap Stocks</li>`;
html += `<li>💰 Invest ₹${gold.toFixed(2)} (${(gold / netCashflow * 100).toFixed(2)}%) 
in Gold</li>`;
html += `<li>💰 Invest ₹${bonds.toFixed(2)} (${(bonds / netCashflow *
100).toFixed(2)}%) in Government Bonds</li>`;
} else if (category === "Average") {
html += `<li>💰 Invest ₹${smallCap.toFixed(2)} (${(smallCap / netCashflow *
100).toFixed(2)}%) in Small Cap Stocks</li>`;
html += `<li>💰 Invest ₹${midCap.toFixed(2)} (${(midCap / netCashflow *
100).toFixed(2)}%) in Mid Cap Stocks</li>`;
html += `<li>💰 Invest ₹${gold.toFixed(2)} (${(gold / netCashflow * 100).toFixed(2)}%) 
in Gold</li>`;
}
el.innerHTML = html + "</ul>";
}
function showAdvice(income, education, houseRent, transportCost, foodCost, netCashflow) {
const el = document.getElementById("financialAdvice");
let html = "<h3>📌 Financial Advice</h3>";
if (netCashflow < income * 0.10) {
html += "<p>It's crucial to focus on budgeting and reducing unnecessary expenses to move towards 'Good' financial health.</p>";
} else if (netCashflow < income * 0.20) {
html += "<p>Try to optimize your income generation strategies, consider additional streams of revenue, and be cautious with spending.</p>";
} else {
html += "<p>Keep growing your savings, and optimize investments. Aim for a diversified portfolio to maintain and grow your financial health.</p>";
}
el.innerHTML = html;
}
function resetForm() {
document.getElementById("financeForm").reset();
document.getElementById("result").innerHTML = "";
document.getElementById("improvementStrategy").innerHTML = "";
document.getElementById("investmentSuggestions").innerHTML = "";
document.getElementById("financialAdvice").innerHTML = "";
}
function toggleTheme() {
document.body.classList.toggle("dark-mode");
}