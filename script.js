document.addEventListener("DOMContentLoaded", loadStudents);

let editIndex = -1; // Track the index of the student being edited

document.getElementById("student-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let studentId = document.getElementById("studentId").value.trim();
    let email = document.getElementById("email").value.trim();
    let contact = document.getElementById("contact").value.trim();

    // Validation: Ensure no empty fields
    if (!name || !studentId || !email || !contact) {
        alert("Please fill all fields.");
        return;
    }

    // Validation: Student ID & Contact No. should be numbers only
    if (!/^\d+$/.test(studentId) || !/^\d+$/.test(contact)) {
        alert("Student ID and Contact Number must contain only numbers.");
        return;
    }

    // Validation: Name should contain only letters
    if (!/^[A-Za-z\s]+$/.test(name)) {
        alert("Name should contain only letters.");
        return;
    }

    // Validation: Email format
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    let students = JSON.parse(localStorage.getItem("students")) || [];

    if (editIndex === -1) {
        // Add new student
        students.push({ name, studentId, email, contact });
    } else {
        // Update existing student
        students[editIndex] = { name, studentId, email, contact };
        editIndex = -1;
        document.getElementById("submit-btn").textContent = "Add Student"; // Reset button text
    }

    localStorage.setItem("students", JSON.stringify(students));

    document.getElementById("student-form").reset();
    loadStudents();
});

function loadStudents() {
    let studentList = document.getElementById("student-list");
    studentList.innerHTML = "";

    let students = JSON.parse(localStorage.getItem("students")) || [];

    students.forEach((student, index) => {
        let row = studentList.insertRow();
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.studentId}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
    });

    // Ensure the table-wrapper has a minimum height for scrollbar
    let tableWrapper = document.getElementById("table-wrapper");
    tableWrapper.style.overflowY = "scroll"; // Ensure scrollbar is always visible
}




function editStudent(index) {
    let students = JSON.parse(localStorage.getItem("students"));
    let student = students[index];

    document.getElementById("name").value = student.name;
    document.getElementById("studentId").value = student.studentId;
    document.getElementById("email").value = student.email;
    document.getElementById("contact").value = student.contact;

    editIndex = index;
    document.getElementById("submit-btn").textContent = "Update Student";

    // Navigate to the Register Student section using smooth scrolling
    document.getElementById("register").scrollIntoView({ behavior: "smooth" });
}

function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem("students"));
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    loadStudents();
}
