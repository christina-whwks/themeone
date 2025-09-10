const bg = document.querySelector('.bg');  // 모달 배경 (어두운 오버레이)
const modals = document.querySelectorAll('.modal');  // 모든 모달
const modalTriggers = document.querySelectorAll('[data-modal]');  // 모달을 여는 버튼들
const modalCloseButtons = document.querySelectorAll('.btn-cancel');  // 취소 버튼들
const modalCloseIcons = document.querySelectorAll('.modal .close');  // X 버튼들

// 모달 열기 - data-modal 속성을 가진 버튼 클릭 시
modalTriggers.forEach(function(trigger) {
    trigger.addEventListener('click', function(e) {
        e.preventDefault();
        const modalId = this.getAttribute('data-modal');  // data-modal 속성값 가져오기
        const targetModal = document.getElementById(modalId);  // 해당 ID의 모달 찾기
        
        if (targetModal) {
            bg.style.display = 'block';        // 배경 오버레이 표시
            targetModal.style.display = 'block';  // 해당 모달 표시
        }
    });
});

// 모달 닫기 - X 아이콘 클릭 시
modalCloseIcons.forEach(function(closeIcon) {
    closeIcon.addEventListener('click', function(e) {
        e.preventDefault();
        closeAllModals();  // 모든 모달 닫기 함수 호출
    });
});

// 모달 닫기 - 취소 버튼 클릭 시
modalCloseButtons.forEach(function(closeBtn) {
    closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        closeAllModals();
    });
});

// 모달 닫기 - 배경 클릭 시
bg.addEventListener('click', function(e) {
    if (e.target === bg) {  // 배경 자체를 클릭한 경우만
        closeAllModals();
    }
});

// 모달 닫기 - ESC 키 누를 시
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeAllModals();
    }
});

// 모든 모달 닫기 함수
function closeAllModals() {
    bg.style.display = 'none';  // 배경 오버레이 숨기기
    modals.forEach(function(modal) {
        modal.style.display = 'none';  // 모든 모달 숨기기
    });
}