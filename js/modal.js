const bg = document.querySelector('.bg');
const modals = document.querySelectorAll('.modal');
const modalTriggers = document.querySelectorAll('[data-modal]');
const modalCloseButtons = document.querySelectorAll('.btn-cancel');
const modalCloseIcons = document.querySelectorAll('.modal .close');

// 모달 스택 관리를 위한 배열
let modalStack = [];

// 모달 열기 - data-modal 속성을 가진 버튼 클릭 시
modalTriggers.forEach(function(trigger) {
    trigger.addEventListener('click', function(e) {
        e.preventDefault();
        const modalId = this.getAttribute('data-modal');
        const targetModal = document.getElementById(modalId);
        
        if (targetModal) {
            openModal(targetModal);
        }
    });
});

// 모달 열기 함수
function openModal(modal) {
    // 새로운 bg 요소 생성
    const newBg = bg.cloneNode(true);
    newBg.style.display = 'block';
    newBg.style.zIndex = 1000 + modalStack.length * 10;
    
    // 모달의 z-index 설정
    modal.style.display = 'block';
    modal.style.zIndex = 1001 + modalStack.length * 10;
    
    // body에 새로운 bg 추가
    document.body.appendChild(newBg);
    
    // 스택에 모달과 배경 정보 추가
    modalStack.push({
        modal: modal,
        bg: newBg
    });
    
    // 새로운 bg에 클릭 이벤트 추가
    newBg.addEventListener('click', function(e) {
        if (e.target === newBg) {
            closeTopModal();
        }
    });
}

// 최상위 모달 닫기 함수
function closeTopModal() {
    if (modalStack.length === 0) return;
    
    const topModalData = modalStack.pop();
    
    // 모달과 배경 숨기기
    topModalData.modal.style.display = 'none';
    topModalData.bg.remove();
}

// 모든 모달 닫기 함수
function closeAllModals() {
    while (modalStack.length > 0) {
        closeTopModal();
    }
}

// 모달 닫기 - X 아이콘 클릭 시
modalCloseIcons.forEach(function(closeIcon) {
    closeIcon.addEventListener('click', function(e) {
        e.preventDefault();
        closeTopModal();
    });
});

// 모달 닫기 - 취소 버튼 클릭 시
modalCloseButtons.forEach(function(closeBtn) {
    closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        closeTopModal();
    });
});

// ESC 키로 최상위 모달 닫기
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeTopModal();
    }
});