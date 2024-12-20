var APIListPost = "https://footballprojectit-production.up.railway.app/api/posts?populate=Image";

function Start() {
 
    fetchPosts(renderPost);
}

function fetchPosts(callback) {
    // Gọi API để lấy dữ liệu bài viết
    fetch(APIListPost)
        .then(response => {
            if (!response.ok) {
                throw new Error("Không thể nhận phản hồi từ API.");
            }
            return response.json(); 
        })
        .then(data => {
            console.log("Dữ liệu nhận được từ Strapi:", data); 
            callback(data.data); 
        })
        .catch(error => {
            console.log("Lỗi:", error.message); 
        });
}


// Hàm hiển thị dữ liệu trong console
function displayInConsole(posts) {
    console.log("Danh sách bài viết: ", posts);
}

function renderPost(posts) {
    // Lấy thẻ chứa danh sách bài viết
    var listPost = document.querySelector('#list-posts'); 

    // Tạo danh sách bài viết dưới dạng HTML
    var htmls = posts.map(function (post) {
        // Kiểm tra và lấy URL của hình ảnh (nếu có)
        const imageUrl = post.Image?.length > 0 
            ? `http://localhost:1337${post.Image[0].url}`
            : 'https://png.pngtree.com/png-clipart/20191120/original/pngtree-error-file-icon-vectors-png-image_5053766.jpg';

        // Trả về HTML cho mỗi bài viết
        return `
        <a href="post-detail.html?slug=${post.Slug}" target='_self' onclick="saveSlugAndNavigate('${post.Slug}')"  class="post--card__navigate">
            <div class="post-card">
                <div class="post-content">
                    <h3>${post.Title}</h3> 
                    <p>${post.Excerpt.substring(0, 300)}...</p> 
                    <a href="post-detail.html?slug=${post.Slug}" target='_self' )" class="read-more">Xem chi tiết</a>
                </div>
                <div class="post-image">
                    <img src="${imageUrl}" alt="${post.Title}" />
                </div>
            </div>
        </a>
        `;
    });

    // Gán nội dung vào DOM
    listPost.innerHTML = htmls.join('');
}

       


             
            


// Khởi động ứng dụng
Start();
