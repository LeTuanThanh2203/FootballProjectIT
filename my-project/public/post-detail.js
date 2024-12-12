const APIListPost = "http://localhost:1337/api/posts";

// Hàm render chi tiết bài viết dựa vào slug
function renderPostDetail() {
    // Lấy slug từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const postSlug = urlParams.get("slug"); 

    if (!postSlug) {
        document.body.innerHTML = "<h2>Bài viết không tồn tại hoặc không có slug!</h2>";
        return;
    }

    // Gọi API lấy toàn bộ danh sách bài viết
    fetch(APIListPost)
        .then(response => response.json())
        .then(data => {
            const posts = data.data;

            // Tìm bài viết có slug trùng khớp
            const post = posts.find(p => p.Slug === postSlug);

            if (!post) {
                throw new Error("Không tìm thấy bài viết phù hợp!");
            }

            // Render nội dung bài viết
            const postDetailContainer = document.querySelector("#post-content");
            const Title=  document.querySelector("#title");
            Title.innerHTML= post.Title;
            
            const Content= marked.parse(post.Content);
            postDetailContainer.innerHTML = `
                <div class="post-detail-card">
                    <h1 class="post-title">${post.Title}</h1>
                    <div class="post-content">${Content}</div>
                </div>
            `;
        })
        .catch(error => {
            document.body.innerHTML = `<h2>Lỗi: ${error.message}</h2>`;
        });
}

// Gọi hàm render sau khi DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    renderPostDetail();
});
