document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('loanForm');
    const tbody = document.getElementById('scheduleBody');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name     = document.getElementById('name').value.trim();
        const amount   = parseFloat(document.getElementById('amount').value);
        const duration = parseInt(document.getElementById('duration').value);
        const rate     = parseFloat(document.getElementById('interest').value);
        const startDate = document.getElementById('date').value;

        // Validate inputs
        if (!name || isNaN(amount) || isNaN(duration) || isNaN(rate) || !startDate) {
            alert('Please fill in all fields correctly');
            return;
        }
        if (amount <= 0 || duration <= 0 || rate < 0) {
            alert('Amount and duration must be positive numbers');
            return;
        }
        if (isNaN(new Date(startDate).getTime())) {
            alert('Please enter a valid start date');
            return;
        }
        if (duration < 3) {
            alert('Duration must be at least 3 months for this payment method');
            return;
        }

        const schedule = calculate(amount, duration, rate, startDate);
        render(name, amount, duration, rate, schedule);
    });

    function calculate(amount, duration, rate, startDate) {

        const payEvery       = 3;                       // pay principal every 3 months
        const monthlyPrincipal = amount / duration;     // equal share of principal per month
        let   balance        = amount;
        let   data           = [];

        const start = new Date(startDate);

        for (let m = 1; m <= duration; m++) {

            // ── Date (DD/MM/YY) ─────────────────────────────────────────────
            let d = new Date(start.getFullYear(), start.getMonth() + m, start.getDate());
            let date = String(d.getDate()).padStart(2, '0') + '/' +
                       String(d.getMonth() + 1).padStart(2, '0') + '/' +
                       String(d.getFullYear()).slice(-2);

            // ── Interest: charged every month on current outstanding balance ─
            let interest = balance * (rate / 100);

            // ── Principal: paid every 3 months ──────────────────────────────
            let principal = 0;

            if (m % payEvery === 0 && m !== duration) {
                // Regular quarterly payment
                principal = monthlyPrincipal * payEvery;
                balance  -= principal;
                if (balance < 0.0001) balance = 0;

            } else if (m === duration) {
                // Final payment – clear remaining balance
                // If the last month also falls on a regular pay month, still use balance
                principal = balance;
                balance   = 0;
            }

            data.push({
                no: m,
                date,
                principal,
                interest,
                total: principal + interest
            });
        }

        return data;
    }

    function render(name, amount, duration, rate, data) {

        tbody.innerHTML = '';

        let totalP   = 0;
        let totalI   = 0;
        let totalAll = 0;

        data.forEach(r => {
            totalP   += r.principal;
            totalI   += r.interest;
            totalAll += r.total;

            tbody.innerHTML += `
            <tr>
                <td>${r.no}</td>
                <td>${r.date}</td>
                <td>${format(r.principal)}</td>
                <td>${format(r.interest)}</td>
                <td>${format(r.total)}</td>
            </tr>`;
        });

        document.getElementById('totalPrincipal').innerHTML = '<b>' + format(totalP)   + '</b>';
        document.getElementById('totalInterest').innerHTML  = '<b>' + format(totalI)   + '</b>';
        document.getElementById('grandTotal').innerHTML     = '<b>' + format(totalAll) + '</b>';

        // Update summary card
        document.getElementById('summaryName').textContent     = name;
        document.getElementById('summaryAmount').textContent   = format(amount);
        document.getElementById('summaryDuration').textContent = duration + ' months';
        document.getElementById('summaryInterest').textContent = rate + '%';
        document.getElementById('summaryTotal').textContent    = format(totalAll);

        // Show result sections
        document.getElementById('resultsCard').style.display = 'block';
        document.getElementById('summaryCard').style.display = 'block';

        // Scroll to results
        document.getElementById('resultsCard').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function format(n) {
        return n.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

});