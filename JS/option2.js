// Loan Calculator JavaScript - Reducing Balance Method

document.addEventListener('DOMContentLoaded', function() {
    const loanForm = document.getElementById('loanForm');
    const resultsCard = document.getElementById('resultsCard');
    const summaryCard = document.getElementById('summaryCard');
    const scheduleBody = document.getElementById('scheduleBody');
    
    // Set default date to today
    const today = new Date();
    const dateInput = document.getElementById('date');
    dateInput.valueAsDate = today;
    
    // Form submission handler
    loanForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const startDate = document.getElementById('date').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const duration = parseInt(document.getElementById('duration').value);
        const interestRate = parseFloat(document.getElementById('interest').value);
        
        // Validate inputs
        if (!name || !startDate || isNaN(amount) || isNaN(duration) || isNaN(interestRate)) {
            alert('Please fill in all fields correctly');
            return;
        }
        
        if (amount <= 0 || duration <= 0 || interestRate < 0) {
            alert('Amount and duration must be positive numbers');
            return;
        }
        
        // Calculate loan schedule using reducing balance method
        const schedule = calculateReducingBalanceSchedule(amount, duration, interestRate, startDate);
        
        // Display results
        displayResults(name, amount, duration, interestRate, schedule);
    });
    
    // Calculate loan schedule using reducing balance method
    function calculateReducingBalanceSchedule(amount, duration, interestRate, startDate) {
        const schedule = [];
        const principalPerMonth = amount / duration;
        let remainingBalance = amount;
        
        // Parse start date
        const start = new Date(startDate);
        
        for (let i = 0; i < duration; i++) {
            // Calculate payment date (add months)
            const paymentDate = new Date(start);
            paymentDate.setMonth(paymentDate.getMonth() + i + 1);
            
            // Format date as M/D/YY (e.g., 4/15/26)
            const month = paymentDate.getMonth() + 1;
            const day = paymentDate.getDate();
            const year = String(paymentDate.getFullYear()).slice(-2);
            const formattedDate = `${month}/${day}/${year}`;
            
            // Calculate interest on remaining balance
            const interest = (remainingBalance * interestRate) / 100;
            
            // Calculate total payment
            const total = principalPerMonth + interest;
            
            schedule.push({
                number: i + 1,
                date: formattedDate,
                principal: principalPerMonth,
                interest: interest,
                total: total
            });
            
            // Reduce remaining balance
            remainingBalance -= principalPerMonth;
        }
        
        return schedule;
    }
    
    // Display results
    function displayResults(name, amount, duration, interestRate, schedule) {
        // Clear previous results
        scheduleBody.innerHTML = '';
        
        // Calculate totals
        let totalPrincipal = 0;
        let totalInterest = 0;
        let grandTotal = 0;
        
        // Generate table rows
        schedule.forEach(payment => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${payment.number}</td>
                <td>${payment.date}</td>
                <td>${formatCurrency(payment.principal)}</td>
                <td>${formatCurrency(payment.interest)}</td>
                <td>${formatCurrency(payment.total)}</td>
            `;
            scheduleBody.appendChild(row);
            
            // Add to totals
            totalPrincipal += payment.principal;
            totalInterest += payment.interest;
            grandTotal += payment.total;
        });
        
        // Update totals in table footer
        document.getElementById('totalPrincipal').innerHTML = `<strong>${formatCurrency(totalPrincipal)}</strong>`;
        document.getElementById('totalInterest').innerHTML = `<strong>${formatCurrency(totalInterest)}</strong>`;
        document.getElementById('grandTotal').innerHTML = `<strong>${formatCurrency(grandTotal)}</strong>`;
        
        // Update summary card
        document.getElementById('summaryName').textContent = name;
        document.getElementById('summaryAmount').textContent = formatCurrency(amount);
        document.getElementById('summaryDuration').textContent = `${duration} months`;
        document.getElementById('summaryInterest').textContent = `${interestRate}%`;
        document.getElementById('summaryMonthly').textContent = formatCurrency(schedule[0].total);
        document.getElementById('summaryTotal').textContent = formatCurrency(grandTotal);
        
        // Show results cards
        resultsCard.style.display = 'block';
        summaryCard.style.display = 'block';
        
        // Scroll to results
        resultsCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Format currency
    function formatCurrency(amount) {
        return amount.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
    
    // Add input validation feedback
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && this.checkValidity()) {
                this.style.borderColor = '#00c851';
            } else if (this.value && !this.checkValidity()) {
                this.style.borderColor = '#ff4444';
            } else {
                this.style.borderColor = '#e1e1e1';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = '#667eea';
        });
    });
    
    // Add navigation active state
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
            }
        });
    });
    
    // Add logout confirmation
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                window.location.href = 'index.html';
            }
        });
    }
    
    // Console welcome message
    console.log('%c Loan Calculator - Reducing Balance Method Loaded! ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 16px; padding: 8px; border-radius: 5px;');
});
