// ===============================
// MOBILE NAVIGATION
// ===============================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});


// Close mobile menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
    });
});


// ===============================
// SCROLL PROGRESS BAR
// ===============================

const progressBar = document.getElementById("progressBar");

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const scrollPercentage =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

    progressBar.style.width = `${scrollPercentage}%`;
});


// ===============================
// BACK TO TOP BUTTON
// ===============================

const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {
        backTop.classList.add("show");
    } else {
        backTop.classList.remove("show");
    }

});

backTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ===============================
// ACTIVE NAVIGATION LINK
// ===============================

window.addEventListener("scroll", () => {

    const sections = document.querySelectorAll(
        "section[id], header[id]"
    );

    const scrollPosition = window.scrollY;

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        const sectionBottom =
            sectionTop + section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionBottom
        ) {

            document
                .querySelectorAll(".nav-links a")
                .forEach(link => {
                    link.classList.remove("active");
                });

            const activeLink =
                document.querySelector(
                    `.nav-links a[href="#${section.id}"]`
                );

            if (activeLink) {
                activeLink.classList.add("active");
            }

        }

    });

});


// ===============================
// SCROLL REVEAL ANIMATION
// ===============================

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    },
    {
        threshold: 0.12
    }
);


// Observe all reveal elements
document.querySelectorAll(".reveal").forEach(element => {

    observer.observe(element);

});


// ===============================
// COURSE FILTER
// ===============================

const filters =
    document.querySelectorAll(".filter");

const courses =
    document.querySelectorAll(".course-card");


filters.forEach(filter => {

    filter.addEventListener("click", () => {

        // Remove active class
        filters.forEach(button => {
            button.classList.remove("active");
        });

        // Add active class to clicked filter
        filter.classList.add("active");


        const selectedCategory =
            filter.dataset.filter;


        courses.forEach(course => {

            const courseCategory =
                course.dataset.category;


            if (
                selectedCategory === "all" ||
                courseCategory === selectedCategory
            ) {

                course.style.display = "";

                // Animation
                course.animate(
                    [
                        {
                            opacity: 0,
                            transform: "translateY(10px)"
                        },
                        {
                            opacity: 1,
                            transform: "translateY(0)"
                        }
                    ],
                    {
                        duration: 300,
                        easing: "ease-out"
                    }
                );

            } else {

                course.style.display = "none";

            }

        });

    });

});


// ===============================
// COURSE DETAILS MODAL
// ===============================

const modal =
    document.getElementById("courseModal");

const modalTitle =
    document.getElementById("modalTitle");

const modalClose =
    document.getElementById("modalClose");

const modalContact =
    document.getElementById("modalContact");


// Course buttons
document.querySelectorAll(".course-btn")
    .forEach(button => {

        button.addEventListener("click", () => {

            const courseName =
                button.dataset.course;

            modalTitle.textContent =
                courseName;

            modal.classList.add("show");

            document.body.style.overflow =
                "hidden";

        });

    });


// Close modal function
function closeModal() {

    modal.classList.remove("show");

    document.body.style.overflow = "";

}


// Close using X button
modalClose.addEventListener(
    "click",
    closeModal
);


// Close when clicking outside modal
modal.addEventListener("click", event => {

    if (event.target === modal) {

        closeModal();

    }

});


// Close modal when contacting
modalContact.addEventListener(
    "click",
    closeModal
);


// ===============================
// CONTACT FORM
// ===============================

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener(
    "submit",
    event => {

        // Prevent page reload
        event.preventDefault();


        const name =
            document.getElementById("name")
                .value.trim();


        if (name === "") {

            formMessage.textContent =
                "Please enter your name.";

            formMessage.style.color =
                "#ff4d6d";

            return;

        }


        // Success message
        formMessage.textContent =
            `Thanks ${name}! Your enquiry has been received.`;

        formMessage.style.color =
            "#6c4df6";


        // Clear form
        contactForm.reset();

    }
);


// ===============================
// DYNAMIC COPYRIGHT YEAR
// ===============================

const year =
    document.getElementById("year");

year.textContent =
    new Date().getFullYear();


// ===============================
// ESC KEY TO CLOSE MODAL
// ===============================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            modal.classList.contains("show")
        ) {

            closeModal();

        }

    }
);
