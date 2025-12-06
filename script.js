const students =[
  {
    "name": "إبراهيم ثامر يونس سرحان",
    "group": "A"
  },
  {
    "name": "المنتصر المتوكل عبدالهادي احمد",
    "group": "A"
  },
  {
    "name": "الن عامر كامل بطرس",
    "group": "A"
  },
  {
    "name": "الياس فرهاد بركات ابراهيم",
    "group": "A"
  },
  {
    "name": "امنيه مهند موفق محمد",
    "group": "A"
  },
  {
    "name": "امين علي قتيبة سعيد",
    "group": "A"
  },
  {
    "name": "اندريه خليل موسى",
    "group": "A"
  },
  {
    "name": "اندراوس شوقي سالم حنا",
    "group": "A"
  },
  {
    "name": "ايمان قصى احمد حمدي",
    "group": "A"
  },
  {
    "name": "ايوب اشرف نيسان ايوب",
    "group": "A"
  },
  {
    "name": "آمنه عمر محمد حسن",
    "group": "A"
  },
  {
    "name": "حذيفة عامر حازم",
    "group": "A"
  },
  {
    "name": "حمزة محمد خليل ابراهيم",
    "group": "A"
  },
  {
    "name": "حمزة عماد احمد",
    "group": "A"
  },
  {
    "name": "حمزة معن صالح حبو",
    "group": "A"
  },
  {
    "name": "خالد جمال حازم يونس",
    "group": "A"
  },
  {
    "name": "ديفد عامر شعيا بابا",
    "group": "A"
  },
  {
    "name": "ربى عمر عبدالحق اسماعيل",
    "group": "A"
  },
  {
    "name": "زين العابدين احمد عبدالجليل",
    "group": "A"
  },
  {
    "name": "شهاب احمد حسين محمد",
    "group": "A"
  },
  {
    "name": "صديق رياض انصيف",
    "group": "A"
  },
  {
    "name": "عبدالرحمن احمد خضر منوخ",
    "group": "A"
  },
  {
    "name": "عبدالرحمن عمر كاظم داود",
    "group": "A"
  },
  {
    "name": "عبدالعزيز زين العابدين محمد امين عزيز",
    "group": "A"
  },
  {
    "name": "عبدالقادر محمد قادر عمر",
    "group": "A"
  },
  {
    "name": "علي محمود شاكر محمود",
    "group": "A"
  },
  {
    "name": "عمر أكرم خلف حسو",
    "group": "A"
  },
  {
    "name": "عمر خلف محمد",
    "group": "A"
  },
  {
    "name": "ليون اسماعيل ابراهيم",
    "group": "A"
  },
  {
    "name": "ماثياس ثابت متى شابا",
    "group": "A"
  },
  {
    "name": "محمد اسماعيل ابراهيم فاضل",
    "group": "A"
  },
  {
    "name": "محمد جلال جوهر بدر",
    "group": "A"
  },
  {
    "name": "محمد خليل مختار محمد",
    "group": "A"
  },
  {
    "name": "محمد سعد عبدالعزيز قاسم",
    "group": "A"
  },
  {
    "name": "محمد مهند عبدالله",
    "group": "A"
  },
  {
    "name": "مزن مظهر عبدالمحسن محمود",
    "group": "A"
  },
  {
    "name": "مصطفى سليمان جلود سليمان",
    "group": "A"
  },
  {
    "name": "مصطفى عبدالاله امير عبدالله",
    "group": "A"
  },
  {
    "name": "مصطفى مثنى احمد مسلط",
    "group": "A"
  },
  {
    "name": "ياسر عمار احمد صالح",
    "group": "A"
  },
  {
    "name": "پاسر عمار محمد سعيد",
    "group": "A"
  },
  {
    "name": "ياسمين صهيب سالم ياسين",
    "group": "A"
  },
  {
    "name": "يوسف بشار عبدالرحمن يونس",
    "group": "A"
  },
  {
    "name": "ثاري صدام",
    "group": "A"
  }
];

let attendanceData = {};
let currentFilter = 'all';

function getTodayDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getTodayDateFormatted() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
}

function initApp() {
    const today = getTodayDate();
    
    document.getElementById('dateDisplay').textContent = `تاريخ اليوم: ${today}`;
    
    loadSavedData();
    
    displayStudents();
    updateStats();
    setupEvents();
}

function loadSavedData() {
    const saved = localStorage.getItem('attendanceData');
    if (saved) {
        try {
            attendanceData = JSON.parse(saved);
        } catch (e) {
            attendanceData = {};
        }
    }
    
    const today = getTodayDate();
    if (!attendanceData[today]) {
        attendanceData[today] = {};
        students.forEach(student => {
            attendanceData[today][student.name] = 'present';
        });
        saveData();
    }
}

function saveData() {
    localStorage.setItem('attendanceData', JSON.stringify(attendanceData));
    showMessage('تم حفظ البيانات بنجاح');
}

