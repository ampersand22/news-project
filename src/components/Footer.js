import React from 'react'

const Footer = () => {
  return (
    <div>
         <footer class="site-footer">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <h6>Derrick Dahlitz</h6>
            <ul class="footer-links">
              <li><a href="https://www.linkedin.com/in/derrick-dahlitz/">LinkedIn</a></li>
              <li><a href="mailto:ddahlitz@gmail.com"target="_blank">Email Derrick</a></li>
              
            </ul>
          </div>

          <div class="col-xs-6 col-md-3">
            <h6>Isaac Pure</h6>
            <ul class="footer-links">
                <li><a href="https://www.linkedin.com/in/isaacpure/">LinkedIn</a></li>
                <li><a href="mailto:isaacpure@gmail.com"target="_blank">Email Isaac</a></li>
            </ul>
          </div>

          <div class="col-xs-6 col-md-3">
            <h6>Jey Ulmer</h6>
            <ul class="footer-links">
                <li><a href="https://www.linkedin.com/in/jey-ulmer-70b141247/">LinkedIn</a></li>
                <li><a href="mailto:jeyulmer@gmail.com"target="_blank">Email Jey</a></li>
             
            </ul>
          </div>
        </div>
        <hr />
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <p class="copyright-text">Copyright &copy; 2022 All Rights Reserved by Yo Mama
            </p>
        </div>

            <div class="col-md-4 col-sm-6 col-xs-12">
            <ul class="social-icons">
                <li><a class="github" href="#"><i class="fa fa-github"></i></a></li>
                <li><a class="linkedin" href="#"><i class="fa fa-linkedin"></i></a></li>   
            </ul>
            </div>
        </div>
      </div>
</footer>
    </div>
  )
}

export default Footer
