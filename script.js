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
const supportButton = document.getElementById("supportButton");
const supportPanel = document.getElementById("supportPanel");
const supportClose = document.getElementById("supportClose");
const supportForm = document.getElementById("supportForm");
const supportMessage = document.getElementById("supportMessage");
const supportCharacterCount = document.getElementById(
    "supportCharacterCount"
);
const supportFormStatus = document.getElementById(
    "supportFormStatus"
);

function openSupportPanel() {
    supportPanel.classList.add("open");
    supportButton.setAttribute("aria-expanded", "true");
}

function closeSupportPanel() {
    supportPanel.classList.remove("open");
    supportButton.setAttribute("aria-expanded", "false");
}

supportButton?.addEventListener("click", () => {
    const isOpen = supportPanel.classList.contains("open");

    if (isOpen) {
        closeSupportPanel();
    } else {
        openSupportPanel();
    }
});

supportClose?.addEventListener("click", closeSupportPanel);

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeSupportPanel();
    }
});

document.addEventListener("click", (event) => {
    const clickedInsidePanel = supportPanel?.contains(event.target);
    const clickedSupportButton = supportButton?.contains(event.target);

    if (!clickedInsidePanel && !clickedSupportButton) {
        closeSupportPanel();
    }
});

supportMessage?.addEventListener("input", () => {
    supportCharacterCount.textContent = supportMessage.value.length;
});

supportForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = supportForm.querySelector(
        ".support-submit"
    );

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    supportFormStatus.className = "support-form-status";
    supportFormStatus.textContent = "";

    try {
        const response = await fetch(supportForm.action, {
            method: "POST",
            body: new FormData(supportForm),
            headers: {
                Accept: "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("The message could not be sent.");
        }

        supportForm.reset();
        supportCharacterCount.textContent = "0";

        supportFormStatus.textContent =
            "Thank you! Your message has been sent.";

        supportFormStatus.className =
            "support-form-status visible success";

        submitButton.textContent = "Message Sent";

        window.setTimeout(() => {
            closeSupportPanel();

            submitButton.disabled = false;
            submitButton.textContent = "Send Message";

            supportFormStatus.className =
                "support-form-status";
        }, 2500);
    } catch (error) {
        supportFormStatus.textContent =
            "Something went wrong. Please try again.";

        supportFormStatus.className =
            "support-form-status visible error";

        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
    }
});