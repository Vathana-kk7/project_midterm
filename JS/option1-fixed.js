document.addEventListener('DOMContentLoaded', function() {
    const name=document.getElementById("name");
    const date=document.getElementById("date");
    const amount=document.getElementById("amount");
    const duration=document.getElementById("duration");
    const interest=document.getElementById("interest");
    const form=document.getElementById("Form")
    //Catch date and set default to today
    const today = new Date();
    const dateInput = date;
    dateInput.valueAsDate = today;
        
    const Showcard = document.getElementById("Showcard");
    const scheduleBody = document.getElementById("scheduleBody");

    form.addEventListener("submit",(e)=>{
        e.preventDefault();

        if(!name.value || !date.value || !amount.value || !duration.value || !interest.value){
            alert("Please fill in all fields correctly");
            return;
        }

        Showcard.style.display = "block";
        scheduleBody.innerHTML = "";

        let loanAmount = parseFloat(amount.value);
        let months = parseInt(duration.value);
        let rate = parseFloat(interest.value) / 100;

        let monthlyPrincipal = loanAmount / months;
        let monthlyInterest = loanAmount*rate;

        let totalPrincipal = 0;
        let totalInterest = 0;

        let currentDate = new Date(date.value);

        for(let i = 1; i <= months; i++){

            let total = monthlyPrincipal + monthlyInterest;

            totalPrincipal += monthlyPrincipal;
            totalInterest += monthlyInterest;

            let row = `
            <tr>
                <td>${i}</td>
                <td>${currentDate.getDate()}/${currentDate.getMonth()+1}/${currentDate.getFullYear().toString().slice(-2)}</td>
                <td>${monthlyPrincipal.toFixed(0)}</td>
                <td>${monthlyInterest.toFixed(0)}</td>
                <td>${total.toFixed(0)}</td>
            </tr>
            `;

            scheduleBody.innerHTML += row;

            currentDate.setMonth(currentDate.getMonth() + 1);
        }
        // Calculate total
    let grandTotal = totalPrincipal + totalInterest;
    document.getElementById("totalPrincipal").innerHTML = `<strong>${totalPrincipal.toFixed(0)}</strong>`;
    document.getElementById("totalInterest").innerHTML = `<strong>${totalInterest.toFixed(0)}</strong>`;
    document.getElementById("grandTotal").innerHTML = `<strong>${grandTotal.toFixed(0)}</strong>`;
    
    });
});
