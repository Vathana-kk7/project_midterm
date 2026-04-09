const form = document.getElementById("Form");
const name = document.getElementById("name");
const date = document.getElementById("date");
const amount = document.getElementById("amount");
const duration = document.getElementById("duration");
const interestInput = document.getElementById("interest");
const showBodyTable = document.getElementById("ShowBodyTable");

// set default date
date.valueAsDate = new Date();
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const result = calculateLoan(
        parseFloat(amount.value),
        parseInt(duration.value),
        parseFloat(interestInput.value),
        date.value
    );
    document.getElementById("resultsCard").style.display = "block";
    showBodyTable.innerHTML = result.rows;

    let total=document.getElementById("totalPrincipal");
    let InterTotal=document.getElementById("totalInterest");
    let totalgrand=document.getElementById("grandTotal");

    total.innerHTML=`<strong>${result.totalPrincipal.toFixed(0)}</strong>`;
    InterTotal.innerHTML=`<strong>${result.totalInterest.toFixed(0)}</strong>`;
    totalgrand.innerHTML=`<strong>${result.grandTotal.toFixed(0)}</strong>`;
});
const calculateLoan = (amt, dur, rate, startDate) => {
    let remainingBalance = amt;
    let monthlyPrincipal = amt / dur;

    let totalPrincipal = 0;
    let totalInterest = 0;
    let rows = "";

    for (let i = 1; i <= dur; i++) {
        let currentDate = new Date(startDate);
        currentDate.setMonth(currentDate.getMonth() + i);
        let interest = remainingBalance * (rate / 100);
        let total = monthlyPrincipal + interest;

        totalPrincipal += monthlyPrincipal;
        totalInterest += interest;
        remainingBalance -= monthlyPrincipal;
        rows += `
            <tr>
                <td>${i}</td>
                <td>${currentDate.getDate()}/${currentDate.getMonth()+1}/${currentDate.getFullYear().toString().slice(-2)}</td>
                <td>${monthlyPrincipal.toFixed(2)}</td>
                <td>${interest.toFixed(2)}</td>
                <td>${total.toFixed(2)}</td>
            </tr>
        `;
    }
    return {
        rows,
        totalPrincipal,
        totalInterest,
        grandTotal: totalPrincipal + totalInterest
    };
};

