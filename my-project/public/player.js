var APIListCategories = "http://localhost:1337/api/categories?populate[posts][populate]=Image";

function Start() {
    fetchCategories(renderPost);
}

function fetchCategories(callback) {
    // Gọi API để lấy dữ liệu danh mục và bài viết
    fetch(APIListCategories)
        .then(response => {
            if (!response.ok) {
                throw new Error("Không thể nhận phản hồi từ API.");
            }
            return response.json();
        })
        .then(data => {
            console.log("Dữ liệu nhận được từ Strapi:", data);
            const filteredCategories = filterCategoriesBySlug(data.data);
            callback(filteredCategories);
        })
        .catch(error => {
            console.log("Lỗi:", error.message);
        });
}

// Hàm lọc danh mục theo slug
function filterCategoriesBySlug(categories) {
    return categories.filter(category => category.Slug === "cau-thu");
}

function renderPost(categories) {
    const listPost = document.querySelector('#carousel');
    const dotsContainer = document.querySelector('#dots');
    listPost.innerHTML = '';
    dotsContainer.innerHTML = ''; // Xóa dấu chấm cũ nếu có

    const posts = categories[0]?.posts || [];

    function createPostHTML(post) {
        const imageUrl = post.Image?.length > 0 
            ? `http://localhost:1337${post.Image[0].url}`
            : 'https://png.pngtree.com/png-clipart/20191120/original/pngtree-error-file-icon-vectors-png-image_5053766.jpg';

        return `
        <a href="post-detail.html?slug=${post.Slug}" class="post--card__navigate">
            <div class="post-card">
                <div class="post-image">
                    <img src="${imageUrl}" alt="${post.Title}" />
                </div>
                <div class="post-content">
                    <h3>${post.Title}</h3>
                    <p>${post.Excerpt.substring(0, 300)}...</p>
                </div>
            </div>
        </a>`;
    }

    // Tạo HTML cho các card
    const htmls = posts.map(createPostHTML);
    listPost.innerHTML = htmls.join('');

    // Tạo các dấu chấm động tương ứng
    posts.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
        dotsContainer.appendChild(dot);
    });

    initializeCarousel(posts.length);
}

function initializeCarousel(totalPosts) {
    const carousel = document.querySelector('#carousel');
    const cards = carousel.querySelectorAll('.post-card');
    const prevButton = document.querySelector('.arrow.left');
    const nextButton = document.querySelector('.arrow.right');
    const dots = document.querySelectorAll('.dot');

    let currentIndex = 0;
    const cardWidth = cards[0]?.offsetWidth + 20; // Chiều rộng card + khoảng cách

    // Cập nhật vị trí carousel
    function updateCarousel() {
        const offset = -(currentIndex * cardWidth);
        carousel.style.transform = `translateX(${offset}px)`;
        updateDots();
    }

    // Cập nhật dấu chấm tương ứng
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Xử lý sự kiện cho mũi tên
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalPosts) % totalPosts;
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalPosts;
        updateCarousel();
    });

    // Tự động chuyển card sau mỗi 5 giây
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalPosts;
        updateCarousel();
    }, 5000);

    updateCarousel(); // Khởi chạy lần đầu
}

// Khởi động ứng dụng
Start();
