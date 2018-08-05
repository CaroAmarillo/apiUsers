window.onload = function () {
  const list = document.querySelector('#userList ul');

  console.log('list ->', list);

  // delete
  /* list.addEventListener('click', (e) => {
    if (e.target.className == 'delete') {
      const li = e.target.parentElement;
      li
        .parentNode
        .removeChild(li);
    }
  });*/

  // userSearch by name
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
      .forEach((book) => {
        const title = book.firstElementChild.textContent;
        if (title.toLowerCase().indexOf(e.target.value) != -1) {
          book.style.display = 'block';
        } else {
          book.style.display = 'none';
        }
      });
  });
}
