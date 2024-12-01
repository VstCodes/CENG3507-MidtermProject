/* List-Dictionary format for storing course and student information. */
const lectures = [
    {
        courseId: "CENG3507", courseName: "Web Development", instructor: "Bekir Taner Dinçer", pointScale: 10, credit: 6,
        students: [{ studentId: 220709001, firstName: "Vuslat", lastName: "Türk", midterm: 95, final: 90 },
        { studentId: 220709002, firstName: "Begüm", lastName: "Başovalı", midterm: 90, final: 88 },
        { studentId: 220709003, firstName: "Merve", lastName: "Kaldırım", midterm: 74, final: 97 }]
    },

    {
        courseId: "CENG3511", courseName: "Artificial Intelligence", instructor: "Bekir Taner Dinçer", pointScale: 10, credit: 6,
        students: [{ studentId: 220709001, firstName: "Vuslat", lastName: "Türk", midterm: 74, final: 97 },
        { studentId: 220709003, firstName: "Merve", lastName: "Kaldırım", midterm: 74, final: 97 }]
    },

    {
        courseId: "CENG3517", courseName: "Natural Language Programming", instructor: "Bekir Taner Dinçer", pointScale: 7, credit: 5,
        students: [{ studentId: 220709003, firstName: "Merve", lastName: "Kaldırım", midterm: 74, final: 97 }, { studentId: 220709001, firstName: "Vuslat", lastName: "Türk", midterm: 80, final: 90 }]
    }]


/* Function for display lecture buttons. */
function displayLectureButtons() {
    const container = document.getElementById("lectures-container");
    container.innerHTML = ""; 


    lectures.forEach((lecture, index) => {
        
        const buttonDiv = document.createElement("div");
        buttonDiv.className = "each-lecture-div";
        buttonDiv.innerHTML = `
            <button class="lecture-btn" onclick="listStudentsByLecture(${index})">${lecture.courseId} : ${lecture.courseName}</button>
            <button onclick="toggleLectureDetails(${index})">Lecture Details</button>
            <button onclick="toggleEditForm(${index})">Edit</button>
            <button onclick="deleteLecture(${index})">Remove</button>
        `;

        
        const lectureInfoDiv = document.createElement("div");
        lectureInfoDiv.className = "lecture-info";
        lectureInfoDiv.style.display = "none"; 
        lectureInfoDiv.id = `lecture-info-${index}`; 

        container.appendChild(buttonDiv);
        container.appendChild(lectureInfoDiv);

    });
}


// Course filter function

function filterLectures() {
    const searchInput = document.getElementById('search-input').value.toLowerCase(); 
    const filteredLectures = lectures.filter(lecture => {
        
        return lecture.courseName.toLowerCase().includes(searchInput) || lecture.courseId.toLowerCase().includes(searchInput);
    });

    displaySearchLectures(filteredLectures);
}

// Function to print searched lessons to the screen.

function displaySearchLectures(filteredLectures) {
    const container = document.getElementById("lectures-container");
    container.innerHTML = ""; 

    
    if (filteredLectures.length === 0) {
        container.innerHTML = "<p>No lectures found</p>";
        return;
    }

    filteredLectures.forEach((lecture, index) => {
       
        const buttonDiv = document.createElement("div");
        buttonDiv.className = "each-lecture-div";
        buttonDiv.innerHTML = `
            <button class="lecture-btn" onclick="listStudentsByLecture(${index})">${lecture.courseId} : ${lecture.courseName}</button>
            <button onclick="toggleLectureDetails(${index})">Lecture Details</button>
            <button onclick="toggleEditForm(${index})">Edit</button>
            <button onclick="deleteLecture(${index})">Remove</button>
        `;

        
        const lectureInfoDiv = document.createElement("div");
        lectureInfoDiv.className = "lecture-info";
        lectureInfoDiv.style.display = "none"; 
        lectureInfoDiv.id = `lecture-info-${index}`;

        container.appendChild(buttonDiv);
        container.appendChild(lectureInfoDiv);
    });
}


