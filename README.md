# SysDEV QA Assessment Test

SAMAHAN Systems Development | Ateneo de Davao University

## Overview

The SysDEV QA Assessment Test is a web-based testing platform designed to evaluate Quality Assurance (QA) candidates for SAMAHAN Systems Development.

The assessment consists of two main parts:
1. **Interactive Sandbox**: Candidates explore three simulated web pages across different viewports (Desktop, Tablet, and Mobile) to discover 18 intentional software defects within a 15-minute time limit.
2. **GitHub Issue Ticketing Simulator**: Candidates document 3 of their discovered bugs by drafting defect reports using a structured markdown template and attaching screenshots.

---

## Features & Architecture

- **Simulated Web Applications**:
  - **Tab 1: SysDEV Website**: Organizational landing page with layout and responsive defects.
  - **Tab 2: SysDEV Merch Site**: E-commerce shop with logic, pricing, and cart state defects.
  - **Tab 3: SysDEV GA Registration**: Registration portal with validation and state management defects.
- **Viewport Simulation**: Viewport toggle controls for Desktop (full width), Tablet (768px), and Mobile (375px).
- **Bug Discovery**: Right-click context menu mechanism to report observed defects.
- **Issue Simulator**: Interactive ticket creation tool with markdown preview, header parsing, image attachment support, and edit/delete capabilities.
- **Assessment Summary**: Score breakdown, duration tracking, and exportable summary.

---

## Bug Registry (Answer Key)

Below is the catalog of all 18 intentional defects across the three environments:

### Tab 1: SysDEV Website
| ID | Bug Title | Category | Description |
|---|---|---|---|
| 1 | External Link Redirects to Wrong Destination | Validation / State | "View Full Calendar" link redirects to linkedin.com instead of an internal/external calendar. |
| 2 | Mobile Viewport Drawer Navigation Occluding Search Input | Layout / CSS | In Mobile view, the hamburger menu button overlaps the search input field. |
| 3 | Clipped Workshop Feature Card Title Text | Layout / CSS | Workshop title text is cut off vertically due to fixed container height and overflow settings. |
| 4 | Off-Grid Executive Board Officer Card Spill | Layout / CSS | The 3rd officer card has hardcoded margins forcing it to overlap the 4th card. |
| 5 | Newsletter Accepts Non-Institutional Email | Validation / State | Newsletter subscribe field accepts personal emails (e.g., @gmail.com) instead of requiring @addu.edu.ph. |
| 6 | Distorted Community Showcase Photograph Aspect Ratio | Layout / CSS | Community photo is stretched out of aspect ratio due to missing object-fit styling. |

### Tab 2: SysDEV Merch Site
| ID | Bug Title | Category | Description |
|---|---|---|---|
| 7 | Shopping Cart Quantity Negative Underflow | Logic / Calculation | Decrementing item quantity below 0 allows negative values and reduces subtotal incorrectly. |
| 8 | Inverted Promo Voucher Calculation (SYSDEV50) | Logic / Calculation | Applying code SYSDEV50 adds ₱50 to the total instead of deducting it. |
| 9 | Product Image Mismatch for Lanyard Item | Layout / CSS | The product card for the Woven Lanyard displays an image of a wallet instead of a lanyard. |
| 10 | Defiant Free Shipping Policy Threshold | Logic / Calculation | Shipping fee of ₱150 is charged even when the order subtotal exceeds ₱1,500. |
| 11 | Option Selection Price Extra-Zero Decimal Slip | Logic / Calculation | Selecting the custom embroidery option increases Varsity Jacket price to ₱12,000. |
| 12 | Navbar Cart Badge Count Desync (+3 Jump on Single Add) | Logic / Calculation | Adding 1 item increments the navbar cart badge count by +3. |

### Tab 3: SysDEV GA Registration
| ID | Bug Title | Category | Description |
|---|---|---|---|
| 13 | Role Filter Logic Failure | Logic / Calculation | Selecting "Non-Developer Role" still displays Developer roles in the dependent dropdown. |
| 14 | Invalid AdDU 6-Digit Student ID & Alphanumeric Acceptance | Validation / State | Student ID field accepts non-numeric characters and strings of invalid lengths. |
| 15 | Mobile Header Text Overflow Layout Issue | Layout / CSS | In Mobile view, header text does not wrap and overflows off-screen. |
| 16 | Mandatory Student Consent Bypass | Validation / State | Form submits successfully even when mandatory consent checkbox is left unchecked. |
| 17 | Fake Emails Match Validation Indicator | Validation / State | "Emails match!" indicator appears whenever both email inputs contain text, regardless of whether they actually match. |
| 18 | Dropdown Chevron Missing Right Spacing Padding | Layout / CSS | Dropdown chevrons sit flush against the right edge of select inputs due to missing padding. |

---

## Tech Stack & Setup

### Requirements
- Node.js 18+
- npm

### Development Commands
- Install dependencies: `npm install`
- Start development server: `npm run dev`
- Build for production: `npm run build`

---

## Ticket Description Template

The GitHub Issue Simulator provides the following template structure for ticket reporting:

```markdown
### Type
[Specify: Bug, UI/UX Problem, Accessibility Issue, Feature Request, etc.]

### Page/Section
[Specify which tab and exactly which part of the page this was found]

### Detailed Bug Description
[Describe what occurs vs what is expected to occur in the simulated application]

### Step-by-Step Reproduction Procedure
1. Navigate to Tab: [SysDEV Org Page / Merch Site / General Assembly]
2. Perform test action: [e.g., Click 'Add to Cart' or select 1st Year dropdown]
3. Observe software defect: [Describe exact incorrect feedback]

### Expected Output vs. Actual Output
- Expected Output: [Correct standard behavior]
- Actual Output: [Observed system error]

### Environment
- OS / Browser: Windows / Chrome (or Mobile / Firefox)
```
