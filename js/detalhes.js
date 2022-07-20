function carregarItem() {
    /*
 //https://api.themoviedb.org/3/movie/338953?api_key=6e182b534c71d1d19a36bbc7b99e113d&language=en-US
 address = window.location.search
  
    // Returns a URLSearchParams object instance
    parameterList = new URLSearchParams(address)
  
    // Returning the respected value associated
    // with the provided key
    return parameterList.get(key)
    */
   let params = new URLSearchParams(window.location.search);
   let id = params.get("id"); 
   endereco = "https://api.themoviedb.org/3/movie/" + id + "?api_key=6e182b534c71d1d19a36bbc7b99e113d&language=en-US";
   fetch(endereco).then(response => response.json())
   .then(data => {
       let generos = ""
       let strDetalhe = `
       <div class="row">
       <h1>${data.title} <span class="badge rounded-pill bg-dark"> ★ ${data.vote_average}</span></h1>
       <div class="col-lg-4 col-md-6 col-sm-12 col-12">
           <img src="${"https://image.tmdb.org/t/p/original" + data.poster_path}" id="banner_detalhes" alt="">
       </div>
       <div class="col-lg-8 col-md-6 col-sm-12 col-12">
           <p class="tags">`
        for (let i = 0; i < data.genres.length; i++) {
            strDetalhe += `<span class="badge rounded-pill bg-dark">${data.genres[i].name}</span>`;
        }

        strDetalhe += `
            </p>
           <p>${data.overview}</p>
           <p>Production:`
        
        for (let i = 0; i < data.production_companies.length; i++ ) {
            strDetalhe += `<img class="logo_producao" src="${"https://image.tmdb.org/t/p/original" + data.production_companies[i].logo_path}" alt="">`
        }
        strDetalhe += `
           </p>
           <p>Release date: ${data.release_date}</p>
           <p>Budget: ${'$' + ( data.budget >= 1000000 ? (data.budget/1000000) + ' Mi' : (data.budget/1000) + ' K' )}</p>
           <p>Revenue: ${'$' + ( data.revenue >= 1000000 ? (data.revenue/1000000) + ' Mi' : (data.revenue/1000) + ' K' )}</p>
           <p>Runtime: ${data.runtime + ' min'}</p>
       </div>
   </div>`;
       document.getElementById("detalhe").innerHTML = strDetalhe;
   });

}