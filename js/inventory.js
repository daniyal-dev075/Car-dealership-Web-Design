// js/inventory.js

const mockInventory = [
    { id: 1, make: 'Porsche', model: '911 GT3', year: 2026, price: 185000, hp: 502, fuel: 'Gasoline', type: 'Coupe', img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80', new: true },
    { id: 2, make: 'Tesla', model: 'Model S Plaid', year: 2025, price: 108490, hp: 1020, fuel: 'Electric', type: 'Sedan', img: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80', new: false },
    { id: 3, make: 'BMW', model: 'M4 Competition', year: 2026, price: 89200, hp: 503, fuel: 'Gasoline', type: 'Coupe', img: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80', new: false },
    { id: 4, make: 'Audi', model: 'RS e-tron GT', year: 2025, price: 147100, hp: 637, fuel: 'Electric', type: 'Sedan', img: 'https://images.unsplash.com/photo-1563720225167-77eb931e21b7?auto=format&fit=crop&w=800&q=80', new: true },
    { id: 5, make: 'Porsche', model: 'Taycan Turbo S', year: 2025, price: 186000, hp: 750, fuel: 'Electric', type: 'Sedan', img: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=800&q=80', new: false },
    { id: 6, make: 'BMW', model: 'X5 M Competition', year: 2026, price: 122300, hp: 617, fuel: 'Gasoline', type: 'SUV', img: 'https://images.unsplash.com/photo-1555626906-fcf10d6851b4?auto=format&fit=crop&w=800&q=80', new: false }
];

let selectedCompare = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchInventory();

    // Compare logic
    document.getElementById('inventory-grid').addEventListener('change', (e) => {
        if (e.target.matches('.compare-checkbox input')) {
            const id = parseInt(e.target.value);
            if (e.target.checked) {
                if (selectedCompare.length < 3) {
                    selectedCompare.push(id);
                } else {
                    e.target.checked = false;
                    alert('You can only compare up to 3 vehicles.');
                }
            } else {
                selectedCompare = selectedCompare.filter(itemId => itemId !== id);
            }
            updateCompareBar();
        }
    });
});

function fetchInventory() {
    const grid = document.getElementById('inventory-grid');
    const skeleton = document.getElementById('skeleton-grid');
    
    // Show skeleton
    grid.style.display = 'none';
    skeleton.style.display = 'grid';

    // Simulate API delay
    setTimeout(() => {
        renderInventory(mockInventory);
        skeleton.style.display = 'none';
        grid.style.display = 'grid';
        
        // Staggered reveal animation
        gsap.fromTo('.car-card:not(.skeleton)', 
            { opacity: 0, y: 30 }, 
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
        );
    }, 800);
}

function renderInventory(items) {
    const grid = document.getElementById('inventory-grid');
    grid.innerHTML = '';
    
    // Update count with animation
    const countEl = document.getElementById('result-count');
    gsap.fromTo(countEl, { innerHTML: 0 }, { innerHTML: items.length, snap: { innerHTML: 1 }, duration: 1, ease: "power2.out" });

    items.forEach(car => {
        const card = document.createElement('div');
        card.className = 'car-card interactive';
        card.setAttribute('data-cursor', 'View');
        
        const isChecked = selectedCompare.includes(car.id) ? 'checked' : '';

        card.innerHTML = `
            <div class="car-card-img-wrap">
                ${car.new ? '<div class="badge-status" style="position: absolute; top: 16px; left: 16px; z-index: 2; background: var(--color-accent); color: #000; padding: 4px 12px; border-radius: 4px; font-weight: 600; font-size: 0.75rem;">NEW ARRIVAL</div>' : ''}
                <img src="${car.img}" alt="${car.make} ${car.model}" class="car-card-img">
            </div>
            <div class="car-card-content">
                <div class="car-card-header">
                    <h3 class="car-card-title">${car.year} ${car.make} ${car.model}</h3>
                    <div class="car-card-price">$${car.price.toLocaleString()}</div>
                </div>
                <div class="car-card-specs">
                    <div class="car-card-spec"><span>${car.hp}</span> hp</div>
                    <div class="car-card-spec">&bull;</div>
                    <div class="car-card-spec"><span>${car.type}</span></div>
                    <div class="car-card-spec">&bull;</div>
                    <div class="car-card-spec ${car.fuel === 'Electric' ? 'text-accent-2' : ''}" ${car.fuel === 'Electric' ? 'style="color: var(--color-accent-2);"' : ''}><span>${car.fuel}</span></div>
                </div>
                <div class="car-card-actions" style="display: flex; align-items: center; justify-content: space-between; gap: 16px;">
                    <a href="vehicle-detail.html" class="btn btn-secondary" style="flex: 1; padding: 12px; text-align: center;">View Details</a>
                    <label class="custom-checkbox compare-checkbox" style="padding: 12px; border: 1px solid var(--border-glass); border-radius: var(--radius-pill); cursor: pointer;" title="Add to Compare">
                        <input type="checkbox" value="${car.id}" ${isChecked}>
                        <div class="checkmark" style="border-radius: 50%;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                    </label>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
    
    // Re-initialize hover effects since DOM updated
    if (window.initMagneticButtons) initMagneticButtons();
}

function updateCompareBar() {
    const bar = document.querySelector('.compare-bar');
    const count = document.getElementById('compare-count');
    
    count.textContent = selectedCompare.length;
    
    if (selectedCompare.length > 1) {
        bar.classList.add('active');
    } else {
        bar.classList.remove('active');
    }
}
