import { ArrowDown, ArrowUpRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="small-line" /> A slower kind of living
        </p>
        <h1 id="hero-title">
          Good things.
          <br />
          For your
          <br />
          <em>everyday.</em>
        </h1>
        <p className="hero-description">
          Thoughtful objects. Honest materials.
          <br />A home that feels a little more like you.
        </p>
        <a className="button button-dark" href="#collection">
          Find your everyday <ArrowUpRight size={19} />
        </a>
        <div className="hero-footnote">
          <span>CURATED WITH INTENTION</span>
          <ArrowDown size={16} />
        </div>
      </div>
      <div className="hero-visual">
        <img
          className="hero-image"
          src={`${import.meta.env.BASE_URL}images/hero.jpg`}
          alt="A sunlit living room with natural textures, sculptural furniture, and warm neutral tones"
          fetchPriority="high"
        />
        <span className="image-label">THE ART OF FEELING AT HOME</span>
        <a className="hero-caption" href="#collection">
          <span>
            <span className="eyebrow">THE CONSIDERED COLLECTION</span>
            <strong>Less, but a little better.</strong>
          </span>
          <span className="round-arrow">
            <ArrowUpRight size={23} />
          </span>
        </a>
        <span className="edition-label">VOL. 01 / EVERYDAY OBJECTS</span>
      </div>
    </section>
  );
}
