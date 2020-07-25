fetch("../js/data.js")
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    let data = json;
    initialize(data);
  })
  .catch(function (err) {
    //catch error if any occurs
    console.log("Fetch Problem:" + err.message);
  });

//starting function
function initialize(data) {
  const category = document.getElementsByTagName("li");
  const searchItems = document.querySelector("#searchItem");
  const button = document.querySelector("button");
  const main = document.querySelector("main");

  let savedData = localStorage.getItem("objectName");
  let savedDatanum = localStorage.getItem("num");
  savedDatanum = savedDatanum - 8;
  localStorage.clear();

  let lastCategory = category[savedDatanum];
  let lastCategoryContent = savedData;
  lastCategory.classList.toggle("activate");

  let lastSearch = "";

  let categoryGroup;
  let finalGroup;

  categoryGroup = [];
  finalGroup = [];

  if (lastCategoryContent === "All") {
    finalGroup = data;
  } else {
    let lowerCaseType = lastCategoryContent.toLowerCase();
    for (let i = 0; i < data.length; i++) {
      if (data[i].type === lowerCaseType) {
        finalGroup.push(data[i]);
      }
    }
  }
    updateDisplay();

    for (let i = 0; i < category.length; i++) {
      category[i].addEventListener("click", function () {
        
        selectCategory(category[i]);
      });
    }

    button.addEventListener("click", clickedButton);

    function clickedButton(e){
      e.preventDefault();

      categoryGroup = [];
      finalGroup = [];

      if (lastCategoryContent === "All") {
        categoryGroup = data;
      } else {
        lowerCaseType = lastCategoryContent.toLowerCase();
        for (let i = 0; i < data.length; i++) {
          if (data[i].type === lowerCaseType) {
            categoryGroup.push(data[i]);
          }
        }
      }

      if (searchItems.value.trim() === "") {
        finalGroup = categoryGroup;
        searchItems.value = "";
      } else {
        let lowerCaseSearchTerm = searchItems.value.trim().toLowerCase();
        for (let i = 0; i < categoryGroup.length; i++) {
          if (categoryGroup[i].name.indexOf(lowerCaseSearchTerm) !== -1) {
            finalGroup.push(categoryGroup[i]);
          }
        }
        searchItems.value = "";
      }
      updateDisplay();
      
    }
    

  function selectCategory(selectedcategory) {
    categoryGroup = [];
    finalGroup = [];

    if (selectedcategory.textContent === lastCategoryContent) {
      return;
    } else {
      
      selectedcategory.classList.toggle("activate");
      lastCategory.classList.toggle("activate");
      lastCategory = selectedcategory;
      lastCategoryContent = selectedcategory.textContent;
      lastSearch = searchItems.value.trim();

      if (lastCategoryContent === "All") {
        finalGroup = data;
        updateDisplay();
      } else {
        let lowerCaseType = lastCategoryContent.toLowerCase();
        for (let i = 0; i < data.length; i++) {
          if (data[i].type === lowerCaseType) {
            finalGroup.push(data[i]);
          }
        }
        updateDisplay();
      }
    }
  }

  function updateDisplay() {
    //remove the previous contents of the <main> element
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }

    if (finalGroup.length === 0) {
      const para = document.createElement("p");
      para.textContent = "No results to display!";
      main.appendChild(para);
    } else {
      for (let i = 0; i < finalGroup.length; i++) {
        fetchBlob(finalGroup[i]);
      }
    }
  }

  function fetchBlob(datas) {
    let url = "../img/" + datas.image;

    fetch(url)
      .then(function (res) {
        return res.blob();
      })
      .then(function (blob) {
        let objectURL = URL.createObjectURL(blob);
        displayData(objectURL, datas, main);
      });
  }

  function displayData(objectURL, datas, main) {
    const section = document.createElement("section");
    const image = document.createElement("img");
    const heading = document.createElement("h2");
    const para = document.createElement("p");

    section.setAttribute("class", datas.type);

    heading.textContent = datas.name;

    para.setAttribute("class", "nameofitem");
    para.textContent = "$" + datas.price;

    image.src = objectURL;
    image.alt = datas.name;


    main.appendChild(section);
    section.appendChild(image);
    section.appendChild(heading);
    section.appendChild(para);
  }
}
