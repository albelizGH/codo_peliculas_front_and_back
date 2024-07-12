const MENU_DESPLEGABLE = document.getElementById("menu-desplegable");

MENU_DESPLEGABLE.addEventListener("click", () => {
	const menu = document.querySelector(".menu-desplegable");
	if (menu.style.display == "none") {
		menu.style.display = "flex";
	} else {
		menu.style.display = "none";
	}
});

const itemsMenuDesplegable = document.querySelectorAll(".nav-items-m");
itemsMenuDesplegable.forEach((elemento) =>
	elemento.addEventListener("click", () => {
		const menu = document.querySelector(".menu-desplegable");
		menu.style.display = "none";
	})
);
