document.addEventListener("DOMContentLoaded", function () {
    // Category filtering for discussions
    const categoryItems = document.querySelectorAll(".category-item");
    const discussions = document.querySelectorAll(".discussion");

    function filterDiscussions(category) {
        const normalizedCategory = category.trim().toLowerCase();

        discussions.forEach((discussion) => {
            const discussionCategory = discussion.dataset.category.trim().toLowerCase();

            if (normalizedCategory === "all" || discussionCategory === normalizedCategory) {
                discussion.style.display = "block";
            } else {
                discussion.style.display = "none";
            }
        });
    }

    categoryItems.forEach((item) => {
        item.addEventListener("click", function () {
            categoryItems.forEach((el) => el.classList.remove("active"));
            this.classList.add("active");

            const selectedCategory = this.dataset.category;
            filterDiscussions(selectedCategory);
        });
    });

    filterDiscussions("all");

    // Rating (star) system
    const stars = document.querySelectorAll(".stars span");
    stars.forEach((star) => {
        star.addEventListener("click", function () {
            const rating = this.dataset.value;
            setRating(rating);
        });
    });

    function setRating(rating) {
        stars.forEach((star) => {
            if (star.dataset.value <= rating) {
                star.style.color = "#ffd700";
            } else {
                star.style.color = "#ccc";
            }
        });
    }

    // Comment submission
    const commentForm = document.querySelector(".comment-form");
    const commentTextArea = document.querySelector(".comments-container textarea");
    const commentsList = document.querySelector(".comments");

    if (commentForm && commentTextArea && commentsList) {
        commentForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const commentText = commentTextArea.value.trim();
            if (commentText) {
                const newComment = document.createElement("p");
                newComment.textContent = commentText;
                commentsList.appendChild(newComment);
                commentTextArea.value = "";
            } else {
                alert("Please enter a comment before submitting.");
            }
        });
    }

    // Dropdown menu functionality
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach((item) => {
        item.addEventListener("click", (e) => {
            if (e.target.tagName === "A") {
                e.stopPropagation();
            }

            const dropdownMenu = item.querySelector(".dropdown-menu");
            const isVisible = dropdownMenu.style.display === "flex";
            dropdownMenu.style.display = isVisible ? "none" : "flex";
        });

        item.addEventListener("mouseenter", function () {
            const dropdownMenu = this.querySelector(".dropdown-menu");
            dropdownMenu.style.display = "flex";
        });

        item.addEventListener("mouseleave", function () {
            const dropdownMenu = this.querySelector(".dropdown-menu");
            dropdownMenu.style.display = "none";
        });
    });

    // Recipe card tag-based filtering
    const checkboxes = document.querySelectorAll(".filter-checkbox");
    const recipeCards = document.querySelectorAll(".recipe-box");

    if (checkboxes.length > 0 && recipeCards.length > 0) {
        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener("change", filterRecipes);
        });

        function filterRecipes() {
            const activeTags = Array.from(checkboxes)
                .filter((checkbox) => checkbox.checked)
                .map((checkbox) => checkbox.value.trim().toLowerCase());

            recipeCards.forEach((card) => {
                const cardTags = card.dataset.tags
                    .split(",")
                    .map((tag) => tag.trim().toLowerCase());

                const isVisible =
                    activeTags.length === 0 ||
                    activeTags.every((tag) => cardTags.includes(tag));

                card.style.display = isVisible ? "block" : "none";
            });
        }
    }

    // Apply filter from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get("filter");

    if (filterParam) {
        const recipeBoxes = document.querySelectorAll(".recipe-box");
        recipeBoxes.forEach((box) => {
            const tags = box.dataset.tags.split(",");
            if (!tags.includes(filterParam)) {
                box.style.display = "none";
            }
        });

        const filterCheckbox = document.querySelector(`.filter-checkbox[value="${filterParam}"]`);
        if (filterCheckbox) {
            filterCheckbox.checked = true;
        }
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        });
    });
});