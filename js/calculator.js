// js/calculator.js

document.addEventListener('DOMContentLoaded', () => {
    initCalculator();
    initAccordion();
});

function initCalculator() {
    // Elements
    const sPrice = document.getElementById('slider-price');
    const sDown = document.getElementById('slider-down');
    const sTerm = document.getElementById('slider-term');
    const sRate = document.getElementById('slider-rate');

    const vPrice = document.getElementById('val-price');
    const vDown = document.getElementById('val-down');
    const vTerm = document.getElementById('val-term');
    const vRate = document.getElementById('val-rate');

    const elMonthly = document.getElementById('monthly-payment');
    const elTotal = document.getElementById('total-cost');
    
    const chartInterest = document.getElementById('chart-interest');
    
    // Formatting helper
    const formatCurrency = (num) => Math.round(num).toLocaleString();

    // GSAP objects for counting animation
    let currentMonthly = { val: 0 };
    let currentTotal = { val: 0 };

    function calculate() {
        const price = parseFloat(sPrice.value);
        const down = parseFloat(sDown.value);
        const term = parseFloat(sTerm.value);
        const rate = parseFloat(sRate.value);

        // Update labels
        vPrice.textContent = formatCurrency(price);
        vDown.textContent = formatCurrency(down);
        vTerm.textContent = term;
        vRate.textContent = rate.toFixed(1);

        // Max down payment shouldn't exceed price
        if (down > price) {
            sDown.value = price;
            vDown.textContent = formatCurrency(price);
        }

        // Logic
        const principal = price - parseFloat(sDown.value);
        let monthly = 0;
        let totalInterest = 0;

        if (principal > 0) {
            const monthlyRate = (rate / 100) / 12;
            if (monthlyRate === 0) {
                monthly = principal / term;
            } else {
                monthly = principal * monthlyRate * Math.pow(1 + monthlyRate, term) / (Math.pow(1 + monthlyRate, term) - 1);
            }
            totalInterest = (monthly * term) - principal;
        }

        const totalCost = principal + totalInterest;

        // Animate Numbers
        gsap.to(currentMonthly, {
            val: monthly,
            duration: 0.5,
            ease: "power2.out",
            onUpdate: () => {
                elMonthly.textContent = formatCurrency(currentMonthly.val);
            }
        });

        gsap.to(currentTotal, {
            val: totalCost,
            duration: 0.5,
            ease: "power2.out",
            onUpdate: () => {
                elTotal.textContent = formatCurrency(currentTotal.val);
            }
        });

        // Update Chart
        // Circumference of r=80 is ~502
        // We calculate percentage of interest vs total loan cost (principal + interest)
        const totalLoanAmount = principal > 0 ? totalCost : 1; // avoid div by 0
        const interestPercentage = totalInterest / totalLoanAmount;
        const dashOffset = 502 - (502 * interestPercentage);
        
        chartInterest.style.strokeDashoffset = dashOffset;
    }

    // Event listeners
    [sPrice, sDown, sTerm, sRate].forEach(slider => {
        slider.addEventListener('input', calculate);
    });

    // Initial calculation
    calculate();
}

function initAccordion() {
    const headers = document.querySelectorAll('.accordion-header');
    
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isActive = header.classList.contains('active');
            
            // Close all
            document.querySelectorAll('.accordion-header').forEach(h => h.classList.remove('active'));
            document.querySelectorAll('.accordion-content').forEach(c => c.style.maxHeight = null);
            
            // If wasn't active, open it
            if (!isActive) {
                header.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
}
