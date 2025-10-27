export function Stack() {
  return (
    <>
      <h3>My Stack</h3>

      <div className="stack-section">
        <h4>Skills</h4>
        <div className="skills-icons">
          <img
            src="https://skillicons.dev/icons?i=html,css,bootstrap,javascript,react,haskell,c,python,nodejs"
            alt="Skills"
          />
          <img
            src="https://developer.playcanvas.com/img/playcanvas.png"
            alt="PlayCanvas"
            width="48"
            height="48"
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9bsC17sEuS2OqQ2NmsHDxP8jB3E8BGHjH6A&s"
            alt="Hostinger"
            width="48"
            height="48"
          />
        </div>
      </div>

      <div className="stack-section">
        <h4>Frameworks & Other stuff</h4>
        <div className="skills-icons">
          <img
            src="https://skillicons.dev/icons?i=git,github,obsidian,debian,vscode,pycharm,sklearn,md,linux"
            alt="Frameworks"
          />
          <img
            src="https://ms-playwright.gallerycdn.vsassets.io/extensions/ms-playwright/playwright/1.1.15/1749049892255/Microsoft.VisualStudio.Services.Icons.Default"
            alt="Playwright"
            width="48"
            height="48"
          />
          <img
            src="https://avatars.githubusercontent.com/u/5192682?s=280&v=4"
            alt="Xournalpp"
            width="48"
            height="48"
          />
          <img
            src="https://skillicons.dev/icons?i=instagram,gmail,discord,twitter"
            alt="Social"
          />
        </div>
      </div>

      <div className="stack-section">
        <h4>Skills I want to learn</h4>
        <div className="skills-icons">
          <img
            src="https://skillicons.dev/icons?i=figma,vue,postgres,java,maven,spring,sass,jenkins,aws,cloudflare,docker,unity"
            alt="Future skills"
          />
        </div>
      </div>
    </>
  );
}

export default Stack;