function displayStudents() {
    const container = document.getElementById('studentsList');
    container.innerHTML = '';
    
    const today = getTodayDate();
    const todayData = attendanceData[today] || {};
    let studentsToShow = [];
    
    if (currentFilter === 'all') {
        studentsToShow = students;
    } else if (currentFilter === 'present') {
        studentsToShow = students.filter(student => todayData[student.name] === 'present');
    } else if (currentFilter === 'absent') {
        studentsToShow = students.filter(student => todayData[student.name] === 'absent');
    }
    
    if (studentsToShow.length === 0) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'empty-message';
        emptyDiv.textContent = 'لا توجد طلاب لعرضهم';
        container.appendChild(emptyDiv);
        return;
    }
    
    studentsToShow.forEach(student => {
        const status = todayData[student.name] || 'present';
        
        const studentDiv = document.createElement('div');
        studentDiv.className = `student-item ${status}`;
        
        const infoDiv = document.createElement('div');
        infoDiv.className = 'student-info';
        
        const nameDiv = document.createElement('div');
        nameDiv.className = 'student-name';
        nameDiv.textContent = student.name;
        
        const groupDiv = document.createElement('div');
        groupDiv.className = 'student-group';
        groupDiv.textContent = `المجموعة: ${student.group}`;
        
        infoDiv.appendChild(nameDiv);
        infoDiv.appendChild(groupDiv);
        const btn = document.createElement('button');
        btn.className = `attendance-btn ${status}`;
        btn.innerHTML = status === 'present' ? '✅' : '❌';
        btn.onclick = () => toggleAttendance(student.name);
        
        studentDiv.appendChild(infoDiv);
        studentDiv.appendChild(btn);
        container.appendChild(studentDiv);
    });
}

function toggleAttendance(studentName) {
    const today = getTodayDate();
    const currentStatus = attendanceData[today][studentName];
    attendanceData[today][studentName] = currentStatus === 'present' ? 'absent' : 'present';
    
    saveData();
    displayStudents();
    updateStats();
}

function updateStats() {
    const today = getTodayDate();
    const todayData = attendanceData[today] || {};
    
    let total = students.length;
    let present = 0;
    let absent = 0;
    
    students.forEach(student => {
        const status = todayData[student.name] || 'present';
        if (status === 'present') present++;
        if (status === 'absent') absent++;
    });
    
    document.getElementById('totalCount').textContent = total;
    document.getElementById('presentCount').textContent = present;
    document.getElementById('absentCount').textContent = absent;
}

function startNewDay() {
    if (confirm('هل تريد بدء يوم جديد؟ سيتم تعيين جميع الطلاب كحاضرين.')) {
        const today = getTodayDate();
        attendanceData[today] = {};
        
        students.forEach(student => {
            attendanceData[today][student.name] = 'present';
        });
        
        saveData();
        displayStudents();
        updateStats();
        showMessage('تم بدء يوم جديد');
    }
}

function showAddModal() {
    document.getElementById('addModal').style.display = 'flex';
    document.getElementById('studentNameInput').value = '';
    document.getElementById('studentNameInput').focus();
}

function addStudent() {
    const input = document.getElementById('studentNameInput');
    const name = input.value.trim();
    
    if (name) {
        students.push({name: name, group: "A"});
        
        const today = getTodayDate();
        if (!attendanceData[today]) {
            attendanceData[today] = {};
        }
        attendanceData[today][name] = 'present';
        
        document.getElementById('addModal').style.display = 'none';
        saveData();
        displayStudents();
        updateStats();
        showMessage('تم إضافة الطالب');
    }
}

function closeAddModal() {
    document.getElementById('addModal').style.display = 'none';
}

function showRemoveModal() {
    const select = document.getElementById('studentSelect');
    select.innerHTML = '<option value="">اختر طالباً للحذف</option>';
    
    students.forEach((student, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = student.name;
        select.appendChild(option);
    });
    
    document.getElementById('removeModal').style.display = 'flex';
}

function removeStudent() {
    const select = document.getElementById('studentSelect');
    const index = parseInt(select.value);
    
    if (!isNaN(index) && index >= 0 && index < students.length) {
        const studentName = students[index].name;
        students.splice(index, 1);
        
        const today = getTodayDate();
        if (attendanceData[today]) {
            delete attendanceData[today][studentName];
        }
        
        document.getElementById('removeModal').style.display = 'none';
        saveData();
        displayStudents();
        updateStats();
        showMessage('تم حذف الطالب');
    }
}

function closeRemoveModal() {
    document.getElementById('removeModal').style.display = 'none';
}

function changeFilter(filter) {
    currentFilter = filter;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.getAttribute('data-filter') === filter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    displayStudents();
}

function showMessage(text) {
    const message = document.createElement('div');
    message.textContent = text;
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        background: #4caf50;
        color: white;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(message);
    setTimeout(() => {
        message.style.opacity = '0';
        message.style.transition = 'opacity 0.3s';
        setTimeout(() => {
            document.body.removeChild(message);
        }, 300);
    }, 3000);
}

