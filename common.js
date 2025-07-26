// HTHT×SEL 프로젝트 공통 JavaScript

// 네비게이션 관련 기능
class Navigation {
  constructor() {
    this.init();
  }

  init() {
    this.createNavbar();
    this.bindEvents();
    this.setActiveNav();
  }

  createNavbar() {
    const navbar = document.createElement('nav');
    navbar.className = 'navbar';
    navbar.innerHTML = `
      <div class="navbar-container">
        <a href="index.html" class="navbar-brand">
          <i class="fas fa-graduation-cap"></i>
          HTHT×SEL 프로젝트
        </a>
        <button class="navbar-toggle" id="navbarToggle">
          <i class="fas fa-bars"></i>
        </button>
        <ul class="navbar-nav" id="navbarNav">
          <li class="nav-item">
            <a href="index.html" class="nav-link" data-page="index">
              <i class="fas fa-home"></i>
              홈
            </a>
          </li>
          <li class="nav-item">
            <a href="problem-definition-canvas.html" class="nav-link" data-page="problem-definition-canvas">
              <i class="fas fa-bullseye"></i>
              문제 정의
            </a>
          </li>
          <li class="nav-item">
            <a href="htht-project-designer.html" class="nav-link" data-page="htht-project-designer">
              <i class="fas fa-cogs"></i>
              프로젝트 설계
            </a>
          </li>
          <li class="nav-item">
            <a href="sel-competency-checker.html" class="nav-link" data-page="sel-competency-checker">
              <i class="fas fa-chart-bar"></i>
              SEL 체크리스트
            </a>
          </li>
          <li class="nav-item">
            <a href="feedback-board.html" class="nav-link" data-page="feedback-board">
              <i class="fas fa-comments"></i>
              피드백 보드
            </a>
          </li>
        </ul>
      </div>
    `;

    // 페이지 상단에 네비게이션 삽입
    document.body.insertBefore(navbar, document.body.firstChild);
  }

  bindEvents() {
    // 모바일 토글 버튼
    const toggle = document.getElementById('navbarToggle');
    const nav = document.getElementById('navbarNav');

    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        nav.classList.toggle('show');
        const icon = toggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      });
    }

    // 네비게이션 링크 클릭 시 모바일 메뉴 닫기
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (nav.classList.contains('show')) {
          nav.classList.remove('show');
          const icon = toggle.querySelector('i');
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });
  }

  setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      const linkPage = link.getAttribute('data-page') + '.html';
      if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
      }
    });
  }
}

// 로딩 애니메이션
class LoadingManager {
  static show(message = '로딩 중...') {
    const loader = document.createElement('div');
    loader.id = 'globalLoader';
    loader.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        backdrop-filter: blur(5px);
      ">
        <div style="
          width: 50px;
          height: 50px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        "></div>
        <p style="
          color: #4a5568;
          font-size: 16px;
          font-weight: 500;
        ">${message}</p>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `;
    document.body.appendChild(loader);
  }

  static hide() {
    const loader = document.getElementById('globalLoader');
    if (loader) {
      loader.remove();
    }
  }
}

// 토스트 알림
class Toast {
  static show(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${this.getBackgroundColor(type)};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 12px;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
      ">
        <i class="fas ${this.getIcon(type)}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.parentElement.remove()" style="
          background: none;
          border: none;
          color: white;
          font-size: 18px;
          cursor: pointer;
          padding: 0;
          margin-left: auto;
        ">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <style>
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      </style>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
    }, duration);
  }

  static getBackgroundColor(type) {
    const colors = {
      success: '#48bb78',
      error: '#f56565',
      warning: '#ed8936',
      info: '#4299e1'
    };
    return colors[type] || colors.info;
  }

  static getIcon(type) {
    const icons = {
      success: 'fa-check-circle',
      error: 'fa-exclamation-circle',
      warning: 'fa-exclamation-triangle',
      info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
  }
}

