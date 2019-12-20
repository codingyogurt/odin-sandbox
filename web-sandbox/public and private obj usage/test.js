// object constructor
const bookFactory = (title, author) => {
  return { title: "Encrypted Title", author };
};

const book1 = bookFactory("Normal Title", "Book1 Author");

console.log(book1.title);

const bookFunctions = (function() {
  // private method
  function decryptTitle(book) {
    return "decrypted title: Normal Title";
  }

  // public method
  return {
    printBookTitle: function(book) {
      console.log(decryptTitle(book) + ", For Public Data");
    }
  };
})();

bookFunctions.printBookTitle(book1);
bookFunctions.decryptTitle(book1);
