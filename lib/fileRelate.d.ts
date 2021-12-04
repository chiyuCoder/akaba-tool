export declare namespace NSFileRelate {
    interface IBase64RegResultMatch {
        isMatch: true;
        dataType: string;
        dataSuffix: string;
        dataData: string;
    }
    interface IBase64RegResultNotMatch {
        isMatch: false;
    }
    type TBase64RegResult = IBase64RegResultNotMatch | IBase64RegResultMatch;
}
export declare function getDataFromBase64String(base64String: string): NSFileRelate.TBase64RegResult;
