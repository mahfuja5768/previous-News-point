const loadCategoriesName = async() =>{
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    try{
    const res = await fetch(url);
    const data = await res.json();
    displayCategoriesName(data.data.news_category);
    // console.log(data.data.news_category)
    }
    catch(e){
        console.log(e)
    }
}

const displayCategoriesName = (categoriesName) =>{
  // console.log(categoriesName);
    const newsCategoriesName = document.getElementById('news-categories-name');
    newsCategoriesName.textContent = "";

    const categoryName = document.getElementById('category-name');
    categoryName.innerText = `${categoriesName.category_name}`;

     categoriesName.forEach(categoryName =>{
      const categoryNameLi = document.createElement('li');
      categoryNameLi.classList.add('categoryLi');
      const innerText = categoryNameLi;
      innerText.innerHTML = `
        <h5 onclick="loadCategoriesNews('${categoryName.category_id}')">${categoryName.category_name}</h5>
      `;
      newsCategoriesName.appendChild(categoryNameLi)
    })
}
loadCategoriesName()

const loadSpinner = isLodding =>{
    const loderSection = document.getElementById('spinner');
    if(isLodding){
        loderSection.classList.remove('d-none')
    }
    else{
        loderSection.classList.add('d-none')
    }
  }

const loadCategoriesNews = async(category_id) =>{
    // console.log(category_id);
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    loadSpinner(true);
    try{
    const res = await fetch(url);
    const data = await res.json();
    displayCategoriesNews(data.data);
    // console.log(data.data)
    }
    catch(e){
        console.log(e)
    }
    loadSpinner(false);
}

loadCategoriesNews('05')

const displayCategoriesNews = (categoriesNews) =>{
    console.log(categoriesNews);
    
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = "";
    const massageCounter = document.getElementById('news-counter');
    massageCounter.textContent = '';
    massageCounter.innerText = categoriesNews.length;

    categoriesNews.forEach(categoryNews =>{
    loadSpinner(true);
    const newsDiv = document.createElement('div');
    newsDiv.classList.add('card')
    newsDiv.innerHTML =`
    <div class="row g-0">
    <div class="col-md-2 p-2">
    <img src="${categoryNews.thumbnail_url}" class="img-fluid rounded-start" alt="...">
  </div>
  <div class="col-md-10 g-3">
    <div class="card-body">
      <h4 class="card-title text-secondary"><b>${categoryNews.title}</b></h4>
      <p class="card-text mb-4">${categoryNews.details}</p>
      <div class="d-flex justify-content-between text-secondary">
      <div class="d-flex">
         <div><img src="${categoryNews.author.img ? categoryNews.author.img : 'no image available'}" alt="" style="width:50px; height:50px; border-radius : 50%"></div>
          <div class="ps-2">
           <p><b>${categoryNews.author.name ? categoryNews.author.name : 'No author name available'}</b> <br>
            <small>${categoryNews.author.published_date}</small> </p>
          </div>
          </div>
          <div><b>Viewes : ${categoryNews.total_view ? categoryNews.total_view : 'Not available'}</b></div>
          <div><b>Rating : ${categoryNews.rating.number ? categoryNews.rating.number : 'Not available'}</b></div>
          <div><button onclick="loadNewsDetails('${categoryNews._id}')" href="#" id="detail-btn" type="button" class="btn btn-primary fw-bold" data-bs-toggle="modal" data-bs-target="#newsDetailModal">Show more</button></div>
         </div>
         </div>
    </div>
  </div>
  </div>
    `;
    newsContainer.appendChild(newsDiv);
    })
}
const loadNewsDetails = async news_id =>{
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data[0])
  };
  const displayNewsDetails = (details) =>{
    // console.log(details);
    const modalTitle = document.getElementById('newsDetailModalLabel');
      modalTitle.innerText = details.title;
      const newsDetail = document.getElementById('news-detail');
      newsDetail.innerHTML = `
      <p>${details.details}</p>
      <div class="d-flex justify-content-between text-secondary">
                  <div class="d-flex">
                   <div><img src="${details.author.img ? details.author.img : 'no image available'}" alt="" style="width:50px; height:50px; border-radius : 50%"></div>
                    <div class="ps-2">
                     <p><b>${details.author.name ? details.author.name : 'No author name available'}</b> <br>
                      <small>${details.author.published_date}</small> </p>
                    </div>
                    </div>
                    <div><b>Viewes : ${details.total_view ? details.total_view : 'Not available'}</b></div>
 `;
  
  }


