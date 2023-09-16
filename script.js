// Kelas Pendaftar digunakan untuk merepresentasikan data pendaftar
class Pendaftar {
    constructor(nama, umur, uangSangu) {
        this.nama = nama;
        this.umur = umur;
        this.uangSangu = uangSangu;
    }
}
// Kelas Registrasi digunakan untuk mengelola daftar pendaftar
class Registrasi {
    constructor() {
        this.pendaftarList = [];
    }

    async addPendaftar(nama, umur, uangSangu) {
        return new Promise((resolve, reject) => {
            if (nama.length < 10 || umur < 25 || uangSangu < 100000 || uangSangu > 1000000) {
                reject("Data tidak memenuhi kriteria!");
            } else {
                const pendaftar = new Pendaftar(nama, umur, uangSangu);
                this.pendaftarList.push(pendaftar);
                resolve(pendaftar);
            }
        });
    }

    // Operasi untuk menghitung rata-rata uang sangu dan umur
    calculateAverage() {
        let totalUangSangu = 0;
        let totalUmur = 0;

        this.pendaftarList.forEach((pendaftar) => {
            totalUangSangu += pendaftar.uangSangu;
            totalUmur += pendaftar.umur;
        });

        const averageUangSangu = totalUangSangu / this.pendaftarList.length;
        const averageUmur = totalUmur / this.pendaftarList.length;

        return {
            averageUangSangu: averageUangSangu.toFixed(2),
            averageUmur: averageUmur.toFixed(2),
        };
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const registrasi = new Registrasi();

    // Fungsi untuk membuka tab yang dipilih
    function openTab(tabName) {
        const tabs = document.querySelectorAll(".tabcontent");
        tabs.forEach((tab) => {
            tab.style.display = "none";
        });

        const tablinks = document.querySelectorAll(".tablink");
        tablinks.forEach((tablink) => {
            tablink.classList.remove("active");
        });

        document.getElementById(tabName).style.display = "block";
        document.getElementById(`tab${tabName}`).classList.add("active");
    }

    // Fungsi untuk menampilkan data pendaftar di tabel
    function displayPendaftar() {
        const tableBody = document.getElementById("resumeTableBody");
        tableBody.innerHTML = "";

        registrasi.pendaftarList.forEach((pendaftar) => {
            const newRow = tableBody.insertRow();
            const cell1 = newRow.insertCell(0);
            const cell2 = newRow.insertCell(1);
            const cell3 = newRow.insertCell(2);
            cell1.textContent = pendaftar.nama;
            cell2.textContent = pendaftar.umur;
            cell3.textContent = pendaftar.uangSangu;
        });

        const averageData = registrasi.calculateAverage();
        document.getElementById("averageUangSangu").textContent = averageData.averageUangSangu;
        document.getElementById("averageUmur").textContent = averageData.averageUmur;
    }

    // Event listener untuk tab Registrasi
    document.getElementById("tabRegistrasi").addEventListener("click", function () {
        openTab("Registrasi");
    });

    // Event listener untuk tab List Pendaftar
    document.getElementById("tabListPendaftar").addEventListener("click", function () {
        openTab("ListPendaftar");
        displayPendaftar();
    });

    // Event listener untuk tombol Submit
    document.getElementById("submitBtn").addEventListener("click", async function () {
        const nama = document.getElementById("nama").value;
        const umur = parseInt(document.getElementById("umur").value);
        const uangSangu = parseInt(document.getElementById("uangSangu").value);

        try {
            const pendaftar = await registrasi.addPendaftar(nama, umur, uangSangu);
            console.log(`Pendaftar baru: ${pendaftar.nama}`);
            displayPendaftar();
            document.getElementById("registrationForm").reset();
        } catch (error) {
            alert(error);
            // async/await untuk menghandle operasi asynchronous saat menambahkan pendaftar
        }
    });
});
