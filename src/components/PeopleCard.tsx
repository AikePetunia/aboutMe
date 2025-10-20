import "../styles/peopleCard.css";
import test from "../assets/people/test.jpg";
import x from "../assets/socialMedia/x.avif";
import discord from "../assets/socialMedia/ds.avif";
import instagram from "../assets/socialMedia/ig.avif";
import eye from "../assets/eye.gif";
import people from "../people.json";

export function PeopleCard() {
  return (
    <>
      {people.person.map((person, idx) => {
        const social = (person.whatSocial || "").toLowerCase();
        let icon = x;
        if (social === "instagram") icon = instagram;
        if (social === "discord") icon = discord;
        const href =
          {
            x: `https://twitter.com/${person.socialTag}`,
            instagram: `https://instagram.com/${person.socialTag}`,
            discord: `https://discord.com/${person.socialTag}`,
          }[social] || "#";

        return (
          <div className="person-container" key={`${person.name}-${idx}`}>
            <div>
              <img
                className="person-image"
                src={person.picture || test}
                alt={person.name}
              />
              <div className="person-text">
                <div className="name-container">
                  {person.emoji ? (
                    <p className="person-emoji">{person.emoji}</p>
                  ) : (
                    <img src={eye} alt="emoji" />
                  )}
                  <h3>{person.name}</h3>
                </div>

                <div className="person-social-media">
                  <a href={href} target="_blank" rel="noreferrer">
                    <img
                      className="person-social-image"
                      src={icon}
                      alt={`${social} icon`}
                    />
                    <h5>{person.socialTag}</h5>
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default PeopleCard;