// Function adds new lecture
function addNewLecture() {
    const container = documnet.getElementById("new-course-form")
    container.innerHTML = "";
    if (container.style.display === "none") {
        container.style.display = "block";

        container.innerHTML = `
            <form onsubmit="submitEditForm(event, ${index})">
                <label for="courseId-${index}">Course ID:</label>
                <input type="text" id="courseId-${index}" value="${lectures[index].courseId}" required >
                <br>
                <label for="courseName-${index}">Course Name:</label>
                <input type="text" id="courseName-${index}" value="${lectures[index].courseName}" required>
                <br>
                <label for="instructor-${index}">Insturctor:</label>
                <input type="text" id="instructor-${index}" value="${lectures[index].instructor}" required>
                <br>
                <select id="pointScale-${index}" value="${lectures[index].pointScale}" required>
                    <option value="7">7</option>
                    <option value="10">10</option>
                </select>
                <br>
                <select id="credit-${index}" value="${lectures[index].credit}" required>
                    <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="10">10</option>
                </select>
                <br>
                <button type="submit">Save</button>
                <button type="button" onclick="toggleEditForm(${index})">Cancel</button>
            </form>
        `;
    } else {
        container.style.display = "none";
        container.innerHTML = "";
    }
}

// saves new added lecture
function saveCourse() {
    const courseId = document.getElementById("course-id").value.trim();
    const courseName = document.getElementById("course-name").value.trim();
    const instructor = document.getElementById("instructor").value.trim();
    const pointScale = document.getElementById("pointScale").value;
    const credit = document.getElementById("credit").value;

   
    if (courseName === '' || courseId === '' || instructor === '') {
        alert('Lütfen tüm alanları doldurunuz.');
        return;
    }

    
    const isDuplicate = lectures.some(lecture => lecture.courseId === courseId);

    if (isDuplicate) {
        alert('Bu ders koduna sahip bir ders zaten mevcut.');
        return;
    }

    
    if (!/^(?!\d+$)[A-Za-z0-9]+$/.test(courseName)) {
        alert("Ders Adı sadece harf ve boşluk içerebilir!");
        return;
    }

    if (!/^[A-Za-z ]+$/.test(instructor)) {
        alert("Instructor sadece harf ve boşluk içerebilir!");
        return;
    }

   
    const newLecture = {
        courseName: courseName,
        courseId: courseId,
        instructor: instructor,
        pointScale: pointScale,
        credit: credit,
        students: [] 
    };

    
    lectures.push(newLecture);

    
    displayLectureButtons();

    
    document.getElementById('new-course-form').reset();
    closeForm();
}


// Creates edit form for lecture
function toggleEditForm(index) {
    const lectureInfoDiv = document.getElementById(`lecture-info-${index}`);

    let newPointScale = ((lectures[index].pointScale) === 10 ? 7 : 10);

    
    if (lectureInfoDiv.style.display === "none") {
        lectureInfoDiv.style.display = "block";

       
        lectureInfoDiv.innerHTML = `
            <form onsubmit="submitEditForm(event, ${index})">
                <div class="lecture-detail-div">
                    <label for="courseName-${index}">Course Name:</label>
                    <input type="text" id="courseName-${index}" value="${lectures[index].courseName}" required>
                    <br>
                    <label for="courseId-${index}">Course ID:</label>
                    <input type="text" id="courseId-${index}" value="${lectures[index].courseId}" required>
                    <br>
                    <label for="courseId-${index}">Point Scale:</label>
                    <select id="pointScale-${index}" value="${lectures[index].pointScale}" required>
                        <option value="${lectures[index].pointScale}">${lectures[index].pointScale}</option>
                        <option value="${newPointScale}"> ${newPointScale} </option>
                    </select>
                    <br>
                </div>
                <button type="submit" class="close-detail-button">Save</button>
                <button type="button" onclick="toggleEditForm(${index})" class="close-detail-button">Cancel</button>
            </form>
        `;
    } else {
        lectureInfoDiv.style.display = "none";
        lectureInfoDiv.innerHTML = "";
    }
}

