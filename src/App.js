import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react'














function App() {



  const [article, setArticle] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [news, setNews] = useState([]); 
  const [toggleEdit, setToggleEdit] = useState(true);
  const [newArticleForm, setNewArticleForm] = useState(false);
  const [showArticles, setShowArticles] = useState(true); 
  const [previewArticle, setPreviewArticle] = useState(false)

  const handleArticleChange = (e) => {
    setArticle(e.target.value);
  }
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    }
  const handleDateChange = (e) => {
    setDate(e.target.value);
    }
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    }
    const handleImageChange = (e) => {
      setImage(e.target.value);
      }



  const handleNewArticleFormSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://news-project-back.herokuapp.com/news", {
        article: article,
        title: title,
        date: date,
        category: category,
        image: image
      })
      .then(() => {
        axios.get("https://news-project-back.herokuapp.com/news").then((response) => {
          setNews(response.data);
        });
      });
  };

  const handleDeleteArticle = (articleDelete) => {
		axios
			.delete(`https://news-project-back.herokuapp.com/news/${articleDelete._id}`)
			.then(() => {
				axios.get("https://news-project-back.herokuapp.com/news").then((response) => {
					setNews(response.data);
				});
			});
	};

  const handleUpdateArticle = (articleUpdate) => {
    axios
    .put(`https://news-project-back.herokuapp.com/news/${articleUpdate._id}`, {
      article: article ? article : articleUpdate.article,
      title: title ? title : articleUpdate.title,
      date: date ? date : articleUpdate.date,
      category: category ? category : articleUpdate.category,
      image: image ? image : articleUpdate.image
    })
    .then(() => {
      axios.get("https://news-project-back.herokuapp.com/news")
      .then((response) => {
        setNews(response.data)
          });
      });
    };
  
  useEffect(() => {
    axios
    .get('https://news-project-back.herokuapp.com/news')
    .then((res) => {
      setNews(res.data);
    })
  }, [])

  const cardToggle = (article) => {
      document.getElementById("edit"+article._id).classList.toggle("activeEdit");
      document.getElementById("index"+article._id).classList.toggle("activeEdit");
  }

  const showArticlesPage = () => {
    setShowArticles(true);
    setNewArticleForm(false);
  }

  const newArticlePage = () => {
    setNewArticleForm(true);
    setShowArticles(false);
  }


  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
        <div className="container-fluid">
          <a className="navbar-brand" onClick={showArticlesPage} href="#">The App.Post</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" onClick={showArticlesPage} href="#">Show All Articles</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" onClick={newArticlePage} href="#">Add New Article</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    { newArticleForm ?
      <section className='createForm'>
        <form className="newForm" onSubmit={handleNewArticleFormSubmit}>
          title: <input type="text" onChange={handleTitleChange} />
          category: <input type="text" onChange={handleCategoryChange} />
          article: <input type="text" onChange={handleArticleChange} />
          date: <input type="text" onChange={handleDateChange} />
          image: <input type="text" onChange={handleImageChange} />
          <input type="submit" value="Add New Article" />
        </form>
      </section>
    : null }
    { showArticles ?
      <section className='card-deck'>
        <div className="row"  key={article._id}></div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {news.map((article, index) => {
            return(
                  <div className="col">
                    <div className="card h-25">
                      <div class="ratio ratio-16x9">
                        <img src={article.image} className="card-img-top" alt="..."/>
                      </div>
                      <div className="card-body" id={'index'+article._id}>
                        <h5 className="card-title">{article.title}</h5>
                        { previewArticle ?
                        <p className="card-text">{article.article}</p> : ''
                        }
                        <button className="btn btn-secondary" onClick={()=> setPreviewArticle(!previewArticle)}>Show Article</button>     
                      </div>
                      <div id={"edit"+article._id} className='activeEdit'>
                        <form className="updateForm" onSubmit={(event) => {handleUpdateArticle(article)}}>
                          title: <input type="text" defaultValue={article.title} onChange={handleTitleChange} /> <br/>
                          category: <input type="text" defaultValue={article.category} onChange={handleCategoryChange} /> <br/>
                          article: <input type="text" defaultValue={article.article} onChange={handleArticleChange} /> <br/>
                          date: <input type="text" defaultValue={article.date} onChange={handleDateChange} /> <br/>
                          image: <input type="text" defaultValue={article.image} onChange={handleImageChange} /> <br/>
                          <input className="btn btn-secondary"type="submit" value="Update Article"/> <br/>
                        </form>
                        <button onClick={(event) => { handleDeleteArticle(article)}} className="btn btn-danger" >Delete</button>
                      </div>
                        {/* the button below this comment the one that is acting up, it is used as the ternary for the edit and show pages*/}
                        {/* adding functionality to make it work on only one index is what i have been having an issue with */}
                        {/* right now the cardToggle function works on all at the same time, unsure of how to call it appropriately */}
                      <button className="btn btn-primary" onClick={() => {cardToggle(article)}}>Edit</button>
                      <div className="d-flex justify-content-between card-footer">
                        <small className="text-muted">Category: {article.category}</small>
                        <small className="text-muted">Date: {article.date}</small>
                      </div>
                    </div>
                  </div>
              )
            })
          }
        </div>
      </section>
    : null}
    
    <div className="footer fixed-xl-bottom container text-center"> Footer
        <p>The App.post is a satirical entity that meant for entertainment purposes only.</p>
        <p>3378 For-Shizzle Blvd</p>
        <p>Mt. Olympus, Montana 86557</p>
        

      
    </div>
    
    </div>
  );
}

export default App ;