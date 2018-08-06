window.onload = function () {
  /* select ul */
  const list = document.querySelector('#userList ul');

  /* userSearch by name */
  const searchBar = document
    .forms['searchUser']
    .querySelector('input');
  searchBar.addEventListener('keyup', (e) => {
    const term = e
      .target
      .value
      .toLowerCase();
    const users = list.getElementsByTagName('li');
    Array
      .from(users)
      .forEach((user) => {
        const name = user.firstElementChild.textContent;
        if (name.toLowerCase().indexOf(e.target.value) != -1) {
          user.style.display = 'block';
        } else {
          user.style.display = 'none';
        }
      });
  });

  // Delete user from list
  list.addEventListener('click', (e) => {
    if (e.target.className == 'delete') {
      const li = e.target.parentElement;
      li
        .parentNode
        .removeChild(li);
    }
  });
}
