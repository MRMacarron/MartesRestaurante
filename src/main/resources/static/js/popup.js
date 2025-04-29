/*popup*/
document.getElementById("pedidos").addEventListener("submit", function (event) {
	event.preventDefault();
	verPopup();
});

function verPopup() {
	let overlay = document.getElementById("overlay");
	let popup = document.getElementById("popup");
	overlay.style.display = "block";
	popup.style.display = "block";

	setTimeout(function () {
		window.location.href = "index.html";
	}, 2000);
}