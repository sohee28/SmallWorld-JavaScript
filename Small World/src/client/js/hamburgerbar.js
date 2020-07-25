const open = document.querySelector('.im');
const close = document.querySelector('.closebtn');
const navigation = document.querySelector('.overlay');

open.addEventListener('click', function(){
    navigation.style.height = '100%';
});

close.addEventListener('click', function(){
    navigation.style.height = '0%';
});