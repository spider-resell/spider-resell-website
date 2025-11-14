let listings = [];

// DOM Elements
const listingsGrid = document.getElementById('listingsGrid');
const adminLoginBtn = document.getElementById('adminLoginBtn');

// Initialize the app
document.addEventListener('DOMContentLoaded', async function() {
    await loadListings();
    renderListings();
    setupEventListeners();
});

async function loadListings() {
    try {
        const res = await fetch('listings.json', { cache: 'no-store' });
        if (res.ok) {
            const data = await res.json();
            if (data && Array.isArray(data.listings)) {
                listings = data.listings;
            }
        }
    } catch (err) {
        console.warn('Failed to fetch listings.json:', err);
    }
}

// Save listings to localStorage
function saveListings() {}

// Render listings for public view
function renderListings() {
    listingsGrid.innerHTML = '';
    
    listings.forEach(listing => {
        const listingCard = createListingCard(listing);
        listingsGrid.appendChild(listingCard);
    });
}

// Create individual listing card
function createListingCard(listing) {
    const card = document.createElement('div');
    card.className = 'listing-card';
    card.innerHTML = `
        <img src="${listing.photo}" alt="${listing.username}" class="listing-photo">
        <div class="listing-username">${listing.username}</div>
        <div class="divider"></div>
        <div class="listing-info">Followers: ${listing.followers}</div>
        <div class="listing-info">USA: ${listing.usaPercent}</div>
        <div class="listing-info">Gender: ${listing.genderSplit}</div>
        <div class="listing-info">OGE: ${listing.oge}</div>
        <div class="listing-price">${listing.price}</div>
        <button class="view-more-btn" onclick="toggleExtendedInfo(${listing.id})">View More</button>
        <div class="extended-info" id="extended-${listing.id}">
            <div class="listing-info">${listing.additionalNotes}</div>
        </div>
        <a href="https://t.me/criempie" target="_blank" class="buy-button">Buy This Page!</a>
    `;
    
    return card;
}

// Toggle extended info dropdown
function toggleExtendedInfo(listingId) {
    const extendedInfo = document.getElementById(`extended-${listingId}`);
    const buyButton = extendedInfo.parentElement.querySelector('.buy-button');
    
    if (extendedInfo.classList.contains('show')) {
        extendedInfo.classList.remove('show');
        buyButton.style.position = 'absolute';
        buyButton.style.bottom = '20px';
        buyButton.style.right = '20px';
    } else {
        extendedInfo.classList.add('show');
        buyButton.style.position = 'static';
        buyButton.style.marginTop = '15px';
        buyButton.style.float = 'right';
    }
}

// Setup event listeners
function setupEventListeners() {
    adminLoginBtn.onclick = function() {
        window.location.href = '/admin/';
    };
}