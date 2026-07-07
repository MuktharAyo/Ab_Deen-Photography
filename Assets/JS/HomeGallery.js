const createHomeGallery = (galleryItem)=>{
return `
        <div class="catalogue-item" data-aos="fade-up">
            <div class="catalogue-card">
              <div class="img-holder">
                <img src="${galleryItem.img}" alt="mr & mrs sheriff"
                  loading="lazy" />
              </div>

              <div class="card-content">
                <h2 class="card-title">mr & mrs sheriff</h2>
                <p class="card-tag">wedding, event</p>
              </div>
            </div>

            <div class="catalogue-card">
              <div class="img-holder">
                <img src="Assets/Images/Home-Gallery/Events/IMG_7857.jpg" alt="family" loading="lazy" />
              </div>

              <div class="card-content">
                <h2 class="card-title">mr & mrs abdulrazaq</h2>
                <p class="card-tag">event, wedding</p>
              </div>
            </div>
        </div>
`
}