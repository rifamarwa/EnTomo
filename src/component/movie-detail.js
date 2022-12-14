import './cast-item.js'
import $ from 'jquery';
import moment from 'moment'

class MovieDetail extends HTMLElement {

    set detail(detail) {
        this._detail = detail;
        this.render();
    }
    
    render(){

        const runtimeConvert = (runtime) => {
            let number = runtime;
            let hours = number / 60;
            let roundHours = Math.floor(hours);
            let minutes = (hours - roundHours) * 60;
            let roundMinutes = Math.round(minutes);
            return `${roundHours} hour ${roundMinutes} minutes`
        }

        this.innerHTML = `
        <style>
            .detail-movie {
                display: flex; 
                margin-bottom: 50px
            }

            .poster img{
                width: 300px;
                border-radius: 10px;
                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
            }

            .detail-text-container {
                margin-left: 30px;
            }

            .detail-text-container h2 {
                font-size: 32px;
                font-weight: 600;
                margin-bottom: 20px;
            }

            .detail-info-1 {
                display: flex;
            }

            .detail-info-1 h4{
                font-size: 18px;
                margin: 0px 10px 20px 0px;
            }

            .detail-info-2 {
                display: flex;
            }

            .detail-info-2 h3 {
                font-size: 20px;
                padding: 10px;
                color: black;
                background-color: #FF88AE;
                border-radius: 5px;
                margin: 0px 10px 50px 0px;
            }

            .detail-info-2 h5 {
                font-size: 16px;
                line-height: 3;
            }

            .trailer-container {
                margin-bottom: 50px;
            }
            
            .trailer-container .trailer-video-container{
                margin-bottom: 60px;
                position: relative;
                width: 100%;
                padding-top: 56.25%;
                overflow: hidden;
            }
            
            .trailer-container .trailer-video-container iframe {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
            }

            .review-container {
                width: 50%;
            }

            @media screen and (max-width: 800px){
                .poster img {
                    width: 250px;
                    height: 100%;
                }

                .detail-info-1 h4 {
                    font-size: 15px;
                    line-height: 22px;
                }

                .detail-info-2 h3 {
                    font-size: 18px;
                    margin: 0px 10px 30px 0px;
                }

                .detail-info-2 h5 {
                    font-size: 15px;
                }

                .detail-info-3 p {
                    font-size: 13px;
                }
            }

            @media screen and (max-width: 650px){
                .detail-movie {
                    display: block;
                }

                .detail-movie .poster {
                    text-align: center;
                    margin-bottom: 50px;
                }
            }

        </style>
        <div class="detail-movie">
            <div class="poster">
                <img src="https://image.tmdb.org/t/p/w342${this._detail.poster_path}"  alt="${this._detail.title}">
            </div>
            <div class="detail-text-container">
                <h2>${this._detail.title}</h2>
                <div class="detail-info-1">
                    <h4><span class="release-date">${moment(this._detail.release_date).format('LL')}</span> (${this._detail.language})</h4>
                    <h4> &#9702; </h4>
                    <h4> ${this._detail.genres}</h4>
                    <h4> &#9702; </h4>
                    <h4> ${runtimeConvert(this._detail.runtime)}</h4>
                </div>
                <div class="detail-info-2">
                    <h3 class="detail-rating">${(this._detail.rating).toFixed(1)}</h3>
                    <h5>&#127758; ${this._detail.total_vote} votes </h5>
                </div>
                <div class="detail-info-3">
                    <p>${this._detail.overview}.</p>
                </div>
            </div>
        </div>
        <div style="margin-bottom:50px">
            <div class="cast-container row">
                <div style="display:flex; margin-bottom:20px">
                    <img style="width:6px"src="./assets/line.svg">
                    <h4 style="margin: auto 20px;">Casts</h4>
                </div><br>
            </div>
        </div>
        <div class="trailer-container">
            <div style="display:flex;">
                <img src="./assets/line.svg">
                <h4 style="margin: auto 20px;">Trailer</h4>
            </div><br>
            <div class="trailer-video-container">
                <iframe src="https://www.youtube.com/embed/${this._detail.trailer}" allowfullscreen></iframe>
            </div>
        </div>
        <div class="row">
            <div class="review-container col">
                <div style="display:flex; margin-bottom:20px">
                    <img src="./assets/line.svg">
                    <h4 style="margin: auto 20px;">Reviews</h4>
                </div><br>
            </div>
            <div class="recommendation-container col">
                <div style="display:flex;">
                    <img src="./assets/line.svg">
                    <h4 style="margin: auto 20px;">Recommendations</h4>
                </div><br>
                <div class="recommendation-list row row-cols-2"></div>
            </div>
        </div>

        `

        this._detail.casts.forEach(cast => {
            const castItemElement = document.createElement('cast-item');
            castItemElement.className = "col";
            castItemElement.cast = cast;

            const castContainer = document.querySelector('.cast-container');
            castContainer.appendChild(castItemElement);
        })

        this._detail.reviews.forEach(review => {
            const reviewItemElement = document.createElement('review-item');
            reviewItemElement.review = review;

            const reviewContainer = document.querySelector('.review-container');
            reviewContainer.appendChild(reviewItemElement);
        })

        this._detail.recommendations.forEach(recommendation => {
            const recommendationItemElement = document.createElement('movie-item');
            recommendationItemElement.className = "col";
            recommendationItemElement.style.cssText = "width: 150px"
            recommendationItemElement.movie = recommendation;

            const recommendationContainer = document.querySelector('.recommendation-list');
            recommendationContainer.appendChild(recommendationItemElement);
        })
    }
}

customElements.define('movie-detail', MovieDetail)