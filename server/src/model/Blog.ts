class Blog {
    private _title: string;
    private _create_time: number;
    private _content: string;
    private _favor: number;
    private _opposition: number;
    private _tag_name: string;
    private _tag_type: number;
    private _blog_id: string;

    get blog_id(): string {
        return this._blog_id;
    }

    set blog_id(value: string) {
        this._blog_id = value;
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

    get tag_name(): string {
        return this._tag_name;
    }

    set tag_name(value: string) {
        this._tag_name = value;
    }

    get tag_type(): number {
        return this._tag_type;
    }

    set tag_type(value: number) {
        this._tag_type = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

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
}

export default Blog;