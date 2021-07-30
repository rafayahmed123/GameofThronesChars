import './style.css';
import React from 'react';
import Character from './Character.js';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';


var page = 1;                               //page number, to be used to fetch specific pages

class App extends React.Component {         

  constructor() {
      super()
      this.state = {                        //state contains one array, which is our list of characters to be rendered
          characters: [],                   

      }
      this.goToFirst = this.goToFirst.bind(this)        //binding methods which will update state
      this.goToLast = this.goToLast.bind(this)
      this.goToNext = this.goToNext.bind(this)
      this.goToPrev = this.goToPrev.bind(this)
      this.apiFetch = this.apiFetch.bind(this)
  }


  apiFetch(page){                                                                       //method to fetch API calls and update state with the new info
    fetch(`https://anapioficeandfire.com/api/characters?page=${page}&pageSize=10`)
    .then(response => response.json())
    .then(data => this.setState({characters: data}))
  }

  componentDidMount(){                          //fetching first page upon startup
    this.apiFetch(page)
  }
  
  goToFirst(){                                  // fetching first page when btn pressed
    page = 1
    this.apiFetch(page)
  }

  goToLast(){                                   // fetching last page when btn pressed
    page = 214
    this.apiFetch(page)
  }

  goToNext(){                                   // fetching next page when button pressed
    if (page < 214){                          //making sure we aren't on final page 
        page = page+1;
        this.apiFetch(page)
    }
    else{
        alert("LAST PAGE")
    }
  }

  goToPrev(){                       //fetching prev page when btn pressed
    if (page > 1){                //making sure we aren't on first page
        page = page-1;
        this.apiFetch(page)
    }
    else{
        alert("FIRST PAGE")
    }
  }
  
  render(){                                                                                            //rendering information for UI
      const characterRender = this.state.characters.map((info, index) =>                               //mapping character array in state object to Character components with given attributes
        <Character name={info.name} culture={info.culture} born={info.born} died={info.died} aliases={info.aliases} books={info.books} key={index}/>
        )        

      return(

          <div className="background">   
          <Helmet>
          <title>Characters Page</title>
        </Helmet>
              <h1>A Song of Ice and Fire Characters</h1>
              <p className="author">George R. R. Martin</p>
              <div className="chardiv">{characterRender} </div>
              <div className="btndiv">
                <button onClick={this.goToFirst} disabled={page == 1}>FIRST</button>
                <button onClick={this.goToPrev} disabled={page == 1}>PREV</button> 
                <button onClick={this.goToNext} disabled={page == 214}>NEXT</button> 
                <button onClick={this.goToLast} disabled={page == 214}>LAST</button>      
              </div>

          </div>
      )
  } 
}

export default App;
