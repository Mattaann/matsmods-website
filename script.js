document.addEventListener("DOMContentLoaded", function () {

    const versionSelect =
        document.getElementById("version-select");

    const downloadButton =
        document.getElementById("version-download-button");

    const downloadModal =
        document.getElementById("download-modal");

    const modalCloseButton =
        document.getElementById("download-modal-close");

    const modalModDownload =
        document.getElementById("modal-mod-download");

    if (
        !versionSelect ||
        !downloadButton ||
        !downloadModal ||
        !modalCloseButton ||
        !modalModDownload
    ) {
        return;
    }

    function updateDownloadVersion() {

    const selectedOption =
        versionSelect.options[versionSelect.selectedIndex];

    const downloadLink =
        selectedOption.value;

    const version =
        selectedOption.dataset.version;

    let modName = "Mat's Zoom";

if (document.body.classList.contains("sethome-page")) {
    modName = "Mat's Set Home";
}

if (document.body.classList.contains("notes-page")) {
    modName = "Mat's Notes";
}

if (document.body.classList.contains("manager-page")) {
    modName = "Mat's Mod Manager";
}

    downloadButton.textContent =
        `Download ${version}`;

    modalModDownload.href =
        downloadLink;

    modalModDownload.textContent =
        `Download ${modName} ${version}`;
}
    function openDownloadModal() {

        updateDownloadVersion();

        downloadModal.classList.add("open");
        downloadModal.setAttribute("aria-hidden", "false");

        document.body.classList.add("modal-open");

        modalCloseButton.focus();
    }

    function closeDownloadModal() {

        downloadModal.classList.remove("open");
        downloadModal.setAttribute("aria-hidden", "true");

        document.body.classList.remove("modal-open");

        downloadButton.focus();
    }

    versionSelect.addEventListener(
        "change",
        updateDownloadVersion
    );

    downloadButton.addEventListener(
        "click",
        openDownloadModal
    );

    modalCloseButton.addEventListener(
        "click",
        closeDownloadModal
    );

    downloadModal.addEventListener(
        "click",
        function (event) {

            if (event.target === downloadModal) {
                closeDownloadModal();
            }

        }
    );

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                downloadModal.classList.contains("open")
            ) {
                closeDownloadModal();
            }

        }
    );

    updateDownloadVersion();

});