// saves editted lecture
function submitEditForm(event, index) {
    event.preventDefault();

    const courseNameInput = document.getElementById(`courseName-${index}`).value.trim();
    const courseIdInput = document.getElementById(`courseId-${index}`).value.trim();
    const coursePointScaleInput = document.getElementById(`pointScale-${index}`).value;

    
    if (!courseNameInput || !courseIdInput) {
        alert("Course ID and Course Name cannot be empty!");
        return;
    }

    
    const isDuplicateId = lectures.some((lecture, i) => lecture.courseId === courseIdInput && i !== index);
    if (isDuplicateId) {
        alert("Course ID must be unique!");
        return;
    }

   
    const updatedLecture = {
        courseName: courseNameInput,
        courseId: courseIdInput,
        pointScale: (coursePointScaleInput) || lectures[index].pointScale,
        credit: lectures[index].credit,
        students: lectures[index].students
    };

    
    lectures[index] = updatedLecture;


    
    toggleEditForm(index);
    displayLectureButtons();
}


// calcuates letter grade
function calculateGrade(midterm, final, pointScale, letter = ["AA", "BA", "BB", "CB", "CC", "CD", "DD", "FF"]) {
   
    const total = midterm * 0.4 + final * 0.6;

    
    const letterGradeIndex = Math.floor((100 - total) / pointScale);

    
    if (letterGradeIndex >= letter.length) {
        return letter[letter.length - 1]; 
    }
    return letter[letterGradeIndex];
}
// calculates failed student count
function passFail(lecture) {
    let failedStudents = 0;
    lecture.students.forEach(student => {
        const grade = calculateGrade(
            student.midterm,
            student.final,
            lecture.pointScale,
        );

        if (grade === "FF") {
            failedStudents++;
        }
    });
    return failedStudents;
}
// calculates course average
function calcCourseAverage(lecture) {
    if (!lecture.students || lecture.students.length === 0) {
        return 0;
    }

    const totalScore = lecture.students.reduce((sum, student) => {
        return sum + ((student.midterm * 0.4) + (student.final * 0.6));
    }, 0);

    const average = totalScore / lecture.students.length;

    
    return parseFloat(average.toFixed(2));
}
// Returns the student's passing or failing status in a course
function failedSituation(grade) {
    return grade === "FF" || grade === "ff" ? "Failed" : "Passed"
}


// shows lecture details
function toggleLectureDetails(index) {
    const lectureInfoDiv = document.getElementById(`lecture-info-${index}`);

    if (!lectureInfoDiv) {
        console.error(`lecture-info-${index} div'i bulunamadı.`);
        return;
    }

    const failedStudents = passFail(lectures[index]);
    const courseAverage = calcCourseAverage(lectures[index]);

    
    if (lectureInfoDiv.style.display === "none" || lectureInfoDiv.style.display === "") {
        lectureInfoDiv.style.display = "block";

        
        lectureInfoDiv.innerHTML = `
            <div class="lecture-detail-div">
                <h3><u>~Lecture Details~</u></h3>
                <p><strong>Course ID:</strong> ${lectures[index].courseId}</p>
                <p><strong>Course Name:</strong> ${lectures[index].courseName}</p>
                <p><strong>Instructor:</strong> ${lectures[index].instructor}</p>
                <p><strong>Point Scale:</strong> ${lectures[index].pointScale}</p>
                <p><strong>Credit:</strong> ${lectures[index].credit}</p>
                <p><strong>Total Students:</strong> ${lectures[index].students.length}</p>
                <p><strong>Passed Students:</strong> ${lectures[index].students.length - failedStudents}</p>
                <p><strong>Failed Students:</strong> ${failedStudents}</p>
                <p><strong>Course Average:</strong> ${courseAverage}</p>
            </div>
            
            <button type="button" onclick="toggleLectureDetails(${index})" class="close-detail-button">Close</button>
        `;
    } else {
        lectureInfoDiv.style.display = "none";
        lectureInfoDiv.innerHTML = ""; 
    }
}

// deletes lecture
function deleteLecture(index) {
    if (confirm("Bu dersi silmek istediğinize emin misiniz?")) {
        lectures.splice(index, 1);
        displayLectureButtons();
    }
}

