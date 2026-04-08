/**
 * Contact JS
 * Handles Form Validation and Mock Submission
 */

document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
});

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const serviceSelect = document.getElementById('service');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');
    const feedbackBox = document.getElementById('formFeedback');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent actual form submission

        // Reset state
        let isValid = true;
        resetValidation(nameInput);
        resetValidation(emailInput);
        resetValidation(serviceSelect);
        resetValidation(messageInput);
        feedbackBox.classList.remove('success');

        // Validation Checks
        if (nameInput.value.trim() === '') {
            showError(nameInput);
            isValid = false;
        } else {
            showSuccess(nameInput);
        }

        if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value.trim())) {
            showError(emailInput);
            isValid = false;
        } else {
            showSuccess(emailInput);
        }

        if (serviceSelect.value === '') {
            showError(serviceSelect);
            isValid = false;
        } else {
            showSuccess(serviceSelect);
        }

        if (messageInput.value.trim().length < 10) {
            showError(messageInput);
            isValid = false;
        } else {
            showSuccess(messageInput);
        }

        // Mock Submission if valid
        if (isValid) {
            // Show loading state on button
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loader" style="width: 24px; height: 24px; border-width: 2px;"></span>';
            submitBtn.disabled = true;

            // Simulate API request delay
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;

                // Show success message
                feedbackBox.classList.add('success');

                // Reset form fields
                form.reset();

                // Remove success validation styling after reset
                [nameInput, emailInput, serviceSelect, messageInput].forEach(resetValidation);
            }, 1500);
        }
    });

    // Helper functions
    function showError(inputElement) {
        inputElement.classList.add('error');
        inputElement.classList.remove('success');
        const errorMsg = inputElement.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains('error-message')) {
            errorMsg.style.display = 'block';
        }
    }

    function showSuccess(inputElement) {
        inputElement.classList.add('success');
        inputElement.classList.remove('error');
        const errorMsg = inputElement.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains('error-message')) {
            errorMsg.style.display = 'none';
        }
    }

    function resetValidation(inputElement) {
        inputElement.classList.remove('error', 'success');
        const errorMsg = inputElement.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains('error-message')) {
            errorMsg.style.display = 'none';
        }
    }

    function isValidEmail(email) {
        // Basic email regex
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Input events for real-time validation removal
    const inputs = [nameInput, emailInput, serviceSelect, messageInput];
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                resetValidation(input);
            }
        });
    });
}
