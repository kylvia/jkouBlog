export interface detailType {
  articleHtmlContent: string;
  articleTabled: string;
  articleUrl: string;
  createTime: string;
  id: number;
  labelValues: string;
  likes: number;
  look: number;
  message: string;
  name: string;
  originalAuthor: string;
  selectCategories: string;
  selectGrade: number;
  selectType: string;
  specificTag: string;
  tagValue: string[];
  text: string;
  title: string;
}

export interface labelType {
  id: number,
  labelName: string,
}

export interface commentsType {
  authorName: string
  commentName: string
  commentEmail: string
  blogId: number
  createTime: string
  id: string
  isRead: number
  likes: number
  message: string
  avatarType: number
  reportComments?: {
    blogId: number
    comName: string
    avatarType: number
    commentId: number
    rcreateTime: string
    repMess: string
    repName: string
    reportedId: string
    rid: number
    risRead: number
    title: string
    repCommentName: string
    repCommentEmail: string
  }[] | []
  userId: string
}
