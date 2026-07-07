import React from "react";
import marvel from "../../images/Marvels.png";

const Footer: React.FC = () => {
  const styleImg: React.CSSProperties = {
    height: "70px",
    width: "70px",
    marginLeft: "10px",
  };

  return (
    <footer>
      <div className="footer-container">
        <img src={marvel} style={styleImg} alt="Marvel" />
        <p>Projet realisé par @Sem-Lumiel - 2022</p>
        <p>
          Les icones wolverine, Iron-man, Spider-man, Batman sont prises sur
          iconFinder.com
        </p>
      </div>
    </footer>
  );
};

export default Footer;
