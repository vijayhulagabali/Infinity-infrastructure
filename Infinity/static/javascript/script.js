
document.getElementById("submitbtn").addEventListener("click", ValidateForm);

// Initialize Lucide icons when DOM is ready
document.addEventListener("DOMContentLoaded", function() {
    if (window.lucide) {
        lucide.createIcons();
    }
});

function ValidateForm() {
    // Client-side validation
    const fullName = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    let ok = true;
    document.getElementById("errorMessagefullName").textContent = '';
    document.getElementById("errorMessageEmail").textContent = '';
    document.getElementById("errMessageSubject").textContent = '';
    document.getElementById("errMessageMessage").textContent = '';
    document.getElementById("responseMessage").textContent = '';

    if (!fullName) {
        document.getElementById("errorMessagefullName").textContent = "Please enter your name.";
        ok = false;
    } else if (!/^[A-Za-z ]+$/.test(fullName)) {
        document.getElementById("errorMessagefullName").textContent = "Please enter a valid name (letters and spaces only).";
        ok = false;
    }

    if (!email) {
        document.getElementById("errorMessageEmail").textContent = "Please enter your email.";
        ok = false;
    } else if (!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        document.getElementById("errorMessageEmail").textContent = "Please enter a valid email address.";
        ok = false;
    }

    if (!subject) {
        document.getElementById("errMessageSubject").textContent = "Please enter a subject.";
        ok = false;
    }

    if (!message) {
        document.getElementById("errMessageMessage").textContent = "Please enter your message.";
        ok = false;
    }

    if (!ok) return;

    // Submit form via Formspree
    sendContactViaBackend({
        name: fullName,
        email: email,
        subject: subject,
        message: message
    });
}

async function sendContactViaBackend(payload) {
    try {
        const res = await fetch("http://127.0.0.1:5000/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (!res.ok) {
            document.getElementById("responseMessage").textContent = data.message;
            return;
        }

        showPopup();
    } catch (err) {
        document.getElementById("responseMessage").textContent =
            "Server error. Try again later.";
    }
}

function showPopup() {
    const popup = document.getElementById("popupBox");
    popup.style.display = "flex";

    setTimeout(() => {
        closePopup();
    }, 2000);
}

function closePopup() {
    const popup = document.getElementById("popupBox");
    popup.style.display = "none";
    document.getElementById("contactForm").reset();
}

// Video Modal Functions
function openVideo(videoSrc) {
    const modal = document.getElementById("videoModal");
    const videoFrame = document.getElementById("videoFrame");
    
    if (!modal || !videoFrame) {
        console.error("Video modal or frame element not found");
        return;
    }
    
    // Set the video source
    videoFrame.src = videoSrc;
    
    // Show the modal
    modal.style.display = "flex";
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
}

function closeVideo() {
    const modal = document.getElementById("videoModal");
    const videoFrame = document.getElementById("videoFrame");
    
    if (!modal || !videoFrame) {
        console.error("Video modal or frame element not found");
        return;
    }
    
    // Clear the video source to stop playback
    videoFrame.src = "";
    
    // Hide the modal
    modal.style.display = "none";
    
    // Re-enable body scroll
    document.body.style.overflow = "";
}

// Close modal when clicking outside the content
document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("videoModal");
    
    if (modal) {
        modal.addEventListener("click", function(event) {
            // Close only if clicking outside the modal-content
            if (event.target === modal) {
                closeVideo();
            }
        });
        
        // Also close on Escape key
        document.addEventListener("keydown", function(event) {
            if (event.key === "Escape" && modal.style.display === "flex") {
                closeVideo();
            }
        });
    }
});

