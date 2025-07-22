/*
 * FILE XỬ LÝ INCLUDES (HEADER VÀ FOOTER)
 * File này chứa các hàm để tải header và footer từ file riêng biệt
 * Giúp tái sử dụng code và dễ bảo trì cho intern
 */

// Hàm chính để tải các phần include khi trang web được load
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Bắt đầu tải header và footer...'); // Log để debug
    
    // Tải header và footer đồng thời
    loadHeader();
    loadFooter();
});

/**
 * HÀM TẢI HEADER
 * Tải nội dung header từ file includes/header.html
 * và chèn vào phần tử có id="header-placeholder"
 */
async function loadHeader() {
    try {
        console.log('📥 Đang tải header...'); // Log để theo dõi
        
        // Tìm phần tử để chèn header
        const headerPlaceholder = document.getElementById('header-placeholder');
        
        // Kiểm tra xem có tồn tại phần tử không
        if (!headerPlaceholder) {
            console.warn('⚠️ Không tìm thấy #header-placeholder trong trang này');
            return;
        }
        
        // Sử dụng fetch API để lấy nội dung header
        const response = await fetch('../includes/header.html');
        
        // Kiểm tra xem request có thành công không
        if (!response.ok) {
            throw new Error(`Lỗi HTTP: ${response.status}`);
        }
        
        // Lấy nội dung HTML từ response
        const headerHTML = await response.text();
        
        // Chèn nội dung vào trang
        headerPlaceholder.innerHTML = headerHTML;
        
        // Sau khi load xong, khởi tạo các sự kiện cho menu
        initializeHeaderEvents();
        
        console.log('✅ Header đã được tải thành công!');
        
    } catch (error) {
        console.error('❌ Lỗi khi tải header:', error);
        
        // Hiển thị header dự phòng nếu không tải được
        showFallbackHeader();
    }
}

/**
 * HÀM TẢI FOOTER
 * Tải nội dung footer từ file includes/footer.html
 * và chèn vào phần tử có id="footer-placeholder"
 */
async function loadFooter() {
    try {
        console.log('📥 Đang tải footer...'); // Log để theo dõi
        
        // Tìm phần tử để chèn footer
        const footerPlaceholder = document.getElementById('footer-placeholder');
        
        // Kiểm tra xem có tồn tại phần tử không
        if (!footerPlaceholder) {
            console.warn('⚠️ Không tìm thấy #footer-placeholder trong trang này');
            return;
        }
        
        // Sử dụng fetch API để lấy nội dung footer
        const response = await fetch('../includes/footer.html');
        
        // Kiểm tra xem request có thành công không
        if (!response.ok) {
            throw new Error(`Lỗi HTTP: ${response.status}`);
        }
        
        // Lấy nội dung HTML từ response
        const footerHTML = await response.text();
        
        // Chèn nội dung vào trang
        footerPlaceholder.innerHTML = footerHTML;
        
        // Cập nhật năm hiện tại trong footer
        updateCurrentYear();
        
        console.log('✅ Footer đã được tải thành công!');
        
    } catch (error) {
        console.error('❌ Lỗi khi tải footer:', error);
        
        // Hiển thị footer dự phòng nếu không tải được
        showFallbackFooter();
    }
}

/**
 * HÀM KHỞI TẠO SỰ KIỆN CHO HEADER
 * Thiết lập các sự kiện click cho menu, mobile menu, etc.
 */
function initializeHeaderEvents() {
    console.log('🔧 Khởi tạo sự kiện cho header...');
    
    // Xử lý mobile menu toggle (nếu có)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            console.log('📱 Toggle mobile menu');
            mainNav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Highlight menu item hiện tại dựa trên URL
    highlightCurrentPage();
}

/**
 * HÀM HIGHLIGHT TRANG HIỆN TẠI
 * Đánh dấu menu item tương ứng với trang đang xem
 */
function highlightCurrentPage() {
    // Lấy đường dẫn hiện tại
    const currentPath = window.location.pathname;
    console.log('🔍 Đường dẫn hiện tại:', currentPath);
    
    // Tìm tất cả các link trong menu
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        // Xóa class active cũ
        link.classList.remove('active');
        
        // Kiểm tra xem link có khớp với trang hiện tại không
        const linkPath = link.getAttribute('href');
        
        if (linkPath === currentPath || 
            (currentPath.includes(linkPath) && linkPath !== '/')) {
            link.classList.add('active');
            console.log('✨ Đã highlight menu:', linkPath);
        }
    });
}

/**
 * HÀM CẬP NHẬT NĂM HIỆN TẠI
 * Tự động cập nhật năm trong footer
 */
function updateCurrentYear() {
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
    
    console.log('📅 Đã cập nhật năm hiện tại:', currentYear);
}

/**
 * HÀM HIỂN THỊ HEADER DỰ PHÒNG
 * Hiển thị header đơn giản nếu không tải được file
 */
function showFallbackHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = `
            <header class="site-header">
                <div class="container">
                    <div class="header-content">
                        <h1 class="logo">
                            <a href="/">Website</a>
                        </h1>
                        <nav class="main-nav">
                            <ul>
                                <li><a href="/" class="nav-link">Trang chủ</a></li>
                                <li><a href="/about.html" class="nav-link">Giới thiệu</a></li>
                                <li><a href="/contact.html" class="nav-link">Liên hệ</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        `;
        console.log('🔄 Đã hiển thị header dự phòng');
    }
}

/**
 * HÀM HIỂN THỊ FOOTER DỰ PHÒNG
 * Hiển thị footer đơn giản nếu không tải được file
 */
function showFallbackFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = `
            <footer class="site-footer">
                <div class="container">
                    <div class="footer-bottom">
                        <p>&copy; <span class="current-year">${new Date().getFullYear()}</span> Website. Tất cả quyền được bảo lưu.</p>
                    </div>
                </div>
            </footer>
        `;
        console.log('🔄 Đã hiển thị footer dự phòng');
    }
}

/**
 * HÀM TIỆN ÍCH: HIỂN THỊ LOADING
 * Hiển thị trạng thái loading khi tải includes
 */
function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '<div class="loading">Đang tải...</div>';
    }
}

/**
 * HÀM TIỆN ÍCH: ẨN LOADING
 * Ẩn trạng thái loading
 */
function hideLoading(elementId) {
    const loadingElement = document.querySelector(`#${elementId} .loading`);
    if (loadingElement) {
        loadingElement.remove();
    }
}

// Export các hàm để có thể sử dụng ở file khác (nếu cần)
window.loadHeader = loadHeader;
window.loadFooter = loadFooter;
window.highlightCurrentPage = highlightCurrentPage;

console.log('📚 File includes.js đã được tải thành công!');