//opens new lecture form
function openForm() {
    const courseForm = document.getElementById('course-form');
    courseForm.style.display = 'block';
}

// closes new lecture form
function closeForm() {
    const courseForm = document.getElementById('course-form');
    courseForm.style.display = 'none';
}

// searchs students in the course
function searchStudents() {
    const searchTerm = document.getElementById("search-student-input").value.toLowerCase();
    
    const lecture = lectures[currentLectureIndex]; 
    const studentTable = document.getElementById("student-table");

    
    studentTable.innerHTML = "";

    
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = `
        <th>Student Id</th>
        <th>Student First Name</th>
        <th>Student Last Name</th>
        <th>Midterm Score</th>
        <th>Final Score</th>
        <th>Letter Grade</th>
        <th>Passed/Failed</th>
        <th>GPA</th>
        <th>Actions</th>
    `;
    studentTable.appendChild(headerRow);

    
    const studentGPA = calculateGPA(lectures); 

    
    const filteredStudents = lecture.students.filter(student => {
        
        const studentData = `
            ${student.studentId} ${student.firstName} ${student.lastName} 
            ${student.midterm} ${student.final}
        `.toLowerCase();

        
        const letterGrade = calculateGrade(student.midterm, student.final, lecture.pointScale).toLowerCase();
        const passedFailed = failedSituation(letterGrade).toLowerCase();
        const gpa = studentGPA[student.studentId]?.gpa.toString().toLowerCase() || "n/a";

        console.log(`Checking student ${student.studentId}:`, {
            studentData,
            letterGrade,
            passedFailed,
            gpa
        });

        
        return studentData.includes(searchTerm) ||
               letterGrade.includes(searchTerm) ||
               passedFailed.includes(searchTerm) ||
               gpa.includes(searchTerm);
    });

    
    if (filteredStudents.length > 0) {
        filteredStudents.forEach((student, studentIndex) => {
            let letterGrade = calculateGrade(student.midterm, student.final, lecture.pointScale);
            let passedFailed = failedSituation(letterGrade);
            const gpa = studentGPA[student.studentId]?.gpa || "N/A";

            const row = document.createElement("tr");
            row.id = `student-row-${currentLectureIndex}-${studentIndex}`;
            row.innerHTML = `
                <td>${student.studentId}</td>
                <td>${student.firstName}</td>
                <td>${student.lastName}</td>
                <td>${student.midterm}</td>
                <td>${student.final}</td>
                <td>${letterGrade}</td>
                <td>${passedFailed}</td>
                <td>${gpa}</td>
                <td class="student-action-column">
                    <button onclick="toggleEditStudentForm(${currentLectureIndex}, ${studentIndex})" class="student-action-button">Edit</button>
                    <button onclick="removeStudent(${currentLectureIndex}, ${studentIndex})" class="student-action-button">Remove</button>
                </td>
            `;
            studentTable.appendChild(row);
        });
    } else {
        const noStudentRow = document.createElement("tr");
        noStudentRow.innerHTML = `<td colspan="9">No students found.</td>`;
        studentTable.appendChild(noStudentRow);
    }
}