// دالة التصدير إلى Excel
function exportToExcel() {
    const today = getTodayDate();
    const todayData = attendanceData[today] || {};
    
    // إعداد البيانات للتصدير
    const excelData = [
        ["سجل حضور الطلاب - كلية التقنية الشمالية"],
        ["قسم هندسة الأمن السيبراني - المجموعة A"],
        [`تاريخ: ${getTodayDateFormatted()}`],
        [""], // سطر فارغ
        ["الرقم", "اسم الطالب", "المجموعة", "حالة الحضور"]
    ];
    
    // إضافة بيانات الطلاب
    students.forEach((student, index) => {
        const status = todayData[student.name] || 'present';
        const statusText = status === 'present' ? 'حاضر' : 'غائب';
        
        excelData.push([
            index + 1,
            student.name,
            student.group,
            statusText
        ]);
    });
    
    // إضافة إحصائيات
    const presentCount = students.filter(s => (todayData[s.name] || 'present') === 'present').length;
    const absentCount = students.filter(s => todayData[s.name] === 'absent').length;
    
    excelData.push([""]); // سطر فارغ
    excelData.push(["الإحصائية", "", "", ""]);
    excelData.push(["إجمالي عدد الطلاب", students.length, "", ""]);
    excelData.push(["عدد الحاضرين", presentCount, "", ""]);
    excelData.push(["عدد الغائبين", absentCount, "", ""]);
    
    // إنشاء ورقة العمل
    const ws = XLSX.utils.aoa_to_sheet(excelData);
    
    // تحديد عرض الأعمدة
    const wscols = [
        {wch: 8},   // الرقم
        {wch: 40},  // الاسم
        {wch: 12},  // المجموعة
        {wch: 12}   // الحالة
    ];
    ws['!cols'] = wscols;
    
    // دمج الخلايا للعناوين
    ws['!merges'] = [
        {s: {r:0, c:0}, e: {r:0, c:3}}, // العنوان الرئيسي
        {s: {r:1, c:0}, e: {r:1, c:3}}, // العنوان الثانوي
        {s: {r:2, c:0}, e: {r:2, c:3}}  // التاريخ
    ];
    
    // تنسيق العناوين
    const titleCells = ['A1', 'A2', 'A3'];
    titleCells.forEach(cell => {
        if (ws[cell]) {
            ws[cell].s = {
                font: {bold: true, sz: 14},
                alignment: {horizontal: "center"}
            };
        }
    });
    
    // تنسيق رأس الجدول
    for(let C = 0; C < 4; ++C) {
        const cellAddress = XLSX.utils.encode_cell({r: 4, c: C});
        if(ws[cellAddress]) {
            ws[cellAddress].s = {
                fill: {fgColor: {rgb: "1a237e"}},
                font: {bold: true, color: {rgb: "FFFFFF"}},
                alignment: {horizontal: "center"}
            };
        }
    }
    
    // تنسيق خلايا "غائب" باللون الأحمر
    for(let R = 5; R < 5 + students.length; ++R) {
        const cellAddress = XLSX.utils.encode_cell({r: R, c: 3}); // العمود الرابع (الحالة)
        if(ws[cellAddress] && ws[cellAddress].v === 'غائب') {
            ws[cellAddress].s = {
                font: {bold: true, color: {rgb: "FF0000"}}
            };
        }
    }
    
    // تنسيق خلايا "حاضر" باللون الأخضر
    for(let R = 5; R < 5 + students.length; ++R) {
        const cellAddress = XLSX.utils.encode_cell({r: R, c: 3});
        if(ws[cellAddress] && ws[cellAddress].v === 'حاضر') {
            ws[cellAddress].s = {
                font: {bold: true, color: {rgb: "00AA00"}}
            };
        }
    }
    
    // إنشاء المصنف
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "حضور الطلاب");
    
    // حفظ الملف باسم التاريخ
    const fileName = `حضور_الطلاب_${today}.xlsx`;
    XLSX.writeFile(wb, fileName);
    
    showMessage(`تم حفظ ملف ${fileName} بنجاح`);
}

// دالة الحفظ والتصدير
function saveAndExport() {
    // حفظ البيانات أولاً في localStorage
    saveData();
    
    // ثم تصديرها إلى Excel
    setTimeout(() => {
        exportToExcel();
    }, 500);
}

function setupEvents() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            changeFilter(filter);
        });
    });
    
    // تغيير هذا السطر لاستدعاء saveAndExport بدلاً من saveData
    document.getElementById('saveBtn').addEventListener('click', saveAndExport);
    
    document.getElementById('newDayBtn').addEventListener('click', startNewDay);
    document.getElementById('addBtn').addEventListener('click', showAddModal);
    document.getElementById('removeBtn').addEventListener('click', showRemoveModal);
    document.getElementById('confirmAddBtn').addEventListener('click', addStudent);
    document.getElementById('cancelAddBtn').addEventListener('click', closeAddModal);
    document.getElementById('confirmRemoveBtn').addEventListener('click', removeStudent);
    document.getElementById('cancelRemoveBtn').addEventListener('click', closeRemoveModal);
    
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    document.getElementById('studentNameInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addStudent();
        }
    });
}

document.addEventListener('DOMContentLoaded', initApp);