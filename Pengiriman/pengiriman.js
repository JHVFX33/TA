let dataBarang = [
            { nomorpesanan: "12345", namabarang: "Baja Ringan", alamat: "Jakarta", berat: 156, status: "Sedang Dikirim" },
            { nomorpesanan: "12346", namabarang: "Rangka Besi", alamat: "Bandung", berat: 632, status: "Selesai Pengantaran" },
            { nomorpesanan: "12347", namabarang: "Pipa Galvanis", alamat: "Surabaya", berat: 211, status: "Belum Dikirim" },
        ];
        let currentPage = 1;
        let rowsPerPage = parseInt(document.getElementById("showing").value);

        function renderTable() {
        const tableBody = document.getElementById("tableBody");
        tableBody.innerHTML = "";

        let start = (currentPage - 1) * rowsPerPage;
        let end = start + rowsPerPage;
        let paginatedData = dataBarang.slice(start, end);

        paginatedData.forEach(item => {
            let statusColor = "";
            if (item.status === "Belum Dikirim") {
                statusColor = "bg-red-500 text-white px-2 py-1 rounded"; // Merah
            } else if (item.status === "Sedang Dikirim") {
                statusColor = "bg-yellow-500 text-white px-2 py-1 rounded"; // Kuning
            } else if (item.status === "Selesai Pengantaran") {
                statusColor = "bg-green-500 text-white px-2 py-1 rounded"; // Hijau
            }

            const row = `
                <tr class="hover:bg-gray-100 text-center">
                    <td class="p-2 border">${item.nomorpesanan}</td>
                    <td class="p-2 border">${item.namabarang}</td>
                    <td class="p-2 border">${item.alamat}</td>
                    <td class="p-2 border">${item.berat}</td>
                    <td class="p-2 border">
                        <span class="px-2 py-1 rounded ${statusColor}">
                            ${item.status}
                        </span>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });

        renderPagination();
        }
        function tambahBarang() {
            window.location.href = "formcoba.html";
        }

        function renderPagination() {
            const totalPages = Math.ceil(dataBarang.length / rowsPerPage);
            const paginationButtons = document.getElementById("paginationButtons");
            paginationButtons.innerHTML = "";

            for (let i = 1; i <= totalPages; i++) {
                let button = document.createElement("button");
                button.className = `border px-3 py-1 rounded ${i === currentPage ? 'bg-gray-500 text-white' : ''}`;
                button.innerText = i;
                button.onclick = () => changePage(i);
                paginationButtons.appendChild(button);
            }
        }

        function changePage(page) {
            currentPage = page;
            renderTable();
        }

        function cariBarang() {
            let search = document.getElementById("searchInput").value.toLowerCase();
            dataBarang = dataBarang.filter(item => item.namabarang.toLowerCase().includes(search));
            renderTable();
        }
        document.getElementById("profileMenu").addEventListener("click", function () {
            let dropdown = document.getElementById("logoutDropdown");
            dropdown.classList.toggle("hidden");
        });

        function cariBarang() {
            let search = document.getElementById("searchInput").value.toLowerCase();
            let filteredData = dataBarang.filter(item => item.namabarang.toLowerCase().includes(search));
            renderTable(filteredData);
            renderPagination(filteredData.length); // Update pagination
        }

        function renderPagination(totalItems = dataBarang.length) {
            const totalPages = Math.ceil(totalItems / rowsPerPage);
        }
        / Toggle dropdown logout saat profil diklik
    document.getElementById('profileMenu').addEventListener('click', function () {
        const dropdown = document.getElementById('logoutDropdown');
        dropdown.classList.toggle('hidden');
    });

    function logout() {
        alert("Anda telah logout.");
        window.location.href = "/"; 
    }