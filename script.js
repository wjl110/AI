// 主题切换功能
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// 初始化主题
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

// 切换主题
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // 更新聚光灯效果
    spotlight.style.transition = 'background 0.3s';
    setTimeout(() => {
        spotlight.style.transition = 'none';
    }, 300);
}

// 监听系统主题变化
prefersDarkScheme.addListener((e) => {
    const newTheme = e.matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// 初始化
initTheme();
themeToggle.addEventListener('click', toggleTheme);

// 时间轴交互
const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach(item => {
    item.addEventListener('click', () => {
        // 移除其他项的active类
        timelineItems.forEach(i => i.classList.remove('active'));
        // 为当前项添加active类
        item.classList.add('active');
        
        // 添加动画效果
        item.style.transform = 'scale(1.02)';
        setTimeout(() => {
            item.style.transform = 'scale(1)';
        }, 200);
    });
});

// 标签页切换
const tabs = document.querySelectorAll('.tab');
const tabPanes = document.querySelectorAll('.tab-pane');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // 移除所有active类
        tabs.forEach(t => t.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        
        // 添加active类到当前标签
        tab.classList.add('active');
        const target = tab.dataset.target;
        document.getElementById(target).classList.add('active');
    });
});

// 移动端导航切换
const navContent = document.querySelector('.nav-content');
const logo = document.querySelector('.logo');

if (window.innerWidth <= 768) {
    logo.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            navContent.classList.toggle('show-mobile-nav');
        }
    });

    // 点击外部关闭导航
    document.addEventListener('click', (e) => {
        if (!navContent.contains(e.target)) {
            navContent.classList.remove('show-mobile-nav');
        }
    });
}

// 文档导航功能
const docLinks = document.querySelectorAll('.docs-nav-link');
const docSections = document.querySelectorAll('.docs-section');

// 更新活动状态
function updateActiveSection() {
    const scrollPosition = window.scrollY;

    docSections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            const id = section.getAttribute('id');
            docLinks.forEach((link) => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// 平滑滚动到目标位置
docLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// 监听滚动事件
window.addEventListener('scroll', updateActiveSection);

// 添加悬停高亮效果
const highlightElements = document.querySelectorAll('.hover-highlight');

highlightElements.forEach(element => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        element.style.setProperty('--mouse-x', `${x}px`);
        element.style.setProperty('--mouse-y', `${y}px`);
    });
});

// 聚光灯效果
const spotlight = document.querySelector('.spotlight');
let isSpotlightVisible = false;

// 平滑跟踪变量
let currentX = 0;
let currentY = 0;
let targetX = 0;
let targetY = 0;

// 鼠标移动处理
document.addEventListener('mousemove', (e) => {
    if (!isSpotlightVisible) {
        spotlight.style.opacity = '1';
        isSpotlightVisible = true;
    }
    
    targetX = e.clientX;
    targetY = e.clientY;
});

// 鼠标离开页面
document.addEventListener('mouseleave', () => {
    spotlight.style.opacity = '0';
    isSpotlightVisible = false;
});

// 平滑动画
function updateSpotlight() {
    // 平滑插值
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;
    
    if (isSpotlightVisible) {
        spotlight.style.left = `${currentX}px`;
        spotlight.style.top = `${currentY}px`;
    }
    
    requestAnimationFrame(updateSpotlight);
}

// 启动动画
updateSpotlight();

// 登录表单处理
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // 这里添加登录逻辑
        console.log('登录信息:', { email, password });
        
        // 模拟登录成功
        alert('登录成功！');
        window.location.href = 'index.html';
    });

    // 密码显示切换
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // 更新图标
        togglePassword.innerHTML = type === 'password' ? 
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 5c-7.333 0-12 6-12 6s4.667 6 12 6 12-6 12-6-4.667-6-12-6zm0 10a4 4 0 110-8 4 4 0 010 8z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' :
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    });
}

// 联系表单处理
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        try {
            // 这里添加发送表单数据的逻辑
            console.log('表单数据:', data);
            
            // 模拟发送成功
            alert('消息已发送！我们会尽快回复您。');
            contactForm.reset();
        } catch (error) {
            console.error('发送失败:', error);
            alert('发送失败，请稍后重试。');
        }
    });
}
