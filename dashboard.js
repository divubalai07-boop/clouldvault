// Login Check

if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
}

// Welcome User

const user = JSON.parse(localStorage.getItem("cloudUser"));

if (user) {
    document.getElementById("welcomeUser").textContent = user.username;
}

// Data

let files = JSON.parse(localStorage.getItem("files")) || [];
let downloadCount = parseInt(localStorage.getItem("downloads")) || 0;

// Upload Files

function uploadFiles() {

    const input = document.getElementById("fileInput");

    if (!input.files.length) {
        alert("Please select file");
        return;
    }

    Array.from(input.files).forEach(file => {

        files.push({
            name: file.name,
            size: file.size
        });

    });

    localStorage.setItem(
        "files",
        JSON.stringify(files)
    );

    renderFiles();

    input.value = "";

    alert("File Uploaded Successfully");
}

// Render Files

function renderFiles() {

    const table = document.getElementById("fileTable");

    table.innerHTML = "";

    let totalStorage = 0;

    files.forEach((file, index) => {

        totalStorage += file.size;

        const row = document.createElement("tr");

        row.innerHTML = `<td>${ file.name}</td>

<td>${(file.size / (1024 * 1024)).toFixed(2)} MB</td>

<td>

    <buttonclass = "download-btn"onclick = "downloadFile(${index})" >
Download
    </button>

<buttonclass = "delete-btn"onclick = "deleteFile(${index})" >
    Delete
    </button>

</td>
`;

        table.appendChild(row);

    });

    // Dashboard Cards

    document.getElementById("totalFiles").textContent =
        files.length;

    document.getElementById("uploadCount").textContent =
        files.length;

    document.getElementById("downloadCount").textContent =
        downloadCount;

    document.getElementById("storageUsed").textContent =
        (totalStorage / (1024 * 1024)).toFixed(2) + " MB";

    updateChart(totalStorage);
}

// Delete File

function deleteFile(index) {

    files.splice(index, 1);

    localStorage.setItem(
        "files",
        JSON.stringify(files)
    );

    renderFiles();
}

// Download File

function downloadFile(index) {

    downloadCount++;

    localStorage.setItem(
        "downloads",
        downloadCount
    );

    renderFiles();

    alert("Downloading: " + files[index].name);
}

// Logout

function logout() {

    localStorage.removeItem("loggedIn");

    window.location.href = "index.html";
}

// Chart

let chart;

function updateChart(storage) {

    const ctx =
        document.getElementById("storageChart");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {

        type: "doughnut",

        data: {

            labels: [
                "Used Storage",
                "Available"
            ],

            datasets: [{
                data: [
                    (storage / (1024 * 1024)).toFixed(2),
                    100
                ],

                backgroundColor: [
                    "#38bdf8",
                    "#334155"
                ]
            }]
        },

        options: {
            responsive: true
        }

    });

}

// Initial Load

renderFiles();
window.deleteFile = deleteFile;
window.downloadFile = downloadFile;