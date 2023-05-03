const pokemoList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const btnFilter = document.querySelector('.icon-filter')

const maxrecord = 151
const limit = 10
let offset = 0


btnFilter.addEventListener('click', () => {
  const containerFilter =document.querySelector('.container-filters')

  containerFilter.classList.toggle('active')
})

function loadPokemonItens(offset, limit){
  pokeApi.getPokemons(offset, limit).then((pokmemons = []) => {
   const newHtml = pokmemons.map((pokemon) =>`
      <li class="pokemon ${pokemon.type}">
          <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>   

              <div class="detail">
              <ol class="types">
                    ${pokemon.types.map((type) => 
                      `<li class="type ${type}">${type}</li>`).join('')}            
                </ol>
        
                  <img src="${pokemon.photo}" 
                    alt="${pokemon.name}">
              </div>     
        </li>
      `).join('') 
    pokemoList.innerHTML += newHtml 
  })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () =>{
  offset += limit
  
  const qtdRecordWithNextpage = offset + limit

  if(qtdRecordWithNextpage >= maxrecord){
    const newlimit = maxrecord - offset
    loadPokemonItens(offset, limit)

    loadMoreButton.parentElement.removeChild(loadMoreButton)
  }else{
    loadPokemonItens(offset, limit)
  }

})

