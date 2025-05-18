let selectedRole = "";
let passwordVisible = false;
function selectRole(role) {
    selectedRole = role;
    document.getElementById("selectedRole").innerHTML = `Anda memilih sebagai <strong>${role}</strong>`;
    setTimeout(() => {
        document.getElementById("roleSelection").classList.add("hidden");
        document.getElementById("loginCard").classList.remove("hidden");
        document.getElementById("roleDisplay").innerHTML = `Login sebagai <strong>${role}</strong>`;
    }, 1000);
}

function login() {
    const username = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!username || !password) {
        alert("Silakan isi username dan password.");
        return;
    }

    if (selectedRole === "Admin") {
        if (username === "admin" && password === "1") {
            window.location.href = "hlmadmin.html";
        } else {
            alert("Login Admin gagal. Username atau Password Salah");
        }
    } else if (selectedRole === "Kurir") {
        if (username === "kurir" && password === "2") {
            window.location.href = "kurirmelacak.html";
        } else {
            alert("Login Kurir gagal. Username atau Password Salah");
        }
    } else {
        alert("Silakan pilih peran terlebih dahulu.");
    }
}

function togglePassword() {
    const passwordInput = document.getElementById("password");
    const toggleBtn = document.querySelector(".toggle-password");

    if (passwordVisible) {
        passwordInput.type = "password";
        toggleBtn.textContent = "👁️";
    } else {
        passwordInput.type = "text";
        toggleBtn.textContent = "🙈";
    }
    passwordVisible = !passwordVisible;
}