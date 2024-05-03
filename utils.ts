import { Buffer } from 'buffer';
import * as FileSystem from 'expo-file-system';


export function pathFromURI(uri: string){
    const parts = uri.split('/');
    return parts[parts.length - 1];
}

export function icon(resource){

    const type = resource.type;

    if(type.includes("image"))
        return "file-image";

    if(type.includes("pdf"))
        return "file-pdf";

    return "file-circle-question"

}


export function humanSize(size: number){
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    let i = 0;
    while(size > 1024){
        size /= 1024;
        i++;
    }
    return `${size.toFixed(2)} ${units[i]}`;
}

export class Blobby {
    private __data: ArrayBuffer;

    constructor(data: ArrayBuffer){
        this.__data = data;
    }

    static fromBase64(base64: string){
        const data = new Uint8Array(Buffer.from(base64, 'base64'));
        return new Blobby(data);
    }

    static fromUTF8(utf8: string){
        const data = new Uint8Array(Buffer.from(utf8, 'utf8'));
        return new Blobby(data);
    }

    raw(){
        return this.__data;
    }

    toBase64(){
        return Buffer.from(this.__data).toString('base64');
    }

    toUTF8(){
        return Buffer.from(this.__data).toString('utf8');
    }

    toString(type = 'utf8'){
        return type === 'utf8' ? this.toUTF8() : this.toBase64();
    }

    get size(){
        return this.__data.byteLength;
    }

    get humanSize(){
        const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
        let size = this.size;
        let i = 0;
        while(size > 1024){
            size /= 1024;
            i++;
        }
        return `${size.toFixed(2)} ${units[i]}`;
    }
}

export class Resource {

    private __uri: string;
    private __type: string;
    private __name: string;
    private __size: number;
    private __busy: boolean;
    private __cursor: number;
    private __mimeType: string;
    private __width: number;
    private __height: number;
    private __duration: number;
    private __exif: any;
    
    constructor(params: { uri: string, mime: string, name: string}){
        this.__cursor = 0;
        this.__busy = false;
        this.__uri = params.uri ;
        this.__exif =  params.exif ?? {};
        this.__type = params.type;
        this.__name = params.name ?? pathFromURI(params.uri);
        this.__width = params.width ?? 0;
        this.__height = params.height ?? 0;
        this.__duration = params.duration ?? 0;
        this.__mimeType = params.mimeType ?? 'application/unset';
        this.__size = params.size ?? 0;
    }

    async read(nbytes=-1): Promise<Blobby>{
        this.__busy = true;
        if(this.__busy) return Promise.reject(Symbol('busy'));
        if(this.__cursor >= this.__size) return Promise.reject(Symbol('EOF'));

        if(nbytes === -1) nbytes = this.__size;

        const bopts = {
            encoding: FileSystem.EncodingType.Base64,
            position: this.__cursor,
            length: nbytes,
        }
        const strencbytes = await FileSystem.readAsStringAsync(this.__uri, bopts);
        this.__cursor += nbytes;
        this.__busy = false;

        return Blobby.fromBase64(strencbytes)
    }

    get busy(){
        return this.__busy;
    }

    get uri(){
        return this.__uri;
    }

    get name(){
        return this.__name;
    }

    get size(){
        return this.__size;
    }

    get type(){
        return this.__mimeType;
    }

    get cursor(){
        return this.__cursor;
    }

    get humanSize(){
        const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
        let size = this.__size;
        let i = 0;
        while(size > 1024){
            size /= 1024;
            i++;
        }
        return `${size.toFixed(2)} ${units[i]}`;
    }

}

