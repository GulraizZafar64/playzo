export default function HomeFeatureEndCards() {
  return (
    <section className="home-end-cards" aria-labelledby="end-cards-heading">
      <h2 id="end-cards-heading" className="visually-hidden">
        Site features
      </h2>
      <div className="row g-3">
        <div className="col-md-4">
          <div className="home-end-card">
            <div className="home-end-card-icon" aria-hidden>
              <i className="fa fa-bolt" />
            </div>
            <h3 className="home-end-card-title">Instant play</h3>
            <p className="home-end-card-text">
              Games load in-page with no installers. Close the tab anytime — your progress stays in the game where
              supported.
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="home-end-card">
            <div className="home-end-card-icon" aria-hidden>
              <i className="fa fa-th-large" />
            </div>
            <h3 className="home-end-card-title">Categories &amp; search</h3>
            <p className="home-end-card-text">
              Browse by genre or type a name in the header search to cut through a large library and find a match fast.
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="home-end-card">
            <div className="home-end-card-icon" aria-hidden>
              <i className="fa fa-refresh" />
            </div>
            <h3 className="home-end-card-title">Fresh picks</h3>
            <p className="home-end-card-text">
              We rotate what appears up top so regular visitors always see new suggestions alongside the full list
              below.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