// shows edit student form
function toggleEditStudentForm(lectureIndex, studentIndex) {
    
    const studentRow = document.querySelector(`#student-row-${lectureIndex}-${studentIndex}`);
    let editRow = document.querySelector(`#edit-row-${lectureIndex}-${studentIndex}`);

    if (!editRow) {
       
        editRow = document.createElement("tr");
        editRow.id = `edit-row-${lectureIndex}-${studentIndex}`;
        editRow.className = "edit-student-row";
        editRow.innerHTML = `
            <td colspan="9"> <!-- Tüm sütunlara yayılması için colspan kullan -->
                <div class="edit-student-div" id="edit-student">
                    <label for="course-id">Course Id:</label>
                    <input type="text" id="edit-studentId-${lectureIndex}-${studentIndex}" value="${lectures[lectureIndex].students[studentIndex].studentId}" />
                    <label for="firstName">First Name:</label>
                    <input type="text" id="edit-student-firstName-${lectureIndex}-${studentIndex}" value="${lectures[lectureIndex].students[studentIndex].firstName}" />
                    <label for="lastName">Last Name:</label>
                    <input type="text" id="edit-student-lastName-${lectureIndex}-${studentIndex}" value="${lectures[lectureIndex].students[studentIndex].lastName}" />
                    <label for="midterm">Midterm:</label>
                    <input type="text" id="edit-midterm-${lectureIndex}-${studentIndex}" value="${lectures[lectureIndex].students[studentIndex].midterm}" />
                    <label for="final">Final:</label>
                    <input type="text" id="edit-final-${lectureIndex}-${studentIndex}" value="${lectures[lectureIndex].students[studentIndex].final}" />
                    <button onclick="saveStudentEdit(${lectureIndex}, ${studentIndex})" class="close-detail-button">Save</button>
                    <button onclick="cancelEdit(${lectureIndex}, ${studentIndex})" class="close-detail-button">Cancel</button>
                </div>
            </td>
        `;

        
        studentRow.parentNode.insertBefore(editRow, studentRow.nextSibling);
    } else {
        
        editRow.remove();
    }
}


// closes edit student form
function closeForm1() {
    const courseForm = document.getElementById('edit-student');
    courseForm.style.display = 'none';
}

// saves student edit
function saveStudentEdit(lectureIndex, studentIndex) {
   
    const newIDInput = document.getElementById(`edit-studentId-${lectureIndex}-${studentIndex}`).value.trim();
    const newFirstNameInput = document.getElementById(`edit-student-firstName-${lectureIndex}-${studentIndex}`).value.trim();
    const newLastNameInput = document.getElementById(`edit-student-lastName-${lectureIndex}-${studentIndex}`).value.trim();
    const newMidtermInput = document.getElementById(`edit-midterm-${lectureIndex}-${studentIndex}`).value.trim();
    const newFinalInput = document.getElementById(`edit-final-${lectureIndex}-${studentIndex}`).value.trim();

    
    if (!newIDInput || !newFirstNameInput || !newLastNameInput || !(newMidtermInput) || !(newFinalInput)) {
        alert("All fields must be filled.");
        return;
    }

    const idRegex = /^[0-9]+$/;
    if (!idRegex.test(newIDInput)) {
        alert("Student ID must only contain digits between 0 and 9.");
        return;
    }

    
    const nameRegex = /^[a-zA-ZçÇğĞıİöÖşŞüÜ]+$/;
    if (!nameRegex.test(newFirstNameInput)) {
        alert("First name must only contain letters.");
        return;
    }
    if (!nameRegex.test(newLastNameInput)) {
        alert("Last name must only contain letters.");
        return;
    }

    
    if (!isStudentIdUnique(newIDInput, lectureIndex, studentIndex)) {
        alert("Student ID already exists. Please choose another ID.");
        return;
    }
    

    
    const updatedStudentID = lectures[lectureIndex].students[studentIndex].studentId;
    

   
    lectures.forEach(lecture => {
        lecture.students.forEach(student => {
            if (student.studentId === updatedStudentID) {
                student.studentId = newIDInput;
                student.firstName = newFirstNameInput;
                student.lastName = newLastNameInput;
            }
        });
    });
    

    
    const updatedStudent = lectures[lectureIndex].students[studentIndex];
    
   
    updatedStudent.studentId = newIDInput;
    updatedStudent.firstName = newFirstNameInput;
    updatedStudent.lastName = newLastNameInput;
    updatedStudent.midterm = newMidtermInput;
    updatedStudent.final = newFinalInput;


    closeForm1();
    
    listStudentsByLecture(lectureIndex);
}


// checks if id is unique
function isStudentIdUnique(studentId, lectureIndex, studentIndex) {
    const lecture = lectures[lectureIndex]; 
    
    const isUnique = !lecture.students.some((student, index) => {
        
        if (index === studentIndex) {
            return false;
        }

        
        return student.studentId.toString() === studentId.toString();
    });

    return isUnique;
}


