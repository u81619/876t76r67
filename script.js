// بيانات الملفات - يمكن تعديلها بسهولة
// ملاحظة: يمكنك تعديل الحجم الكلي يدوياً في المتغير totalSizeManual أدناه
const partsData = [
    {
        id: 'part1',
        name: 'EP0082-CUSA23981_00-363779206...',
        size: '9.90 GB',
        host: 'usenet',
        url: 'https://example.com/file1.zip'
    },
    {
        id: 'part2',
        name: 'EP0082-CUSA23981_00-363779206...',
        size: '9.90 GB',
        host: 'usenet',
        url: 'https://example.com/file2.zip'
    },
    {
        id: 'part3',
        name: 'EP0082-CUSA23981_00-363779206...',
        size: '415.82 MB',
        host: 'usenet',
        url: 'https://example.com/file3.zip'
    },
    {
        id: 'part4',
        name: 'EP0082-CUSA23981_00-363779207...',
        size: '8.50 GB',
        host: 'usenet',
        url: 'https://example.com/file4.zip'
    },
    {
        id: 'part5',
        name: 'EP0082-CUSA23981_00-363779208...',
        size: '7.20 GB',
        host: 'usenet',
        url: 'https://example.com/file5.zip'
    },
    {
        id: 'part6',
        name: 'EP0082-CUSA23981_00-363779209...',
        size: '6.80 GB',
        host: 'usenet',
        url: 'https://example.com/file6.zip'
    },
    {
        id: 'part7',
        name: 'EP0082-CUSA23981_00-363779210...',
        size: '5.90 GB',
        host: 'usenet',
        url: 'https://example.com/file7.zip'
    },
    {
        id: 'part8',
        name: 'EP0082-CUSA23981_00-363779211...',
        size: '4.60 GB',
        host: 'usenet',
        url: 'https://example.com/file8.zip'
    },
    {
        id: 'part9',
        name: 'EP0082-CUSA23981_00-363779212...',
        size: '3.70 GB',
        host: 'usenet',
        url: 'https://example.com/file9.zip'
    },
    {
        id: 'part10',
        name: 'EP0082-CUSA23981_00-363779213...',
        size: '2.40 GB',
        host: 'usenet',
        url: 'https://example.com/file10.zip'
    },
    {
        id: 'part11',
        name: 'EP0082-CUSA23981_00-363779214...',
        size: '1.10 GB',
        host: 'usenet',
        url: 'https://example.com/file11.zip'
    },
    {
        id: 'part12',
        name: 'EP0082-CUSA23981_00-363779215...',
        size: '890 MB',
        host: 'usenet',
        url: 'https://example.com/file12.zip'
    },
    {
        id: 'part13',
        name: 'EP0082-CUSA23981_00-363779216...',
        size: '750 MB',
        host: 'usenet',
        url: 'https://example.com/file13.zip'
    },
    {
        id: 'part14',
        name: 'EP0082-CUSA23981_00-363779217...',
        size: '620 MB',
        host: 'usenet',
        url: 'https://example.com/file14.zip'
    },
    {
        id: 'part15',
        name: 'EP0082-CUSA23981_00-363779218...',
        size: '480 MB',
        host: 'usenet',
        url: 'https://example.com/file15.zip'
    }
];

// الحجم الكلي اليدوي - قم بتعديل هذا الرقم يدوياً حسب الحاجة
const totalSizeManual = "20.21 GB"; // مثال: يمكنك تغيير هذا إلى أي قيمة تريدها

// متغيرات عامة
let downloadedParts = new Set();

// تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    loadDownloadedState();
    updateProgress();
    updateTotalSize();
    setupEventListeners();
});

// إعداد الصفحة
function initializePage() {
    const container = document.getElementById('partsContainer');
    container.innerHTML = '';
    
    partsData.forEach(part => {
        const fileElement = createFileElement(part);
        container.appendChild(fileElement);
    });
}

// إنشاء عنصر الملف
function createFileElement(part) {
    const fileDiv = document.createElement('div');
    fileDiv.className = 'file-item';
    fileDiv.id = part.id;
    
    fileDiv.innerHTML = `
        <div class="file-info">
            <div class="file-status" id="${part.id}-status"></div>
            <div class="file-details">
                <div class="file-name">${part.name}</div>
                <div class="file-host">${part.host}</div>
            </div>
        </div>
        <div class="file-size">${part.size}</div>
        <button class="download-btn" onclick="downloadPart('${part.url}', '${part.id}')">
            <span class="btn-icon">تحميل</span>
        </button>
    `;
    
    return fileDiv;
}

