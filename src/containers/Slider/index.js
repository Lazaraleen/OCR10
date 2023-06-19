import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    // Changer l'ordre du signe de "<" pour ">" afin que les évènements soient affichés dans l'ordre décroissant
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );
  const nextCard = () => {
    // Pour éviter d'avoir une erreur console sur le length d'un élément considéré comme undefined
    if (byDateDesc && byDateDesc.length>0){
      setTimeout(
        // il faut corriger byDateDesc.length par (byDateDesc.length-1) sinon (index+1) dépassera la taille du tableau
        () => setIndex(index < byDateDesc.length -1 ? index + 1 : 0),
        5000
      );
    }
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // Mettre la key dans une div plutôt qu'avoir une balise vide au début du map
        <div key={event.title}>
          <div className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                {/* Décalage des mois car l'indexation commençait à 1 au lieu de 0 dans getMonth dans helpers/Date */}
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  // Modification sinon la key reste fixe dans la boucle car event ne fait pas parti des paramètres
                  key={`${radioIdx + 10}`}
                  type="radio"
                  name="radio-button" 
                  checked={radioIdx === index}
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