// closes edit div
function cancelEdit(lectureIndex, studentIndex) {
    const editRow = document.querySelector(`#edit-row-${lectureIndex}-${studentIndex}`);
    
    if (editRow) {
        editRow.remove();
    }
}

// removes student
function removeStudent(lectureIndex, studentIndex) {
    if (confirm("Are you sure you want to remove this student?")) {
        lectures[lectureIndex].students.splice(studentIndex, 1); 
        listStudentsByLecture(lectureIndex);
    }
}

// calculates student gpa
function calculateGPA(lectures) {
    const studentGPA = {};

    
    lectures.forEach(lecture => {
        const courseCredit = lecture.credit; 
        lecture.students.forEach(student => {
            const studentId = student.studentId;
            const courseGrade = (student.midterm * 0.4) + (student.final * 0.6);

            if (!studentGPA[studentId]) {
                studentGPA[studentId] = {
                    totalPoints: 0,
                    totalCredits: 0 
                };
            }

           
            studentGPA[studentId].totalPoints += courseGrade * courseCredit;
            studentGPA[studentId].totalCredits += courseCredit;
        });
    });

    
    Object.keys(studentGPA).forEach(studentId => {
        const studentData = studentGPA[studentId];
        gpa100 = (studentData.totalPoints / studentData.totalCredits); 
        studentData.gpa = ((gpa100 * 4) / 100).toFixed(2);
    });

    return studentGPA;
}

// list student in each lecture
function listStudentsByLecture(index) {
    currentLectureIndex = index;
    const lecture = lectures[index];
    const popup = document.getElementById("student-popup");
    const popupTitle = document.getElementById("popup-title");
    const studentTable = document.getElementById("student-table");

    
    popupTitle.innerText = `~ ${lecture.courseId} : ${lecture.courseName} - Students ~`;

   
    studentTable.innerHTML = "";

    const studentGPA = calculateGPA(lectures);

    if (lecture.students.length > 0) {
        const headerRow = document.createElement("tr");
        headerRow.innerHTML = `
            <th>Student Id</th>
            <th>Student First Name</th>
            <th>Student Last Name</th>
            <th>Midterm Score</th>
            <th>Final Score</th>
            <th>Letter Grade</th>
            <th>Passed/Failed</th>
            <th>GPA</th>
            <th>Actions</th>
        `;
        studentTable.appendChild(headerRow);

        lecture.students.forEach((student, studentIndex) => {
            let letterGrade = calculateGrade(student.midterm, student.final, lecture.pointScale);
            let passedFailed = failedSituation(letterGrade);
            

            const gpa = studentGPA[student.studentId]?.gpa || "N/A";

            const row = document.createElement("tr");
            row.id = `student-row-${index}-${studentIndex}`;
            row.innerHTML = `
                <td>${student.studentId}</td>
                <td>${student.firstName}</td>
                <td>${student.lastName}</td>
                <td>${student.midterm}</td>
                <td>${student.final}</td>
                <td>${letterGrade}</td>
                <td>${passedFailed}</td>
                <td>${gpa}</td>
                <td class="student-action-column">
                    <button onclick="toggleEditStudentForm(${index}, ${studentIndex})" class="student-action-button">Edit</button>
                    <button onclick="removeStudent(${index}, ${studentIndex})" class="student-action-button">Remove</button>
                </td>
            `;
            studentTable.appendChild(row);
        });
    } else {
        const noStudentRow = document.createElement("tr");
        noStudentRow.innerHTML = `<td colspan="3">No students in this lecture.</td>`;
        studentTable.appendChild(noStudentRow);
    }

    
    popup.style.display = "block";
}



