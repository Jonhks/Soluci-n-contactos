var contacts = [];
var $nameInput = $("#name-input");
var $phoneInput = $("#phone-input");

function loadPage() {
  $(".modal").modal();
  $("#form").submit(addContact);
  $nameInput.keyup(validateContact);
  $phoneInput.keyup(validateContact);
  $("#searcher").keyup(filterContacts);
}

function validateContact () {
  var $containerAddContact = $("#add-contact");

  if($(this).val().trim().length > 0) {
    $containerAddContact.removeAttr("disabled");
  } else {
    $containerAddContact.attr("disabled" , true); 
  }
}

function addContact(e) {
  e.preventDefault();

  // Con estas lineas toman el valor del usuario agrega los inputs y los guarda en variables
  var name = $nameInput.val();
  var phone = $phoneInput.val();
  // Con las variables separadas que obtuvimos creamos una estructura de datos unica, un objeto por cada contacto
  var contact = {
    "name": name,
    "phone": phone
  };

  // Agregamos el contacto a nuestra data para poder filtrar y eliminar posteriormente
  contacts.push(contact);
  // Esta funcion pinta en el html
  paintContactsInHtml(contact);
  
// console.log(contacts, contact);
  // limpiando valores del form

  $nameInput.val(" ");
  $phoneInput.val(" ");
  $("#modal1").modal("close");
}

function paintContactsInHtml (contact) {
  // crear elementos con DOM
  var $newContact = $("<article />", {
    "class": "card-panel hoverable"
  });
  var $containerContactName = $("<h4 />");
  var $deleteContactButton = $("<button type='button' />");
  var  $removeIcono = $("<i />", { 
    "class": "material-icons"
  });
  var $containerContactPhone = $("<p />");

  // Agregamos atributos y eventos a los elementos creados en el dom
  $deleteContactButton.addClass("btn right");
  $removeIcono.text("delete");
  $deleteContactButton.click(removeContact);

  // Asignando valores

  $deleteContactButton.append($removeIcono);
  $containerContactName.text(contact.name);
  $containerContactPhone.text(contact.phone);

  $newContact.append($containerContactName);
  $newContact.append($deleteContactButton);
  $newContact.append($containerContactPhone);
  // console.log($newContact);
  // agregamos lo que creamos con el Dom a un elemento existente del html


  $("#publish-contacts").prepend($newContact);
  
}

function filterContacts (){
  var searchContact = $("#searcher").val().toLowerCase();
    if($("#searcher").val().trim().length > 0) {
        var filteredContacts = contacts.filter(function(contact) {
           // console.log(contact);
            return contact.name.toLowerCase().indexOf(searchContact) >= 0;
        });
      $("#publish-contacts").empty();
      filteredContacts.forEach(function(contact){
        paintContactsInHtml(contact);
      });
    } else {
      $("#publish-contacts").empty();
      contacts.forEach(function(contact){
        paintContactsInHtml(contact);
      });      
    }

  
  // console.log(filteredContacts);

  
}

function removeContact () {
  $(this).parent().remove();
  console.log($(this).parent())
}




$(document).ready(loadPage);