// Grafik Chart.js
        const ctx = document.getElementById('chart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['1/12', '2/12', '3/12', '4/12', '5/12', '6/12'],
                datasets: [
                    {
                        label: 'Pengiriman',
                        data: [10, 20, 30, 40, 50, 60],
                        borderColor: 'orange',
                        fill: true,
                        backgroundColor: 'rgba(255, 165, 0, 0.2)'
                    },
                    {
                        label: 'Keluhan',
                        data: [5, 15, 25, 35, 45, 55],
                        borderColor: 'blue',
                        fill: true,
                        backgroundColor: 'rgba(0, 0, 255, 0.2)'
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        enabled: true
                    }
                }
            }
        });

        // Kalender FullCalendar
        document.addEventListener('DOMContentLoaded', function () {
            var calendarEl = document.getElementById('calendar');

            var calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: 'dayGridMonth',
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek'
                },
                events: [
                    {
                        title: 'Keluhan dari pelanggan A',
                        start: '2025-04-12',
                        color: '#ef4444'
                    },
                    {
                        title: 'Pengiriman ke Bandung',
                        start: '2025-04-13',
                        color: '#3b82f6'
                    },
                    {
                        title: 'Keluhan barang rusak',
                        start: '2025-04-14',
                        color: '#ef4444'
                    },
                    {
                        title: 'Pengiriman ke Surabaya',
                        start: '2025-04-15',
                        color: '#3b82f6'
                    }
                ],
                eventClick: function(info) {
                    alert('Event: ' + info.event.title);
                }
            });

            calendar.render();
        });

        

        // Toggle Dropdown Logout
        document.getElementById("profileMenu").addEventListener("click", function (event) {
            event.stopPropagation();
            let dropdown = document.getElementById("logoutDropdown");
            dropdown.classList.toggle("hidden");
        });

        // Tutup dropdown jika klik di luar
        document.addEventListener("click", function (event) {
            let profileMenu = document.getElementById("profileMenu");
            let dropdown = document.getElementById("logoutDropdown");

            if (!profileMenu.contains(event.target)) {
                dropdown.classList.add("hidden");
            }
        });