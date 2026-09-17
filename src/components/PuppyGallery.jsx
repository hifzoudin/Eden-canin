import { useState } from "react";

export default function PuppyGallery({ photos = [], name }) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  if (!photos.length) return null;

  return (
    <div className="gallery">
      <button type="button" className="gallery-main" onClick={() => setLightbox(true)}>
        <img src={photos[current]} alt={name} />
      </button>
      <div className="gallery-thumbs">
        {photos.map((src, index) => (
          <button key={src + index} type="button" className={index === current ? "active" : ""} onClick={() => setCurrent(index)}>
            <img src={src} alt="" />
          </button>
        ))}
      </div>
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(false)} role="dialog">
          <img src={photos[current]} alt={name} />
        </div>
      )}
    </div>
  );
}