// 로컬 스토리지 관리
class StorageManager {
  static save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('저장 실패:', error);
      Toast.show('데이터 저장에 실패했습니다.', 'error');
      return false;
    }
  }

  static load(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
      console.error('불러오기 실패:', error);
      return defaultValue;
    }
  }

  static remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('삭제 실패:', error);
      return false;
    }
  }

  static clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('전체 삭제 실패:', error);
      return false;
    }
  }
}

// 파일 내보내기 유틸리티
class ExportManager {
  static downloadJSON(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    this.downloadBlob(blob, filename + '.json');
  }

  static downloadText(text, filename) {
    const blob = new Blob([text], { type: 'text/plain' });
    this.downloadBlob(blob, filename + '.txt');
  }

  static downloadCSV(data, filename) {
    const csv = this.arrayToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    this.downloadBlob(blob, filename + '.csv');
  }

  static downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  static arrayToCSV(data) {
    if (!data.length) return '';
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
    ].join('\n');
    
    return csvContent;
  }
}

// 폼 유효성 검사
class FormValidator {
  constructor(form) {
    this.form = form;
    this.rules = {};
    this.messages = {};
  }

  addRule(fieldName, rule, message) {
    if (!this.rules[fieldName]) {
      this.rules[fieldName] = [];
      this.messages[fieldName] = [];
    }
    this.rules[fieldName].push(rule);
    this.messages[fieldName].push(message);
    return this;
  }

  validate() {
    let isValid = true;
    const errors = {};

    for (const fieldName in this.rules) {
      const field = this.form.querySelector(`[name="${fieldName}"]`);
      if (!field) continue;

      const fieldErrors = [];
      const value = field.value.trim();

      this.rules[fieldName].forEach((rule, index) => {
        if (!rule(value)) {
          fieldErrors.push(this.messages[fieldName][index]);
          isValid = false;
        }
      });

      if (fieldErrors.length > 0) {
        errors[fieldName] = fieldErrors;
        this.showFieldError(field, fieldErrors[0]);
      } else {
        this.clearFieldError(field);
      }
    }

    return { isValid, errors };
  }

  showFieldError(field, message) {
    this.clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.cssText = `
      color: #f56565;
      font-size: 14px;
      margin-top: 4px;
      display: flex;
      align-items: center;
      gap: 4px;
    `;
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    
    field.style.borderColor = '#f56565';
    field.parentNode.appendChild(errorDiv);
  }

  clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }
    field.style.borderColor = '';
  }

  // 일반적인 유효성 검사 규칙들
  static rules = {
    required: (value) => value.length > 0,
    minLength: (min) => (value) => value.length >= min,
    maxLength: (max) => (value) => value.length <= max,
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    number: (value) => !isNaN(value) && value !== '',
    positiveNumber: (value) => !isNaN(value) && parseFloat(value) > 0
  };
}

// 애니메이션 유틸리티
class AnimationUtils {
  static fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    const start = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      
      element.style.opacity = progress;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }

  static slideDown(element, duration = 300) {
    element.style.height = '0';
    element.style.overflow = 'hidden';
    element.style.display = 'block';
    
    const targetHeight = element.scrollHeight;
    const start = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      
      element.style.height = (targetHeight * progress) + 'px';
      
      if (progress >= 1) {
        element.style.height = '';
        element.style.overflow = '';
      } else {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }

  static countUp(element, target, duration = 1000) {
    const start = performance.now();
    const startValue = 0;
    
    const animate = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      
      const currentValue = Math.floor(startValue + (target - startValue) * progress);
      element.textContent = currentValue;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }
}

// 페이지 초기화
document.addEventListener('DOMContentLoaded', () => {
  // 네비게이션 초기화
  new Navigation();
  
  // 페이지 애니메이션
  document.body.classList.add('fade-in');
  
  // 외부 링크에 아이콘 추가
  const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
  externalLinks.forEach(link => {
    link.innerHTML += ' <i class="fas fa-external-link-alt" style="font-size: 0.8em; margin-left: 4px;"></i>';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
});

// 전역 객체로 노출
window.HTHT = {
  Navigation,
  LoadingManager,
  Toast,
  StorageManager,
  ExportManager,
  FormValidator,
  AnimationUtils
};