// تحميل ملف
function downloadPart(url, partId) {
    // تمييز البارت كمحمل
    markAsDownloaded(partId);
    
    // حفظ الحالة في LocalStorage
    saveDownloadedState(partId);
    
    // فتح الرابط في نافذة جديدة
    window.open(url, '_blank');
    
    // تحديث العدادات
    updateProgress();
    
    // إضافة تأثير بصري
    addDownloadEffect(partId);
}

// تمييز البارت كمحمل
function markAsDownloaded(partId) {
    const fileElement = document.getElementById(partId);
    const button = fileElement.querySelector('.download-btn');
    const status = fileElement.querySelector('.file-status');
    
    // تغيير نص الزر
    button.innerHTML = '<span class="btn-icon">تحميل</span>';
    button.classList.add('downloaded');
    
    // تغيير حالة الملف
    status.style.background = '#22c55e';
    
    // إضافة إلى مجموعة المحملة
    downloadedParts.add(partId);
}

// تحديث عرض الحجم الكلي
function updateTotalSize() {
    const totalSizeElement = document.getElementById('totalSize');
    if (totalSizeElement) {
        totalSizeElement.textContent = totalSizeManual;
    }
}

// حفظ حالة التحميل
function saveDownloadedState(partId) {
    localStorage.setItem(partId, 'downloaded');
    localStorage.setItem('downloadedParts', JSON.stringify([...downloadedParts]));
}

// تحميل حالة التحميل المحفوظة
function loadDownloadedState() {
    const savedParts = localStorage.getItem('downloadedParts');
    if (savedParts) {
        downloadedParts = new Set(JSON.parse(savedParts));
        
        downloadedParts.forEach(partId => {
            if (document.getElementById(partId)) {
                markAsDownloaded(partId);
            }
        });
    }
}

// تحديث العدادات
function updateProgress() {
    const downloadedCount = downloadedParts.size;
    const totalCount = partsData.length;
    
    // تحديث عداد التحميل
    const downloadedCountElement = document.getElementById('downloadedCount');
    const totalCountElement = document.getElementById('totalCount');
    
    if (downloadedCountElement) {
        downloadedCountElement.textContent = downloadedCount;
    }
    if (totalCountElement) {
        totalCountElement.textContent = totalCount;
    }
}

// إضافة تأثير بصري عند التحميل
function addDownloadEffect(partId) {
    const fileElement = document.getElementById(partId);
    fileElement.classList.add('downloading');
    
    setTimeout(() => {
        fileElement.classList.remove('downloading');
    }, 1500);
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    // زر إعادة التعيين
    document.getElementById('resetAll').addEventListener('click', resetAllParts);
    
    // تحديث الوقت كل دقيقة
    updateLastCheck();
    setInterval(updateLastCheck, 60000);
}

// إعادة تعيين جميع الحالات
function resetAllParts() {
    if (confirm('هل أنت متأكد من إعادة تعيين حالة جميع الملفات؟')) {
        // مسح LocalStorage
        partsData.forEach(part => {
            localStorage.removeItem(part.id);
        });
        localStorage.removeItem('downloadedParts');
        
        // مسح المجموعة
        downloadedParts.clear();
        
        // إعادة إنشاء العناصر
        const container = document.getElementById('partsContainer');
        container.innerHTML = '';
        initializePage();
        
        // تحديث العدادات
        updateProgress();
        
        // تحديث الحجم الكلي
        updateTotalSize();
        
        // رسالة تأكيد
        showNotification('تم إعادة تعيين حالة جميع الملفات بنجاح!');
    }
}

// تحديث وقت آخر فحص
function updateLastCheck() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true
    };
    const timeString = now.toLocaleDateString('en-US', options);
    
    const lastCheckElement = document.getElementById('lastCheck');
    if (lastCheckElement) {
        lastCheckElement.textContent = timeString;
    }
}

// عرض إشعار
function showNotification(message) {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #22c55e, #16a34a);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
        z-index: 1000;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // إظهار الإشعار
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // إخفاء الإشعار بعد 3 ثوان
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// تحديث حالة الملفات (محاكاة)
function updateFileStatus() {
    partsData.forEach(part => {
        const status = document.getElementById(`${part.id}-status`);
        if (status && !downloadedParts.has(part.id)) {
            // محاكاة حالة الاتصال
            const isOnline = Math.random() > 0.1; // 90% احتمال أن يكون متصل
            status.style.background = isOnline ? '#22c55e' : '#ef4444';
            status.classList.toggle('offline', !isOnline);
        }
    });
}

// تحديث حالة الملفات كل 30 ثانية
setInterval(updateFileStatus, 30000);

// تشغيل تحديث الحالة عند التحميل
setTimeout(updateFileStatus, 1000);

