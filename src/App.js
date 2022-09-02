import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react'
import Login from './components/Login';
import Footer from './components/Footer';

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
  const [previewArticle, setPreviewArticle] = useState("Show More");

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
      showArticlesPage()
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
    .get("https://news-project-back.herokuapp.com/news")
    .then((res) => {
      setNews(res.data);
    })
  }, [])

  const cardToggle = (article) => {
    document.getElementById("edit"+article._id).classList.toggle("hide");
    document.getElementById("index"+article._id).classList.toggle("hide");
    {toggleEdit ? setToggleEdit(false) : setToggleEdit(true)}
  }

  const showArticlesPage = () => {
    setShowArticles(true);
    setNewArticleForm(false);
  }

  const newArticlePage = () => {
    setNewArticleForm(true);
    setShowArticles(false);
  }

  const showMore = (article) => {
    {previewArticle === "Show More" ? setPreviewArticle("Show Less") : setPreviewArticle("Show More")}
    document.getElementById("articlePreview"+article._id).classList.toggle("text-truncate");
    document.getElementById("card"+article._id).classList.remove("thisArticle");
  }

  return (
    <div className = "container-fluid">
      <nav className = "navbar navbar-expand-lg fixed-top navbar-light bg-dark mb-3 rounded">
        <div className = "container-fluid">
          <a className = "navbar-brand" onClick = {showArticlesPage} href = "#">
            <img src="/app_post_logo.png" width = "auto" height = "auto"/>
          </a>
          <button className = "navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className = "navbar-toggler-icon"></span>
          </button>
          <div className = "collapse navbar-collapse" id = "navbarNav">
            <ul className = "navbar-nav ms-auto" style = {{fontSize:"1.5em"}}>
              <li className = "nav-item">
                <a className = "nav-link active" aria-current = "page" style = {{color:"white"}} onClick = {showArticlesPage} href = "#"> Show All Articles </a>
              </li>
              <li className = "nav-item">
                <a className = "nav-link active" style = {{color:"white"}} onClick = {newArticlePage}  href = "#"> Add New Article </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    <Login />
    { newArticleForm ?
      <section className = "createForm" style = {{paddingTop:"150px"}}>
        <form className = "newForm" onSubmit = {handleNewArticleFormSubmit}>
          <div className = "form-floating">
            <input type = "text" className = "form-control mt-2" id = "floatingTitle" placeholder = "title" onChange = {handleTitleChange} />
            <label htmlFor= "floatingTitle">Title</label>
          </div>
          <div className = "form-floating">
            <input type = "text" className = "form-control mt-2" id = "floatingCategory" placeholder = "category" onChange = {handleCategoryChange} />
            <label htmlFor = "floatingCategory">Category</label>
          </div>
          <div className = "form-floating">
            <textarea className = "form-control mt-2" id = "floatingArticle" placeholder = "article" onChange = {handleArticleChange} style = {{height:"100px"}}></textarea>
            <label htmlFor= "floatingArticle">Article</label>
          </div>
          <div className = "form-floating">
            <input typ e= "text" className = "form-control mt-2" id = "floatingDate" placeholder = "date" onChange = {handleDateChange} />
            <label htmlFor = "floatingDate">Date</label>
          </div>
          <div className = "form-floating">
            <input type = "text" className = "form-control mt-2" id = "floatingImg" placeholder = "image" onChange = {handleImageChange} />
            <label htmlFor= "floatingImg">Image URL</label>
          </div>
          <input className = "button btn btn-success mt-5" type = "submit" value = "Add New Article" />
        </form>
      </section>
    : null }
    <div className = "mb-3" style = {{paddingTop:"150px"}}>
      { showArticles ?
        <section className = "card-deck">
          <div className = "row"></div>
          <div className = "row row-cols-xs-1 row-cols-md-2 row-cols-lg-3 g-4">
            {news.map((article) => {
              return(
                    <div className = "col" key = {article._id}>
                      <div id = {"card"+article._id} className = "card h-100 border border-secondary">
                        <div className = "ratio ratio-16x9">
                          <img id = {"img"+article._id} src = {article.image} className = "card-img-top" alt = "..."/>
                        </div>
                        <div className = "card-body" id= {"index"+article._id}>
                          <h5 className = "card-title "> {article.title} </h5>
                          <p id = {"articlePreview"+article._id} className = "card-text text-truncate"> {article.article} </p>
                          <button className = "btn btn-primary button mb-2" onClick = {() => {showMore(article)}}> {previewArticle} </button><br/>
                          <button className = "btn btn-secondary button" onClick = {() => {cardToggle(article)}}> Edit </button>
                        </div>
                        <div id = {"edit"+article._id} className = "hide">
                          <form className = "updateForm" onSubmit= {(event) => {handleUpdateArticle(article)}}>
                            <div className = "form-floating">
                              <input type = "text" className = "form-control mt-2" id = "floatingTitle" defaultValue={article.title} onChange={handleTitleChange} />
                              <label htmlFor = "floatingTitle">Title</label>
                            </div>
                            <div className = "form-floating">
                              <input type = "text" className = "form-control mt-2" id = "floatingCategory" defaultValue = {article.category} onChange = {handleCategoryChange} />
                              <label htmlFor = "floatingCategory">Category</label>
                            </div>
                            <div className = "form-floating">
                              <textarea className = "form-control mt-2" id = "floatingArticle" defaultChecked = {article.article} onChange = {handleArticleChange}></textarea>
                              <label htmlFor = "floatingArticle"> Article </label>
                            </div>
                            <div className = "form-floating">
                              <input type = "text" className = "form-control mt-2" id="floatingDate" defaultValue = {article.date} onChange={handleDateChange} />
                              <label htmlFor = "floatingDate"> Date </label>
                            </div>
                            <div className ="form-floating">
                            <input type = "text" className = "form-control mt-2" id = "floatingImg" defaultValue = {article.image} onChange={handleImageChange} />
                            <label htmlFor = "floatingImg"> Image URL </label>
                            </div>
                            
                            <input className = "btn btn-secondary my-2 button" type = "submit" value = "Update Article"/> <br/>
                          </form>
                          <button className = "btn btn-primary mb-2 button" onClick = {() => {cardToggle(article)}}> Show Articles </button> <br/>
                          <button className = "btn btn-danger button"  onClick = {(event) => { handleDeleteArticle(article)}}> Delete </button>
                        </div>
                          {/* the button below this comment the one that is acting up, it is used as the ternary for the edit and show pages*/}
                          {/* adding functionality to make it work on only one index is what i have been having an issue with */}
                          {/* right now the cardToggle function works on all at the same time, unsure of how to call it appropriately */}
                        <div className = "d-flex justify-content-between card-footer">
                          <small className = "text-muted"> Category: {article.category} </small>
                          <small className = "text-muted"> Date: {article.date} </small>
                        </div>
                      </div>
                    </div>
                )
              })
            }
          </div>
        </section>
      : null}
    </div>
    <Footer />
  </div>
  );
}

export default App ;
