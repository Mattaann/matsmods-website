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


    const modName =
        document.body.dataset.modName || "Mat's Mod";


    function getSelectedVersion() {

        if (!versionSelect) {
            return null;
        }

        const selectedOption =
            versionSelect.options[
                versionSelect.selectedIndex
            ];

        if (!selectedOption) {
            return null;
        }

        return {
            version:
                selectedOption.dataset.version || "",

            download:
                selectedOption.value || ""
        };
    }


    function updateDownloadVersion() {

        const selected =
            getSelectedVersion();

        if (!selected) {
            return;
        }


        if (downloadButton) {

            if (selected.version) {
                downloadButton.textContent =
                    `Download ${selected.version}`;
            } else {
                downloadButton.textContent =
                    "Download";
            }

        }


        if (modalModDownload) {

            modalModDownload.href =
                selected.download;

            if (selected.version) {

                modalModDownload.textContent =
                    `Download ${modName} ${selected.version}`;

            } else {

                modalModDownload.textContent =
                    `Download ${modName}`;

            }

        }

    }


    function startDirectDownload(downloadUrl) {

        if (!downloadUrl) {
            return;
        }

        const link =
            document.createElement("a");

        link.href =
            downloadUrl;

        link.download = "";

        document.body.appendChild(link);

        link.click();

        link.remove();
    }


    function openDownloadModal() {

        const selected =
            getSelectedVersion();

        if (!selected) {
            return;
        }


        updateDownloadVersion();

        if (!downloadModal) {

            startDirectDownload(
                selected.download
            );

            return;
        }


        downloadModal.classList.add(
            "open"
        );

        downloadModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );


        if (modalCloseButton) {
            modalCloseButton.focus();
        }

    }


    function closeDownloadModal() {

        if (!downloadModal) {
            return;
        }


        downloadModal.classList.remove(
            "open"
        );

        downloadModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "modal-open"
        );

    }


    if (versionSelect) {

        versionSelect.addEventListener(
            "change",
            updateDownloadVersion
        );

    }


    if (downloadButton) {

        downloadButton.addEventListener(
            "click",
            openDownloadModal
        );

    }


    if (modalCloseButton) {

        modalCloseButton.addEventListener(
            "click",
            closeDownloadModal
        );

    }


    if (downloadModal) {

        downloadModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    downloadModal
                ) {

                    closeDownloadModal();

                }

            }
        );

    }


    updateDownloadVersion();

    const galleryImages =
        document.querySelectorAll(
            ".simple-gallery img"
        );


    const galleryModal =
        document.getElementById(
            "simpleGalleryModal"
        );


    const galleryLargeImage =
        document.getElementById(
            "simpleGalleryLargeImage"
        );


    const galleryCloseButton =
        document.getElementById(
            "simpleGalleryClose"
        );


    function openGallery(image) {

        if (
            !galleryModal ||
            !galleryLargeImage ||
            !image
        ) {
            return;
        }


        galleryLargeImage.src =
            image.src;

        galleryLargeImage.alt =
            image.alt || "";


        galleryModal.classList.add(
            "open"
        );

        galleryModal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "gallery-open"
        );

    }


    function closeGallery() {

        if (!galleryModal) {
            return;
        }


        galleryModal.classList.remove(
            "open"
        );

        galleryModal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "gallery-open"
        );

    }


    galleryImages.forEach(
        function (image) {

            image.addEventListener(
                "click",
                function () {

                    openGallery(image);

                }
            );

        }
    );


    if (galleryCloseButton) {

        galleryCloseButton.addEventListener(
            "click",
            closeGallery
        );

    }


    if (galleryModal) {

        galleryModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    galleryModal
                ) {

                    closeGallery();

                }

            }
        );

    }

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key !== "Escape") {
                return;
            }


            if (
                downloadModal &&
                downloadModal.classList.contains(
                    "open"
                )
            ) {

                closeDownloadModal();

            }


            if (
                galleryModal &&
                galleryModal.classList.contains(
                    "open"
                )
            ) {

                closeGallery();

            }

        }
    );

    const navigationLinks =
        document.querySelectorAll(
            ".site-header nav a"
        );


    navigationLinks.forEach(
        function (link) {

            try {

                const linkUrl =
                    new URL(
                        link.href,
                        window.location.origin
                    );


                const currentPath =
                    window.location.pathname
                        .replace(/\/+$/, "");


                const linkPath =
                    linkUrl.pathname
                        .replace(/\/+$/, "");


                if (
                    linkUrl.origin ===
                    window.location.origin &&
                    currentPath === linkPath
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            } catch (error) {

            }

        }
    );

});