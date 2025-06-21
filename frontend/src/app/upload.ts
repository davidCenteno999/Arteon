export class Upload {
    $key: string;
    name: string;
    url: string;
    file: File;

    constructor(file: File) {
        this.$key = '';
        this.name = file.name;
        this.url = '';
        this.file = file;
    }
}
