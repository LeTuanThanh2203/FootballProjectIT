var APIListCategories = "https://footballprojectit-production.up.railway.app/api/categories?populate[posts][populate]=Image";

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
            // Lọc các danh mục có slug là 'cac-giai-dau-bong-da-tren-the-gioi'
            const filteredCategories = filterCategoriesBySlug(data.data);
            callback(filteredCategories);
        })
        .catch(error => {
            console.log("Lỗi:", error.message);
        });
}

// Hàm lọc danh mục theo slug
function filterCategoriesBySlug(categories) {
    return categories.filter(category => category.Slug === "cau-lac-bo");
}

function renderPost(categories) {
    const listPost = document.querySelector('#list-posts'); // Thẻ chứa danh sách bài viết
    listPost.innerHTML = ''; // Xóa nội dung cũ

    // Lấy danh sách bài viết từ category đầu tiên
    const posts = categories[0]?.posts || [];

    // Hàm tạo HTML cho từng bài viết
    function createPostHTML(post) {
        const imageUrl = post.Image?.length > 0 
        ? `http://localhost:1337${post.Image[0].url}`
        : 'https://png.pngtree.com/png-clipart/20191120/original/pngtree-error-file-icon-vectors-png-image_5053766.jpg';

        return `
        <a href="post-detail.html?slug=${post.Slug}" target='_self' onclick="saveSlugAndNavigate('${post.Slug}')" class="post--card__navigate">
            <div class="post-card">
                <div class="post-content">
                    <h3>${post.Title}</h3>
                    <p>${post.Excerpt ? post.Excerpt.substring(0, 300) + "..." : ""}</p>
                    <a href="post-detail.html?slug=${post.Slug}" target='_self' class="read-more">Xem chi tiết</a>
                </div>
                <div class="post-image">
                    <img src="${imageUrl}" alt="${post.Title}" />
                </div>
            </div>
        </a>`;
    }

    // Tạo HTML cho toàn bộ danh sách bài viết
    const htmls = posts.map(createPostHTML);

    // Chèn HTML vào thẻ listPost
    listPost.innerHTML = htmls.join('');
}

// Khởi động ứng dụng
Start();
