// Data dummy
const namaCustomer = ["Dewi", "Agus", "Sari", "Bambang", "Tari", "Adit", "Fitri", "Imam", "Vina", "Fajar"];
const namaSopir = ["Budi", "Ronaldo", "Soleh", "Joko", "Andi", "Isfan", "Dika", "Arif", "Udin", "Hendra"];
const statusList = ["Belum Ditangani", "Sedang Ditangani", "Selesai"];

// Fungsi pembantu
function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateOrderNumber() {
    return Math.floor(100000000 + Math.random() * 900000000); // 9 digit
}

function getRandomDate(start, end) {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date;
}

function formatDateDisplay(date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${String(date.getFullYear()).slice(-2)}`;
}

function formatDateData(date) {
    return date.toISOString().split('T')[0];
}

// Generate 15 baris keluhan
const tbody = document.getElementById("complaint-table");
for (let i = 0; i < 15; i++) {
    const nama = getRandomItem(namaCustomer);
    const sopir = getRandomItem(namaSopir);
    const nomor = generateOrderNumber();
    const tanggal = getRandomDate(new Date(2023, 0, 1), new Date());
    const status = getRandomItem(statusList);

    let statusClass = "";
    if (status === "Belum Ditangani") statusClass = "bg-red-500 text-white";
    else if (status === "Sedang Ditangani") statusClass = "bg-yellow-200";
    else statusClass = "bg-green-200";

    const row = `
        <tr class="border border-gray-300">
            <td class="p-2 border border-gray-300">${nomor}</td>
            <td class="p-2 border border-gray-300">${nama}</td>
            <td class="p-2 border border-gray-300" data-date="${formatDateData(tanggal)}">${formatDateDisplay(tanggal)}</td>
            <td class="p-2 border border-gray-300">${sopir}</td>
            <td class="p-2 border border-gray-300">
                <span class="${statusClass} px-2 py-1 rounded status">${status}</span>
            </td>
        </tr>
    `;
    tbody.insertAdjacentHTML("beforeend", row);
}

    document.getElementById("filter-button").addEventListener("click", function () {
        const startDate = new Date(document.getElementById("start-date").value);
        const endDate = new Date(document.getElementById("end-date").value);
        const statusFilter = document.getElementById("status-filter").value;
        
        document.querySelectorAll("#complaint-table tr").forEach(row => {
            const dateCell = row.querySelector("td[data-date]");
            const statusCell = row.querySelector(".status");

            if (dateCell && statusCell) {
                const rowDate = new Date(dateCell.getAttribute("data-date"));
                const rowStatus = statusCell.textContent.trim();

                let showRow = true;
                if (!isNaN(startDate) && rowDate < startDate) showRow = false;
                if (!isNaN(endDate) && rowDate > endDate) showRow = false;
                if (statusFilter && rowStatus !== statusFilter) showRow = false;
                
                row.style.display = showRow ? "" : "none";
            }
        });
    });

    document.getElementById("profileMenu").addEventListener("click", function (event) {
        event.stopPropagation();
        document.getElementById("logoutDropdown").classList.toggle("hidden");
    });

    document.addEventListener("click", function (event) {
        let dropdown = document.getElementById("logoutDropdown");
        if (!document.getElementById("profileMenu").contains(event.target)) {
            dropdown.classList.add("hidden");
        }
    });

    function logout() {
        if (confirm("Apakah Anda yakin ingin logout?")) {
            window.location.href = "/";
        }
    }

    document.querySelector("input[placeholder='Cari Nama']").addEventListener("input", function () {
        const searchText = this.value.toLowerCase();
        document.querySelectorAll("#complaint-table tr").forEach(row => {
            const customerNameCell = row.querySelector("td:nth-child(2)");
            if (customerNameCell) {
                row.style.display = customerNameCell.textContent.toLowerCase().includes(searchText) ? "" : "none";
            }
        });
    });
    document.getElementById("search-order").addEventListener("input", function () {
    const searchText = this.value.toLowerCase();
    document.querySelectorAll("#complaint-table tr").forEach(row => {
        const orderNumberCell = row.querySelector("td:first-child");
        if (orderNumberCell) {
            row.style.display = orderNumberCell.textContent.toLowerCase().includes(searchText) ? "" : "none";
        }
    });
});