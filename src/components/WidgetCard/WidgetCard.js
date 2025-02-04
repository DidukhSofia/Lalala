import React from "react";
import "./WidgetCard.css"

function WidgetCard({widgetCard}){
    return(
        <section className="WidgetCard">
            <div className="WidgetCard__content-box">
                <img
                src={widgetCard.posterPath}
                alt={widgetCard.filmName}
                className="WidgetCard-poster"
                />
                <div className="WidgetCard__content-overlay">
                <h2 className="WidgetCard-title">{widgetCard.filmName}</h2>
                </div>
            </div>
        </section>
    );
}
export default WidgetCard