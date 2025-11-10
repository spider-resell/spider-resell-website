// SPIDER RESELL - Main JavaScript

// Admin credentials (in production, this should be handled server-side)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'spider2024'
};

// Sample data (will be replaced with localStorage)
let listings = [
    {
        id: 1,
        username: '@fashion_daily',
        followers: '150K',
        usaPercent: '75%',
        genderSplit: '60F/40M',
        oge: 'Yes',
        price: 'BIN - $1,200',
        photo: 'https://via.placeholder.com/300x200/000000/ffffff?text=Fashion+Page',
        notes: 'High engagement fashion page with loyal following. Great for clothing brands.',
        additionalNotes: 'This page has been growing steadily for 2 years with organic content. Audience is primarily 18-35 age range. Perfect for fashion, beauty, and lifestyle brands.'
    },
    {
        id: 2,
        username: '@fitness_motivation',
        followers: '89K',
        usaPercent: '82%',
        genderSplit: '45F/55M',
        oge: 'Yes',
        price: 'BIN - $850',
        photo: 'https://via.placeholder.com/300x200/000000/ffffff?text=Fitness+Page',
        notes: 'Active fitness community with daily engagement.',
        additionalNotes: 'Established fitness page with workout routines, nutrition tips, and transformation stories. High story views and save rates.'
    },
    {
        id: 3,
        username: '@travel_vibes',
        followers: '234K',
        usaPercent: '68%',
        genderSplit: '55F/45M',
        oge: 'No',
        price: 'BIN - $2,100',
        photo: 'https://via.placeholder.com/300x200/000000/ffffff?text=Travel+Page',
        notes: 'Stunning travel photography page with viral potential.',
        additionalNotes: 'Premium travel content with professional photography. Partnerships with hotels and tourism boards available.'
    }
];

// DOM Elements
const listingsGrid = document.getElementById('listingsGrid');
const adminModal = document.getElementById('adminModal');
const adminLoginBtn = document.getElementById('adminLoginBtn');
const closeModal = document.querySelector('.close');
const adminLoginForm = document.getElementById('adminLoginForm');
const adminDashboard = document.getElementById('adminDashboard');
const logoutBtn = document.getElementById('logoutBtn');
const newListingForm = document.getElementById('newListingForm');
const adminListings = document.getElementById('adminListings');

// Initialize the app
document.addEventListener('DOMContentLoaded', async function() {
    await loadListings();
    renderListings();
    setupEventListeners();
    checkAdminSession();
});

// Load listings from localStorage or use sample data
async function loadListings() {
    try {
        const res = await fetch('listings.json', { cache: 'no-store' });
        if (res.ok) {
            const data = await res.json();
            if (data && Array.isArray(data.listings)) {
                listings = data.listings;
                return;
            }
        }
    } catch (err) {
        console.warn('Failed to fetch listings.json, falling back to localStorage:', err);
    }

    const savedListings = localStorage.getItem('spiderResellListings');
    if (savedListings) {
        listings = JSON.parse(savedListings);
    } else {
        localStorage.setItem('spiderResellListings', JSON.stringify(listings));
    }
}

// Save listings to localStorage
function saveListings() {
    localStorage.setItem('spiderResellListings', JSON.stringify(listings));
}

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
    // Admin login modal
    adminLoginBtn.onclick = function() {
        // Redirect to Decap CMS admin for persistent edits
        window.location.href = '/admin/';
    }
    
    closeModal.onclick = function() {
        adminModal.style.display = 'none';
    }
    
    window.onclick = function(event) {
        if (event.target == adminModal) {
            adminModal.style.display = 'none';
        }
    }
    
    // Disable built-in modal login in favor of CMS
    // adminLoginForm.addEventListener('submit', function(e) {
    //     e.preventDefault();
    //     handleAdminLogin();
    // });
    
    // Logout
    logoutBtn.onclick = function() {
        logoutAdmin();
    };
    
    // New listing form
    newListingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleNewListing();
    });
    
    // Cancel button
    document.getElementById('cancelBtn').onclick = function() {
        // Reset fully to add mode
        resetForm();
    };
}

// Handle admin login
function handleAdminLogin() {
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Create admin session
        sessionStorage.setItem('spiderResellAdmin', 'true');
        
        // Hide modal and show admin dashboard
        adminModal.style.display = 'none';
        document.querySelector('.main-content').style.display = 'none';
        adminDashboard.style.display = 'block';
        
        // Clear form
        adminLoginForm.reset();
        
        // Render admin view
        renderAdminListings();
        
        alert('Admin login successful!');
    } else {
        alert('Invalid credentials. Please try again.');
    }
}

// Check if admin is already logged in
function checkAdminSession() {
    if (sessionStorage.getItem('spiderResellAdmin') === 'true') {
        document.querySelector('.main-content').style.display = 'none';
        adminDashboard.style.display = 'block';
        renderAdminListings();
    }
}

// Logout admin
function logoutAdmin() {
    sessionStorage.removeItem('spiderResellAdmin');
    document.querySelector('.main-content').style.display = 'block';
    adminDashboard.style.display = 'none';
    renderListings();
}

// Render admin listings view
function renderAdminListings() {
    adminListings.innerHTML = '';
    
    listings.forEach(listing => {
        const adminCard = createAdminListingCard(listing);
        adminListings.appendChild(adminCard);
    });
}

// Create admin listing card
function createAdminListingCard(listing) {
    const card = document.createElement('div');
    card.className = 'admin-listing-card';
    card.innerHTML = `
        <img src="${listing.photo}" alt="${listing.username}">
        <div class="listing-username">${listing.username}</div>
        <div class="listing-info">${listing.followers} followers</div>
        <div class="listing-price">${listing.price}</div>
        <div class="admin-actions">
            <button class="edit-btn" onclick="editListing(${listing.id})">Edit</button>
            <button class="delete-btn" onclick="deleteListing(${listing.id})">Delete</button>
        </div>
    `;
    
    return card;
}

