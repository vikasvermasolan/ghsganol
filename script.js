
/* =========================================================
   SCHOOL PHOTO GALLERY
   ========================================================= */

const schoolGallery = {

    independence: {
        title: "🇮🇳 Independence Day",
        description: "Celebrating the spirit of freedom and patriotism",
        folder: "images/gallery/independence-day/",
        photos: {
            "2026": [
                "photo1.jpg",
                "photo2.jpg",
                "photo3.jpg"
            ]
        }
    },

    teachersDay: {
        title: "👨‍🏫 Teachers' Day",
        description: "Honouring our teachers and celebrating their contribution",
        folder: "images/gallery/teachers-day/",
        photos: {
            "2026": [
                "photo1.jpg",
                "photo2.jpg",
                "photo3.jpg"
            ]
        }
    },

    republicDay: {
        title: "🇮🇳 Republic Day",
        description: "Celebrating the spirit of our Constitution and nation",
        folder: "images/gallery/republic-day/",
        photos: {
            "2026": [
                "photo1.jpg",
                "photo2.jpg",
                "photo3.jpg"
            ]
        }
    },

    annualFunction: {
        title: "🎭 Annual Function",
        description: "Celebrating the talent and achievements of our students",
        folder: "images/gallery/annual-function/",
        photos: {
            "2026": [
                "photo1.jpg",
                "photo2.jpg",
                "photo3.jpg"
            ]
        }
    },

    sportsDay: {
        title: "🏆 Sports Day",
        description: "Celebrating sportsmanship, teamwork and achievement",
        folder: "images/gallery/sports-day/",
        photos: {
            "2026": [
                "photo1.jpg",
                "photo2.jpg",
                "photo3.jpg"
            ]
        }
    },

    childrensDay: {
        title: "🧒 Children's Day",
        description: "Celebrating the joy, creativity and innocence of childhood",
        folder: "images/gallery/childrens-day/",
        photos: {
            "2026": [
                "photo1.jpg",
                "photo2.jpg",
                "photo3.jpg"
            ]
        }
    },

    activities: {
        title: "🌱 School Activities",
        description: "Learning, creativity and experiences beyond the classroom",
        folder: "images/gallery/school-activities/",
        photos: {
            "2026": [
                "photo1.jpg",
                "photo2.jpg",
                "photo3.jpg"
            ]
        }
    }

};


/* =========================================================
   START GALLERY WHEN PAGE LOADS
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    createCelebrationButtons();

    createActivitiesGallery();

});


/* =========================================================
   CELEBRATION BUTTONS
   ========================================================= */

function createCelebrationButtons() {

    const container =
        document.getElementById("celebration-events");

    if (!container) {
        console.error("celebration-events not found");
        return;
    }

    container.innerHTML = "";

    const celebrations = [
        "independence",
        "teachersDay",
        "republicDay",
        "annualFunction",
        "sportsDay",
        "childrensDay"
    ];

    celebrations.forEach((eventKey, index) => {

        const event = schoolGallery[eventKey];

        const button = document.createElement("button");

        button.type = "button";
        button.className = "celebration-btn";
        button.textContent = event.title;

        button.addEventListener("click", function () {

            document
                .querySelectorAll(".celebration-btn")
                .forEach(btn => {
                    btn.classList.remove("active");
                });

            button.classList.add("active");

            showCelebration(eventKey);

        });

        container.appendChild(button);


        /* Open first celebration automatically */

        if (index === 0) {

            button.classList.add("active");

            showCelebration(eventKey);

        }

    });

}


/* =========================================================
   SHOW CELEBRATION YEARS
   ========================================================= */

