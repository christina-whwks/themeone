//모바일 메뉴 동작
const mobileMenuBtn = document.getElementById('mobileMenu');
const mobileMenuPanel = document.getElementById('mobileMenuPanel');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const topBanner = document.querySelector('.top-banner');

// 오버레이 생성
const overlay = document.createElement('div');
overlay.className = 'mobile-menu-overlay';
overlay.id = 'mobileMenuOverlay';
document.body.appendChild(overlay);

// top-banner 높이 계산 및 CSS 변수 설정
function updateMobileMenuPosition() {
    if (topBanner && window.innerWidth <= 768) {
        const bannerHeight = topBanner.offsetHeight;
        document.documentElement.style.setProperty('--top-banner-height', `${bannerHeight}px`);
        mobileMenuPanel.style.top = `${bannerHeight}px`;
    } else {
        document.documentElement.style.setProperty('--top-banner-height', '0px');
        mobileMenuPanel.style.top = '0px';
    }
}

// 메뉴 열기
function openMobileMenu() {
    updateMobileMenuPosition(); // 위치 업데이트
    mobileMenuPanel.style.display = 'block';
    overlay.classList.add('active');
    setTimeout(() => {
        mobileMenuPanel.classList.add('active');
    }, 10);
    document.body.style.overflow = 'hidden';
}

// 메뉴 닫기
function closeMobileMenu() {
    mobileMenuPanel.classList.remove('active');
    overlay.classList.remove('active');
    setTimeout(() => {
        mobileMenuPanel.style.display = 'none';
    }, 300);
    document.body.style.overflow = '';
}

// 이벤트 리스너
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openMobileMenu);
}

if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
}

overlay.addEventListener('click', closeMobileMenu);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenuPanel.classList.contains('active')) {
        closeMobileMenu();
    }
});

// 윈도우 리사이즈 시 위치 재계산 및 메뉴 자동 닫기
window.addEventListener('resize', function() {
    updateMobileMenuPosition();
    if (window.innerWidth > 768 && mobileMenuPanel.classList.contains('active')) {
        closeMobileMenu();
    }
});

// 초기 위치 설정
updateMobileMenuPosition();