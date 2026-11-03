
document.addEventListener("DOMContentLoaded", function () {

    // Highlight the current page
    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll("nav a").forEach(function (link) {
        if (link.getAttribute("href") === currentPage) {
            link.style.color = "#ff3333";
        }
    });

    // Filter services
    const filterButtons = document.querySelectorAll("[data-filter]");
    const serviceCards = document.querySelectorAll(".service-card");

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const category = button.dataset.filter;

            serviceCards.forEach(function (card) {
                card.style.display =
                    category === "all" ||
                    card.dataset.category === category
                    ? "block" : "none";
            });
        });
    });

    // Select a service from the services page
    const serviceSelect = document.getElementById("enquiryType");

    if (serviceSelect) {
        const selectedService = localStorage.getItem("selectedAudiService");

        if (selectedService) {
            serviceSelect.value = selectedService;
            localStorage.removeItem("selectedAudiService");
        }
    }

    // Set the minimum service date
    const serviceDate = document.getElementById("serviceDate");

    if (serviceDate) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        serviceDate.min = `${year}-${month}-${day}`;
    }

    // Submit service booking form
    const bookingForm = document.getElementById("bookingForm");

    if (bookingForm) {
        bookingForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!bookingForm.checkValidity()) {
                bookingForm.reportValidity();
                return;
            }

            alert("Thank you! Your service enquiry has been prepared.");
            bookingForm.reset();
        });
    }

    // Submit contact form
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            alert("Thank you for contacting Audi Motor Build!");
            contactForm.reset();
        });
    }

    // Submit customer enquiry form
    const enquiryForm = document.getElementById("enquiryForm");

    if (enquiryForm) {
        enquiryForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!enquiryForm.checkValidity()) {
                enquiryForm.reportValidity();
                return;
            }

            const enquiry = {
                name: document.getElementById("customerName").value.trim(),
                email: document.getElementById("customerEmail").value.trim(),
                phone: document.getElementById("customerPhone").value.trim(),
                type: document.getElementById("enquiryType").value,
                message: document.getElementById("customerMessage").value.trim()
            };

            const enquiries = JSON.parse(
                localStorage.getItem("audiEnquiries") || "[]"
            );

            enquiries.push(enquiry);

            localStorage.setItem(
                "audiEnquiries",
                JSON.stringify(enquiries)
            );

            document.getElementById("enquiryMessage").textContent =
                "Your enquiry has been submitted successfully!";

            enquiryForm.reset();
        });
    }

    // Display customer enquiries
    const enquiryList = document.getElementById("enquiryList");

    if (enquiryList) {
        const enquiries = JSON.parse(
            localStorage.getItem("audiEnquiries") || "[]"
        );

        if (enquiries.length === 0) {
            enquiryList.textContent =
                "No customer enquiries have been submitted yet.";
        } else {
            enquiries.forEach(function (enquiry) {
                const card = document.createElement("section");
                card.className = "service-card";

                const details = [
                    ["Customer Name", enquiry.name],
                    ["Email", enquiry.email],
                    ["Phone", enquiry.phone],
                    ["Enquiry Type", enquiry.type],
                    ["Message", enquiry.message]
                ];

                details.forEach(function (detail) {
                    const paragraph = document.createElement("p");
                    const label = document.createElement("strong");

                    label.textContent = detail[0] + ": ";
                    paragraph.appendChild(label);
                    paragraph.appendChild(
                        document.createTextNode(detail[1] || "")
                    );

                    card.appendChild(paragraph);
                });

                enquiryList.appendChild(card);
            });
        }
    }

});

// Open the enquiry page with the selected service
function enquireService(serviceName) {
    localStorage.setItem("selectedAudiService", serviceName);
    window.location.href = "enquire.html";
}


document.addEventListener("DOMContentLoaded", function () {

    // Interactive tabs
    const tabButtons = document.querySelectorAll(".tab-button");

    tabButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            document.querySelectorAll(".tab-button").forEach(function (tab) {
                tab.classList.remove("active");
            });

            document.querySelectorAll(".tab-content").forEach(function (content) {
                content.classList.remove("active");
            });

            button.classList.add("active");

            const content = document.getElementById(button.dataset.tab);

            if (content) {
                content.classList.add("active");
            }
        });
    });

    // Accordion questions
    document.querySelectorAll(".accordion").forEach(function (button) {
        button.addEventListener("click", function () {
            const panel = button.nextElementSibling;
            const isOpen = panel.classList.contains("open");

            panel.classList.toggle("open", !isOpen);
            button.setAttribute("aria-expanded", String(!isOpen));
        });

        button.setAttribute("aria-expanded", "false");
    });

    // Image gallery lightbox
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const closeLightbox = document.getElementById("closeLightbox");

    document.querySelectorAll(".gallery-image").forEach(function (image) {
        image.addEventListener("click", function () {
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            lightbox.classList.add("open");
        });
    });

    function closeImage() {
        lightbox.classList.remove("open");
        lightboxImage.src = "";
    }

    if (closeLightbox) {
        closeLightbox.addEventListener("click", closeImage);
    }

    if (lightbox) {
        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) {
                closeImage();
            }
        });
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && lightbox) {
            closeImage();
        }
    });

    // Interactive Leaflet map
    const mapElement = document.getElementById("map");

    if (mapElement && typeof L !== "undefined") {
        const map = L.map("map").setView(
            [-26.2041, 28.0473],
            11
        );

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([-26.2041, 28.0473])
            .addTo(map)
            .bindPopup("Example location: Johannesburg")
            .openPopup();
    }

});

const questions = document.querySelectorAll(".accordion");

questions.forEach(function(question) {
    question.addEventListener("click", function() {
        const answer = question.nextElementSibling;
        answer.classList.toggle("open");
    });
});
document.addEventListener("DOMContentLoaded", function () {

    // FAQ accordion
    document.querySelectorAll(".accordion").forEach(function (button) {
        button.addEventListener("click", function () {
            const panel = button.nextElementSibling;

            if (!panel || !panel.classList.contains("accordion-panel")) {
                return;
            }

            panel.classList.toggle("open");

            const isOpen = panel.classList.contains("open");
            button.setAttribute("aria-expanded", isOpen);
        });

        button.setAttribute("aria-expanded", "false");
    });

});