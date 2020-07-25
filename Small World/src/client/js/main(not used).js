//fetch the datas from data.js to use it.
//pass it to initialize function to start.
// once the products have been successfully loaded and formatted as a JSON object

fetch("data.js")
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

function initialize(data) {
  const category = document.querySelector("#category");
  const searchItems = document.querySelector("#searchItem");
  const button = document.querySelector("button");
  const main = document.querySelector("main");

  //record of the last category selected and search items entered
  let lastCategory = category.value;
  let lastSearch = "";

  //results of the filtering items by category.
  //finalGroup is the items that needs to be display after filter.
  let categoryGroup;
  let finalGroup; //after filter and look at search items.

  finalGroup = data; //to display everything at first.
  updateDisplay();

  //empty the array
  categoryGroup = [];
  finalGroup = [];

  button.addEventListener("click", selectCategory);

  function selectCategory(e) {
    e.preventDefault();

    //empty the array
    categoryGroup = [];
    finalGroup = [];
    // if the category and search term are the same as they were the last time a
    // search was run, the results will be the same, so there is no point running
    // it again — just return out of the function
    if (
      category.value === lastCategory &&
      searchItems.value.trim() === lastSearch
    ) {
      return;
    } else {
      lastCategory = category.value;
      lastSearch = searchItems.value.trim();
      // In this case we want to select all products, then filter them by the search
      // term, so we just set categoryGroup to the entire JSON object, then run selectProducts()
      if (lastCategory === "All") {
        categoryGroup = data;
        selectProduct();
        // If a specific category is chosen, we need to filter out the products not in that
        // category, then put the remaining products inside categoryGroup, before running
        // selectProducts()
      } else {
        let lowerCaseType = category.value.toLowerCase();
        for (let i = 0; i < data.length; i++) {
          if (data[i].type === lowerCaseType) {
            // If a product's type property is the same as the chosen category, we want to
            // display it, so we push it onto the categoryGroup array
            categoryGroup.push(data[i]);
          }
        }
        selectProduct();
      }
    }
  }

  // selectProducts() Takes the group of products selected by selectCategory(), and further
  // filters them by the tiered search term (if one has been entered)
  function selectProduct() {
    if (searchItems.value.trim() === "") {
      finalGroup = categoryGroup;
      updateDisplay();
    } else {
      let lowerCaseSearchTerm = searchItems.value.trim().toLowerCase();
      // For each product in categoryGroup, see if the search term is contained inside the product name
      // (if the indexOf() result doesn't return -1, it means it is) — if it is, then push the product
      // onto the finalGroup array
      for (let i = 0; i < categoryGroup.length; i++) {
        if (categoryGroup[i].name.indexOf(lowerCaseSearchTerm) !== -1) {
          finalGroup.push(categoryGroup[i]);
        }
      }
      updateDisplay();
    }
  }

  // start the process of updating the display with the new set of products
  function updateDisplay() {
    // remove the previous contents of the <main> element
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

  // fetchBlob uses fetch to retrieve the image for that product, and then sends the
  // resulting image display URL and product object on to showProduct() to finally
  // display it
  function fetchBlob(datas) {
    // construct the URL path to the image file from the product.image property
    let url = "img/" + datas.image;
    // Use fetch to fetch the image, and convert the resulting response to a blob
    fetch(url)
      .then(function (res) {
        return res.blob();
      })
      .then(function (blob) {
        // Convert the blob to an object URL — this is basically an temporary internal URL
        // that points to an object stored inside the browser
        let objectURL = URL.createObjectURL(blob);
        displayData(objectURL, datas);
      });
  }

  // Display a product inside the <main> element
  function displayData(objectURL, datas) {
    const section = document.createElement("section");
    const image = document.createElement("img");
    const heading = document.createElement("h2");
    const para = document.createElement("p");

    section.setAttribute("class", datas.type);

    heading.textContent = datas.name.replace(
      datas.name.charAt(0),
      datas.name.charAt(0).toUpperCase()
    );

    para.textContent = "$" + datas.price;

    image.src = objectURL;
    image.alt = datas.name;

    main.appendChild(section);
    section.appendChild(image);
    section.appendChild(heading);
    section.appendChild(para);
  }
}
