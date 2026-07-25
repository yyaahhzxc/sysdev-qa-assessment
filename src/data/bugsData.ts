import { Bug } from '../types/assessment';

export const BUGS_DATA: Bug[] = [
  // --- Site 1: SysDEV Org Page (SAMAHAN Systems Development Portal) ---
  {
    id: 1,
    title: 'External Link Redirects to Wrong Destination',
    siteId: 'org',
    category: 'Validation / State',
    description: 'The "View Full Calendar" link inside the Featured Workshops section incorrectly redirects users to linkedin.com instead of the SAMAHAN Events Calendar.',
    stepsToReproduce: [
      'Scroll down to the "Featured Workshops & Bootcamps" section.',
      'Click the "View Full Calendar" link in the section header.',
      'Observe the new tab or window that opens.',
      'Notice that the user is redirected to linkedin.com instead of an events calendar.'
    ],
    expectedOutput: 'The link should direct users to the proper internal or external events calendar for the organization.',
    actualOutput: 'The link opens a new window directed to www.linkedin.com.',
    screenshotPng: '/assets/bug-screenshots/org-calendar-link.png',
    points: 100
  },
  {
    id: 2,
    title: 'Mobile Viewport Drawer Navigation Occluding Search Input',
    siteId: 'org',
    category: 'Layout / CSS',
    description: 'When operating in Mobile viewport mode (< 640px width), the hamburger menu button overflows and occludes the global site search box, preventing interaction with either element.',
    stepsToReproduce: [
      'Switch the test application viewport toggle to "Mobile" view.',
      'Inspect the top right corner of the navigation header.',
      'Observe that the hamburger navigation icon is absolutely positioned over the search input field without flexbox wrapping.',
      'Attempt to type into the search box or cleanly trigger the mobile navigation drawer.'
    ],
    expectedOutput: 'On small screens, the search bar should collapse or wrap below the navigation header, leaving the menu drawer button accessible.',
    actualOutput: 'The mobile drawer button directly collides with and covers the search input container.',
    screenshotPng: '/assets/bug-screenshots/org-mobile-drawer-occlusion.png',
    points: 100
  },
  {
    id: 3,
    title: 'Clipped Workshop Feature Card Title Text',
    siteId: 'org',
    category: 'Layout / CSS',
    description: 'In the Technical Workshops showcase section, a multi-line title is wrapped in a container with fixed height and overflow: hidden, cutting off the lower half of the text.',
    stepsToReproduce: [
      'Scroll down to the "Featured Workshops & Bootcamps" section.',
      'Locate the card titled "SAMAHAN SysDEV Advanced AI & Software Engineering Bootcamp 2026".',
      'Observe the rendering of the typography within the card header.',
      'Note that the second and third lines of text are horizontally and vertically truncated without ellipses.'
    ],
    expectedOutput: 'The card header should expand dynamically to fit multi-line titles or use responsive line-clamping.',
    actualOutput: 'The card title is trapped in a fixed-height box, clipping characters cleanly in half.',
    screenshotPng: '/assets/bug-screenshots/org-clipped-title.png',
    points: 100
  },
  {
    id: 4,
    title: 'Off-Grid Executive Board Officer Card Spill',
    siteId: 'org',
    category: 'Layout / CSS',
    description: 'Within the Executive Board roster grid, the third officer profile card possesses a hardcoded margin and explicit width that forces it outside its designated CSS grid column, overlapping the fourth card.',
    stepsToReproduce: [
      'Navigate to the "Executive Board Roster" section of the Org Page.',
      'Examine the grid alignment of the student leadership profile cards.',
      'Inspect the card for the Vice President for Systems Development (3rd card in sequence).',
      'Observe that it bleeds horizontally over the adjacent Director of DevOps profile card.'
    ],
    expectedOutput: 'All officer profile cards should cleanly align within uniform grid columns with consistent gap spacing.',
    actualOutput: 'The third officer card overlaps directly onto the fourth card, hiding profile details.',
    screenshotPng: '/assets/bug-screenshots/org-offgrid-officer.png',
    points: 100
  },
  {
    id: 5,
    title: 'Newsletter Accepts Non-Institutional Email',
    siteId: 'org',
    category: 'Validation / State',
    description: 'The newsletter subscription input accepts non-institutional personal emails despite the placeholder requiring @addu.edu.ph domain.',
    stepsToReproduce: [
      'Scroll down to the site footer.',
      'Enter a personal email (e.g. user@gmail.com) in the Subscribe to SysDEV Dispatch input box.',
      'Click Subscribe.',
      'Notice that the form accepts the input without throwing a validation error.'
    ],
    expectedOutput: 'The form should reject emails that do not end with @addu.edu.ph.',
    actualOutput: 'The form successfully subscribes the user even with a non-institutional email.',
    screenshotPng: '/assets/bug-screenshots/org-newsletter-email.png',
    points: 100
  },
  {
    id: 6,
    title: 'Distorted Community Showcase Photograph Aspect Ratio',
    siteId: 'org',
    category: 'Layout / CSS',
    description: 'The flagship student developers gathering showcase photo in the about hero section is constrained to hardcoded 300x500px dimensions without object-fit protection, heavily stretching the image.',
    stepsToReproduce: [
      'Locate the "About Our Student Developers" community photograph showcase in the middle content area.',
      'Inspect the dimensions and rendering proportions of the Ateneo de Davao students photo.',
      'Observe that the aspect ratio is forcibly stretched horizontally, distorting faces and background elements.',
      'Verify the missing CSS property object-fit: cover on the responsive image container.'
    ],
    expectedOutput: 'Featured images should resize proportionally or utilize object-fit: cover within fixed frame ratios.',
    actualOutput: 'The community photograph is heavily squished and warped out of proper aspect ratio.',
    screenshotPng: '/assets/bug-screenshots/org-distorted-aspect.png',
    points: 100
  },

  // --- Site 2: SysDEV Merch Site (SAMAHAN SysDEV Official Merchandise Shop) ---
  {
    id: 7,
    title: 'Shopping Cart Quantity Negative Underflow',
    siteId: 'merch',
    category: 'Logic / Calculation',
    description: 'The shopping cart quantity decrement control omits a zero-floor check, enabling item quantities to descend into negative integers (e.g., -1, -2) which deducts funds from the subtotal.',
    stepsToReproduce: [
      'Navigate to the SysDEV Merch Shop tab and add any merchandise item to the shopping cart.',
      'Open the interactive shopping cart review pane.',
      'Click the item decrement button ("-") repeatedly until the quantity reaches 0.',
      'Click the decrement button again and observe the quantity shifting to -1 and subtotal decreasing.'
    ],
    expectedOutput: 'Decrementing an item quantity to 0 should prompt item removal or disable further negative underflow.',
    actualOutput: 'The system accepts negative integers and subtracts item costs from the total balance.',
    screenshotPng: '/assets/bug-screenshots/merch-negative-quantity.png',
    points: 100
  },
  {
    id: 8,
    title: 'Inverted Promo Voucher Calculation (SYSDEV50)',
    siteId: 'merch',
    category: 'Logic / Calculation',
    description: 'Applying promotional voucher code SYSDEV50 (advertised as a ₱50.00 student discount) mathematically adds ₱50.00 to the checkout grand total instead of subtracting it.',
    stepsToReproduce: [
      'Add any SysDEV merchandise (e.g., SysDEV Essential Shirt at ₱450.00) to your order.',
      'Navigate to the voucher discount field in the cart summary.',
      'Enter voucher code "SYSDEV50" and click Apply Voucher.',
      'Inspect the computed Discount line item and Grand Total.'
    ],
    expectedOutput: 'Applying voucher SYSDEV50 should deduct ₱50.00 from the order total.',
    actualOutput: 'The discount voucher increases the checkout total by +₱50.00 due to an inverted math sign (+ instead of -).',
    screenshotPng: '/assets/bug-screenshots/merch-promo-invert.png',
    points: 100
  },
  {
    id: 9,
    title: 'Product Image Mismatch for Lanyard Item',
    siteId: 'merch',
    category: 'Layout / CSS',
    description: 'The product image for the SAMAHAN SysDEV Woven Lanyard and ID Holder incorrectly displays a wallet instead of a lanyard.',
    stepsToReproduce: [
      'Scroll through the merchandise catalog on the SysDEV Merch Site.',
      'Locate the product card for the "SAMAHAN SysDEV Woven Lanyard and ID Holder".',
      'Observe the product image displayed for the item.',
      'Notice that it shows a photograph of a wallet rather than a lanyard.'
    ],
    expectedOutput: 'The product image should accurately depict the lanyard being sold.',
    actualOutput: 'The product image displays a completely different item (a wallet).',
    screenshotPng: '/assets/bug-screenshots/merch-lanyard-image.png',
    points: 100
  },
  {
    id: 10,
    title: 'Defiant Free Shipping Policy Threshold',
    siteId: 'merch',
    category: 'Logic / Calculation',
    description: 'A store banner advertises "Free Davao City Shipping on orders over ₱1,500!". When an order exceeds ₱1,500 (e.g. ₱2,800), a flat ₱150.00 delivery fee remains actively charged.',
    stepsToReproduce: [
      'Note the banner above the shop catalog announcing Free Delivery over ₱1,500.',
      'Add items totaling over ₱1,500 to your shopping cart (e.g., Varsity Jacket + Mechanical Keyboard = ₱3,200).',
      'Inspect the Delivery Fee calculation in the checkout summary.',
      'Observe that the ₱150.00 standard delivery fee continues to be added to the billing total.'
    ],
    expectedOutput: 'When order subtotal surpasses ₱1,500.00, the Delivery Fee line should automatically waive to ₱0.00.',
    actualOutput: 'The ₱150.00 shipping fee is perpetually levied regardless of order threshold.',
    screenshotPng: '/assets/bug-screenshots/merch-shipping-defiance.png',
    points: 100
  },
  {
    id: 11,
    title: 'Option Selection Price Extra-Zero Decimal Slip',
    siteId: 'merch',
    category: 'Logic / Calculation',
    description: 'A SysDEV Varsity Jacket is advertised at ₱1,200.00 on the catalog listing, but selecting the "Custom Embroidered Name" customization option erroneously shifts the displayed item price to ₱12,000.00.',
    stepsToReproduce: [
      'Locate the "SysDEV Official Varsity Jacket" card in the merchandise catalog priced at ₱1,200.00.',
      'Click on the product customization radio option for "Add Custom Name Embroidery (+₱100)".',
      'Observe the live price display updates on the product card and item billing tag.',
      'Notice the price immediately jumps from ₱1,200.00 to ₱12,000.00 due to an extra trailing zero typo.'
    ],
    expectedOutput: 'Selecting name embroidery should adjust the item total to ₱1,300.00.',
    actualOutput: 'The price recalculation multiplies the base order by tenfold to ₱12,000.00.',
    screenshotPng: '/assets/bug-screenshots/merch-price-extra-zero.png',
    points: 100
  },
  {
    id: 12,
    title: 'Navbar Cart Badge Count Desync (+3 Jump on Single Add)',
    siteId: 'merch',
    category: 'Logic / Calculation',
    description: 'Clicking "Add to Cart" once on the SysDEV Lanyard item increments the header navigation bar cart item count badge by +3, despite adding only 1 physical unit to the actual cart review list.',
    stepsToReproduce: [
      'Ensure your initial shopping cart item count badge reads 0.',
      'Locate the "SAMAHAN SysDEV Woven Lanyard" product item in the shop catalog.',
      'Click the "Add to Cart" button exactly once.',
      'Compare the navbar item badge number (which reads +3) against the actual items appearing inside the cart drawer (which shows 1 unit).'
    ],
    expectedOutput: 'Adding 1 item to the shopping cart should increment the indicator badge count by exactly +1.',
    actualOutput: 'The navbar count indicator desynchronizes, increasing by +3 on every single click.',
    screenshotPng: '/assets/bug-screenshots/merch-cart-badge-desync.png',
    points: 100
  },

  // --- Site 3: SysDEV General Assembly Signup Form (SAMAHAN SysDEV GA Gathering) ---

  {
    id: 13,
    title: 'Role Filter Logic Failure',
    siteId: 'assembly',
    category: 'Logic / Calculation',
    description: 'When "Non-Developer Role" is selected in the first dropdown, the dependent Specific Role dropdown incorrectly merges and displays both Developer Roles AND Non-Developer Roles simultaneously.',
    stepsToReproduce: [
      'Navigate to the SysDEV GA Registration form tab.',
      'Locate the Member Role dropdown and select "Non-Developer Role".',
      'Open the Specific Role dropdown immediately below it.',
      'Observe that developer roles (e.g. Frontend Developer) erroneously appear alongside the valid non-developer roles.'
    ],
    expectedOutput: 'The dependent dropdown should filter options exclusively matching the selected parent category.',
    actualOutput: 'The role filter logic fails and concatenates multiple unrelated role lists.',
    screenshotPng: '/assets/bug-screenshots/ga-role-filter.png',
    points: 100
  },
  {
    id: 14,
    title: 'Invalid AdDU 6-Digit Student ID & Alphanumeric Acceptance',
    siteId: 'assembly',
    category: 'Validation / State',
    description: 'Ateneo de Davao University student IDs strictly require 6 numeric digits. Despite the label stating "Student ID (put your 6 digit ID)", the input accepts alphabetic text, symbols, or incorrect digit counts without validation errors.',
    stepsToReproduce: [
      'Locate the registration field explicitly labeled "Student ID (put your 6 digit ID)".',
      'Type alphabetic text, symbols, or invalid digit counts into the input (e.g., "ABCDEF", "1234", or "+63-SYSDEV").',
      'Click outside the field or trigger form verification.',
      'Notice that the field displays a valid checkmark instead of rejecting non-6-digit numeric input.'
    ],
    expectedOutput: 'The field should enforce regular expression pattern matching for exactly 6 digits (e.g., ^\\d{6}$).',
    actualOutput: 'Arbitrary alphanumeric text and incorrect string lengths pass validation cleanly.',
    screenshotPng: '/assets/bug-screenshots/ga-student-id-format.png',
    points: 100
  },
  {
    id: 15,
    title: 'Mobile Header Text Overflow Layout Issue',
    siteId: 'assembly',
    category: 'Layout / CSS',
    description: 'In mobile view, the flex container for the assembly header prevents text wrapping, causing the location text "Finster Auditorium, AdDU" to aggressively clip or overlap beyond the screen bounds.',
    stepsToReproduce: [
      'Switch the sandbox to Mobile View using the viewport controls.',
      'Look at the dark header containing the yellow "Annual Student Gathering" badge.',
      'Notice the location text next to it is overlapping or aggressively clipping off-screen.',
      'Right click exactly on the clipped header text row to report the layout bug.'
    ],
    expectedOutput: 'The header elements should use flex-wrap or truncation to gracefully adapt to small mobile screens.',
    actualOutput: 'The container forces non-wrapping content, causing raw overflow and unreadable text on small viewports.',
    screenshotPng: '/assets/bug-screenshots/ga-mobile-header.png',
    points: 100
  },
  {
    id: 16,
    title: 'Mandatory Student Consent Bypass',
    siteId: 'assembly',
    category: 'Validation / State',
    description: 'The mandatory agreement checkmark bearing a prominent red asterisk (*) can be left completely unchecked; clicking Submit successfully registers the student regardless.',
    stepsToReproduce: [
      'Scroll to the bottom confirmation section of the GA Signup Form.',
      'Leave the mandatory consent checkbox explicitly unchecked.',
      'Click the "Submit Assembly Registration" button.',
      'Observe that a green registration success banner appears anyway.',
      'Right-click the success banner to report the bypass vulnerability.'
    ],
    expectedOutput: 'Form validation must block submission and display an alert if the consent checkmark is blank.',
    actualOutput: 'The form skips validation of the boolean, registering the student and showing a success banner.',
    screenshotPng: '/assets/bug-screenshots/ga-consent-bypass.png',
    points: 100
  },
  {
    id: 17,
    title: 'Fake Emails Match Validation Indicator',
    siteId: 'assembly',
    category: 'Validation / State',
    description: 'The verification fields for AdDU Institutional Email falsely display a bright green "Emails match!" indicator as soon as text is present in both fields, completely ignoring actual string equality evaluation.',
    stepsToReproduce: [
      'Type "student@addu.edu.ph" in the primary AdDU Institutional Email field.',
      'In the Confirm AdDU Institutional Email field, type a completely conflicting address.',
      'Observe that a green "Emails match!" text immediately appears below the field despite the contradiction.',
      'Right click on the fake "Emails match!" indicator text to report the bug.'
    ],
    expectedOutput: 'The confirmation indicator should dynamically evaluate string equality and only display success if they perfectly match.',
    actualOutput: 'The success indicator renders unconditionally regardless of email string mismatches.',
    screenshotPng: '/assets/bug-screenshots/ga-email-mismatch.png',
    points: 100
  },
  {
    id: 18,
    title: 'Dropdown Chevron Missing Right Spacing Padding',
    siteId: 'assembly',
    category: 'Layout / CSS',
    description: 'The dropdown menus for the roles feature a visual CSS regression where the selection chevron icon lacks horizontal padding, clinging improperly to the rightmost edge of the select input boundary.',
    stepsToReproduce: [
      'Locate the Member Role or Specific Role dropdown menus on the registration form.',
      'Observe the position of the dropdown selection chevron icon on the far right.',
      'Note that the icon is misaligned and lacks standard CSS right-side padding.',
      'Carefully right-click exactly on the unpadded chevron icon edge to document the layout defect.'
    ],
    expectedOutput: 'The dropdown select element should have adequate horizontal padding so the chevron sits comfortably away from the element boundary.',
    actualOutput: 'The chevron icon touches the absolute edge of the element border due to missing or overridden padding classes.',
    screenshotPng: '/assets/bug-screenshots/ga-dropdown-chevron.png',
    points: 100
  },
];
