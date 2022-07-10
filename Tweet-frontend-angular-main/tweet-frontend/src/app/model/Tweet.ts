export interface Tweet {
    avtar: String;
    commentList: Comment[];
    id: String;
    isLikeList: String[];
    loginId: String;
    message: String;
    time: Date;
    likeImage?: String;
}