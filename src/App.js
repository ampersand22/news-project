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
  const [editIndex, setEditIndex] = useState(null);

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
      article: article,
      title: title,
      date: date,
      category: category,
      image: image
    })
    .then(() => {
      axios.get("https://news-project-back.herokuapp.com/news").then((response) => {
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

  const cardToggle = () => {
      { toggleEdit ? setToggleEdit(false) : setToggleEdit(true); }
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
    <div className="main">
      <h1>The App.Post</h1>
      <button onClick={newArticlePage}>Add New Article</button>

      <button onClick={showArticlesPage}>Show Article</button>

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
      <section className='card-deck showPage'>
        {news.map((article, index) => {
          return(
          <div className="card" key={article._id}>
          { toggleEdit ?
            <div className="card-content">
              <img src={article.image}/>
              <h2>{article.title}</h2>
              <h5>{article.category}</h5>
              <p>{article.article}</p>
              <p>{article.date}</p>
            </div>
          :
            <div>
            <form className="updateForm" onSubmit={() => {
                handleUpdateArticle(article)
              }}>
              title: <input type="text" onChange={handleTitleChange} />
              category: <input type="text" onChange={handleCategoryChange} />
              article: <input type="text" onChange={handleArticleChange} />
              date: <input type="text" onChange={handleDateChange} />
              image: <input type="text" onChange={handleImageChange} />
              <input type="submit" onClick={() => {
                handleUpdateArticle(article)
              }} value= "Update Article"  />
              <button onClick={(event) => { handleDeleteArticle(article)}}>Delete</button>
            </form>
            </div>
          }
        
        {/* the button below this comment the one that is acting up, it is used as the ternary for the edit and show pages*/}
        {/* adding functionality to make it work on only one index is what i have been having an issue with */}
        {/* right now the cardToggle function works on all at the same time, unsure of how to call it appropriately */}
        <button  onClick={(event) => {cardToggle(`https://news-project-back.herokuapp.com/news/${article}`)}}> { toggleEdit ? "Edit This Article" : "Show All Articles" } </button>
          </div>
          )
        })
      }
      </section>
    : null}
    </div>
  );
}

export default App;