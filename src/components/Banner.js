import { React, useState, useEffect } from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import { ArrowRightCircle } from "react-bootstrap-icons";
import headerImg from "../assets/Images/header-img.svg";
// import 'animate.css';
import TrackVisibility from 'react-on-screen';
function Banner() {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = ["Video Editor", "Colorist", "Poster Designer"];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }
  return (
    <section className='Banner' id='home'>
      <Container>
        <Row className='align-items-center'>
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <span className='tagline'>Welcome to my Profile</span>
                  <h1>{`Hi I'm Armaan Ansari - `}<span className="txt-rotate" dataPeriod="1000" data-rotate='[ "Video Editor", "Colorist", "Poster Designer" ]'><span className='wrap'>{text}</span></span></h1>
                  <p>I am proficient in advanced video Editing tools like Adobe premiere pro, DaVinci Resolve, Adobe Photoshop, Avid Media Composer, Adobe After Effects.</p>
                  <button onClick={() => console.log("connect")}>Let's Connect <ArrowRightCircle /></button>
                </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt='heading-img' />
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Banner