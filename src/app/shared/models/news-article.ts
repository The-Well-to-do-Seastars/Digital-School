export class NewsArticle {
    public createdOn: number;

    public uid: string;

    constructor(
        public title: string = '',
        public content: string = '',
        public isHidden: boolean = false
    ) {
        this.createdOn = Date.now();
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
