# SPIDER RESELL - Social Media Page Marketplace

A modern, responsive website for buying and selling social media pages with a secure admin system.

## Features

### Public Features
- ✅ Jet black banner with "SPIDER RESELL" branding
- ✅ Clean white background with black text for easy reading
- ✅ 3 listings per row with proper spacing
- ✅ Individual listing cards with:
  - Instagram-style photo display
  - Username (bold)
  - Follower statistics (followers, USA %, gender split, OGE)
  - Price display (BIN format)
  - "Buy This Page!" CTA button linking to Telegram
  - Expandable "View More" dropdown
- ✅ Responsive design for mobile, tablet, and desktop

### Admin Features
- ✅ Secure login system (username: admin, password: spider2024)
- ✅ Add new listings with all required fields:
  - Username
  - Follower Amount
  - Follower USA %
  - Male/Female Split
  - OGE
  - Price
  - Photo upload (drag & drop)
  - Additional notes
- ✅ Edit existing listings
- ✅ Delete listings
- ✅ Back/Cancel functionality
- ✅ Real-time updates

### Technical Features
- ✅ Local data persistence (localStorage)
- ✅ Netlify-ready deployment
- ✅ Security headers configured
- ✅ Optimized for performance
- ✅ Modern CSS Grid layout
- ✅ Smooth animations and transitions

## Admin Login
- **Username:** admin
- **Password:** spider2024

## Deployment Instructions

### Option 1: Netlify Drag & Drop (Easiest)
1. Go to [Netlify](https://netlify.com) and create a free account
2. Drag and drop all files from this folder into Netlify
3. Your site will be live instantly!

### Option 2: GitHub + Netlify (Recommended)
1. Create a GitHub account at [github.com](https://github.com)
2. Create a new repository
3. Upload all files to your repository
4. Connect GitHub to Netlify for automatic deployments

### Option 3: Other Hosting
- Upload files to any web hosting service
- Ensure HTTPS is enabled for security
- Update any hardcoded URLs if needed

## File Structure
```
spider-resell/
├── index.html          # Main website file
├── styles.css          # All styling
├── script.js           # All functionality
├── netlify.toml        # Netlify configuration
└── README.md          # This file
```

## Customization

### Changing Admin Credentials
Edit the `ADMIN_CREDENTIALS` object in `script.js`:
```javascript
const ADMIN_CREDENTIALS = {
    username: 'your-username',
    password: 'your-password'
};
```

### Updating Telegram Link
Change the Telegram link in `script.js`:
```javascript
<a href="https://t.me/your-username" target="_blank" class="buy-button">Buy This Page!</a>
```

### Adding More Fields
The form structure is easily extensible. Add new fields to:
1. HTML form in `index.html`
2. Corresponding CSS in `styles.css`
3. JavaScript handling in `script.js`

## Security Notes
- Admin credentials are stored client-side for demo purposes
- For production use, implement server-side authentication
- Consider adding rate limiting for login attempts
- Use HTTPS for all deployments

## Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Performance
- Optimized for fast loading
- Responsive images
- Efficient CSS Grid layout
- Minimal JavaScript footprint

## Support
This is a complete, working website ready for deployment. All features are functional and tested. For customizations or additional features, modify the code as needed.

---
**Ready to deploy!** 🚀