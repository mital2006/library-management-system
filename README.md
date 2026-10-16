# Solar Panel Cleaning Robot Project Tracker

A modern, responsive web application for engineering project management, deadline tracking, and consultation reporting for an autonomous **Solar Panel Cleaning Robot**.

Designed with a sleek **dark-blue, white, and solar-yellow** aesthetic.

---

## ⚡ Core Features

1. **Project Title & Context**:
   - Comprehensive system overview of an autonomous robotic crawler designed to clean dust and soiling from solar panels without water or surface degradation.

2. **Dynamic Real-Time Deadline Countdown**:
   - **Deadline**: October 20, 2026.
   - Calculates remaining **Days, Hours, Minutes, and Seconds** dynamically using JavaScript relative to current time (no hardcoding).
   - **Editable Deadline**: Allows users to customize the delivery date and time directly using the integrated date picker.
   - **Scenario Presets**: Includes one-click test simulation buttons (*In 1 Day*, *In 3 Days*, *Set Overdue*, *In 14 Days*).

3. **Intelligent Alert & Warning System**:
   - **Urgent Warning (< 5 Calendar Days)**: Automatically triggers a high-visibility warning banner when fewer than five calendar days remain before the deadline.
   - **Overdue Alert**: Displays a critical overdue notification if the deadline passes and tasks remain incomplete.
   - **Completion Banner**: Celebrates full delivery when 100% of tasks are verified.

4. **Task Deliverables & Progress Tracker**:
   - **Dynamic Progress Bar**: Starts at a **70%** target baseline and updates in real-time as items are checked.
   - **Key Pending Deliverables (High/Critical Priority)**:
     - Complete robot testing.
     - Prepare project documentation.
     - Finalize the presentation.
     - Verify the final demonstration.
   - **Pre-Completed Engineering Milestones**: 9 architectural foundations (Chassis, wiper mechanism, ESP32 integration, edge sensors, battery pack, etc.).
   - **Hardware Honesty Safeguard**: Explicitly notes that physical robot tests are unverified until the user checks off the testing deliverable.

5. **Project Consultation & Risk Assessment Report**:
   - Status: `Deadline Approaching`
   - Priority: `High`
   - Target Progress: `70%`
   - Audit findings, schedule compression analysis, and actionable remediation punch list.

---

## 🚀 How to Run Locally

### Option 1: Direct File Launch (Simplest)
Navigate to:
```
C:\Users\mital\.gemini\antigravity\scratch\solar-panel-cleaning-robot-tracker
```
Double-click **`index.html`** or open it with Google Chrome, Microsoft Edge, or Firefox.

### Option 2: PowerShell
Run the command:
```powershell
Start-Process "C:\Users\mital\.gemini\antigravity\scratch\solar-panel-cleaning-robot-tracker\index.html"
```

### Option 3: VS Code Live Server
Open the folder in VS Code and click **Go Live** or right-click `index.html` &rarr; **Open with Live Server**.

---

## 📁 File Structure

```
solar-panel-cleaning-robot-tracker/
├── index.html       # Semantic HTML5 layout, countdown timer, hero progress, task list, consultation report
├── style.css        # Modern dark-blue, white, and solar-yellow styling, responsive grid & animations
├── script.js        # Dynamic countdown ticker, deadline editor, task percentage engine, status warnings
├── README.md        # Technical documentation and local run instructions
└── .gitignore       # Git exclusion configuration
```
