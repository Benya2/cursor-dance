const socket = io(); // подключаемся к серверу
const cursors = {};

document.addEventListener("mousemove", (e) => {
  socket.emit("move", { x: e.clientX, y: e.clientY });
});

document.addEventListener("mousedown", () => {
  // при нажатии мыши добавляем класс "rotate" всем курсорам
  Object.values(cursors).forEach(cursor => cursor.classList.add("rotate"));
});

document.addEventListener("mouseup", () => {
  // при отпускании кнопки мыши убираем класс "rotate"
  Object.values(cursors).forEach(cursor => cursor.classList.remove("rotate"));
});

socket.on("users", (users) => {
  Object.entries(users).forEach(([id, pos]) => {
    if (!cursors[id]) {
      const cursor = document.createElement("div");
      cursor.classList.add("cursor");
      cursor.style.background = getRandomColor();
      document.body.appendChild(cursor);
      cursors[id] = cursor;
    }
    cursors[id].style.left = pos.x + "px";
    cursors[id].style.top = pos.y + "px";
  });

  // удаляем неактивных
  Object.keys(cursors).forEach((id) => {
    if (!users[id]) {
      cursors[id].remove();
      delete cursors[id];
    }
  });
});

function getRandomColor() {
  return `hsl(${Math.random() * 360}, 70%, 60%)`;
}
