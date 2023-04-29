import { useCallback, useEffect, useState } from "react";
import { Description, Service } from "../../../../types/service.type";
import "../../Cases.component.css";
import classNames from "classnames";

type Props = {
  caseItem: Service;
  setDescriptions: (descriptions: Description[]) => void;
  activeCaseId: number;
  setActiveCaseId: (id: number) => void;
  windowWidth: number;
};

export const CasesItem: React.FC<Props> = ({
  caseItem: { id, icon, name, descriptions },
  setDescriptions,
  activeCaseId,
  setActiveCaseId,
  windowWidth,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const chevronIconClassName = classNames("cases__chevron_icon", {
    "cases__chevron_icon--open": isOpen,
  });

  const handleChevronClick = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  useEffect(() => {
    if (activeCaseId === id) {
      setDescriptions(descriptions);
    }
  }, [id, activeCaseId, setDescriptions, descriptions]);

  const backgroundClass = classNames("cases__background", {
    "cases__background--active": id === activeCaseId,
  });

  const handleClick = useCallback(
    (currentId: number) => {
      setActiveCaseId(currentId);
    },
    [setActiveCaseId]
  );

  return (
    <div className={backgroundClass}>
      <div className="cases__card" onClick={() => handleClick(id)}>
        <img
          src={`./services-icons/${icon}`}
          alt="services-icon"
          className="cases__card_icon"
        />
        <div className="cases__card_text">{name}</div>
        {windowWidth < 1000 && (
          <div className="cases__chevron_wrapper" onClick={handleChevronClick}>
            <img
              src="./chevron-down.svg"
              alt=""
              className={chevronIconClassName}
            />
          </div>
        )}    
      </div>
    </div>
  );
};