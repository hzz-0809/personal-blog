class CommentResolution {
    get status(): number {
        return this._status;
    }

    set status(value: number) {
        this._status = value;
    }

    private _status: number;
}

export default CommentResolution;