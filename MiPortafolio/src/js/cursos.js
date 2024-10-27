function showModal() {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const imgSrc = document.querySelector(".imagendiplomados").src;
    modalImg.src = imgSrc;
    modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none";
}