import { scence } from "../../data/imageData";
import "./Scences.scss";
function Scences() {
  return (
    <div className="container__scence">
      <h2 className="content_scence">Scences</h2>
      <div className="modifier_scence">
        <div className="set-scence">
          {scence.map((item, index) => (
            <div className="scence_image_container">
              <img key={index} className="scence_image" src={item.src} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Scences;
