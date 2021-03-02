class BlogResolution {
    private _status: number;

    get status(): number {
        return this._status;
    }

    set status(value: number) {
        this._status = value;
    }
}

export default BlogResolution;