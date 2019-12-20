// object constructor
const bookFactory = (title, author) => {
  return { title: "Encrypted Title", author };
};

const book1 = bookFactory("Normal Title", "Book1 Author");

console.log(book1.title);

const bookFunctionsFactory = bookItem => {
  //private methods
  const decryptTitle = () => {
    return "Decrypted Title: Normal Title";
  };
  const printBookTitle = () => {
    console.log(decryptTitle());
  };
  // became public when returned
  return {
    printBookTitle
  };
};

const book1Functions = bookFunctionsFactory(book1);
book1Functions.printBookTitle();
