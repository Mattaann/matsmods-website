document.addEventListener("DOMContentLoaded", function () {

    /* ========================================
       DOWNLOAD SYSTEM
    ======================================== */

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
        versionSelect &&
        downloadButton &&
        downloadModal &&
        modalCloseButton &&
        modalModDownload
    ) {

        function getModName() {

            if (document.body.classList.contains("sethome-page")) {
                return "Mat's Set Home";
            }

            if (document.body.classList.contains("notes-page")) {
                return "Mat's Notes";
            }

            if (document.body.classList.contains("manager-page")) {
                return "Mat's Essentials";
            }

            if (document.body.classList.contains("zoom-page")) {
                return "Mat's Zoom";
            }

            return "Mat's Mod";
        }


        function updateDownloadVersion() {

            const selectedOption =
                versionSelect.options[
                    versionSelect.selectedIndex
                ];

            const downloadLink =
                selectedOption.value;

            const version =
                selectedOption.dataset.version;

            const modName =
                getModName();


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

            downloadModal.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.classList.add(
                "modal-open"
            );

            modalCloseButton.focus();
        }


        function closeDownloadModal() {

            downloadModal.classList.remove("open");

            downloadModal.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.classList.remove(
                "modal-open"
            );
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
    }


    /* ========================================
       SIMPLE IMAGE GALLERY
    ======================================== */

    const simpleGalleryModal =
        document.getElementById("simpleGalleryModal");

    const simpleGalleryLargeImage =
        document.getElementById(
            "simpleGalleryLargeImage"
        );


    window.openSimpleGallery = function (image) {

        if (
            !simpleGalleryModal ||
            !simpleGalleryLargeImage
        ) {
            return;
        }

        simpleGalleryLargeImage.src =
            image.src;

        simpleGalleryLargeImage.alt =
            image.alt;

        simpleGalleryModal.classList.add(
            "open"
        );

        document.body.classList.add(
            "gallery-open"
        );
    };


    window.closeSimpleGallery = function (event) {

        if (!simpleGalleryModal) {
            return;
        }

        if (
            event &&
            event.target !== simpleGalleryModal &&
            !event.target.classList.contains(
                "simple-gallery-close"
            )
        ) {
            return;
        }

        simpleGalleryModal.classList.remove(
            "open"
        );

        document.body.classList.remove(
            "gallery-open"
        );
    };


    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                if (
                    simpleGalleryModal?.classList.contains(
                        "open"
                    )
                ) {
                    simpleGalleryModal.classList.remove(
                        "open"
                    );

                    document.body.classList.remove(
                        "gallery-open"
                    );
                }

            }

        }
    );

});