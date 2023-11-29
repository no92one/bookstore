export default function () {
  return `
  <h1>Add new book!</h1>
  <form onsubmit="addBook(); return false">
    <input type="text" name="bookName" placeholder="Book name">
    <input type="submit" value="Add Book">
  </form>
  `
}

function addBook() {
  const bookName = $("[name=bookName]").val()
  console.log(bookName)

  if (bookName.trim().length > 0) {
    const response = fetch("api/books", {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: bookName })
    })
  } else {
    alert("Du måste skriva något!")
  }
}

window.addBook = addBook