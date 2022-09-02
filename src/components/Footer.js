import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="site-footer">
        <div className="container">
          <div className="row d-flex justify-content-around">
            <div className="col-sm-12 col-md-4">
              <h6>Derrick Dahlitz</h6>
              <ul className="footer-links">
                <li><a href="https://www.linkedin.com/in/derrick-dahlitz/">LinkedIn</a></li>
                <li><a href="mailto:ddahlitz@gmail.com"target="_blank">Email Derrick</a></li>
              </ul>
            </div>
            <div className="col-xs-12 col-md-4">
              <h6>Isaac Pure</h6>
              <ul className="footer-links">
                <li><a href="https://www.linkedin.com/in/isaacpure/">LinkedIn</a></li>
                <li><a href="mailto:isaacpure@gmail.com"target="_blank">Email Isaac</a></li>
              </ul>
            </div>
            <div className="col-xs-12 col-md-4">
              <h6>Jey Ulmer</h6>
              <ul className="footer-links">
                <li><a href="https://www.linkedin.com/in/jey-ulmer-70b141247/">LinkedIn</a></li>
                <li><a href="mailto:jeyulmer@gmail.com"target="_blank">Email Jey</a></li>
              </ul>
            </div>
          </div>
          <hr />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12">
              <p className="copyright-text">Copyright &copy; 2022 All Rights Reserved by Yo Mama</p>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12">
              <ul className="social-icons">
                <li><a className="github" href="#"><i className="fa fa-github"></i></a></li>
                <li><a className="linkedin" href="#"><i className="fa fa-linkedin"></i></a></li>   
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
