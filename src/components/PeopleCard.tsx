import nah from "../assets/nah.gif";
import "../styles/peopleCard.css"
import test from "../assets/test.jpg"
import twitter from "../assets/socialMedia/x.avif"
import eye from "../assets/eye.gif";

export function PeopleCard() {
    return (
      <>
        <div className="person-container">
          <div>
            <img className="person-image" src={test} alt="Loading..." />
            <div className="person-text">
              <div className="name-container">
                <img src={eye} alt="small emoji" />
                <h3>nombre genial</h3>
              </div>
              <div className="person-social-media">
                <a href="#">
                  <img
                    className="person-social-image"
                    src={twitter}
                    alt="Twitter icon"
                  />
                  <h5> @nombregenial2</h5>
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default PeopleCard;
