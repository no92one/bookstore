import booklist from "./booklist.js"

export default async function (bookId) {
  const book = await getBook(bookId)

  if (book.message === "No book") {
    return `
      <h1>${book.message}</h1>
    `
  } else {
    return `
      <h1>Edit Page for: ${book.id} - ${book.name}</h1>
      <form onsubmit="updateBook(${book.id}); return false">
        <input type="text" name="bookName" placeholder="Book name" value="${book.name}">
        <input type="submit" value="Update book">
      </form>
      <button onclick="goBackToBooklist()">Go back</button>
      <button onclick="deleteBook(${book.id})">Delete</button>
    `
  }
}

async function getBook(bookId) {
  const response = await fetch(`api/books/${bookId}`)
  const result = await response.json()
  console.log("get book - ", result);
  return result
}

async function deleteBook(bookId) {
  const response = await fetch(`api/books/${bookId}`, { method: "delete" })
  const result = await response.json()
  console.log("delete book - ", result);

  if (result.message === "Book deleted successfully") {
    alert(result.message)
    $("main").html(await booklist())
  } else {
    alert(result.message)
  }
}

async function goBackToBooklist() {
  $("main").html(await booklist())
}

async function updateBook(bookId) {
  const bookName = $("[name=bookName]").val().trim()

  if (bookName.length > 0) {
    const response = await fetch(`api/books/${bookId}`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: bookName })
    })
    const result = await response.json()

    if (result.bookUpdated) {
      alert(`${bookName} was updated`)
      $("h1").html(`Edit Page for: ${bookId} - ${bookName}`)
      $("[name=bookName]").html(`${bookName}`)
    }
  } else {
    alert("Du måste skriva något!")
  }
}

window.deleteBook = deleteBook
window.goBackToBooklist = goBackToBooklist
window.updateBook = updateBook