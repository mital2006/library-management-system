/**
 * Solar Panel Cleaning Robot Project Tracker
 * Dynamic Countdown Engine, Task Progress Calculator & Status Automation
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. Initial State & Configuration
  // =========================================================================
  
  // Default target deadline: October 20, 2026 at 23:59:59
  const DEFAULT_DEADLINE_STR = '2026-10-20T23:59:59';
  let targetDeadline = new Date(DEFAULT_DEADLINE_STR);

  // DOM Elements - Countdown
  const countDaysEl = document.getElementById('countDays');
  const countHoursEl = document.getElementById('countHours');
  const countMinutesEl = document.getElementById('countMinutes');
  const countSecondsEl = document.getElementById('countSeconds');
  const countdownStatusMessage = document.getElementById('countdownStatusMessage');
  const deadlineDateInput = document.getElementById('deadlineDateInput');
  const updateDeadlineBtn = document.getElementById('updateDeadlineBtn');
  const resetDefaultDeadlineBtn = document.getElementById('resetDefaultDeadlineBtn');

  // DOM Elements - Warnings & Alerts
  const deadlineAlertBanner = document.getElementById('deadlineAlertBanner');
  const alertTitle = document.getElementById('alertTitle');
  const alertDescription = document.getElementById('alertDescription');
  const alertDateText = document.getElementById('alertDateText');
  const alertPendingNotice = document.getElementById('alertPendingNotice');

  // DOM Elements - Hero & Progress
  const heroProgressPercentage = document.getElementById('heroProgressPercentage');
  const heroProgressBar = document.getElementById('heroProgressBar');
  const tasksSummaryText = document.getElementById('tasksSummaryText');
  const heroDeadlineVal = document.getElementById('heroDeadlineVal');
  const heroHardwareState = document.getElementById('heroHardwareState');
  const heroPhaseVal = document.getElementById('heroPhaseVal');

  // DOM Elements - Badges & Statuses
  const headerStatusBadge = document.getElementById('headerStatusBadge');
  const headerPriorityBadge = document.getElementById('headerPriorityBadge');
  const navPendingCount = document.getElementById('navPendingCount');
  const pendingCountBadge = document.getElementById('pendingCountBadge');

  // DOM Elements - Consultation Section
  const consultDeadlineVal = document.getElementById('consultDeadlineVal');
  const consultDaysLeftSub = document.getElementById('consultDaysLeftSub');
  const consultProgressVal = document.getElementById('consultProgressVal');
  const consultTasksRemainingSub = document.getElementById('consultTasksRemainingSub');
  const consultTestingStatusVal = document.getElementById('consultTestingStatusVal');
  const consultStatusBadge = document.getElementById('consultStatusBadge');

  // DOM Elements - Tasks Checklist
  const taskCheckboxes = document.querySelectorAll('.task-checkbox');
  const pendingCheckboxes = document.querySelectorAll('#pendingTasksList .task-checkbox');
  const taskRobotTesting = document.getElementById('task_robot_testing');
  const filterPendingOnlyBtn = document.getElementById('filterPendingOnlyBtn');
  const filterAllTasksBtn = document.getElementById('filterAllTasksBtn');
  const checkAllPendingBtn = document.getElementById('checkAllPendingBtn');

  // Scenario Presets
  const presetTomorrow = document.getElementById('presetTomorrow');
  const presetThreeDays = document.getElementById('presetThreeDays');
  const presetOverdue = document.getElementById('presetOverdue');
  const presetTwoWeeks = document.getElementById('presetTwoWeeks');

  // Format Helper for input[type="datetime-local"]
  function formatForDateTimeInput(date) {
    const pad = (n) => String(n).padStart(2, '0');
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  // Format Human Readable Date
  function formatHumanDate(date) {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }

  // =========================================================================
  // 2. Real-Time Dynamic Countdown Calculation Engine
  // =========================================================================
  
  function updateCountdown() {
    const now = new Date();
    const diffMs = targetDeadline.getTime() - now.getTime();
    const totalRemainingSeconds = Math.floor(diffMs / 1000);

    const isOverdue = diffMs <= 0;
    const absDiffMs = Math.abs(diffMs);

    // Dynamic Time Math
    const days = Math.floor(absDiffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((absDiffMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((absDiffMs / (1000 * 60)) % 60);
    const seconds = Math.floor((absDiffMs / 1000) % 60);

    const pad = (n) => String(n).padStart(2, '0');

    if (!isOverdue) {
      countDaysEl.textContent = pad(days);
      countHoursEl.textContent = pad(hours);
      countMinutesEl.textContent = pad(minutes);
      countSecondsEl.textContent = pad(seconds);
      countdownStatusMessage.textContent = `Active Countdown: ${days} day(s), ${hours} hour(s) remaining until scheduled sign-off.`;
    } else {
      // Overdue state
      countDaysEl.textContent = '00';
      countHoursEl.textContent = '00';
      countMinutesEl.textContent = '00';
      countSecondsEl.textContent = '00';
      countdownStatusMessage.textContent = `CRITICAL: Project is overdue by ${days} day(s) and ${hours} hour(s)!`;
    }

    // Update Warnings, Banners and Status Badges
    updateWarningAndStatusState(days, isOverdue);
  }

  // =========================================================================
  // 3. Dynamic Warning & Status Determination
  // =========================================================================

  function updateWarningAndStatusState(daysRemaining, isOverdue) {
    const totalTasks = taskCheckboxes.length;
    let checkedCount = 0;
    taskCheckboxes.forEach(cb => { if (cb.checked) checkedCount++; });
    const isAllComplete = checkedCount === totalTasks;

    const formattedDeadline = formatHumanDate(targetDeadline);
    alertDateText.textContent = formattedDeadline;
    heroDeadlineVal.textContent = formattedDeadline;
    consultDeadlineVal.textContent = formattedDeadline;

    // Remaining Pending Tasks count
    let pendingCount = 0;
    pendingCheckboxes.forEach(cb => { if (!cb.checked) pendingCount++; });
    navPendingCount.textContent = pendingCount;
    pendingCountBadge.textContent = pendingCount;
    alertPendingNotice.textContent = `${pendingCount} critical pending tasks require immediate resolution`;
    consultTasksRemainingSub.textContent = `${pendingCount} tasks remaining`;

    // CASE 1: All tasks completed (100%)
    if (isAllComplete) {
      deadlineAlertBanner.className = 'alert-banner alert-complete';
      alertTitle.textContent = 'PROJECT COMPLETED: All Milestones & Deliverables Verified!';
      alertDescription.innerHTML = `All <strong>${totalTasks}</strong> engineering milestones, physical robot tests, and presentation slides are finalized.`;
      
      headerStatusBadge.className = 'badge';
      headerStatusBadge.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
      headerStatusBadge.style.color = '#34d399';
      headerStatusBadge.style.borderColor = 'rgba(16, 185, 129, 0.4)';
      headerStatusBadge.innerHTML = '<span class="pulse-indicator" style="background:#10b981;"></span> Status: Complete';

      consultStatusBadge.textContent = 'Status: Complete';
      consultStatusBadge.className = 'badge';
      consultStatusBadge.style.backgroundColor = 'var(--success-bg)';
      consultStatusBadge.style.color = 'var(--success-green)';
      consultDaysLeftSub.textContent = 'Delivered ahead of deadline';
      heroPhaseVal.textContent = 'Sign-Off Complete';
      return;
    }

    // CASE 2: Deadline Passed & Not Complete (Overdue)
    if (isOverdue) {
      deadlineAlertBanner.className = 'alert-banner alert-overdue';
      alertTitle.textContent = '🚨 CRITICAL OVERDUE ALERT: Delivery Deadline Has Passed!';
      alertDescription.innerHTML = `The target deadline of <strong>${formattedDeadline}</strong> has passed without completion. 
        <strong>${pendingCount}</strong> required deliverables are currently delayed. Emergency escalation initiated.`;

      headerStatusBadge.className = 'badge';
      headerStatusBadge.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
      headerStatusBadge.style.color = '#fca5a5';
      headerStatusBadge.style.borderColor = 'rgba(239, 68, 68, 0.4)';
      headerStatusBadge.innerHTML = '<span class="pulse-indicator" style="background:#ef4444;"></span> Status: Overdue';

      consultStatusBadge.textContent = 'Status: Overdue';
      consultStatusBadge.className = 'badge';
      consultStatusBadge.style.backgroundColor = 'var(--danger-bg)';
      consultStatusBadge.style.color = 'var(--danger-red)';
      consultDaysLeftSub.textContent = 'Deadline exceeded';
      heroPhaseVal.textContent = 'Overdue Delivery Escalation';
      return;
    }

    // CASE 3: Fewer Than 5 Calendar Days Remaining (Urgent Warning - Prompt Specification)
    if (daysRemaining < 5) {
      deadlineAlertBanner.className = 'alert-banner alert-warning-urgent';
      alertTitle.textContent = `⚠️ URGENT DEADLINE ALERT: Fewer Than 5 Days Remaining (${daysRemaining} Days Left)!`;
      alertDescription.innerHTML = `The project deadline of <strong>${formattedDeadline}</strong> is approaching rapidly. 
        <strong>${pendingCount}</strong> critical pending deliverables require prompt completion before formal demonstration.`;

      headerStatusBadge.className = 'badge badge-status';
      headerStatusBadge.innerHTML = '<span class="pulse-indicator"></span> Status: Deadline Approaching';

      consultStatusBadge.textContent = 'Status: Deadline Approaching';
      consultStatusBadge.className = 'badge badge-status';
      consultDaysLeftSub.textContent = `${daysRemaining} calendar day(s) remaining`;
      heroPhaseVal.textContent = 'Critical Pre-Delivery Sprint';
      return;
    }

    // CASE 4: Normal In-Progress (> 5 Calendar Days)
    deadlineAlertBanner.className = 'alert-banner alert-warning-urgent';
    deadlineAlertBanner.style.background = 'linear-gradient(90deg, #eff6ff 0%, #e0f2fe 100%)';
    deadlineAlertBanner.style.borderLeftColor = '#2563eb';
    deadlineAlertBanner.style.borderColor = '#93c5fd';
    deadlineAlertBanner.style.color = '#1e3a8a';
    alertTitle.textContent = `Project In Progress: ${daysRemaining} Calendar Days Remaining`;
    alertDescription.innerHTML = `Current delivery schedule is set for <strong>${formattedDeadline}</strong>. 
      Maintain development pacing across the <strong>${pendingCount}</strong> remaining deliverables.`;

    headerStatusBadge.className = 'badge';
    headerStatusBadge.style.backgroundColor = 'rgba(37, 99, 235, 0.2)';
    headerStatusBadge.style.color = '#93c5fd';
    headerStatusBadge.style.borderColor = 'rgba(37, 99, 235, 0.4)';
    headerStatusBadge.innerHTML = '<span class="pulse-indicator" style="background:#3b82f6;"></span> Status: In Progress';

    consultStatusBadge.textContent = 'Status: In Progress';
    consultStatusBadge.className = 'badge';
    consultStatusBadge.style.backgroundColor = '#eff6ff';
    consultStatusBadge.style.color = '#1e3a8a';
    consultDaysLeftSub.textContent = `${daysRemaining} days remaining`;
    heroPhaseVal.textContent = 'Hardware Assembly & Integration';
  }

  // =========================================================================
  // 4. Task Progress Calculation & Hardware Verification State
  // =========================================================================

  function updateTaskProgress() {
    const totalTasks = taskCheckboxes.length;
    let checkedCount = 0;

    taskCheckboxes.forEach(cb => {
      const parentLabel = cb.closest('.task-row');
      if (cb.checked) {
        checkedCount++;
        if (parentLabel) parentLabel.classList.add('task-done-item');
      } else {
        if (parentLabel && parentLabel.classList.contains('task-pending-item')) {
          parentLabel.classList.remove('task-done-item');
        }
      }
    });

    // Dynamic Progress Percentage Calculation
    const percentage = Math.round((checkedCount / totalTasks) * 100);

    // Update Hero and Consultation Displays
    heroProgressPercentage.textContent = `${percentage}%`;
    heroProgressBar.style.width = `${percentage}%`;
    tasksSummaryText.textContent = `${checkedCount} of ${totalTasks} milestones completed`;
    consultProgressVal.textContent = `${percentage}%`;

    // Check Robot Testing Status (Explicit prompt requirement:
    // "Do not claim that a physical robot has been tested unless the user enters that information")
    if (taskRobotTesting && taskRobotTesting.checked) {
      heroHardwareState.textContent = 'Verified & Tested (Passed)';
      heroHardwareState.className = 'meta-val text-success';
      consultTestingStatusVal.textContent = 'Tested & Verified';
      consultTestingStatusVal.className = 'c-val text-success';
    } else {
      heroHardwareState.textContent = 'Testing Pending (Not Verified)';
      heroHardwareState.className = 'meta-val text-pending';
      consultTestingStatusVal.textContent = 'Unverified / Incomplete';
      consultTestingStatusVal.className = 'c-val text-pending';
    }

    // Refresh countdown and warnings with updated task counts
    updateCountdown();
  }

  // Attach change listener to all checkboxes
  taskCheckboxes.forEach(cb => {
    cb.addEventListener('change', updateTaskProgress);
  });

  // =========================================================================
  // 5. Editable Deadline Controls & Scenario Presets
  // =========================================================================

  // Initialize Input with Default Date
  deadlineDateInput.value = formatForDateTimeInput(targetDeadline);

  // Update Deadline Button
  updateDeadlineBtn.addEventListener('click', () => {
    const entered = deadlineDateInput.value;
    if (entered) {
      targetDeadline = new Date(entered);
      updateCountdown();
    }
  });

  // Reset to Default Deadline (October 20, 2026)
  resetDefaultDeadlineBtn.addEventListener('click', () => {
    targetDeadline = new Date(DEFAULT_DEADLINE_STR);
    deadlineDateInput.value = formatForDateTimeInput(targetDeadline);
    updateCountdown();
  });

  // Preset Scenario: Tomorrow (Tests < 5 days condition)
  presetTomorrow.addEventListener('click', () => {
    const tmrw = new Date();
    tmrw.setDate(tmrw.getDate() + 1);
    targetDeadline = tmrw;
    deadlineDateInput.value = formatForDateTimeInput(targetDeadline);
    updateCountdown();
  });

  // Preset Scenario: In 3 Days
  presetThreeDays.addEventListener('click', () => {
    const d3 = new Date();
    d3.setDate(d3.getDate() + 3);
    targetDeadline = d3;
    deadlineDateInput.value = formatForDateTimeInput(targetDeadline);
    updateCountdown();
  });

  // Preset Scenario: Set Overdue (Yesterday)
  presetOverdue.addEventListener('click', () => {
    const yest = new Date();
    yest.setDate(yest.getDate() - 1);
    targetDeadline = yest;
    deadlineDateInput.value = formatForDateTimeInput(targetDeadline);
    updateCountdown();
  });

  // Preset Scenario: In 14 Days
  presetTwoWeeks.addEventListener('click', () => {
    const d14 = new Date();
    d14.setDate(d14.getDate() + 14);
    targetDeadline = d14;
    deadlineDateInput.value = formatForDateTimeInput(targetDeadline);
    updateCountdown();
  });

  // =========================================================================
  // 6. Task Filters & Bulk Actions
  // =========================================================================

  filterPendingOnlyBtn.addEventListener('click', () => {
    const completedItems = document.querySelectorAll('#completedTasksList .task-row');
    completedItems.forEach(item => {
      item.style.display = 'none';
    });
    filterPendingOnlyBtn.className = 'btn btn-solar';
    filterAllTasksBtn.className = 'btn btn-outline-light';
  });

  filterAllTasksBtn.addEventListener('click', () => {
    const completedItems = document.querySelectorAll('#completedTasksList .task-row');
    completedItems.forEach(item => {
      item.style.display = 'flex';
    });
    filterPendingOnlyBtn.className = 'btn btn-outline-solar';
    filterAllTasksBtn.className = 'btn btn-solar';
  });

  checkAllPendingBtn.addEventListener('click', () => {
    pendingCheckboxes.forEach(cb => {
      cb.checked = true;
    });
    updateTaskProgress();
  });

  // =========================================================================
  // 7. Timer Ticker Initialization
  // =========================================================================
  
  // Initial Run
  updateTaskProgress();
  updateCountdown();

  // Run countdown ticker every 1000ms (1 second)
  setInterval(updateCountdown, 1000);
});
