/* =========================================================
   TEACHERS & STAFF SECTION
   ========================================================= */

.teachers-section {
    padding: 80px 0;
    background: #f7f9fc;
}


/* Teachers Grid */

.teachers-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    margin-top: 45px;
}


/* Teacher Card */

.teacher-card {
    background: #ffffff;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
}


/* Card Hover */

.teacher-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}


/* Teacher Photo */

.teacher-photo {
    width: 100%;
    height: 320px;
    overflow: hidden;
    background: #e9eef5;
}


.teacher-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;
}


/* Photo Zoom */

.teacher-card:hover .teacher-photo img {
    transform: scale(1.05);
}


/* Teacher Information */

.teacher-info {
    padding: 25px;
    text-align: center;
}


.teacher-info h3 {
    margin: 0 0 8px;
    font-size: 22px;
    font-weight: 600;
}


.teacher-designation {
    margin-bottom: 18px;
    font-weight: 600;
    font-size: 15px;
}


.teacher-info p {
    margin: 8px 0;
    font-size: 14px;
    line-height: 1.6;
}


/* Subject and Qualification */

.teacher-info strong {
    font-weight: 600;
}


/* =========================================================
   TABLET
   ========================================================= */

@media (max-width: 992px) {

    .teachers-grid {
        grid-template-columns: repeat(2, 1fr);
    }

}


/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 600px) {

    .teachers-section {
        padding: 60px 15px;
    }


    .teachers-grid {
        grid-template-columns: 1fr;
        gap: 25px;
    }


    .teacher-photo {
        height: 350px;
    }


    .teacher-info {
        padding: 22px;
    }


    .teacher-info h3 {
        font-size: 20px;
    }

}
const schoolGallery = {

    independence: {
        folder: "images/gallery/independence-day/",
        photos: [
            "2026-photo1.jpg",
            "2026-photo2.jpg",
            "2025-photo1.jpg"
        ],
        yearsContainer: "independence-years",
        galleryContainer: "independence-gallery"
    },

    activities: {
        folder: "images/gallery/school-activities/",
        photos: [
            "2026-photo1.jpg",
            "2026-photo2.jpg",
            "2026-photo3.jpg",
            "2025-photo1.jpg",
            "2025-photo2.jpg"
        ],
        yearsContainer: "activities-years",
        galleryContainer: "activities-gallery"
    }

};


function createSchoolGallery(gallery) {

    const yearsContainer =
        document.getElementById(gallery.yearsContainer);

    const galleryContainer =
        document.getElementById(gallery.galleryContainer);

    if (!yearsContainer || !galleryContainer) {
        return;
    }

    const years = [...new Set(
        gallery.photos.map(photo => photo.substring(0, 4))
    )].sort((a, b) => b - a);

    years.forEach((year, index) => {

        const button = document.createElement("button");

        button.className = "year-button";
        button.textContent = year;

        button.addEventListener("click", () => {

            document
                .querySelectorAll(
                    "#" + gallery.yearsContainer + " .year-button"
                )
                .forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            showYearPhotos(gallery, year);
        });

        yearsContainer.appendChild(button);

        if (index === 0) {
            button.classList.add("active");
            showYearPhotos(gallery, year);
        }

    });

}


function showYearPhotos(gallery, year) {

    const galleryContainer =
        document.getElementById(gallery.galleryContainer);

    galleryContainer.innerHTML = "";

    const selectedPhotos =
        gallery.photos.filter(photo =>
            photo.substring(0, 4) === year
        );

    selectedPhotos.forEach(photo => {

        const item = document.createElement("div");

        item.className = "gallery-item";

        item.innerHTML = `
            <img
                src="${gallery.folder}${photo}"
                alt="School event photo ${year}"
                loading="lazy"
            >
        `;

        galleryContainer.appendChild(item);

    });

}


Object.values(schoolGallery).forEach(gallery => {
    createSchoolGallery(gallery);
});