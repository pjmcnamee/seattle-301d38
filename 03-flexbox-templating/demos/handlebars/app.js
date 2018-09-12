'use strict';

function Dog(dogObject) {
  this.name = dogObject.name;
  this.image_url = dogObject.image_url;
  this.hobbies = dogObject.hobbies;
}

Dog.allDogs = [];

Dog.prototype.render = function() {
  $('main').append('<section class="clone"></section>');
  const $dogClone = $('section[class="clone"]');

  const $dogHtml = $('#dog-template').html();

  $dogClone.html( $dogHtml );

  $dogClone.find('h2').text(this.name);
  $dogClone.find('img').attr('src', this.image_url);
  $dogClone.find('p').text(this.hobbies);
  $dogClone.removeClass('clone');
  $dogClone.addClass(this.name);
}

Dog.readJson = () => {
  $.get('data.json', 'json')
    .then(data => {
      data.forEach(dog => {
        Dog.allDogs.push( new Dog(dog) );
      })
    })
    .then( Dog.loadDogs )
}

Dog.loadDogs = () => {
  Dog.allDogs.forEach(dog => dog.render());
}

$(() => Dog.readJson());
