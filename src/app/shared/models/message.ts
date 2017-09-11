export class MessageData {
  public date;
    constructor(
      public id: number = 0,
      public from: string = ' ',
      public to: string = ' ',
      public title: string = ' ',
      public content: string = ' ',
      public shouldDisplay: boolean = true,
      public isRead: boolean = true
    ) {
      const today = new Date();
      const dd = today.getDate();
      const mm = today.getMonth() + 1;
      const hh = today.getHours();
      const mins = today.getMinutes();
      const yyyy = today.getFullYear().toString();
      let mmStr = mm.toString();
      let ddStr = dd.toString();

      if (dd < 10) {
        ddStr = '0' + ddStr;
      }
      if (mm < 10) {
        mmStr = '0' + mmStr;
      }
      const todayStr = mmStr + '/' + ddStr + '/' + yyyy + ' - ' + hh + ':' + mins;
      this.date = todayStr;
    }

  }
