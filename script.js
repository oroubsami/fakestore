const categoriesData = [
    { id: 0, name:"ALL" },
    { id: 1, name: "Jewelry" },
    { id: 2, name: "Clothes" },
    { id: 3, name: "Bags" },
  ];

  
  const productsData = [
    { id: 1, name: " Ring Heart Silver Blue", price: "$299", image: "img/blue.jpg", categoryId: 1 },
    { id: 2, name: "Pandora charm Braclet", price: "$799", image: "img/pandora.jpg", categoryId: 1 },
    { id: 3, name: "Men's t-shirt", price: "$29", image: "img/techert.jpg", categoryId: 2 },
    { id: 4, name: "Jeans", price: "$39", image: "img/jeanes.jpg", categoryId: 2 },
    { id: 5, name: "2020 mini bag", price: "$69", image: "img/bags.jpg", categoryId: 3 },
    { id: 6, name: " Gucci 2022 mini ", price: "$55", image: "img/bag2.jpg", categoryId: 3 },
    { id: 7, name: "Gold Luxury Jewelry", price: "$49", image: "img/gold.jpg", categoryId: 1 },
    { id: 8, name: "Jaket", price: "$89", image: "img/jaket.jpg", categoryId: 2 },
    { id: 9, name: " Louis Vuttion", price: "$77", image: "img/lv.jpg", categoryId: 3 },
    { id: 10, name: " Womens Black Dress", price: "$49", image: "img/dress.jpg", categoryId: 2 },

    { id: 11, name: " Dior Black One Size", price: "$100", image: "img/dior.jpg", categoryId: 3 },
    { id: 12, name: "  Prada Shoulder bag", price: "$85", image: "img/prada.jpg", categoryId: 3 },
    { id: 13, name: "Vogue Stone ", price: "$225", image: "img/vogue.jpg", categoryId: 1 },
    { id: 14, name: "Jewelry Rose Gold ", price: "$122", image: "img/rose.jpg", categoryId:1 },
    { id: 15, name: " Baby Bear Kimono", price: "$15", image: "img/baby.jpg", categoryId: 2 },
    { id: 16, name: " Baby Girl Floral", price: "$12", image: "img/baby2.jpg", categoryId: 2 },
    { id: 17, name: " Women Long Dress", price: "$70", image: "img/dress2.jpg", categoryId: 2 },
    { id: 18, name: "Winter Men Jaket 2020 ", price: "$50", image: "img/men.jpg", categoryId: 2 },
    
    { id: 19, name: "Teddy Waffle Romber ", price: "$10", image: "img/baby3.jpg", categoryId: 2 },
    { id: 20, name: "Classic Men 2020 ", price: "$30", image: "img/men2.jpg", categoryId: 2 },
    
   
    
  ];

  // Pagination
  const productsPerPage = 5;
  let currentPage = 1;
  let filteredProducts = [...productsData];

  // اDOM
  const categoriesEl = document.getElementById('categories');
  const productsEl = document.getElementById('products');
  const paginationEl = document.getElementById('pagination');
  const contentEl = document.getElementById('content');
  const loaderEl = document.getElementById('loader');

  
  function renderCategories() {
    categoriesEl.innerHTML = '';
    categoriesData.forEach(cat => {
      const btn = document.createElement('div');
      btn.classList.add('category');
      btn.textContent = cat.name;
      btn.dataset.id = cat.id;
      btn.addEventListener('click', () => {
       
        document.querySelectorAll('.category').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        filterProducts(cat.id);
      });
      categoriesEl.appendChild(btn);
    });
    
    categoriesEl.firstChild.classList.add('active');
  }

  function filterProducts(categoryId) {
    currentPage = 1; //     
    if (parseInt(categoryId) === 0) {
      filteredProducts = [...productsData];
    } else {
      filteredProducts = productsData.filter(product => product.categoryId === parseInt(categoryId));
    }
    renderProducts();
    renderPagination();
  }

  //     Pagination
  function renderProducts() {
    productsEl.innerHTML = '';
    //     
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const productsToShow = filteredProducts.slice(start, end);

    if (productsToShow.length === 0) {
      productsEl.innerHTML = '<p style="text-align:center;">لا توجد منتجات في هذه الفئة.</p>';
      return;
    }
    productsToShow.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('product-card');
      card.innerHTML = `
        <img class="product-img" src="${product.image}" alt="${product.name}">
        <div class="product-info">
          <h3 class="product-title">${product.name}</h3>
          <p class="product-price">${product.price}</p>
        </div>
      `;
      productsEl.appendChild(card);
    });
  }

  //   pagination
  function renderPagination() {
    paginationEl.innerHTML = '';
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      if (i === currentPage) btn.classList.add('active');
      btn.addEventListener('click', () => {
        currentPage = i;
        renderProducts();
        renderPagination();
        //     
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      paginationEl.appendChild(btn);
    }
  }

  // 
  function hideLoader() {
    loaderEl.style.display = 'none';
    contentEl.style.display = 'block';
  }

  // 
  window.addEventListener('load', () => {
    // 
    setTimeout(() => {
      renderCategories();
      filterProducts(0); //
      hideLoader();
    }, 1500);
  });