function showCelebration(eventKey) {

    const event = schoolGallery[eventKey];

    const yearsContainer =
        document.getElementById("celebration-years");

    const galleryContainer =
        document.getElementById("celebration-gallery");

    if (!yearsContainer || !galleryContainer) {
        console.error("Celebration containers not found");
        return;
    }

    yearsContainer.innerHTML = "";

    galleryContainer.innerHTML = "";


    /* Get available years */

    const years =
        Object.keys(event.photos)
        .sort((a, b) => b - a);


    years.forEach((year, index) => {

        const button = document.createElement("button");

        button.type = "button";
        button.className = "year-button";
        button.textContent = year;

        button.addEventListener("click", function () {

            document
                .querySelectorAll(
                    "#celebration-years .year-button"
                )
                .forEach(btn => {
                    btn.classList.remove("active");
                });

            button.classList.add("active");

            showYearPhotos(
                event,
                year,
                "celebration-gallery"
            );

        });

        yearsContainer.appendChild(button);


        /* Show latest year automatically */

        if (index === 0) {

            button.classList.add("active");

            showYearPhotos(
                event,
                year,
                "celebration-gallery"
            );

        }

    });

}


/* =========================================================
   SHOW PHOTOS
   ========================================================= */

function showYearPhotos(
    event,
    year,
    containerId
) {

    const galleryContainer =
        document.getElementById(containerId);

    if (!galleryContainer) {
        return;
    }

    galleryContainer.innerHTML = "";

    const photos = event.photos[year];


    if (!photos || photos.length === 0) {

        galleryContainer.innerHTML =
            `<p class="no-photos">
                No photos available for ${year}.
            </p>`;

        return;
    }


    photos.forEach(photo => {

        const item =
            document.createElement("div");

        item.className = "gallery-item";


        const image =
            document.createElement("img");

        /*
         * IMPORTANT:
         * Photos are stored inside:
         *
         * event-folder / year / photo
         */

        image.src =
            event.folder +
            year +
            "/" +
            photo;

        image.alt =
            event.title +
            " - " +
            year;

        image.loading = "lazy";


        /* If image does not exist */

        image.onerror = function () {

            console.error(
                "Image not found:",
                image.src
            );

            item.innerHTML = `
                <div class="image-error">
                    Photo not found
                </div>
            `;

        };


        /* Click image */

        image.addEventListener(
            "click",
            function () {

                openGalleryImage(
                    image.src,
                    image.alt
                );

            }
        );


        item.appendChild(image);

        galleryContainer.appendChild(item);

    });

}


/* =========================================================
   SCHOOL ACTIVITIES
   ========================================================= */

function createActivitiesGallery() {

    const event =
        schoolGallery.activities;

    const yearsContainer =
        document.getElementById("activities-years");

    if (!yearsContainer) {
        console.error("activities-years not found");
        return;
    }

    yearsContainer.innerHTML = "";

    const years =
        Object.keys(event.photos)
        .sort((a, b) => b - a);


    years.forEach((year, index) => {

        const button =
            document.createElement("button");

        button.type = "button";
        button.className = "year-button";
        button.textContent = year;


        button.addEventListener("click", function () {

            document
                .querySelectorAll(
                    "#activities-years .year-button"
                )
                .forEach(btn => {
                    btn.classList.remove("active");
                });

            button.classList.add("active");

            showYearPhotos(
                event,
                year,
                "activities-gallery"
            );

        });


        yearsContainer.appendChild(button);


        /* Latest year automatically */

        if (index === 0) {

            button.classList.add("active");

            showYearPhotos(
                event,
                year,
                "activities-gallery"
            );

        }

    });

}


/* =========================================================
   IMAGE LIGHTBOX
   ========================================================= */

function openGalleryImage(src, alt) {

    let lightbox =
        document.getElementById(
            "gallery-lightbox"
        );


    /* Create lightbox only once */

    if (!lightbox) {

        lightbox =
            document.createElement("div");

        lightbox.id =
            "gallery-lightbox";


        lightbox.innerHTML = `

            <div class="lightbox-content">

                <button
                    type="button"
                    class="lightbox-close">
                    &times;
                </button>

                <img
                    src=""
                    alt="">
                    
            </div>

        `;


        document.body.appendChild(lightbox);


        /* Close button */

        lightbox
            .querySelector(".lightbox-close")
            .addEventListener(
                "click",
                function () {

                    lightbox.style.display =
                        "none";

                }
            );


        /* Close by clicking outside image */

        lightbox.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === lightbox
                ) {

                    lightbox.style.display =
                        "none";

                }

            }
        );

    }


    const image =
        lightbox.querySelector("img");

    image.src = src;

    image.alt = alt;


    lightbox.style.display = "flex";

}