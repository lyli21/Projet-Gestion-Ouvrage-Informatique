

let bookList = new Array();
let authorsList = new Array();
let categoriesList = new Array();

let listAuthors = document.getElementById("listAuthors");
let listCategories = document.getElementById("listCategories");
let listBooks  = document.getElementById('booksList');


listAuthors.addEventListener('change', chargeByAuthor);
listCategories.addEventListener('change', chargeByCategory)

// On créé l'écouteur d'evenements sur le load de notre page
window.addEventListener("DOMContentLoaded", jsonOnLoad);

// Fonction qui appele le chargement  du json
function jsonOnLoad() {
    fetch("./data/books.json")
        .then((response) => {
            return response.json(); //On covertit la reponse en json
        })
        .then((data) => {
            console.log(data);
            createBooks(data);
        })
}

// Fonction qui affiche les livres.... mais aussi qui crééera les listes détoulantes
function createBooks(_books) {

    // On boucle sur l'ensemble des livres : je m'en servirai pour afficher mes livres plus tard
    for (let book of _books) {
        bookList.push(book);

        for (let x = 0; x < book.authors.length; x++) {
            let author = book.authors[x];

            // Je vais vérifier que l'auteur n'est pas dans ma liste des auteurs
            if (authorsList.indexOf(author) == -1) {
                authorsList.push(author);
            }
        }

        // Je ferais la même chose pour la liste des catégories
        for (let categorie of _books) {


            for (let j = 0; j < categorie.categories.length; j++) {
                let cat = categorie.categories[j];

                if (categoriesList.indexOf(cat) == -1) {
                    categoriesList.push(cat);
                }
            }
        }
    }
    bookList.sort();
    authorsList.sort();
    categoriesList.sort();

    for (let i = 0; i < authorsList.length; i++) {
        let option = document.createElement("option");
        option.value = authorsList[i];
        option.innerText = authorsList[i];
        listAuthors.appendChild(option);
    }

    for (let k = 0; k < categoriesList.length; k++) {
        let option = document.createElement('option');
        option.value = categoriesList[k];
        option.innerText = categoriesList[k];
        listCategories.appendChild(option);

    }
    showBooks(bookList);
}

function showBooks(_books) {

    listBooks.innerHTML = "";

    for (let y = 0; y < _books.length; y++) {
        let book = document.createElement("article");
        book.setAttribute("class", "card");

        if (_books[y].thumbnailUrl == undefined || _books[y].thumbnailUrl == null) {
            _books[y].thumbnailUrl = "https://p1.storage.canalblog.com/14/48/1145642/91330992_o.png "
        }

        let titre;
        if (_books[y].title.length > 20) {
            titre = _books[y].title.substring(0, 20) + " (...)";
        }
        else {
            titre = _books[y].title;
        }

        let isbn;
        if (_books[y].isbn.length){
            isbn =  _books[y].isbn;
        } else {
            isbn = _books[y].isbn
        }
        
        let pageCount;
        if (_books[y].pageCount){
            pageCount = _books[y].pageCount;
        } else {
            pageCount = _books[y].pageCount
        }

        let status;
        if(_books[y].status){
            status = _books[y].status;
        } else {
            status = _books[y].status
        }

        let authors;
        if (_books[y].authors){
            authors= _books[y].authors
        }

        let categories;
        if (_books[y].categories){
            categories=_books[y].categories
        }


        let description;
        let shortDescription;

        if (_books[y].shortDescription== undefined ||
            _books[y].shortDescription == null) {
               shortDescription= 'Pas de description';


            if (_books[y].description == undefined || 
                _books[y].description == null) {
                description = 'Pas de description';
            }
            else {
                shortDescription = _books[y].description.substring(0, 100);
            }

        }
        else {
            description = _books[y].shortDescription;
        }

        if (_books[y].shortDescription == undefined ||
            _books[y].shortDescription == null) {

            description = _books[y].longDescription;
        } else {
            description = "Pas de description";
        }


        description = _books[y].shortDescription;
        if (_books[y].shortDescription > 100) {
            shortDescription = _books[y].shortDescription.substring(0, 100) + " (...)";
        } else {
            shortDescription = shortDescription;
        }

        book.innerHTML = '<img src ="' + _books[y].thumbnailUrl + '" />' +
            '<h5 class="booktitle"><span class="infobulle" title="' +
            _books[y].title +'">' + 
            titre + '<br>' +'Isbn : ' + isbn + '<br>' + 'Page count : ' +
            pageCount + '<br>' + 'status : ' + 
            status + '<br>' + 'Authors : ' + authors + '<br>'  + 'Categories : ' +  categories + '</span></h1>' +
            '<p> <span class="infobulle" title="' +
            description +
            '">' + description + '<br>' + '</span></h5>';


        listBooks.appendChild(book);

    }


}

// Fonction appelée lors du chargement d'auteur dans la liste déroulante
function chargeByAuthor() { }

// Fonction appelée lors du chargement de catégorie dans la liste déroulante
function chargeByCategory() { }