// Handle new listing
function handleNewListing() {
    const newListing = {
        id: Date.now(),
        username: document.getElementById('newUsername').value,
        followers: document.getElementById('newFollowers').value,
        usaPercent: document.getElementById('newUSAPercent').value,
        genderSplit: document.getElementById('newGenderSplit').value,
        oge: document.getElementById('newOGE').value,
        price: document.getElementById('newPrice').value,
        photo: 'https://via.placeholder.com/300x200/000000/ffffff?text=New+Page',
        notes: 'Click view more for additional information',
        additionalNotes: document.getElementById('newNotes').value || 'No additional notes provided.'
    };
    
    // Handle photo upload (simplified for demo)
    const photoInput = document.getElementById('newPhoto');
    if (photoInput.files && photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            newListing.photo = e.target.result;
            addListing(newListing);
        };
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        addListing(newListing);
    }
}

// Add new listing
function addListing(listing) {
    listings.push(listing);
    saveListings();
    renderAdminListings();
    renderListings();
    
    // Reset form
    newListingForm.reset();
    
    alert('Listing added successfully!');
}

// Edit listing
function editListing(id) {
    const listing = listings.find(l => l.id === id);
    if (!listing) return;
    
    // Populate form with existing data
    document.getElementById('newUsername').value = listing.username;
    document.getElementById('newFollowers').value = listing.followers;
    document.getElementById('newUSAPercent').value = listing.usaPercent;
    document.getElementById('newGenderSplit').value = listing.genderSplit;
    document.getElementById('newOGE').value = listing.oge;
    document.getElementById('newPrice').value = listing.price;
    document.getElementById('newNotes').value = listing.additionalNotes;
    
    // Change form to edit mode
    newListingForm.onsubmit = function(e) {
        e.preventDefault();
        updateListing(id);
    };
    // In edit mode, photo upload is optional
    const photoInput = document.getElementById('newPhoto');
    if (photoInput) photoInput.required = false;
    
    // Scroll to form
    document.querySelector('.add-listing-form').scrollIntoView({ behavior: 'smooth' });
    
    // Change button text
    document.querySelector('.confirm-btn').textContent = 'Update Listing';
}

// Update listing
function updateListing(id) {
    const listingIndex = listings.findIndex(l => l.id === id);
    if (listingIndex === -1) return;
    
    const updatedListing = {
        ...listings[listingIndex],
        username: document.getElementById('newUsername').value,
        followers: document.getElementById('newFollowers').value,
        usaPercent: document.getElementById('newUSAPercent').value,
        genderSplit: document.getElementById('newGenderSplit').value,
        oge: document.getElementById('newOGE').value,
        price: document.getElementById('newPrice').value,
        additionalNotes: document.getElementById('newNotes').value
    };
    
    // Handle photo upload
    const photoInput = document.getElementById('newPhoto');
    if (photoInput.files && photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            updatedListing.photo = e.target.result;
            listings[listingIndex] = updatedListing;
            saveListings();
            renderAdminListings();
            renderListings();
            resetForm();
        };
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        listings[listingIndex] = updatedListing;
        saveListings();
        renderAdminListings();
        renderListings();
        resetForm();
    }
    
    alert('Listing updated successfully!');
}

// Delete listing
function deleteListing(id) {
    if (confirm('Are you sure you want to delete this listing?')) {
        listings = listings.filter(l => l.id !== id);
        saveListings();
        renderAdminListings();
        renderListings();
        alert('Listing deleted successfully!');
    }
}

// Reset form to add mode
function resetForm() {
    newListingForm.reset();
    newListingForm.onsubmit = function(e) {
        e.preventDefault();
        handleNewListing();
    };
    document.querySelector('.confirm-btn').textContent = 'Confirm';
    // Return photo input to required in add mode (HTML may not have required)
    const photoInput = document.getElementById('newPhoto');
    if (photoInput) photoInput.required = true;
}

// Drag and drop functionality for admin (enhanced)
document.addEventListener('DOMContentLoaded', function() {
    const photoInput = document.getElementById('newPhoto');
    const photoLabel = photoInput.parentElement;
    
    // Create drop zone
    const dropZone = document.createElement('div');
    dropZone.className = 'drop-zone';
    dropZone.innerHTML = 'Drag and drop image here or click to select';
    dropZone.style.cssText = `
        border: 2px dashed #cccccc;
        border-radius: 5px;
        padding: 20px;
        text-align: center;
        cursor: pointer;
        margin-top: 10px;
        transition: all 0.3s ease;
    `;
    
    photoLabel.parentElement.appendChild(dropZone);
    photoInput.style.display = 'none';
    
    // Click to select
    dropZone.onclick = () => photoInput.click();
    
    // Drag and drop events
    dropZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.borderColor = '#000000';
        this.style.backgroundColor = '#f0f0f0';
    });
    
    dropZone.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.style.borderColor = '#cccccc';
        this.style.backgroundColor = 'transparent';
    });
    
    dropZone.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.borderColor = '#cccccc';
        this.style.backgroundColor = 'transparent';
        
        const files = e.dataTransfer.files;
        if (files.length > 0 && files[0].type.startsWith('image/')) {
            photoInput.files = files;
            dropZone.textContent = `Selected: ${files[0].name}`;
        }
    });
    
    photoInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            dropZone.textContent = `Selected: ${this.files[0].name}`;
        }
    });
});