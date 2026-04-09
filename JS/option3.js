const name=document.getElementById("name");
const date=document.getElementById("date");
const amount=document.getElementById("amount");
const duration=document.getElementById("duration");
const interest=document.getElementById("interest");
const form=document.getElementById("Form");
const scheduleBody=document.getElementById("scheduleBody");
const resultsCard=document.getElementById("resultsCard");

resultsCard.style.display = "none";
date.valueAsDate = new Date();

form.addEventListener("submit",(e)=>{
    e.preventDefault();

    let result=calculateLoan(
        parseFloat(amount.value),
        parseInt(duration.value),
        parseFloat(interest.value),
        date.value
    );

    scheduleBody.innerHTML=result.rows;
    resultsCard.style.display="block";
    //show result
    let total=document.getElementById("totalPrincipal");
    let InterTotal=document.getElementById("totalInterest");
    let totalgrand=document.getElementById("grandTotal");

    total.innerHTML=`<strong>${result.totalPrincipal.toFixed(0)}</strong>`;
    InterTotal.innerHTML=`<strong>${result.totalInterest.toFixed(0)}</strong>`;
    totalgrand.innerHTML=`<strong>${result.grandTotal.toFixed(0)}</strong>`;
});

const calculateLoan=(amt,dur,rate,startDate,payEveryMounth=3)=>{
    // pay on by one mounth
    let balance=amt;
    // interest
    let monthlyPrincipal=amt/dur;

    let totalPrincipal=0;
    let totalInterest=0;
    let rows = "";

    for (let i = 1; i <= dur; i++) {
        let currentDate=new Date(startDate);
        currentDate.setMonth(currentDate.getMonth() + i);
        let interestOfMonth = balance * (rate / 100);
        let principal = 0;

        // check condition
        if (i % payEveryMounth === 0 && i !== dur) {
            principal=monthlyPrincipal*payEveryMounth;
            balance-=principal;
        } 
        else if(i===dur) {
            principal=balance;
            balance=0;
        }
        let total=principal+interestOfMonth;

        totalPrincipal+=principal;
        totalInterest+=interestOfMonth;

        rows+=`
            <tr>
                <td>${i}</td>
                <td>${currentDate.getDate()}/${currentDate.getMonth()+1}/${currentDate.getFullYear().toString().slice(-2)}</td>
                <td>${principal.toFixed(2)}</td>
                <td>${interestOfMonth.toFixed(2)}</td>
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