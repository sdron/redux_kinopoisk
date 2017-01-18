export default class MovieGenre {

    static HORROR = 'HORROR';
    static ACTION = 'ACTION';
    static ADVENTURE = 'ADVENTURE';

    static names() {
        return {
            [MovieGenre.HORROR]: 'Ужасы',
            [MovieGenre.ACTION]: 'Экшен',
            [MovieGenre.ADVENTURE]: 'Приключение'
        };
    };

    static translate(branch) {
        return (MovieGenre.names())[branch];
    };

}