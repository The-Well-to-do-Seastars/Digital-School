export class NewsArticle {
    public createdOn: Date;

    public uid: string;

    constructor(
        public title: string = '',
        public content: string = ''
    ) {
        this.createdOn = new Date();
    }

    static fromModel( model, target?: NewsArticle ): NewsArticle {
        const article = target || new NewsArticle();
        for (const prop in article) {
          if (article.hasOwnProperty(prop)) {
            article[prop] = model[prop];
          }
        }
        return article;
      }
}