// Function to add new students to the course
function addStudent() {
    const newStudentID = document.getElementById("new-studentId").value.trim();
    const newStudentFirstName = document.getElementById("new-student-firstName").value.trim();
    const newStudentLastName = document.getElementById("new-student-lastName").value.trim();
    const newStudentMidterm = document.getElementById("new-midterm").value.trim();
    const newStudentFinal = document.getElementById("new-final").value.trim();
    const lectureIndex = currentLectureIndex;


    if (!newStudentID || !newStudentFirstName || !newStudentLastName || !newStudentMidterm || !newStudentFinal) {
        alert("All fields must be filled in!");
        return;
    }

    
    const idRegex = /^[0-9]+$/;
    if (!idRegex.test(newStudentID)) {
        alert("Student ID must only contain digits between 0 and 9.");
        return;
    }

    

    
    const nameRegex = /^[a-zA-ZçÇğĞıİöÖşŞüÜ]+$/;
    if (!nameRegex.test(newStudentFirstName)) {
        alert("First name must only contain letters.");
        return;
    }
    if (!nameRegex.test(newStudentLastName)) {
        alert("Last name must only contain letters.");
        return;
    }

    const gradeRegex = /^(100|[1-9]?[0-9])$/;
    if(!gradeRegex.test(newStudentMidterm)){
        alert("Midterm score must be between 0 and 100.");
        return;
    }
    if(!gradeRegex.test(newStudentFinal)){
        alert("Final score must be between 0 and 100.");
        return;
    }

     
    if (!isStudentIdUnique(newStudentID, lectureIndex, -1)) {
        alert("Student ID already exists. Please choose another ID.");
        return;
    }

    
    const newStudent = {
        studentId: newStudentID,
        firstName: newStudentFirstName,
        lastName: newStudentLastName,
        midterm: newStudentMidterm,
        final: newStudentFinal
    };

    
    lectures[lectureIndex].students.push(newStudent);

   
    toggleAddStudentForm();
    document.getElementById("new-studentId").value = "";
    document.getElementById("new-student-firstName").value = "";
    document.getElementById("new-student-lastName").value = "";
    document.getElementById("new-midterm").value = "";
    document.getElementById("new-final").value = "";

    
    listStudentsByLecture(lectureIndex);
}

function toggleAddStudentForm() {
    const form = document.getElementById("add-student-form");
    form.style.display = form.style.display === "none" ? "flex" : "none";
}
function closeStudentPopup() {
    const popup = document.getElementById("student-popup");
    popup.style.display = "none";
}


document.addEventListener("DOMContentLoaded", displayLectureButtons);



// LİST ALL EXİSTİNG STUDENTS 
// DONT WORK ??
function displayStudentInfo() {
    const studentInfo = {};

    lectures.forEach(lecture => {
        lecture.students.forEach(student => {
            if (!studentInfo[student.studentId]) {
                studentInfo[student.studentId] = {
                    studentId: student.studentId,
                    firstName: student.firstName,
                    lastName: student.lastName,
                    courses: []
                };
            }
            studentInfo[student.studentId].courses.push({
                courseId: lecture.courseId,
                courseName: lecture.courseName,
                midterm: student.midterm,
                final: student.final
            });
        });
    });

    const studentDiv = document.getElementById("student-info");
    studentDiv.innerHTML = ''; 

    Object.values(studentInfo).forEach(student => {
        const studentItem = document.createElement('div');
        studentItem.classList.add('student-item');
        studentItem.innerHTML = `<strong>Student ID: ${student.studentId}, Name: ${student.firstName} ${student.lastName}</strong>`;

        const coursesList = document.createElement('div');
        student.courses.forEach(course => {
            const courseItem = document.createElement('div');
            courseItem.classList.add('course-item');
            courseItem.innerHTML = `Course: ${course.courseName} (ID: ${course.courseId}), Midterm: ${course.midterm}, Final: ${course.final}`;
            coursesList.appendChild(courseItem);
        });

        studentItem.appendChild(coursesList);
        studentDiv.appendChild(studentItem);
    });
}


function displayStudentsPart() {
    document.getElementById("student-option").addEventListener("click", function () {
        
        const hiddenDiv = document.getElementById("students");

        
        if (hiddenDiv.style.display === "none" || hiddenDiv.style.display === "") {
            hiddenDiv.style.display = "block";  
            displayStudentInfo(); 
        } else {
            hiddenDiv.style.display = "none"; 
        }
    });
}


