// Fungsi untuk membuka tab yang dipilih
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
}

// Fungsi untuk menambahkan data pendaftar ke tabel
function addPendaftar(nama, umur, uangSangu) {
    var table = document.getElementById("pendaftarTable").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.rows.length);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    cell1.innerHTML = nama;
    cell2.innerHTML = umur;
    cell3.innerHTML = uangSangu;
}

// Fungsi untuk menghitung rata-rata uang sangu dan umur
function calculateAverage() {
    var table = document.getElementById("pendaftarTable").getElementsByTagName('tbody')[0];
    var rowCount = table.rows.length;
    var totalUangSangu = 0;
    var totalUmur = 0;
    for (var i = 0; i < rowCount; i++) {
        totalUangSangu += parseInt(table.rows[i].cells[2].innerHTML);
        totalUmur += parseInt(table.rows[i].cells[1].innerHTML);
    }
    var averageUangSangu = totalUangSangu / rowCount;
    var averageUmur = totalUmur / rowCount;
    document.getElementById("averageUangSangu").textContent = averageUangSangu;
    document.getElementById("averageUmur").textContent = averageUmur;
}

// Fungsi untuk submit form
function submitForm() {
    var nama = document.getElementById("nama").value;
    var umur = document.getElementById("umur").value;
    var uangSangu = document.getElementById("uangSangu").value;

    if (nama.length < 10 || umur < 25 || uangSangu < 100000 || uangSangu > 1000000) {
        alert("Data tidak memenuhi kriteria!");
        return;
    }

    addPendaftar(nama, umur, uangSangu);
    calculateAverage();
    document.getElementById("registrationForm").reset();
}
