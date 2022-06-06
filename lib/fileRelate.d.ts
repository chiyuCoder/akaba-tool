export declare namespace NSFileRelate {
    interface IBase64RegResultMatch {
        isMatch: true;
        dataType: string;
        dataSuffix: string;
        dataData: string;
        mime: string;
    }
    interface IBase64RegResultNotMatch {
        isMatch: false;
    }
    type TBase64RegResult = IBase64RegResultNotMatch | IBase64RegResultMatch;
    interface ParsedPath {
        root: string;
        dir: string;
        base: string;
        name: string;
        ext: string;
        isMatch: boolean;
    }
}
export declare function getDataFromBase64String(base64String: string): NSFileRelate.TBase64RegResult;
export declare function parsePath(pathname: string): NSFileRelate.ParsedPath;
