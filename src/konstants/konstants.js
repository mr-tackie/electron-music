export const swiperProps = {
  slidesPerView: 4,
  breakpoints: {
    1024: {
      slidesPerView: 3,
      spaceBetween: 20
    },
    600: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    320: {
      slidesPerView: 1,
      spaceBetween: 10
    }
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  }
};

export const FETCH_SONGS = "FETCH_SONGS";
export const FETCH_RECENTS = "FETCH_RECENTS";
export const FETCH_FAVORITES = "FETCH_FAVORITES";
export const SET_CURRENT_SONG = "SET_CURRENT_SONG";
export const ADD_TO_PLAYLIST = "ADD_TO_PLAYLIST";
export const REMOVE_FROM_PLAYLIST = "REMOVE_FROM_PLAYLIST";
export const SET_SOUNDCLOUD_RESULTS = "SET_SOUNDCLOUD_RESULTS"