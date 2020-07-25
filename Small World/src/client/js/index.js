const category = document.getElementsByClassName('a');

for(let i = 0; i < category.length; i++){
    category[i].addEventListener('click', function(){
      localStorage.setItem('objectName', category[i].textContent);
      localStorage.setItem('num', i);
      
    });
    }