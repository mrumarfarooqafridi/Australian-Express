document.addEventListener("DOMContentLoaded", function () {
  // Function to update active navigation icon
  function updateActiveNav(section) {
    // Remove active class from all icons
    document.querySelectorAll("#el1, #el2, #el3, #el4").forEach((icon) => {
      icon.classList.remove("active");
    });

    // Add active class based on current section
    switch (section) {
      case "immediate":
        // No icon for immediate section
        break;
      case "shipment":
        document.getElementById("el2").classList.add("active");
        break;
      case "delivery":
        document.getElementById("el3").classList.add("active");
        break;
      case "checkout":
        document.getElementById("el4").classList.add("active");
        break;
    }
  }

  // Existing code for the avoid-shipping button
  document
    .getElementById("avoid-shipping")
    .addEventListener("click", function () {
      const button = document.getElementById("avoid-shipping");
      const shipmentInfo = document.getElementById("shipment-Info");

      // Animate button out
      button.classList.add("slide-out-right");

      // Wait for animation to finish before hiding
      setTimeout(() => {
        button.classList.add("d-none");
      }, 500);

      // Show and animate shipment info in
      shipmentInfo.classList.remove("d-none");
      shipmentInfo.classList.add("slide-in-left");

      // Update navigation to highlight shipment icon
      updateActiveNav("shipment");
    });

  // Modal functionality
  const deliveryModal = new bootstrap.Modal(
    document.getElementById("deliveryModal")
  );
  const progressModal = new bootstrap.Modal(
    document.getElementById("progressModal")
  );
  const returnModal = new bootstrap.Modal(
    document.getElementById("returnModal")
  );
  const returnProgressModal = new bootstrap.Modal(
    document.getElementById("returnProgressModal")
  );

  const timeSelection = document.getElementById("time-selection");
  const dateSelection = document.getElementById("date-selection");
  const timeButtons = document.querySelectorAll(".time-btn");
  const dateButtons = document.querySelectorAll(".date-btn");
  const newDeliveryBtn = document.getElementById("new-Delivery");
  const returnBtn = document.getElementById("return");
  const confirmReturnBtn = document.getElementById("confirm-return");
  const completeDeliveryBtn = document.getElementById("complete-delivery");
  const deliveryConfirmation = document.getElementById("delivery-confirmation");
  const immediateSection = document.getElementById("immediate-section");
  const shipmentInfo = document.getElementById("shipment-Info");
  const selectedDateEl = document.getElementById("selected-date");
  const selectedTimeEl = document.getElementById("selected-time");
  const progressBar = document.querySelector("#progressModal .progress-bar");
  const progressText = document.getElementById("progress-text");
  const continueBtn = document.getElementById("continue-btn");
  const returnYesBtn = document.getElementById("return-yes");
  const returnNoBtn = document.getElementById("return-no");
  const returnProgressBar = document.querySelector(
    "#returnProgressModal .progress-bar"
  );
  const returnProgressText = document.getElementById("return-progress-text");
  const returnContinueBtn = document.getElementById("return-continue-btn");

  // Open modal when Arrange New Delivery is clicked
  newDeliveryBtn.addEventListener("click", function () {
    deliveryModal.show();
  });

  // Open return modal when Return My Parcel is clicked
  returnBtn.addEventListener("click", function () {
    returnModal.show();
  });

  // Handle return no button
  returnNoBtn.addEventListener("click", function () {
    returnModal.hide();
  });

  // Handle return yes button
  returnYesBtn.addEventListener("click", function () {
    returnModal.hide();
    // Show confirm return button and hide others
    document.getElementById("new-Delivery").classList.add("d-none");
    document.getElementById("return").classList.add("d-none");
    confirmReturnBtn.classList.remove("d-none");
  });

  // Handle confirm return button
  confirmReturnBtn.addEventListener("click", function () {
    // Show return progress modal
    returnProgressModal.show();

    // Animate progress bar
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      returnProgressBar.style.width = `${progress}%`;
      returnProgressBar.setAttribute("aria-valuenow", progress);
      returnProgressText.textContent = `${progress}% Complete`;

      if (progress === 100) {
        clearInterval(interval);
        returnContinueBtn.classList.remove("d-none");
      }
    }, 50);
  });

  // Handle return continue button
  returnContinueBtn.addEventListener("click", function () {
    returnProgressModal.hide();
    // Hide all sections
    immediateSection.classList.add("d-none");
    shipmentInfo.classList.add("d-none");
    // Show success message or redirect
    alert("Return process completed successfully!");
    // Update navigation to highlight checkout icon
    updateActiveNav("checkout");
  });

  // Time button click handler
  timeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const selectedTime = this.getAttribute("data-time");

      // Hide time selection and show date selection
      timeSelection.classList.add("d-none");
      dateSelection.classList.remove("d-none");

      // Store the selected time for later use
      this.selectedTime = selectedTime;
    });
  });

  // Date button click handler
  dateButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const selectedDate = this.getAttribute("data-date");

      // Close the delivery modal
      deliveryModal.hide();

      // Hide the current sections
      immediateSection.classList.add("d-none");
      shipmentInfo.classList.add("d-none");

      // Show delivery confirmation section
      deliveryConfirmation.classList.remove("d-none");

      // Update the selected date and time
      selectedDateEl.textContent = selectedDate;
      selectedTimeEl.textContent = document
        .querySelector(".time-btn:hover")
        .getAttribute("data-time");

      // Update navigation to highlight delivery icon
      updateActiveNav("delivery");
    });
  });

  // Complete delivery button handler
  completeDeliveryBtn.addEventListener("click", function () {
    // Show progress modal
    progressModal.show();

    // Animate progress bar
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      progressBar.style.width = `${progress}%`;
      progressBar.setAttribute("aria-valuenow", progress);
      progressText.textContent = `${progress}% Complete`;

      if (progress === 100) {
        clearInterval(interval);
        continueBtn.classList.remove("d-none");
      }
    }, 50);
  });

  // Continue button handler
  continueBtn.addEventListener("click", function () {
    progressModal.hide();
    // Update navigation to highlight checkout icon
    updateActiveNav("checkout");
    // Here you would typically redirect or show a success message
    alert("Delivery process completed successfully!");
  });

  // Reset modal state when it's closed
  document
    .getElementById("deliveryModal")
    .addEventListener("hidden.bs.modal", function () {
      timeSelection.classList.remove("d-none");
      dateSelection.classList.add("d-none");
    });
});
