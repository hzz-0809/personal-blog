class Comment {
    private _create_time: number;
    private _content: string;
    private _favor: number;
    private _opposition: number;
    private _comment_id: string;

    get create_time(): number {
        return this._create_time;
    }

    set create_time(value: number) {
        this._create_time = value;
    }

    get content(): string {
        return this._content;
    }

    set content(value: string) {
        this._content = value;
    }

    get favor(): number {
        return this._favor;
    }

    set favor(value: number) {
        this._favor = value;
    }

    get opposition(): number {
        return this._opposition;
    }

    set opposition(value: number) {
        this._opposition = value;
    }

    get comment_id(): string {
        return this._comment_id;
    }

    set comment_id(value: string) {
        this._comment_id = value;
    }
}

export default Comment;